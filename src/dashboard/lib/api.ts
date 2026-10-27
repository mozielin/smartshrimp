import { PondInfo, PondId } from '../types';

interface ApiConfig {
  domain: string;
  token: string | null;
  username: string | null;
}

const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

/**
 * 取得乾淨、正確的 API Domain：
 * 1. 若外部或遠端訪問 (非本機 localhost)，即使 localStorage 存有 localhost / 127.0.0.1，也自動作廢並回傳空字串 ''，
 *    讓瀏覽器走相對路徑 (由 Vite proxy 或反向代理轉發)，避免遠端用戶端打到自己的 localhost。
 * 2. 若有明確指定且非本機衝突的 domain，則正常使用。
 */
export const getCleanApiDomain = (rawDomain?: string): string => {
  let domain = (rawDomain !== undefined ? rawDomain : (apiConfig?.domain || '')).trim().replace(/\/$/, '');
  const isBrowserRemote = typeof window !== 'undefined' && 
    window.location.hostname !== 'localhost' && 
    window.location.hostname !== '127.0.0.1';

  if (isBrowserRemote && (domain.includes('localhost') || domain.includes('127.0.0.1'))) {
    return '';
  }
  return domain;
};

const getStoredConfig = (): ApiConfig => {
  try {
    let domain = localStorage.getItem('shrimp_api_domain') || '';
    const isBrowserRemote = typeof window !== 'undefined' && 
      window.location.hostname !== 'localhost' && 
      window.location.hostname !== '127.0.0.1';

    // 若從遠端連線，但本機殘留 localhost 設定，自動清理
    if (isBrowserRemote && (domain.includes('localhost') || domain.includes('127.0.0.1'))) {
      domain = '';
      localStorage.removeItem('shrimp_api_domain');
    }

    const token = localStorage.getItem('shrimp_api_token') || localStorage.getItem('member_token');
    const username = localStorage.getItem('shrimp_api_username') || 'admin';
    return { domain, token, username };
  } catch (e) {
    return { domain: '', token: null, username: null };
  }
};

export const apiConfig = getStoredConfig();

export const isConnectedToApi = (): boolean => {
  return !!(apiConfig.token || localStorage.getItem('member_token'));
};

export const setApiCredentials = (domain: string, token: string, username: string) => {
  const targetDomain = domain ? domain.trim().replace(/\/$/, '') : '';
  apiConfig.domain = targetDomain;
  apiConfig.token = token;
  apiConfig.username = username;
  try {
    localStorage.setItem('shrimp_api_domain', targetDomain);
    localStorage.setItem('shrimp_api_token', token);
    localStorage.setItem('member_token', token);
    localStorage.setItem('shrimp_token', token); // 同步給後台 admin.html
    localStorage.setItem('hm_token', token);     // 同步給 harvest_manager.html
    localStorage.setItem('shrimp_api_username', username);
  } catch (e) {
    console.error('Failed to store API credentials in localStorage', e);
  }
};

export const clearApiCredentials = () => {
  apiConfig.token = null;
  apiConfig.username = null;
  try {
    localStorage.removeItem('shrimp_api_domain');
    localStorage.removeItem('shrimp_api_token');
    localStorage.removeItem('member_token');
    localStorage.removeItem('shrimp_token');
    localStorage.removeItem('hm_token');
    localStorage.removeItem('shrimp_api_username');
  } catch (e) {
    console.error('Failed to clear credentials', e);
  }
};

async function authFetch(path: string, options: RequestInit = {}): Promise<any> {
  const domain = getCleanApiDomain();
  const url = `${domain}${path.startsWith('/') ? path : '/' + path}`;
  const headers = new Headers(options.headers || {});
  if (apiConfig.token) {
    headers.set('Authorization', `Bearer ${apiConfig.token}`);
  }
  const res = await fetch(url, { ...options, headers, mode: 'cors' });
  if (res.status === 401 || res.status === 403) {
    clearApiCredentials();
    throw new Error('登入憑證失效，請重新登入');
  }
  if (!res.ok) {
    throw new Error(`API 請求失敗: ${res.statusText} (${res.status})`);
  }
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json();
  }
  return res.text();
}

export const shrimpApi = {
  async login(username: string, password: string, customDomain?: string): Promise<{ access_token: string }> {
    const domain = getCleanApiDomain(customDomain);
    const url = `${domain}/auth/login`;
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
      mode: 'cors'
    });
    if (!res.ok) {
      if (res.status === 401) throw new Error('帳號或密碼錯誤 (401)');
      throw new Error(`登入連線失敗: ${res.statusText} (${res.status})`);
    }
    const data = await res.json();
    if (!data.access_token) throw new Error('伺服器回傳格式不正確：缺少 access_token');
    setApiCredentials(domain, data.access_token, username);
    return data;
  },
  async getMe(): Promise<{ username: string; role?: string }> { return authFetch('/auth/me'); },
  async getUsers(): Promise<any[]> { return authFetch('/auth/users'); },
  async getPonds(): Promise<any[]> { return authFetch('/ponds/'); },
  async getPondsSummary(): Promise<any> { return authFetch('/ponds/summary'); },
  async getSensors(): Promise<any[]> { return authFetch('/sensors/'); },
  async getAdminPonds(): Promise<any[]> { return authFetch('/admin/ponds'); },
  async getCameras(): Promise<any[]> { return authFetch('/cameras/'); },
  getSnapshotUrl(camId: string): string {
    const domain = getCleanApiDomain();
    const token = apiConfig.token || (typeof localStorage !== 'undefined' ? localStorage.getItem('shrimp_api_token') || localStorage.getItem('member_token') : null);
    const tokenPart = token ? `?token=${encodeURIComponent(token)}` : '';
    return `${domain}/cameras/${camId}/snapshot${tokenPart}`;
  },
  getStreamUrl(camId: string): string {
    const domain = getCleanApiDomain();
    const token = apiConfig.token || (typeof localStorage !== 'undefined' ? localStorage.getItem('shrimp_api_token') || localStorage.getItem('member_token') : null);
    const tokenPart = token ? `?token=${encodeURIComponent(token)}` : '';
    return `${domain}/cameras/${camId}/stream${tokenPart}`;
  },
  getStaticAdminUrl(): string {
    const domain = getCleanApiDomain();
    const token = apiConfig.token || (typeof localStorage !== 'undefined' ? localStorage.getItem('shrimp_api_token') || localStorage.getItem('member_token') : null);
    const tokenPart = token ? `?token=${encodeURIComponent(token)}` : '';
    return `${domain}/static/admin.html${tokenPart}`;
  },
  getStaticHarvestUrl(): string {
    const domain = getCleanApiDomain();
    const token = apiConfig.token || (typeof localStorage !== 'undefined' ? localStorage.getItem('shrimp_api_token') || localStorage.getItem('member_token') : null);
    const tokenPart = token ? `?token=${encodeURIComponent(token)}` : '';
    return `${domain}/static/harvest_manager.html${tokenPart}`;
  }
};
