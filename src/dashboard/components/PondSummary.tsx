/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Award, QrCode, Printer, CheckCircle2 } from 'lucide-react';
import { PondInfo } from '../types';

interface PondSummaryProps {
  pond: PondInfo;
  onUpdatePondMetric: (metricKey: keyof PondInfo, newValue: number) => void;
}

export default function PondSummary({ pond, onUpdatePondMetric }: PondSummaryProps) {
  const [activeTab, setActiveTab] = useState<'totals' | 'growth' | 'samples' | 'qr'>('totals');
  const [interactiveAge, setInteractiveAge] = useState<number>(pond.shrimpAgeDays);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  // Recalculate estimated shrimp biomass weight based on days
  const estimateAvgWeight = (days: number) => {
    if (days <= 15) return 0.2 + (days * 0.05);
    if (days <= 45) return 1.0 + ((days - 15) * 0.3);
    return 10.0 + ((days - 45) * 0.4);
  };

  const getGrowthStatusText = (days: number) => {
    if (days <= 20) return '幼苗定植適應期 (觀察關鍵)';
    if (days <= 50) return '快速蛻甲高生長幅期 (需鈣肥監護)';
    if (days <= 80) return '中後期肥美積累期';
    return '飽滿熟成上市採收期 (準備收捕)';
  };

  const avgWeight = estimateAvgWeight(interactiveAge);
  const totalBiomassKg = Math.round((pond.estimatedCount * avgWeight) / 1000);

  return (
    <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-4 shadow-sm flex flex-col justify-between h-full font-sans text-slate-200">
      {/* Header Info */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Heart className="w-5 h-5 text-blue-400 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-white flex items-center gap-2 leading-tight">
                智慧養殖履歷與密度管理
              </h3>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">SMART AQUA-FARMING LIFE LOGS &amp; DENSITY</p>
            </div>
          </div>
          
          <span className="bg-blue-600/15 border border-blue-500/30 text-blue-405 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
            池蝦齡: {interactiveAge} 天
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-[#0F172A] rounded border border-slate-750 mb-3">
          {(['totals', 'growth', 'samples', 'qr'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-1 text-[10px] font-semibold rounded text-center transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab === 'totals' && '養殖數量'}
              {tab === 'growth' && '生長狀況'}
              {tab === 'samples' && '樣本檢驗'}
              {tab === 'qr' && '批次 QR'}
            </button>
          ))}
        </div>

        {/* Tab content 1: Totals */}
        {activeTab === 'totals' && (
          <div className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              {/* Box 1: Estimated survives */}
              <div className="bg-[#0F172A] border border-slate-750 p-3 rounded text-center">
                <p className="text-[10px] text-slate-405 font-medium">在養存活總數估計</p>
                <p className="text-xl font-extrabold font-mono text-white my-1">
                  {pond.estimatedCount.toLocaleString()} <span className="text-xs font-normal text-slate-400">尾</span>
                </p>
                <span className="text-[9px] text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/10 px-1.5 py-0.5 rounded">
                  預計合約育成率 85%
                </span>
              </div>

              {/* Box 2: Average density */}
              <div className="bg-[#0F172A] border border-slate-750 p-3 rounded text-center">
                <p className="text-[10px] text-slate-405 font-medium">在養平均密度</p>
                <p className="text-xl font-extrabold font-mono text-white my-1">
                  {pond.density} <span className="text-xs font-normal text-slate-400">尾/m²</span>
                </p>
                <span className="text-[9px] text-blue-400 font-medium bg-blue-500/10 border border-blue-500/10 px-1.5 py-0.5 rounded">
                  溫室雙重溢流最佳解
                </span>
              </div>
            </div>

            {/* Shrimp Age Adjuster (Manager Scenario Control) */}
            <div className="bg-[#0F172A] border border-slate-750 p-2.5 rounded text-xs">
              <div className="flex justify-between items-center text-slate-400 text-[11px] mb-1.5">
                <span>蝦齡履歷模擬器 (調整重量規格)</span>
                <span className="text-blue-400 font-bold font-mono">{interactiveAge} 天生長期</span>
              </div>
              <input
                type="range"
                min="5"
                max="110"
                step="1"
                value={interactiveAge}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setInteractiveAge(val);
                  onUpdatePondMetric('shrimpAgeDays', val);
                  const calculatedSurvival = Math.max(72, Math.round(96 - (val * 0.15)));
                  onUpdatePondMetric('estimatedSurvival', calculatedSurvival);
                }}
                className="w-full accent-blue-505 h-1 cursor-pointer bg-slate-800 rounded"
              />
              <div className="flex justify-between text-[8px] text-slate-500 font-mono mt-1">
                <span>幼苗放養 (D.5)</span>
                <span>中期生長 (D.45)</span>
                <span>熟成收穫 (D.110)</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab content 2: Growth */}
        {activeTab === 'growth' && (
          <div className="bg-[#0F172A] border border-slate-750 p-3 rounded text-xs space-y-2.5">
            <h4 className="font-semibold text-slate-300 border-b border-slate-800 pb-1 flex items-center justify-between">
              <span>蝦齡 {interactiveAge} 天生長特寫</span>
              <span className="text-xs text-blue-400 font-bold font-mono">D.{interactiveAge}</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
              <div className="bg-slate-900 py-1.5 px-1 rounded border border-slate-800">
                <p className="text-slate-500">估算平均單隻重量</p>
                <p className="text-sm font-bold text-white mt-1 font-mono">{avgWeight.toFixed(2)} g</p>
              </div>
              <div className="bg-slate-900 py-1.5 px-1 rounded border border-slate-800">
                <p className="text-slate-500">預計總存活生物總量</p>
                <p className="text-sm font-bold text-blue-400 mt-1 font-mono">{totalBiomassKg.toLocaleString()} 公斤</p>
              </div>
            </div>
            <div className="p-2 bg-slate-900/60 border border-slate-800 rounded text-[11px] text-slate-400 leading-normal">
              <span className="text-amber-500 font-bold block mb-0.5">當前化學/生長生理分期:</span>
              {getGrowthStatusText(interactiveAge)}
            </div>
          </div>
        )}

        {/* Tab content 3: Samples */}
        {activeTab === 'samples' && (
          <div className="bg-[#0F172A] border border-slate-750 p-3 rounded text-xs space-y-2.5">
            <h4 className="font-semibold text-slate-300 border-b border-slate-800 pb-1 flex items-center justify-between">
              <span>最近一次生化標本抽檢記錄</span>
              <span className="text-[10px] text-slate-500 font-mono">2026-06-03</span>
            </h4>
            
            <div className="space-y-1.5 text-[11px] font-mono">
              <div className="flex justify-between border-b border-slate-800 py-1">
                <span className="text-slate-400">平均蝦殼鈣化係數:</span>
                <span className="text-emerald-400 font-bold">94% (硬殼率佳)</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 py-1">
                <span className="text-slate-400">腸胃充盈饱满評比:</span>
                <span className="text-slate-200">88分 (攝食意願劇烈)</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 py-1">
                <span className="text-slate-400">病原體篩檢 (WSSV / AHPND):</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">✔ 陰性安全</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab content 4: QR traces */}
        {activeTab === 'qr' && (
          <div className="bg-[#0F172A] border border-slate-750 p-3 rounded text-xs flex flex-col items-center text-center space-y-2">
            <div className="p-1 px-1.5 bg-white rounded flex items-center justify-center border border-slate-300">
              <QrCode className="w-16 h-16 text-slate-900" />
            </div>
            
            <div>
              <p className="font-bold text-slate-300 font-mono text-[10px]">池批鎖定碼: AQ-SF-{pond.id === 'pond-a' ? 'A094' : 'B082'}</p>
              <p className="text-[9px] text-slate-500 mt-1">此條碼與生產溯源平臺自動連線綁定</p>
            </div>

            <button
              onClick={() => setShowCertificate(true)}
              className="py-1 px-2.5 rounded bg-blue-150 text-blue-400 hover:text-white border border-blue-500/20 text-[10px] font-bold cursor-pointer flex items-center gap-1 mt-1"
            >
              <Printer className="w-3.5 h-3.5" />
              生成履歷認證書
            </button>
          </div>
        )}
      </div>

      {/* Static text block on hyper density parameters */}
      <div className="mt-3.5 bg-slate-900/40 border border-slate-800 p-3 rounded">
        <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1 mb-1 leading-tight">
          <Award className="w-4 h-4 text-emerald-400 animate-pulse" />
          超臨界高密度養殖參數
        </h4>
        <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
          本池採自主研發的<b>「雙重逆循環增氧室內池系統」</b>，通過定時排污與全密閉循環，可達成常規露天土池 <b>8 - 10 倍</b>的超限高密度，保證養殖期溶氧度飽滿。
        </p>
      </div>

      {/* Virtual overlay modal showing generated farming certificate */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 p-5 rounded max-w-sm w-full text-center relative shadow-xl text-slate-200">
            <div className="absolute top-2.5 right-2.5">
              <button 
                onClick={() => setShowCertificate(false)}
                className="py-0.5 px-2 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded text-[10px] border border-slate-700 cursor-pointer"
              >
                關閉
              </button>
            </div>

            <div className="flex justify-center mb-2">
              <CheckCircle2 className="w-9 h-9 text-emerald-400" />
            </div>

            <h3 className="font-extrabold text-white text-sm">中華民國智慧水產溯源安全證書</h3>
            <p className="text-[9px] text-slate-500 font-mono mt-0.5 uppercase tracking-wider">SMART AQUA TRACEABILITY CERTIFICATE</p>

            <div className="border-t border-b border-slate-800 my-3 py-2 text-left text-xs font-mono space-y-1">
              <div>溯源池號: <span className="text-blue-400">{pond.name} - ({pond.id.toUpperCase()})</span></div>
              <div>在養品種: <span className="text-slate-100">{pond.shrimpType}</span></div>
              <div>当前蝦齡: <span className="text-slate-100">{interactiveAge} 天 (D.{interactiveAge})</span></div>
              <div>標本規格: <span className="text-emerald-400">{avgWeight.toFixed(2)} 克/尾</span></div>
              <div>疾病抗原複檢: <span className="text-emerald-400 font-bold">陰性安全 (合格)</span></div>
              <div>智能履歷校正: <span className="text-slate-400">已由智慧多重水質測量校核</span></div>
            </div>

            <div className="flex justify-center bg-white p-1 rounded w-20 h-20 mx-auto my-3 border border-slate-300">
              <QrCode className="w-full h-full text-slate-950" />
            </div>

            <p className="text-[9px] text-slate-500">
              加盟商: 智養水產溫室研究基地（簽核核可）
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
