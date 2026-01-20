import { motion } from "framer-motion";

const BrowserMockup = () => (
  <div
    className="
      relative w-full 
      h-64 md:h-full min-h-[250px] 
      overflow-hidden rounded-lg 
      bg-zinc-100 dark:bg-zinc-900 
      border border-zinc-200 dark:border-white/5 
      select-none
    "
  >
    {/* Browser Toolbar */}
    <div className="flex items-center gap-3 px-3 py-2 border-b border-zinc-200 dark:border-white/5 bg-white dark:bg-[#0A0A0A]">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
      </div>
      {/* Address Bar */}
      <div className="flex-1 flex items-center px-2 h-6 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] text-zinc-400 font-mono truncate">
        leetcode.com/problems/two-sum
      </div>
      {/* Extension Icon (Active) */}
      <div className="flex items-center justify-center w-6 h-6 rounded bg-zinc-200 dark:bg-zinc-700 shrink-0">
        <div className="w-3 h-3 bg-zinc-900 dark:bg-white rounded-full animate-pulse" />
      </div>
    </div>

    {/* Browser Content (Abstract) */}
    <div className="p-4 space-y-3 opacity-50">
      <div className="w-3/4 h-2 bg-zinc-200 dark:bg-zinc-800 rounded" />
      <div className="w-1/2 h-2 bg-zinc-200 dark:bg-zinc-800 rounded" />
      <div className="w-full h-32 mt-4 bg-zinc-200 dark:bg-zinc-800 rounded border border-zinc-300 dark:border-white/10" />
    </div>

    {/* The Pop-over Notification */}
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="absolute top-14 right-4 w-48 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl z-10"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-[10px] font-medium text-zinc-500 uppercase">
          Activity Detected
        </span>
      </div>
      <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
        Solved "Two Sum"
      </p>
      <div className="mt-2 h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full w-2/3 bg-zinc-900 dark:bg-white" />
      </div>
    </motion.div>
  </div>
);

export default BrowserMockup;
