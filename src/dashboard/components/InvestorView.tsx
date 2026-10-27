/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  TrendingUp, CalendarCheck, Fish, DollarSign,
  Droplet, Thermometer, Wind, LogOut, Clock
} from 'lucide-react';
import { PondInfo, PondId } from '../types';
import { shrimpApi, clearApiCredentials } from '../lib/api';
import logoImg from '../assets/智養蝦-02.png';

interface InvestorViewProps {
  ponds: PondInfo[];
  username: string;
  onLogout: () => void;
}

const MARKET_PRICES: Record<string, number> = {
  '頂級無毒白蝦 Premium White Shrimp': 360,
  '特選超大草蝦 Black Tiger Select': 520,
  '黃金泰國蝦 Golden Prawn Blue': 430,
};
const COST_PER_KG = 180;

function estimateAvgWeight(days: number): number {
  if (days <= 15) return 0.2 + days * 0.05;
  if (days <= 45) return 1.0 + (days - 15) * 0.3;
  return 10.0 + (days - 45) * 0.4;
}

function daysToHarvest(days: number): number {
  return Math.max(0, 90 - days);
}

// 簡易模擬 CCTV（沒連線時顯示模擬畫面）
function SimCctv({ pondId, pondName }: { pondId: PondId; pondName: string }) {
  const [connected, setConnected] = useState(false);
  const streamUrl = shrimpApi.getStreamUrl(
    pondId === 'pond-a' ? 'cam_849193' : pondId === 'pond-b' ? 'cam_a96764' : 'cam_849193'
  );

  return (
    <div className="relative w-full aspect-video bg-[#050a12] rounded-lg overflow-hidden border border-slate-800">
      {/* 嘗試載入真實 MJPEG stream */}
      <img
        src={streamUrl}
        className="w-full h-full object-cover"
        onLoad={() => setConnected(true)}
        onError={() => setConnected(false)}
        style={{ display: connected ? 'block' : 'none' }}
        alt="live"
      />

      {/* 模擬畫面（無訊號時） */}
      {!connected && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-[#050a12]" />
          {/* 動態波紋 */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-blue-500/30 animate-ping absolute inset-0" />
              <div className="w-16 h-16 rounded-full border border-blue-500/20 flex items-center justify-center">
                <Fish className="w-7 h-7 text-blue-400/60" />
              </div>
            </div>
            <p className="text-[10px] text-slate-600 font-mono mt-2">{pondName} · 等待攝影機連線</p>
          </div>
          {/* 掃描線 */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)' }} />
        </div>
      )}

      {/* HUD overlay */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`} />
        <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider">
          {connected ? 'LIVE' : 'OFFLINE'}
        </span>
      </div>
      <div className="absolute bottom-2 left-2 text-[9px] text-slate-500 font-mono">{pondName}</div>
    </div>
  );
}

// ROI 圓環
function RoiRing({ roi }: { roi: number }) {
  const r = 36; const circ = 2 * Math.PI * r;
  const pct = Math.min(Math.max(roi / 80, 0), 1);
  const color = roi >= 30 ? '#22c55e' : roi >= 10 ? '#eab308' : '#f97316';
  return (
    <svg width="88" height="88" viewBox="0 0 88 88">
      <circle cx="44" cy="44" r={r} fill="none" stroke="#1e293b" strokeWidth="8" />
      <circle cx="44" cy="44" r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={`${pct * circ} ${circ}`} strokeDashoffset={circ * 0.25}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: 'stroke-dasharray 0.6s' }} />
      <text x="44" y="40" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="monospace">
        {roi >= 0 ? '+' : ''}{roi.toFixed(1)}%
      </text>
      <text x="44" y="52" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="sans-serif">ROI</text>
    </svg>
  );
}

export default function InvestorView({ ponds, username, onLogout }: InvestorViewProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPond, setSelectedPond] = useState<PondId>(ponds[0]?.id as PondId ?? 'pond-a');

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleLogout = () => {
    clearApiCredentials();
    onLogout();
  };

  // 計算各池數據
  const pondData = ponds.map(pond => {
    const avgWeight = estimateAvgWeight(pond.shrimpAgeDays);
    const surviving = Math.round(pond.estimatedCount * (pond.estimatedSurvival / 100));
    const biomassKg = (surviving * avgWeight) / 1000;
    const price = MARKET_PRICES[pond.shrimpType] ?? 380;
    const revenue = biomassKg * price;
    const cost = biomassKg * COST_PER_KG;
    const netProfit = revenue - cost;
    const roi = ((revenue - cost) / cost) * 100;
    const harvestDays = daysToHarvest(pond.shrimpAgeDays);
    return { pond, biomassKg, revenue, netProfit, roi, harvestDays, surviving, price };
  });

  const selected = pondData.find(d => d.pond.id === selectedPond) ?? pondData[0];

  return (
    <div className="min-h-screen bg-[#050a12] text-slate-200 flex flex-col font-sans">

      {/* Header */}
      <header className="h-14 bg-[#09101b] border-b border-[#caa45d]/20 px-5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#1b5cb1]/20 border border-[#1eecf8]/40 flex items-center justify-center overflow-hidden">
            <img src={logoImg} alt="logo" className="w-full h-full object-contain p-0.5" />
          </div>
          <div>
            <p className="text-xs font-black text-white tracking-wider">智養蝦 · 投資人專區</p>
            <p className="text-[9px] text-[#caa45d]/60 font-mono">INVESTOR PORTAL</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
            <Clock className="w-3 h-3 text-[#caa45d]" />
            {currentTime.toLocaleDateString('zh-TW')} {currentTime.toLocaleTimeString('zh-TW', { hour12: false })}
          </div>
          <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-1.5">
            <div className="w-5 h-5 rounded-full bg-[#caa45d]/20 border border-[#caa45d]/40 flex items-center justify-center">
              <span className="text-[8px] text-[#caa45d] font-black">{username[0]?.toUpperCase()}</span>
            </div>
            <span className="text-[10px] text-slate-300 font-mono">{username}</span>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/20
              text-rose-400 text-[10px] font-bold hover:bg-rose-500/10 transition-colors cursor-pointer">
            <LogOut className="w-3.5 h-3.5" />
            登出
          </button>
        </div>
      </header>

      <main className="flex-grow p-4 md:p-5 max-w-7xl mx-auto w-full space-y-4">

        {/* 頂部總覽卡 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: '預計總收益', icon: <DollarSign className="w-5 h-5" />,
              value: `$${(pondData.reduce((s, d) => s + d.revenue, 0) / 10000).toFixed(1)}萬`,
              sub: 'TWD 全池合計', color: 'text-[#caa45d]', border: 'border-[#caa45d]/20'
            },
            {
              label: '預計淨利潤', icon: <TrendingUp className="w-5 h-5" />,
              value: `$${(pondData.reduce((s, d) => s + d.netProfit, 0) / 10000).toFixed(1)}萬`,
              sub: '扣除養殖成本', color: 'text-emerald-400', border: 'border-emerald-500/20'
            },
            {
              label: '在養總數', icon: <Fish className="w-5 h-5" />,
              value: ponds.reduce((s, p) => s + p.estimatedCount, 0).toLocaleString(),
              sub: '尾（三池合計）', color: 'text-blue-400', border: 'border-blue-500/20'
            },
            {
              label: '最近收成', icon: <CalendarCheck className="w-5 h-5" />,
              value: `${Math.min(...pondData.map(d => d.harvestDays))} 天後`,
              sub: '目標蝦齡 90 天', color: 'text-purple-400', border: 'border-purple-500/20'
            },
          ].map(card => (
            <div key={card.label}
              className={`bg-[#0d1726] border ${card.border} rounded-xl p-4 flex items-center gap-3`}>
              <span className={`${card.color} opacity-80`}>{card.icon}</span>
              <div>
                <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">{card.label}</p>
                <p className={`text-lg font-black font-mono ${card.color}`}>{card.value}</p>
                <p className="text-[9px] text-slate-600">{card.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 主體：左側池選擇 + 右側詳情 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* 左：蝦池卡片 */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest px-1">選擇蝦池查看詳情</p>
            {pondData.map(({ pond, roi, revenue, harvestDays }) => {
              const isActive = pond.id === selectedPond;
              const roiColor = roi >= 30 ? '#22c55e' : roi >= 10 ? '#eab308' : '#f97316';
              const statusDot = pond.status === 'excellent' ? 'bg-emerald-400' :
                pond.status === 'warning' ? 'bg-amber-400' : 'bg-rose-400';
              return (
                <div key={pond.id} onClick={() => setSelectedPond(pond.id as PondId)}
                  className={`rounded-xl border p-4 cursor-pointer transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-to-br from-[#0d1f38] to-[#0a1628] border-[#caa45d]/50 shadow-[0_0_20px_rgba(202,164,93,0.1)]'
                      : 'bg-[#0d1726] border-slate-800 hover:border-slate-700'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${statusDot}`} />
                      <div>
                        <p className="text-xs font-black text-white">{pond.name.split(' - ')[0]}</p>
                        <p className="text-[9px] text-slate-500 mt-0.5">{pond.shrimpType.split(' ')[0]}</p>
                      </div>
                    </div>
                    <RoiRing roi={roi} />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="bg-slate-900/60 rounded-lg p-2 border border-slate-800">
                      <p className="text-slate-600">蝦齡</p>
                      <p className="font-bold text-white font-mono">{pond.shrimpAgeDays}天</p>
                    </div>
                    <div className="bg-slate-900/60 rounded-lg p-2 border border-slate-800">
                      <p className="text-slate-600">預計收益</p>
                      <p className="font-bold text-[#caa45d] font-mono">${Math.round(revenue / 1000)}K</p>
                    </div>
                    <div className="bg-slate-900/60 rounded-lg p-2 border border-slate-800">
                      <p className="text-slate-600">距收成</p>
                      <p className={`font-bold font-mono ${harvestDays === 0 ? 'text-[#caa45d]' : 'text-slate-200'}`}>
                        {harvestDays === 0 ? '可收！' : `${harvestDays}天`}
                      </p>
                    </div>
                  </div>

                  {/* 養殖進度條 */}
                  <div className="mt-3">
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full"
                        style={{
                          width: `${Math.min((pond.shrimpAgeDays / 90) * 100, 100)}%`,
                          background: `linear-gradient(90deg, #3b82f6, ${roiColor})`,
                          boxShadow: `0 0 4px ${roiColor}`,
                        }} />
                    </div>
                    <div className="flex justify-between text-[8px] text-slate-700 font-mono mt-0.5">
                      <span>放養</span><span>收成 D.90</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 右：選中池詳情 */}
          <div className="lg:col-span-8 space-y-4">

            {/* 即時畫面 */}
            <div className="bg-[#0d1726] border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-black text-white">即時監控畫面</span>
                <span className="text-[9px] text-slate-500 font-mono ml-auto">{selected?.pond.name.split(' - ')[0]}</span>
              </div>
              <SimCctv
                pondId={selected?.pond.id as PondId}
                pondName={selected?.pond.name.split(' - ')[0] ?? ''}
              />
            </div>

            {/* 水質數據 */}
            <div className="bg-[#0d1726] border border-slate-800 rounded-xl p-4">
              <p className="text-xs font-black text-white mb-3 flex items-center gap-2">
                <Droplet className="w-4 h-4 text-blue-400" />
                即時水質數據
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-[10px]">
                {[
                  { label: '水溫', value: `${selected?.pond.temperature.toFixed(1)}°C`, color: 'text-orange-400' },
                  { label: '溶氧', value: `${selected?.pond.dissolvedOxygen.toFixed(1)}`, unit: 'mg/L', color: 'text-blue-400' },
                  { label: 'pH值', value: `${selected?.pond.pH.toFixed(1)}`, color: 'text-purple-400' },
                  { label: '鹽度', value: `${selected?.pond.salinity}‰`, color: 'text-cyan-400' },
                  { label: 'ORP', value: `${selected?.pond.orp}`, unit: 'mV', color: 'text-yellow-400' },
                  { label: '氨氮', value: `${selected?.pond.nh3n}`, unit: 'mg/L', color: 'text-rose-400' },
                ].map(item => (
                  <div key={item.label} className="bg-[#08111e] border border-slate-800 rounded-lg p-2.5">
                    <p className="text-slate-600 text-[9px]">{item.label}</p>
                    <p className={`font-black font-mono mt-0.5 ${item.color}`}>{item.value}</p>
                    {item.unit && <p className="text-[8px] text-slate-700">{item.unit}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* 收益試算 */}
            <div className="bg-[#0d1726] border border-slate-800 rounded-xl p-4">
              <p className="text-xs font-black text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#caa45d]" />
                收益試算
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: '預計生物量', value: `${Math.round(selected?.biomassKg ?? 0).toLocaleString()} kg`, color: 'text-blue-400' },
                  { label: '市場售價', value: `$${selected?.price}/kg`, color: 'text-slate-300' },
                  { label: '預計毛收益', value: `$${Math.round(selected?.revenue ?? 0).toLocaleString()}`, color: 'text-[#caa45d]' },
                  { label: '預計淨利', value: `$${Math.round(selected?.netProfit ?? 0).toLocaleString()}`, color: 'text-emerald-400' },
                ].map(item => (
                  <div key={item.label} className="bg-[#08111e] border border-slate-800 rounded-lg p-3 text-center">
                    <p className="text-[9px] text-slate-600 font-mono">{item.label}</p>
                    <p className={`text-sm font-black font-mono mt-1 ${item.color}`}>{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 bg-[#08111e] border border-slate-800 rounded-lg p-3">
                <div className="flex justify-between items-center text-[10px] font-mono mb-1.5">
                  <span className="text-slate-500">養殖進度</span>
                  <span className="text-slate-400">{selected?.pond.shrimpAgeDays} / 90 天</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(((selected?.pond.shrimpAgeDays ?? 0) / 90) * 100, 100)}%`,
                      background: 'linear-gradient(90deg, #3b82f6, #22c55e)',
                      boxShadow: '0 0 6px #22c55e',
                    }} />
                </div>
                <p className="text-[9px] text-slate-600 font-mono mt-1.5 text-center">
                  預計 {selected?.harvestDays === 0 ? '本批已可收成！' : `${selected?.harvestDays} 天後收成`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="h-8 bg-[#09101b] border-t border-slate-800/50 flex items-center justify-center">
        <p className="text-[9px] text-slate-700 font-mono tracking-widest uppercase">
          智養蝦 INVESTOR PORTAL · 資料僅供參考
        </p>
      </footer>
    </div>
  );
}
