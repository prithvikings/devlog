import {
  Code2,
  CheckCircle2,
  Loader2,
  Settings2,
  Maximize2,
  Twitter,
  Linkedin,
  Sparkles,
} from "lucide-react";
import { SectionHeader, ToneButton } from "./Shared";

export default function ControlPanel({
  user,
  leetcodeInput,
  setLeetcodeInput,
  handleLinkLeetCode,
  isSyncingLC,
  tone,
  setTone,
  customTone,
  setCustomTone,
  platform,
  setPlatform,
  handleGenerate,
  isGenerating,
  hasActivity,
}) {
  return (
    <>
      <div className="p-6 space-y-8 lg:flex-1 lg:overflow-y-auto custom-scrollbar">
        {/* LEETCODE SETTINGS */}
        <section>
          <SectionHeader icon={Code2} title="Sync Source" />
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={leetcodeInput}
                onChange={(e) => setLeetcodeInput(e.target.value)}
                className="w-full h-9 rounded-md bg-zinc-50 dark:bg-[#0c0c0e] border-transparent focus:bg-white dark:focus:bg-black ring-1 ring-zinc-200 dark:ring-zinc-800 focus:ring-zinc-400 dark:focus:ring-zinc-600 px-3 text-xs placeholder:text-zinc-400 outline-none transition-all shadow-[0px_1px_2px_rgba(0,0,0,0.04)_inset] dark:text-white"
                placeholder="LeetCode Username"
              />
              {user?.leetcodeUsername &&
                user.leetcodeUsername === leetcodeInput && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                  </div>
                )}
            </div>
            <button
              onClick={handleLinkLeetCode}
              disabled={isSyncingLC}
              className="h-9 px-4 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all shadow-sm active:translate-y-px disabled:opacity-50 cursor-pointer"
            >
              {isSyncingLC ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                "Sync"
              )}
            </button>
          </div>
        </section>

        {/* SETTINGS */}
        <section className="space-y-6">
          <div>
            <SectionHeader icon={Settings2} title="Tone" />
            <div className="flex flex-wrap gap-2 mb-3">
              {["Formal", "Technical", "Casual", "Hype"].map((t) => (
                <ToneButton
                  key={t}
                  label={t}
                  isActive={tone === t.toLowerCase() && !customTone}
                  onClick={() => {
                    setTone(t.toLowerCase());
                    setCustomTone("");
                  }}
                />
              ))}
            </div>
            <input
              type="text"
              value={customTone}
              onChange={(e) => setCustomTone(e.target.value)}
              className="w-full h-9 rounded-md bg-zinc-50 dark:bg-[#0c0c0e] border-transparent focus:bg-white dark:focus:bg-black ring-1 ring-zinc-200 dark:ring-zinc-800 focus:ring-zinc-400 dark:focus:ring-zinc-600 px-3 text-xs placeholder:text-zinc-400 outline-none transition-all shadow-[0px_1px_2px_rgba(0,0,0,0.04)_inset] dark:text-white font-poppins"
              placeholder="Custom tone (e.g., 'Angry Linus Torvalds')..."
            />
          </div>

          <div>
            <SectionHeader icon={Maximize2} title="Platform" />
            <div className="grid grid-cols-2 gap-3">
              {["twitter", "linkedin"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`flex items-center justify-center gap-2 h-9 rounded-md text-xs font-medium transition-all cursor-pointer border ${
                    platform === p
                      ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black border-zinc-900 dark:border-white shadow-sm"
                      : "bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  {p === "twitter" ? (
                    <Twitter className="size-3" />
                  ) : (
                    <Linkedin className="size-3" />
                  )}
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Generate Button */}
      <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] sticky bottom-0 lg:static z-20">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !hasActivity}
          className="group relative w-full flex items-center justify-center gap-2 h-10 rounded-md bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black shadow-[0px_1px_0px_0px_rgba(255,255,255,0.15)_inset] dark:shadow-[0px_-1px_0px_0px_rgba(0,0,0,0.1)_inset] hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.98] transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin text-zinc-400" />
          ) : (
            <Sparkles className="size-4 text-zinc-400 dark:text-zinc-800 group-hover:text-white dark:group-hover:text-black transition-colors" />
          )}
          <span className="text-xs font-medium tracking-wide">
            {isGenerating ? "Processing..." : "Generate Draft"}
          </span>
        </button>
      </div>
    </>
  );
}
