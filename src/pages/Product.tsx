import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
// Theme updated to #025F9E
import {
  Camera,
  Activity,
  FileCheck,
  Leaf,
  ShieldCheck,
  Cpu,
  Landmark,
  TrendingUp,
  RefreshCw,
  Zap,
} from "lucide-react";
import shrimpSmartDashboard from "../assets/images/regenerated_image_1781830645200.png";
import techShrimpBg from "../assets/images/regenerated_image_1781849280393.png";
import { TechRing } from "../components/TechRing";

const HUD_BUBBLES = [
  {
    id: 1,
    left: "15%",
    size: 6,
    delay: 0,
    duration: 4.2,
    xSway: [-10, 15, -10],
  },
  {
    id: 2,
    left: "28%",
    size: 4,
    delay: 1.5,
    duration: 3.8,
    xSway: [10, -10, 10],
  },
  {
    id: 3,
    left: "42%",
    size: 8,
    delay: 0.5,
    duration: 5.0,
    xSway: [-15, 10, -15],
  },
  { id: 4, left: "55%", size: 5, delay: 2.2, duration: 4.5, xSway: [8, -8, 8] },
  {
    id: 5,
    left: "68%",
    size: 7,
    delay: 1.0,
    duration: 4.0,
    xSway: [-12, 12, -12],
  },
  {
    id: 6,
    left: "82%",
    size: 3,
    delay: 3.0,
    duration: 3.5,
    xSway: [12, -12, 12],
  },
  {
    id: 7,
    left: "22%",
    size: 5,
    delay: 2.5,
    duration: 4.8,
    xSway: [-8, 12, -8],
  },
  {
    id: 8,
    left: "37%",
    size: 6,
    delay: 0.8,
    duration: 4.3,
    xSway: [10, -10, 10],
  },
  {
    id: 9,
    left: "49%",
    size: 5,
    delay: 3.5,
    duration: 3.9,
    xSway: [-10, 15, -10],
  },
  {
    id: 10,
    left: "61%",
    size: 4,
    delay: 1.8,
    duration: 4.6,
    xSway: [8, -8, 8],
  },
  {
    id: 11,
    left: "73%",
    size: 7,
    delay: 0.2,
    duration: 5.2,
    xSway: [-12, 12, -12],
  },
  {
    id: 12,
    left: "86%",
    size: 5,
    delay: 2.0,
    duration: 3.7,
    xSway: [10, -10, 10],
  },
];

const METRIC_OPTIONS = [
  {
    id: "iot",
    title: "IOT 監控",
    subTitle: "IoT 數據串接",
    description: "感測器全區覆蓋",
    color: "#22c55e", // 綠色
    value: "24/24 感測器在線",
    percentage: 100,
  },
  {
    id: "ai",
    title: "AI 預警",
    subTitle: "AI 智能預警",
    description: "異常自動排除",
    color: "#00d8ff", // 亮藍
    value: "運行正常 (0 告警)",
    percentage: 98,
  },
  {
    id: "water",
    title: "水質監控",
    subTitle: "水質即時監測",
    description: "即時數據連線",
    color: "#38bdf8", // 天藍
    value: "pH 7.85 | 溶氧 6.82 mg/L",
    percentage: 95,
  },
];

export default function Product() {
  const [selectedMetric, setSelectedMetric] = useState<string>("iot");
  const activeMetricData =
    METRIC_OPTIONS.find((m) => m.id === selectedMetric) || METRIC_OPTIONS[0];

  const [dashboardImage, setDashboardImage] = useState(shrimpSmartDashboard);
  const [telemetry, setTelemetry] = useState({
    pH: 7.85,
    temp: 28.3,
    O2: 6.82,
    salinity: 25.1,
    shrimpCount: 1248,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        pH: +(prev.pH + (Math.random() * 0.04 - 0.02)).toFixed(2),
        temp: +(prev.temp + (Math.random() * 0.2 - 0.1)).toFixed(1),
        O2: +(prev.O2 + (Math.random() * 0.1 - 0.05)).toFixed(2),
        salinity: +(prev.salinity + (Math.random() * 0.2 - 0.1)).toFixed(1),
        shrimpCount:
          prev.shrimpCount +
          (Math.random() > 0.85 ? (Math.random() > 0.5 ? 2 : -2) : 0),
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const [videoKey, setVideoKey] = useState(0);
  const [isLargePlaying, setIsLargePlaying] = useState(true);
  const [isSmallPlaying, setIsSmallPlaying] = useState(true);

  useEffect(() => {
    const videoLoopInterval = setInterval(() => {
      setVideoKey((prev) => prev + 1);
    }, 45000);
    return () => clearInterval(videoLoopInterval);
  }, []);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-20 pb-10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl font-bold text-[#FFFFFF] mb-6 flex flex-col items-center justify-center gap-2 md:gap-4"
          >
            <span>核心技術</span>
            <span className="text-blue-400">賦能產業的 AI大腦</span>
          </motion.h1>
          <p className="text-xl text-[#FFFFFF]/90 max-w-3xl mx-auto">
            科技導入，永續經營。從管理系統到一隻蝦的收成，每一步都用數據說話。
          </p>
        </div>
      </section>

      {/* Tech Features */}
      <section className="pt-10 pb-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 1. 戰情中心展示 */}
          <div className="mb-20">
            {/* System Status Dashboard (Inspired by HXA) */}
            <div className="relative rounded-[32px] overflow-hidden bg-transparent border border-cyan-500/20 max-w-7xl mx-auto p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Subtle Grid Background */}
              <div
                className="absolute inset-0 pointer-events-none opacity-15"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.15) 1.5px, transparent 1.5px)",
                  backgroundSize: "40px 40px",
                }}
              ></div>

              {/* Left: Dynamic Radar Ring with Selected Mode Floating Tag & Floating Cards */}
              <div className="flex-1 flex flex-col items-center justify-center relative translate-y-2 sm:translate-y-0 w-full min-h-[380px]">
                {/* 頂部懸浮標題/標籤 */}
                <motion.div
                  key={`tag-${selectedMetric}`}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-3 px-4 py-1.5 rounded-full border bg-black/40 backdrop-blur-md flex items-center gap-2 shadow-lg z-20"
                  style={{
                    borderColor: `${activeMetricData.color}60`,
                    boxShadow: `0 0 15px ${activeMetricData.color}30`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: activeMetricData.color }}
                  />
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-widest"
                    style={{ color: activeMetricData.color }}
                  >
                    選取標籤：[{activeMetricData.title}]
                  </span>
                </motion.div>

                {/* Radar Container with Floating Side Cards */}
                <div className="relative flex items-center justify-center">
                  {/* Floating Card Left: 指標狀態 */}
                  <motion.div
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="hidden sm:flex absolute -left-8 lg:-left-12 top-10 z-20 bg-slate-950/80 border border-white/15 backdrop-blur-md px-3.5 py-2 rounded-xl flex-col gap-0.5 shadow-xl"
                  >
                    <span className="text-[10px] text-white/60 font-mono tracking-wider font-bold">
                      指標狀態
                    </span>
                    <span
                      className="text-xs font-bold font-mono"
                      style={{ color: activeMetricData.color }}
                    >
                      {activeMetricData.value}
                    </span>
                  </motion.div>

                  {/* Floating Card Right: 系統模式 */}
                  <motion.div
                    animate={{ y: [4, -4, 4] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="hidden sm:flex absolute -right-8 lg:-right-12 bottom-10 z-20 bg-slate-950/80 border border-white/15 backdrop-blur-md px-3.5 py-2 rounded-xl flex-col gap-0.5 shadow-xl"
                  >
                    <span className="text-[10px] text-white/60 font-mono tracking-wider font-bold">
                      系統模式
                    </span>
                    <span
                      className="text-xs font-bold font-mono tracking-widest uppercase"
                      style={{ color: activeMetricData.color }}
                    >
                      {activeMetricData.subTitle}
                    </span>
                  </motion.div>

                  {/* Dynamic Color Tech Ring */}
                  <TechRing
                    activeColor={activeMetricData.color}
                    targetPercentage={activeMetricData.percentage}
                  />
                </div>
              </div>

              {/* Right: Monitoring Metrics */}
              <div className="flex-1 w-full relative z-10 flex flex-col gap-5">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-2"
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#FFFFFF] mb-3">
                    戰情中心展示
                  </h2>
                  <p className="text-[#FFFFFF]/90 text-base sm:text-lg">
                    透過即時且動態的圖示與雷達，能更直觀地監測設備運轉、IoT
                    數據與警報狀態。
                  </p>
                </motion.div>

                {METRIC_OPTIONS.map((item, idx) => {
                  const isSelected = selectedMetric === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * (idx + 1), duration: 0.5 }}
                      onClick={() => setSelectedMetric(item.id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "bg-[#025F9E]/80 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-[1.02]"
                          : "bg-[#025F9E]/40 border-white/20 hover:bg-[#025F9E]/60 hover:border-white/40"
                      }`}
                    >
                      <div
                        className="font-bold text-lg sm:text-xl uppercase tracking-widest border-r border-white/20 pr-4 w-[110px] sm:w-[130px] shrink-0 text-center whitespace-nowrap transition-colors duration-300"
                        style={{ color: isSelected ? item.color : "#a3e635" }}
                      >
                        {item.title}
                      </div>
                      <div className="text-[#FFFFFF]/90 font-mono text-sm leading-tight flex-1">
                        {item.description}
                        <br />
                        <span className="text-[#FFFFFF]/60 text-xs">{item.subTitle}</span>
                      </div>
                      {isSelected && (
                        <div
                          className="w-2.5 h-2.5 rounded-full mr-2 shrink-0 animate-pulse"
                          style={{ backgroundColor: item.color }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. 合祥 AIoT 戰情室智慧監控系統 */}
          <div className="mb-20 border-0">
            {/* System UI Mockup (HUD Style, Background Tech Shrimp, Compact Shrunk) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[32px] overflow-hidden bg-transparent border border-cyan-500/20 max-w-7xl mx-auto group p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
            >
              {/* Left Column: Enlarged Tech Shrimp Circular HUD Scanner */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] flex items-center justify-center justify-self-center shrink-0">
                {/* HUD Aura Backlight */}
                <motion.div
                  className="absolute inset-[10%] bg-cyan-500/10 rounded-full blur-[40px]"
                  animate={{
                    scale: [0.9, 1.1, 0.9],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Rotating outermost circle dotted track */}
                <motion.div
                  className="absolute inset-2 rounded-full border border-cyan-500/20"
                  style={{ borderDasharray: "4 12" }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Rotating second dashed ring */}
                <motion.div
                  className="absolute inset-[7%] rounded-full border-2 border-dashed border-cyan-400/35"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Telemetry Labels around the circle */}
                <div className="absolute top-4 left-4 text-[9px] font-mono text-cyan-400/60 font-bold uppercase tracking-wider">
                  HUD_v2.5_PRO
                </div>
                <div className="absolute bottom-4 left-4 text-[9px] font-mono text-cyan-400/60 font-bold uppercase tracking-wider">
                  RANGE: 10m
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 font-extrabold tracking-widest">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse animate-duration-1000"></span>
                  SCANNING
                </div>

                {/* Circular Mask Container for the Tech Shrimp Image (Exactly size-matched to physical boundaries) */}
                <div className="absolute inset-[10%] rounded-full overflow-hidden border-2 border-cyan-400/60 bg-white/10 shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center z-10">
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none z-20" />

                  {/* Crosshairs */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="w-14 h-[1.5px] bg-cyan-400/35" />
                    <div className="h-14 w-[1.5px] bg-cyan-400/35 absolute" />
                    <div className="w-8 h-8 border border-cyan-400/30 rounded-full" />
                  </div>

                  {/* Backdrop Tech Shrimp Image */}
                  <motion.img
                    src={techShrimpBg}
                    alt="HUD Target Shrimp"
                    className="w-full h-full object-cover scale-[1.08] saturate-[1.15] contrast-[1.15]"
                    animate={{
                      y: [-8, 8, -8],
                      x: [-4, 4, -4],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Flowing Water Ripple Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-cyan-500/5 mix-blend-screen pointer-events-none z-20"
                    animate={{
                      y: ["100%", "-100%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Interactive Rising Water Bubbles with Cyber Glow */}
                  {HUD_BUBBLES.map((bubble) => (
                    <motion.div
                      key={bubble.id}
                      className="absolute rounded-full border border-cyan-300/35 bg-cyan-400/10 shadow-[0_0_6px_rgba(34,211,238,0.4)] pointer-events-none z-25"
                      style={{
                        left: bubble.left,
                        width: bubble.size,
                        height: bubble.size,
                      }}
                      animate={{
                        y: ["110%", "-10%"],
                        x: bubble.xSway,
                        opacity: [0, 0.7, 0.7, 0],
                      }}
                      transition={{
                        duration: bubble.duration,
                        repeat: Infinity,
                        delay: bubble.delay,
                        ease: "easeOut",
                      }}
                    />
                  ))}

                  {/* Cyber Scan Laser Sweep */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-30 pointer-events-none"
                    animate={{ y: ["0%", "100%", "0%"] }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      boxShadow: "0 0 12px rgba(34,211,238,0.85)",
                    }}
                  />
                </div>
              </div>

              {/* Right Column: Shrunk Compact Telemetry Panel starting from frame's horizontal center */}
              <div className="w-full text-left self-center justify-self-start scale-95 sm:scale-90 md:scale-95 lg:scale-100 origin-left">
                <div className="mb-3">
                  <span className="inline-block bg-cyan-500/15 text-cyan-400 text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-2 border border-cyan-500/20 uppercase tracking-widest flex items-center gap-1.5 w-fit">
                    <Zap className="w-3 h-3 animate-pulse text-cyan-400" />
                    系統操作介面示意圖
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#FFFFFF] mb-1 tracking-tight">
                    合祥 AIoT 戰情室智慧監控系統
                  </h3>
                  <p className="text-[#FFFFFF]/90 text-[11px] sm:text-xs leading-normal max-w-sm mb-4 font-normal">
                    整合水質即時監測、CCTV 自動巡檢智慧監控與環控系統
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#025F9E]/50 p-2.5 rounded-xl border border-cyan-500/10 backdrop-blur-sm flex flex-col">
                    <span className="text-[9px] font-mono text-cyan-400/60 font-semibold tracking-wider">
                      PH LEVEL
                    </span>
                    <span className="text-base font-mono font-bold text-[#FFFFFF] mt-0.5 flex items-center justify-between">
                      {telemetry.pH}
                      <span className="text-[8px] text-emerald-400 font-normal px-1 py-0.2 bg-emerald-500/10 rounded">
                        最適
                      </span>
                    </span>
                  </div>

                  <div className="bg-[#025F9E]/50 p-2.5 rounded-xl border border-cyan-500/10 backdrop-blur-sm flex flex-col">
                    <span className="text-[9px] font-mono text-cyan-400/60 font-semibold tracking-wider">
                      TEMPERATURE
                    </span>
                    <span className="text-base font-mono font-bold text-[#FFFFFF] mt-0.5 flex items-center justify-between">
                      {telemetry.temp}°C
                      <span className="text-[8px] text-emerald-400 font-normal px-1 py-0.2 bg-emerald-500/10 rounded">
                        最適
                      </span>
                    </span>
                  </div>

                  <div className="bg-[#025F9E]/50 p-2.5 rounded-xl border border-cyan-500/10 backdrop-blur-sm flex flex-col">
                    <span className="text-[9px] font-mono text-cyan-400/60 font-semibold tracking-wider">
                      DISSOLVED OXYGEN
                    </span>
                    <span className="text-base font-mono font-bold text-[#FFFFFF] mt-0.5 flex items-center justify-between">
                      {telemetry.O2}{" "}
                      <span className="text-[10px] font-normal text-[#FFFFFF]/90 font-sans ml-0.5">
                        mg/L
                      </span>
                      <span className="text-[8px] text-emerald-400 font-normal px-1 py-0.2 bg-emerald-500/10 rounded">
                        安全
                      </span>
                    </span>
                  </div>

                  <div className="bg-[#025F9E]/50 p-2.5 rounded-xl border border-cyan-500/10 backdrop-blur-sm flex flex-col">
                    <span className="text-[9px] font-mono text-cyan-400/60 font-semibold tracking-wider">
                      SHRIMP DENSITY
                    </span>
                    <span className="text-base font-mono font-bold text-[#FFFFFF] mt-0.5 flex items-center justify-between">
                      {telemetry.shrimpCount}{" "}
                      <span className="text-[10px] font-normal text-[#FFFFFF]/90 font-sans ml-0.5">
                        pcs
                      </span>
                      <span className="text-[8px] text-cyan-400 font-normal px-1 py-0.2 bg-cyan-500/10 rounded">
                        即時
                      </span>
                    </span>
                  </div>
                </div>

                {/* Small Telemetry System Console Terminal */}
                <div className="bg-[#025F9E]/80 rounded-lg p-2.5 border border-[#025F9E]/40 font-mono text-[9px] text-[#FFFFFF]/90 leading-relaxed flex flex-col gap-0.5">
                  <div className="flex justify-between items-center text-cyan-400/70 font-semibold">
                    <span>[SYS] AI_OT ACTIVE CH-04</span>
                    <span className="animate-pulse">● ONLINE</span>
                  </div>
                  <div className="text-[#FFFFFF]/70">
                    &gt; salinity index stable: {telemetry.salinity} ppt
                    (Target: 25.0 ± 2.0 ppt)
                  </div>
                  <div className="text-emerald-400/80">
                    &gt; auto bio-density assessment check: optimum; trigger
                    laser scan cycle ok
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 3. AIoT 戰情室監控大腦 (Dashboard 影像整合) */}
          <div className="mb-14 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl sm:rounded-[32px] overflow-hidden bg-transparent border border-cyan-500/20 p-2 sm:p-6 lg:p-8 max-w-7xl mx-auto"
            >
              {/* Centered Heading inside the Dashboard Section container */}
              <div className="text-center mb-5 sm:mb-8 relative z-10 px-2">
                <span className="inline-block bg-cyan-500/10 text-cyan-400 text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-cyan-500/20 mb-2 sm:mb-3 tracking-widest uppercase">
                  AIoT INTEGRATED CONTROL
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#FFFFFF] mb-1">
                  AIoT 戰情室監控大腦 (Dashboard 影像整合)
                </h2>
              </div>

              {/* Interactive Dashboard Frame */}
              <div className="relative w-full max-w-full rounded-lg sm:rounded-2xl lg:rounded-3xl overflow-hidden border border-cyan-500/40 bg-slate-950/90 shadow-[0_0_35px_rgba(6,182,212,0.25)] group aspect-video">
                {/* Tech Corner HUD Brackets */}
                <div className="absolute top-2 left-2 w-3 sm:w-5 h-3 sm:h-5 border-t-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 sm:w-5 h-3 sm:h-5 border-t-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3 sm:w-5 h-3 sm:h-5 border-b-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 sm:w-5 h-3 sm:h-5 border-b-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />

                {/* Dashboard Image */}
                <img
                  src={shrimpSmartDashboard}
                  alt="AIoT Shrimp Smart Dashboard View"
                  className="w-full h-full object-cover block select-none pointer-events-none"
                  loading="lazy"
                />

                {/* Embedded Video Widget - Precision RWD Fit aligned to center-top LIVE CCTV sub-window */}
                <div
                  id="small-live-stream-widget"
                  className="absolute top-[19.1%] left-[34.7%] w-[28.8%] h-[29.2%] rounded-[2px] sm:rounded-md overflow-hidden border border-cyan-400/60 bg-black/95 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex flex-col z-30 pointer-events-none"
                >
                  {/* Smart Video Loader supporting direct Google Drive video streams with precise, crystal-clear cropping */}
                  <div className="relative w-full h-full bg-[#025F9E]/90 overflow-hidden flex items-center justify-center pointer-events-none">
                    {/* Live Stream Telemetry HUD Badge */}
                    <div className="absolute top-0.5 left-0.5 sm:top-1.5 sm:left-1.5 z-20 flex items-center gap-1 bg-black/80 backdrop-blur-xs px-1 sm:px-1.5 py-0.5 rounded text-[6px] sm:text-[9px] font-mono text-cyan-300 font-bold border border-cyan-400/40 shadow-sm">
                      <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="hidden xs:inline">LIVE</span> CCTV
                    </div>

                    {/* Google Drive preview iframe - cropped and pointer-events disabled to hide control bar and auto-loop */}
                    {isSmallPlaying ? (
                      <iframe
                        key={`small-stream-${videoKey}`}
                        src="https://drive.google.com/file/d/10NTJGd8g1tOvujTQsQf9mpWkqUO7lnci/preview?autoplay=1&mute=1&loop=1&playlist=10NTJGd8g1tOvujTQsQf9mpWkqUO7lnci&controls=0&rm=minimal"
                        className="absolute left-1/2 top-1/2 border-0 select-none pointer-events-none"
                        style={{
                          width: "150%",
                          height: "150%",
                          transform: "translate(-50%, -50%) scale(1.35)",
                        }}
                        allow="autoplay; encrypted-media"
                        title="AIoT Live Stream"
                      />
                    ) : (
                      <div className="text-cyan-400 font-mono text-[8px] sm:text-[9px] absolute inset-0 flex flex-col items-center justify-center gap-0.5 sm:gap-1 bg-black/95 select-none pointer-events-auto">
                        <span className="text-rose-500 font-bold uppercase">
                          PAUSED
                        </span>
                        <span className="text-[#FFFFFF]/70 text-[7px] sm:text-[8px]">
                          STREAM OFF
                        </span>
                      </div>
                    )}

                    {/* Transparent Click Shield/Mouse Cloak to prevent hover/controls pop-out triggers */}
                    {isSmallPlaying && (
                      <div className="absolute inset-0 bg-transparent z-10 pointer-events-none" />
                    )}
                  </div>
                </div>
              </div>

              {/* 系統操作介面示意圖 System Demo UI Label */}
              <div className="mt-4 sm:mt-6 flex flex-col items-center pb-1 sm:pb-2 z-20 relative">
                <div className="border border-cyan-400/40 rounded-md sm:rounded-lg px-3 sm:px-4 py-1 sm:py-1.5 bg-[#025F9E]/90 text-cyan-400 font-mono text-[9px] sm:text-xs font-bold tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  系統操作介面示意圖 System Demo UI
                </div>
              </div>
            </motion.div>
          </div>

          {/* 4. LIVE FEED: BIOMASS_STREAM_01 */}
          <div className="-mt-2 sm:mt-0 mb-14 sm:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl sm:rounded-[32px] overflow-hidden bg-transparent border border-cyan-500/20 p-2 sm:p-6 lg:p-8 max-w-7xl mx-auto"
            >

              <div className="flex flex-col gap-2 sm:gap-4 max-w-full sm:max-w-full mx-auto">
                {/* Monitor Header Telemetry bar */}
                <div className="flex flex-wrap sm:flex-nowrap justify-between items-center bg-[#025F9E]/50 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl border border-cyan-500/30 gap-1.5 sm:gap-2 shadow-sm">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-300 tracking-wider">
                      LIVE FEED: BIOMASS_STREAM_01
                    </span>
                    <span className="bg-red-500/20 text-red-400 text-[8px] sm:text-[9px] font-mono font-bold px-1 sm:px-1.5 py-0.5 rounded border border-red-500/40">
                      REC ●
                    </span>
                  </div>
                  <div className="text-[8px] sm:text-[10px] font-mono text-[#FFFFFF]/90 flex items-center gap-1.5 sm:gap-4 ml-auto">
                    <span className="bg-cyan-950/60 text-cyan-300 px-1 sm:px-1.5 py-0.5 rounded border border-cyan-500/30">1080P/60FPS</span>
                    <span className="hidden xs:inline text-emerald-400">AUTO_FOCUS: ON</span>
                  </div>
                </div>

                {/* Main Large Display */}
                <div
                  id="large-live-stream-monitor"
                  className="relative aspect-video w-full max-w-full mx-auto rounded-lg sm:rounded-2xl overflow-hidden border border-cyan-500/40 sm:border-2 bg-black shadow-[0_0_25px_rgba(6,182,212,0.2)] pointer-events-none group"
                >
                  {/* Tech Corner HUD Brackets */}
                  <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 w-2.5 sm:w-6 h-2.5 sm:h-6 border-t-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
                  <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2.5 sm:w-6 h-2.5 sm:h-6 border-t-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />
                  <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 w-2.5 sm:w-6 h-2.5 sm:h-6 border-b-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
                  <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 w-2.5 sm:w-6 h-2.5 sm:h-6 border-b-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />

                  {isLargePlaying ? (
                    <>
                      {/* Google Drive preview inside iframe - scaled up to crop controls and shielded from hover */}
                      <iframe
                        key={`large-stream-${videoKey}`}
                        src="https://drive.google.com/file/d/1HGOIRRcFLl7nJJOLVS82QuBI1PIAdKI0/preview?autoplay=1&mute=1&loop=1&playlist=1HGOIRRcFLl7nJJOLVS82QuBI1PIAdKI0&controls=0&rm=minimal"
                        className="absolute inset-0 w-full h-full border-0 select-none pointer-events-none"
                        style={{
                          transform: "scale(1.52)",
                        }}
                        allow="autoplay; encrypted-media"
                        title="AIoT Live Stream Large View"
                      />
                      {/* Transparent Click Shield/Mouse Cloak to prevent hover/controls pop-out triggers */}
                      <div className="absolute inset-0 bg-transparent z-10 pointer-events-none" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#025F9E]/80 text-cyan-500 font-mono gap-3 select-none">
                      {/* Static scan lines effect */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_94%,rgba(34,211,238,0.15)_95%,rgba(34,211,238,0.15)_98%,rgba(18,24,38,0)_100%)] bg-[size:100%_24px] pointer-events-none opacity-40 animate-pulse" />
                      <span className="h-4 w-4 bg-red-500 rounded-full animate-ping" />
                      <span className="text-sm font-bold tracking-widest text-red-500">
                        FEED OFFLINE / STANDBY
                      </span>
                      <span className="text-xs text-[#FFFFFF]/70">
                        CCTV 串流連線已中斷。
                      </span>
                    </div>
                  )}

                  {/* Aesthetic Watermark Scan overlay */}
                  <div className="absolute inset-x-0 bottom-1.5 sm:bottom-4 px-2 sm:px-4 flex justify-between items-center pointer-events-none select-none z-20 font-mono text-[7px] sm:text-[9px] text-cyan-300/80 uppercase tracking-widest font-bold">
                    <div className="bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded border border-cyan-400/30">
                      AI_RECOGNITION: {isLargePlaying ? "ACTIVE" : "STANDBY"}
                    </div>
                    <div className="bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded border border-cyan-400/30">
                      LATENCY: {isLargePlaying ? "42ms" : "--"}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-[#FFFFFF] mb-2 text-center">
              AIoT 全產業鏈整合
            </h2>
            <p className="text-[#FFFFFF]/90 text-center mb-12 max-w-xl mx-auto">
              專為養殖戶與管理端設計的四大核心科技板塊，實現真正的智慧化與科學化生產
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TechFeature
                icon={<Camera className="w-7 h-7" />}
                title="球型 CCTV 智慧巡檢與影像監控"
                desc="整合高品質球型 CCTV 巡檢鏡頭與 AI 影像監控技術，支援遠端旋轉與變焦。全方位無死角覆蓋池面與周邊環境，實現智慧化巡航、安全防護與即時監察。"
                badge="全景監控"
                index={0}
              />
              <TechFeature
                icon={<Activity className="w-7 h-7" />}
                title="24H 全時水質監控"
                desc="高精度感測器即時監測水溫、溶氧量、pH值等關鍵參數，數據上傳雲端。配合異常自動預警與遠端增氧控制，告別傳統靠天吃飯與經驗法則。"
                badge="動態環控"
                index={1}
              />
              <TechFeature
                icon={<Leaf className="w-7 h-7" />}
                title="AI 生物量演算與精準投餌系統"
                desc="動態演算現場放養天數、成活率與即時水質數據，利用 AI 配對出最佳的飼料與益生菌投餵曲線。精準施灑、定量定時，降低飼料浪費與底泥污染，打造最高吸收率的微生態環境。"
                badge="自動控制"
                index={2}
              />
              <TechFeature
                icon={<FileCheck className="w-7 h-7" />}
                title="SGS 檢驗合格與永續安全"
                desc="建置完整透明的數位化產銷履歷。全程使用專利生物益生菌照護，保證無殺菌劑、無化學抗生素，SGS檢驗品質看得見，讓消費者吃得安心。"
                badge="生產認證"
                index={3}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface TechFeatureProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  badge: string;
  index: number;
}

function TechFeature({ icon, title, desc, badge, index }: TechFeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="breathe-panel bg-[#025F9E]/5 border border-cyan-500/20 rounded-2xl p-6 md:p-8 relative overflow-hidden group flex flex-col justify-between"
    >
      {/* Decorative background glow on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 group-hover:scale-125 transition-all duration-700 pointer-events-none" />

      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex-shrink-0 w-14 h-14 bg-cyan-950/60 text-cyan-400 border border-cyan-500/20 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:text-cyan-300 group-hover:border-cyan-400 group-hover:scale-105 transition-all duration-300 shadow-inner">
            {icon}
          </div>
          <span className="text-xs font-semibold text-cyan-400/80 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            {badge}
          </span>
        </div>

        <h4 className="text-xl font-bold text-[#FFFFFF] mb-3 group-hover:text-[#FFFFFF] transition-colors">
          {title}
        </h4>
        <p className="text-[#FFFFFF]/90 text-sm leading-relaxed group-hover:text-[#FFFFFF]/80 transition-colors">
          {desc}
        </p>
      </div>

      {/* Decorative bottom corner glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/40 transition-all duration-500" />
    </motion.div>
  );
}
