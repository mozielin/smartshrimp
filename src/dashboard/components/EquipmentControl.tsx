/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Settings, Cpu, ToggleLeft, Activity, Radio, Play, CheckCircle, Flame, ShieldAlert, Sparkles } from 'lucide-react';
import { EquipmentState, PondId } from '../types';

interface EquipmentControlProps {
  activePondId: PondId;
  activePondName: string;
  equipmentState: EquipmentState;
  onUpdateEquipment: (key: keyof EquipmentState, val: any) => void;
  onForceFeed: (amountGrams: number) => void;
}

export default function EquipmentControl({
  activePondId,
  activePondName,
  equipmentState,
  onUpdateEquipment,
  onForceFeed
}: EquipmentControlProps) {
  const [feedingProgress, setFeedingProgress] = useState<boolean>(false);
  const [feedGrams, setFeedGrams] = useState<number>(350);

  const handleTriggerInstantFeed = () => {
    if (feedingProgress) return;
    setFeedingProgress(true);
    
    // Simulate interactive motor spinning countdown representing feed dropping
    setTimeout(() => {
      onForceFeed(feedGrams);
      setFeedingProgress(false);
    }, 2800);
  };

  const getPowerLevelLabel = (level: number) => {
    switch (level) {
      case 1: return '節能檔速 (低)';
      case 2: return '常規運行 (中)';
      case 3: return '加強對流 (高)';
      case 4: return '超限增氧 (極高)';
      default: return '未知';
    }
  };

  return (
    <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-4 shadow-sm flex flex-col justify-between h-full text-slate-200">
      {/* Header Info */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Cpu className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white flex items-center gap-2 leading-tight">
                智能設備監控與控制中控
              </h3>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">AERATION, FEEDING &amp; THERMO CONTROL SYSTEMS</p>
            </div>
          </div>
          
          <button 
            onClick={() => onUpdateEquipment('aeratorPowerLevel', Math.min(4, equipmentState.aeratorPowerLevel + 1) === 4 ? 1 : equipmentState.aeratorPowerLevel + 1)}
            className="p-1.5 rounded bg-slate-705 text-blue-300 hover:text-white hover:bg-slate-600 transition-all font-mono text-[10px] border border-slate-600 flex items-center gap-1 cursor-pointer"
            title="全部重啟調和"
          >
            <Activity className="w-3.5 h-3.5 animate-spin" />
            <span>智能調和</span>
          </button>
        </div>

        {/* 1. Aerator Power controls */}
        <div className="bg-[#0F172A] border border-slate-755 p-3 rounded-lg mb-3">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
            <span className="font-semibold text-slate-300">智慧逆循環增氧機群 (Aerators)</span>
            <span className="text-[10px] text-blue-400 font-mono">
              全池轉速評比: <b className="text-white font-mono">{equipmentState.aeratorPowerLevel * 25}%</b>
            </span>
          </div>

          {/* Three independent aerator spinners visually showing active status */}
          <div className="grid grid-cols-3 gap-2 text-center mb-3">
            {/* Aerator 1 */}
            <div className="bg-[#1E293B] border border-slate-705 p-2 rounded flex flex-col items-center justify-between">
              <div className="text-[9px] text-slate-400 font-medium">1 號主增氧機</div>
              <svg 
                className={`w-8 h-8 my-1.5 text-blue-500 fill-blue-500/10 ${equipmentState.aeratorPowerLevel > 0 ? 'animate-spin' : ''}`}
                style={{ animationDuration: `${2.0 / equipmentState.aeratorPowerLevel}s` }}
                viewBox="0 0 24 24"
              >
                <path d="M12 2v10M12 12l7-7M12 12l-7 7M12 12l7 7M12 12l-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="3" fill="#3b82f6" />
              </svg>
              <button
                onClick={() => onUpdateEquipment('aerator1', equipmentState.aerator1 === 'on' ? 'off' : 'on')}
                className={`text-[9px] px-2 py-0.5 rounded cursor-pointer ${
                  equipmentState.aerator1 === 'on' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold' 
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {equipmentState.aerator1 === 'on' ? '運轉中' : '常關'}
              </button>
            </div>

            {/* Aerator 2 */}
            <div className="bg-[#1E293B] border border-slate-705 p-2 rounded flex flex-col items-center justify-between">
              <div className="text-[9px] text-slate-400 font-medium">2 號副增氧機</div>
              <svg 
                className={`w-8 h-8 my-1.5 text-blue-505 fill-blue-500/10 ${equipmentState.aeratorPowerLevel > 0 ? 'animate-spin' : ''}`}
                style={{ animationDuration: `${2.2 / equipmentState.aeratorPowerLevel}s` }}
                viewBox="0 0 24 24"
              >
                <path d="M12 2v10M12 12l7-7M12 12l-7 7M12 12l7 7M12 12l-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="3" fill="#3b82f6" />
              </svg>
              <button
                onClick={() => onUpdateEquipment('aerator2', equipmentState.aerator2 === 'on' ? 'off' : 'on')}
                className={`text-[9px] px-2 py-0.5 rounded cursor-pointer ${
                  equipmentState.aerator2 === 'on' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold' 
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {equipmentState.aerator2 === 'on' ? '運轉中' : '常關'}
              </button>
            </div>

            {/* Aerator 3 */}
            <div className="bg-[#1E293B] border border-slate-705 p-2 rounded flex flex-col items-center justify-between">
              <div className="text-[9px] text-slate-400 font-medium">底部對流風機</div>
              <svg 
                className={`w-8 h-8 my-1.5 text-blue-500 fill-blue-500/10 ${equipmentState.aeratorPowerLevel > 1 ? 'animate-spin' : ''}`}
                style={{ animationDuration: `${3.0 / Math.max(1, equipmentState.aeratorPowerLevel - 1)}s` }}
                viewBox="0 0 24 24"
              >
                <path d="M12 2v10M12 12l7-7M12 12l-7 7M12 12l7 7M12 12l-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="3" fill="#2563eb" />
              </svg>
              <button
                onClick={() => onUpdateEquipment('aerator3', equipmentState.aerator3 === 'on' ? 'off' : 'on')}
                className={`text-[9px] px-2 py-0.5 rounded cursor-pointer ${
                  equipmentState.aerator3 === 'on' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold' 
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {equipmentState.aerator3 === 'on' ? '運轉中' : '常關'}
              </button>
            </div>
          </div>

          {/* Core interactive power level switches */}
          <div className="bg-slate-900 p-2 border border-slate-800 rounded">
            <div className="flex justify-between items-center text-[11px] text-slate-400 mb-1.5">
              <span>智能擋速手動選定檔位:</span>
              <span className="font-mono text-blue-400 font-bold">{getPowerLevelLabel(equipmentState.aeratorPowerLevel)}</span>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => onUpdateEquipment('aeratorPowerLevel', lvl)}
                  className={`flex-1 py-1 rounded text-xs font-mono font-bold transition-all border duration-150 cursor-pointer ${
                    equipmentState.aeratorPowerLevel === lvl
                      ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                      : 'bg-[#0F172A] text-slate-400 border-slate-750 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  F.{lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Feeding Machine control */}
        <div className="bg-[#0F172A] border border-slate-755 p-3 rounded-lg mb-3">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
            <span className="font-semibold text-slate-300">雲端智能投餌系統 (Cloud Feeding)</span>
            <span className="text-[10px] text-emerald-405 font-mono">自動定時: {equipmentState.autoFeeder ? '開啟(120分/次)' : '常關'}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-2.5">
            <div>
              <label className="block text-[10px] text-slate-500 mb-1">投研劑量 (克/池):</label>
              <div className="flex items-center gap-1">
                <input 
                  type="number" 
                  value={feedGrams} 
                  onChange={(e) => setFeedGrams(Math.max(10, parseInt(e.target.value) || 0))}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 font-mono focus:outline-none focus:border-blue-500 text-center" 
                />
                <span className="text-xs text-slate-400 font-mono">g</span>
              </div>
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 mb-1 font-sans">排定投餌間隔 (分鐘):</label>
              <select
                value={equipmentState.feederInterval}
                onChange={(e) => onUpdateEquipment('feederInterval', parseInt(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono text-center cursor-pointer"
              >
                <option value={60}>60 分</option>
                <option value={120}>120 分</option>
                <option value={180}>180 分</option>
              </select>
            </div>
          </div>

          {/* Feed trigger */}
          <button
            onClick={handleTriggerInstantFeed}
            disabled={feedingProgress}
            className={`w-full py-2.5 rounded border font-semibold text-xs flex justify-center items-center gap-2 transition-all cursor-pointer ${
              feedingProgress
                ? 'bg-amber-955/20 border-amber-500/20 text-amber-300 animate-pulse'
                : 'bg-blue-600 hover:bg-blue-500 hover:scale-[1.01] active:scale-[0.99] border-blue-500 text-white font-bold shadow-md'
            }`}
          >
            {feedingProgress ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>雲端閥門旋開 投料中 ({feedGrams}g)...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current text-blue-200" />
                <span>立即啟動一鍵雲端強制投餵 ({feedGrams}g)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Global Pump states and Thermal heating status */}
      <div className="grid grid-cols-2 gap-2 mt-1">
        {/* Water pump logic */}
        <div className="bg-[#0F172A] border border-slate-750 p-2.5 rounded flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 leading-tight">循環水淨化泵</p>
            <p className="text-xs font-mono font-bold text-emerald-400 mt-1">自動運作中</p>
          </div>
          <button
            onClick={() => {
              const nextPump = equipmentState.waterPump === 'on' ? 'off' : equipmentState.waterPump === 'off' ? 'auto' : 'on';
              onUpdateEquipment('waterPump', nextPump);
            }}
            className={`px-2 py-1 rounded text-[10px] font-semibold font-mono cursor-pointer transition-all ${
              equipmentState.waterPump === 'auto'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : equipmentState.waterPump === 'on'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'bg-slate-850 text-slate-500 border border-slate-758'
            }`}
          >
            {equipmentState.waterPump === 'auto' ? 'AUTO' : equipmentState.waterPump === 'on' ? '強開' : '常關'}
          </button>
        </div>

        {/* Chiller target */}
        <div className="bg-[#0F172A] border border-slate-750 p-2.5 rounded flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 leading-tight">恆溫加熱氣閥</p>
            <p className="text-xs font-mono font-bold text-rose-450 mt-1">加熱啟動 (P3)</p>
          </div>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-400 animate-pulse">
            <Flame className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
