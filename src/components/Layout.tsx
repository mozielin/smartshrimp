import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Droplets, Fish, ChevronRight, Phone, Mail, MapPin, QrCode, ArrowUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React from 'react';
import globalTechBg from '../assets/images/global_tech_bg_1781691741558.jpg';
import logo from '../assets/images/hexiang_logo.png';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const links = [
    { to: '/', label: '首頁' },
    { to: '/market', label: '市場趨勢' },
    { to: '/product', label: '核心技術' },
    { to: '/franchise', label: '契作方案' },
    { to: '/about', label: '關於我們' },
    { to: '/contact', label: '契作說明會' },
    { to: '/member', label: '加盟主專區' },
  ];

  return (
    <div className="relative min-h-screen bg-[#025F9E] text-[#FFFFFF] font-sans selection:bg-cyan-500 selection:text-[#FFFFFF]">
      {/* Global Tech Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src={globalTechBg} 
          alt="Tech Background" 
          className="w-full h-full object-cover opacity-50 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[#025F9E]/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Back to Top */}
        <AnimatePresence>
          {showTopBtn && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={goToTop}
              className="fixed bottom-10 right-3 lg:right-5 z-50 w-9.5 h-9.5 sm:w-10 sm:h-10 bg-[#023E68]/90 border-[1.5px] border-cyan-300 rounded-[0_50%_50%_50%] rotate-45 text-[#FFFFFF] hover:scale-110 hover:border-cyan-200 hover:shadow-[0_0_15px_rgba(56,189,248,0.8)] shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-300 flex items-center justify-center cursor-pointer backdrop-blur-md"
            >
              <div className="-rotate-45 flex flex-col items-center justify-center gap-[1px] ml-0.5 mt-0.5">
                <span className="text-[11px] font-black text-cyan-300 leading-none drop-shadow-[0_0_3px_rgba(56,189,248,0.8)]">↑</span>
                <div className="w-2.5 h-[1px] bg-cyan-300/80 rounded-full"></div>
                <span className="text-[8px] font-black tracking-widest text-white leading-none">TOP</span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#025F9E]/50 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <NavLink to="/" className="flex items-center group relative">
              <div className="relative flex items-center justify-center transition-transform duration-300">
                {/* Subtle tech background glow behind the logo */}
                <motion.div 
                  className="absolute w-[180px] h-[54px] rounded-full bg-gradient-to-r from-cyan-500/20 via-sky-400/10 to-blue-600/20 blur-[28px] pointer-events-none z-0"
                  style={{ left: '90px', top: '100px' }}
                  animate={{
                    opacity: [0.55, 0.9, 0.55],
                    scale: [0.95, 1.08, 0.95]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <img 
                  src="/logo.png" 
                  alt="智養蝦 SmartShrimp" 
                  className="w-[400px] h-[200px] object-contain origin-left -ml-[50px] relative z-10 filter drop-shadow-[0_0_12px_rgba(6,182,212,0.45)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] group-hover:scale-[1.02] transition-all duration-300"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden flex-col items-start px-3 py-2 bg-[#025F9E]/80 rounded border border-white/20">
                   <span className="text-sm font-bold text-cyan-400">請上傳您的 Logo 圖檔</span>
                   <span className="text-xs text-[#FFFFFF]/90">至左側目錄 of /public/logo.png</span>
                </div>
              </div>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-5 xl:space-x-8 pr-4 lg:pr-8">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-xs lg:text-sm font-bold transition-colors hover:text-cyan-400 leading-tight text-center ${
                      isActive ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' : 'text-[#FFFFFF]/80'
                    }`
                  }
                >
                  <span className="flex flex-col items-center">
                    <span className="hidden xl:inline">{link.label}</span>
                    <span className="xl:hidden">
                      {link.label === '契作說明會' ? (
                        <span className="flex flex-col">
                          <span>{link.label.substring(0, 2)}</span>
                          <span>{link.label.substring(2)}</span>
                        </span>
                      ) : link.label.length === 4 ? (
                        <span className="flex flex-col">
                          <span>{link.label.substring(0, 2)}</span>
                          <span>{link.label.substring(2)}</span>
                        </span>
                      ) : link.label.length === 5 ? (
                        <span className="flex flex-col">
                          <span>{link.label.substring(0, 2)}</span>
                          <span>{link.label.substring(2)}</span>
                        </span>
                      ) : (
                        <span>{link.label}</span>
                      )}
                    </span>
                  </span>
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#FFFFFF]/80 hover:text-cyan-400 focus:outline-none p-2"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#025F9E]/60 border-b border-white/20"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-3 rounded-md text-base font-medium ${
                        isActive
                          ? 'bg-cyan-500/10 text-cyan-400'
                          : 'text-[#FFFFFF]/80 hover:bg-[#025F9E]/50 hover:text-[#FFFFFF]'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#025F9E]/20 backdrop-blur-lg border-t border-white/20 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-12">
            {/* Top row */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img src={logo} alt="合祥智慧科技有限公司" className="h-[60px] w-auto object-contain" />
              </div>
              <p className="text-[#FFFFFF]/90 text-sm leading-relaxed font-bold border-l-2 border-cyan-500/50 pl-4 py-1 max-w-lg">
                科技創新為核心，整合 AI、IoT 與產業資源，<br className="hidden sm:inline" />
                從智養蝦出發，賦能各產業邁向智能化，<br className="hidden sm:inline" />
                創造永續價值！
              </p>
            </div>
            
            {/* Bottom row */}
            <div>
              <a 
                href="https://line.me/R/ti/p/@783vxvtp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-[#FFFFFF]/90 hover:text-[#FFFFFF] transition-colors text-sm group"
              >
                 <div className="p-2 bg-white rounded-2xl shadow-[0_0_25px_rgba(34,211,238,0.3)] border border-cyan-500/30 inline-block relative group-hover:scale-105 transition-transform duration-300 shrink-0">
                   <img 
                     src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https%3A%2F%2Fline.me%2FR%2Fti%2Fp%2F%40783vxvtp" 
                     alt="LINE" 
                     className="w-28 h-28 object-contain rounded-xl"
                     referrerPolicy="no-referrer"
                   />
                 </div>
                 <div className="flex flex-col gap-1">
                   <span className="text-cyan-400 font-bold group-hover:text-cyan-300">加入官方LINE (@783vxvtp)</span>
                   <span className="font-bold">第一時間掌握智能養殖最新資訊</span>
                 </div>
              </a>
            </div>

            <div className="flex flex-col justify-start">
              <h4 className="text-[#FFFFFF] font-semibold mb-6">聯絡我們</h4>
              <ul className="space-y-4 text-[#FFFFFF]/90 text-sm">
                <li>
                  <a href="tel:0226976355" className="flex items-center gap-3 hover:text-cyan-400 transition-colors font-bold">
                    <Phone className="w-4 h-4 text-cyan-400 shrink-0" /> 02-2697-6355
                  </a>
                </li>
                <li>
                  <a 
                    href="https://maps.google.com/?q=新北市汐止區新台五路一段99號14樓之10" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 hover:text-cyan-400 transition-colors font-bold"
                  >
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" /> 
                    <span>新北市汐止區新台五路一段99號14樓之10<br/><span className="text-[#FFFFFF]/70 font-bold">(遠雄U-TOWN 14F A10)</span></span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@hxaisystems.com" className="flex items-center gap-3 hover:text-cyan-400 transition-colors mt-4 font-bold">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" /> info@hxaisystems.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5 mt-12 pt-8 border-t border-white/20 text-center text-xs text-[#FFFFFF]/70">
          &copy; {new Date().getFullYear()} 合祥智慧科技有限公司 Hexiang Smart Technology Co., Ltd. All rights reserved.
        </div>
      </footer>
      </div>
    </div>
  );
}
