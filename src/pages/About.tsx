import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Award, Briefcase, ChevronLeft, ChevronRight, Play, Pause, ZoomIn, X, Upload, Trash2, RefreshCw, SlidersHorizontal, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Star, ImagePlus, CheckCircle, FolderOpen, Eye, EyeOff, ChevronDown, ChevronUp, Settings, Plus, FolderPlus, Tag, Sparkles, Pencil, Check, Edit3 } from 'lucide-react';
import { loadPhotosFromIDB, savePhotosToIDB } from '../utils/idbStorage';
import briefing01 from '../assets/images/briefing-01.jpg';
import briefing02 from '../assets/images/briefing-02.jpg';
import briefing03 from '../assets/images/briefing-03.jpg';
import visit01 from '../assets/images/albums/2026-yunlin-shrimp-farm/visit-01.jpg';
import visit02 from '../assets/images/albums/2026-yunlin-shrimp-farm/visit-02.jpg';
import visit03 from '../assets/images/albums/2026-yunlin-shrimp-farm/visit-03.jpg';
import visit04 from '../assets/images/albums/2026-yunlin-shrimp-farm/visit-04.jpg';
import visit05 from '../assets/images/albums/2026-yunlin-shrimp-farm/visit-05.jpg';
import visit06 from '../assets/images/albums/2026-yunlin-shrimp-farm/visit-06.jpg';
import visit07 from '../assets/images/albums/2026-yunlin-shrimp-farm/visit-07.jpg';
import visit08 from '../assets/images/albums/2026-yunlin-shrimp-farm/visit-08.jpg';
import visit09 from '../assets/images/albums/2026-yunlin-shrimp-farm/visit-09.jpg';
import visit10 from '../assets/images/albums/2026-yunlin-shrimp-farm/visit-10.jpg';
import harvestCard01 from '../assets/images/albums/shrimp-harvest/01池水調控.jpg';
import harvestCard02 from '../assets/images/albums/shrimp-harvest/02養殖巡檢.jpg';
import harvestCard03 from '../assets/images/albums/shrimp-harvest/03成熟驗收.jpg';
import harvestCard04 from '../assets/images/albums/shrimp-harvest/04暫養管理.jpg';
import harvestCard05 from '../assets/images/albums/shrimp-harvest/05品質確認.jpg';
import harvestCard06 from '../assets/images/albums/shrimp-harvest/06收成出貨.jpg';

// 1. 多相簿資料夾設定 (ALBUMS)
// --------------------------------------------------------------------------
// 【相簿與資料夾架構】：
// - 每個相簿放在獨立的資料夾中（存放於 public/ 目錄下，例如 public/albums/新相簿/）。
// - 在 ALBUMS 陣列的最上方新增相簿物件，新相簿照片會自動排在展覽頁面最前面！
// --------------------------------------------------------------------------
interface AlbumConfig {
  albumTitle: string;   // 相簿名稱 (例如：2026台北國際連鎖加盟創業展)
  categoryName: string; // 類別標籤 (例如：EXHIBITION, EVENT, BRAND)
  folder: string;       // 相簿資料夾路徑 (例如：'/albums/2026-exhibition')
  files: string[];      // 該資料夾內的照片檔名清單
  customImages?: string[]; // 高解析度活動照片網址
}

const ALBUMS: AlbumConfig[] = [
  // 【相簿 1 (最前面)】2026 智養蝦參訪︱雲林 (資料夾：public/albums/2026-yunlin-shrimp-farm)
  {
    albumTitle: '2026智養蝦參訪︱雲林',
    categoryName: 'AGRI-TECH',
    folder: '/albums/2026-yunlin-shrimp-farm',
    files: [
      'visit-01.jpg',
      'visit-02.jpg',
      'visit-03.jpg',
      'visit-04.jpg',
      'visit-05.jpg',
      'visit-06.jpg',
      'visit-07.jpg',
      'visit-08.jpg',
      'visit-09.jpg',
      'visit-10.jpg'
    ],
    customImages: [
      visit01,
      visit02,
      visit03,
      visit04,
      visit05,
      visit06,
      visit07,
      visit08,
      visit09,
      visit10
    ]
  },

  // 【相簿 2】2026加盟說明會︱汐止辦公室 (資料夾：public/albums/2026-briefing)
  {
    albumTitle: '2026加盟說明會︱汐止辦公室',
    categoryName: 'BRAND MARKETING',
    folder: '/albums/2026-briefing',
    files: [
      'briefing-01.jpg',
      'briefing-02.jpg',
      'briefing-03.jpg'
    ],
    customImages: [
      briefing01,
      briefing02,
      briefing03
    ]
  },

  // 【相簿 3】2026 台北國際連鎖加盟創業展 (資料夾：public/albums/2026-exhibition)
  {
    albumTitle: '2026台北國際連鎖加盟創業展︱台北世貿',
    categoryName: 'EXHIBITION',
    folder: '/albums/2026-exhibition',
    files: [
      'event-01.jpg', 'event-02.jpg', 'event-03.jpg', 'event-04.jpg', 'event-05.jpg',
      'event-06.jpg', 'event-07.jpg', 'event-08.jpg', 'event-09.jpg', 'event-10.png',
      'event-11.jpg', 'event-12.jpg', 'event-13.jpg', 'event-14.jpg', 'event-15.jpg',
      'event-16.jpg', 'event-17.jpg', 'event-18.jpg', 'event-19.jpg', 'event-20.jpg',
      'event-21.jpg', 'event-22.jpg', 'event-23.jpg', 'event-24.jpg', 'event-25.jpg',
      'event-26.jpg', 'event-27.jpg', 'event-28.jpg', 'event-29.jpg', 'event-30.jpg',
      'event-31.jpg', 'event-32.jpg', 'event-33.png', 'event-34.png', 'event-35.jpg'
    ]
  },

  // 【預備相簿 2】(資料夾: public/albums/album-02)
  {
    albumTitle: '最新活動相簿 02',
    categoryName: 'EVENT',
    folder: '/albums/album-02',
    files: []
  },

  // 【預備相簿 4】(資料夾: public/albums/album-04)
  {
    albumTitle: '最新活動相簿 04',
    categoryName: 'EVENT',
    folder: '/albums/album-04',
    files: []
  },

  // 【相簿 4 (最後一個相簿)】智養蝦收成流程 (資料夾: public/albums/shrimp-harvest)
  {
    albumTitle: '智養蝦收成流程',
    categoryName: 'HARVEST PROCESS',
    folder: '/albums/shrimp-harvest',
    files: [
      '01池水調控.jpg',
      '02養殖巡檢.jpg',
      '03成熟驗收.jpg',
      '04暫養管理.jpg',
      '05品質確認.jpg',
      '06收成出貨.jpg'
    ],
    customImages: [
      harvestCard01,
      harvestCard02,
      harvestCard03,
      harvestCard04,
      harvestCard05,
      harvestCard06
    ]
  }
];

// 舊版相簿名稱備份映照 (確保即使相簿改名，先前上傳的照片依然能正確對應呈現)
const LEGACY_ALBUM_TITLE_MAP: Record<string, string[]> = {
  '智養蝦收成流程': [
    '智養蝦收成流程',
    '智養蝦收成流程︱作業現場'
  ],
  '2026智養蝦參訪︱雲林': [
    '2026智養蝦參訪︱雲林',
    '2026智養蝦場參訪︱雲林',
    '2026智養蛾場參訪︱雲林',
    '2026智養農場參訪︱雲林'
  ],
  '2026智養蝦場參訪︱雲林': [
    '2026智養蝦參訪︱雲林',
    '2026智養蝦場參訪︱雲林',
    '2026智養蛾場參訪︱雲林',
    '2026智養農場參訪︱雲林'
  ],
  '2026加盟說明會︱汐止辦公室': [
    '2026加盟說明會︱汐止辦公室',
    '2026年加盟說明會︱汐止辦公室'
  ],
  '2026台北國際連鎖加盟創業展︱台北世貿': [
    '2026台北國際連鎖加盟創業展︱台北世貿',
    '2026台北國際連鎖加盟展',
    '2026台北國際連鎖加盟創業展'
  ]
};

// 圖片壓縮輔助函式：將上傳的高解析照片進行等比例壓縮，確保能高效穩健存檔於 IndexedDB 與 LocalStorage
const compressImage = (file: File, maxWidth = 1600, maxHeight = 1600, quality = 0.85): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => {
        resolve(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      resolve('');
    };
    reader.readAsDataURL(file);
  });
};

// 自動生成所有照片清單
interface GalleryItem {
  id: number;          // 全局 ID (與 allGalleryImages 索引對應)
  globalIndex: number; // 全部照片時的編號 (0, 1, 2, ...)
  albumIndex: number;  // 單獨相簿時的編號
  url: string;
  fallbackUrl: string;
  albumName: string;
  title: string;
  category: string;
}

const createGalleryImages = (
  userPhotosMap: Record<string, string[]> = {},
  allAlbumList: AlbumConfig[] = []
): GalleryItem[] => {
  let globalId = 0;
  return allAlbumList.flatMap((album) => {
    let albumPhotoId = 0;
    
    // 如果有使用者直接上傳該相簿的照片 (含舊名稱相容)，優先使用
    const aliases = LEGACY_ALBUM_TITLE_MAP[album.albumTitle] || [album.albumTitle];
    let customUserPhotos: string[] = [];
    for (const key of aliases) {
      if (userPhotosMap[key] && userPhotosMap[key].length > 0) {
        customUserPhotos = [...customUserPhotos, ...userPhotosMap[key]];
      }
    }
    if (customUserPhotos.length === 0 && userPhotosMap[album.albumTitle] && userPhotosMap[album.albumTitle].length > 0) {
      customUserPhotos = userPhotosMap[album.albumTitle];
    }

    if (customUserPhotos && customUserPhotos.length > 0) {
      return customUserPhotos.map((imgUrl) => {
        const id = globalId++;
        const albumIndex = albumPhotoId++;
        return {
          id,
          globalIndex: id,
          albumIndex,
          url: imgUrl,
          fallbackUrl: imgUrl,
          albumName: album.albumTitle,
          title: album.albumTitle,
          category: album.categoryName || 'EVENT'
        };
      });
    }

    if (album.customImages && album.customImages.length > 0) {
      return album.customImages.map((imgUrl, idx) => {
        const id = globalId++;
        const albumIndex = albumPhotoId++;
        const filename = (album.files && album.files[idx % (album.files.length || 1)]) || `event-${idx + 1}.jpg`;
        const cleanFolder = (album.folder || '').replace(/\/$/, '');
        const cleanFilename = filename.replace(/^\//, '');
        const fallbackUrl = cleanFolder ? `${cleanFolder}/${cleanFilename}` : imgUrl;
        return {
          id,
          globalIndex: id,
          albumIndex,
          url: imgUrl,
          fallbackUrl,
          albumName: album.albumTitle,
          title: album.albumTitle,
          category: album.categoryName || 'EVENT'
        };
      });
    }

    if (album.files && album.files.length > 0) {
      return album.files.map((filename) => {
        const id = globalId++;
        const albumIndex = albumPhotoId++;
        const cleanFolder = (album.folder || '').replace(/\/$/, '');
        const cleanFilename = filename.replace(/^\//, '');
        const primaryUrl = `${cleanFolder}/${cleanFilename}`;
        const fallbackUrl = `/${cleanFilename}`;
        return {
          id,
          globalIndex: id,
          albumIndex,
          url: primaryUrl,
          fallbackUrl,
          albumName: album.albumTitle,
          title: album.albumTitle,
          category: album.categoryName || 'EVENT'
        };
      });
    }

    return [];
  });
};

const allGalleryImages = createGalleryImages();

// 獨立可關聯 state 的智慧圖片元件 (包含自動備援與載入狀態)
interface SmartImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
}

const SmartImage: React.FC<SmartImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  loading = 'lazy',
  onClick
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failedAttempts, setFailedAttempts] = useState(0);

  useEffect(() => {
    setCurrentSrc(src);
    setFailedAttempts(0);
  }, [src]);

  const handleError = () => {
    const filename = src.split('/').pop() || '';
    if (failedAttempts === 0 && fallbackSrc) {
      setFailedAttempts(1);
      setCurrentSrc(fallbackSrc);
    } else if (failedAttempts === 1) {
      setFailedAttempts(2);
      setCurrentSrc(`/${filename}`);
    } else {
      setFailedAttempts(3);
      // 備援處理：確保圖片加載失敗時有乾淨的提示圖片
      setCurrentSrc('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80');
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      onError={handleError}
      onClick={onClick}
      className={className}
      referrerPolicy="no-referrer"
    />
  );
};

export default function About() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [activeAlbumTitle, setActiveAlbumTitle] = useState<string>('ALL');
  const [managedAlbumTitle, setManagedAlbumTitle] = useState<string>('2026智養蝦參訪︱雲林');

  // 自訂相簿清單 (保存在 LocalStorage)
  const [customAlbums, setCustomAlbums] = useState<AlbumConfig[]>(() => {
    try {
      const saved = localStorage.getItem('user_custom_albums_list');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 相簿名稱修改紀錄 (支援自訂或預設相簿自由重命名)
  const [albumRenames, setAlbumRenames] = useState<Record<string, { title: string; category?: string }>>(() => {
    try {
      const saved = localStorage.getItem('user_album_renames_map');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 是否正在新增相簿表單狀態
  const [isCreatingAlbum, setIsCreatingAlbum] = useState(false);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [newAlbumCategory, setNewAlbumCategory] = useState('AGRI-TECH');

  // 是否正在修改相簿名稱與分類表單狀態
  const [isEditingAlbum, setIsEditingAlbum] = useState(false);
  const [editAlbumTitle, setEditAlbumTitle] = useState('');
  const [editAlbumCategory, setEditAlbumCategory] = useState('AGRI-TECH');

  const [isLoaded, setIsLoaded] = useState(false);

  // 系統版本識別碼 (當專案相簿更新時自動失效舊本機快取以載入最新照片)
  const SYSTEM_ALBUM_VERSION = '20261021_v3';

  // 本地自訂照片管理 (支援多相簿，優先載入 IndexedDB)
  const [userPhotosMap, setUserPhotosMap] = useState<Record<string, string[]>>(() => {
    try {
      if (localStorage.getItem('system_album_version') !== SYSTEM_ALBUM_VERSION) {
        return {};
      }
      const saved = localStorage.getItem('user_album_photos_map');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 所有相簿 (包含自訂新增相簿與系統預設相簿，並自動套用自訂重命名)
  const allAlbums = useMemo(() => {
    const baseList = ALBUMS.map(album => {
      const rename = albumRenames[album.albumTitle];
      if (rename) {
        return {
          ...album,
          albumTitle: rename.title,
          categoryName: rename.category || album.categoryName
        };
      }
      return album;
    });
    return [...customAlbums, ...baseList];
  }, [customAlbums, albumRenames]);

  // 初次載入時從 IndexedDB 異步恢復所有已存檔照片
  useEffect(() => {
    const cachedVer = localStorage.getItem('system_album_version');
    if (cachedVer !== SYSTEM_ALBUM_VERSION) {
      localStorage.setItem('system_album_version', SYSTEM_ALBUM_VERSION);
      localStorage.removeItem('user_album_photos_map');
      savePhotosToIDB({});
      setUserPhotosMap({});
      setIsLoaded(true);
      return;
    }

    loadPhotosFromIDB().then((idbPhotos) => {
      if (idbPhotos && Object.keys(idbPhotos).length > 0) {
        setUserPhotosMap((prev) => {
          const merged = { ...idbPhotos };
          // 如果 local state/localStorage 有新上傳但 IDB 尚未儲存的，進行合併
          Object.keys(prev).forEach((key) => {
            if (prev[key] && prev[key].length > 0) {
              merged[key] = Array.from(new Set([...(merged[key] || []), ...prev[key]]));
            }
          });
          return merged;
        });
      }
      setIsLoaded(true);
    }).catch((err) => {
      console.warn('載入 IndexedDB 失敗:', err);
      setIsLoaded(true);
    });
  }, []);

  // 當 userPhotosMap 改變且已經載入完成後，非同步寫入 IndexedDB 與 LocalStorage
  useEffect(() => {
    if (!isLoaded) return; // 關鍵修正：尚未完成初次載入前不覆寫儲存，避免空狀態衝掉已存資料
    savePhotosToIDB(userPhotosMap);
  }, [userPhotosMap, isLoaded]);

  // 當 customAlbums 改變時寫入 LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('user_custom_albums_list', JSON.stringify(customAlbums));
    } catch (e) {
      console.warn('儲存自訂相簿失敗:', e);
    }
  }, [customAlbums]);

  // 當 albumRenames 改變時寫入 LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('user_album_renames_map', JSON.stringify(albumRenames));
    } catch (e) {
      console.warn('儲存相簿更名設定失敗:', e);
    }
  }, [albumRenames]);

  // 動態生成所有照片 (使用 useMemo 保持陣列引用穩定，確保輪播定時器載入時即可連續播放)
  const allGalleryImages = useMemo(() => createGalleryImages(userPhotosMap, allAlbums), [userPhotosMap, allAlbums]);

  // Filter gallery images based on active album
  const galleryImages = useMemo(() => {
    const filtered = activeAlbumTitle === 'ALL'
      ? allGalleryImages
      : allGalleryImages.filter(img => img.albumName === activeAlbumTitle);
    return filtered.length > 0 ? filtered : allGalleryImages;
  }, [allGalleryImages, activeAlbumTitle]);

  const totalPages = Math.ceil(galleryImages.length / itemsPerPage) || 1;

  const [selectedImage, setSelectedImage] = useState<GalleryItem>(galleryImages[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 隱藏管理模式：隨時按下 Shift + M 可直接開啟相片排序與管理面板 (網頁前台完全不顯示任何管理按鈕，保持乾淨純粹)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'M' || e.key === 'm')) {
        e.preventDefault();
        setIsManageOpen((prev) => {
          const next = !prev;
          if (next) {
            setManagedAlbumTitle(activeAlbumTitle === 'ALL' ? (allAlbums[0]?.albumTitle || '2026智養蝦參訪︱雲林') : activeAlbumTitle);
          }
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeAlbumTitle, allAlbums]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4500);
  };

  // 取得指定相簿當前所有的有效照片陣列 (自訂優先，其次為預設靜態照片)
  const getAlbumCurrentPhotos = (albumTitle: string): string[] => {
    const aliases = LEGACY_ALBUM_TITLE_MAP[albumTitle] || [albumTitle];
    let customUserPhotos: string[] = [];
    for (const key of aliases) {
      if (userPhotosMap[key] && userPhotosMap[key].length > 0) {
        customUserPhotos = [...customUserPhotos, ...userPhotosMap[key]];
      }
    }
    if (customUserPhotos.length > 0) return customUserPhotos;
    const albumObj = allAlbums.find(a => a.albumTitle === albumTitle);
    if (!albumObj) return [];
    if (albumObj.customImages && albumObj.customImages.length > 0) return albumObj.customImages;
    if (albumObj.files && albumObj.files.length > 0) {
      return albumObj.files.map(f => `${albumObj.folder.replace(/\/$/, '')}/${f.replace(/^\//, '')}`);
    }
    return [];
  };

  // 建立新相簿處理函式
  const handleCreateAlbum = () => {
    const trimmedTitle = newAlbumTitle.trim();
    if (!trimmedTitle) {
      showToast('請輸入相簿名稱！');
      return;
    }
    if (allAlbums.some(a => a.albumTitle === trimmedTitle)) {
      showToast('已存在同名相簿，請更換名稱！');
      return;
    }

    const newAlbum: AlbumConfig = {
      albumTitle: trimmedTitle,
      categoryName: newAlbumCategory || 'EVENT',
      folder: '',
      files: []
    };

    setCustomAlbums((prev) => [newAlbum, ...prev]);
    setManagedAlbumTitle(trimmedTitle);
    setActiveAlbumTitle(trimmedTitle);
    setNewAlbumTitle('');
    setIsCreatingAlbum(false);
    showToast(`🎉 已成功新增相簿「${trimmedTitle}」！您可以立即點選「批次新增照片」為此相簿上傳照片。`);
  };

  // 開啟修改相簿名稱與分類
  const handleStartEditAlbum = () => {
    const target = allAlbums.find(a => a.albumTitle === managedAlbumTitle);
    if (target) {
      setEditAlbumTitle(target.albumTitle);
      setEditAlbumCategory(target.categoryName || 'AGRI-TECH');
      setIsEditingAlbum(true);
      setIsCreatingAlbum(false);
    }
  };

  // 儲存修改相簿名稱與分類
  const handleSaveEditAlbum = () => {
    const trimmedTitle = editAlbumTitle.trim();
    if (!trimmedTitle) {
      showToast('相簿名稱不可為空！');
      return;
    }

    // 檢查是否有與其他相簿衝突 (排除自己)
    if (trimmedTitle !== managedAlbumTitle && allAlbums.some(a => a.albumTitle === trimmedTitle)) {
      showToast('已存在同名相簿，請更換名稱！');
      return;
    }

    const oldTitle = managedAlbumTitle;
    const isCustom = customAlbums.some(a => a.albumTitle === oldTitle);

    if (isCustom) {
      setCustomAlbums(prev => prev.map(a => 
        a.albumTitle === oldTitle 
          ? { ...a, albumTitle: trimmedTitle, categoryName: editAlbumCategory || a.categoryName } 
          : a
      ));
    } else {
      // 尋找原始 default ALBUMS 中的對應 key
      const defaultMatch = ALBUMS.find(a => {
        const renamed = albumRenames[a.albumTitle];
        return (renamed && renamed.title === oldTitle) || a.albumTitle === oldTitle;
      });
      const originalKey = defaultMatch ? defaultMatch.albumTitle : oldTitle;
      setAlbumRenames(prev => ({
        ...prev,
        [originalKey]: { title: trimmedTitle, category: editAlbumCategory }
      }));
    }

    // 同步搬移相片對應的 key，確保照片不遺失
    if (oldTitle !== trimmedTitle) {
      setUserPhotosMap(prev => {
        const next = { ...prev };
        if (next[oldTitle]) {
          next[trimmedTitle] = next[oldTitle];
          delete next[oldTitle];
        }
        savePhotosToIDB(next);
        return next;
      });
    }

    setManagedAlbumTitle(trimmedTitle);
    if (activeAlbumTitle === oldTitle) {
      setActiveAlbumTitle(trimmedTitle);
    }
    setIsEditingAlbum(false);
    showToast(`🎉 已成功將相簿名稱修改為「${trimmedTitle}」！`);
  };

  // 刪除自訂相簿
  const handleDeleteCustomAlbum = (albumTitle: string) => {
    if (!window.confirm(`確定要刪除自訂相簿「${albumTitle}」及其所有照片嗎？`)) {
      return;
    }

    setCustomAlbums((prev) => prev.filter(a => a.albumTitle !== albumTitle));
    setUserPhotosMap((prev) => {
      const updated = { ...prev };
      delete updated[albumTitle];
      savePhotosToIDB(updated);
      return updated;
    });

    const fallbackTitle = ALBUMS[0]?.albumTitle || '2026智養蝦參訪︱雲林';
    setManagedAlbumTitle(fallbackTitle);
    if (activeAlbumTitle === albumTitle) {
      setActiveAlbumTitle('ALL');
    }
    showToast(`已刪除自訂相簿「${albumTitle}」`);
  };

  // 調整相片在相簿中的順序 (往前移或往後移)
  const handleMovePhoto = (albumTitle: string, index: number, direction: 'left' | 'right') => {
    const currentList = [...getAlbumCurrentPhotos(albumTitle)];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentList.length) return;

    const temp = currentList[index];
    currentList[index] = currentList[targetIndex];
    currentList[targetIndex] = temp;

    setUserPhotosMap((prev) => {
      const updated = { ...prev, [albumTitle]: currentList };
      savePhotosToIDB(updated);
      return updated;
    });
    showToast(`已調整相片順序至 第 ${targetIndex + 1} 張`);
  };

  // 設為相簿第 1 張 (封面首圖)
  const handleSetCover = (albumTitle: string, index: number) => {
    const currentList = [...getAlbumCurrentPhotos(albumTitle)];
    if (index <= 0 || index >= currentList.length) return;
    const [selected] = currentList.splice(index, 1);
    currentList.unshift(selected);

    setUserPhotosMap((prev) => {
      const updated = { ...prev, [albumTitle]: currentList };
      savePhotosToIDB(updated);
      return updated;
    });
    showToast(`已將該照片設為「${albumTitle}」第 1 張封面！`);
  };

  // 刪除相簿中的指定單張照片
  const handleDeletePhoto = (albumTitle: string, index: number) => {
    const currentList = [...getAlbumCurrentPhotos(albumTitle)];
    if (index < 0 || index >= currentList.length) return;
    currentList.splice(index, 1);

    setUserPhotosMap((prev) => {
      const updated = { ...prev, [albumTitle]: currentList };
      savePhotosToIDB(updated);
      return updated;
    });
    showToast(`已從「${albumTitle}」移除第 ${index + 1} 張照片`);
  };

  // 當相簿圖片變動時修正選取項
  useEffect(() => {
    if (galleryImages.length > 0) {
      if (!selectedImage || !galleryImages.some(img => img.id === selectedImage?.id)) {
        setSelectedImage(galleryImages[0]);
      }
    }
  }, [galleryImages]);

  // 處理照片檔案串列 (適用於點擊選擇與拖曳上傳)
  const processFileList = (filesList: FileList | File[]) => {
    const files = Array.from(filesList).filter(f => f.type.startsWith('image/'));
    if (files.length === 0) return;

    // 確定要上傳到的目標相簿名稱 (以目前管理中相簿優先，其次為目前選取相簿)
    const targetAlbumName = managedAlbumTitle || (activeAlbumTitle === 'ALL' ? (allAlbums[0]?.albumTitle || '2026智養蝦參訪︱雲林') : activeAlbumTitle);

    showToast(`正在壓縮並儲存 ${files.length} 張照片中...`);

    const readPromises = files.map((file: File) => compressImage(file));

    Promise.all(readPromises).then((compressedUrls) => {
      const validUrls = compressedUrls.filter(Boolean);
      if (validUrls.length === 0) return;

      setUserPhotosMap((prev) => {
        const existing = prev[targetAlbumName] || [];
        const updatedMap = {
          ...prev,
          [targetAlbumName]: [...existing, ...validUrls]
        };
        // 立即存檔至 IDB 與 LocalStorage
        savePhotosToIDB(updatedMap);
        return updatedMap;
      });

      // 自動切換到該相簿並將第一張新照片選中
      setActiveAlbumTitle(targetAlbumName);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      showToast(`已成功存檔「${targetAlbumName}」共 ${validUrls.length} 張照片！`);
    });
  };

  // 上傳本地照片處理 (從檔案選擇器)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFileList(e.target.files);
    }
  };

  // 拖曳上傳 event handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFileList(e.dataTransfer.files);
    }
  };

  // 重設/清除該相簿的自訂上傳照片
  const handleResetPhotos = () => {
    const targetAlbumName = managedAlbumTitle || (activeAlbumTitle === 'ALL' 
      ? (allAlbums[0]?.albumTitle || '2026智養蝦參訪︱雲林') 
      : activeAlbumTitle);

    const isCustom = customAlbums.some(a => a.albumTitle === targetAlbumName);

    if (window.confirm(isCustom ? `確定要清空「${targetAlbumName}」的所有照片嗎？` : `確定要將「${targetAlbumName}」恢復為系統預設照片嗎？`)) {
      setUserPhotosMap((prev) => {
        const next = { ...prev };
        delete next[targetAlbumName];
        const aliases = LEGACY_ALBUM_TITLE_MAP[targetAlbumName] || [];
        aliases.forEach((alias) => {
          delete next[alias];
        });
        savePhotosToIDB(next);
        return next;
      });
      showToast(isCustom ? `已清空「${targetAlbumName}」的所有照片` : `已恢復「${targetAlbumName}」的預設照片清單`);
    }
  };

  // Update selected image when active album tab changes
  const handleSelectAlbum = (albumTitle: string) => {
    setActiveAlbumTitle(albumTitle);
    setCurrentPage(1);
    // Keep auto-playing: DO NOT pause auto-play on tab switch
    const newFiltered = albumTitle === 'ALL'
      ? allGalleryImages
      : allGalleryImages.filter(img => img.albumName === albumTitle);
    if (newFiltered.length > 0) {
      setSelectedImage(newFiltered[0]);
    }
  };

  // 網頁載入時即自動開始播放照片輪播
  useEffect(() => {
    if (!isPlaying || galleryImages.length === 0) return;

    const timer = setInterval(() => {
      setSelectedImage((prevImage) => {
        const currentIndex = galleryImages.findIndex(img => img.id === prevImage?.id);
        const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % galleryImages.length : 0;
        const nextImage = galleryImages[nextIndex];
        
        // 自動切換頁碼以顯示新選中的照片
        const newPage = Math.ceil((nextIndex + 1) / itemsPerPage);
        setCurrentPage(newPage);
        
        return nextImage;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [isPlaying, galleryImages, itemsPerPage]);

  const currentSelectedImage = selectedImage || galleryImages[0];

  const currentImages = galleryImages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(p => p + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(p => p - 1);
    }
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-20 pb-6 sm:pb-8 bg-slate-900/10 backdrop-blur-sm border-b border-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            關於我們
          </motion.h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            以科技創新為核心，賦能產業邁向智能化。
          </p>
        </div>
      </section>

      {/* Large Images Section */}
      <section className="w-full overflow-hidden flex flex-col">
        {/* Top Image: Banner */}
        <div className="w-full relative group">
          <div className="w-full overflow-hidden relative z-10">
            <img 
              src="/banner-company.png" 
              alt="合祥智慧科技" 
              className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          </div>
        </div>

        {/* Bottom Image: Banner */}
        <div className="w-full relative group">
          <div className="w-full overflow-hidden relative z-10">
            <img 
              src="/banner-esg.png" 
              alt="智養蝦 ESG 永續共好平台" 
              className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Activity Gallery Section */}
      <section 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="relative py-24 bg-slate-950/20 backdrop-blur-sm border-t border-slate-800"
      >
        {/* 拖曳上傳提示覆蓋層 */}
        {isDragging && (
          <div className="absolute inset-0 z-50 bg-cyan-950/90 border-4 border-dashed border-cyan-400 backdrop-blur-md flex flex-col items-center justify-center text-cyan-300 transition-all">
            <Upload className="w-16 h-16 animate-bounce mb-4 text-cyan-400" />
            <p className="text-xl font-bold">放開滑鼠即可將照片上傳至</p>
            <p className="text-2xl font-extrabold text-white mt-2 bg-slate-900 px-6 py-2 rounded-full border border-cyan-500/50">
              「{activeAlbumTitle === 'ALL' ? (ALBUMS[0]?.albumTitle || '2026智養蝦場參訪︱雲林') : activeAlbumTitle}」
            </p>
          </div>
        )}

        {/* 浮動狀態通知 Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-8 right-8 z-50 bg-slate-900/95 border border-cyan-500 text-cyan-200 px-6 py-3.5 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center gap-3 font-medium text-sm backdrop-blur-md"
            >
              <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></span>
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white mb-4"
            >
              品牌行銷
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-16 h-1 bg-cyan-500 mx-auto rounded-full mb-8"
            ></motion.div>

            {/* Album Selection Tabs & Auto-play Control */}
            <div className="flex flex-col items-center gap-4 max-w-5xl mx-auto w-full px-2 sm:px-4">
              <div className="w-full max-w-lg sm:max-w-4xl mx-auto flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                <button
                  onClick={() => handleSelectAlbum('ALL')}
                  className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs xs:text-sm font-bold tracking-wider transition-all flex items-center justify-start sm:justify-center gap-3 sm:gap-2 text-left sm:text-center min-h-[56px] sm:min-h-[48px] h-auto ${
                    activeAlbumTitle === 'ALL'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-cyan-300/60 scale-[1.01] sm:scale-[1.02]'
                      : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700/80 hover:border-cyan-400/50 hover:bg-slate-800/90 shadow-md'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-xs shrink-0 ${activeAlbumTitle === 'ALL' ? 'bg-cyan-200' : 'bg-cyan-400/70'}`} />
                  <span className="leading-tight font-bold whitespace-nowrap text-left sm:text-center flex-1 sm:flex-initial">全部照片</span>
                </button>
                {allAlbums.filter(a => {
                  const photos = getAlbumCurrentPhotos(a.albumTitle);
                  return photos.length > 0;
                }).map((album) => {
                  const isActive = activeAlbumTitle === album.albumTitle;
                  // 若包含 ︱ 或 |，在分隔符前換行（第一行最後一個字為分隔符前一個字，第二行第一個字為 ︱）
                  const hasPipe = album.albumTitle.includes('︱') || album.albumTitle.includes('|');
                  const pipeChar = album.albumTitle.includes('︱') ? '︱' : '|';
                  const parts = hasPipe ? album.albumTitle.split(pipeChar) : [album.albumTitle];

                  return (
                    <button
                      key={album.albumTitle}
                      onClick={() => handleSelectAlbum(album.albumTitle)}
                      className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs xs:text-[13px] sm:text-sm font-bold tracking-normal xs:tracking-wider transition-all flex items-center justify-start sm:justify-center gap-3 sm:gap-2 text-left sm:text-center min-h-[56px] sm:min-h-[48px] h-auto ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-cyan-300/60 scale-[1.01] sm:scale-[1.02]'
                          : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700/80 hover:border-cyan-400/50 hover:bg-slate-800/90 shadow-md'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-xs shrink-0 ${isActive ? 'bg-cyan-200' : 'bg-cyan-400/70'}`} />
                      {hasPipe && parts.length >= 2 ? (
                        <span className="flex-1 sm:flex-initial flex flex-col items-start sm:items-center sm:inline-block leading-tight text-left sm:text-center">
                          <span className="sm:hidden whitespace-nowrap text-xs xs:text-[13px]">{parts[0]}</span>
                          <span className="sm:hidden text-cyan-300 font-medium whitespace-nowrap text-[11px] xs:text-xs sm:text-xs mt-0.5">{pipeChar}{parts.slice(1).join(pipeChar)}</span>
                          <span className="hidden sm:inline whitespace-nowrap">{album.albumTitle}</span>
                        </span>
                      ) : (
                        <span className="leading-tight whitespace-nowrap text-left sm:text-center flex-1 sm:flex-initial">{album.albumTitle}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div 
            className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch w-full"
          >
            {/* Left: Selected Image Display */}
            <div className="w-full flex-1 flex flex-col justify-between">
              <div className="flex flex-col w-full">
                {/* Branding or Section Title above */}
                <div className="flex items-end gap-3 mb-4 lg:mb-5 h-12">
                  <span className="text-4xl lg:text-5xl font-bold tracking-[0.2em] text-cyan-400 leading-none font-mono">
                    {String((activeAlbumTitle === 'ALL' ? (currentSelectedImage?.globalIndex ?? 0) : (currentSelectedImage?.albumIndex ?? 0)) + 1).padStart(2, '0')}
                  </span>
                  <div className="h-[2px] bg-slate-700 flex-1 mb-2 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-cyan-500"></div>
                  </div>
                </div>
                
                {/* Main Large Image */}
                <div 
                  onClick={() => setIsLightboxOpen(true)}
                  className="relative aspect-[5/4] bg-slate-900/50 backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.15)] border border-cyan-500/30 p-2 md:p-3 group cursor-pointer"
                >
                  {/* Tech Corners */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

                  {/* Zoom Badge */}
                  <div className="absolute top-4 right-4 z-20 bg-slate-950/80 border border-cyan-500/50 p-2 rounded-full text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-5 h-5" />
                  </div>

                  <div className="w-full h-full relative overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSelectedImage?.id ?? 'selected-img'}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 w-full h-full flex items-center justify-center"
                      >
                        <SmartImage
                          src={currentSelectedImage?.url ?? ''}
                          fallbackSrc={currentSelectedImage?.fallbackUrl ?? ''}
                          alt={currentSelectedImage?.title ?? ''}
                          loading="eager"
                          className="relative w-full h-full object-contain drop-shadow-2xl z-10"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              
              {/* Extended info beneath image */}
              <div className="mt-8 flex items-end pl-4 border-l-[3px] border-cyan-500 h-[48px] pb-1">
                <motion.div 
                  key={`desc-${currentSelectedImage?.id ?? 'selected-desc'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-base sm:text-lg text-slate-300 tracking-wider leading-none font-bold drop-shadow-md">
                    {currentSelectedImage?.albumName ?? ''}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Right: Pages Grid & Pagination */}
            <div className="w-full flex-1 flex flex-col justify-between mt-8 lg:mt-0">
              
              <div className="flex flex-col w-full h-full">
                {/* Spacer to align 9-grid top with left image frame top */}
                <div className="hidden lg:block h-12 mb-4 lg:mb-5 relative">
                   <div className="absolute bottom-2 left-0 text-cyan-500/50 font-mono text-[10px] tracking-widest uppercase">DATABASE // REPOSITORY</div>
                </div>
                
                {/* Gallery Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 w-full mb-6">
                  <AnimatePresence mode="popLayout">
                    {currentImages.map((img, i) => (
                       <motion.div
                        key={img.id}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        onClick={() => setSelectedImage(img)}
                        className={`relative aspect-[4/3] p-1 md:p-1.5 transition-all duration-300 cursor-pointer group flex flex-col border ${currentSelectedImage?.id === img.id ? 'bg-[#38bdf8] border-white shadow-[0_0_20px_rgba(56,189,248,0.8)] scale-[1.03] z-10' : 'bg-slate-900/80 border-slate-700 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:scale-[1.02] hover:z-10'}`}
                      >
                        {/* Tech Corners (Small) */}
                        <div className={`absolute top-0 left-0 w-2 h-2 border-t flex ${currentSelectedImage?.id === img.id ? 'border-slate-950 border-l' : 'border-slate-500 border-l group-hover:border-cyan-400'}`}></div>
                        <div className={`absolute bottom-0 right-0 w-2 h-2 border-b flex ${currentSelectedImage?.id === img.id ? 'border-slate-950 border-r' : 'border-slate-500 border-r group-hover:border-cyan-400'}`}></div>

                        {/* Main Image Container */}
                        <div className="flex-1 overflow-hidden relative bg-slate-950">
                          <SmartImage
                            src={img.url}
                            fallbackSrc={img.fallbackUrl}
                            alt={img.title}
                            loading="lazy"
                            className={`relative z-10 w-full h-full object-contain transition-all duration-500 ${currentSelectedImage?.id === img.id ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}
                          />
                          <div className={`absolute inset-0 border transition-colors z-20 pointer-events-none ${currentSelectedImage?.id === img.id ? 'border-cyan-500/30' : 'border-transparent group-hover:border-cyan-500/20'}`}></div>
                        </div>

                        {/* Bottom Layout (Title & Number) */}
                        <div className="pt-2 flex justify-between items-end bg-transparent relative z-10">
                          <div className="flex flex-col overflow-hidden px-1">
                            <span className={`text-[9px] font-bold tracking-[0.2em] mb-0.5 font-mono ${currentSelectedImage?.id === img.id ? 'text-slate-950 font-black' : 'text-cyan-500/80'}`}>{img.category}</span>
                            <h4 className={`text-[10px] font-bold leading-tight truncate w-full max-w-[120px] ${currentSelectedImage?.id === img.id ? 'text-slate-950 font-black' : 'text-slate-200'}`}>{img.title.replace('\n', ' ')}</h4>
                          </div>
                          <span className={`text-xs font-bold tracking-wider pl-2 font-mono ${currentSelectedImage?.id === img.id ? 'text-slate-950 border-l border-slate-900/40 font-black' : 'text-cyan-400/50 border-l border-slate-700'}`}>
                            {String((activeAlbumTitle === 'ALL' ? img.globalIndex : img.albumIndex) + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center justify-center gap-3 md:gap-5 h-[48px] mt-auto">
                <button 
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full border border-slate-700 text-slate-400 bg-slate-900/50 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 hover:text-white hover:border-cyan-500 transition-all flex items-center justify-center shrink-0"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-2 md:gap-3 px-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-sm md:text-base font-bold transition-all shrink-0 ${
                        currentPage === i + 1 
                          ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-110 border border-transparent' 
                          : 'bg-slate-800/80 text-slate-400 border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-slate-800'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-full border border-slate-700 text-slate-400 bg-slate-900/50 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 hover:text-white hover:border-cyan-500 transition-all flex items-center justify-center shrink-0"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-between p-4 md:p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Modal Header */}
            <div className="w-full max-w-7xl flex items-center justify-between text-white z-10" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-mono text-xl font-bold">
                  {String((activeAlbumTitle === 'ALL' ? selectedImage.globalIndex : selectedImage.albumIndex) + 1).padStart(2, '0')} / {galleryImages.length}
                </span>
                <span className="text-slate-400 text-sm font-medium border-l border-slate-700 pl-3">
                  {selectedImage.albumName}
                </span>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div 
              className="relative w-full max-w-6xl flex-1 flex items-center justify-center my-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <SmartImage
                src={selectedImage.url}
                fallbackSrc={selectedImage.fallbackUrl}
                alt={selectedImage.title}
                loading="eager"
                className="max-w-full max-h-[80vh] object-contain drop-shadow-[0_0_50px_rgba(6,182,212,0.3)]"
              />
            </div>

            {/* Modal Navigation Controls */}
            <div 
              className="w-full max-w-md flex items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 px-6 py-3 rounded-full z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  const idx = galleryImages.findIndex(img => img.id === selectedImage.id);
                  const prevIdx = idx > 0 ? idx - 1 : galleryImages.length - 1;
                  setSelectedImage(galleryImages[prevIdx]);
                }}
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 font-medium text-sm transition-colors"
              >
                <ChevronLeft className="w-5 h-5" /> 上一張
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1.5 rounded-full"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? '輪播中' : '已暫停'}</span>
              </button>

              <button
                onClick={() => {
                  const idx = galleryImages.findIndex(img => img.id === selectedImage.id);
                  const nextIdx = (idx + 1) % galleryImages.length;
                  setSelectedImage(galleryImages[nextIdx]);
                }}
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 font-medium text-sm transition-colors"
              >
                下一張 <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 隱藏的檔案上傳 Input (支援多選批次上傳) */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        multiple 
        accept="image/*" 
        className="hidden" 
      />

      {/* 相片與相簿排序管理面板 Modal */}
      <AnimatePresence>
        {isManageOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsManageOpen(false)}
          >
            <div 
              className="w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-cyan-500/40 rounded-2xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
                    <SlidersHorizontal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      相簿與相片總體管理
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      可在此切換相簿、自由新增自訂相簿、調整相片順序、設定封面與上傳新相片。
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => {
                      setIsCreatingAlbum((prev) => !prev);
                      if (!isCreatingAlbum) setIsEditingAlbum(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <FolderPlus className="w-4 h-4 text-cyan-400" />
                    <span>{isCreatingAlbum ? '收合相簿表單' : '➕ 新增相簿'}</span>
                  </button>

                  <button 
                    onClick={() => setIsManageOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {/* 修改相簿名稱與分類表單 (可收合/展開) */}
                <AnimatePresence>
                  {isEditingAlbum && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden bg-slate-950/90 border border-amber-500/50 rounded-xl p-4 sm:p-5 shadow-lg space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                          <Pencil className="w-4 h-4 text-amber-400" />
                          <span>修改目前相簿名稱與分類標籤</span>
                        </div>
                        <span className="text-[11px] text-amber-400/80 font-mono bg-amber-950/50 px-2 py-0.5 rounded-md border border-amber-500/30">
                          目前編輯：{managedAlbumTitle}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-xs text-slate-300 font-medium flex items-center gap-1">
                            <span>相簿名稱</span>
                            <span className="text-[10px] text-slate-500">(支援以 ︱ 分隔副標題，如 2026智養蝦參訪︱雲林)</span>
                          </label>
                          <input
                            type="text"
                            placeholder="輸入新的相簿名稱"
                            value={editAlbumTitle}
                            onChange={(e) => setEditAlbumTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveEditAlbum();
                            }}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden focus:border-amber-400 transition-colors placeholder:text-slate-600"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-slate-300 font-medium">分類標籤</label>
                          <select
                            value={editAlbumCategory}
                            onChange={(e) => setEditAlbumCategory(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden focus:border-amber-400 transition-colors"
                          >
                            <option value="AGRI-TECH">AGRI-TECH (智慧農業)</option>
                            <option value="EXHIBITION">EXHIBITION (展覽展會)</option>
                            <option value="EVENT">EVENT (主題活動)</option>
                            <option value="BRAND MARKETING">BRAND MARKETING (品牌行銷)</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          onClick={() => setIsEditingAlbum(false)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                        >
                          取消
                        </button>
                        <button
                          onClick={handleSaveEditAlbum}
                          className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md"
                        >
                          <Check className="w-3.5 h-3.5" />
                          儲存修改名稱
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 新增相簿表單 (可收合/展開) */}
                <AnimatePresence>
                  {isCreatingAlbum && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden bg-slate-950/80 border border-cyan-500/40 rounded-xl p-4 sm:p-5 shadow-lg space-y-3"
                    >
                      <div className="flex items-center gap-2 text-sm font-bold text-cyan-300">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span>建立全新相簿</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-xs text-slate-400 font-medium">相簿名稱 (支援以 ︱ 分隔副標題)</label>
                          <input
                            type="text"
                            placeholder="例如：2026台南智慧養殖示範場︱台南七股"
                            value={newAlbumTitle}
                            onChange={(e) => setNewAlbumTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCreateAlbum();
                            }}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden focus:border-cyan-400 transition-colors placeholder:text-slate-600"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-slate-400 font-medium">分類標籤</label>
                          <select
                            value={newAlbumCategory}
                            onChange={(e) => setNewAlbumCategory(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden focus:border-cyan-400 transition-colors"
                          >
                            <option value="AGRI-TECH">AGRI-TECH (智慧農業)</option>
                            <option value="EXHIBITION">EXHIBITION (展覽展會)</option>
                            <option value="EVENT">EVENT (主題活動)</option>
                            <option value="BRAND MARKETING">BRAND MARKETING (品牌行銷)</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          onClick={() => setIsCreatingAlbum(false)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                        >
                          取消
                        </button>
                        <button
                          onClick={handleCreateAlbum}
                          className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          確認建立相簿
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 相簿切換器與動作列 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono shrink-0">選擇相簿：</span>
                    <select
                      value={managedAlbumTitle}
                      onChange={(e) => {
                        setManagedAlbumTitle(e.target.value);
                        setActiveAlbumTitle(e.target.value);
                        if (isEditingAlbum) {
                          const target = allAlbums.find(a => a.albumTitle === e.target.value);
                          if (target) {
                            setEditAlbumTitle(target.albumTitle);
                            setEditAlbumCategory(target.categoryName || 'AGRI-TECH');
                          }
                        }
                      }}
                      className="bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-hidden focus:border-cyan-400 cursor-pointer"
                    >
                      {allAlbums.map((album) => {
                        const count = getAlbumCurrentPhotos(album.albumTitle).length;
                        const isCustom = customAlbums.some(ca => ca.albumTitle === album.albumTitle);
                        return (
                          <option key={album.albumTitle} value={album.albumTitle}>
                            {isCustom ? '⭐ ' : ''}{album.albumTitle} ({count} 張)
                          </option>
                        );
                      })}
                    </select>

                    <button
                      onClick={handleStartEditAlbum}
                      className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-medium transition-colors flex items-center gap-1"
                      title="修改此相簿名稱"
                    >
                      <Pencil className="w-3.5 h-3.5 text-amber-400" />
                      <span>修改名稱</span>
                    </button>

                    {customAlbums.some(ca => ca.albumTitle === managedAlbumTitle) && (
                      <button
                        onClick={() => handleDeleteCustomAlbum(managedAlbumTitle)}
                        className="px-2.5 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-xs font-medium transition-colors flex items-center gap-1"
                        title="刪除此自訂相簿"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>刪除此相簿</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-colors flex items-center gap-1.5 shadow-md"
                    >
                      <ImagePlus className="w-4 h-4" />
                      批次新增照片
                    </button>
                    <button
                      onClick={handleResetPhotos}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-red-950/40 border border-slate-700 hover:border-red-500/30 text-xs font-medium transition-colors flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      {customAlbums.some(ca => ca.albumTitle === managedAlbumTitle) ? '清空照片' : '恢復預設'}
                    </button>
                  </div>
                </div>

                {/* Photo Cards Grid */}
                {(() => {
                  const photoList = getAlbumCurrentPhotos(managedAlbumTitle);

                  if (photoList.length === 0) {
                    return (
                      <div className="py-16 text-center border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/30">
                        <FolderOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-300 text-sm font-bold">「{managedAlbumTitle}」目前尚未包含任何照片</p>
                        <p className="text-slate-500 text-xs mt-1">點擊下方按鈕即可立即從電腦多選上傳照片加入此相簿</p>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="mt-4 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-colors inline-flex items-center gap-1.5 shadow-lg"
                        >
                          <ImagePlus className="w-4 h-4" />
                          立即點擊批次上傳照片
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                      {photoList.map((photoUrl, idx) => (
                        <div 
                          key={`${photoUrl}-${idx}`}
                          className="relative bg-slate-950 border border-slate-800 rounded-xl overflow-hidden group flex flex-col hover:border-cyan-500/50 transition-all shadow-md"
                        >
                          {/* Index Badge */}
                          <div className="absolute top-2 left-2 z-20 bg-slate-900/90 text-cyan-300 font-mono text-xs font-bold px-2 py-0.5 rounded-md border border-cyan-500/40 shadow-sm flex items-center gap-1">
                            {idx === 0 && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                            #{String(idx + 1).padStart(2, '0')}
                          </div>

                          {/* Image */}
                          <div className="aspect-[4/3] relative overflow-hidden bg-black/40 flex items-center justify-center">
                            <img 
                              src={photoUrl} 
                              alt={`Photo ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Toolbar Actions below each photo */}
                          <div className="p-2 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-1 text-slate-300">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleMovePhoto(managedAlbumTitle, idx, 'left')}
                                disabled={idx === 0}
                                title="往前移動一位"
                                className="p-1.5 rounded bg-slate-800 hover:bg-cyan-600 hover:text-white disabled:opacity-30 disabled:hover:bg-slate-800 disabled:hover:text-slate-300 transition-colors"
                              >
                                <ArrowLeft className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleMovePhoto(managedAlbumTitle, idx, 'right')}
                                disabled={idx === photoList.length - 1}
                                title="往後移動一位"
                                className="p-1.5 rounded bg-slate-800 hover:bg-cyan-600 hover:text-white disabled:opacity-30 disabled:hover:bg-slate-800 disabled:hover:text-slate-300 transition-colors"
                              >
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center gap-1">
                              {idx !== 0 && (
                                <button
                                  onClick={() => handleSetCover(managedAlbumTitle, idx)}
                                  title="設為第1張 (封面)"
                                  className="p-1.5 rounded bg-slate-800 hover:bg-amber-600 hover:text-white transition-colors"
                                >
                                  <Star className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeletePhoto(managedAlbumTitle, idx)}
                                title="刪除這張照片"
                                className="p-1.5 rounded bg-slate-800 hover:bg-red-600 hover:text-white text-slate-400 hover:text-white transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
                <p className="text-xs text-slate-400 font-mono">
                  提示：點選「➕ 新增相簿」可建立相簿；「⬅️ / ➡️」可調整順序；「⭐️」可設為封面。
                </p>
                <button
                  onClick={() => setIsManageOpen(false)}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                >
                  完成並返回
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
