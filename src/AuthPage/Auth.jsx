import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, BellRing, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../Context/AuthContext';
import { apiFetch } from '@/lib/api';
import ThemeToggle from '../components/ThemeToggle';

function Auth() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', userName: '', password: '' });
  const [loading, setLoading] = useState(false);
  const update = (key) => (event) => setForm((value) => ({ ...value, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const body = isLogin ? { userName: form.userName, password: form.password } : form;
      const response = await apiFetch(isLogin ? '/auth/login' : '/auth/signup', { method: 'POST', body: JSON.stringify(body) });
      setUser(response.user);
      toast.success(isLogin ? 'Welcome back' : 'Account created');
      navigate('/app');
    } catch (error) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="subtle-grid relative grid min-h-screen place-items-center bg-[#070b14] px-4 py-10 text-slate-100">
      <ThemeToggle className="absolute right-5 top-5 z-10" />
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/[.08] bg-[#0b1220]/90 shadow-2xl shadow-black/40 lg:grid-cols-[1.1fr_.9fr]">
        <section className="relative hidden overflow-hidden border-r border-white/[.07] p-12 lg:block"><div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" /><div className="relative flex h-full flex-col"><div className="flex items-center gap-3"><img src="/images/CP_Monitor.png" alt="CP Monitor" className="h-12 w-12 rounded-xl object-cover" /><div><p className="font-[Manrope] text-lg font-bold">CP Monitor</p><p className="text-xs text-slate-500">Competitive intelligence, quietly delivered.</p></div></div><div className="my-auto py-16"><p className="text-xs font-bold uppercase tracking-[.2em] text-sky-400">Less tab switching. More solving.</p><h1 className="mt-5 max-w-lg text-5xl font-extrabold leading-[1.08] tracking-[-.04em] text-white">Verdicts in real time. Progress over time.</h1><p className="mt-6 max-w-lg text-base leading-7 text-slate-400">Monitor submissions, hear instant verdicts, and understand your Codeforces trajectory through durable analytics.</p><div className="mt-10 grid grid-cols-3 gap-3">{[[BellRing, 'Live alerts'], [BarChart3, 'Trend analytics'], [ShieldCheck, 'Verified profile']].map(([Icon, label]) => <div key={label} className="rounded-2xl border border-white/[.07] bg-white/[.035] p-4"><Icon className="h-5 w-5 text-sky-300" /><p className="mt-3 text-xs font-semibold text-slate-300">{label}</p></div>)}</div></div><p className="text-xs text-slate-700">Built for the seconds that matter during a contest.</p></div></section>

        <section className="p-7 sm:p-10 lg:p-12"><div className="mb-10 flex items-center gap-3 lg:hidden"><img src="/images/CP_Monitor.png" alt="CP Monitor" className="h-11 w-11 rounded-xl object-cover" /><p className="font-[Manrope] font-bold">CP Monitor</p></div><div className="mx-auto max-w-sm"><p className="text-xs font-bold uppercase tracking-[.18em] text-sky-400">{isLogin ? 'Welcome back' : 'Get started'}</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white">{isLogin ? 'Sign in to your workspace' : 'Create your account'}</h2><p className="mt-2 text-sm text-slate-500">{isLogin ? 'Continue to monitoring and analytics.' : 'Your focused contest companion is one step away.'}</p>
          <form onSubmit={submit} className="mt-8 space-y-4">{!isLogin && <label className="block"><span className="mb-2 block text-xs font-semibold text-slate-400">Email address</span><input required type="email" value={form.email} onChange={update('email')} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-sky-400/10" placeholder="you@example.com" /></label>}<label className="block"><span className="mb-2 block text-xs font-semibold text-slate-400">Username</span><input required minLength={3} maxLength={30} pattern="[A-Za-z0-9_]+" value={form.userName} onChange={update('userName')} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-sky-400/10" placeholder="your_username" /></label><label className="block"><span className="mb-2 block text-xs font-semibold text-slate-400">Password</span><input required type="password" minLength={isLogin ? 1 : 8} maxLength={72} value={form.password} onChange={update('password')} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400/40 focus:ring-2 focus:ring-sky-400/10" placeholder={isLogin ? 'Your password' : 'Uppercase, lowercase, and number'} /></label><button disabled={loading} className="mt-2 w-full rounded-xl bg-sky-500 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/15 transition hover:bg-sky-400 disabled:opacity-50">{loading ? 'Please wait…' : isLogin ? 'Sign in' : 'Create account'}</button></form>
          <p className="mt-6 text-center text-sm text-slate-500">{isLogin ? 'New to CP Monitor?' : 'Already have an account?'} <button type="button" onClick={() => setIsLogin((value) => !value)} className="font-semibold text-sky-400 hover:text-sky-300">{isLogin ? 'Create an account' : 'Sign in'}</button></p></div></section>
      </div>
    </main>
  );
}

export default Auth;
