import { ListFilter, RefreshCw, GitCommit, Code2, Github } from "lucide-react";
import { SectionHeader } from "./Shared";

export default function ActivityLog({
  activity,
  selectedIndices,
  onToggleItem,
  onSelectAll,
  onRefresh,
  loading,
}) {
  const isAllSelected =
    activity.length > 0 && selectedIndices.size === activity.length;

  return (
    <section>
      <SectionHeader
        icon={ListFilter}
        title="Daily Log"
        action={
          <div className="flex items-center gap-3">
            <button
              onClick={onSelectAll}
              className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {isAllSelected ? "Deselect" : "Select All"}
            </button>
            <button
              onClick={onRefresh}
              disabled={loading}
              className="cursor-pointer text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <RefreshCw
                className={`size-3.5 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        }
      />

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0e] overflow-hidden shadow-sm">
        <div className="max-h-[240px] overflow-y-auto custom-scrollbar">
          {activity.length > 0 ? (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
              {activity.map((item) => (
                <label
                  key={item.id}
                  className="flex items-start gap-3 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 cursor-pointer group transition-colors"
                >
                  <div className="pt-0.5">
                    <input
                      type="checkbox"
                      checked={selectedIndices.has(item.id)}
                      onChange={() => onToggleItem(item.id)}
                      className="size-3.5 rounded-sm border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 checked:bg-zinc-900 dark:checked:bg-zinc-100 checked:border-zinc-900 dark:checked:border-zinc-100 focus:ring-0 focus:ring-offset-0 cursor-pointer transition-all"
                    />
                  </div>

                  {/* min-w-0 prevents text from overflowing and squashing the layout */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {item.type === "github" ? (
                        <GitCommit className="size-3 text-zinc-400" />
                      ) : (
                        <Code2 className="size-3 text-orange-400" />
                      )}
                      <span className="text-[10px] font-mono text-zinc-400 truncate">
                        {item.subtitle}
                      </span>
                    </div>
                    <p
                      className={`text-xs font-medium leading-snug font-poppins line-clamp-2 transition-colors ${
                        selectedIndices.has(item.id)
                          ? "text-zinc-800 dark:text-zinc-200"
                          : "text-zinc-400 dark:text-zinc-600"
                      }`}
                    >
                      {item.title}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
              <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center">
                <Github className="size-4 text-zinc-400" />
              </div>
              <p className="text-xs text-zinc-400">No commits found today.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
