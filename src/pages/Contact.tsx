import { MapPin, Phone, Mail, ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';

function getDayOfWeekForDate(value: string): string {
  if (!value || value.includes('星期')) {
    return value;
  }
  // Strip any 4-digit years like 2026 for simpler parsing
  const normalized = value.replace(/\b\d{4}\b/g, '').trim();
  
  const match = normalized.match(/(\d{1,2})[/\-.月\s]+(\d{1,2})/);
  if (match) {
    const month = parseInt(match[1], 10);
    const day = parseInt(match[2], 10);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      const currentYear = 2026; // system year is 2026
      const dateObj = new Date(currentYear, month - 1, day);
      if (dateObj.getMonth() === month - 1 && dateObj.getDate() === day) {
        const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const dayOfWeekName = days[dateObj.getDay()];
        
        const cleaned = value.replace(/\s*\([\s\S]*?\)/g, '').trim();
        return `${cleaned}(${dayOfWeekName})`;
      }
    }
  }
  return value;
}

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('no');
  const [funding, setFunding] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [remark, setRemark] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Ensure the date is formatted when generating sharing texts
  const finalDate = getDayOfWeekForDate(date);

  const formattedString = `【合祥 智養蝦說明會預約申請】
姓名：${name}
聯絡電話：${phone}
電子信箱：${email}
是否有契作經驗：${experience === 'yes' ? '是' : '否'}
預計參與金額：${funding}
希望預約日期：${finalDate}
希望時段：${time}
備註留言：${remark ? remark : '無'}`;

  const handleSendViaLine = () => {
    const url = `https://line.me/R/share?text=${encodeURIComponent(formattedString)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(formattedString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Ensure final date is captured and updated
    const formattedDateVal = getDayOfWeekForDate(date);
    setDate(formattedDateVal);

    // Automatically trigger LINE application page redirect
    const textToShare = `【合祥 智養蝦說明會預約申請】
姓名：${name}
聯絡電話：${phone}
電子信箱：${email}
是否有契作經驗：${experience === 'yes' ? '是' : '否'}
預計參與金額：${funding}
希望預約日期：${formattedDateVal}
希望時段：${time}
備註留言：${remark ? remark : '無'}`;
    
    try {
      navigator.clipboard.writeText(textToShare);
    } catch (err) {
      console.warn('Clipboard write failed', err);
    }

    const url = `https://line.me/R/share?text=${encodeURIComponent(textToShare)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-20 bg-slate-900/10 backdrop-blur-sm border-b border-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            契作說明會
          </motion.h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            親眼看看智慧養殖如何運作，感受成果誕生的每個瞬間。<br className="hidden sm:inline" />
            立即預約參訪說明會。
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-950/10 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* 1. Registration Form or Success View */}
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="breathe-panel bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 text-center"
              >
                <div className="w-16 h-16 bg-cyan-950 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-800/50">
                  <Check className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">預約資訊已整理完成！</h2>
                <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                  請點選下方按鈕直接透過 LINE 傳送您的預約申請！系統已為您格式化好內容。
                </p>

                {/* Form preview */}
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 text-left mb-8 max-w-lg mx-auto space-y-3 font-sans text-sm text-slate-300">
                  <div className="pb-3 border-b border-slate-800 mb-2 flex justify-between items-center">
                    <span className="font-bold text-slate-200">🔍 預約資料預覽：</span>
                    <button 
                      type="button"
                      onClick={handleCopyToClipboard}
                      className="text-cyan-405 hover:text-cyan-400 text-xs flex items-center gap-1 cursor-pointer transition-colors bg-slate-900 px-2.5 py-1 rounded border border-slate-800"
                    >
                      {copied ? "✓ 已複製" : "📋 複製內容"}
                    </button>
                  </div>
                  <p><strong>姓名：</strong> {name}</p>
                  <p><strong>聯絡電話：</strong> {phone}</p>
                  <p><strong>電子信箱：</strong> {email}</p>
                  <p><strong>是否有契作經驗：</strong> {experience === 'yes' ? '是' : '否'}</p>
                  <p><strong>預計參與金額：</strong> {funding}</p>
                  <p><strong>希望預約日期：</strong> {date}</p>
                  <p><strong>希望時段：</strong> {time}</p>
                  {remark && <p><strong>備註留言：</strong> {remark}</p>}
                </div>

                {/* Submit actions */}
                <div className="max-w-md mx-auto">
                  <button 
                    type="button"
                    onClick={handleSendViaLine}
                    className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#06C755]/20 text-base"
                  >
                    💬 透過 LINE 傳送預約
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-xs text-slate-500 hover:text-slate-300 underline cursor-pointer"
                >
                  回上頁修改預約資料
                </button>
              </motion.div>
            ) : (
              <div className="breathe-panel bg-slate-900/10 backdrop-blur-sm/80 backdrop-blur-md border rounded-3xl p-8 md:p-12">
                <h2 className="text-3xl font-bold text-white mb-2">預約說明會</h2>
                <p className="text-slate-400 mb-8">請填寫以下資訊，完成後點擊按鈕將直接透過 LINE 傳送預約申請。</p>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">姓名 *</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-slate-500"
                        placeholder="請輸入您的姓名"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">聯絡電話 *</label>
                      <input 
                        type="text" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-slate-500"
                        placeholder="09xx-xxx-xxx"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">電子信箱 *</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-slate-500"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm font-medium text-slate-300">是否有契作經驗？</label>
                     <div className="flex gap-6">
                        <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                          <input 
                            type="radio" 
                            name="experience" 
                            value="yes" 
                            checked={experience === 'yes'}
                            onChange={() => setExperience('yes')}
                            className="w-4 h-4 text-cyan-500 bg-slate-800 border-slate-700 focus:ring-cyan-500" 
                          />
                          是
                        </label>
                        <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                          <input 
                            type="radio" 
                            name="experience" 
                            value="no" 
                            checked={experience === 'no'}
                            onChange={() => setExperience('no')}
                            className="w-4 h-4 text-cyan-500 bg-slate-800 border-slate-700 focus:ring-cyan-500" 
                          />
                          否
                        </label>
                     </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">預計參與預算 *</label>
                    <input 
                      type="text" 
                      required
                      value={funding}
                      onChange={(e) => setFunding(e.target.value)}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-slate-500 text-slate-200"
                      placeholder="請輸入預計參與預算 (例如：評估中、洽談了解)"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">希望預約日期 *</label>
                       <input 
                          type="text"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          onBlur={() => {
                            if (date) {
                              const formatted = getDayOfWeekForDate(date);
                              setDate(formatted);
                            }
                          }}
                          className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-slate-500"
                          placeholder="請填入您希望的日期 (例如: 6/17)"
                        />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">希望時段 *</label>
                      <div className="flex gap-4 pt-3">
                        <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                          <input 
                            type="radio" 
                            name="time" 
                            value="10:00" 
                            checked={time === '10:00'}
                            onChange={() => setTime('10:00')}
                            className="w-4 h-4 text-cyan-500 bg-slate-800 border-slate-700 focus:ring-cyan-500" 
                            required 
                          />
                          10:00
                        </label>
                        <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                          <input 
                            type="radio" 
                            name="time" 
                            value="14:00" 
                            checked={time === '14:00'}
                            onChange={() => setTime('14:00')}
                            className="w-4 h-4 text-cyan-500 bg-slate-800 border-slate-700 focus:ring-cyan-500" 
                            required 
                          />
                          14:00
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">備註留言</label>
                    <textarea 
                      rows={3}
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-slate-500"
                      placeholder="有任何疑問或其他想了解的內容嗎？"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    填寫完成，確認預約
                  </button>
                </form>
              </div>
            )}

            {/* 3. Direct Contact */}
            <div className="breathe-panel bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between">
               <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
               
               <div className="relative z-10 w-full">
                 <h3 className="text-2xl font-bold text-white mb-6">直接聯繫我們</h3>
                 <div className="space-y-5 text-slate-300">
                    <a href="tel:0226976355" className="flex items-center gap-4 hover:text-cyan-400 transition-colors group">
                      <div className="bg-slate-800 group-hover:bg-cyan-950/40 p-2 rounded-lg border border-slate-700 group-hover:border-cyan-800/50 transition-colors">
                        <Phone className="w-5 h-5 text-cyan-500" /> 
                      </div>
                      <span className="text-lg">02-2697-6355</span>
                    </a>
                    
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=新北市汐止區新台五路一段99號14樓之10" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-start gap-4 hover:text-cyan-400 transition-colors group"
                    >
                      <div className="bg-slate-800 group-hover:bg-cyan-950/40 p-2 rounded-lg border border-slate-700 group-hover:border-cyan-800/50 transition-colors shrink-0">
                        <MapPin className="w-5 h-5 text-cyan-500" />
                      </div>
                      <span className="text-base leading-relaxed text-left">
                        新北市汐止區新台五路一段99號14樓之10 (遠雄U-TOWN 14F A10)
                      </span>
                    </a>

                    <a href="mailto:info@hxaisystems.com" className="flex items-center gap-4 hover:text-cyan-400 transition-colors group">
                      <div className="bg-slate-800 group-hover:bg-cyan-950/40 p-2 rounded-lg border border-slate-700 group-hover:border-cyan-800/50 transition-colors">
                        <Mail className="w-5 h-5 text-cyan-500" />
                      </div>
                      <span className="text-lg">info@hxaisystems.com</span>
                    </a>
                 </div>
               </div>

               <div className="relative z-10 flex flex-col items-center shrink-0 border-t md:border-t-0 md:border-l border-slate-805 md:pl-8 pt-8 md:pt-0 w-full md:w-auto">
                 <div className="p-2 bg-white rounded-2xl shadow-[0_0_25px_rgba(34,211,238,0.3)] border border-cyan-500/30 mb-4 w-36 h-36 flex items-center justify-center">
                   <img 
                     src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https%3A%2F%2Fline.me%2FR%2Fti%2Fp%2F%40783vxvtp" 
                     alt="合祥官方 LINE QR Code"
                     className="w-32 h-32 object-contain"
                     referrerPolicy="no-referrer"
                   />
                 </div>
                 <a 
                   href="https://line.me/R/ti/p/@783vxvtp" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="bg-[#06C755] hover:bg-[#05b34c] text-white px-6 py-2.5 rounded-full font-bold flex items-center justify-center gap-2 w-full transition-all hover:scale-[1.02] shadow-md shadow-[#06C755]/10"
                 >
                   加入官方 LINE (@783vxvtp)
                 </a>
                 <p className="text-slate-400 text-xs mt-3 text-center">掃描或點擊按鈕<br/>即可快速聯繫客服</p>
               </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
