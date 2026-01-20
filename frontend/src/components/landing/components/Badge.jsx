const Badge = ({ children }) => (
  <span
    className="
    inline-flex items-center px-2 py-0.5 rounded
    text-[10px] font-medium tracking-tight font-mono
    bg-zinc-100 text-zinc-600 border border-zinc-200
    dark:bg-white/5 dark:text-zinc-400 dark:border-white/5
  "
  >
    {children}
  </span>
);

export default Badge;
