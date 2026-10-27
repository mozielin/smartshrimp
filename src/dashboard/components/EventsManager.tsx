import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react';
import { apiConfig, getCleanApiDomain } from '../lib/api';

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  location_url?: string;
  max_seats?: number;
  note?: string;
}

const EMPTY_FORM = {
  title: '智養蝦加盟說明會',
  date: '',
  time: '10:00',
  location: '新北市汐止區新台五路一段99號14樓之10 (遠雄U-TOWN 14F A10)',
  location_url: 'https://www.google.com/maps/search/?api=1&query=新北市汐止區新台五路一段99號14樓之10',
  max_seats: 20,
  note: '',
};

export default function EventsManager() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const domain = getCleanApiDomain();
  const token = apiConfig.token;

  const authHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${domain}/events/all`, { headers: authHeaders });
      if (res.ok) setEvents(await res.json());
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, []);

  const flash = (type: 'ok' | 'err', text: string) => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3000);
  };

  const handleSave = async () => {
    if (!form.date || !form.time || !form.location) {
      flash('err', '日期、時間、地點為必填');
      return;
    }
    setSaving(true);
    try {
      const url = editingId ? `${domain}/events/${editingId}` : `${domain}/events/`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: authHeaders, body: JSON.stringify(form) });
      if (res.ok) {
        flash('ok', editingId ? '已更新說明會' : '已新增說明會');
        setShowForm(false);
        setEditingId(null);
        setForm({ ...EMPTY_FORM });
        fetchEvents();
      } else {
        flash('err', '儲存失敗');
      }
    } catch { flash('err', '網路錯誤'); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('確定刪除這場說明會？')) return;
    try {
      const res = await fetch(`${domain}/events/${id}`, { method: 'DELETE', headers: authHeaders });
      if (res.ok) { flash('ok', '已刪除'); fetchEvents(); }
    } catch { flash('err', '刪除失敗'); }
  };

  const startEdit = (ev: EventItem) => {
    setForm({
      title: ev.title,
      date: ev.date,
      time: ev.time,
      location: ev.location,
      location_url: ev.location_url || '',
      max_seats: ev.max_seats || 20,
      note: ev.note || '',
    });
    setEditingId(ev.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white tracking-wider">說明會管理</h2>
          <p className="text-[10px] text-slate-500 font-mono">EVENTS MANAGEMENT</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm({ ...EMPTY_FORM }); }}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#caa45d]/20 border border-[#caa45d]/50 text-[#caa45d] rounded-sm text-xs font-bold hover:bg-[#caa45d]/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          新增說明會
        </button>
      </div>

      {/* Flash message */}
      {msg && (
        <div className={`px-4 py-2.5 rounded text-xs font-bold ${msg.type === 'ok' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
          {msg.text}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-[#09101b] border border-[#caa45d]/30 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white">{editingId ? '編輯說明會' : '新增說明會'}</h3>
            <button onClick={() => setShowForm(false)} className="text-slate-500 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-slate-500 font-mono uppercase mb-1.5">活動標題</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="w-full bg-[#050a12] border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#caa45d]/60" />
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 font-mono uppercase mb-1.5">日期 *</label>
              <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className="w-full bg-[#050a12] border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#caa45d]/60" />
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 font-mono uppercase mb-1.5">時間 *</label>
              <div className="flex gap-2">
                <select
                  value={['09:00','10:00','11:00','13:00','14:00','15:00','16:00','19:00'].includes(form.time) ? form.time : 'custom'}
                  onChange={e => { if (e.target.value !== 'custom') setForm(f => ({ ...f, time: e.target.value })); }}
                  className="bg-[#050a12] border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#caa45d]/60 flex-1"
                >
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="19:00">19:00</option>
                  <option value="custom">自訂...</option>
                </select>
                <input
                  type="time"
                  value={form.time}
                  onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                  className="bg-[#050a12] border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#caa45d]/60 w-32"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 font-mono uppercase mb-1.5">名額上限</label>
              <input type="number" value={form.max_seats} onChange={e => setForm(f => ({ ...f, max_seats: parseInt(e.target.value) || 0 }))}
                className="w-full bg-[#050a12] border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#caa45d]/60" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] text-slate-500 font-mono uppercase mb-1.5">地點 *</label>
              <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                className="w-full bg-[#050a12] border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#caa45d]/60" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] text-slate-500 font-mono uppercase mb-1.5">Google Maps 連結</label>
              <input value={form.location_url} onChange={e => setForm(f => ({ ...f, location_url: e.target.value }))}
                className="w-full bg-[#050a12] border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#caa45d]/60"
                placeholder="https://maps.google.com/..." />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] text-slate-500 font-mono uppercase mb-1.5">備註說明</label>
              <textarea value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} rows={2}
                className="w-full bg-[#050a12] border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#caa45d]/60"
                placeholder="例如：請提前10分鐘到場、攜帶名片" />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-1.5 px-5 py-2 bg-[#caa45d] text-[#050a12] rounded font-black text-xs hover:brightness-110 transition-all cursor-pointer disabled:opacity-50">
              <Save className="w-3.5 h-3.5" />
              {saving ? '儲存中...' : '儲存'}
            </button>
            <button onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-slate-800 text-slate-400 rounded text-xs font-bold hover:text-white transition-all cursor-pointer">
              取消
            </button>
          </div>
        </div>
      )}

      {/* Events list */}
      {loading ? (
        <div className="text-slate-500 text-xs font-mono py-8 text-center">載入中...</div>
      ) : events.length === 0 ? (
        <div className="text-slate-600 text-xs font-mono py-10 text-center border border-dashed border-slate-800 rounded-xl">
          尚未建立任何說明會場次，點擊「新增說明會」開始建立。
        </div>
      ) : (
        <div className="space-y-3">
          {events.map(ev => {
            const isPast = ev.date < new Date().toISOString().split('T')[0];
            return (
              <div key={ev.id} className={`bg-[#09101b] border rounded-xl p-4 flex items-start justify-between gap-4 ${isPast ? 'border-slate-800 opacity-60' : 'border-[#caa45d]/20'}`}>
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{ev.title}</span>
                    {isPast && <span className="text-[9px] bg-slate-800 text-slate-500 px-2 py-0.5 rounded font-mono">已過期</span>}
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#caa45d]" />{ev.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#caa45d]" />{ev.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#caa45d]" />{ev.location}
                      {ev.location_url && <a href={ev.location_url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 ml-1"><ExternalLink className="w-3 h-3 inline" /></a>}
                    </span>
                    {ev.max_seats && <span className="flex items-center gap-1"><Users className="w-3 h-3 text-[#caa45d]" />名額 {ev.max_seats} 人</span>}
                  </div>
                  {ev.note && <p className="text-[10px] text-slate-500">{ev.note}</p>}
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button onClick={() => startEdit(ev)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded transition-all cursor-pointer">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(ev.id)}
                    className="p-1.5 bg-slate-800 hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 rounded transition-all cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
