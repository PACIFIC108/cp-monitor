import { ArrowUpRight, Award, CalendarDays, Link2, LogOut, Medal, Star, Trophy, UserRound, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { API_BASE, apiFetch } from '@/lib/api';
import { useAuth } from '../Context/AuthContext';

const prettyRank = (rank) => rank ? rank.replaceAll('_', ' ') : 'Unrated';
const ratingColor = (rating) => {
  if (!rating || rating < 1200) return 'text-slate-400';
  if (rating < 1400) return 'text-emerald-400';
  if (rating < 1600) return 'text-cyan-400';
  if (rating < 1900) return 'text-blue-400';
  if (rating < 2100) return 'text-violet-400';
  if (rating < 2400) return 'text-orange-400';
  return 'text-rose-400';
};

export default function Profile() {
  const { user, codeforcesUser, setCodeforcesUser } = useAuth();
  const navigate = useNavigate();

  const disconnect = async () => {
    try {
      await apiFetch('/auth/logoutUser', { method: 'POST' });
      setCodeforcesUser(null);
      toast.success('Codeforces session disconnected');
      navigate('/app');
    } catch (error) { toast.error(error.message || 'Could not disconnect Codeforces'); }
  };

  if (!codeforcesUser) return <div className="subtle-grid min-h-screen px-4 py-14"><div className="glass-panel mx-auto max-w-xl rounded-3xl p-10 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-sky-400/10"><Link2 className="h-6 w-6 text-sky-300" /></div><h1 className="mt-6 text-2xl font-bold text-white">Connect your Codeforces profile</h1><p className="mt-3 text-slate-500">A verified connection is required before profile statistics can be displayed.</p><button type="button" onClick={() => { window.location.href = `${API_BASE}/auth/authLogin`; }} className="mt-7 rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white">Connect Codeforces</button></div></div>;

  const stats = [
    [Trophy, 'Current rating', codeforcesUser.rating ?? 'Unrated'],
    [Star, 'Maximum rating', codeforcesUser.maxRating ?? 'Unrated'],
    [Medal, 'Current rank', prettyRank(codeforcesUser.rank)],
    [Award, 'Maximum rank', prettyRank(codeforcesUser.maxRank)],
    [Users, 'Friend of', codeforcesUser.friendOfCount ?? 0],
    [CalendarDays, 'Contribution', codeforcesUser.contribution ?? 0],
  ];

  return <div className="subtle-grid min-h-screen px-4 py-12 sm:px-6"><div className="mx-auto max-w-5xl"><div className="mb-8"><p className="text-xs font-bold uppercase tracking-[.18em] text-sky-400">Profile</p><h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white">Account and Codeforces identity</h1></div><section className="glass-panel overflow-hidden rounded-3xl"><div className="relative border-b border-white/[.07] p-6 sm:p-9"><div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-violet-500/10" /><div className="relative flex flex-col gap-6 sm:flex-row sm:items-end"><img src={codeforcesUser.titlePhoto || codeforcesUser.avatar} alt={`${codeforcesUser.handle} avatar`} className="h-28 w-28 rounded-3xl border-4 border-[#0b1220] object-cover shadow-xl" /><div className="flex-1"><div className="flex items-center gap-2"><h2 className={`text-3xl font-extrabold ${ratingColor(codeforcesUser.rating)}`}>{codeforcesUser.handle}</h2><span title="OAuth verified" className="rounded-full bg-emerald-400/10 p-1.5 text-emerald-300"><UserRound className="h-4 w-4" /></span></div><p className="mt-1 capitalize text-slate-500">{prettyRank(codeforcesUser.rank)}</p><p className="mt-3 text-xs text-slate-600">Connected to local account <span className="font-semibold text-slate-400">{user?.userName}</span></p></div><div className="flex gap-2"><button type="button" onClick={() => window.open(`https://codeforces.com/profile/${codeforcesUser.handle}`, '_blank', 'noopener,noreferrer')} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:text-white">Open Codeforces <ArrowUpRight className="h-4 w-4" /></button><button type="button" onClick={disconnect} className="grid h-10 w-10 place-items-center rounded-xl border border-rose-400/15 bg-rose-400/10 text-rose-300" title="Disconnect Codeforces"><LogOut className="h-4 w-4" /></button></div></div></div><div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-9 lg:grid-cols-3">{stats.map(([Icon, label, value]) => <div key={label} className="rounded-2xl border border-white/[.07] bg-black/20 p-5"><div className="flex items-center gap-3 text-slate-500"><Icon className="h-4 w-4 text-sky-300" /><p className="text-xs font-semibold uppercase tracking-wider">{label}</p></div><p className="mt-4 truncate text-xl font-bold capitalize text-white">{value}</p></div>)}</div></section></div></div>;
}
