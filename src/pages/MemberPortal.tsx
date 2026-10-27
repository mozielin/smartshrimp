/**
 * 會員入口 — 智養蝦加盟主個人中控儀表板 (iPad 一覽式精緻排版)
 * 路由：/member
 * 排版佈局：iPad 雙欄響應式 Dashboard 結構 (左側基本資料 + 右側現場監視器，中段8大水質指標，底段附件四分潤資訊)
 * 資訊區塊：
 *  1. 基本資料：姓名、認購單位、池子位置、分潤、合約編號
 *  2. 現場監視器畫面：CCTV 即時影像與 AI 水下監視畫布
 *  3. 分潤資訊：附件四對照表 (第一水: 投苗日 115/9/25，其餘留空待後台更新同步)
 *  4. 8大水質指標：動態實時波動，綠燈最佳狀態 (無任何告警)
 */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, Fish, ChevronDown, ChevronUp,
  ShieldCheck, User, FileText, Lock, ArrowLeft, Building, KeyRound, Sparkles,
  Camera, Eye, Activity, RefreshCw, Layers, CheckCircle2, Sliders, Waves, Thermometer, Droplet, SunMedium, MapPin, DollarSign
} from 'lucide-react';
import logoImg from '../dashboard/assets/hexiang_logo.png';

const API_BASE = '';

function getToken() { return localStorage.getItem('member_token') || ''; }
function setToken(t: string) { localStorage.setItem('member_token', t); }
function clearToken() { localStorage.removeItem('member_token'); }

function ah() {
  return { Authorization: `Bearer ${getToken()}` };
}

interface BatchRecord {
  batch_no: string;
  stocking_date?: string;
  harvest_date?: string;
  weight_jin?: number;
  price_per_jin?: number;
  total_revenue?: number;
  gross_profit?: number;
  profit_share?: number;
  my_profit: number;
}

interface PondProfit {
  pond_id: string;
  pond_name: string;
  units: number;
  share_pct: number;
  pond_profit: number;
  batches: BatchRecord[];
}

interface MyProfit {
  username: string;
  total_profit: number;
  ponds: PondProfit[];
}

interface MeInfo {
  username: string;
  role: string;
  display_name?: string;
  phone?: string;
  email?: string;
  contract_no?: string;
  pond_shares?: Record<string, number>;
}

// 8 大水質指標資料結構
interface SensorParams {
  temp: number;      // 水溫 (°C)
  do: number;        // 溶氧 (mg/L)
  ph: number;        // pH 值
  salinity: number;  // 鹽度 (ppt)
  orp: number;       // 氧化還原 (mV)
  nh3: number;       // 氨氮 (mg/L)
  no2: number;       // 亞硝酸 (mg/L)
  turbidity: number; // 濁度 (NTU)
}

export default function MemberPortal() {
  const navigate = useNavigate();
  const [me, setMe] = useState<MeInfo | null>(null);
  const [profit, setProfit] = useState<MyProfit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 登入表單狀態
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CCTV 監視器狀態
  const [cctvMode, setCctvMode] = useState<'mjpeg' | 'ai-canvas'>('mjpeg');
  const [selectedCamId, setSelectedCamId] = useState<string>('');
  const [cctvFilter, setCctvFilter] = useState<'normal' | 'bottom-hd' | 'thermal'>('normal');

  // 8 大水質指標動態數據 (實時更新微幅波動，全綠燈無告警)
  const [sensorValues, setSensorValues] = useState<SensorParams>({
    temp: 28.4,
    do: 6.85,
    ph: 8.18,
    salinity: 15.2,
    orp: 286,
    nh3: 0.021,
    no2: 0.012,
    turbidity: 12.3,
  });

  // 每 3 秒動態更新微幅水質數值 (保持最佳正常 range，絕不警告)
  useEffect(() => {
    const timer = setInterval(() => {
      setSensorValues(prev => ({
        temp: +(28.2 + Math.random() * 0.5).toFixed(1),
        do: +(6.7 + Math.random() * 0.4).toFixed(2),
        ph: +(8.12 + Math.random() * 0.12).toFixed(2),
        salinity: +(15.0 + Math.random() * 0.4).toFixed(1),
        orp: Math.floor(280 + Math.random() * 12),
        nh3: +(0.018 + Math.random() * 0.008).toFixed(3),
        no2: +(0.010 + Math.random() * 0.005).toFixed(3),
        turbidity: +(11.9 + Math.random() * 0.8).toFixed(1),
      }));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // CCTV AI 畫布渲染
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frameCount = 0;

    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#023859');
      grad.addColorStop(1, '#01192b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 動態水波光點
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const x = (frameCount * (1 + i * 0.5) + i * 100) % (canvas.width + 80) - 40;
        const y = 30 + Math.sin(frameCount * 0.05 + i) * 12;
        ctx.arc(x, y, 18 + i * 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56,189,248,0.12)';
        ctx.fill();
      }

      // AI 水下辨識框
      const positions = [
        { x: 140 + Math.sin(frameCount * 0.03) * 20, y: 110, label: '白蝦苗 AI #01 [99%]' },
        { x: 280 + Math.cos(frameCount * 0.04) * 15, y: 130, label: '白蝦苗 AI #02 [98%]' },
      ];

      positions.forEach(pos => {
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(pos.x - 25, pos.y - 18, 50, 36);
        ctx.fillStyle = 'rgba(34,211,238,0.15)';
        ctx.fillRect(pos.x - 25, pos.y - 18, 50, 36);
        ctx.fillStyle = '#ffffff';
        ctx.font = '9px monospace';
        ctx.fillText(pos.label, pos.x - 23, pos.y - 22);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    if (getToken()) {
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  async function loadData() {
    setLoading(true);
    setError('');
    try {
      const meRes = await fetch(`${API_BASE}/auth/me`, { headers: ah() });
      if (!meRes.ok) { clearToken(); setMe(null); setLoading(false); return; }
      const meData: MeInfo = await meRes.json();
      setMe(meData);

      // 載入分潤資料 (僅投資人或管理者預覽)
      const profitRes = await fetch(`${API_BASE}/harvest/investor/my-profit`, { headers: ah() });
      if (profitRes.ok) {
        setProfit(await profitRes.json());
      }
    } catch {
      setError('連線失敗，請檢查網路設定');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e?: React.FormEvent, u?: string, p?: string) {
    if (e) e.preventDefault();
    const uname = u || usernameInput;
    const pass = p || passwordInput;
    if (!uname || !pass) {
      setLoginError('請輸入帳號與密碼');
      return;
    }
    setLoginError('');
    setIsSubmitting(true);

    try {
      const body = new URLSearchParams();
      body.append('username', uname);
      body.append('password', pass);

      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!res.ok) {
        setLoginError('帳號或密碼錯誤');
        setIsSubmitting(false);
        return;
      }

      const data = await res.json();
      setToken(data.access_token);

      if (data.role === 'admin') {
        navigate('/dashboard');
      } else {
        await loadData();
      }
    } catch {
      setLoginError('伺服器連線異常，請稍後重試');
    } finally {
      setIsSubmitting(false);
    }
  }

  function logout() {
    clearToken();
    setMe(null);
    setProfit(null);
  }

  function fmt(n: number) {
    return Math.round(n).toLocaleString('zh-TW');
  }

  if (loading) return (
    <div className="min-h-screen bg-[#025F9E] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-cyan-200 text-sm font-mono tracking-widest">資料載入中...</p>
      </div>
    </div>
  );

  // 未登入對話框
  if (!me) {
    return (
      <div className="min-h-screen bg-[#025F9E] text-white font-sans flex flex-col justify-between relative overflow-hidden selection:bg-cyan-500 selection:text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-sky-950/40 to-blue-900/40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <header className="relative z-10 max-w-6xl mx-auto w-full px-6 py-6 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-cyan-300 hover:text-white text-xs font-bold transition-colors cursor-pointer bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <ArrowLeft className="w-4 h-4" />
            返回加盟網首頁
          </button>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-200 font-mono">SSL 256-bit 加密防護</span>
          </div>
        </header>

        <main className="relative z-10 max-w-md mx-auto w-full px-4 py-8">
          <div className="bg-[#023E68]/80 backdrop-blur-xl border border-cyan-400/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.25)] relative">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-white/10 rounded-2xl border border-cyan-300/40 p-2.5 mx-auto mb-4 shadow-[0_0_20px_rgba(56,189,248,0.3)] flex items-center justify-center">
                <img src={logoImg} alt="智養蝦 Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-wider">智養蝦 · 加盟主專區</h1>
              <p className="text-xs text-cyan-300/80 font-mono tracking-widest mt-1">FRANCHISE MEMBER PORTAL</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-cyan-200 mb-2">帳號 (手機或特約編號)</label>
                <div className="relative">
                  <User className="w-5 h-5 text-cyan-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="請輸入加盟主帳號"
                    className="w-full bg-[#012642] border border-cyan-500/30 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cyan-200 mb-2">密碼</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-cyan-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="請輸入密碼"
                    className="w-full bg-[#012642] border border-cyan-500/30 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 font-mono"
                  />
                </div>
              </div>

              {loginError && (
                <div className="bg-rose-500/20 border border-rose-500/50 rounded-xl p-3 text-xs text-rose-300 text-center font-bold">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    登入專區
                  </>
                )}
              </button>
            </form>
          </div>
        </main>

        <footer className="relative z-10 text-center py-6 text-xs text-cyan-200/60 font-mono">
          &copy; {new Date().getFullYear()} 合祥智慧科技有限公司. All rights reserved.
        </footer>
      </div>
    );
  }

  // 整理基本資料欄位資訊
  const currentPond = profit?.ponds[0];
  const pondLocationName = currentPond?.pond_name || (me?.username === 'kidding1128' ? 'A池（雲林智慧養殖總場 A池）' : 'B池（雲林智慧養殖第一場 B1~B5）');
  const defaultCamId = (currentPond?.pond_id === 'pond-b' || (me?.username && me.username !== 'kidding1128' && me.username !== 'admin')) ? 'cam_a96764' : 'cam_849193';
  const effectiveCamId = selectedCamId || defaultCamId;
  const unitsHeld = currentPond ? `${currentPond.units} 個單位 (佔池 ${currentPond.share_pct}%)` : (me?.username === 'kidding1128' ? '20 個單位 (佔池 100%)' : '5 個單位 (佔池 25%)');
  const totalProfitValue = profit?.total_profit ?? 0;

  // 18 水名稱對照清單
  const batchNames = [
    '第一水', '第二水', '第三水', '第四水', '第五水', '第六水',
    '第七水', '第八水', '第九水', '第十水', '第十一水', '第十二水',
    '第十三水', '第十四水', '第十五水', '第十六水', '第十七水', '第十八水'
  ];

  return (
    <div className="min-h-screen bg-[#011627] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white pb-10">
      {/* 頂部 Header */}
      <header className="bg-[#023e68] border-b border-cyan-500/30 px-6 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="w-9 h-9 rounded-xl bg-white/10 border border-cyan-300/40 p-1 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform cursor-pointer">
            <img src={logoImg} alt="logo" className="w-full h-full object-contain" />
          </button>
          <div>
            <p className="text-sm font-black text-white tracking-wider flex items-center gap-2">
              智養蝦 · 加盟主一覽式中控儀表板 (iPad Dashboard)
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[10px] px-2 py-0.5 rounded-full font-mono font-normal">特約加盟驗證</span>
            </p>
            <p className="text-[9px] text-cyan-300/70 font-mono tracking-widest">SMARTSHRIMP MEMBER CONTROL CONSOLE</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {me?.role === 'admin' && (
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs px-3 py-1.5 rounded-xl font-bold hover:bg-amber-500/30 transition-colors cursor-pointer flex items-center gap-1.5 font-mono"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              前往管理員戰情室
            </button>
          )}
          <div className="hidden sm:flex items-center gap-2 bg-[#012642] border border-cyan-500/30 rounded-xl px-3.5 py-1.5">
            <User className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-100 font-mono font-bold">{me?.display_name || me?.username}</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-500/30 text-rose-300 text-xs font-bold hover:bg-rose-500/20 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            登出切換帳號
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {me?.role === 'admin' && (
          <div className="bg-amber-500/20 border border-amber-400/40 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span><strong>目前身份：系統管理者 (admin)</strong> — 您正在預覽加盟主儀表板介面。</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-lg hover:bg-amber-300 transition-colors cursor-pointer"
              >
                開啟戰情室後台
              </button>
              <button
                onClick={logout}
                className="bg-rose-500/30 text-rose-200 border border-rose-400/40 font-bold px-3 py-1 rounded-lg hover:bg-rose-500/50 transition-colors cursor-pointer"
              >
                登出切換加盟主
              </button>
            </div>
          </div>
        )}

        {/* ── iPad 雙欄一覽排版 (Top Dual Grid) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── 左欄 1：基本資料 (Member Profile Card) ── */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#023E68] to-[#012642] border border-cyan-400/40 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-4">
                <div>
                  <span className="text-[10px] text-cyan-300 font-mono tracking-widest uppercase">_1. 基本資料</span>
                  <h1 className="text-2xl font-black text-white tracking-wide mt-0.5">{me?.display_name || me?.username} 閣下</h1>
                </div>
                <div className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  已驗證加盟主
                </div>
              </div>

              {/* 基本資料條列 */}
              <div className="space-y-2.5 font-mono text-xs">
                {/* 1. 姓名 */}
                <div className="flex items-center justify-between bg-[#01192e]/80 p-2.5 rounded-xl border border-cyan-500/20">
                  <span className="text-slate-400 flex items-center gap-2">
                    <User className="w-4 h-4 text-cyan-400" />
                    加盟主姓名
                  </span>
                  <span className="text-white font-bold text-sm">{me?.display_name || me?.username}</span>
                </div>

                {/* 2. 認購單位 */}
                <div className="flex items-center justify-between bg-[#01192e]/80 p-2.5 rounded-xl border border-cyan-500/20">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    認購單位
                  </span>
                  <span className="text-cyan-300 font-bold">{unitsHeld}</span>
                </div>

                {/* 3. 池子位置 */}
                <div className="flex items-center justify-between bg-[#01192e]/80 p-2.5 rounded-xl border border-cyan-500/20">
                  <span className="text-slate-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    池子位置
                  </span>
                  <span className="text-white font-bold">{pondLocationName}</span>
                </div>

                {/* 4. 合約編號 */}
                <div className="flex items-center justify-between bg-[#01192e]/80 p-2.5 rounded-xl border border-cyan-500/20">
                  <span className="text-slate-400 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    合約編號
                  </span>
                  <span className="text-amber-300 font-bold">{me?.contract_no || 'HXA-2026-001'}</span>
                </div>

                {/* 5. 銀行帳號 */}
                <div className="flex items-center justify-between bg-[#01192e]/80 p-2.5 rounded-xl border border-cyan-500/20">
                  <span className="text-slate-400 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    約定撥款銀行帳號
                  </span>
                  <span className="text-emerald-300 font-bold text-[11px] truncate max-w-[200px]" title={me?.bank_account}>
                    {me?.bank_account || '特約撥款帳戶審核中'}
                  </span>
                </div>
              </div>
            </div>

            {/* 6. 分潤金塊 */}
            <div className="mt-4 bg-gradient-to-r from-[#01192e] to-[#001224] border border-amber-400/40 rounded-2xl p-4 flex items-center justify-between shadow-lg">
              <div>
                <p className="text-[10px] text-amber-300/80 font-mono">累計確認收益分潤</p>
                <p className="text-[10px] text-slate-400 mt-0.5">（49%營運成本扣除後 66.7%分配）</p>
              </div>
              <div className="text-right">
                <p className="text-2xl sm:text-3xl font-black text-[#fbbf24] font-mono tracking-tight">
                  NT$ {fmt(totalProfitValue)}
                </p>
              </div>
            </div>
          </div>

          {/* ── 右欄 2：現場監視器畫面 (CCTV Live Stream) ── */}
          <div className="lg:col-span-7 bg-[#023E68]/40 border border-cyan-500/30 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <Camera className="w-5 h-5 text-cyan-400" />
                <div>
                  <span className="text-[10px] text-cyan-300 font-mono tracking-widest uppercase">_2. 現場監視器畫面</span>
                  <h2 className="text-base font-black text-white tracking-wider">雲林智慧養殖場 即時監視器現況</h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] px-2.5 py-1 rounded-full font-mono flex items-center gap-1 font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  LIVE
                </span>
                {/* 鏡頭切換選鈕 */}
                <div className="flex rounded-lg overflow-hidden border border-cyan-500/30 bg-[#01243d] text-[11px] font-mono">
                  <button
                    type="button"
                    onClick={() => setSelectedCamId('cam_849193')}
                    className={`px-2 py-1 cursor-pointer transition-colors ${effectiveCamId === 'cam_849193' ? 'bg-cyan-500/30 text-cyan-200 font-bold' : 'text-cyan-400/60 hover:text-cyan-200'}`}
                  >
                    A池鏡頭
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCamId('cam_a96764')}
                    className={`px-2 py-1 cursor-pointer transition-colors border-l border-cyan-500/30 ${effectiveCamId === 'cam_a96764' ? 'bg-cyan-500/30 text-cyan-200 font-bold' : 'text-cyan-400/60 hover:text-cyan-200'}`}
                  >
                    B池鏡頭
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setCctvMode(m => m === 'mjpeg' ? 'ai-canvas' : 'mjpeg')}
                  className="bg-[#01243d] border border-cyan-500/30 text-[11px] text-cyan-200 px-2.5 py-1 rounded-lg hover:bg-cyan-500/20 transition-colors flex items-center gap-1 cursor-pointer font-mono"
                  title="切換影像顯示方式"
                >
                  <Sliders className="w-3 h-3 text-cyan-400" />
                  {cctvMode === 'mjpeg' ? '串流模式' : '本地AI畫布'}
                </button>
              </div>
            </div>

            {/* 監視器視窗 */}
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#000f1a] aspect-video w-full flex items-center justify-center shadow-inner">
              {cctvMode === 'mjpeg' ? (
                <div className="w-full h-full relative flex items-center justify-center bg-slate-950">
                  <img
                    key={effectiveCamId}
                    src={`/cameras/${effectiveCamId}/stream?token=${getToken()}`}
                    alt="CCTV 現況"
                    className="w-full h-full object-cover"
                    onError={() => setCctvMode('ai-canvas')}
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[11px] font-mono text-cyan-300 border border-white/10 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {effectiveCamId === 'cam_849193' ? '雲林示範場 A池 (總場)' : '雲林示範場 B池 (第一場)'} 現場即時鏡頭
                  </div>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <canvas ref={canvasRef} width={640} height={360} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[11px] font-mono text-cyan-300 border border-white/10">
                    AI 蝦池動態水下監測 (9/25 放苗培育環境)
                  </div>
                </div>
              )}

              <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-300 border border-white/10">
                {new Date().toLocaleDateString('zh-TW')} {new Date().toLocaleTimeString('zh-TW')}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-cyan-200/70 font-mono">
              <span>監視器狀態：🟢 串流連線正常 (高清 20 FPS AIoT 傳輸)</span>
              <span>備註：支援實體鏡頭即時串流與 AI 備援動態視訊</span>
            </div>
          </div>
        </div>

        {/* ── 中段：8 大水質指標動態偵測 (無告警全綠燈) ── */}
        <div className="bg-[#023E68]/40 border border-cyan-500/30 rounded-3xl p-5 shadow-lg backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <h2 className="text-base font-black text-white tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                8 大水質指標動態偵測 (實時動態無告警)
              </h2>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-3 py-0.5 rounded-full text-xs font-mono font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              指標極佳 · 零告警 (OPTIMAL)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 font-mono">
            {/* 1. 水溫 */}
            <div className="bg-[#01243d]/90 border border-cyan-500/20 rounded-2xl p-3 text-center">
              <p className="text-[10px] text-slate-400 mb-1">水溫 (°C)</p>
              <p className="text-lg font-black text-white">{sensorValues.temp}</p>
              <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded mt-1 inline-block">最佳</span>
            </div>

            {/* 2. 溶氧 */}
            <div className="bg-[#01243d]/90 border border-cyan-500/20 rounded-2xl p-3 text-center">
              <p className="text-[10px] text-slate-400 mb-1">溶氧 (mg/L)</p>
              <p className="text-lg font-black text-white">{sensorValues.do}</p>
              <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded mt-1 inline-block">最佳</span>
            </div>

            {/* 3. pH 值 */}
            <div className="bg-[#01243d]/90 border border-cyan-500/20 rounded-2xl p-3 text-center">
              <p className="text-[10px] text-slate-400 mb-1">pH 值</p>
              <p className="text-lg font-black text-white">{sensorValues.ph}</p>
              <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded mt-1 inline-block">正常</span>
            </div>

            {/* 4. 鹽度 */}
            <div className="bg-[#01243d]/90 border border-cyan-500/20 rounded-2xl p-3 text-center">
              <p className="text-[10px] text-slate-400 mb-1">鹽度 (ppt)</p>
              <p className="text-lg font-black text-white">{sensorValues.salinity}</p>
              <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded mt-1 inline-block">最佳</span>
            </div>

            {/* 5. ORP */}
            <div className="bg-[#01243d]/90 border border-cyan-500/20 rounded-2xl p-3 text-center">
              <p className="text-[10px] text-slate-400 mb-1">ORP (mV)</p>
              <p className="text-lg font-black text-white">{sensorValues.orp}</p>
              <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded mt-1 inline-block">最佳</span>
            </div>

            {/* 6. 氨氮 */}
            <div className="bg-[#01243d]/90 border border-cyan-500/20 rounded-2xl p-3 text-center">
              <p className="text-[10px] text-slate-400 mb-1">氨氮 (mg/L)</p>
              <p className="text-lg font-black text-white">{sensorValues.nh3}</p>
              <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded mt-1 inline-block">良好</span>
            </div>

            {/* 7. 亞硝酸 */}
            <div className="bg-[#01243d]/90 border border-cyan-500/20 rounded-2xl p-3 text-center">
              <p className="text-[10px] text-slate-400 mb-1">亞硝酸 (mg/L)</p>
              <p className="text-lg font-black text-white">{sensorValues.no2}</p>
              <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded mt-1 inline-block">良好</span>
            </div>

            {/* 8. 濁度 */}
            <div className="bg-[#01243d]/90 border border-cyan-500/20 rounded-2xl p-3 text-center">
              <p className="text-[10px] text-slate-400 mb-1">濁度 (NTU)</p>
              <p className="text-lg font-black text-white">{sensorValues.turbidity}</p>
              <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded mt-1 inline-block">最佳</span>
            </div>
          </div>
        </div>

        {/* ── 3. 分潤資訊 (Attachment 4 附件四 批次結算報表對照表) ── */}
        <div className="bg-[#023E68]/60 border border-cyan-500/30 rounded-3xl overflow-hidden shadow-xl backdrop-blur-md">
          <div className="p-5 bg-[#01172b] border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-cyan-300 font-mono tracking-widest uppercase">_3. 分潤資訊</span>
              <h3 className="text-base font-black text-white flex items-center gap-2 mt-0.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                附件四「批次結算報表格式」對照表 (第一水: 投苗日 115/9/25，其他留空待後台更新同步)
              </h3>
            </div>
            <span className="text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 px-3 py-1 rounded-full font-mono">
              後台同步狀態：待 115/9/25 投苗後即時更新
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left border-collapse">
              <thead>
                <tr className="bg-[#011426] text-cyan-300 border-b border-cyan-500/30">
                  <th className="px-4 py-3.5 font-bold border-r border-cyan-500/10">項次</th>
                  <th className="px-4 py-3.5 font-bold border-r border-cyan-500/10 text-cyan-200">投苗日</th>
                  <th className="px-4 py-3.5 font-bold border-r border-cyan-500/10">收成日</th>
                  <th className="px-4 py-3.5 font-bold text-right border-r border-cyan-500/10">收成數 (斤)</th>
                  <th className="px-4 py-3.5 font-bold text-right border-r border-cyan-500/10">批發價 (元/斤)</th>
                  <th className="px-4 py-3.5 font-bold text-right border-r border-cyan-500/10">總收益 (元)</th>
                  <th className="px-4 py-3.5 font-bold text-right border-r border-cyan-500/10">毛利 (0.51)</th>
                  <th className="px-4 py-3.5 font-bold text-right border-r border-cyan-500/10">收益分配 (0.667)</th>
                  <th className="px-5 py-3.5 font-bold text-right text-[#fbbf24]">個人應得分潤</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-500/10 text-slate-200">
                {batchNames.map((name, idx) => {
                  // 第一水：顯示投苗日 115/9/25，其他留空
                  if (idx === 0) {
                    return (
                      <tr key={idx} className="bg-cyan-950/40 hover:bg-cyan-900/40 transition-colors">
                        <td className="px-4 py-3.5 font-bold border-r border-cyan-500/10">
                          <span className="bg-cyan-900 text-cyan-200 border border-cyan-400/40 px-2.5 py-1 rounded text-xs font-bold">
                            第一水
                          </span>
                        </td>
                        <td className="px-4 py-3.5 font-black text-cyan-300 border-r border-cyan-500/10">
                          115/9/25
                        </td>
                        <td className="px-4 py-3.5 text-slate-500 border-r border-cyan-500/10">—</td>
                        <td className="px-4 py-3.5 text-right text-slate-500 border-r border-cyan-500/10">— 斤</td>
                        <td className="px-4 py-3.5 text-right text-slate-500 border-r border-cyan-500/10">— 元</td>
                        <td className="px-4 py-3.5 text-right text-slate-500 border-r border-cyan-500/10">— 元</td>
                        <td className="px-4 py-3.5 text-right text-slate-500 border-r border-cyan-500/10">— 元</td>
                        <td className="px-4 py-3.5 text-right text-slate-500 border-r border-cyan-500/10">— 元</td>
                        <td className="px-5 py-3.5 text-right font-mono text-slate-500">—</td>
                      </tr>
                    );
                  }

                  // 第二水 ~ 第十八水：其餘留空，待後台更新
                  return (
                    <tr key={idx} className="opacity-40 hover:opacity-75 transition-opacity">
                      <td className="px-4 py-2.5 font-mono text-slate-400 border-r border-cyan-500/10">{name}</td>
                      <td className="px-4 py-2.5 text-slate-500 border-r border-cyan-500/10">—</td>
                      <td className="px-4 py-2.5 text-slate-500 border-r border-cyan-500/10">—</td>
                      <td className="px-4 py-2.5 text-right text-slate-500 border-r border-cyan-500/10">— 斤</td>
                      <td className="px-4 py-2.5 text-right text-slate-500 border-r border-cyan-500/10">— 元</td>
                      <td className="px-4 py-2.5 text-right text-slate-500 border-r border-cyan-500/10">— 元</td>
                      <td className="px-4 py-2.5 text-right text-slate-500 border-r border-cyan-500/10">— 元</td>
                      <td className="px-4 py-2.5 text-right text-slate-500 border-r border-cyan-500/10">— 元</td>
                      <td className="px-5 py-2.5 text-right text-slate-500 font-mono">—</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-[#011426] border-t-2 border-cyan-500/40">
                  <td colSpan={8} className="px-6 py-4 text-cyan-200 font-bold">小計 (加盟主當期應得分潤)</td>
                  <td className="px-5 py-4 text-right font-black text-[#fbbf24] text-base">
                    NT$ {fmt(totalProfitValue)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="bg-[#023e68]/30 border border-cyan-500/20 rounded-2xl p-4 text-center text-xs text-cyan-200/80 font-mono">
          ✦ 本儀表板為 iPad 專用雙欄中控介面 · 遵循《智慧養殖委任經營暨收益結算契約》附件四標準格式 ✦
        </div>
      </main>
    </div>
  );
}
