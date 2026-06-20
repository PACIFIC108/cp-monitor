import { ArrowRight, Radio, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import UserInput from '../components/UserInput';
import { useAuth } from '../Context/AuthContext';

function Home() {
  const { isAuthorized, userHandle, user } = useAuth();
  const hasLinkedProfile = isAuthorized && Boolean(user?.codeforcesHandle);
  return (
    <div className="subtle-grid min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/15 bg-sky-400/[.07] px-3 py-1.5 text-xs font-semibold text-sky-300"><ShieldCheck className="h-3.5 w-3.5" />Verified Codeforces monitoring</div><h1 className="text-4xl font-extrabold leading-tight tracking-[-.04em] text-white sm:text-5xl">Stay in the problem.<br /><span className="bg-gradient-to-r from-sky-300 to-indigo-400 bg-clip-text text-transparent">We’ll watch the verdict.</span></h1><p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">Live verdict alerts and durable performance analytics, designed to keep context switching out of your contests.</p></div>
          {hasLinkedProfile && <Link to="/app/monitoring-control" className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-sky-500/15 transition hover:bg-sky-400"><Radio className="h-5 w-5" />Open live monitor <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>}
        </section>
        {hasLinkedProfile && userHandle ? <AnalyticsDashboard /> : <UserInput />}
      </div>
    </div>
  );
}

export default Home;
