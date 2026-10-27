/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Target, ShieldAlert, CheckCircle2, Waves, Zap, Compass, Activity, Info } from 'lucide-react';
import { PondInfo } from '../types';

interface CyberMapProps {
  activePond: PondInfo;
  onSelectNode: (nodeKey: 'temperature' | 'dissolvedOxygen' | 'pH' | 'salinity' | 'nh3n') => void;
}

export default function CyberMap({ activePond, onSelectNode }: CyberMapProps) {
  // Bottom Map Sub-layers: A = 育成池, B = 水質站, C = 飼料倉, D = 排水閘
  const [activeLayer, setActiveLayer] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [pulseState, setPulseState] = useState<boolean>(true);
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  // Toggle map pulses
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseState(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const getLayerText = (layer: 'A' | 'B' | 'C' | 'D') => {
    switch (layer) {
      case 'A': return '育成池模組 - 高密度溫室群';
      case 'B': return '水質監測站 - 多重感知佈極網';
      case 'C': return '自動飼料倉 - 聲學排程落料點';
      case 'D': return '雙循環排水閘 - 溫室重力溢流口';
    }
  };

  return (
    <div className="bg-[#0b101c]/90 border-2 border-[#caa45d]/40 rounded-xl p-5 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between font-sans text-slate-100 min-h-[460px] select-none">
      
      {/* 1. Futuristic Grid & Radial Background Lines */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-blue-500/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-blue-500/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-blue-500/15 pointer-events-none border-dashed" />
      
      {/* 2. Map Top info header */}
      <div className="relative z-10 flex justify-between items-start pointer-events-none">
        <div>
          <h3 className="font-extrabold text-white text-md tracking-wider flex items-center gap-1.5">
            <Compass className="w-5 h-5 text-[#caa45d] animate-spin-slow" />
            池區圖資定位 &amp; 雙流循環遙測
          </h3>
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mt-0.5">
            GIS SATELLITE MAP &amp; REMORE SENSING OVERLAYS
          </p>
        </div>

        <div className="bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono font-bold px-2.5 py-1 rounded-sm flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          雙重逆循環運作中
        </div>
      </div>

      {/* 3. Center Cyber-Synthesized Taiwan Coast Satellite Map (Ponds Layout) */}
      <div className="relative flex-1 w-full my-4 min-h-[220px] rounded-lg overflow-hidden border border-slate-800/80 bg-slate-950/60 shadow-inner flex items-center justify-center">
        
        {/* Draw a real-time, stunning interactive vector Map Layout of the pond district */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Neon Water Channel SVG */}
          <svg className="absolute w-full h-full opacity-60 pointer-events-none" viewBox="0 0 500 300">
            {/* Elegant glowing river flowing through */}
            <path
              d="M -20,150 Q 150,110 240,160 T 520,130"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="10"
              className="drop-shadow-[0_0_15px_rgba(14,165,233,0.7)] opacity-40 animate-pulse"
            />
            <path
              d="M -20,150 Q 150,110 240,160 T 520,130"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              className="opacity-80"
            />

            {/* Orange/Golden County/Boundary line corresponding to the image */}
            <path
              d="M 120,0 C 180,90 290,60 340,140 S 190,260 210,300"
              fill="none"
              stroke="#eab308"
              strokeWidth="3.5"
              strokeDasharray="4,4"
              className="drop-shadow-[0_0_12px_rgba(234,179,8,0.8)] opacity-95"
            />

            {/* Glowing Aquaculture Ponds Layout rectangles (The grids on the left sides) */}
            <g className="opacity-40 stroke-[#38bdf8] fill-sky-950/20" strokeWidth="1.5">
              {/* Left Grid */}
              <rect x="30" y="40" width="40" height="25" rx="3" className={activeLayer === 'A' ? 'fill-sky-500/20 stroke-sky-400' : ''} />
              <rect x="75" y="35" width="40" height="25" rx="3" />
              <rect x="30" y="70" width="40" height="25" rx="3" />
              <rect x="75" y="65" width="40" height="25" rx="3" />
              
              {/* Selected Major pond highlighted glowing green/gold */}
              <rect 
                x="30" 
                y="110" 
                width="50" 
                height="30" 
                rx="4" 
                className="fill-emerald-500/20 stroke-emerald-400 stroke-2 animate-pulse drop-shadow-[0_0_8px_rgba(52,211,153,0.6)] cursor-pointer pointer-events-auto"
                title="重點溫室池 A-03"
                onClick={() => onSelectNode('dissolvedOxygen')}
              />
              <rect x="85" y="105" width="40" height="25" rx="3" />

              <rect x="25" y="155" width="45" height="25" rx="3" />
              <rect x="75" y="150" width="45" height="25" rx="3" />

              {/* Bottom South Area Ponds */}
              <rect x="35" y="200" width="40" height="30" rx="3" />
              <rect x="80" y="195" width="40" height="30" rx="3" />
              <rect x="125" y="190" width="40" height="30" rx="3" />
            </g>

            {/* Network connection coordinates */}
            <circle cx="55" cy="52" r="2" fill="#38bdf8" />
            <circle cx="95" cy="47" r="2" fill="#38bdf8" />
            <circle cx="55" cy="125" r="3" fill="#a855f7" />
            <circle cx="145" cy="205" r="2" fill="#3a8df8" />

            {/* Feed silo points */}
            {activeLayer === 'C' && (
              <g fill="#eab308" className="opacity-80">
                <circle cx="110" cy="50" r="5" className="animate-ping" />
                <circle cx="110" cy="50" r="3" />
                <circle cx="110" cy="120" r="3" />
                <circle cx="110" cy="210" r="3" />
              </g>
            )}

            {/* Water Pump / Drain overlays */}
            {activeLayer === 'D' && (
              <g stroke="#22c55e" strokeWidth="1" fill="none">
                <path d="M 120,40 L 95,120 M 130,220 L 95,120" className="animate-pulse" />
                <circle cx="95" cy="120" r="8" className="animate-spin-slow" />
              </g>
            )}
          </svg>
        </div>

        {/* --- DYNAMIC INTERACTIVE FLOATING BADGES ON THE MAP --- */}
        {/* DO Node Indicator */}
        <button
          onClick={() => onSelectNode('dissolvedOxygen')}
          onMouseEnter={() => setHoveredMetric('DO')}
          onMouseLeave={() => setHoveredMetric(null)}
          className="absolute top-[38%] left-[28%] z-20 cursor-pointer group pointer-events-auto"
        >
          <div className="flex items-center gap-1 px-3 py-1 bg-emerald-500/10 border-2 border-emerald-500 rounded-full text-xs font-bold text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)] group-hover:bg-emerald-500 group-hover:text-black transition-all">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
            DO
          </div>
          {/* Micro-hover label state */}
          <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-slate-900 border border-slate-700 p-1 rounded font-mono text-[9px] text-white whitespace-nowrap transition-opacity pointer-events-none ${hoveredMetric === 'DO' ? 'opacity-100' : 'opacity-0'}`}>
            溶氧: {activePond.dissolvedOxygen.toFixed(1)} mg/L
          </div>
        </button>

        {/* pH Node Indicator */}
        <button
          onClick={() => onSelectNode('pH')}
          onMouseEnter={() => setHoveredMetric('pH')}
          onMouseLeave={() => setHoveredMetric(null)}
          className="absolute top-[28%] left-[12%] z-20 cursor-pointer group pointer-events-auto"
        >
          <div className="flex items-center gap-1 px-3 py-1 bg-amber-500/10 border-2 border-[#caa45d] rounded-full text-xs font-bold text-[#caa45d] shadow-[0_0_12px_rgba(202,164,93,0.5)] group-hover:bg-[#caa45d] group-hover:text-black transition-all">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            pH
          </div>
          <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-slate-900 border border-slate-700 p-1 rounded font-mono text-[9px] text-white whitespace-nowrap transition-opacity pointer-events-none ${hoveredMetric === 'pH' ? 'opacity-100' : 'opacity-0'}`}>
            酸鹼度: {activePond.pH.toFixed(1)}
          </div>
        </button>

        {/* ORP Node Indicator */}
        <button
          onClick={() => onSelectNode('temperature')}
          onMouseEnter={() => setHoveredMetric('ORP')}
          onMouseLeave={() => setHoveredMetric(null)}
          className="absolute top-[18%] left-[45%] z-20 cursor-pointer group pointer-events-auto"
        >
          <div className="flex items-center gap-1 px-3 py-1 bg-blue-500/10 border-2 border-blue-500 rounded-full text-xs font-bold text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.5)] group-hover:bg-blue-500 group-hover:text-black transition-all">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            ORP
          </div>
          <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-slate-900 border border-slate-700 p-1 rounded font-mono text-[9px] text-white whitespace-nowrap transition-opacity pointer-events-none ${hoveredMetric === 'ORP' ? 'opacity-100' : 'opacity-0'}`}>
            氧化還原: {activePond.orp} mV
          </div>
        </button>

        {/* NH3 Node Indicator */}
        <button
          onClick={() => onSelectNode('nh3n')}
          onMouseEnter={() => setHoveredMetric('NH3')}
          onMouseLeave={() => setHoveredMetric(null)}
          className="absolute top-[50%] left-[55%] z-20 cursor-pointer group pointer-events-auto"
        >
          <div className="flex items-center gap-1 px-3 py-1 bg-fuchsia-500/10 border-2 border-fuchsia-500 rounded-full text-xs font-bold text-fuchsia-400 shadow-[0_0_12px_rgba(217,70,239,0.5)] group-hover:bg-fuchsia-500 group-hover:text-black transition-all">
            <span className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full" />
            NH3
          </div>
          <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-slate-900 border border-slate-700 p-1 rounded font-mono text-[9px] text-white whitespace-nowrap transition-opacity pointer-events-none ${hoveredMetric === 'NH3' ? 'opacity-100' : 'opacity-0'}`}>
            氨氮餘量: {activePond.nh3n.toFixed(3)} mg/L
          </div>
        </button>


        {/* 4. OVERLAY TOOLTIP BOX: "重點池區 A-03" -> "溶氧穩定，投餌量建議 +6%" */}
        <div className="absolute right-[4%] top-[45%] z-30 bg-slate-900/95 border-2 border-[#caa45d] rounded-lg p-3.5 shadow-2xl max-w-[220px] transition-all duration-300 pointer-events-auto focus-within:ring-2 focus-within:ring-[#caa45d]">
          <div className="text-[9px] text-[#caa45d] font-mono tracking-wider uppercase flex items-center gap-1 font-semibold">
            <Target className="w-3.5 h-3.5 text-[#caa45d] animate-pulse" />
            重點池區
          </div>
          <h4 className="font-black text-white text-md tracking-tight leading-tight mt-0.5">
            {activePond.id === 'pond-a' ? 'A-03 (主力優選池)' : activePond.id === 'pond-b' ? 'B-01 (特盛草蝦池)' : 'C-08 (黃金泰國池)'}
          </h4>
          <p className="text-[10px] text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/20 rounded px-2 py-0.5 mt-1.5 inline-block">
            {activePond.dissolvedOxygen >= 5.5 
              ? '溶氧穩定，投餌量建議 +6%'
              : '低氧警告，增氧機全載運轉'}
          </p>
          <div className="text-[9px] text-slate-400 mt-2 font-mono leading-relaxed border-t border-slate-800 pt-1.5">
            在養總量: {activePond.estimatedCount.toLocaleString()} 尾 <br />
            池內密度: {activePond.density} 尾/m²
          </div>
        </div>

        {/* Tiny Compass decoration bottom-left */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 font-mono text-[8.5px] text-slate-500 bg-slate-950/70 p-1 px-1.5 rounded border border-slate-800">
          <span>緯度: 22.451° N</span>
          <span>經度: 120.142° E</span>
        </div>
      </div>

      {/* 4. Bottom Switcher Bar with Letters: A | B | C | D */}
      <div>
        <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mb-2 px-1 font-medium">
          <Activity className="w-3.5 h-3.5 text-blue-400" />
          層級選取：
          <span className="text-slate-300 font-bold">{getLayerText(activeLayer)}</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {(['A', 'B', 'C', 'D'] as const).map((layer) => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`p-2 rounded-lg border flex items-center justify-center gap-1.5 sm:gap-2.5 transition-all cursor-pointer ${
                activeLayer === layer
                  ? 'bg-gradient-to-r from-slate-900 to-slate-800 border-[#caa45d] shadow-[0_0_12px_rgba(202,164,93,0.3)] text-white'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black tracking-tight shrink-0 transition-all ${
                activeLayer === layer
                  ? 'bg-[#caa45d] text-slate-950'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {layer}
              </span>
              
              <span className="text-xs font-bold leading-none tracking-tight">
                {layer === 'A' && '育成池'}
                {layer === 'B' && '水質站'}
                {layer === 'C' && '飼料倉'}
                {layer === 'D' && '排水閘'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
