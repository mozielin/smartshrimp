/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState } from 'react';
import { Camera, Eye, Zap, RefreshCw, VolumeX, Volume2, ShieldAlert, VideoOff, Play } from 'lucide-react';
import { PondId } from '../types';
import { shrimpApi, isConnectedToApi } from '../lib/api';

interface CctvMonitorProps {
  activePondId: PondId;
  activePondName: string;
  aeratorPowerLevel: number;
}

export default function CctvMonitor({ activePondId, activePondName, aeratorPowerLevel }: CctvMonitorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [filterMode, setFilterMode] = useState<'normal' | 'bottom-hd' | 'thermal'>('normal');
  const [latency, setLatency] = useState<number>(0.21);
  const [fps, setFps] = useState<number>(30.0);
  const [muted, setMuted] = useState<boolean>(true);
  const [shrimpCount, setShrimpCount] = useState<number>(14);
  const [feedMode, setFeedMode] = useState<'mjpeg' | 'simulation'>('mjpeg');
  const [streamError, setStreamError] = useState<boolean>(false);
  const [retryKey, setRetryKey] = useState<number>(0);

  const getCamIdForPond = (pondId: PondId): string => {
    if (pondId === 'pond-a') return 'cam_849193';
    if (pondId === 'pond-b') return 'cam_a96764';
    return 'cam_849193';
  };

  const camId = getCamIdForPond(activePondId);
  const streamUrl = shrimpApi.getStreamUrl(camId) + (retryKey ? `&retry=${retryKey}` : '');
  const snapshotUrl = shrimpApi.getSnapshotUrl(camId) + (retryKey ? `&retry=${retryKey}` : '');

  // Reset stream error when active pond changes
  useEffect(() => {
    setStreamError(false);
  }, [activePondId]);

  // Animated shrimp class
  class Shrimp {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    angle: number;
    segmentCount: number;
    flickerTimer: number;

    constructor(canvasWidth: number, canvasHeight: number) {
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
      this.size = 12 + Math.random() * 15;
      this.speedX = (Math.random() - 0.5) * 1.2;
      this.speedY = (Math.random() - 0.5) * 0.8;
      this.angle = Math.atan2(this.speedY, this.speedX);
      this.segmentCount = 5 + Math.floor(Math.random() * 3);
      this.flickerTimer = Math.random() * 100;
    }

    update(canvasWidth: number, canvasHeight: number) {
      this.x += this.speedX;
      this.y += this.speedY;
      this.flickerTimer += 0.05;

      // Wrap around edges
      if (this.x < -40) this.x = canvasWidth + 40;
      if (this.x > canvasWidth + 40) this.x = -40;
      if (this.y < -40) this.y = canvasHeight + 40;
      if (this.y > canvasHeight + 40) this.y = -40;

      // Random direction change sometimes
      if (Math.random() < 0.008) {
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.0;
        this.angle = Math.atan2(this.speedY, this.speedX);
      }
    }

    draw(ctx: CanvasRenderingContext2D, filter: 'normal' | 'bottom-hd' | 'thermal') {
      ctx.save();
      ctx.translate(this.x, this.y);
      const curAngle = Math.atan2(this.speedY, this.speedX);
      ctx.rotate(curAngle);

      // Stylize based on filter
      let strokeColor = 'rgba(120, 240, 255, 0.4)';
      let bodyColor = 'rgba(80, 210, 255, 0.15)';
      let glowColor = 'rgba(6, 182, 212, 0.3)';

      if (filter === 'bottom-hd') {
        strokeColor = 'rgba(34, 211, 238, 0.85)';
        bodyColor = 'rgba(34, 211, 238, 0.3)';
        glowColor = 'rgba(34, 211, 238, 0.6)';
      } else if (filter === 'thermal') {
        // Hot core with temperature mapped colors
        const intensity = 0.7 + Math.sin(this.flickerTimer) * 0.3;
        strokeColor = `rgba(244, 63, 94, ${intensity})`;
        bodyColor = `rgba(245, 158, 11, ${intensity * 0.7})`;
        glowColor = 'rgba(239, 68, 68, 0.8)';
      }

      ctx.shadowBlur = filter !== 'normal' ? 12 : 4;
      ctx.shadowColor = glowColor;

      // Draw antennae (antennae go out forward)
      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 0.8;
      ctx.moveTo(this.size * 0.6, 0);
      ctx.quadraticCurveTo(this.size * 1.2, -6, this.size * 1.8, -12);
      ctx.moveTo(this.size * 0.6, 0);
      ctx.quadraticCurveTo(this.size * 1.2, 6, this.size * 1.8, 12);
      ctx.stroke();

      // Main body shell segments curving forward
      ctx.fillStyle = bodyColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      // Draw tail-head curved body
      ctx.moveTo(this.size * 0.6, 0);
      ctx.quadraticCurveTo(0, -this.size * 0.35, -this.size * 0.6, -this.size * 0.15); // curved back
      ctx.lineTo(-this.size * 0.65, 0); // tail tip
      ctx.quadraticCurveTo(-this.size * 0.3, this.size * 0.3, this.size * 0.6, 0); // tummy
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Individual shell segmentation markings
      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 0.8;
      for (let i = -2; i < 3; i++) {
        const segX = (i * this.size) / 5;
        ctx.moveTo(segX, -this.size * 0.2);
        ctx.lineTo(segX, this.size * 0.2);
      }
      ctx.stroke();

      // Eye
      ctx.fillStyle = filter === 'thermal' ? '#ffffff' : '#040d1a';
      ctx.beginPath();
      ctx.arc(this.size * 0.45, -this.size * 0.1, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Swimming legs
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const legX = -this.size * 0.2 + (i * 3);
        const legSwing = Math.sin(this.flickerTimer + i) * 3;
        ctx.moveTo(legX, this.size * 0.15);
        ctx.lineTo(legX - 2, this.size * 0.35 + legSwing);
      }
      ctx.stroke();

      // Tail fans
      ctx.fillStyle = strokeColor;
      ctx.beginPath();
      ctx.moveTo(-this.size * 0.6, -2);
      ctx.lineTo(-this.size * 0.9, -6);
      ctx.lineTo(-this.size * 0.75, 0);
      ctx.lineTo(-this.size * 0.9, 6);
      ctx.lineTo(-this.size * 0.6, 2);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }
  }

  // Water bubbles class corresponding to aerator activity
  class Bubble {
    x: number;
    y: number;
    radius: number;
    speedY: number;
    wiggleSpeed: number;
    wiggleRange: number;
    age: number;

    constructor(canvasWidth: number) {
      this.x = Math.random() * canvasWidth;
      this.y = 200 + Math.random() * 50; // bubble rises from bottom
      this.radius = 1 + Math.random() * 3.5;
      this.speedY = 1.2 + Math.random() * 1.8;
      this.wiggleSpeed = Math.random() * 0.05;
      this.wiggleRange = 0.5 + Math.random() * 1.5;
      this.age = 0;
    }

    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.age * this.wiggleSpeed) * this.wiggleRange;
      this.age++;
    }

    draw(ctx: CanvasRenderingContext2D, filter: 'normal' | 'bottom-hd' | 'thermal') {
      let bubbleColor = 'rgba(120, 240, 255, 0.4)';
      let bubbleGlow = 'rgba(6, 182, 212, 0.2)';

      if (filter === 'thermal') {
        bubbleColor = 'rgba(239, 68, 68, 0.35)';
        bubbleGlow = 'rgba(255, 120, 120, 0.1)';
      } else if (filter === 'bottom-hd') {
        bubbleColor = 'rgba(255, 255, 255, 0.65)';
        bubbleGlow = 'rgba(34, 211, 238, 0.3)';
      }

      ctx.save();
      ctx.shadowBlur = 4;
      ctx.shadowColor = bubbleGlow;
      ctx.strokeStyle = bubbleColor;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.stroke();

      // Highlights
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.beginPath();
      ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Handle stream latency and statistics noise
  useEffect(() => {
    const statInterval = setInterval(() => {
      // Simulate real latency fluctuations e.g. 0.18s to 0.24s
      setLatency(parseFloat((0.18 + Math.random() * 0.08).toFixed(2)));
      // Simulate camera frames jitter
      setFps(parseFloat((29.4 + Math.random() * 0.8).toFixed(1)));
    }, 2500);
    return () => clearInterval(statInterval);
  }, []);

  // Main canvas rendering loops
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high density retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Populate objects
    const shrimps: Shrimp[] = Array.from({ length: shrimpCount }, () => new Shrimp(width, height));
    const bubbles: Bubble[] = [];

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Background water according to mode
      if (filterMode === 'normal') {
        const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
        bgGrad.addColorStop(0, '#061325');
        bgGrad.addColorStop(0.5, '#040d1a');
        bgGrad.addColorStop(1, '#02070e');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      } else if (filterMode === 'bottom-hd') {
        const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
        bgGrad.addColorStop(0, '#091f3a');
        bgGrad.addColorStop(0.5, '#06152b');
        bgGrad.addColorStop(1, '#030c1c');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      } else if (filterMode === 'thermal') {
        const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
        bgGrad.addColorStop(0, '#110609');
        bgGrad.addColorStop(0.5, '#0a0305');
        bgGrad.addColorStop(1, '#050102');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw Grid / Telemetry guidelines in CCTV mode
      ctx.save();
      ctx.strokeStyle = filterMode === 'thermal' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(34, 211, 238, 0.06)';
      ctx.lineWidth = 1;
      // Crosshairs & center box
      ctx.strokeRect(width * 0.1, height * 0.1, width * 0.8, height * 0.8);
      ctx.beginPath();
      ctx.moveTo(width / 2, 10);
      ctx.lineTo(width / 2, 25);
      ctx.moveTo(width / 2, height - 25);
      ctx.lineTo(width / 2, height - 10);
      ctx.moveTo(10, height / 2);
      ctx.lineTo(25, height / 2);
      ctx.moveTo(width - 25, height / 2);
      ctx.lineTo(width - 10, height / 2);
      ctx.stroke();
      ctx.restore();

      // 2. Generate bubbles based on Aerator level (Level 1: slow, Level 4: vigorous bubble clouds)
      const bubbleGenRate = aeratorPowerLevel * 0.25;
      if (Math.random() < Math.min(bubbleGenRate, 0.8)) {
        bubbles.push(new Bubble(width));
      }

      // Update & Draw Bubbles
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.update();
        if (b.y < -10) {
          bubbles.splice(i, 1);
        } else {
          b.draw(ctx, filterMode);
        }
      }

      // 3. Update & Draw Shrimps
      shrimps.forEach((shrimp) => {
        shrimp.update(width, height);
        shrimp.draw(ctx, filterMode);
      });

      // Overlay text markers directly on canvas background to prevent flashing
      ctx.save();
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = filterMode === 'thermal' ? '#ef4444' : '#06b6d4';
      ctx.fillText(`Pond Type: ${activePondId.toUpperCase()}`, 15, height - 35);
      ctx.fillText(`Turbidity index: 24 NTU`, 15, height - 20);
      ctx.fillText(`Biomass Est: Healthy`, 15, height - 8);

      // AI Target bounding boxes for high-tech look
      if (filterMode === 'bottom-hd') {
        ctx.fillStyle = 'rgba(16, 185, 129, 0.8)';
        ctx.fillText(`[AI AUTO SHRIMP RECOGNITION ACTIVE]`, width - 180, height - 20);
        ctx.fillText(`ESTIMATED VISIBLE IN FRAME: ${shrimpCount} TAILS`, width - 180, height - 8);

        // Draw cute box on first 2 shrimps to mock computerized vision overlays
        for (let idx = 0; idx < Math.min(shrimps.length, 3); idx++) {
          const s = shrimps[idx];
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
          ctx.strokeRect(s.x - s.size, s.y - s.size, s.size * 2, s.size * 2);
          ctx.font = '8px "JetBrains Mono"';
          ctx.fillStyle = 'rgba(16, 185, 129, 0.9)';
          ctx.fillText(`SHRIMP_${idx} (98%)`, s.x - s.size, s.y - s.size - 3);
        }
      } else if (filterMode === 'thermal') {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
        ctx.fillText(`[THERMAL MASS EXCLUSION DETECTED]`, width - 180, height - 20);
        ctx.fillText(`MEAN TEMPERATURE ACC: 27.6°C`, width - 180, height - 8);

        // Glow outlines for active hotspots
        for (let idx = 0; idx < Math.min(shrimps.length, 2); idx++) {
          const s = shrimps[idx];
          ctx.fillStyle = 'rgba(251, 146, 60, 0.2)';
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activePondId, filterMode, aeratorPowerLevel, shrimpCount]);

  return (
    <div className="flex flex-col h-full bg-[#1E293B] border border-slate-700 rounded-lg overflow-hidden shadow text-sm">
      {/* CCTV Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700 bg-slate-800/50 relative">
        <div className="flex items-center gap-2">
          <Camera className="w-4.5 h-4.5 text-blue-400" />
          <div>
            <h3 className="font-semibold text-slate-100 flex items-center gap-1.5 leading-tight">
              {activePondName} 即時監控攝影機
            </h3>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider">CCTV WEBCAM LIVE STREAMING</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-mono">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
          </span>
          <span className="text-[10px] text-rose-500 font-bold uppercase mr-2 tracking-widest">LIVE</span>
          <button 
            onClick={() => setMuted(!muted)}
            className="p-1 rounded bg-slate-700 text-slate-300 hover:text-white transition-all hover:bg-slate-600"
            title={muted ? '開啟聲音' : '靜音'}
          >
            {muted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-blue-400 animate-pulse" />}
          </button>
        </div>
      </div>

      {/* Camera Viewport Wrapper */}
      <div className="relative flex-1 min-h-[220px] bg-black group overflow-hidden scanlines flex items-center justify-center">
        {feedMode === 'mjpeg' && !streamError ? (
          <img 
            src={streamUrl} 
            alt={`${activePondName} 實時直播`} 
            className="w-full h-full object-contain relative z-0"
            onError={() => setStreamError(true)}
            referrerPolicy="no-referrer"
          />
        ) : feedMode === 'mjpeg' && streamError ? (
          <div className="text-center p-6 flex flex-col items-center justify-center gap-3 bg-slate-900/95 border-2 border-rose-500/30 rounded-xl max-w-sm mx-auto shadow-2xl relative z-10 mx-4">
            <VideoOff className="w-10 h-10 text-rose-550 animate-pulse" />
            <h4 className="font-extrabold text-slate-100 text-[13px] tracking-wide">實時直播訊號離線中 (CCTV Offline)</h4>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              可能原因：實機 RTSP 鏡頭離線（網關 503 錯誤）或您尚未至右上角「雲端 API」綁定並登入您的中控台。
            </p>
            <div className="flex gap-2 w-full mt-2">
              <button
                onClick={() => {
                  setStreamError(false);
                  setRetryKey(prev => prev + 1);
                }}
                className="flex-1 py-1.5 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-bold text-white rounded cursor-pointer transition-all flex items-center justify-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                重連串流
              </button>
              <button
                onClick={() => setFeedMode('simulation')}
                className="flex-1 py-1.5 px-3 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-[11px] font-bold text-blue-300 rounded cursor-pointer transition-all"
              >
                池底 AI 模擬
              </button>
            </div>
          </div>
        ) : (
          /* Canvas for rendering shrimp underwater simulation */
          <canvas ref={canvasRef} className="w-full h-full block" />
        )}

        {/* Top-Right Signal Source Selector */}
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-slate-950/90 border border-slate-700 rounded px-1.5 py-1 backdrop-blur-sm">
          <span className="text-[9px] text-[#caa45d] uppercase font-mono font-bold tracking-wider mr-1.5 hidden sm:inline">信號源:</span>
          <button 
            type="button" 
            onClick={() => setFeedMode('mjpeg')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-tight transition-all cursor-pointer ${
              feedMode === 'mjpeg'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            實機 API 串流
          </button>
          <button 
            type="button" 
            onClick={() => {
              setFeedMode('simulation');
              setStreamError(false);
            }}
            className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-tight transition-all cursor-pointer ${
              feedMode === 'simulation'
                ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-extrabold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            AI 生態模擬
          </button>
        </div>

        {/* Top Overlay Stats */}
        <div className="absolute top-2 left-2 z-10 font-mono bg-slate-950/85 backdrop-blur-md border border-slate-700/80 px-2 py-1 rounded text-[10px] text-slate-300 flex flex-col gap-0.5 pointer-events-none">
          <div className="flex justify-between gap-4">
            <span className="text-blue-400 font-semibold">{activePondId === 'pond-a' ? 'AMERA_01' : activePondId === 'pond-b' ? 'AMERA_02' : 'AMERA_03'}</span>
            <span className="text-emerald-400">REC 24H</span>
          </div>
          <div>FPS: <span className="font-bold text-white">{fps}</span></div>
          <div>LR: <span className="text-yellow-400 uppercase">AUTO</span></div>
          <div>SENS: <span className="text-slate-400">WDR+</span></div>
          <div>延遲: <span className="text-emerald-400 font-bold">{feedMode === 'mjpeg' && !streamError ? `${latency}s` : '0.00s'}</span></div>
        </div>

        {/* Centered target warning overlay if alert occurs */}
        {aeratorPowerLevel === 1 && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center z-10 pointer-events-none">
            <div className="bg-rose-950/90 border border-rose-500 px-4 py-2 rounded-lg backdrop-blur-sm shadow-lg text-center max-w-[200px] flex flex-col items-center gap-1 animate-pulse">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              <div className="font-bold text-slate-100 text-[11px]">低檔增氧警戒</div>
              <div className="text-[10px] text-slate-300">主池增氧機低速, 優值溶解氧易沉底</div>
            </div>
          </div>
        )}

        {/* Bottom Filter Controller Overlay */}
        <div className="absolute bottom-2 right-2 left-2 z-10 flex gap-1 bg-[#0F172A]/90 p-1 rounded backdrop-blur-sm border border-slate-700">
          <button
            onClick={() => setFilterMode('normal')}
            className={`flex-1 py-1 px-1.5 text-[10px] rounded transition-all font-medium ${
              filterMode === 'normal'
                ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
          >
            常規實時監控
          </button>
          <button
            onClick={() => {
              setFilterMode('bottom-hd');
              setShrimpCount(16);
            }}
            className={`flex-1 py-1 px-1.5 text-[10px] rounded transition-all font-medium flex items-center justify-center gap-1 ${
              filterMode === 'bottom-hd'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
          >
            <Eye className="w-3 h-3" />
            池底高畫質濾鏡
          </button>
          <button
            onClick={() => {
              setFilterMode('thermal');
              setShrimpCount(12);
            }}
            className={`flex-1 py-1 px-1.5 text-[10px] rounded transition-all font-medium flex items-center justify-center gap-1 ${
              filterMode === 'thermal'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-100 hover:bg-[#142844]'
            }`}
          >
            <Zap className="w-3 h-3" />
            智能熱感顯像
          </button>
        </div>
      </div>

      {/* Bottom Panel controls / stats */}
      <div className="bg-[#0F172A] p-2 flex justify-between items-center text-[11px] text-slate-400 border-t border-slate-750 font-mono">
        <div className="flex gap-3">
          <span>相機編號: <b className="text-slate-200">CAM_NODE_09A</b></span>
          <span>曝光指數: <b className="text-slate-200">ISO-200</b></span>
        </div>
        <div className="flex items-center gap-2">
          <span>夜視補光: <b className="text-emerald-400">IR ON</b></span>
          <button 
            onClick={() => setFps(fps => fps === 30.0 ? 60.0 : 30.0)}
            className="p-1 bg-slate-800 hover:bg-slate-700 rounded text-[9px] text-blue-400"
            title="開關高畫格率"
          >
            切換 60FPS
          </button>
        </div>
      </div>
    </div>
  );
}
