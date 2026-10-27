import { motion } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, 
  CheckCircle2,
  Waves,
  Ship,
  Globe,
  ShieldCheck,
  Leaf,
  Cpu,
  Landmark
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Sector, Legend } from 'recharts';
import { marketData, detailedDonutData, opportunityData } from '../data/marketData';
import techShrimpBg from '../assets/images/tech_shrimp_bg_1781691472241.jpg';

const renderCustomLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, name, value, index } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 18;
  const x = cx + radius * Math.cos(-RADIAN * midAngle);
  const y = cy + radius * Math.sin(-RADIAN * midAngle);
  const isRight = Math.cos(-RADIAN * midAngle) >= 0;

  const colors = ["#38bdf8", "#2dd4bf", "#34d399", "#00f5d4", "#2563eb", "#60a5fa"];
  const color = colors[index % colors.length];

  return (
    <g transform={`translate(${x},${y})`} className="select-none pointer-events-none">
      {/* Outer circular badge for the shrimp icon */}
      <circle
        cx={0}
        cy={0}
        r={12}
        fill="#0b1329"
        stroke={color}
        strokeWidth={1.5}
        className="drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
      />

      {/* Vector Shrimp Icon inside outer badge */}
      <g transform="translate(-7, -7) scale(0.14)" style={{ color }}>
        <path d="M 27 36 C 5 20, 0 45, 8 40 M 27 38 C 0 30, -5 60, 10 50 M 25 40 C 5 40, 5 70, 18 60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 35 50 Q 30 65 25 70 M 42 54 Q 35 70 30 75 M 48 57 Q 40 75 35 80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 27 35 Q 12 30 15 32 Q 22 35 25 40 Z" fill="currentColor" />
        <path d="M 22 38 Q 35 25 48 37 Q 44 51 30 45 Z" fill="currentColor" />
        <path d="M 45 36 Q 60 40 65 47 Q 56 59 42 52 Z" fill="currentColor" />
        <path d="M 59 43 Q 75 52 80 63 Q 66 73 57 60 Z" fill="currentColor" />
        <path d="M 75 58 Q 88 75 80 83 Q 65 78 68 68 Z" fill="currentColor" />
        <path d="M 77 84 Q 85 96 70 96 Q 60 94 65 85 Z" fill="currentColor" />
        <circle cx="26" cy="36" r="3" fill="white" />
        <circle cx="25.5" cy="35.5" r="1.5" fill="#0f172a" />
      </g>

      {/* Item label text */}
      <text
        x={isRight ? 16 : -16}
        y={4}
        textAnchor={isRight ? 'start' : 'end'}
        fill="#ffffff"
        fontSize="10"
        fontWeight="bold"
        className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
      >
        {name} ({value}%)
      </text>
    </g>
  );
};

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g className="select-none pointer-events-none">
      {/* Primary Highlight Sector */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: 'url(#glow-chart)', outline: 'none' }}
        className="outline-none focus:outline-none"
      />
    </g>
  );
};

export default function Market() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeOpp, setActiveOpp] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    }
  };

  // Auto-play for the opportunity cards
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveOpp((prev) => (prev + 1) % opportunityData.length);
    }, 4000); // Change every 4 seconds
    return () => clearTimeout(timer);
  }, [activeOpp]);

  const onPieEnter = (_: any, index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Header */}
      <section className="py-16 bg-slate-900/10 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Title & Intro */}
            <div className="lg:col-span-5 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
                  <Waves className="w-3.5 h-3.5 animate-pulse" />
                  市場機遇與前景
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  白蝦市場需求強勁
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    供給缺口巨大
                  </span>
                </h1>
                
                <p className="text-base md:text-lg text-slate-300 leading-relaxed font-medium">
                  台灣白蝦年需求超過 <strong className="text-cyan-400 font-bold">{marketData.demand / 10000} 萬</strong>噸，市場規模約 <strong className="text-cyan-400 font-bold">{marketData.marketSize} 億</strong>元，國產自給率僅約 <strong className="text-cyan-400 font-bold">{marketData.domesticSelfSufficiency}%</strong>，<strong className="text-cyan-400 font-bold">{marketData.importDependency}%</strong> 仰賴進口。市場需求強勁，潛力無限。
                </p>
              </motion.div>
            </div>

            {/* Right Column: Stat Cards */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-4">
              
              {/* Card 1: Demand */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="border border-[#40A0E2]/40 bg-[#40A0E2]/20 backdrop-blur-xl shadow-[inset_0_0_30px_rgba(64,160,226,0.15)] rounded-2xl p-5 hover:border-cyan-500/60 hover:scale-105 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-4 transition-colors group-hover:bg-blue-500/20">
                  <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current drop-shadow-sm transition-colors object-contain" style={{ transform: 'scaleX(-1) rotate(15deg)' }}>
                    {/* Antennae */}
                    <path d="M 27 36 C 5 20, 0 45, 8 40 M 27 38 C 0 30, -5 60, 10 50 M 25 40 C 5 40, 5 70, 18 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    {/* Legs */}
                    <path d="M 35 50 Q 30 65 25 70 M 42 54 Q 35 70 30 75 M 48 57 Q 40 75 35 80 M 55 60 Q 48 78 45 82 M 62 62 Q 58 75 56 80 M 68 64 Q 65 72 65 76 M 74 62 Q 72 68 73 72" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    {/* Head */}
                    <path d="M 27 35 Q 12 30 15 32 Q 22 35 25 40 Z" fill="currentColor" />
                    {/* Body Segments (overlapping to look like continuous filled body) */}
                    <path d="M 22 38 Q 35 25 48 37 Q 44 51 30 45 Z" fill="currentColor" />
                    <path d="M 45 36 Q 60 40 65 47 Q 56 59 42 52 Z" fill="currentColor" />
                    <path d="M 59 43 Q 75 52 80 63 Q 66 73 57 60 Z" fill="currentColor" />
                    <path d="M 75 58 Q 88 75 80 83 Q 65 78 68 68 Z" fill="currentColor" />
                    {/* Tail */}
                    <path d="M 77 84 Q 85 96 70 96 Q 60 94 65 85 Z" fill="currentColor" />
                    <path d="M 80 84 Q 94 88 92 78 Q 85 75 79 79 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" />
                    <path d="M 74 81 Q 88 98 75 99 Q 62 94 65 83 Z" fill="currentColor" />
                    {/* Eye */}
                    <circle cx="26" cy="36" r="2.5" fill="white" />
                    <circle cx="25.5" cy="35.5" r="1.2" fill="#0f172a" />
                  </svg>
                </div>
                <div className="flex items-baseline gap-0.5 justify-center">
                  <span className="text-3xl font-black text-white group-hover:text-blue-300 transition-colors">{marketData.demand / 10000}</span>
                  <span className="text-lg font-bold text-slate-300">萬</span>
                </div>
                <span className="text-xs font-bold text-blue-400 mb-2">公噸 / 年</span>
                <span className="text-xs font-medium text-slate-400">台灣白蝦年需求量</span>
              </motion.div>

              {/* Card 2: Market Size */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="border border-[#40A0E2]/40 bg-[#40A0E2]/20 backdrop-blur-xl shadow-[inset_0_0_30px_rgba(64,160,226,0.15)] rounded-2xl p-5 hover:border-emerald-500/60 hover:scale-105 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4 transition-colors group-hover:bg-emerald-500/20">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="flex items-baseline gap-0.5 justify-center">
                  <span className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">{marketData.marketSize}</span>
                </div>
                <span className="text-xs font-bold text-emerald-400 mb-2">億元</span>
                <span className="text-xs font-medium text-slate-400">市場規模</span>
              </motion.div>

              {/* Card 3: Import Rate */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="border border-[#40A0E2]/40 bg-[#40A0E2]/20 backdrop-blur-xl shadow-[inset_0_0_30px_rgba(64,160,226,0.15)] rounded-2xl p-5 hover:border-cyan-400/60 hover:scale-105 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 transition-colors group-hover:bg-cyan-500/20">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="flex items-baseline gap-0.5 justify-center">
                  <span className="text-3xl font-black text-white group-hover:text-cyan-300 transition-colors">{marketData.importDependency}%</span>
                </div>
                <span className="text-xs font-bold text-cyan-400 mb-2">依賴進口</span>
                <span className="text-xs font-medium text-slate-400">國產自給率僅 {marketData.domesticSelfSufficiency}%</span>
              </motion.div>

              {/* Card 4: Self-sufficiency Rate */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="border border-[#40A0E2]/40 bg-[#40A0E2]/20 backdrop-blur-xl shadow-[inset_0_0_30px_rgba(64,160,226,0.15)] rounded-2xl p-5 hover:border-teal-400/60 hover:scale-105 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center mb-4 transition-colors group-hover:bg-teal-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="flex items-baseline gap-0.5 justify-center">
                  <span className="text-3xl font-black text-white group-hover:text-teal-300 transition-colors">{marketData.domesticSelfSufficiency}%</span>
                </div>
                <span className="text-xs font-bold text-teal-400 mb-2">國產自給率</span>
                <span className="text-xs font-medium text-slate-400">市場供給缺口巨大</span>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Segment 2: Interactive Donut and Dynamic Pond Visual Overlay */}
      <section className="py-12 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[40px] bg-[#40A0E2]/15 backdrop-blur-2xl border border-[#40A0E2]/30 p-4 sm:p-8 lg:p-14 shadow-2xl shadow-[#40A0E2]/20 flex flex-col items-center gap-6 sm:gap-8 lg:gap-12 min-h-[460px]">

          <div className="w-full z-10 flex flex-col h-full">
            
            <div 
              ref={sectionRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
              className="bg-[#40A0E2]/20 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-[#40A0E2]/40 p-4 sm:p-8 shadow-2xl shadow-[#40A0E2]/20 hover:border-[#40A0E2]/60 transition-all duration-500 h-full flex flex-col relative overflow-hidden group z-10"
            >
              
              {/* Earliest moving animated tech background */}
              <div className="absolute inset-0 overflow-hidden mix-blend-screen pointer-events-none z-0">
                <motion.div
                  className="w-[120%] h-[120%] -left-[10%] -top-[10%] absolute bg-cover bg-center opacity-25"
                  style={{ backgroundImage: `url(${techShrimpBg})` }}
                  animate={{
                    x: mousePosition.x * -60,
                    y: mousePosition.y * -60,
                    scale: 1.05,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 70,
                    damping: 20
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#40A0E2]/30 via-[#025F9E]/40 to-[#025F9E]/80 backdrop-blur-sm"></div>
              </div>

              <div className="relative z-10 flex flex-col h-full w-full">
                <h2 className="text-xl font-bold text-white mb-4 sm:mb-6 border-b border-white/80 pb-4 flex items-center gap-3 shrink-0">
                  <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.6)]"></span>
                  台灣白蝦市場供需結構
                </h2>
                
                <div className="w-full flex flex-col md:flex-row items-center justify-between md:h-[450px] relative mt-2 sm:mt-4 gap-6" onMouseLeave={() => setActiveIndex(null)}>
                  
                  <div className="w-full md:w-[50%] h-[320px] xs:h-[350px] sm:h-[400px] md:h-full relative flex-shrink-0 z-10 border border-[#40A0E2]/40 rounded-3xl bg-[#40A0E2]/20 backdrop-blur-xl shadow-[inset_0_0_30px_rgba(64,160,226,0.15)] p-2 sm:p-3 group/hud flex items-center justify-center">
                    
                    {/* HUD Corner Tech Brackets (L-shape SVG only) */}
                    <svg className="absolute top-3 left-3 w-5 h-5 text-cyan-400/80 z-20 pointer-events-none group-hover/hud:text-cyan-300 transition-colors drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]" viewBox="0 0 20 20" fill="none">
                      <path d="M0 20V0H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <svg className="absolute top-3 right-3 w-5 h-5 text-cyan-400/80 z-20 pointer-events-none group-hover/hud:text-cyan-300 transition-colors drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]" viewBox="0 0 20 20" fill="none">
                      <path d="M0 0H20V20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <svg className="absolute bottom-3 left-3 w-5 h-5 text-cyan-400/80 z-20 pointer-events-none group-hover/hud:text-cyan-300 transition-colors drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]" viewBox="0 0 20 20" fill="none">
                      <path d="M0 0V20H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <svg className="absolute bottom-3 right-3 w-5 h-5 text-cyan-400/80 z-20 pointer-events-none group-hover/hud:text-cyan-300 transition-colors drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]" viewBox="0 0 20 20" fill="none">
                      <path d="M20 0V20H0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    {/* Ambient Tech Grid Background Overlay */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0">
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.015)_1px,transparent_1px)] bg-[size:14px_14px]" />
                    </div>

                    {/* Multi-layered rotating space dials & reticle behind pie center */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                      {/* Outer dotted scale dial (Responsive perfect circle) */}
                      <div 
                        className="aspect-square h-[85%] max-h-[380px] rounded-full border border-cyan-300/70 shadow-[0_0_10px_rgba(34,211,238,0.4)] animate-[spin_25s_linear_infinite] absolute flex items-center justify-center" 
                        style={{ borderStyle: 'dashed' }}
                      >
                        <div className="absolute top-0 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                        <div className="absolute bottom-0 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                      </div>
                      {/* Secondary rotating segmented ring (Responsive perfect circle) */}
                      <div 
                        className="aspect-square h-[70%] max-h-[310px] rounded-full border border-teal-300/80 shadow-[0_0_10px_rgba(45,212,191,0.5)] animate-[spin_15s_linear_infinite_reverse] absolute flex items-center justify-center" 
                        style={{ borderStyle: 'dotted' }}
                      >
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-teal-300 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.9)]" />
                      </div>
                    </div>

                    {/* Synchronized Center Donut Data Display (only when activeIndex is not null) */}
                    {activeIndex !== null && detailedDonutData[activeIndex] && (() => {
                      const currentItem = detailedDonutData[activeIndex];
                      const isImport = currentItem.type === 'import';
                      return (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex flex-col items-center justify-center text-center w-28 sm:w-36 h-28 sm:h-36 p-1 sm:p-2 transition-all duration-300">
                          {/* Category Tag Badge */}
                          <span className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold tracking-wider border shadow-sm mb-0.5 ${
                            isImport 
                              ? 'bg-blue-900/90 text-blue-100 border-blue-400/60 shadow-[0_0_8px_rgba(59,130,246,0.3)]' 
                              : 'bg-emerald-900/90 text-emerald-100 border-emerald-400/60 shadow-[0_0_8px_rgba(52,211,153,0.3)]'
                          }`}>
                            {isImport ? '進口需求' : '國產供給'}
                          </span>

                          {/* High-Contrast Percentage Number */}
                          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none my-0.5 drop-shadow-[0_2px_10px_rgba(34,211,238,0.7)]">
                            {currentItem.value}%
                          </div>

                          {/* Data Name */}
                          <div className="text-[10px] sm:text-[11px] font-bold text-sky-100 max-w-[100px] sm:max-w-[124px] truncate leading-tight mb-0.5">
                            {currentItem.name}
                          </div>

                          {/* Volume Metric / Description */}
                          <div className="text-xs sm:text-sm font-extrabold text-cyan-200 drop-shadow-sm leading-none mt-0.5">
                            {currentItem.volume}
                          </div>
                        </div>
                      );
                    })()}
                  
                  <div className="w-full h-full aspect-square max-w-full max-h-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%" className="z-10 focus:outline-none outline-none overflow-visible" style={{ overflow: 'visible' }}>
                      <PieChart style={{ outline: 'none', overflow: 'visible' }}>
                         <defs>
                          <filter id="glow-chart" x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur stdDeviation="5" result="blur"/>
                            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                          </filter>
                          <linearGradient id="pieGrad1" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#0284c7" />
                            <stop offset="100%" stopColor="#38bdf8" />
                          </linearGradient>
                          <linearGradient id="pieGrad2" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#0f766e" />
                            <stop offset="100%" stopColor="#2dd4bf" />
                          </linearGradient>
                          <linearGradient id="pieGrad3" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#059669" />
                            <stop offset="100%" stopColor="#34d399" />
                          </linearGradient>
                          <linearGradient id="pieGrad4" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#00f5d4" />
                          </linearGradient>
                          <linearGradient id="pieGrad5" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#1e3a8a" />
                            <stop offset="100%" stopColor="#2563eb" />
                          </linearGradient>
                          <linearGradient id="pieGrad6" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#0369a1" />
                            <stop offset="100%" stopColor="#60a5fa" />
                          </linearGradient>
                        </defs>
                        <Pie
                          key="shrimp-market-pie"
                          activeIndex={activeIndex === null ? undefined : activeIndex}
                          activeShape={renderActiveShape}
                          data={detailedDonutData}
                          cx="50%"
                          cy="50%"
                          startAngle={90}
                          endAngle={-270}
                          innerRadius="46%"
                          outerRadius="66%"
                          paddingAngle={5}
                          dataKey="value"
                          onMouseEnter={onPieEnter}
                          onClick={onPieEnter}
                          style={{ outline: 'none' }}
                          isAnimationActive={false}
                          stroke="none"
                        >
                          {detailedDonutData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={`url(#pieGrad${index + 1})`} 
                              style={{ 
                                filter: index === activeIndex ? 'url(#glow-chart)' : 'none', 
                                cursor: 'pointer', 
                                transition: 'all 0.3s', 
                                outline: 'none',
                                opacity: activeIndex === null || index === activeIndex ? 1 : 0.65
                              }}
                              className="outline-none focus:outline-none"
                              onMouseEnter={() => {
                                if (activeIndex !== index) setActiveIndex(index);
                              }}
                              onClick={() => {
                                setActiveIndex(prev => prev === index ? null : index);
                              }}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Custom Extracted Legend */}
                <div className="w-full md:w-[48%] lg:w-[45%] flex flex-col justify-center z-20 pointer-events-auto h-auto md:h-full mt-4 md:mt-0">
                  <ul className="flex flex-col gap-2 sm:gap-2.5 justify-center m-0 p-0 sm:pr-2 w-full">
                    {detailedDonutData.map((entry: any, index: number) => {
                      const isActive = index === activeIndex;
                      const isImport = entry.type === 'import';
                      
                      return (
                        <li 
                          key={`custom-item-${index}`} 
                          className="flex flex-col cursor-pointer group w-full select-none"
                          onMouseEnter={() => {
                            if (activeIndex !== index) setActiveIndex(index);
                          }}
                          onClick={() => {
                            setActiveIndex(prev => prev === index ? null : index);
                          }}
                        >
                          <div 
                            className={`flex flex-col w-full transition-all duration-200 rounded-xl overflow-hidden border backdrop-blur-md ${
                              isActive 
                                ? 'bg-gradient-to-r from-sky-900/90 via-blue-900/80 to-slate-900/90 border-cyan-400/80 shadow-[0_0_16px_rgba(34,211,238,0.35)] ring-1 ring-cyan-400/50 -translate-y-0.5' 
                                : 'bg-slate-900/45 hover:bg-slate-900/70 border-white/15 hover:border-cyan-400/40 hover:shadow-md'
                            }`}
                          >
                            {/* Main Row */}
                            <div className="flex items-center justify-between gap-2 px-3 py-2 sm:py-2.5 min-h-[44px]">
                              {/* Left: Color Bar + Tag + Name */}
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                {/* Color Dot/Bar Indicator (Visible on all screen sizes) */}
                                <span 
                                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-125"
                                  style={{ backgroundColor: entry.color, boxShadow: isActive ? `0 0 8px ${entry.color}` : 'none' }}
                                />

                                {/* Category Tag */}
                                <span 
                                  className={`px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold shrink-0 border ${
                                    isImport 
                                      ? 'bg-blue-950/80 text-blue-200 border-blue-400/40' 
                                      : 'bg-emerald-950/80 text-emerald-200 border-emerald-400/40'
                                  }`}
                                >
                                  {isImport ? '進口' : '國產'}
                                </span>

                                {/* Item Name */}
                                <span className="text-white font-bold text-xs sm:text-sm tracking-wide truncate">
                                  {entry.name}
                                </span>
                              </div>

                              {/* Right: Percentage Metric (Always accessible) */}
                              <div className="flex items-center gap-1.5 shrink-0 pl-1">
                                <span className={`text-xs sm:text-sm font-black tracking-tight ${
                                  isActive ? 'text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]' : 'text-slate-200'
                                }`}>
                                  {entry.value}%
                                </span>
                              </div>
                            </div>

                            {/* Expanded Details when active / clicked */}
                            <div 
                              className={`transition-all duration-300 overflow-hidden ${
                                isActive ? 'max-h-20 opacity-100 pb-2.5 px-3' : 'max-h-0 opacity-0 px-3'
                              }`}
                            >
                              <div className="text-xs pt-1.5 border-t border-white/20 flex items-center justify-between">
                                <span className="text-[11px] text-cyan-200/90 font-medium">預估市場份額</span>
                                <span className="text-white font-bold text-xs sm:text-sm tracking-wide drop-shadow-sm flex items-center gap-1">
                                  <span>年產銷量：</span>
                                  <span className="text-cyan-300 font-extrabold">{entry.volume}</span>
                                </span>
                              </div>
                            </div>

                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              
              <div className="text-right text-[10px] text-[#FFFFFF] mt-4 leading-none shrink-0">
                資料來源：2024年農業部漁業署《漁業統計年報》最新資料、工研院產業研究報告
              </div>
            </div></div>

          </div>

          <motion.div 
            className="w-full max-w-full rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden relative border border-slate-700/60 sm:border-2 sm:border-slate-700/50 group shrink-0 cursor-pointer shadow-xl"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.img 
              src="/最佳時間.png.png" 
              alt="為什麼現在是最好時機" 
              className="w-full h-auto max-w-full block object-contain select-none"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-blue-900/20 pointer-events-none transition-all duration-500 group-hover:bg-blue-900/0 group-hover:shadow-[inset_0_0_50px_rgba(34,211,238,0.2)]"></div>
          </motion.div>

        </div>
      </section>

      {/* Section 3: Opportunity cards (Interactive Smart Graph) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16 pb-24">
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl lg:text-3xl font-bold text-white mb-3"
          >
            五大產業關鍵發展機遇
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-cyan-400 font-medium"
          >
            點擊探索智慧養蝦的未來趨勢
          </motion.p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4 h-[850px] sm:h-[950px] lg:h-[450px]">
          {opportunityData.map((item, index) => {
            const isActive = activeOpp === index;
            const Icon = index === 0 ? Leaf : index === 1 ? ShieldCheck : index === 2 ? Cpu : index === 3 ? Landmark : TrendingUp;
            
            // Dynamic styling configuration per item to match their theme slightly
            const themeColors = [
              { bg: 'bg-emerald-500/20', solidBg: 'bg-emerald-500', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]', activeBg: 'from-emerald-950/80 to-slate-900', activeBorder: 'border-emerald-500/50' },
              { bg: 'bg-blue-500/20', solidBg: 'bg-blue-500', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]', activeBg: 'from-blue-950/80 to-slate-900', activeBorder: 'border-blue-500/50' },
              { bg: 'bg-indigo-500/20', solidBg: 'bg-indigo-500', border: 'border-indigo-500/30', text: 'text-indigo-400', glow: 'shadow-[0_0_30px_rgba(99,102,241,0.3)]', activeBg: 'from-indigo-950/80 to-slate-900', activeBorder: 'border-indigo-500/50' },
              { bg: 'bg-cyan-500/20', solidBg: 'bg-cyan-500', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'shadow-[0_0_30px_rgba(6,182,212,0.3)]', activeBg: 'from-cyan-950/80 to-slate-900', activeBorder: 'border-cyan-500/50' },
              { bg: 'bg-sky-500/20', solidBg: 'bg-sky-500', border: 'border-sky-500/30', text: 'text-sky-400', glow: 'shadow-[0_0_30px_rgba(14,165,233,0.3)]', activeBg: 'from-sky-950/80 to-slate-900', activeBorder: 'border-sky-500/50' },
            ];

            const theme = themeColors[index];

            return (
              <motion.div
                key={index}
                layout
                onClick={() => setActiveOpp(index)}
                className={`cursor-pointer rounded-[32px] overflow-hidden relative flex flex-col 
                  ${isActive ? `lg:flex-[3] flex-[3] bg-gradient-to-br ${theme.activeBg} border ${theme.activeBorder} ${theme.glow}` : 'lg:flex-[1] flex-[1] bg-slate-900/40 border border-slate-700/50 hover:bg-slate-800/60'}`}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Tech Background element for active state */}
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                  >
                    <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-white/5 to-transparent rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
                    <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </motion.div>
                )}
                
                {/* Content Container */}
                <div className={`p-4 sm:p-6 lg:p-8 flex ${isActive ? 'flex-col justify-center h-full relative z-10' : 'flex-row lg:flex-col items-center justify-start lg:justify-center h-full gap-4 relative z-10'}`}>
                  
                  {/* Icon */}
                  <motion.div 
                    layout
                    className={`shrink-0 rounded-2xl flex items-center justify-center transition-transform duration-300
                      ${isActive ? 'w-16 h-16 sm:w-20 sm:h-20 mb-4 lg:mb-8' : 'w-12 h-12 group-hover:scale-110'}
                      ${theme.bg} ${theme.border} ${theme.text} border`}
                  >
                    <Icon className={isActive ? 'w-8 h-8 sm:w-10 sm:h-10' : 'w-6 h-6'} />
                  </motion.div>
                  
                  {/* Text Details */}
                  <motion.div layout className={`flex flex-col ${isActive ? 'items-start text-left' : 'items-center text-left lg:text-center w-full'}`}>
                    <motion.h3 
                      layout
                      className={`font-bold transition-colors duration-300 w-full
                        ${isActive ? 'text-2xl sm:text-3xl lg:text-4xl text-white' : 'text-sm sm:text-base text-slate-300 hover:text-white'}`}
                    >
                      {item.title}
                    </motion.h3>

                    {/* Decorative smart line for all items */}
                    <motion.div 
                      layout
                      className={`flex items-center w-full ${isActive ? 'mt-4 gap-2 justify-start' : 'mt-2 gap-1.5 justify-start lg:justify-center'}`}
                    >
                      <div className={`h-[2px] transition-all duration-300 ${isActive ? 'w-12' : 'w-6'} ${theme.solidBg}`}></div>
                      <div className={`rounded-full transition-all duration-300 ${isActive ? 'w-2 h-2' : 'w-1.5 h-1.5'} ${theme.solidBg}`}></div>
                    </motion.div>
                    
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg mt-4">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
