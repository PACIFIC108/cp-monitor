import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  return <button type="button" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} className={`grid h-9 w-9 place-items-center rounded-lg border border-white/[.08] bg-white/[.04] text-slate-500 transition hover:text-sky-300 ${className}`}>{theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>;
}
