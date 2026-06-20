const Footer = () => (
  <footer className="border-t border-white/[.06] bg-[#070b14]">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-slate-600 sm:flex-row">
      <p className="font-semibold text-slate-500">CP Monitor</p>
      <p>© {new Date().getFullYear()} Built for focused competitive programming.</p>
    </div>
  </footer>
);

export default Footer;
