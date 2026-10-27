/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, DollarSign, TrendingUp, TrendingDown, Volume2, Info, ArrowUpRight, Award, Sparkles } from 'lucide-react';
import { MarketTicker } from '../types';

export default function MarketQuotes() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Real ticker listing replicating the exact colors and numbers of screenshots
  const [tickers, setTickers] = useState<MarketTicker[]>([
    {
      id: 'ws-prem',
      name: '頂級無毒白蝦',
      code: 'WS.PREM',
      price: 360,
      change: 2.27,
      volume24h: 12500,
      highest: 368,
      lowest: 350,
      yesterdayBase: 352,
      openGuide: 353,
      details: '智慧溫室專利高密度外溫室養殖，無添加抗生素，甲殼飽滿，肉質 Q 彈厚實。',
      history24h: [352, 354, 353, 350, 351, 355, 358, 362, 361, 360, 361, 360, 360]
    },
    {
      id: 'bt-select',
      name: '特選超大草蝦',
      code: 'BT.SELECT',
      price: 520,
      change: -1.52,
      volume24h: 8400,
      highest: 535,
      lowest: 518,
      yesterdayBase: 528,
      openGuide: 530,
      details: '特選珍貴黑虎草蝦，高蛋白藻水深池養殖，隻隻肥美，超大規格極致海味代表。',
      history24h: [528, 532, 535, 533, 530, 526, 522, 520, 519, 520, 521, 520, 520]
    },
    {
      id: 'gp-blue',
      name: '黃金泰國蝦',
      code: 'GP.BLUE',
      price: 430,
      change: 3.61,
      volume24h: 9800,
      highest: 432,
      lowest: 412,
      yesterdayBase: 415,
      openGuide: 418,
      details: '深層流速砂質底養殖，公蝦蝦螯亮藍饱满，蝦膏濃醇鮮甜，極受餐廳商行熱烈競標。',
      history24h: [415, 412, 416, 420, 422, 425, 422, 426, 429, 432, 431, 430, 430]
    },
    {
      id: 'kp-japan',
      name: '頂級日本明蝦',
      code: 'KP.JAPAN',
      price: 880,
      change: 0.57,
      volume24h: 3100,
      highest: 890,
      lowest: 875,
      yesterdayBase: 875,
      openGuide: 878,
      details: '低溫純淨海水循環流，日本引進頂級黑斑明蝦，頂奢熟食居酒屋第一首選珍貴海味。',
      history24h: [875, 878, 880, 885, 890, 888, 882, 879, 876, 880, 882, 880, 880]
    }
  ]);

  const [activeId, setActiveId] = useState<string>('ws-prem');

  // Find the currently clicked shrimp for active details
  const activeTicker = tickers.find((t) => t.id === activeId) || tickers[0];

  // Manual bidding simulator corresponding to physical big screens where price updates on-tick
  const handleSimulateBidTick = () => {
    setTickers((prev) => 
      prev.map((t) => {
        const isUp = Math.random() > 0.45;
        const changeAmt = parseFloat((Math.random() * 2.5).toFixed(1));
        const finalPrice = isUp ? t.price + changeAmt : t.price - changeAmt;
        const finalChange = parseFloat((((finalPrice - t.yesterdayBase) / t.yesterdayBase) * 100).toFixed(2));
        const finalHistory = [...t.history24h.slice(1), finalPrice];
        
        return {
          ...t,
          price: parseFloat(finalPrice.toFixed(1)),
          change: finalChange,
          highest: finalPrice > t.highest ? parseFloat(finalPrice.toFixed(1)) : t.highest,
          lowest: finalPrice < t.lowest ? parseFloat(finalPrice.toFixed(1)) : t.lowest,
          history24h: finalHistory
        };
      })
    );
  };

  // Filter lists based on user searching query
  const filteredTickers = tickers.filter(
    (t) =>
      t.name.includes(searchTerm) ||
      t.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Map prices to coordinate segments
  const drawLinePath = (history: number[], base: number, width: number, height: number) => {
    const minVal = Math.min(...history) * 0.98;
    const maxVal = Math.max(...history) * 1.02;
    const valRange = maxVal - minVal || 10;

    return history
      .map((val, idx) => {
        const x = (idx / (history.length - 1)) * width;
        const percent = (val - minVal) / valRange;
        const y = height - percent * height;
        return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  return (
    <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-4 shadow-sm flex flex-col justify-between h-full font-sans text-slate-200">
      <div>
        {/* Header Block */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 flex items-center gap-2 leading-tight">
                蝦市即時交易報價
              </h3>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">REAL-TIME BIDDING MARKET &amp; ANALYTICS</p>
            </div>
          </div>
          
          <div className="flex gap-2 items-center">
            <button 
              onClick={handleSimulateBidTick}
              className="p-1 px-2 text-[9px] bg-blue-500/10 text-blue-400 hover:text-white border border-blue-500/20 rounded cursor-pointer hover:bg-blue-600/40 transition-all font-mono flex items-center gap-1 font-bold scale-95"
            >
              <ArrowUpRight className="w-3 h-3 text-blue-400 animate-pulse" />
              模擬價位跳動
            </button>
            <span className="bg-emerald-555 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded animate-pulse">
              蝦價交易中
            </span>
          </div>
        </div>

        {/* Horizontal Quick Search Bar */}
        <div className="relative mb-3 flex items-center">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="搜尋蝦類代號或名稱 (如: 白蝦, WS)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-705 rounded pl-8 pr-3 py-1 text-xs text-slate-300 focus:outline-none focus:border-blue-500 placeholder-slate-600 transition-all font-sans"
          />
        </div>

        {/* 2x2 Ticket grid list */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {filteredTickers.map((ticker) => {
            const isSelected = ticker.id === activeId;
            const isUp = ticker.change >= 0;
            return (
              <div
                key={ticker.id}
                onClick={() => setActiveId(ticker.id)}
                className={`p-2.5 rounded border transition-all cursor-pointer select-none flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800 border-blue-550 shadow-sm font-semibold'
                    : 'bg-[#0F172A] border-slate-750 hover:bg-slate-800'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-200 text-xs truncate leading-tight">{ticker.name}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">{ticker.code}</span>
                  </div>
                  {isUp ? (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-405 shrink-0" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-rose-455 shrink-0" />
                  )}
                </div>

                <div className="mt-2 flex justify-between items-baseline">
                  <span className="text-sm font-bold font-mono text-slate-100">${ticker.price}</span>
                  <span
                    className={`text-[9px] font-bold font-mono px-1 rounded ${
                      isUp
                        ? 'text-emerald-400 bg-emerald-950/20 border border-emerald-500/20'
                        : 'text-rose-400 bg-rose-950/20 border border-rose-500/20'
                    }`}
                  >
                    {isUp ? '+' : ''}
                    {ticker.change.toFixed(2)}%
                  </span>
                </div>
              </div>
            );
          })}
          {filteredTickers.length === 0 && (
            <div className="col-span-2 py-4 text-center text-xs text-slate-500">
              無符合代碼的蝦種資料
            </div>
          )}
        </div>
      </div>

      {/* Selected Detailed Quote Panel */}
      <div className="bg-[#0F172A] border border-slate-750 p-3 rounded">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[10px] text-slate-450 font-mono tracking-wider uppercase flex items-center gap-1 mb-0.5">
              <Award className="w-3 h-3 text-blue-400" />
              當年度競標焦點蝦種
            </div>
            <h4 className="font-extrabold text-slate-100 text-sm flex items-center gap-1.5 leading-tight">
              {activeTicker.code} <span className="text-xs text-slate-400 font-normal">({activeTicker.name})</span>
            </h4>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400">成交量 (24H)</span>
            <p className="text-xs font-bold font-mono text-slate-100">{activeTicker.volume24h.toLocaleString()} Kg</p>
          </div>
        </div>

        {/* Instant price indicator layout matching images */}
        <div className="flex items-baseline gap-2 my-2 border-y border-slate-800 py-1.5">
          <span className="text-2xl font-extrabold text-blue-400 font-mono tracking-tight">${activeTicker.price.toFixed(1)}</span>
          <span className="text-[10px] text-slate-450 font-mono">TWD/Kg</span>
          <span className="text-xs font-bold text-emerald-400 font-mono ml-auto">
            ▲ +{(activeTicker.price - activeTicker.yesterdayBase).toFixed(1)}({activeTicker.change > 0 ? '+' : ''}{activeTicker.change.toFixed(2)}%)
          </span>
        </div>

        {/* Compact SVG Micro Price Curve Chart */}
        <div className="h-[45px] w-full mt-2 relative bg-blue-500/5 border border-slate-750 rounded overflow-hidden">
          <svg className="w-full h-full overflow-visible">
            {/* Draw curve path */}
            <path
              d={drawLinePath(activeTicker.history24h, activeTicker.yesterdayBase, 300, 45)}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              className="drop-shadow-[0_0_4px_rgba(59,130,246,0.3)]"
            />
          </svg>
          <div className="absolute left-1.5 top-0 text-[8px] font-mono text-slate-600">05/05</div>
          <div className="absolute inset-x-0 bottom-0 text-[8px] font-mono text-slate-600 text-center">中期均價</div>
          <div className="absolute right-1.5 bottom-0 text-[8px] font-mono text-slate-600">今日 (06/04)</div>
        </div>

        {/* Metadata grid table (Highest, Lowest, Open Guide) */}
        <div className="grid grid-cols-4 gap-1.5 text-center mt-3 text-[10px] font-mono">
          <div className="bg-slate-900 py-1 px-1 rounded">
            <p className="text-slate-500 scale-90">最高收購</p>
            <p className="font-bold text-slate-200">${activeTicker.highest}</p>
          </div>
          <div className="bg-slate-900 py-1 px-1 rounded">
            <p className="text-slate-500 scale-90">最低收購</p>
            <p className="font-bold text-slate-200">${activeTicker.lowest}</p>
          </div>
          <div className="bg-slate-900 py-1 px-1 rounded">
            <p className="text-slate-500 scale-90">開盤指導</p>
            <p className="font-bold text-amber-400">${activeTicker.openGuide}</p>
          </div>
          <div className="bg-slate-900 py-1 px-1 rounded">
            <p className="text-slate-500 scale-90">昨收基準</p>
            <p className="font-bold text-slate-400">${activeTicker.yesterdayBase}</p>
          </div>
        </div>

        {/* Species text summary */}
        <p className="text-[10px] text-slate-400 mt-2.5 leading-relaxed bg-slate-900/60 p-2 rounded border border-slate-800 font-sans">
          <strong>蝦種簡介：</strong> {activeTicker.details}
        </p>
      </div>
    </div>
  );
}
