import Section from "./components/Section";
import { Copy } from "lucide-react";

const MinimalDemo = () => (
  <Section className="py-10" id="demo">
    <div className="max-w-3xl mb-8">
      <h2 className="text-xl md:text-3xl tracking-tighter text-zinc-900 dark:text-white mb-3">
        How it Works
      </h2>
      <p className="text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed font-poppins">
        Connect your accounts, select your activity, and generate a clean
        update. No fluff, just progress.
      </p>
    </div>

    <div className="border border-zinc-300 dark:border-white/10 bg-white dark:bg-[#080808] rounded-xl overflow-hidden">
      {/* Fake macOS Window Header */}
      <div
        className="
        h-10 flex items-center gap-2 px-4
        border-b border-zinc-200 dark:border-white/5
        bg-zinc-50 dark:bg-white/[0.02]
      "
      >
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
      </div>

      {/* Content */}
      <div className="p-10 grid md:grid-cols-2 gap-12">
        {/* Input */}
        <div className="font-mono text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          commit: fix auth race condition
          <br />
          commit: add dark mode
          <br />
          leetcode: Two Sum
        </div>

        {/* Output */}
        <div className="relative bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-300 dark:border-white/10 p-6 rounded-lg">
          <div className="flex justify-between mb-3">
            <span className="text-sm font-poppins text-zinc-500">Preview</span>
            <Copy className="w-3 h-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer" />
          </div>

          <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <span className="font-semibold">
              Productive day shipping UI & fixes.
            </span>
            <br />
            <br />• Fixed auth race condition <br />• Shipped dark mode <br />•
            Solved LeetCode arrays
          </p>
        </div>
      </div>
    </div>
  </Section>
);

export default MinimalDemo;
