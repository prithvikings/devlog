import { Check, Copy } from "lucide-react";

// The CSS String for Scrollbars
export const globalStyles = `
  .custom-scrollbar::-webkit-scrollbar { width: 10px; height: 10px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border: 3px solid transparent; background-clip: content-box; border-radius: 99px; }
  .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border: 3px solid transparent; background-clip: content-box; }
  .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border: 3px solid transparent; background-clip: content-box; }
  .dark .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border: 3px solid transparent; background-clip: content-box; }
`;

export const CircularProgress = ({
  value,
  max,
  size = 16,
  strokeWidth = 2,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / max) * circumference;
  const isOver = value > max;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        className="text-zinc-200 dark:text-zinc-800"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className={`${isOver ? "text-red-500" : "text-zinc-900 dark:text-zinc-100"} transition-all duration-500 ease-out`}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
    </svg>
  );
};

export const SectionHeader = ({ icon: Icon, title, action }) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      <Icon className="size-3.5 text-zinc-500" />
      <span className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500 dark:text-zinc-400 font-sans">
        {title}
      </span>
    </div>
    {action}
  </div>
);

export const ToneButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded text-[11px] font-medium transition-all duration-200 border font-poppins cursor-pointer select-none ${
      isActive
        ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black border-zinc-900 dark:border-white shadow-sm"
        : "bg-transparent text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
    }`}
  >
    {label}
  </button>
);

export const CopyButton = ({ handleCopy, copied }) => (
  <button
    onClick={handleCopy}
    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer border border-zinc-800 dark:border-zinc-200"
  >
    {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    <span className="text-xs font-bold">{copied ? "Copied" : "Copy"}</span>
  </button>
);
