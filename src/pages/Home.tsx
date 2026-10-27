import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
// Theme updated to #025F9E, removing dark slate layers
import { ArrowRight, TrendingUp, ShieldCheck, Cpu, Droplets } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import techShrimpBg from '../assets/images/clean_tech_shrimp_bg_1781691628411.jpg';
import productionFarm from '../assets/images/regenerated_image_1781699514110.png';
import shrimpImage2 from '../assets/images/regenerated_image_1781699401665.png';
import shrimpImage3 from '../assets/images/regenerated_image_1781699405116.png';
import shrimpImage4 from '../assets/images/regenerated_image_1786040681893.png';
import modernShrimpProduction from '../assets/images/modern_shrimp_production_1781695323174.jpg';

const CINEMATIC_IMAGES = [
  {
    src: productionFarm,
    title: "室內智能養殖池",
    description: "高效能循環水系統建立"
  },
  {
    src: shrimpImage2,
    title: "鮮甜台灣白蝦",
    description: "智能生態系孕育的純淨品質"
  },
  {
    src: shrimpImage3,
    title: "科技生態管理",
    description: "24小時精準數據監控"
  },
  {
    src: shrimpImage4,
    title: "一口鮮甜",
    description: "來自用心養成"
  }
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % CINEMATIC_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Ambient background glow/grid (HUD style background) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_2px,transparent_2px)] bg-[size:24px_24px] pointer-events-none opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#025F9E] via-[#025F9E]/45 to-transparent pointer-events-none z-0"></div>
        <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-r from-[#025F9E]/90 lg:from-[#025F9E] via-[#025F9E]/70 to-transparent pointer-events-none z-0"></div>

        {/* Floating tech particles */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
               style={{
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`,
               }}
               animate={{
                 y: [0, -100, 0],
                 x: [0, Math.random() * 50 - 25, 0],
                 opacity: [0, 0.8, 0],
                 scale: [0, Math.random() * 2 + 1, 0]
               }}
               transition={{
                 duration: Math.random() * 5 + 5,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: Math.random() * 5
               }}
             />
          ))}
        </div>
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen"></div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 mt-10 text-center lg:text-left">
          {/* Column 1: Copy and actions */}
          <div className="flex-1 max-w-2xl lg:max-w-xl xl:max-w-2xl flex flex-col items-center lg:items-start text-center lg:text-left relative z-20">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#025F9E]/75 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-mono tracking-widest uppercase mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)] text-center lg:text-left relative after:absolute after:-bottom-[1px] after:left-1/4 after:w-1/2 after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-cyan-400 after:to-transparent"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span> 彈性契作方案起步｜加入 3 億規模 AI 智慧養殖生態系</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-sans font-black tracking-tight mb-8 leading-[1.1] flex flex-col gap-3 items-center lg:items-start select-none"
            >
              <span 
                className="text-[#FFFFFF] relative z-10 font-bold uppercase tracking-wide bg-gradient-to-r from-white via-[#FFFFFF]/90 to-[#FFFFFF]/80 bg-clip-text text-transparent filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] lg:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
              >
                從智養蝦開始
              </span>
              <span 
                className="bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-400 lg:from-cyan-400 lg:via-teal-400 lg:to-blue-500 bg-clip-text text-transparent relative z-10 pb-4 filter drop-shadow-[0_4px_16px_rgba(0,0,0,1)] lg:drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] tracking-wide font-extrabold"
              >
                打造你的百萬<br />第二收入
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-2xl text-base sm:text-lg text-[#FFFFFF]/80 font-mono tracking-wider leading-relaxed border-l-2 border-cyan-500/40 pl-4 py-1"
            >
              無需每日曝曬巡塘。整合 AIoT 專利深度學習感知器隨時偵測，<br className="hidden sm:inline" />雲端實時投影，在家開啟手機即可全盤掌控。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 mb-16 lg:mb-24 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <NavLink
                to="/franchise"
                className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-[#FFFFFF] rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group"
              >
                了解契作方案
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </NavLink>
              <NavLink
                to="/contact"
                className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-[#FFFFFF] rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group"
              >
                預約契作說明會
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </NavLink>
            </motion.div>
          </div>
        </div>

        {/* Full-Rectangular Background Image layer behind text */}
        <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 0.68, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute -inset-20"
          >
            <motion.img 
              src={techShrimpBg} 
              alt="科技生態背景" 
              className="w-full h-full object-cover pointer-events-none brightness-115 contrast-115 saturate-120"
              animate={{ y: [0, -15, 0] }}
              transition={{
                y: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }
              }}
            />
            {/* Luminous Overlay to enhance depth without fogginess */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#025F9E]/50 via-cyan-500/5 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Image Gallery Showcase - Cinematic Presentation */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="py-12 lg:py-24 bg-[#025F9E]/10 backdrop-blur-sm overflow-hidden relative"
      >
         <div className="absolute inset-0 bg-gradient-to-b from-[#025F9E]/0 via-[#025F9E]/50 to-[#025F9E]/0 pointer-events-none"></div>
         <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full flex items-center justify-center max-w-7xl mx-auto px-4" style={{ perspective: "1500px" }}>
            
            {CINEMATIC_IMAGES.map((img, index) => {
              const offset = (index - activeIndex + CINEMATIC_IMAGES.length) % CINEMATIC_IMAGES.length;
              
              let xOffset = 0;
              let yOffset = 0;
              let rotateY = 0;
              let scale = 1; // Center scale
              let zIndex = 20;
              let opacity = 1;
              let isCenter = offset === 0;

              if (offset === 1) {
                  // Right image
                  xOffset = 70; 
                  yOffset = 0;
                  rotateY = 0;
                  scale = 0.85;
                  zIndex = 10;
                  opacity = 0.7;
              } else if (offset === CINEMATIC_IMAGES.length - 1) {
                  // Left image
                  xOffset = -70;
                  yOffset = 0;
                  rotateY = 0;
                  scale = 0.85;
                  zIndex = 10;
                  opacity = 0.7;
              } else if (offset !== 0) {
                  // Back image
                  xOffset = 0;
                  yOffset = 0;
                  rotateY = 0;
                  scale = 0.6;
                  zIndex = 5;
                  opacity = 0.3;
              }

              return (
                <motion.div 
                  key={index}
                  initial={false}
                  animate={{ 
                    opacity: opacity, 
                    x: `${xOffset}%`, 
                    y: `${yOffset}%`,
                    scale: scale, 
                    rotateY: rotateY,
                    zIndex: zIndex
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute w-[85%] sm:w-[75%] md:w-[65%] lg:w-[60%] xl:w-[50%] max-w-[800px] rounded-3xl overflow-hidden aspect-video border border-white/20 shadow-2xl ${
                    isCenter ? 'ring-1 ring-cyan-500/30 group shadow-[0_0_50px_-12px_rgba(34,211,238,0.3)]' : 'cursor-pointer'
                  }`}
                  onClick={() => !isCenter && setActiveIndex(index)}
                >
                  {!isCenter && <div className="absolute inset-0 bg-[#025F9E]/60 z-10 transition-colors duration-500 hover:bg-[#025F9E]/40"></div>}
                  
                  {isCenter && (
                    <>
                      {/* Film Burn Light Leak Transition */}
                      <motion.div
                        key={`film-burn-${activeIndex}`}
                        className="absolute inset-0 z-30 pointer-events-none mix-blend-screen"
                        initial={{ 
                          opacity: 1, 
                          background: 'radial-gradient(circle at 75% 25%, rgba(255, 150, 100, 0.8) 0%, rgba(255, 50, 0, 0.4) 35%, transparent 60%), radial-gradient(circle at 25% 75%, rgba(255, 100, 50, 0.6) 0%, transparent 40%)',
                          boxShadow: 'inset 0 0 150px rgba(255, 200, 150, 0.8)'
                        }}
                        animate={{ 
                          opacity: 0,
                          boxShadow: 'inset 0 0 0px rgba(255, 200, 150, 0)'
                        }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      >
                         {/* Subtle Grain Overlay */}
                         <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                      </motion.div>
                      
                      {/* Clean presentation without dark bottom overlay */}
                      {index !== 2 && index !== 3 && (
                        <div className="absolute bottom-3 left-4 sm:bottom-6 sm:left-8 z-20 text-[#FFFFFF] opacity-100 transition-opacity duration-500">
                           <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 text-[#FFFFFF] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">{img.title}</h3>
                           <p className="text-[#FFFFFF] text-xs sm:text-sm lg:text-lg font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">{img.description}</p>
                        </div>
                      )}
                    </>
                  )}
                  <motion.img 
                    src={img.src} 
                    alt={img.title} 
                    className="w-full h-full object-cover origin-center" 
                    animate={{ scale: isCenter ? 1 : 1.3 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.div>
              );
            })}
         </div>
      </motion.section>

      {/* Core Value Props */}
      <section className="py-20 bg-[#025F9E]/10 backdrop-blur-sm border-t border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FFFFFF]">為什麼選擇智養蝦？</h2>
            <p className="text-[#FFFFFF]/90 max-w-2xl mx-auto">
              科技管理、實體產業與成果參與，讓養殖擁有不同於傳統模式的價值!
                       </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<TrendingUp className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />}
              title="低門檻被動收益"
              description="手機即時遠端監管，真正實現被動收益，無需全天守候，小資也能輕鬆入門，創造百萬毛利."
            />
            <FeatureCard
              icon={<Cpu className="w-12 h-12 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />}
              title="AI 智能養殖技術"
              description="導入合祥 AIot 整合技術，24小時水質監測、自動投餵、氣候環控，用數據說話，養出高品質白蝦."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-12 h-12 text-indigo-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]" />}
              title="食安保證 品質至上"
              description="室內高密度專養，無毒、無藥殘，通過 SGS 嚴格檢驗，打造健康美味、消費者信賴的國產白蝦."
            />
            <FeatureCard
              icon={<Droplets className="w-12 h-12 text-teal-400 drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]" />}
              title="綠色循環 永續發展"
              description="節能減碳、友善環境。打造綠色循環水產養殖系統，為地球環境永續發展盡一份心力."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, image, title, description }: { icon?: React.ReactNode; image?: string; title: string; description: string }) {
  return (
    <div
      className="breathe-panel p-8 rounded-2xl bg-[#025F9E]/40 backdrop-blur-md border relative overflow-hidden flex flex-col h-full group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <div className="mb-6 w-20 h-20 shrink-0 flex items-center justify-center bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_8_32px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          icon
        )}
      </div>
      <h3 className="text-xl font-bold text-[#FFFFFF] mb-3 relative z-10">{title}</h3>
      <p className="text-[#FFFFFF]/90 leading-relaxed text-sm relative z-10 flex-grow">{description}</p>
    </div>
  );
}
