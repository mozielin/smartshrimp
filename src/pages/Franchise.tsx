import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, FileSignature, Cpu, Leaf, DollarSign, Handshake, Shield, Users, BarChart3, Building2, Target, TrendingUp } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import bobaImg from '../assets/images/regenerated_image_1781854377110.png';
import laundryImg from '../assets/images/regenerated_image_1781854380488.png';
import hotpotImg from '../assets/images/regenerated_image_1781854383618.png';
import smartShrimpImg from '../assets/images/regenerated_image_1781854386796.png';

export default function Franchise() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-12 pb-7 sm:pt-14 sm:pb-8 bg-transparent border-b border-white/10 text-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tight leading-tight">
            認識智養蝦契作
          </h1>
          <p className="text-base sm:text-xl font-medium text-slate-200 max-w-3xl mx-auto mb-1 leading-relaxed">
            不是從零開始養殖，而是加入一套成熟的智慧養殖合作體系
          </p>
          <div className="flex justify-center items-center mt-5">
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base md:text-lg tracking-wide rounded-full px-6 sm:px-8 py-2.5 sm:py-3 flex items-center gap-2.5 shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-300 relative group cursor-pointer"
              onClick={() => {
                navigate('/contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="absolute inset-0 bg-white/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">預約契作說明會</span> 
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 認識智養蝦契作 */}
      {/* ========================================================================= */}
      <div id="about-section" className="relative">
        {/* 02 | 什麼是契作？ */}
        <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-transparent relative">
          <div className="max-w-[1220px] mx-auto">
            {/* Title */}
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-9">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
                契作，其實就是「依約合作生產」
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed font-medium">
                雙方事先約定合作條件，再依契約進行生產、銷售與成果結算的一種合作模式。
              </p>
            </div>

            {/* 4 Steps Flow */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <div className="relative flex flex-col items-center text-center p-6 sm:p-7 md:p-8 rounded-3xl bg-[#023E68]/70 border-2 border-cyan-500/30 hover:border-cyan-400/80 transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] backdrop-blur-md">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-500/15 border-2 border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-4 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                  <FileSignature className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <span className="text-xs sm:text-sm md:text-base font-extrabold text-cyan-400 tracking-wider mb-2">STEP 01</span>
                <span className="text-lg sm:text-xl md:text-2xl font-black text-white">約定合作條件</span>
                <div className="flex absolute left-full top-1/2 -translate-y-1/2 w-4 sm:w-6 items-center justify-center z-20 pointer-events-none">
                  <div className="flex items-center -space-x-1.5 text-cyan-300">
                    <ChevronRight className="w-4 h-4 text-cyan-400/35" strokeWidth={2.2} />
                    <ChevronRight className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col items-center text-center p-6 sm:p-7 md:p-8 rounded-3xl bg-[#023E68]/70 border-2 border-cyan-500/30 hover:border-cyan-400/80 transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] backdrop-blur-md">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-500/15 border-2 border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-4 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                  <Cpu className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <span className="text-xs sm:text-sm md:text-base font-extrabold text-cyan-400 tracking-wider mb-2">STEP 02</span>
                <span className="text-lg sm:text-xl md:text-2xl font-black text-white">執行養殖計畫</span>
                <div className="hidden md:flex absolute left-full top-1/2 -translate-y-1/2 w-4 sm:w-6 items-center justify-center z-20 pointer-events-none">
                  <div className="flex items-center -space-x-1.5 text-cyan-300">
                    <ChevronRight className="w-4 h-4 text-cyan-400/35" strokeWidth={2.2} />
                    <ChevronRight className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col items-center text-center p-6 sm:p-7 md:p-8 rounded-3xl bg-[#023E68]/70 border-2 border-cyan-500/30 hover:border-cyan-400/80 transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] backdrop-blur-md">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-500/15 border-2 border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-4 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                  <Leaf className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <span className="text-xs sm:text-sm md:text-base font-extrabold text-cyan-400 tracking-wider mb-2">STEP 03</span>
                <span className="text-lg sm:text-xl md:text-2xl font-black text-white">收成與銷售</span>
                <div className="flex absolute left-full top-1/2 -translate-y-1/2 w-4 sm:w-6 items-center justify-center z-20 pointer-events-none">
                  <div className="flex items-center -space-x-1.5 text-cyan-300">
                    <ChevronRight className="w-4 h-4 text-cyan-400/35" strokeWidth={2.2} />
                    <ChevronRight className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col items-center text-center p-6 sm:p-7 md:p-8 rounded-3xl bg-[#023E68]/70 border-2 border-cyan-500/30 hover:border-cyan-400/80 transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] backdrop-blur-md">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-500/15 border-2 border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-4 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                  <DollarSign className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <span className="text-xs sm:text-sm md:text-base font-extrabold text-cyan-400 tracking-wider mb-2">STEP 04</span>
                <span className="text-lg sm:text-xl md:text-2xl font-black text-white">成果結算</span>
              </div>
            </div>

            {/* Feature Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#023E68]/75 border-2 border-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.18)] backdrop-blur-md">
              <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0 shadow-sm">
                  <Handshake className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl md:text-2.5xl font-black text-white mb-2">
                    智養蝦的養殖契作
                  </h3>
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                    由智養蝦提供養殖技術、標準化管理及營運體系，合作方依約參與養殖計畫，並依實際養殖及銷售成果完成結算。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 從技術到收成，一套完整的養殖協作機制 */}
        <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-transparent relative overflow-hidden">
          <div className="max-w-[1220px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <h2 className="text-2.5xl sm:text-3.5xl md:text-4xl font-black text-white tracking-tight">
                從技術到收成，一套完整的養殖協作機制
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {/* 1. 智慧養殖技術 */}
              <div className="flex flex-col justify-between min-h-[220px] sm:min-h-[240px] p-6 sm:p-7 md:p-8 rounded-3xl bg-[#023E68]/70 border-2 border-cyan-500/30 hover:border-cyan-400/80 transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(6,182,212,0.2)] group backdrop-blur-md">
                <div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/15 border-2 border-cyan-500/40 flex items-center justify-center text-cyan-300 mb-5 shadow-[0_0_16px_rgba(34,211,238,0.18)] group-hover:scale-110 transition-transform">
                    <Cpu className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                    智慧養殖技術
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                  AIoT 系統與養殖設備整合
                </p>
              </div>

              {/* 2. 標準化管理 */}
              <div className="flex flex-col justify-between min-h-[220px] sm:min-h-[240px] p-6 sm:p-7 md:p-8 rounded-3xl bg-[#023E68]/70 border-2 border-cyan-500/30 hover:border-cyan-400/80 transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(6,182,212,0.2)] group backdrop-blur-md">
                <div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/15 border-2 border-cyan-500/40 flex items-center justify-center text-cyan-300 mb-5 shadow-[0_0_16px_rgba(34,211,238,0.18)] group-hover:scale-110 transition-transform">
                    <Shield className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                    標準化管理
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                  依既定流程執行日常養殖與異常管理
                </p>
              </div>

              {/* 3. 專業養殖管理 */}
              <div className="flex flex-col justify-between min-h-[220px] sm:min-h-[240px] p-6 sm:p-7 md:p-8 rounded-3xl bg-[#023E68]/70 border-2 border-cyan-500/30 hover:border-cyan-400/80 transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(6,182,212,0.2)] group backdrop-blur-md">
                <div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/15 border-2 border-cyan-500/40 flex items-center justify-center text-cyan-300 mb-5 shadow-[0_0_16px_rgba(34,211,238,0.18)] group-hover:scale-110 transition-transform">
                    <Users className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                    專業養殖管理
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                  由專業團隊負責日常養殖與場域管理
                </p>
              </div>

              {/* 4. 產銷結算 */}
              <div className="flex flex-col justify-between min-h-[220px] sm:min-h-[240px] p-6 sm:p-7 md:p-8 rounded-3xl bg-[#023E68]/70 border-2 border-cyan-500/30 hover:border-cyan-400/80 transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(6,182,212,0.2)] group backdrop-blur-md">
                <div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/15 border-2 border-cyan-500/40 flex items-center justify-center text-cyan-300 mb-5 shadow-[0_0_16px_rgba(34,211,238,0.18)] group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                    產銷結算
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                  依實際養殖與銷售成果，按契約約定辦理結算
                </p>
              </div>
            </div>
          </div>
        </section>
              {/* Comparison Matrix */}
      <section className="py-12 sm:py-14 bg-transparent border-b border-white/10 relative overflow-visible">
        {/* Decorative Grid Line Patterns of tech/AI theme */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-black text-center text-white mb-3 sm:mb-4 tracking-tight px-2 leading-tight">
            為什麼選擇智養蝦契作？
          </h2>
          <p className="text-center text-slate-200 text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-6 sm:mb-8 px-4 leading-relaxed font-medium">
            從店租、市場競爭、經營效益到退場彈性，看見智慧養殖與傳統實體店面的不同。
          </p>

          {/* Golden Slogan skew banner right above the comparison cards */}
          <div className="flex justify-center mb-6 sm:mb-9 px-2">
            <div className="transform -skew-x-6 sm:-skew-x-12 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 px-6 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-4.5 rounded-xl shadow-[0_10px_35px_rgba(245,158,11,0.45)] flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-black text-sm sm:text-base md:text-lg lg:text-xl tracking-wider uppercase border-2 border-amber-300 max-w-full">
              <span className="transform skew-x-6 sm:skew-x-12 text-slate-900 whitespace-nowrap">無店面租金</span>
              <span className="transform skew-x-6 sm:skew-x-12 text-slate-950/60 font-black select-none px-0.5">｜</span>
              <span className="transform skew-x-6 sm:skew-x-12 text-slate-900 whitespace-nowrap">智慧化管理</span>
              <span className="transform skew-x-6 sm:skew-x-12 text-slate-950/60 font-black select-none px-0.5">｜</span>
              <span className="transform skew-x-6 sm:skew-x-12 text-slate-900 whitespace-nowrap">市場差異化</span>
              <span className="transform skew-x-6 sm:skew-x-12 text-slate-950/60 font-black select-none px-0.5">｜</span>
              <span className="transform skew-x-6 sm:skew-x-12 text-slate-900 whitespace-nowrap">具契約退場機制</span>
            </div>
          </div>

          <div className="overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-slate-700">
            <div className="grid grid-cols-[1.1fr_1.1fr_1.1fr_1.1fr_1.35fr] gap-3 min-w-[1080px] lg:min-w-full px-2 relative pt-20 pb-4">
              
              {/* Column 1: Labels (評估項目) */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                whileHover={{ y: -6, scale: 1.01, transition: { type: "spring", stiffness: 350, damping: 25 } }}
                className="flex flex-col bg-[#023E68]/85 border-2 border-cyan-500/30 rounded-2xl p-1 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all duration-300 backdrop-blur-md relative overflow-hidden group"
              >
                {/* Elegant glow sheen highlight sweep */}
                <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-[1200ms] ease-out pointer-events-none z-30" />

                {/* Header */}
                <div className="h-44 bg-[#025F9E]/70 text-white rounded-t-2xl flex flex-col items-center justify-center text-center p-4 border-b-[0.5px] border-cyan-500/30 font-black text-lg tracking-wider">
                   評估項目
                </div>
                {/* Row 1 */}
                <div className="h-[100px] border-b-[0.5px] border-white/10 flex items-center justify-center gap-3 text-slate-200 font-bold text-sm tracking-wide">
                  <span className="p-2 bg-[#025F9E]/50 rounded-lg text-slate-200 flex items-center justify-center shadow-inner">
                    <Building2 className="w-5 h-5 text-cyan-300" />
                  </span> 
                  店租壓力
                </div>
                {/* Row 2 */}
                <div className="h-[100px] border-b-[0.5px] border-white/10 flex items-center justify-center gap-3 text-slate-200 font-bold text-sm tracking-wide">
                  <span className="p-2 bg-[#025F9E]/50 rounded-lg text-slate-200 flex items-center justify-center shadow-inner">
                    <Target className="w-5 h-5 text-cyan-300" />
                  </span> 
                  競爭紅海
                </div>
                {/* Row 3 */}
                <div className="h-[120px] border-b-[0.5px] border-white/10 flex items-center justify-center gap-3 text-slate-200 font-bold text-sm tracking-wide">
                  <span className="p-2 bg-[#025F9E]/50 rounded-lg text-slate-200 flex items-center justify-center shadow-inner">
                    <TrendingUp className="w-5 h-5 text-cyan-300" />
                  </span> 
                  經營效益
                </div>
                {/* Row 4 */}
                <div className="h-[230px] flex items-center justify-center gap-3 text-slate-200 font-bold text-sm tracking-wide rounded-b-2xl">
                  <span className="p-2 bg-[#025F9E]/50 rounded-lg text-slate-200 flex items-center justify-center shadow-inner">
                    <FileSignature className="w-5 h-5 text-cyan-300" />
                  </span> 
                  實體店面退場
                </div>
              </motion.div>


              {/* Column 2: 手搖飲 */}
              <motion.div 
                id="franchise-matrix-boba-card" 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
                whileHover={{ y: -8, scale: 1.015, transition: { type: "spring", stiffness: 350, damping: 25 } }}
                className="flex flex-col bg-[#023E68]/80 border-2 border-red-500/40 rounded-2xl shadow-[0_0_20px_rgba(220,38,38,0.15)] overflow-hidden hover:border-red-500/70 hover:shadow-[0_0_25px_rgba(239,68,68,0.3)] transition-all duration-300 group relative backdrop-blur-md"
              >
                {/* Elegant glow sheen highlight sweep */}
                <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-[1200ms] ease-out pointer-events-none z-30" />

                {/* Header */}
                <div className="h-44 flex flex-col">
                  <div className="h-12 bg-red-950/60 text-red-300 flex items-center justify-center font-black text-lg tracking-wider border-b-[0.5px] border-white/10 shadow-inner">
                    手搖飲
                  </div>
                  <div className="h-32 bg-[#022b49]/60 overflow-hidden relative flex items-center justify-center border-b-[0.5px] border-white/10">
                    <img 
                      id="franchise-matrix-boba-img"
                      src={bobaImg} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out font-medium drop-shadow-md" 
                      referrerPolicy="no-referrer"
                      alt="手搖飲" 
                    />
                  </div>
                </div>
                {/* Row 1 */}
                <div className="h-[100px] border-b-[0.5px] border-white/10 flex flex-col items-center justify-center text-center p-3 bg-black/25">
                  <div className="font-extrabold text-slate-100 text-base sm:text-lg">約 10 萬</div>
                </div>
                {/* Row 2 */}
                <div className="h-[100px] border-b-[0.5px] border-white/10 flex flex-col items-center justify-center text-center p-3 bg-black/15">
                  <div className="font-extrabold text-slate-100 text-base sm:text-lg">飽和度極高</div>
                </div>
                {/* Row 3 */}
                <div className="h-[120px] border-b-[0.5px] border-white/10 flex flex-col items-center justify-center text-center p-4 bg-black/25">
                  <div className="text-slate-100 font-extrabold text-base sm:text-lg leading-snug">
                    裝潢折舊極快<br/>
                    <span className="text-xs text-slate-300 font-medium mt-1 block">退場殘值低</span>
                  </div>
                </div>
                {/* Row 4 */}
                <div className="h-[230px] flex flex-col items-center justify-start text-center p-4 pt-7 rounded-b-2xl bg-gradient-to-b from-black/25 to-black/40 border-t-[0.5px] border-white/10 relative">
                  <div className="font-extrabold text-red-400 text-base sm:text-lg mb-1.5 flex items-center justify-center gap-1">
                    損失約 120 萬
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed font-normal max-w-[160px] mx-auto text-left">
                    店面租約提早終止賠押金，吧台與招牌裝潢變廢鐵再自付拆除費
                  </div>
                </div>
              </motion.div>


              {/* Column 3: 自助洗衣連鎖 */}
              <motion.div 
                id="franchise-matrix-laundry-card" 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                whileHover={{ y: -8, scale: 1.015, transition: { type: "spring", stiffness: 350, damping: 25 } }}
                className="flex flex-col bg-[#023E68]/80 border-2 border-blue-400/40 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.15)] overflow-hidden hover:border-blue-400/70 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all duration-300 group relative backdrop-blur-md"
              >
                {/* Elegant glow sheen highlight sweep */}
                <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-[1200ms] ease-out pointer-events-none z-30" />

                {/* Header */}
                <div className="h-44 flex flex-col">
                  <div className="h-12 bg-blue-950/60 text-blue-400 flex items-center justify-center font-black text-lg tracking-wider border-b-[0.5px] border-white/10 shadow-inner">
                    自助洗衣連鎖
                  </div>
                  <div className="h-32 bg-[#022b49]/60 overflow-hidden relative flex items-center justify-center border-b-[0.5px] border-white/10">
                    <img 
                      id="franchise-matrix-laundry-img"
                      src={laundryImg} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out font-medium drop-shadow-md" 
                      referrerPolicy="no-referrer"
                      alt="自助洗衣連鎖" 
                    />
                  </div>
                </div>
                {/* Row 1 */}
                <div className="h-[100px] border-b-[0.5px] border-white/10 flex flex-col items-center justify-center text-center p-3 bg-black/25">
                  <div className="font-extrabold text-slate-100 text-base sm:text-lg">約 8 萬</div>
                </div>
                {/* Row 2 */}
                <div className="h-[100px] border-b-[0.5px] border-white/10 flex flex-col items-center justify-center text-center p-3 bg-black/15">
                  <div className="font-extrabold text-slate-100 text-base sm:text-lg">近鄰同質性競爭高</div>
                </div>
                {/* Row 3 */}
                <div className="h-[120px] border-b-[0.5px] border-white/10 flex flex-col items-center justify-center text-center p-4 bg-black/25">
                  <div className="text-slate-100 font-extrabold text-base sm:text-lg leading-snug">
                    硬體折舊高<br/>
                    <span className="text-xs text-slate-300 font-medium mt-1 block">回收慢</span>
                  </div>
                </div>
                {/* Row 4 */}
                <div className="h-[230px] flex flex-col items-center justify-start text-center p-4 pt-7 rounded-b-2xl bg-gradient-to-b from-black/25 to-black/40 border-t-[0.5px] border-white/10 relative">
                  <div className="font-extrabold text-red-400 text-base sm:text-lg mb-1.5 flex items-center justify-center gap-1">
                    損失約 150 萬
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed font-normal max-w-[160px] mx-auto text-left">
                    長期租約空租賠償，重型鋼筋水泥基座與瓦斯管線拆除工程費
                  </div>
                </div>
              </motion.div>


              {/* Column 4: 火鍋餐飲店 */}
              <motion.div 
                id="franchise-matrix-hotpot-card" 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
                whileHover={{ y: -8, scale: 1.015, transition: { type: "spring", stiffness: 350, damping: 25 } }}
                className="flex flex-col bg-[#023E68]/80 border-2 border-amber-400/40 rounded-2xl shadow-[0_0_20px_rgba(217,119,6,0.15)] overflow-hidden hover:border-amber-400/70 hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all duration-300 group relative backdrop-blur-md"
              >
                {/* Elegant glow sheen highlight sweep */}
                <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-[1200ms] ease-out pointer-events-none z-30" />

                {/* Header */}
                <div className="h-44 flex flex-col">
                  <div className="h-12 bg-amber-950/60 text-amber-400 flex items-center justify-center font-black text-lg tracking-wider border-b-[0.5px] border-white/10 shadow-inner">
                    火鍋餐飲店
                  </div>
                  <div className="h-32 bg-[#022b49]/60 overflow-hidden relative flex items-center justify-center border-b-[0.5px] border-white/10">
                    <img 
                      id="franchise-matrix-hotpot-img"
                      src={hotpotImg} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out font-medium drop-shadow-md" 
                      referrerPolicy="no-referrer"
                      alt="火鍋餐飲店" 
                    />
                  </div>
                </div>
                {/* Row 1 */}
                <div className="h-[100px] border-b-[0.5px] border-white/10 flex flex-col items-center justify-center text-center p-3 bg-black/25">
                  <div className="font-extrabold text-slate-100 text-base sm:text-lg">約 25 萬</div>
                </div>
                {/* Row 2 */}
                <div className="h-[100px] border-b-[0.5px] border-white/10 flex flex-col items-center justify-center text-center p-3 bg-black/15">
                  <div className="font-extrabold text-slate-100 text-base sm:text-lg">競爭極度激烈</div>
                </div>
                {/* Row 3 */}
                <div className="h-[120px] border-b-[0.5px] border-white/10 flex flex-col items-center justify-center text-center p-4 bg-black/25">
                  <div className="text-slate-100 font-extrabold text-base sm:text-lg leading-snug">
                    前期投入高<br/>
                    <span className="text-xs text-slate-300 font-medium mt-1 block">回收期長</span>
                  </div>
                </div>
                {/* Row 4 */}
                <div className="h-[230px] flex flex-col items-center justify-start text-center p-4 pt-7 rounded-b-2xl bg-gradient-to-b from-black/25 to-black/40 border-t-[0.5px] border-white/10 relative">
                  <div className="font-extrabold text-red-400 text-base sm:text-lg mb-1.5 flex items-center justify-center gap-1">
                    損失約 250 萬
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed font-normal max-w-[160px] mx-auto text-left">
                    高額高總價押金泡湯，大型截油槽、排煙管挖地還原拆除費
                  </div>
                </div>
              </motion.div>


              {/* Column 5: 智養蝦 ・ 科技養殖 (THE WINNER) */}
              <motion.div 
                id="franchise-matrix-smartshrimp-card" 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
                whileHover={{ y: -10, scale: 1.02, transition: { type: "spring", stiffness: 350, damping: 22 } }}
                className="relative flex flex-col bg-gradient-to-b from-[#023E68]/95 via-[#025F9E]/90 to-[#022b49]/95 border-2 border-cyan-400 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition-all duration-300 group z-20 backdrop-blur-md"
              >
                {/* Elegant glow sheen highlight sweep */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-30">
                  <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-[1200ms] ease-out" />
                </div>
                
                {/* Floating Gold Crown Sticker over top center */}
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-30 select-none animate-bounce" style={{ animationDuration: '3s' }}>
                  <svg className="w-14 h-14 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.85)]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="cyberGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFF3B0" />
                        <stop offset="40%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#D97706" />
                      </linearGradient>
                      <linearGradient id="neonCyan" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22D3EE" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                    {/* Sharp tech crown geometry with clean golden/neon wireframe outline */}
                    <path d="M8 16L14 36H34L40 16L29 24L24 10L19 24L8 16Z" fill="none" stroke="url(#cyberGold)" strokeWidth="2.5" strokeLinejoin="round" />
                    {/* Cybercircuit detail overlay inside the crown */}
                    <path d="M14 36L24 24L34 36" stroke="url(#neonCyan)" strokeWidth="1.5" strokeLinejoin="round" opacity="0.8" />
                    <line x1="24" y1="10" x2="24" y2="24" stroke="url(#neonCyan)" strokeWidth="1.5" opacity="0.8" />
                    {/* Sparkling nodes on vertices */}
                    <circle cx="8" cy="16" r="3" fill="#FFF" stroke="#F59E0B" strokeWidth="1.5" />
                    <circle cx="24" cy="10" r="3.5" fill="#FFF" stroke="#F59E0B" strokeWidth="2" />
                    <circle cx="40" cy="16" r="3" fill="#FFF" stroke="#F59E0B" strokeWidth="1.5" />
                    <circle cx="24" cy="24" r="2.5" fill="#22D3EE" />
                  </svg>
                </div>

                {/* Header with double text labels */}
                <div className="h-44 flex flex-col rounded-t-2xl overflow-hidden border-b-[0.5px] border-cyan-500/20">
                  <div className="h-12 bg-gradient-to-r from-cyan-950 via-cyan-900 to-indigo-950 text-cyan-300 flex flex-col items-center justify-center text-center px-1">
                    <div className="font-black text-base sm:text-lg tracking-wider text-cyan-300 flex items-center gap-1 whitespace-nowrap">
                      智養蝦 ・ 科技養殖
                    </div>
                    <div className="text-xs text-emerald-400 font-extrabold tracking-widest animate-pulse">
                      (AI系統全自動化管理)
                    </div>
                  </div>
                  <div className="h-32 bg-gradient-to-br from-[#0c1f36] to-[#040e1a] overflow-hidden relative flex items-center justify-center border-b-[0.5px] border-cyan-500/15">
                    <img 
                      id="franchise-matrix-smartshrimp-img"
                      src={smartShrimpImg} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter drop-shadow-[0_4px_12px_rgba(6,182,212,0.45)]" 
                      referrerPolicy="no-referrer"
                      alt="智養蝦" 
                    />
                  </div>
                </div>

                {/* Row 1 with Seal Stamp */}
                <div className="h-[100px] border-b-[0.5px] border-cyan-500/15 flex flex-col items-center justify-center text-center p-3 relative bg-[#023E68]/50 pb-4">
                  <div className="font-black text-emerald-400 text-base sm:text-lg">
                    極低
                  </div>
                  <div className="text-xs text-slate-200 font-medium leading-snug mt-1 whitespace-nowrap mx-auto text-center">
                    閒置農地、廠房皆可轉型
                  </div>
                  <div className="absolute right-1 top-1 transform rotate-12 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-white via-slate-50 to-slate-100 border-2 border-red-500/90 text-red-600 font-black text-xs shadow-[0_0_10px_rgba(239,68,68,0.4),_inset_0_0_4px_rgba(239,68,68,0.2)] hover:-translate-y-0.5 hover:scale-110 active:scale-95 transition-all duration-300 z-10 select-none">
                    勝
                  </div>
                </div>

                {/* Row 2 with Seal Stamp */}
                <div className="h-[100px] border-b-[0.5px] border-cyan-500/15 flex flex-col items-center justify-center text-center p-3 relative bg-[#023E68]/30 pb-4">
                  <div className="font-black text-emerald-400 text-base sm:text-lg">
                    低
                  </div>
                  <div className="text-xs text-slate-200 font-medium leading-snug mt-1 max-w-[160px] mx-auto text-center">
                    市場少見，藍海優勢
                  </div>
                  {/* Win Badge Stamp */}
                  <div className="absolute right-1 top-1 transform rotate-12 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-white via-slate-50 to-slate-100 border-2 border-red-500/90 text-red-600 font-black text-xs shadow-[0_0_10px_rgba(239,68,68,0.4),_inset_0_0_4px_rgba(239,68,68,0.2)] hover:-translate-y-0.5 hover:scale-110 active:scale-95 transition-all duration-300 z-10 select-none">
                    勝
                  </div>
                </div>

                {/* Row 3 with Seal Stamp */}
                <div className="h-[120px] border-b-[0.5px] border-cyan-500/15 flex flex-col items-center justify-center text-center p-4 relative bg-[#023E68]/50">
                  <div className="font-black text-emerald-400 text-base sm:text-lg">
                    優
                  </div>
                  <div className="text-xs text-slate-200 font-medium leading-snug mt-1 whitespace-nowrap mx-auto text-center">
                    抗風險、符合ESG綠色農業
                  </div>
                  {/* Win Badge Stamp */}
                  <div className="absolute right-1 top-1 transform rotate-12 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-white via-slate-50 to-slate-100 border-2 border-red-500/90 text-red-600 font-black text-xs shadow-[0_0_10px_rgba(239,68,68,0.4),_inset_0_0_4px_rgba(239,68,68,0.2)] hover:-translate-y-0.5 hover:scale-110 active:scale-95 transition-all duration-300 z-10 select-none">
                    勝
                  </div>
                </div>

                {/* Row 4 with Seal Stamp and full explanation */}
                <div className="h-[230px] flex flex-col items-center justify-start text-center p-4 pt-7 rounded-b-2xl bg-gradient-to-b from-[#023E68]/60 to-[#022b49]/80 relative border-t-[0.5px] border-cyan-500/15">
                  <div className="font-extrabold text-[#10B981] text-base sm:text-lg mb-1.5 flex items-center justify-center gap-1 whitespace-nowrap">
                    損失趨近於 0 元
                  </div>
                  <div className="text-xs text-slate-200 leading-relaxed font-normal max-w-[160px] mx-auto text-left">
                    無實體店面、無租金、無裝潢還原黑洞。退場機制為：申請 90 天後由總部依市價買回硬體設備，或由總部協助尋求第三方轉讓承接。
                  </div>
                  {/* Win Badge Stamp */}
                  <div className="absolute right-1 top-1 transform rotate-12 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-white via-slate-50 to-slate-100 border-2 border-red-500/90 text-red-600 font-black text-xs shadow-[0_0_10px_rgba(239,68,68,0.4),_inset_0_0_4px_rgba(239,68,68,0.2)] hover:-translate-y-0.5 hover:scale-110 active:scale-95 transition-all duration-300 z-10 select-none">
                    勝
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 bg-transparent border-t border-white/10 px-4 relative overflow-hidden">
          <div className="max-w-[1240px] mx-auto flex justify-center items-center relative z-10">
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base sm:text-xl md:text-2xl tracking-wide rounded-full px-10 sm:px-14 py-4 sm:py-5 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition-all duration-300 relative group cursor-pointer"
              onClick={() => {
                navigate('/contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">預約契作說明會</span>
              <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" strokeWidth={2.5} />
            </motion.button>
          </div>
        </section>
      </div>
    </div>
  );
}
