import { useCallback, useEffect, useRef, useState } from 'react';
import { Activity, BarChart3, CheckCircle2, RefreshCw, Send, Trophy } from 'lucide-react';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api';
import TrendChart from './TrendChart';

const metrics = [
  { id: 'solved', label: 'Solved' },
  { id: 'wrongAnswerRate', label: 'Wrong answer rate' },
  { id: 'contestRank', label: 'Contest rank' },
];

const cards = [
  { key: 'solvedCount', label: 'Problems solved', icon: CheckCircle2, color: 'text-emerald-300', bg: 'bg-emerald-400/10' },
  { key: 'wrongAnswerRate', label: 'Wrong answer rate', icon: Activity, color: 'text-rose-300', bg: 'bg-rose-400/10', suffix: '%' },
  { key: 'contests', label: 'Rated contests', icon: Trophy, color: 'text-violet-300', bg: 'bg-violet-400/10' },
  { key: 'totalSubmissions', label: 'Submissions tracked', icon: Send, color: 'text-sky-300', bg: 'bg-sky-400/10' },
];

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [metric, setMetric] = useState('solved');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const booted = useRef(false);

  const load = useCallback(async (force = false) => {
    try {
      if (force) setRefreshing(true);
      const data = await apiFetch('/analytics/sync', { method: 'POST', body: JSON.stringify({ force }) });
      setAnalytics(data);
      if (force) toast.success('Analytics updated from Codeforces');
    } catch (error) {
      toast.error(error.message || 'Could not load analytics');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (!booted.current) {
      booted.current = true;
      load(false);
    }
  }, [load]);

  if (loading) return <div className="space-y-5"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map((card) => <div key={card.key} className="h-32 animate-pulse rounded-2xl bg-white/[.05]" />)}</div><div className="h-96 animate-pulse rounded-3xl bg-white/[.05]" /></div>;
  if (!analytics) return <div className="glass-panel rounded-3xl p-10 text-center text-slate-400">Analytics could not be loaded. Try refreshing the page.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-sky-400"><BarChart3 className="h-4 w-4" />Performance analytics</div><h2 className="text-2xl font-bold text-white sm:text-3xl">Your competitive programming pulse</h2><p className="mt-2 text-sm text-slate-500">Historical data for <span className="font-semibold text-slate-300">{analytics.handle}</span> · Last synced {analytics.lastSyncedAt ? new Date(analytics.lastSyncedAt).toLocaleString() : 'just now'}</p></div>
        <button type="button" onClick={() => load(true)} disabled={refreshing} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-4 text-sm font-semibold text-slate-300 transition hover:border-sky-400/30 hover:text-white disabled:opacity-50"><RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />Refresh data</button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ key, label, icon: Icon, color, bg, suffix = '' }) => <div key={key} className="glass-panel rounded-2xl p-5"><div className={`mb-5 grid h-10 w-10 place-items-center rounded-xl ${bg}`}><Icon className={`h-5 w-5 ${color}`} /></div><p className="text-3xl font-bold tracking-tight text-white">{analytics.summary[key] ?? 0}{suffix}</p><p className="mt-1 text-sm text-slate-500">{label}</p></div>)}
      </div>

      <section className="glass-panel rounded-3xl p-5 sm:p-7">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="text-lg font-bold text-white">Performance trend</h3><p className="mt-1 text-sm text-slate-500">Switch metrics to inspect a different part of your progress.</p></div><div className="flex w-full rounded-xl border border-white/[.08] bg-black/20 p-1 sm:w-auto">{metrics.map((item) => <button key={item.id} type="button" onClick={() => setMetric(item.id)} className={`flex-1 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition sm:flex-none ${metric === item.id ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/15' : 'text-slate-500 hover:text-slate-200'}`}>{item.label}</button>)}</div></div>
        <TrendChart metric={metric} snapshots={analytics.snapshots} contests={analytics.contests} />
      </section>

      <section className="glass-panel overflow-hidden rounded-3xl"><div className="border-b border-white/[.07] px-6 py-5"><h3 className="font-bold text-white">Recent rated contests</h3><p className="mt-1 text-sm text-slate-500">Your latest Codeforces contest performance.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-white/[.025] text-xs uppercase tracking-wider text-slate-600"><tr><th className="px-6 py-3 font-semibold">Contest</th><th className="px-4 py-3 font-semibold">Rank</th><th className="px-4 py-3 font-semibold">Rating</th><th className="px-4 py-3 font-semibold">Change</th><th className="px-6 py-3 text-right font-semibold">Date</th></tr></thead><tbody className="divide-y divide-white/[.06]">{[...analytics.contests].reverse().slice(0, 6).map((contest) => <tr key={contest.contestId} className="text-slate-400 transition hover:bg-white/[.025]"><td className="max-w-sm px-6 py-4 font-medium text-slate-200">{contest.contestName}</td><td className="px-4 py-4 tabular-nums">#{contest.rank}</td><td className="px-4 py-4 tabular-nums">{contest.newRating}</td><td className={`px-4 py-4 font-semibold tabular-nums ${contest.ratingChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{contest.ratingChange >= 0 ? '+' : ''}{contest.ratingChange}</td><td className="px-6 py-4 text-right text-slate-600">{new Date(contest.ratedAt).toLocaleDateString()}</td></tr>)}{!analytics.contests.length && <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-600">No rated contests found.</td></tr>}</tbody></table></div></section>
    </div>
  );
}
