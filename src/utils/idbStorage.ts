const DB_NAME = 'PhotoAlbumStorage';
const STORE_NAME = 'user_photos';
const DB_VERSION = 1;

function openPhotoDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * 儲存使用者的相簿照片清單至 IndexedDB (並輔以 localStorage 備份)
 */
export async function savePhotosToIDB(photosMap: Record<string, string[]>): Promise<void> {
  try {
    const db = await openPhotoDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(photosMap, 'user_album_photos_map');
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    console.warn('IndexedDB 儲存失敗:', e);
  }

  // 同時嘗試 LocalStorage (若超過 5MB 限制會被 catch 捕獲但不影響 IndexedDB)
  try {
    localStorage.setItem('user_album_photos_map', JSON.stringify(photosMap));
  } catch (e) {
    console.warn('LocalStorage 超過容量限制 (已成功存放於 IndexedDB):', e);
  }
}

/**
 * 從 IndexedDB 或 LocalStorage 讀取已存檔的相簿照片
 */
export async function loadPhotosFromIDB(): Promise<Record<string, string[]>> {
  try {
    const db = await openPhotoDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get('user_album_photos_map');
    const result = await new Promise<Record<string, string[]> | undefined>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    if (result && typeof result === 'object') {
      return result;
    }
  } catch (e) {
    console.warn('從 IndexedDB 載入失敗，嘗試從 LocalStorage 載入:', e);
  }

  // 備援從 LocalStorage 讀取
  try {
    const saved = localStorage.getItem('user_album_photos_map');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}
