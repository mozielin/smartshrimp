/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Droplet, Thermometer, Info, HelpCircle, Shield, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import { PondInfo } from '../types';

interface WaterQualityProps {
  pond: PondInfo;
  onUpdatePondMetric: (metricKey: keyof PondInfo, newValue: number) => void;
}

export default function WaterQuality({ pond, onUpdatePondMetric }: WaterQualityProps) {
  // Safe thresholds which user can interactively configure
  const [minDO, setMinDO] = useState<number>(5.5);
  const [targetTemp, setTargetTemp] = useState<number>(27.0);

  // Mock historical data mapping to the 12H scrolling chart
  const doHistory = [
    5.6, 5.9, 6.2, 5.8, 5.7, 5.7, 6.1, 6.7, 6.8, 6.5, 6.1, 6.3, 6.4, 6.3, 5.9, 6.0, 6.2, 6.5, 6.8
  ];

  // Helper code to map historical array to SVG coordinate points
  const drawSvgPath = (data: number[], width: number, height: number) => {
    if (data.length === 0) return '';
    const maxVal = 8.5; // max DO range
    const minVal = 4.0; // min DO range
    
    return data.map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const percent = (val - minVal) / (maxVal - minVal);
      const y = height - percent * height;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const getStatusColor = (val: number, min: number, max: number) => {
    if (val < min || val > max) return 'text-rose-500 fill-rose-500 bg-rose-950/45 border-rose-500/40';
    return 'text-emerald-400 fill-emerald-400 bg-emerald-950/45 border-emerald-500/40';
  };

  const getBadgeText = (val: number, min: number, max: number) => {
    if (val < min || val > max) return '警報異常';
    return '安全優良';
  };

  return (
    <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-4 shadow-sm flex flex-col justify-between h-full">
      {/* Header section */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Droplet className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white flex items-center gap-2 leading-tight">
                全方位水質即時監測 (IoT)
              </h3>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">ALL-ROUND WATER QUALITY REALTIME DASHBOARD</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-emerald-450 border border-slate-750 text-[10px] font-bold">
              全線常規在線
            </span>
          </div>
        </div>

        {/* 2x2 Core Metrics Grid matching images */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Card 1: Water Temp */}
          <div className="bg-[#0F172A] border border-slate-755 p-3 rounded flex flex-col justify-between hover:bg-slate-900 transition-all">
            <div className="flex justify-between items-center text-slate-400 text-xs">
              <span className="flex items-center gap-1">1. 水溫 <Thermometer className="w-3.5 h-3.5 text-rose-400" /></span>
              <span className="text-[10px] text-slate-500">標準: 25~31°C</span>
            </div>
            <div className="my-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold font-mono text-white tracking-tight">
                {pond.temperature.toFixed(1)}°C
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getStatusColor(pond.temperature, 25, 31)}`}>
                {getBadgeText(pond.temperature, 25, 31)}
              </span>
            </div>
            <div className="flex justify-between items-center text-[10px] border-t border-slate-800 pt-1">
              <span className="text-slate-500">當前指令增溫: {targetTemp}°C</span>
              <button 
                onClick={() => {
                  const nt = pond.temperature > 28 ? 26.5 : 29.2;
                  onUpdatePondMetric('temperature', nt);
                }}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                調節模擬
              </button>
            </div>
          </div>

          {/* Card 2: Dissolved Oxygen */}
          <div className="bg-[#0F172A] border border-blue-500/20 p-3 rounded flex flex-col justify-between hover:bg-slate-900 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 h-10 w-10 bg-blue-500/5 rotate-45 translate-x-5 -translate-y-5 rounded-full" />
            <div className="flex justify-between items-center text-slate-400 text-xs relative z-10">
              <span className="flex items-center gap-1">2. 溶氧量 (DO) <Droplet className="w-3.5 h-3.5 text-blue-400" /></span>
              <span className="text-[10px] text-slate-500">標準: &gt;{minDO.toFixed(1)} mg/L</span>
            </div>
            <div className="my-2 flex items-baseline justify-between relative z-10">
              <span className="text-2xl font-bold font-mono text-blue-405 tracking-tight">
                {pond.dissolvedOxygen.toFixed(1)} <span className="text-xs text-slate-400">mg/L</span>
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getStatusColor(pond.dissolvedOxygen, minDO, 12)}`}>
                {getBadgeText(pond.dissolvedOxygen, minDO, 12)}
              </span>
            </div>
            <div className="flex justify-between items-center text-[10px] border-t border-slate-800 pt-1 relative z-10">
              <span className="text-slate-500">安全警戒: {minDO} mg/L</span>
              <button 
                onClick={() => {
                  const nd = pond.dissolvedOxygen < 6 ? 6.8 : 4.8;
                  onUpdatePondMetric('dissolvedOxygen', nd);
                }}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                觸發低氧
              </button>
            </div>
          </div>

          {/* Card 3: pH Value */}
          <div className="bg-[#0F172A] border border-slate-750 p-3 rounded flex flex-col justify-between hover:bg-slate-900 transition-all">
            <div className="flex justify-between items-center text-slate-400 text-xs">
              <span>3. 酸鹼值 (pH)</span>
              <span className="text-[10px] text-slate-500">標準: 6.8~8.5</span>
            </div>
            <div className="my-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold font-mono text-white tracking-tight">
                {pond.pH.toFixed(1)}
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getStatusColor(pond.pH, 6.8, 8.5)}`}>
                {getBadgeText(pond.pH, 6.8, 8.5)}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-1 flex justify-between">
              <span>自動酸鹼平衡調和 active</span>
              <span>7.2 (中性/微鹼)</span>
            </div>
          </div>

          {/* Card 4: Salinity */}
          <div className="bg-[#0F172A] border border-slate-750 p-3 rounded flex flex-col justify-between hover:bg-slate-900 transition-all">
            <div className="flex justify-between items-center text-slate-400 text-xs">
              <span>4. 鹽度 (EC-PSU)</span>
              <span className="text-[10px] text-slate-500">標準: 15~25 ppt</span>
            </div>
            <div className="my-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold font-mono text-white tracking-tight">
                {pond.salinity} <span className="text-xs text-slate-400">ppt</span>
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getStatusColor(pond.salinity, 15, 25)}`}>
                {getBadgeText(pond.salinity, 15, 25)}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-1 flex justify-between">
              <span>鹽度自動補淡中控器穩定</span>
              <span>20 ppt (適合白蝦)</span>
            </div>
          </div>
        </div>

        {/* Secondary Metrics Triple Horizontal Box */}
        <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-[#0F172A] rounded border border-slate-750 mb-4 text-center">
          <div>
            <p className="text-[9px] text-slate-400 font-medium">氧化還原 (ORP)</p>
            <p className="text-xs font-bold font-mono text-emerald-450 my-0.5">+{pond.orp} mV</p>
            <p className="text-[8px] text-emerald-450 bg-emerald-950/20 border border-emerald-500/20 rounded px-1 py-0.5 inline-block scale-90">狀態健康</p>
          </div>
          <div className="border-x border-slate-800">
            <p className="text-[9px] text-slate-400 font-medium">電導度 (EC)</p>
            <p className="text-xs font-bold font-mono text-white my-0.5">{pond.ec} mS/cm</p>
            <p className="text-[8px] text-slate-500 rounded px-1 py-0.5 inline-block scale-90">大氣係數穩定</p>
          </div>
          <div>
            <p className="text-[9px] text-slate-400 font-medium">氨氮餘量 (NH3-N)</p>
            <p className="text-xs font-bold font-mono text-blue-400 my-0.5">&lt;{pond.nh3n} mg/L</p>
            <p className="text-[8px] text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded px-1 py-0.5 inline-block scale-90">毒素極低</p>
          </div>
        </div>

        {/* Active interactive threshold setter for administrative managers */}
        <div className="bg-[#0F172A] border border-slate-750 px-3 py-2 rounded mb-3 flex justify-between items-center text-xs">
          <div className="flex items-center gap-1 text-slate-300">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>智能閾值設定</span>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              融氧警戒:
              <input 
                type="range" 
                min="4.5" 
                max="6.5" 
                step="0.1" 
                value={minDO} 
                onChange={(e) => setMinDO(parseFloat(e.target.value))}
                className="w-16 accent-blue-500 cursor-pointer text-blue-300" 
              />
              <span className="font-mono text-blue-400 font-bold">{minDO}</span>
            </label>
            <label className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              增溫目標:
              <select 
                value={targetTemp} 
                onChange={(e) => setTargetTemp(parseFloat(e.target.value))}
                className="bg-slate-900 border border-slate-700 text-rose-400 px-1 py-0.5 rounded text-[10px] font-mono outline-none"
              >
                <option value={26.0}>26.0°C</option>
                <option value={27.0}>27.0°C</option>
                <option value={28.0}>28.0°C</option>
                <option value={29.0}>29.0°C</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* SVG trend history chart */}
      <div className="border border-slate-750 bg-[#0F172A] rounded p-3">
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5 font-sans">
          <span className="flex items-center gap-1.5 text-blue-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" /> 溶氧量 (DO) 12H 數據趨勢
          </span>
          <span className="text-[10px] text-slate-500">自動採樣 1H/次</span>
        </div>

        {/* SVG Graphic view */}
        <div className="relative h-[80px] w-full my-2 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.06),transparent_60%)] rounded">
          <svg className="w-full h-full overflow-visible">
            {/* Grid helper horizontal lines */}
            <line x1="0" y1="20" x2="100%" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
            <line x1="0" y1="40" x2="100%" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
            <line x1="0" y1="60" x2="100%" y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />

            {/* Main glow trend curve */}
            <path
              d={drawSvgPath(doHistory, 330, 80)}
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_6px_rgba(37,99,235,0.5)]"
            />

            {/* Glowing active point marker at the latest coordinate */}
            <circle
              cx="330"
              cy={80 - ((pond.dissolvedOxygen - 4.0) / 4.5) * 80}
              r="4"
              fill="#3b82f6"
              stroke="#1E293B"
              strokeWidth="2.5"
              className="animate-pulse"
            />
          </svg>

          {/* Time axis */}
          <div className="absolute inset-x-0 bottom-0 top-[82px] flex justify-between px-1 text-[9px] font-mono text-slate-500">
            <span>22:34 (昨夜)</span>
            <span>中期趨勢</span>
            <span>最新 ({new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false })})</span>
          </div>
        </div>

        {/* Informative indicator boxes */}
        <div className="flex justify-between items-center text-[10px] mt-4 border-t border-slate-850 pt-2 text-slate-405">
          <div>
            <span>即時指標:</span>{' '}
            <strong className="text-blue-400 font-mono text-xs">{pond.dissolvedOxygen.toFixed(1)} mg/L</strong>
          </div>
          <div className="flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded text-[9px] text-blue-400">
            <span>指定最適範圍:</span>
            <span className="font-mono font-bold">&gt; 5.5 mg/L</span>
          </div>
        </div>
      </div>
    </div>
  );
}
