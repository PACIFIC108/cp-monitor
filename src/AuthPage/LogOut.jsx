import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../Context/AuthContext';
import { apiFetch } from '@/lib/api';

function Logout() {
  const navigate = useNavigate();
  const { setUser, setCodeforcesUser } = useAuth();
  const logout = async () => {
    try { await apiFetch('/auth/logout', { method: 'POST' }); setUser(null); setCodeforcesUser(null); navigate('/'); }
    catch (error) { toast.error(error.message || 'Logout failed'); }
  };
  return <button type="button" onClick={logout} title="Sign out" className="grid h-9 w-9 place-items-center rounded-lg border border-white/[.08] bg-white/[.04] text-slate-500 transition hover:border-rose-400/20 hover:bg-rose-400/10 hover:text-rose-300"><LogOut className="h-4 w-4" /></button>;
}

export default Logout;
