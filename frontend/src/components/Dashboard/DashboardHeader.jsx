import { Terminal, LogOut } from "lucide-react";
// Change this import if needed for your ThemeToggle location
import { ThemeToggle } from "../Landing/Themetoggle";

export default function DashboardHeader({ user, logout }) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] px-5 z-20 shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex size-7 items-center justify-center rounded bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
          <Terminal className="size-4" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold tracking-tight">
            DevPostGen
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-500">
            Beta
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1"></div>
        <div className="group relative flex items-center gap-3">
          <span className="hidden sm:inline text-xs font-medium text-zinc-500 dark:text-zinc-400 font-poppins">
            {user?.username || "Developer"}
          </span>
          <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-700 dark:text-zinc-200">
            {user?.username?.charAt(0).toUpperCase() || "D"}
          </div>
          <button
            onClick={logout}
            className="ml-2 p-2 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
            title="Sign out"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
