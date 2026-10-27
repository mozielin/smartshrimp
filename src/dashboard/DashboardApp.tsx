/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  PondId, PondInfo, EquipmentState, SystemLog 
} from './types';
import CctvMonitor from './components/CctvMonitor';
import WaterQuality from './components/WaterQuality';
import EquipmentControl from './components/EquipmentControl';
import WeatherStation from './components/WeatherStation';
import MarketQuotes from './components/MarketQuotes';
import PondSummary from './components/PondSummary';
import StockHistory from './components/StockHistory';
import AiForecast from './components/AiForecast';
import CyberMap from './components/CyberMap';
import InvestorDashboard from './components/InvestorDashboard';
import LoginScreen from './components/LoginScreen';
import InvestorView from './components/InvestorView';
import EventsManager from './components/EventsManager';
import logoImg from './assets/智養蝦-02.png';
import { 
  Layers, AppWindow, ShieldAlert, Wifi, Info, HelpCircle, 
  Sparkles, BellRing, User, Clock, Compass, Waves, Power, 
  Tv, Activity, CloudSun, Droplet, TrendingUp, LogOut, Database,
  ArrowUpRight, ShieldCheck, Cpu, HardDrive
} from 'lucide-react';
import { shrimpApi, isConnectedToApi, clearApiCredentials, apiConfig, getCleanApiDomain } from './lib/api';

export default function DashboardApp() {
  // 0. Auth gate — must log in before seeing anything
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authRole, setAuthRole] = useState<string | null>(null);

  const handleLoginSuccess = (username: string, role: string) => {
    setIsAuthenticated(true);
    setAuthRole(role);
    setIsApiLoggedIn(true);
    setApiUserName(username);
  };

  // 1. App Active Navigation Header Tab
  // Matches top-right: "場域總覽" (Main War Room dashboard), "智能水質" (Water Quality Controls), "設備安防" (Mechanisms & Logs)
  const [activeTab, setActiveTab] = useState<'overview' | 'water' | 'equipment' | 'investor' | 'events' | 'harvest' | 'accounts'>('overview');
  
  // 2. Core states and view toggles
  const [activePondId, setActivePondId] = useState<PondId>('pond-a');
  const [viewMode, setViewMode] = useState<'3x3-grid' | 'zoom-focus'>('3x3-grid');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // 3. API & Connection state
  const [isApiLoggedIn, setIsApiLoggedIn] = useState<boolean>(isConnectedToApi());
  const [apiUserName, setApiUserName] = useState<string | null>(apiConfig.username);
  const [showApiModal, setShowApiModal] = useState<boolean>(false);
  const [miniStreamError, setMiniStreamError] = useState<boolean>(false);

  // Auto reset stream error when pond selected
  useEffect(() => {
    setMiniStreamError(false);
  }, [activePondId]);
  
  // API form fields
  const [apiDomain, setApiDomain] = useState<string>(getCleanApiDomain());
  const [apiUsernameField, setApiUsernameField] = useState<string>('admin');
  const [apiPasswordField, setApiPasswordField] = useState<string>('83109337ctc');
  const [apiErrorMsg, setApiErrorMsg] = useState<string | null>(null);
  const [apiSuccessMsg, setApiSuccessMsg] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  // 4. Aquaculture Pond database
  const [ponds, setPonds] = useState<PondInfo[]>([
    {
      id: 'pond-a',
      name: '場域 A - (優良 品質 92分)',
      status: 'excellent',
      overallScore: 92,
      shrimpType: '頂級無毒白蝦 Premium White Shrimp',
      shrimpAgeDays: 45,
      estimatedCount: 48200,
      density: 120,
      estimatedSurvival: 85,
      temperature: 29.4, // Map matching image ambient values
      dissolvedOxygen: 6.8,
      pH: 8.1,
      salinity: 23, // 23‰
      orp: 220,
      ec: 1.5,
      nh3n: 0.05
    },
    {
      id: 'pond-b',
      name: '場域 B - (良好 品質 85分)',
      status: 'excellent',
      overallScore: 85,
      shrimpType: '特選超大草蝦 Black Tiger Select',
      shrimpAgeDays: 38,
      estimatedCount: 36000,
      density: 95,
      estimatedSurvival: 82,
      temperature: 28.1,
      dissolvedOxygen: 5.9,
      pH: 7.4,
      salinity: 18,
      orp: 195,
      ec: 1.6,
      nh3n: 0.03
    },
    {
      id: 'pond-c',
      name: '場域 C - (注意 品質 68分)',
      status: 'warning',
      overallScore: 68,
      shrimpType: '黃金泰國蝦 Golden Prawn Blue',
      shrimpAgeDays: 65,
      estimatedCount: 52000,
      density: 140,
      estimatedSurvival: 74,
      temperature: 26.8,
      dissolvedOxygen: 4.8, 
      pH: 6.9,
      salinity: 16,
      orp: 150,
      ec: 1.7,
      nh3n: 0.08
    }
  ]);

  // 5. Equipment Controls state per pond
  const [equipmentStates, setEquipmentStates] = useState<Record<PondId, EquipmentState>>({
    'pond-a': {
      aerator1: 'on',
      aerator2: 'on',
      aerator3: 'off',
      aeratorPowerLevel: 2, 
      autoFeeder: true,
      feederInterval: 120,
      feederWeight: 350,
      waterPump: 'auto',
      thermalControl: 'auto',
      targetTemp: 27.5
    },
    'pond-b': {
      aerator1: 'on',
      aerator2: 'off',
      aerator3: 'off',
      aeratorPowerLevel: 1, 
      autoFeeder: true,
      feederInterval: 180,
      feederWeight: 250,
      waterPump: 'off',
      thermalControl: 'off',
      targetTemp: 28.0
    },
    'pond-c': {
      aerator1: 'on',
      aerator2: 'on',
      aerator3: 'on',
      aeratorPowerLevel: 3, 
      autoFeeder: false,
      feederInterval: 120,
      feederWeight: 400,
      waterPump: 'on',
      thermalControl: 'auto',
      targetTemp: 27.0
    },
    'pond-d': {
      aerator1: 'off',
      aerator2: 'off',
      aerator3: 'off',
      aeratorPowerLevel: 1,
      autoFeeder: false,
      feederInterval: 120,
      feederWeight: 300,
      waterPump: 'auto',
      thermalControl: 'auto',
      targetTemp: 27.0
    }
  });

  // 6. System Log logs
  const [logs, setLogs] = useState<SystemLog[]>([
    {
      id: 'log-1',
      timestamp: '13:25:42',
      pondId: 'pond-a',
      type: 'success',
      message: '主池與自動維護隔板校核合格，水質硬殼碳酸鈣係數達標。',
      category: 'water'
    },
    {
      id: 'log-2',
      timestamp: '13:24:10',
      pondId: 'pond-c',
      type: 'warning',
      message: '預警：場域 C 溶解氧持續低於警戒指標 (4.8 < 5.5 mg/L)，系統已自動加強對流運作。',
      category: 'ai'
    },
    {
      id: 'log-3',
      timestamp: '13:22:05',
      pondId: 'pond-b',
      type: 'info',
      message: '定時聲學落料機（場域 B）落料正常，落料耗費 250g。',
      category: 'equipment'
    },
    {
      id: 'log-4',
      timestamp: '13:18:15',
      pondId: 'pond-a',
      type: 'success',
      message: 'AI 解算優化通訊：場域 A 生態指標完美契合養殖密度規格大綱。',
      category: 'ai'
    }
  ]);

  // Keep system clock ticking
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch data periodically if logged into the actual backend API
  useEffect(() => {
    if (!isApiLoggedIn) return;

    const fetchLiveTelemetry = async () => {
      try {
        // Query live ponds list from Python backend endpoint GET /ponds/
        const livePondsData = await shrimpApi.getPonds();
        if (livePondsData && Array.isArray(livePondsData) && livePondsData.length > 0) {
          // Map to local states safely
          setPonds(prev => prev.map(p => {
            const matchIndex = livePondsData.findIndex((lp: any) => 
              lp.id === p.id || lp.name?.includes(p.id.toUpperCase())
            );
            if (matchIndex !== -1) {
              const match = livePondsData[matchIndex];
              return {
                ...p,
                temperature: match.temperature ?? match.temp ?? p.temperature,
                dissolvedOxygen: match.dissolvedOxygen ?? match.do ?? p.dissolvedOxygen,
                pH: match.pH ?? match.ph ?? p.pH,
                salinity: match.salinity ?? p.salinity,
                overallScore: match.overallScore ?? match.score ?? p.overallScore
              };
            }
            return p;
          }));
        }

        // Query sensors endpoint GET /sensors/
        const sensorsData = await shrimpApi.getSensors();
        if (sensorsData && Array.isArray(sensorsData)) {
          // If sensor records are returned, update first pond with live telemetry
          const activeSensors = sensorsData[0];
          if (activeSensors) {
            setPonds(prev => prev.map(p => {
              if (p.id === activePondId) {
                return {
                  ...p,
                  dissolvedOxygen: activeSensors.do ?? activeSensors.dissolved_oxygen ?? p.dissolvedOxygen,
                  pH: activeSensors.ph ?? activeSensors.ph_val ?? p.pH,
                  temperature: activeSensors.temp ?? activeSensors.temperature ?? p.temperature,
                };
              }
              return p;
            }));
          }
        }
      } catch (e) {
        console.warn('Silent live polling error (safe offline simulation active):', e);
      }
    };

    fetchLiveTelemetry();
    const interval = setInterval(fetchLiveTelemetry, 10000); // 10s fetch rate
    return () => clearInterval(interval);
  }, [isApiLoggedIn, activePondId]);

  // Handlers for modifying metric states
  const handleUpdatePondMetric = (metricKey: keyof PondInfo, newValue: number) => {
    setPonds((prev) =>
      prev.map((p) => {
        if (p.id === activePondId) {
          return { ...p, [metricKey]: newValue };
        }
        return p;
      })
    );

    const timeStr = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const logId = 'log-' + Math.random().toString(36).substr(2, 9);
    setLogs((prev) => [
      {
        id: logId,
        timestamp: timeStr,
        pondId: activePondId,
        type: 'info',
        message: `手動調控：[${metricKey}] 指標模擬更新至 ${newValue}。`,
        category: 'water'
      },
      ...prev
    ]);
  };

  const handleUpdateEquipment = (key: keyof EquipmentState, val: any) => {
    setEquipmentStates((prev) => ({
      ...prev,
      [activePondId]: {
        ...prev[activePondId],
        [key]: val
      }
    }));

    const timeStr = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const logId = 'log-' + Math.random().toString(36).substr(2, 9);
    
    let messageText = `硬體變更：[${key}] 操作開關調至 ${val}。`;
    let typeClass: 'info' | 'warning' | 'success' = 'info';

    if (key === 'aeratorPowerLevel') {
      messageText = `智能逆循環增氧機群擋速調至：F.0${val} (${val * 25}% 效率)`;
      typeClass = val >= 3 ? 'success' : 'info';
    }

    setLogs((prev) => [
      {
        id: logId,
        timestamp: timeStr,
        pondId: activePondId,
        type: typeClass,
        message: messageText,
        category: 'equipment'
      },
      ...prev
    ]);
  };

  const handleForceFeeding = (amountGrams: number) => {
    const timeStr = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const logId = 'log-' + Math.random().toString(36).substr(2, 9);

    setLogs((prev) => [
      {
        id: logId,
        timestamp: timeStr,
        pondId: activePondId,
        type: 'success',
        message: `指令強制落料成功！自動投餌落料 ${amountGrams} 克（合約配置）。`,
        category: 'equipment'
      },
      ...prev
    ]);
  };

  const handleAddLogCallback = (newLog: SystemLog) => {
    setLogs((prev) => [newLog, ...prev]);
  };

  // Switch active pond
  const handlePondChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActivePondId(e.target.value as PondId);
  };

  // API submit handler
  const handleApiConnectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    setApiErrorMsg(null);
    setApiSuccessMsg(null);

    try {
      // Connect & login to the user's backend server
      const res = await shrimpApi.login(apiUsernameField, apiPasswordField, apiDomain);
      if (res.access_token) {
        setApiSuccessMsg(`✓ 連線登入成功！憑證已安全鎖定`);
        setIsApiLoggedIn(true);
        setApiUserName(apiUsernameField);
        
        // Trigger manual loading to instantly sync ponds/sensors
        const livePondsData = await shrimpApi.getPonds();
        if (livePondsData && Array.isArray(livePondsData) && livePondsData.length > 0) {
          setPonds(prev => prev.map(p => {
            const match = livePondsData.find((lp: any) => lp.id === p.id);
            return match ? { ...p, ...match } : p;
          }));
        }

        setTimeout(() => {
          setShowApiModal(false);
          setApiSuccessMsg(null);
        }, 1200);
      }
    } catch (err: any) {
      setApiErrorMsg(err.message || '連線逾時，請確認 API 網址與網路權限');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleLogoutApi = () => {
    clearApiCredentials();
    setIsApiLoggedIn(false);
    setApiUserName(null);
    setIsAuthenticated(false);
    setAuthRole(null);
  };

  const currentPond = ponds.find((p) => p.id === activePondId) || ponds[0];
  const activeEq = equipmentStates[activePondId];

  // Map metric key selecting
  const handleMapSelectNode = (nodeKey: 'temperature' | 'dissolvedOxygen' | 'pH' | 'salinity' | 'nh3n') => {
    // Generate notification log corresponding to map sensor click
    const timeStr = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const logId = 'log-' + Math.random().toString(36).substr(2, 9);
    setLogs((prev) => [
      {
        id: logId,
        timestamp: timeStr,
        pondId: activePondId,
        type: 'info',
        message: `圖資遙測：點按定位座標「${nodeKey.toUpperCase()}」多合一感知節點，讀數傳送流暢。`,
        category: 'water'
      },
      ...prev
    ]);
  };

  return (
    <>
    {!isAuthenticated && (
      <LoginScreen onLoginSuccess={handleLoginSuccess} />
    )}
    {isAuthenticated && authRole === 'investor' && (
      <InvestorView
        ponds={ponds}
        username={apiUserName ?? ''}
        onLogout={() => {
          clearApiCredentials();
          setIsAuthenticated(false);
          setAuthRole(null);
          setIsApiLoggedIn(false);
          setApiUserName(null);
        }}
      />
    )}
    {isAuthenticated && authRole !== 'investor' && (
    <div className="min-h-screen bg-[#050a12] text-slate-200 flex flex-col justify-between font-sans selection:bg-[#caa45d] selection:text-black bg-dot-grid relative">
      
      {/* 1. Global Tactical Header matching the "智慧養蝦場作戰情室" screenshot */}
      <header className="h-[68px] bg-[#09101b] border-b-2 border-[#caa45d]/30 px-6 flex items-center relative z-40 shadow-xl">
        <div className="w-full mx-auto flex justify-between items-center">
          
          {/* Logo Brand Title with specialized Shrimp circle icon */}
          <div className="flex items-center gap-3.5">
            {/* Logo icon inside a glowing blue circle background details */}
            <div className="w-16 h-16 rounded-full bg-[#1b5cb1]/20 border-2 border-[#1eecf8] shadow-[0_0_12px_rgba(30,236,248,0.4)] flex items-center justify-center shrink-0 overflow-hidden">
              <img src={logoImg} alt="智養蝦" className="w-full h-full object-contain p-1" />
            </div>
            <div>
              <h1 className="font-extrabold text-[18px] tracking-widest text-white leading-none font-sans flex items-center gap-2">
                智慧養蝦場作戰情室
              </h1>
              <p className="text-[10px] text-[#caa45d] font-mono tracking-widest uppercase mt-1 inline-flex items-center gap-1.5 font-bold">
                SMART SHRIMP FARM COMMAND CENTER
              </p>
            </div>
          </div>

          {/* Three customizable HUD navigation tabs matching the three buttons at top-right of image */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-2 rounded-sm text-xs font-black tracking-widest uppercase border transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-[#caa45d]/20 to-[#caa45d]/10 border-[#caa45d] text-[#caa45d] shadow-[0_0_15px_rgba(202,164,93,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              場域總覽
            </button>
            
            <button
              onClick={() => setActiveTab('water')}
              className={`px-6 py-2 rounded-sm text-xs font-black tracking-widest uppercase border transition-all cursor-pointer ${
                activeTab === 'water'
                  ? 'bg-gradient-to-r from-[#caa45d]/20 to-[#caa45d]/10 border-[#caa45d] text-[#caa45d] shadow-[0_0_15px_rgba(202,164,93,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              智能水質
            </button>
            
            <button
              onClick={() => setActiveTab('equipment')}
              className={`px-6 py-2 rounded-sm text-xs font-black tracking-widest uppercase border transition-all cursor-pointer ${
                activeTab === 'equipment'
                  ? 'bg-gradient-to-r from-[#caa45d]/20 to-[#caa45d]/10 border-[#caa45d] text-[#caa45d] shadow-[0_0_15px_rgba(202,164,93,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              設備安防
            </button>

            <button
              onClick={() => setActiveTab('investor')}
              className={`px-6 py-2 rounded-sm text-xs font-black tracking-widest uppercase border transition-all cursor-pointer ${
                activeTab === 'investor'
                  ? 'bg-gradient-to-r from-[#caa45d]/20 to-[#caa45d]/10 border-[#caa45d] text-[#caa45d] shadow-[0_0_15px_rgba(202,164,93,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              投資人報表
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-2 rounded-sm text-xs font-black tracking-widest uppercase border transition-all cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-gradient-to-r from-[#caa45d]/20 to-[#caa45d]/10 border-[#caa45d] text-[#caa45d] shadow-[0_0_15px_rgba(202,164,93,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              說明會管理
            </button>
            <button
              onClick={() => setActiveTab('harvest')}
              className={`px-6 py-2 rounded-sm text-xs font-black tracking-widest uppercase border transition-all cursor-pointer ${
                activeTab === 'harvest'
                  ? 'bg-gradient-to-r from-[#22c55e]/20 to-[#22c55e]/10 border-[#22c55e] text-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              💰 收益管理
            </button>
            <button
              onClick={() => setActiveTab('accounts')}
              className={`px-6 py-2 rounded-sm text-xs font-black tracking-widest uppercase border transition-all cursor-pointer ${
                activeTab === 'accounts'
                  ? 'bg-gradient-to-r from-[#a78bfa]/20 to-[#a78bfa]/10 border-[#a78bfa] text-[#a78bfa] shadow-[0_0_15px_rgba(167,139,250,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              👤 帳號管理
            </button>
          </div>

          {/* Right actions: active selectors, API connection triggers, clocks */}
          <div className="flex items-center gap-4">
            
            {/* active pond selector dropdown */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded border border-[#caa45d]/20 hover:border-[#caa45d]/50 transition-all">
              <label className="text-[10px] text-[#caa45d] font-bold uppercase tracking-wider whitespace-nowrap">
                目前池區:
              </label>
              <select
                value={activePondId}
                onChange={handlePondChange}
                className="bg-transparent text-white border-none outline-none text-xs font-bold font-mono cursor-pointer pr-1"
              >
                {ponds.map((p) => (
                  <option key={p.id} value={p.id} className="bg-slate-950 text-white">
                    {p.name.split(' - ')[0]}
                  </option>
                ))}
              </select>
            </div>

            {/* Cloud API Connection Status Indicator */}
            <button
              onClick={() => setShowApiModal(true)}
              className={`px-3 py-1.5 rounded-sm border text-[11px] font-bold tracking-tight cursor-pointer transition-all flex items-center gap-1.5 ${
                isApiLoggedIn
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-[#caa45d]/10 border-[#caa45d]/30 text-[#caa45d] hover:bg-[#caa45d]/20 shadow-[0_0_8px_rgba(202,164,93,0.15)]'
              }`}
              title="中控台 Python API 代理閘口連線"
            >
              <Cpu className="w-3.5 h-3.5 animate-pulse" />
              <span>{isApiLoggedIn ? `● 已連線: ${apiUserName}` : '● 雲端 API'}</span>
            </button>

            {isApiLoggedIn && (
              <button 
                onClick={handleLogoutApi}
                className="p-1.5 rounded bg-slate-900 border border-rose-500/20 text-rose-400 hover:text-white hover:bg-rose-950/40 transition-all cursor-pointer"
                title="登出中控閘口"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Tactical timezone Clock */}
            <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-slate-800 text-slate-400 text-xs font-mono">
              <Clock className="w-4 h-4 text-[#caa45d]" />
              <span>{currentTime.toLocaleDateString('zh-TW')} {currentTime.toLocaleTimeString('zh-TW', { hour12: false })}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile navigation tab bar if displayed on phone screens */}
      <div className="md:hidden grid grid-cols-7 gap-1 bg-[#09101b] p-2 border-b border-[#caa45d]/20 text-center">
        {(['overview', 'water', 'equipment', 'investor', 'events', 'harvest', 'accounts'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-1.5 rounded text-[9px] font-bold uppercase tracking-wider ${
              activeTab === tab
                ? 'bg-[#caa45d]/20 text-[#caa45d] border border-[#caa45d]/50'
                : 'text-slate-400 bg-slate-900/50'
            }`}
          >
            {tab === 'overview' && '場域'}
            {tab === 'water' && '水質'}
            {tab === 'equipment' && '設備'}
            {tab === 'investor' && '報表'}
            {tab === 'events' && '說明會'}
            {tab === 'harvest' && '💰收益'}
            {tab === 'accounts' && '👤帳號'}
          </button>
        ))}
      </div>

      {/* 2. Main Body layout */}
      <main className="flex-grow w-full max-w-7xl mx-auto p-4 md:p-6">
        
        {/* VIEW 1: FIELD OVERVIEW (場域總覽) - Main screen matching user's image exactly */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full animate-fadeIn items-stretch">
            
            {/* LEFT PANEL COLUMN (lg:col-span-3 - contains environmental monitoring, water status gauge, days weather block) */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              
              {/* Module 1: 場區環境監測 MONITORING */}
              <div className="bg-[#121c2c] border border-slate-800 rounded-lg p-4 flex flex-col justify-between tracking-wide shadow-lg">
                <div className="flex justify-between items-center mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                    <h3 className="font-extrabold text-white text-xs">場區環境監測</h3>
                  </div>
                  <span className="text-[9px] text-[#caa45d] font-mono tracking-wider font-bold">MONITORING</span>
                </div>

                {/* Clock & details */}
                <div className="text-[10px] text-slate-400 font-mono leading-relaxed mb-3">
                  {currentTime.toLocaleDateString('zh-TW')} (週五) {currentTime.toLocaleTimeString('zh-TW')}
                  <br />
                  <span>(台北標準時間)</span>
                </div>

                {/* Readout temperature */}
                <div className="flex items-center gap-3.5 mb-3.5">
                  {/* Gauge ring backdrop drawing */}
                  <div className="relative flex items-center justify-center h-16 w-16 rounded-full border-4 border-slate-850">
                    <div className="absolute inset-0 rounded-full border-4 border-cyan-400 border-r-transparent animate-spin-slow" />
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-black font-mono text-white tracking-tighter">
                      29.4°C
                    </p>
                    <p className="text-[10px] text-slate-400">
                      多雲有風 • 東南風 3 級
                    </p>
                  </div>
                </div>

                {/* Sub row parameters: humidity, UV, Rain */}
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-semibold border-t border-slate-800 pt-3">
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800/80">
                    <p className="text-slate-400 text-[9px]">濕度</p>
                    <p className="font-extrabold text-[#caa45d] text-sm mt-1">76%</p>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800/80">
                    <p className="text-slate-400 text-[9px]">紫外線</p>
                    <p className="font-extrabold text-[#caa45d] text-sm mt-1">4</p>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800/80">
                    <p className="text-slate-400 text-[9px]">降雨</p>
                    <p className="font-extrabold text-[#caa45d] text-sm mt-1">12mm</p>
                  </div>
                </div>
              </div>

              {/* Module 2: 水質快訊 WATER STATUS */}
              <div className="bg-[#121c2c] border border-slate-800 rounded-lg p-4 flex flex-col justify-between tracking-wide shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
                    <Droplet className="w-4 h-4 text-cyan-400 animate-bounce" />
                    水質快訊
                  </h3>
                  <span className="text-[9px] text-[#caa45d] font-mono tracking-wider font-bold">WATER STATUS</span>
                </div>

                {/* Triple concentric circular reading dials */}
                <div className="grid grid-cols-3 gap-2 my-1 text-center font-mono">
                  {/* Gauge DO */}
                  <div className="relative flex flex-col items-center justify-center p-1.5 bg-slate-900/40 rounded border border-slate-850">
                    <svg className="w-11 h-11 pointer-events-none" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#1d263b" strokeWidth="2.5" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#eab308" strokeWidth="2.5" strokeDasharray="64, 100" strokeLinecap="round" />
                    </svg>
                    <div className="absolute top-[22%] text-center">
                      <span className="text-[8px] text-slate-400 block scale-90">DO</span>
                      <span className="text-xs font-black text-white">{currentPond.dissolvedOxygen.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Gauge pH */}
                  <div className="relative flex flex-col items-center justify-center p-1.5 bg-slate-900/40 rounded border border-slate-850">
                    <svg className="w-11 h-11 pointer-events-none" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#1d263b" strokeWidth="2.5" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="81, 100" strokeLinecap="round" />
                    </svg>
                    <div className="absolute top-[22%] text-center">
                      <span className="text-[8px] text-slate-400 block scale-90">pH</span>
                      <span className="text-xs font-black text-white">{currentPond.pH.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Gauge Salt */}
                  <div className="relative flex flex-col items-center justify-center p-1.5 bg-slate-900/40 rounded border border-slate-850">
                    <svg className="w-11 h-11 pointer-events-none" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#1d263b" strokeWidth="2.5" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="72, 100" strokeLinecap="round" />
                    </svg>
                    <div className="absolute top-[22%] text-center">
                      <span className="text-[8px] text-slate-400 block scale-90">鹽度</span>
                      <span className="text-xs font-black text-white">{currentPond.salinity}‰</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 3: 天氣預報 FORECAST */}
              <div className="bg-[#121c2c] border border-slate-800 rounded-lg p-4 flex flex-col justify-between tracking-wide shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-extrabold text-white text-xs">天氣預報</h3>
                  <span className="text-[9px] text-[#caa45d] font-mono tracking-wider font-bold">FORECAST</span>
                </div>

                {/* 4 days vertical cards rows */}
                <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                  {/* Today */}
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-850">
                    <p className="text-slate-400 font-bold scale-90 font-sans">今天</p>
                    <div className="my-1.5 flex justify-center text-amber-400 animate-pulse">
                      <span className="text-sm">☀️</span>
                    </div>
                    <p className="font-extrabold text-slate-200 mt-1 font-mono">30</p>
                    <p className="text-[9px] text-slate-500 scale-95 font-mono">24</p>
                  </div>

                  {/* Day 2 */}
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-850">
                    <p className="text-slate-400 font-bold scale-90">06.05</p>
                    <div className="my-1.5 flex justify-center text-slate-300">
                      <span className="text-sm">☁️</span>
                    </div>
                    <p className="font-extrabold text-slate-200 mt-1 font-mono">31</p>
                    <p className="text-[9px] text-slate-500 scale-95 font-mono">25</p>
                  </div>

                  {/* Day 3 */}
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-850">
                    <p className="text-slate-400 font-bold scale-90">06.06</p>
                    <div className="my-1.5 flex justify-center text-sky-400 animate-bounce">
                      <span className="text-sm">⛈️</span>
                    </div>
                    <p className="font-extrabold text-slate-200 mt-1 font-mono">29</p>
                    <p className="text-[9px] text-slate-500 scale-95 font-mono">24</p>
                  </div>

                  {/* Day 4 */}
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-850">
                    <p className="text-slate-400 font-bold scale-90">06.07</p>
                    <div className="my-1.5 flex justify-center text-amber-400">
                      <span className="text-sm">☀️</span>
                    </div>
                    <p className="font-extrabold text-slate-200 mt-1 font-mono">32</p>
                    <p className="text-[9px] text-slate-500 scale-95 font-mono">26</p>
                  </div>
                </div>
              </div>

              {/* Module 4: Live CCTV widget compact on the left column matching LIVE VIEW */}
              <div className="bg-[#121c2c] border border-slate-800 rounded-lg overflow-hidden shadow-lg h-[160px] flex flex-col justify-between">
                <div className="bg-slate-900 px-3 py-1.5 border-b border-slate-800 flex justify-between items-center text-[10px]">
                  <span className="font-bold flex items-center gap-1">
                    <Tv className="w-3.5 h-3.5 text-blue-400" /> 
                    即時監控 ({activePondId === 'pond-a' ? 'A池 - cam_849193' : activePondId === 'pond-b' ? 'B池 - cam_a96764' : 'C池 - cam_849193'})
                  </span>
                  <span className="bg-rose-500 text-white font-black px-1 rounded animate-pulse scale-90 text-[8px]">LIVE</span>
                </div>
                {/* Visual camera snapshot canvas placeholder with real mjpeg stream load option */}
                <div className="flex-grow bg-slate-950 flex flex-col justify-center items-center relative text-center min-h-[110px] overflow-hidden">
                  {!miniStreamError ? (
                    <img 
                      src={shrimpApi.getStreamUrl(activePondId === 'pond-a' ? 'cam_849193' : activePondId === 'pond-b' ? 'cam_a96764' : 'cam_849193')} 
                      alt="CCTV Preview"
                      onError={() => setMiniStreamError(true)}
                      className="w-full h-full object-cover absolute inset-0 md:bg-black/90"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-2 absolute inset-0">
                      {/* Miniature cute swimming shrimp */}
                      <span className="text-2xl animate-bounce">🦐</span>
                      <span className="text-[9px] text-slate-500 font-mono tracking-wide mt-1">
                        池底高清監測運作中 | 0.21s 延遲 (實機斷訊)
                      </span>
                    </div>
                  )}

                  {/* Absolute watermark over the stream preview */}
                  <div className="absolute top-2 left-2 z-10 text-[8px] font-mono text-slate-100 bg-black/65 px-1.5 py-0.5 rounded flex items-center gap-1 pointer-events-none">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
                    {activePondId === 'pond-a' ? 'CAM_849193' : activePondId === 'pond-b' ? 'CAM_A96764' : 'CAM_849193'}
                  </div>
                  
                  {/* Floating Action triggering detailed view tab */}
                  <button 
                    onClick={() => setActiveTab('equipment')}
                    className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center text-xs font-bold text-white transition-opacity bg-gradient-to-t from-slate-950 cursor-pointer z-20"
                  >
                    進入設備控制安防 &gt;&gt;
                  </button>
                </div>
              </div>

            </div>

            {/* INTERACTIVE SHINY MAP CENTERPIECE (lg:col-span-6) */}
            <div className="lg:col-span-6 flex flex-col">
              <CyberMap activePond={currentPond} onSelectNode={handleMapSelectNode} />
            </div>

            {/* RIGHT PANEL COLUMN (lg:col-span-3 - contains Production Index, Power/Aerating Energy Chart, Alerts Feed) */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              
              {/* Module 1: 池區生產指數 PRODUCTION */}
              <div className="bg-[#121c2c] border border-slate-800 rounded-lg p-4 flex flex-col justify-between tracking-wide shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-yellow-400" />
                    池區生產指數
                  </h3>
                  <span className="text-[9px] text-[#caa45d] font-mono tracking-wider font-bold">PRODUCTION</span>
                </div>

                {/* Progress parameters for A區, B區, C區, D區 */}
                <div className="space-y-3 font-semibold text-xs">
                  {/* A區 */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-350">A 區 (主育成池群)</span>
                      <span className="text-white font-mono font-bold">1.42</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>

                  {/* B區 */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-350">B 區 (特大草蝦池)</span>
                      <span className="text-white font-mono font-bold">1.19</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full" style={{ width: '70%' }} />
                    </div>
                  </div>

                  {/* C區 */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-350">C 區 (黃金泰國蝦)</span>
                      <span className="text-white font-mono font-bold">0.94</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-500 to-emerald-450 h-full rounded-full" style={{ width: '55%' }} />
                    </div>
                  </div>

                  {/* D區 */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-350">D 區 (雙重溢流閘)</span>
                      <span className="text-white font-mono font-bold">1.28</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 2: 用電與增氧 ENERGY */}
              <div className="bg-[#121c2c] border border-slate-800 rounded-lg p-4 flex flex-col justify-between tracking-wide shadow-lg">
                <div className="flex justify-between items-center mb-2.5">
                  <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
                    <Power className="w-4 h-4 text-cyan-400 animate-pulse" />
                    用電與增氧
                  </h3>
                  <span className="text-[9px] text-[#caa45d] font-mono tracking-wider font-bold">ENERGY</span>
                </div>

                {/* Sleek Line Chart showing Power trend inside the card view */}
                <div className="h-[95px] w-full my-1.5 relative">
                  {/* Draw double curves representing Electricity and Oxygen values */}
                  <svg className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="cyan-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="gold-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#eab308" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Dotted grid markers */}
                    <line x1="0" y1="15" x2="250" y2="15" stroke="rgba(255,255,255,0.04)" strokeDasharray="3,3" />
                    <line x1="0" y1="45" x2="250" y2="45" stroke="rgba(255,255,255,0.04)" strokeDasharray="3,3" />
                    <line x1="0" y1="75" x2="250" y2="75" stroke="rgba(255,255,255,0.04)" strokeDasharray="3,3" />

                    {/* Path 1: Cyan line (Electricity KW) */}
                    <path
                      d="M 5,65 Q 60,15 110,60 T 210,35 T 255,70"
                      fill="url(#cyan-grad)"
                      className="opacity-40"
                    />
                    <path
                      d="M 5,65 Q 60,15 110,60 T 210,35 T 255,70"
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                    />

                    {/* Path 2: Gold line (Oxygen system rate) */}
                    <path
                      d="M 5,75 Q 50,45 110,75 T 195,50 T 255,60"
                      fill="url(#gold-grad)"
                      className="opacity-30"
                    />
                    <path
                      d="M 5,75 Q 50,45 110,75 T 195,50 T 255,60"
                      fill="none"
                      stroke="#caa45d"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    {/* Highlight point latest coordinates */}
                    <circle cx="210" cy="35" r="3.5" fill="#22d3ee" className="animate-pulse" />
                    <circle cx="195" cy="50" r="3" fill="#caa45d" />
                  </svg>

                  {/* Horizontal hours ticks scale */}
                  <div className="absolute inset-x-0 bottom-[-15px] flex justify-between text-[8px] font-mono text-slate-500 px-1">
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>24:00</span>
                  </div>
                </div>

                {/* Legend index row */}
                <div className="flex gap-4 items-center justify-center text-[10px] mt-4 border-t border-slate-800/80 pt-2 font-mono">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-1 bg-cyan-400 rounded-full" /> 用電量 (kW)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-1 bg-[#caa45d] rounded-full" /> 增氧加載 (rpm)</span>
                </div>
              </div>

              {/* Module 3: 告警事件 ALERTS */}
              <div className="bg-[#121c2c] border border-slate-800 rounded-lg p-4 flex flex-col justify-between tracking-wide shadow-lg flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-500" />
                    告警事件
                  </h3>
                  <span className="text-[9px] text-[#caa45d] font-mono tracking-wider font-bold">ALERTS</span>
                </div>

                {/* Static/Dynamic high-fidelity alerts row matches screenshot */}
                <div className="space-y-2 h-[130px] overflow-y-auto custom-scrollbar pr-0.5">
                  {/* Alert 1 */}
                  <div className="bg-slate-900/60 p-2.5 rounded border border-slate-850 flex items-start gap-2.5 text-[11px] leading-tight">
                    <div className="w-6 h-6 shrink-0 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold flex items-center justify-center text-[10px]">
                      中
                    </div>
                    <div>
                      <p className="text-slate-100 font-semibold font-sans">B-07 pH 連續上升，建議補水 12%</p>
                      <p className="text-[9px] text-slate-500 mt-1 font-mono">智慧閥控 • 13:12:05</p>
                    </div>
                  </div>

                  {/* Alert 2 */}
                  <div className="bg-slate-900/60 p-2.5 rounded border border-slate-850 flex items-start gap-2.5 text-[11px] leading-tight">
                    <div className="w-6 h-6 shrink-0 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold flex items-center justify-center text-[10px]">
                      低
                    </div>
                    <div>
                      <p className="text-slate-200 font-semibold font-sans">D-01 水車震動偏高，排入夜巡偵測</p>
                      <p className="text-[9px] text-slate-500 mt-1 font-mono">設備安防 • 12:45:00</p>
                    </div>
                  </div>

                  {/* Alert 3 */}
                  <div className="bg-slate-900/60 p-2.5 rounded border border-slate-850 flex items-start gap-2.5 text-[11px] leading-tight">
                    <div className="w-6 h-6 shrink-0 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold flex items-center justify-center text-[10px]">
                      低
                    </div>
                    <div>
                      <p className="text-slate-200 font-semibold font-sans">A-03 投餌機自動排程校正完成</p>
                      <p className="text-[9px] text-slate-500 mt-1 font-mono">安全安防 • 11:20:10</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* VIEW 2: SMART WATER QUALITY (智能水質) - Detailed parameters, historic search table, QR cert */}
        {activeTab === 'water' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full animate-fadeIn">
            {/* Water Quality Panel 2x2 parameter card */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              <WaterQuality pond={currentPond} onUpdatePondMetric={handleUpdatePondMetric} />
              
              {/* historic database spreadsheets table */}
              <div className="flex-grow">
                <StockHistory activePondId={activePondId} activePondName={currentPond.name.split(' - ')[0]} />
              </div>
            </div>

            {/* Density stats & QR trace certification */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              <PondSummary pond={currentPond} onUpdatePondMetric={handleUpdatePondMetric} />
              
              {/* Display side station info inside a cute hud card */}
              <div className="bg-[#121c2c] border border-slate-800 p-4 rounded-lg tracking-wide shadow-lg">
                <h4 className="font-extrabold text-white text-xs flex items-center gap-1.5 mb-2.5">
                  <Database className="w-4 h-4 text-[#caa45d]" />
                  水質多重備份與加密解算
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  本系統數據由物聯網閘道器隨時複寫備份，整合台灣海洋環境與池塘生態指數，解算精準度達 99.8%，確保與生產履歷鏈路流暢對接。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: EQUIPMENT SECURITY (設備安防) - CCTV camera monitors, hardware switches, AI diagnostic logs */}
        {activeTab === 'equipment' && (          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full animate-fadeIn">
            {/* CCTV monitor large viewer + AI logs */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              <div className="min-h-[360px] flex-grow">
                <CctvMonitor 
                  activePondId={activePondId} 
                  activePondName={currentPond.name.split(' - ')[0]} 
                  aeratorPowerLevel={activeEq.aeratorPowerLevel} 
                />
              </div>

              {/* Proactive diagnostic logs */}
              <div className="h-[300px]">
                <AiForecast logs={logs} onAddLog={handleAddLogCallback} />
              </div>
            </div>

            {/* Hardware switches / feed intervals triggers */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              <div className="flex-grow">
                <EquipmentControl 
                  activePondId={activePondId}
                  activePondName={currentPond.name.split(' - ')[0]}
                  equipmentState={activeEq}
                  onUpdateEquipment={handleUpdateEquipment}
                  onForceFeed={handleForceFeeding}
                />
              </div>

              {/* Weather station summary */}
              <div>
                <WeatherStation />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: INVESTOR DASHBOARD (投資人報表) */}
        {activeTab === 'investor' && (
          <InvestorDashboard ponds={ponds} />
        )}

        {/* VIEW 5: EVENTS MANAGER (說明會管理) */}
        {activeTab === 'events' && (
          <EventsManager />
        )}

        {/* VIEW 6: HARVEST MANAGER (收益管理) */}
        {activeTab === 'harvest' && (
          <div className="w-full rounded-xl overflow-hidden border border-slate-800 shadow-xl"
               style={{ height: 'calc(100vh - 160px)' }}>
            <iframe
              src={shrimpApi.getStaticHarvestUrl()}
              className="w-full h-full"
              title="收益管理"
              style={{ border: 'none', background: '#0f172a' }}
            />
          </div>
        )}

        {/* VIEW 7: ACCOUNTS (帳號管理) */}
        {activeTab === 'accounts' && (
          <div className="w-full rounded-xl overflow-hidden border border-slate-800 shadow-xl"
               style={{ height: 'calc(100vh - 160px)' }}>
            <iframe
              src={shrimpApi.getStaticAdminUrl()}
              className="w-full h-full"
              title="帳號管理"
              style={{ border: 'none', background: '#0f172a' }}
            />
          </div>
        )}

      </main>

      {/* 3. Global Tactical Footer matches command-center dashboard styling */}
      <footer className="h-10 bg-[#09101b] border-t-2 border-[#caa45d]/20 px-6 flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest relative z-30 shrink-0 select-none">
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><HardDrive className="w-3.5 h-3.5 text-slate-500" /> DB-INTEGRATION: OPTIMAL</span>
          <span className="hidden sm:inline">SENSOR NODES: 12,402 ACTIVE</span>
        </div>
        <div className="flex gap-4 items-center font-mono">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> 
            Python API SYNCED
          </span>
          <span>SHRIMPMASTER CONSOLE v2.5.2</span>
        </div>
      </footer>

      {/* 4. High-Tech Dynamic API Connection login overlay modal */}
      {showApiModal && (        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-[#0b101c] border-2 border-[#caa45d] p-6 rounded-xl max-w-md w-full relative shadow-2xl text-slate-200 glow-amber">
            
            {/* Corner cyber markings */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#caa45d]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#caa45d]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#caa45d]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#caa45d]" />

            <div className="absolute top-3 right-3 text-slate-400">
              <button 
                onClick={() => {
                  setShowApiModal(false);
                  setApiErrorMsg(null);
                  setApiSuccessMsg(null);
                }}
                className="py-1 px-2.5 bg-slate-900 border border-slate-700 hover:text-white rounded text-xs cursor-pointer"
              >
                關閉
              </button>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-6 h-6 text-[#caa45d] animate-pulse" />
              <div>
                <h3 className="font-extrabold text-white text-md tracking-wider">中控台 Python API 代理連線</h3>
                <p className="text-[10px] font-mono text-[#caa45d]">ENDPOINT PROXY GATEWAY PORTAL</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-normal mb-4 bg-slate-950/80 p-2.5 rounded border border-slate-800">
              請輸入後端主機位址以完成 JWT 憑證認證。系統將自動與 <code>/ponds/</code> <code>/sensors/</code> 及攝像頭代理端串接解鎖實時監控！
            </p>

            <form onSubmit={handleApiConnectSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1.5 uppercase font-mono text-[10px]">API 服務網址 (Domain)</label>
                <input
                  type="url"
                  required
                  value={apiDomain}
                  onChange={(e) => setApiDomain(e.target.value)}
                  placeholder="https://smartshrip.com.tw"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 p-2.5 rounded font-mono text-xs focus:outline-none focus:border-[#caa45d] placeholder-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-400 font-bold mb-1.5 uppercase font-mono text-[10px]">登入帳號 (Username)</label>
                  <input
                    type="text"
                    required
                    value={apiUsernameField}
                    onChange={(e) => setApiUsernameField(e.target.value)}
                    placeholder="admin"
                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 p-2.5 rounded font-mono text-xs focus:outline-none focus:border-[#caa45d]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1.5 uppercase font-mono text-[10px]">安全密碼 (Password)</label>
                  <input
                    type="password"
                    required
                    value={apiPasswordField}
                    onChange={(e) => setApiPasswordField(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 text-[#caa45d] p-2.5 rounded font-mono text-xs focus:outline-none focus:border-[#caa45d]"
                  />
                </div>
              </div>

              {/* Result alerts */}
              {apiErrorMsg && (
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded text-rose-400 font-bold text-[11px] leading-relaxed animate-shake">
                  ⚠ 認證失敗: {apiErrorMsg}
                </div>
              )}

              {apiSuccessMsg && (
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-400 font-bold text-[11px] leading-relaxed">
                  {apiSuccessMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isConnecting}
                className={`w-full py-2.5 rounded font-extrabold text-xs flex justify-center items-center gap-2 transition-all cursor-pointer ${
                  isConnecting
                    ? 'bg-amber-600/20 border-amber-500/20 text-amber-305'
                    : 'bg-[#caa45d] hover:bg-[#bfa058] text-slate-950 shadow-md'
                }`}
              >
                {isConnecting ? (
                  <span className="flex items-center gap-1.5 animate-pulse font-mono">
                    <svg className="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    正進行 JWT 認證連線中...
                  </span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>開始中控台安全對接 (POST /auth/login)</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-900 flex justify-between text-[9px] text-slate-500 font-mono">
              <span>連線安全：SSL SHA-256 加密</span>
              <span>API狀態: OK 在線</span>
            </div>
          </div>
        </div>
      )}

    </div>
    )}
    </>
  );
}
