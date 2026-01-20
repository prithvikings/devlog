

const Footer = () => (
  <footer className="py-12 border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950 font-poppins">
    <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-4 gap-8">
      {/* Brand */}
      <div className="md:col-span-2 space-y-4">
        <div className="flex items-center gap-2">
          <img src="./terminal.png" alt="" className="size-8" />
          <span className="font-semibold tracking-tight text-zinc-900 dark:text-white">
            DevPostGen AI
          </span>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-500 max-w-xs leading-relaxed font-poppins">
          Turning code contributions into social proof. <br />
          Built for engineers, not influencers.
        </p>
      </div>

      {/* Links Column 1 */}
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-1">
          Project
        </h4>
        <a
          href="#"
          className="text-xs text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
        >
          Download
        </a>
        <a
          href="#"
          className="text-xs text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
        >
          Changelog
        </a>
        <a
          href="#"
          className="text-xs text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
        >
          Docs
        </a>
      </div>

      {/* Links Column 2 */}
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-1">
          Legal
        </h4>
        <a
          href="#"
          className="text-xs text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
        >
          Privacy
        </a>
        <a
          href="#"
          className="text-xs text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
        >
          Terms
        </a>
        <a
          href="#"
          className="text-xs text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
        >
          Twitter
        </a>
      </div>
    </div>

    <div className="max-w-5xl mx-auto px-6 mt-12 flex items-center justify-between">
      <p className="text-[10px] text-zinc-400">© 2024 DevPostGen Inc.</p>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-[10px] text-zinc-500 font-mono">
          All Systems Normal
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
