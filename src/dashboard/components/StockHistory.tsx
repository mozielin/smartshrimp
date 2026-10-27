/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Database, Search, Download, CheckCircle2 } from 'lucide-react';
import { PondId } from '../types';

interface RecordItem {
  time: string;
  temp: number;
  do: number;
  ph: number;
  salinity: number;
  aeratorLvl: number;
  feedKg: number;
  isNormal: boolean;
}

interface StockHistoryProps {
  activePondId: PondId;
  activePondName: string;
}

export default function StockHistory({ activePondId, activePondName }: StockHistoryProps) {
  const [activeFilter, setActiveFilter] = useState<'water' | 'equipment' | 'feed' | 'weather'>('water');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [exporting, setExporting] = useState<boolean>(false);
  const [showExportToast, setShowExportToast] = useState<boolean>(false);

  // Replicating historical telemetry records
  const waterRecords: RecordItem[] = [
    { time: '02:34', temp: 27.4, do: 7.1, ph: 7.3, salinity: 20.5, aeratorLvl: 3, feedKg: 2.2, isNormal: true },
    { time: '01:34', temp: 27.5, do: 6.8, ph: 7.1, salinity: 19.6, aeratorLvl: 2, feedKg: 0, isNormal: true },
    { time: '00:34', temp: 27.3, do: 6.8, ph: 7.3, salinity: 19.5, aeratorLvl: 2, feedKg: 2.5, isNormal: true },
    { time: '23:34', temp: 27.9, do: 7.0, ph: 7.2, salinity: 20.0, aeratorLvl: 3, feedKg: 0, isNormal: true },
    { time: '22:34', temp: 27.4, do: 6.8, ph: 7.3, salinity: 19.9, aeratorLvl: 2, feedKg: 2.0, isNormal: true },
    { time: '21:34', temp: 26.9, do: 5.2, ph: 7.1, salinity: 19.8, aeratorLvl: 1, feedKg: 1.8, isNormal: false }, // Low oxygen alert sample
    { time: '20:34', temp: 27.2, do: 6.1, ph: 7.2, salinity: 19.7, aeratorLvl: 2, feedKg: 0, isNormal: true },
  ];

  const handleTriggerExport = () => {
    if (exporting) return;
    setExporting(true);

    setTimeout(() => {
      setExporting(false);
      setShowExportToast(true);
      setTimeout(() => setShowExportToast(false), 3500);
    }, 2000);
  };

  const filteredRecords = waterRecords.filter((rec) => rec.time.includes(searchTerm));

  return (
    <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-4 shadow-sm flex flex-col justify-between h-full font-sans text-slate-200">
      {/* Header Panel */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Database className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white flex items-center gap-2 leading-tight">
                溫室歷史數據底層檢索
              </h3>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">SECURE HISTORICAL CLOUD DATABASES</p>
            </div>
          </div>
          
          <div className="text-[10px] text-blue-400 font-mono bg-[#0F172A] border border-slate-750 px-2 py-0.5 rounded tracking-wide">
            池位: {activePondName}
          </div>
        </div>

        {/* Database Filters with new styling */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-[#0F172A] rounded border border-slate-755 mb-3">
          {(['water', 'equipment', 'feed', 'weather'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`py-1 text-[10px] sm:text-[10.5px] font-semibold rounded text-center transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {filter === 'water' && '水質歷史'}
              {filter === 'equipment' && '設備運轉'}
              {filter === 'feed' && '投餵日誌'}
              {filter === 'weather' && '環境氣象'}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-2.5">
          <Search className="w-3 h-3 text-slate-500 absolute left-2 top-2 pointer-events-none" />
          <input
            type="text"
            placeholder="搜尋歷史採樣時間點 (例如: 22:34)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded text-[11px] pl-7 pr-2 py-1 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>

        {/* Telemetry Spreadsheet Table with premium design */}
        <div className="border border-slate-750 rounded overflow-hidden bg-[#0F172A] text-[11px] font-mono select-text">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#0F172A] border-b border-slate-750 text-slate-400 text-left text-[9px] uppercase tracking-wider">
                <th className="p-2 border-r border-slate-750/30 font-medium text-center">採樣時間</th>
                {activeFilter === 'water' && (
                  <>
                    <th className="p-2 border-r border-slate-750/30 font-medium">水溫 (°C)</th>
                    <th className="p-2 border-r border-slate-750/30 font-medium">溶氧 (mg/L)</th>
                    <th className="p-2 border-r border-slate-750/30 font-medium">pH 值</th>
                    <th className="p-2 font-medium">鹽度 (ppt)</th>
                  </>
                )}
                {activeFilter === 'equipment' && (
                  <>
                    <th className="p-2 border-r border-slate-750/30 font-medium">增氧擋速</th>
                    <th className="p-2 border-r border-slate-750/30 font-medium">恆溫檔位</th>
                    <th className="p-2 border-r border-slate-750/30 font-medium">反沖水洗數</th>
                    <th className="p-2 font-medium">防爆閘門</th>
                  </>
                )}
                {activeFilter === 'feed' && (
                  <>
                    <th className="p-2 border-r border-slate-750/30 font-medium">投飼劑量 (Kg)</th>
                    <th className="p-2 border-r border-slate-750/30 font-medium">投飼效率分</th>
                    <th className="p-2 border-r border-slate-750/30 font-medium">預計轉化率</th>
                    <th className="p-2 font-medium">胃容評比</th>
                  </>
                )}
                {activeFilter === 'weather' && (
                  <>
                    <th className="p-2 border-r border-slate-750/30 font-medium">氣溫 (°C)</th>
                    <th className="p-2 border-r border-slate-750/30 font-medium">相對壓力</th>
                    <th className="p-2 border-r border-slate-750/30 font-medium">雨量 (mm)</th>
                    <th className="p-2 font-medium">風級速</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((rec, i) => (
                <tr 
                  key={i} 
                  className={`border-b border-slate-800/60 hover:bg-slate-800/30 transition-all ${
                    !rec.isNormal ? 'bg-rose-500/10 text-rose-300' : 'text-slate-350'
                  }`}
                >
                  <td className="p-2 font-bold border-r border-slate-750/30 text-slate-400 text-center">{rec.time}</td>
                  
                  {activeFilter === 'water' && (
                    <>
                      <td className="p-2 border-r border-slate-750/30 text-center">{rec.temp.toFixed(1)}°C</td>
                      <td className={`p-2 border-r border-slate-750/30 text-center font-bold ${rec.do < 5.5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {rec.do.toFixed(1)}
                      </td>
                      <td className="p-2 border-r border-slate-750/30 text-center text-slate-205">{rec.ph.toFixed(1)}</td>
                      <td className="p-2 text-center text-slate-405">{rec.salinity}</td>
                    </>
                  )}

                  {activeFilter === 'equipment' && (
                    <>
                      <td className="p-2 border-r border-slate-750/30 text-center text-blue-400">F.0{rec.aeratorLvl} 擋速</td>
                      <td className="p-2 border-r border-slate-750/30 text-center text-slate-300">自動 P3 級</td>
                      <td className="p-2 border-r border-slate-750/30 text-center text-slate-300">每 12HR 常規</td>
                      <td className="p-2 text-center text-emerald-400">✔ SAFE 安全</td>
                    </>
                  )}

                  {activeFilter === 'feed' && (
                    <>
                      <td className="p-2 border-r border-slate-750/30 text-center text-slate-300">
                        {rec.feedKg > 0 ? `${rec.feedKg} Kg` : <span className="text-slate-650">-</span>}
                      </td>
                      <td className="p-2 border-r border-slate-750/30 text-center font-semibold text-slate-200">88分 優質</td>
                      <td className="p-2 border-r border-[#1c314c]/30 text-center text-emerald-400 font-mono">1.25 FCR</td>
                      <td className="p-2 text-center text-slate-405">充盈度良好</td>
                    </>
                  )}

                  {activeFilter === 'weather' && (
                    <>
                      <td className="p-2 border-r border-slate-750/30 text-center">{(rec.temp + 1.2).toFixed(1)} °C</td>
                      <td className="p-2 border-r border-slate-750/30 text-center">1008 hPa</td>
                      <td className="p-2 border-r border-slate-750/30 text-center text-blue-400">{rec.time === '02:34' ? '5' : '2'} mm</td>
                      <td className="p-2 text-center text-slate-300">NE 東北 2級</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Database control details with export simulation */}
      <div className="mt-3">
        <button
          onClick={handleTriggerExport}
          disabled={exporting}
          className={`w-full py-2.5 rounded border font-bold text-xs flex justify-center items-center gap-2 transition-all cursor-pointer ${
            exporting
              ? 'bg-amber-600/20 border-amber-500/20 text-amber-305'
              : 'bg-blue-600 hover:bg-blue-500 border-blue-500 text-white shadow-sm'
          }`}
        >
          {exporting ? (
            <span className="flex items-center gap-1.5 animate-pulse">
              <svg className="animate-spin h-3.5 w-3.5 text-amber-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              匯集 120H 歷史遙測數據生成中...
            </span>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>匯出成全池 Excel / CSV 電文報表</span>
            </>
          )}
        </button>
      </div>

      {/* Export notification system toast */}
      {showExportToast && (
        <div className="fixed bottom-4 right-4 bg-slate-900 border border-slate-700 px-4 py-3 rounded shadow-2xl z-50 flex items-center gap-3 animate-slideIn">
          <div className="p-1 rounded bg-slate-800 border border-slate-700 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs">遙測數據封包生成成功！</h4>
            <p className="text-[10px] text-slate-500 font-mono">POND_TELEMETRY_SHEET_{activePondId.toUpperCase()}_0604.csv (42 KB)</p>
          </div>
        </div>
      )}
    </div>
  );
}
