import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, AlertTriangle, Loader, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { shrimpApi } from '../lib/api';
import logoImg from '../assets/智養蝦-02.png';

interface LoginScreenProps {
  onLoginSuccess: (username: string, role: string) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('請輸入帳號與密碼');
      triggerShake();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await shrimpApi.login(username.trim(), password, 'https://smartshrip.com.tw');
      const role = (res as any).role ?? 'investor';
      onLoginSuccess(username.trim(), role);
    } catch (err: any) {
      setError(err.message || '登入失敗，請確認帳號密碼');
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050a12] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#caa45d]/5 blur-3xl pointer-events-none" />

      <div className={`relative z-10 w-full max-w-sm mx-4 transition-all duration-200`}
        style={shake ? { animation: 'shake 0.4s ease' } : {}}>

        {/* 返回首頁 */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors text-xs font-mono mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          返回首頁
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-full
            bg-[#caa45d]/10 border-2 border-[#caa45d]/40
            shadow-[0_0_30px_rgba(202,164,93,0.2)] mb-4 overflow-hidden">
            <img src={logoImg} alt="智養蝦" className="w-full h-full object-contain p-2" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-widest">智養蝦</h1>
          <p className="text-[11px] text-[#caa45d]/80 font-mono tracking-[0.25em] uppercase mt-1">
            Smart Shrimp Farm Command Center
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#caa45d]/40" />
            <span className="text-[9px] text-slate-600 font-mono tracking-wider uppercase">Authorized Access Only</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#caa45d]/40" />
          </div>
        </div>

        <div className="bg-[#09101b]/90 backdrop-blur border border-[#caa45d]/20 rounded-2xl p-6
          shadow-[0_0_60px_rgba(0,0,0,0.5),0_0_20px_rgba(202,164,93,0.05)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#caa45d]/50 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#caa45d]/50 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#caa45d]/50 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#caa45d]/50 rounded-br-2xl" />

          <div className="flex items-center gap-2 mb-5">
            <ShieldCheck className="w-4 h-4 text-[#caa45d]" />
            <span className="text-xs font-bold text-slate-300 tracking-wider uppercase">身份驗證</span>
            <span className="ml-auto flex items-center gap-1 text-[9px] text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              系統運行中
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-1.5">帳號</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                className="w-full bg-[#050a12] border border-slate-800 rounded-lg px-3 py-2.5
                  text-sm text-white font-mono focus:outline-none focus:border-[#caa45d]/60
                  transition-colors placeholder-slate-700"
                placeholder="帳號" />
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-1.5">密碼</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  className="w-full bg-[#050a12] border border-slate-800 rounded-lg px-3 py-2.5 pr-10
                    text-sm text-white font-mono focus:outline-none focus:border-[#caa45d]/60
                    transition-colors placeholder-slate-700"
                  placeholder="密碼" />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors cursor-pointer">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30
                rounded-lg px-3 py-2 text-xs text-rose-400">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-lg font-black text-sm tracking-widest uppercase
                transition-all duration-200 cursor-pointer relative overflow-hidden
                disabled:opacity-60 disabled:cursor-not-allowed
                bg-gradient-to-r from-[#caa45d]/80 to-[#caa45d]
                text-[#050a12] hover:shadow-[0_0_20px_rgba(202,164,93,0.4)] active:scale-[0.98]">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  驗證中...
                </span>
              ) : '登入系統'}
            </button>
          </form>
        </div>

        <p className="text-center text-[9px] text-slate-700 font-mono mt-4 tracking-wider">
          此系統僅限授權人員存取 · 未經授權登入將被記錄
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
