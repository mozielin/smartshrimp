/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Terminal, Brain, ArrowUpRight, Activity } from 'lucide-react';
import { SystemLog } from '../types';

interface AiForecastProps {
  logs: SystemLog[];
  onAddLog: (newLog: SystemLog) => void;
}

export default function AiForecast({ logs, onAddLog }: AiForecastProps) {
  const [filter, setFilter] = useState<'all' | 'warning' | 'info'>('all');
  const [aiAnalyzing, setAiAnalyzing] = useState<boolean>(false);
  const [analyzedReport, setAnalyzedReport] = useState<string>('');

  // Simulated live notification pool
  const notificationPool = [
    { type: 'info' as const, category: 'water' as const, message: '全池高智能水質平衡調節閘閥已閉合，鹽度穩定。' },
    { type: 'warning' as const, category: 'equipment' as const, message: '檢測到 2 號輔助增氧機發熱量輕微上升 3%，系統已自動調度。' },
    { type: 'success' as const, category: 'ai' as const, message: 'AI 生物轉換率(FCR)解算完成：當前為 1.22，處於歷史最優區間。' },
    { type: 'critical' as const, category: 'water' as const, message: '警告：檢測到水底排污管道輕微堵塞，建議定時手動清淤。' },
  ];

  // Automated log generation every 20 seconds to keep the terminal feeling live
  useEffect(() => {
    const logInterval = setInterval(() => {
      const chosen = notificationPool[Math.floor(Math.random() * notificationPool.length)];
      const nextId = 'log-' + Math.random().toString(36).substring(2, 9);
      
      onAddLog({
        id: nextId,
        timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        pondId: Math.random() > 0.5 ? 'pond-a' : 'pond-b',
        type: chosen.type,
        message: chosen.message,
        category: chosen.category
      });
    }, 20000);

    return () => clearInterval(logInterval);
  }, [onAddLog]);

  const handleTriggerAiDiagnose = () => {
    if (aiAnalyzing) return;
    setAiAnalyzing(true);
    setAnalyzedReport('🧠 正在建立大模型連線，解算水質物理參數與生物代謝特徵...');

    const lines = [
      '▶ 讀取當前遙測數據：池溫 27.6°C、溶氧 6.8 mg/L、氣壓 1012 hPa。',
      '▶ 分析曝氣流場速率：大氣氣動溶解效能 94%，葉輪阻抗穩定。',
      '▶ 生理健康及高頻期：白蝦脫殼生長週期正常，礦物質吸收係數良好。',
      '▶ 智能控制建議：在即將到來的夜間氣壓波動前，建議增氧機維持當前進度。'
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < lines.length) {
        setAnalyzedReport(prev => {
          if (currentIdx === 0) {
            return '🧠 正在建立大模型連線，解算水質物理參數與生物代謝特徵...\n' + lines[0];
          }
          return prev + '\n' + lines[currentIdx];
        });
        currentIdx++;
      } else {
        clearInterval(interval);
        setAiAnalyzing(false);
      }
    }, 700);
  };

  const getLogColorClass = (type: string) => {
    switch (type) {
      case 'critical': return 'text-rose-400 bg-rose-500/10 border-l-2 border-rose-500';
      case 'warning': return 'text-amber-400 bg-amber-500/10 border-l-2 border-amber-500';
      case 'success': return 'text-emerald-400 bg-emerald-500/10 border-l-2 border-emerald-500';
      default: return 'text-slate-300 bg-slate-900 border-l-2 border-blue-500';
    }
  };

  const filteredLogs = logs.filter((log) => {
    if (filter === 'all') return true;
    if (filter === 'warning') return log.type === 'warning' || log.type === 'critical';
    return log.type === 'info' || log.type === 'success';
  });

  return (
    <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-4 shadow-sm flex flex-col justify-between h-full font-sans text-slate-200">
      {/* Header Block */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Brain className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white flex items-center gap-2 leading-tight">
                AI 預警提示與智能診斷員
              </h3>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">REALTIME AI ALARM &amp; SYSTEMS TERMINAL</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse mr-1" />
            <span className="font-mono text-[9px] text-blue-400 font-bold uppercase">AI_ENGINE_READY</span>
          </div>
        </div>

        {/* Diagnostic Action Button */}
        <div className="bg-[#0F172A] border border-slate-750 p-3 rounded mb-3">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
            <span className="font-semibold text-slate-300 flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              雲端池底 AI 交叉遙測
            </span>
            <span className="text-[10px] text-slate-500 font-mono">排程計時：每 20s 自動更新</span>
          </div>

          <button
            onClick={handleTriggerAiDiagnose}
            disabled={aiAnalyzing}
            className={`w-full py-2 rounded font-bold text-xs flex justify-center items-center gap-1.5 transition-all text-white border cursor-pointer ${
              aiAnalyzing
                ? 'bg-amber-600/30 border-amber-500/30 text-amber-300 animate-pulse'
                : 'bg-blue-600 hover:bg-blue-500 active:scale-[0.99] border-blue-500 shadow-sm'
            }`}
          >
            {aiAnalyzing ? (
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                聯通生物大模型 交叉運算中...
              </span>
            ) : (
              '立即召喚 AI 智慧診斷本池'
            )}
          </button>

          {/* Scrolling output box */}
          {analyzedReport && (
            <div className="mt-2.5 p-2 bg-slate-900 border border-slate-850 rounded font-mono text-[10px] text-emerald-450 whitespace-pre-line leading-relaxed max-h-[110px] overflow-y-auto custom-scrollbar">
              {analyzedReport}
            </div>
          )}
        </div>

        {/* Real-time ticker list tabs */}
        <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-750 pb-2 mb-2">
          <span>實時硬體/水質動態廣播：</span>
          <div className="flex gap-2 font-mono">
            <button 
              onClick={() => setFilter('all')} 
              className={`px-1.5 py-0.5 rounded cursor-pointer ${filter === 'all' ? 'text-blue-400 font-bold bg-slate-900 border border-blue-500/20' : 'text-slate-400 hover:text-slate-200'}`}
            >
              全部
            </button>
            <button 
              onClick={() => setFilter('warning')} 
              className={`px-1.5 py-0.5 rounded cursor-pointer ${filter === 'warning' ? 'text-amber-400 font-bold bg-slate-900 border border-amber-500/20' : 'text-slate-400 hover:text-slate-200'}`}
            >
              異常預警
            </button>
            <button 
              onClick={() => setFilter('info')} 
              className={`px-1.5 py-0.5 rounded cursor-pointer ${filter === 'info' ? 'text-blue-400 font-bold bg-slate-900 border border-blue-500/20' : 'text-slate-400 hover:text-slate-200'}`}
            >
              常規
            </button>
          </div>
        </div>

        {/* Event Scroll listing */}
        <div className="space-y-1.5 h-[140px] overflow-y-auto custom-scrollbar pr-0.5">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className={`p-2 rounded text-[10px] leading-tight font-sans border border-slate-705/30 ${getLogColorClass(
                log.type
              )}`}
            >
              <div className="flex justify-between items-center mb-1 font-mono text-[9px]">
                <span className="font-bold flex items-center gap-1 text-slate-400">
                  [場域 {log.pondId === 'pond-a' ? 'A' : 'B'}] {log.category.toUpperCase()}
                </span>
                <span className="text-slate-500">{log.timestamp}</span>
              </div>
              <p className="text-slate-200">{log.message}</p>
            </div>
          ))}
          {filteredLogs.length === 0 && (
            <div className="py-6 text-center text-xs text-slate-500 font-mono">
              暫無對應層級的廣播通訊
            </div>
          )}
        </div>
      </div>

      {/* Footer statistics */}
      <div className="mt-3 bg-[#0F172A] border border-slate-750 px-2.5 py-1.5 rounded flex justify-between text-[10.5px]">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          <span>在線總場域：<b className="text-white font-mono">3 個</b></span>
        </div>
        <div className="flex items-center gap-1 border-x border-slate-755 px-3">
          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          <span>系統預警：<b className="text-amber-400 font-mono font-bold">2 處</b></span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
          <span>設備異常：<b className="text-rose-400 font-mono font-bold">0 處</b></span>
        </div>
      </div>
    </div>
  );
}
