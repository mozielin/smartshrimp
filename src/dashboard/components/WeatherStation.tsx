/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CloudRain, Compass, Wind, Sunset, Umbrella, RefreshCw, AlertTriangle, CloudSun } from 'lucide-react';
import { WeatherData } from '../types';

export default function WeatherStation() {
  // Configurable weather states
  const [weather, setWeather] = useState<WeatherData>({
    temp: 28.5,
    windDirection: 'NE 東北',
    humidity: 65,
    windSpeed: 2,
    pressure: 1008,
    rainAccumulated: 5,
    statusStr: '伴隨微量細雨'
  });

  const [simulatedCanopyStatus, setSimulatedCanopyStatus] = useState<'open' | 'closed' | 'auto'>('auto');

  // Trigger a heavy thunderstorm to showcase canopy auto shielding
  const handleTriggerStorm = () => {
    if (weather.rainAccumulated < 15) {
      setWeather({
        temp: 24.2,
        windDirection: 'NW 西北',
        humidity: 92,
        windSpeed: 5,
        pressure: 994,
        rainAccumulated: 38,
        statusStr: '劇烈雷陣雨、致災預警下撥'
      });
    } else {
      setWeather({
        temp: 28.5,
        windDirection: 'NE 東北',
        humidity: 65,
        windSpeed: 2,
        pressure: 1008,
        rainAccumulated: 5,
        statusStr: '伴隨微量細雨'
      });
    }
  };

  // Protective advice helper based on rain levels
  const getCanopyAdvice = () => {
    if (weather.rainAccumulated >= 25) {
      return {
        state: '智慧避雨頂篷應：【全面覆蓋關閉】',
        class: 'text-rose-400 bg-rose-950/20 border-rose-500/20',
        action: '已自動下達電機，關閉 100% 遮蔽，防止酸化雨水稀釋池內鹽度。'
      };
    }
    return {
      state: '智慧避雨頂篷應：【保持高位敞開】',
      class: 'text-[#10b981] bg-slate-900 border-slate-750',
      action: '外圍通風良好，空氣對流有助於池水自然散熱，維持正常大氣平衡。'
    };
  };

  const advice = getCanopyAdvice();

  return (
    <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-4 shadow-sm flex flex-col justify-between h-full">
      {/* Weather Header */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <CloudSun className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white flex items-center gap-2 leading-tight">
                智慧蝦微組織氣象站系統
              </h3>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">MICROWEATHER STATION CLOUD RADAR</p>
            </div>
          </div>
          
          <div className="flex gap-1.5 font-mono text-[10px]">
            <span className="text-slate-500">實時站點:</span>
            <span className="text-blue-400 font-bold uppercase tracking-wider font-mono">LACK-B3</span>
          </div>
        </div>

        {/* 2x3 Weather Param Grid matching screenshots */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Box 1: Ambient Temp */}
          <div className="bg-[#0F172A] border border-slate-750 p-2.5 rounded hover:bg-slate-900 transition-all">
            <p className="text-[10px] text-slate-400">外圍大氣溫度</p>
            <p className="text-xl font-bold font-mono text-white my-1 flex items-baseline gap-1">
              {weather.temp.toFixed(1)} <span className="text-xs text-slate-400">°C</span>
            </p>
            <div className="text-[9px] text-rose-400 flex items-center gap-1">
              <div className="w-1 h-1 bg-rose-400 rounded-full animate-ping" />
              環境溫差: 1.2°C
            </div>
          </div>

          {/* Box 2: Wind direction */}
          <div className="bg-[#0F172A] border border-slate-750 p-2.5 rounded hover:bg-slate-900 transition-all">
            <p className="text-[10px] text-slate-400">今日風向</p>
            <p className="text-xl font-bold font-sans text-white my-1 flex items-baseline gap-1">
              {weather.windDirection}
            </p>
            <p className="text-[9px] text-slate-550 font-mono">方位解算信號良好</p>
          </div>

          {/* Box 3: Relative Humidity */}
          <div className="bg-[#0F172A] border border-slate-750 p-2.5 rounded hover:bg-slate-900 transition-all">
            <p className="text-[10px] text-slate-400">相對濕度</p>
            <p className="text-xl font-bold font-mono text-white my-1">
              {weather.humidity} <span className="text-xs text-slate-400">%</span>
            </p>
            <p className="text-[9px] text-slate-550 font-mono">蒸發係數：穩定</p>
          </div>

          {/* Box 4: Wind Speed */}
          <div className="bg-[#0F172A] border border-slate-750 p-2.5 rounded hover:bg-slate-900 transition-all">
            <p className="text-[10px] text-slate-400">今日風力強度</p>
            <p className="text-xl font-bold font-mono text-white my-1 flex items-baseline gap-1">
              {weather.windSpeed} <span className="text-xs text-slate-400">級</span>
            </p>
            <p className="text-[9px] text-slate-555 font-mono">風俗：{weather.windSpeed > 3 ? '強風警備' : '微波漣漪'}</p>
          </div>

          {/* Core Wide Box 1: Atmospheric pressure */}
          <div className="col-span-2 bg-[#0F172A] border border-slate-750 p-2.5 rounded flex justify-between items-center hover:bg-slate-900 transition-all">
            <div>
              <p className="text-[10px] text-slate-400">湧平型大氣壓 <span className="text-amber-400 font-bold bg-amber-950/20 border border-amber-500/20 px-1 py-0.5 rounded text-[8px] scale-90">標準常壓</span></p>
              <p className="text-lg font-bold font-mono text-amber-400 mt-1">{weather.pressure} <span className="text-xs text-slate-400">hPa</span></p>
            </div>
            <div className="text-right text-[9px] text-slate-550">
              <p>偏高壓滯留</p>
              <p>穩定大氣</p>
            </div>
          </div>

          {/* Core Wide Box 2: Rain */}
          <div className="col-span-2 bg-[#0F172A] border border-slate-750 p-2.5 rounded flex justify-between items-center hover:bg-slate-900 transition-all">
            <div>
              <p className="text-[10px] text-slate-400">當日累計雨量 <span className="text-blue-400 font-bold bg-blue-950/20 border border-blue-500/20 px-1 py-0.5 rounded text-[8px] scale-90">{weather.statusStr}</span></p>
              <p className="text-lg font-bold font-mono text-blue-400 mt-1">{weather.rainAccumulated} <span className="text-xs text-slate-400">mm</span></p>
            </div>
            <button
              onClick={handleTriggerStorm}
              className="p-1 px-2.5 rounded bg-blue-600/20 text-blue-300 hover:text-white hover:bg-blue-600 transition-all text-[10px] font-semibold border border-blue-500/20 cursor-pointer"
            >
              模擬豪雨對抗
            </button>
          </div>
        </div>
      </div>

      {/* Proactive Canopy Protective Suggestions panel */}
      <div className={`mt-1 border p-3 rounded ${advice.class} flex flex-col gap-1 transition-all`}>
        <div className="flex items-center gap-1.5 font-bold text-xs text-white">
          <Umbrella className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>{advice.state}</span>
        </div>
        <p className="text-[11px] text-slate-300">{advice.action}</p>

        {/* Dynamic Interactive Overriding Buttons */}
        <div className="flex gap-2 mt-2 pt-2 border-t border-slate-700/40 text-[10.5px]">
          <span className="text-[10px] text-slate-400 flex items-center">避雨頂篷中控:</span>
          <button 
            onClick={() => setSimulatedCanopyStatus('open')}
            className={`px-2 py-0.5 rounded text-[10px] transition-all ${simulatedCanopyStatus === 'open' ? 'bg-blue-600 text-white font-bold' : 'bg-[#0F172A] text-slate-400 hover:text-white border border-slate-755'}`}
          >
            手動敞開
          </button>
          <button 
            onClick={() => setSimulatedCanopyStatus('closed')}
            className={`px-2 py-0.5 rounded text-[10px] transition-all ${simulatedCanopyStatus === 'closed' ? 'bg-blue-600 text-white font-bold' : 'bg-[#0F172A] text-slate-400 hover:text-white border border-slate-755'}`}
          >
            手動關閉
          </button>
          <button 
            onClick={() => setSimulatedCanopyStatus('auto')}
            className={`px-2 py-0.5 rounded text-[10px] transition-all ${simulatedCanopyStatus === 'auto' ? 'bg-emerald-500/20 text-emerald-405 border border-emerald-500/30 font-bold' : 'bg-[#0F172A] text-slate-400'}`}
          >
            AUTO 自動
          </button>
        </div>
      </div>
    </div>
  );
}
