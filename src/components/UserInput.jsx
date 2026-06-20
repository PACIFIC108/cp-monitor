import { useState } from 'react';
import { ArrowUpRight, Link2, Search, ShieldCheck, Trophy, UserRound } from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE, apiFetch } from '@/lib/api';

const rankColor = (rating) => {
  if (!rating || rating < 1200) return 'text-slate-300';
  if (rating < 1400) return 'text-emerald-400';
  if (rating < 1600) return 'text-cyan-400';
  if (rating < 1900) return 'text-blue-400';
  if (rating < 2100) return 'text-violet-400';
  if (rating < 2400) return 'text-orange-400';
  return 'text-rose-400';
};

export default function UserInput() {
  const [handle, setHandle] = useState('');
  const [profile, setProfile] = useState(null);
  const [busy, setBusy] = useState(false);

  const search = async (event) => {
    event.preventDefault();
    if (!handle.trim()) return;
    try {
      setBusy(true);
      setProfile(await apiFetch(`/codeforces/profile/${encodeURIComponent(handle.trim())}`));
    } catch (error) {
      setProfile(null);
      toast.error(error.message || 'Codeforces profile not found');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
      <div className="glass-panel relative overflow-hidden rounded-3xl p-7 sm:p-10"><div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" /><div className="relative"><div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-sky-400/10 text-sky-300"><Link2 className="h-6 w-6" /></div><h2 className="text-2xl font-bold text-white sm:text-3xl">Connect your Codeforces profile</h2><p className="mt-3 max-w-xl leading-7 text-slate-400">OAuth verifies that the profile belongs to you. Once connected, we’ll import your submissions and rated contests to build private, persistent progress trends.</p><ul className="mt-7 grid gap-3 text-sm text-slate-400 sm:grid-cols-2"><li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" />Verified identity link</li><li className="flex items-center gap-2"><Trophy className="h-4 w-4 text-violet-400" />Contest performance history</li></ul><button type="button" onClick={() => { window.location.href = `${API_BASE}/auth/authLogin`; }} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/15 transition hover:bg-sky-400">Connect Codeforces <ArrowUpRight className="h-4 w-4" /></button></div></div>

      <div className="glass-panel rounded-3xl p-7"><div className="mb-5"><p className="text-xs font-bold uppercase tracking-[.16em] text-slate-600">Public lookup</p><h3 className="mt-2 text-xl font-bold text-white">Preview any profile</h3></div><form onSubmit={search} className="flex gap-2"><input value={handle} onChange={(event) => setHandle(event.target.value)} placeholder="Codeforces handle" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400/40 focus:ring-2 focus:ring-sky-400/10" /><button disabled={busy} className="grid w-12 place-items-center rounded-xl bg-white/[.07] text-slate-300 transition hover:bg-white/[.1] hover:text-white disabled:opacity-50"><Search className="h-4 w-4" /></button></form>
        {profile ? <div className="mt-6 rounded-2xl border border-white/[.08] bg-black/20 p-5"><div className="flex items-center gap-4"><img src={profile.titlePhoto || profile.avatar} alt="" className="h-14 w-14 rounded-2xl object-cover" /><div className="min-w-0"><p className={`truncate text-lg font-bold ${rankColor(profile.rating)}`}>{profile.handle}</p><p className="capitalize text-sm text-slate-500">{profile.rank || 'Unrated'}</p></div></div><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-xl bg-white/[.04] p-3"><p className="text-xs text-slate-600">Rating</p><p className="mt-1 font-bold text-white">{profile.rating || '—'}</p></div><div className="rounded-xl bg-white/[.04] p-3"><p className="text-xs text-slate-600">Max rating</p><p className="mt-1 font-bold text-white">{profile.maxRating || '—'}</p></div></div></div> : <div className="mt-6 grid min-h-44 place-items-center rounded-2xl border border-dashed border-white/[.08] text-center"><div><UserRound className="mx-auto h-7 w-7 text-slate-700" /><p className="mt-3 text-sm text-slate-600">Search a handle to preview its public profile.</p></div></div>}
      </div>
    </section>
  );
}
