import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Menu, Radio, UserRound, X } from 'lucide-react';
import LogOut from './AuthPage/LogOut';
import { useAuth } from './Context/AuthContext';
import { useVerdictMonitoring } from './Context/VerdictMonitoringContext';
import ThemeToggle from './components/ThemeToggle';

const navClass = ({ isActive }) => `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-sky-500/12 text-sky-300' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`;

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, userHandle } = useAuth();
  const { monitoring, connectionState } = useVerdictMonitoring();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.07] bg-[#070b14]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/app" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/images/CP_Monitor.png" alt="CP Monitor" className="h-11 w-11 rounded-xl object-cover shadow-lg shadow-sky-500/10" />
          <div><p className="font-[Manrope] text-base font-bold tracking-tight text-white">CP Monitor</p><p className="text-[11px] text-slate-500">Focus on the solve</p></div>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink end to="/app" className={navClass}><span className="flex items-center gap-2"><BarChart3 className="h-4 w-4" />Dashboard</span></NavLink>
          <NavLink to="/app/monitoring-control" className={navClass}><span className="flex items-center gap-2"><Radio className="h-4 w-4" />Monitor</span></NavLink>
          <NavLink to="/app/profile" className={navClass}><span className="flex items-center gap-2"><UserRound className="h-4 w-4" />Profile</span></NavLink>
          <NavLink to="/app/about" className={navClass}>About</NavLink>
          <NavLink to="/app/contact" className={navClass}>Contact</NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {monitoring && <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />{connectionState === 'connected' ? 'Live' : 'Connecting'}</div>}
          <div className="text-right"><p className="text-sm font-semibold text-slate-200">{user?.userName}</p><p className="text-xs text-slate-500">{userHandle || 'Codeforces not linked'}</p></div>
          <ThemeToggle />
          <LogOut />
        </div>

        <button type="button" className="rounded-lg p-2 text-slate-300 md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="border-t border-white/[.06] bg-[#0a101c] px-4 py-4 md:hidden"><nav className="flex flex-col gap-1"><NavLink end to="/app" className={navClass} onClick={() => setOpen(false)}>Dashboard</NavLink><NavLink to="/app/monitoring-control" className={navClass} onClick={() => setOpen(false)}>Monitor</NavLink><NavLink to="/app/profile" className={navClass} onClick={() => setOpen(false)}>Profile</NavLink><NavLink to="/app/about" className={navClass} onClick={() => setOpen(false)}>About</NavLink><NavLink to="/app/contact" className={navClass} onClick={() => setOpen(false)}>Contact</NavLink><div className="mt-3 flex items-center justify-between border-t border-white/[.06] pt-3"><span className="text-sm text-slate-400">{userHandle || user?.userName}</span><div className="flex gap-2"><ThemeToggle /><LogOut /></div></div></nav></div>}
    </header>
  );
}

export default Navbar;
