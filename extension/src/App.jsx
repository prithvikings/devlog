import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Terminal,
  Github,
  Loader2,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  GitCommit,
  Code2,
  Twitter,
  Linkedin,
  Settings2,
  ListFilter,
  AlertCircle,
} from "lucide-react";

// --- Styles ---

const globalStyles = `
  /* Slim, non-intrusive scrollbar */
  .custom-scrollbar::-webkit-scrollbar { width: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.1);
    border-radius: 10px;
    border: 2px solid transparent; /* Creates padding around thumb */
    background-clip: content-box;
  }
  .custom-scrollbar:hover::-webkit-scrollbar-thumb { 
    background-color: rgba(0,0,0,0.2); 
  }
  .dark .custom-scrollbar::-webkit-scrollbar-thumb { 
    background-color: rgba(255,255,255,0.1); 
  }
  .dark .custom-scrollbar:hover::-webkit-scrollbar-thumb { 
    background-color: rgba(255,255,255,0.2); 
  }
  
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
`;

const api = axios.create({
  baseURL: "https://devpostgen-backend.onrender.com",
  withCredentials: true,
});

// --- UI Primitives ---

const Skeleton = ({ className }) => (
  <div
    className={`animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded ${className}`}
  />
);

const SectionHeader = ({ icon: Icon, title, action }) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      <Icon className="size-3.5 text-zinc-400" />
      <span className="text-[11px] uppercase tracking-widest font-bold text-zinc-500 dark:text-zinc-400 font-sans">
        {title}
      </span>
    </div>
    {action}
  </div>
);

const ToneButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex-1 py-1.5 rounded-md text-[11px] font-medium transition-all duration-200 
      border font-sans cursor-pointer select-none text-center
      ${
        isActive
          ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black border-zinc-900 dark:border-white shadow-sm"
          : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
      }
    `}
  >
    {label}
  </button>
);

// --- Main Component ---

export default function Popup() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Data
  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(false);
  const [error, setError] = useState(null);

  // UI State
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [platform, setPlatform] = useState("twitter");
  const [tone, setTone] = useState("technical");
  const [generated, setGenerated] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // 1. Initialization
  useEffect(() => {
    const init = async () => {
      try {
        if (typeof chrome !== "undefined" && chrome.storage?.local) {
          const saved = await chrome.storage.local.get([
            "activity",
            "selectedIds",
            "platform",
            "tone",
            "generated",
            "user",
          ]);
          if (saved.user) setUser(saved.user);
          if (saved.activity) setActivity(saved.activity);
          if (saved.selectedIds) setSelectedIds(new Set(saved.selectedIds));
          if (saved.platform) setPlatform(saved.platform);
          if (saved.tone) setTone(saved.tone);
          if (saved.generated) setGenerated(saved.generated);
        }

        const { data } = await api.get("/auth/me");
        setUser(data);

        if (!chrome?.storage?.local && activity.length === 0) {
          fetchActivity();
        }
      } catch (err) {
        if (!user) setUser(null);
      } finally {
        setIsInitializing(false);
        setIsLoaded(true);
      }
    };
    init();
  }, []);

  // 2. Auto-Save
  useEffect(() => {
    if (!isLoaded || typeof chrome === "undefined" || !chrome.storage?.local)
      return;
    chrome.storage.local.set({
      activity,
      selectedIds: Array.from(selectedIds),
      platform,
      tone,
      generated,
      user,
    });
  }, [activity, selectedIds, platform, tone, generated, user, isLoaded]);

  // 3. Handlers
  const fetchActivity = async () => {
    setLoadingActivity(true);
    setError(null);
    try {
      const [ghRes, lcRes] = await Promise.allSettled([
        api.get("/api/posts/activity"),
        api.get("/api/posts/leetcode"),
      ]);

      let items = [];
      if (ghRes.status === "fulfilled") {
        items = [
          ...items,
          ...ghRes.value.data.activity.map((i, idx) => ({
            ...i,
            id: `gh-${idx}`,
            type: "github",
          })),
        ];
      }
      if (lcRes.status === "fulfilled") {
        items = [
          ...items,
          ...lcRes.value.data.data.recentSubmissions.map((i, idx) => ({
            title: i.title,
            repo: "LeetCode",
            id: `lc-${idx}`,
            type: "leetcode",
            timestamp: i.timestamp,
          })),
        ];
      }

      setActivity(items);
      setSelectedIds(new Set(items.map((i) => i.id)));
    } catch (err) {
      console.error("Fetch failed", err);
      setError("Failed to sync.");
    } finally {
      setLoadingActivity(false);
    }
  };

  const handleGenerate = async () => {
    if (selectedIds.size === 0) return;
    setIsGenerating(true);
    const selectedItems = activity.filter((i) => selectedIds.has(i.id));

    try {
      const { data } = await api.post("/api/posts/generate", {
        platform,
        tone,
        selectedActivity: {
          github: selectedItems
            .filter((i) => i.type === "github")
            .map((i) => ({ message: i.message || i.title, repo: i.repo })),
          leetcode: selectedItems
            .filter((i) => i.type === "leetcode")
            .map((i) => ({ title: i.title, timestamp: i.timestamp })),
        },
      });
      setGenerated(data.content);
      setTimeout(() => {
        const scrollContainer = document.getElementById("main-scroll");
        if (scrollContainer)
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }, 100);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLogin = () => {
    const url = "https://devpostgen-backend.onrender.com/auth/github";
    if (typeof chrome !== "undefined" && chrome.tabs)
      chrome.tabs.create({ url });
    else window.location.href = url;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSelection = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  // --- Render ---

  if (isInitializing) {
    return (
      <div className="w-[400px] h-[600px] bg-white dark:bg-[#09090b] flex flex-col gap-4 items-center justify-center">
        <Loader2 className="size-6 animate-spin text-zinc-300" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-[400px] h-[600px] bg-[#fafafa] dark:bg-[#09090b] flex flex-col items-center justify-center p-8 font-sans">
        <div className="size-12 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center mb-6 shadow-sm">
          <Terminal className="size-6 text-zinc-900 dark:text-white" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
          DevPostGen AI
        </h2>
        <p className="text-sm text-zinc-500 text-center mb-8 max-w-[260px] leading-relaxed">
          Your engineering diary, automated. <br /> Connect GitHub to start.
        </p>
        <button
          onClick={handleLogin}
          className="
            flex items-center justify-center gap-2 w-full h-11 rounded-lg
            bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900
            hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all
            active:scale-[0.98] font-medium text-sm
          "
        >
          <Github className="size-4" />
          <span>Connect with GitHub</span>
        </button>
      </div>
    );
  }

  const charLimit = platform === "twitter" ? 280 : 3000;
  const charCount = generated.length;
  const isOverLimit = charCount > charLimit;

  return (
    // REMOVE border-r to avoid double borders in extension popups
    <div className="w-[400px] h-[600px] flex flex-col bg-[#F5F5F7] dark:bg-[#000000] text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden">
      <style>{globalStyles}</style>

      {/* HEADER: Padding-x increased to 6 (24px) */}
      <header className="flex h-14 items-center justify-between px-6 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm">
            <Terminal className="size-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">
            DevPostGen
          </span>
        </div>
        <div className="flex items-center gap-2.5 bg-zinc-100 dark:bg-zinc-800 py-1 pl-2.5 pr-1 rounded-full border border-zinc-200 dark:border-zinc-700/50">
          <span className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-300 truncate max-w-[80px]">
            {user.username}
          </span>
          <div className="size-5 rounded-full bg-white dark:bg-zinc-700 shadow-sm flex items-center justify-center text-[9px] font-bold text-zinc-700 dark:text-zinc-200">
            {user.username?.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* SCROLL CONTENT: Padding-x increased to 6 (24px) */}
      <div
        id="main-scroll"
        className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 space-y-8"
      >
        {/* Activity Section */}
        <section>
          <SectionHeader
            icon={ListFilter}
            title="Today's Log"
            action={
              <button
                onClick={fetchActivity}
                disabled={loadingActivity}
                className="p-1.5 -mr-1.5 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all"
              >
                <RefreshCw
                  className={`size-3.5 ${loadingActivity ? "animate-spin" : ""}`}
                />
              </button>
            }
          />

          <div className="bg-white dark:bg-[#0c0c0e] rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden min-h-[120px]">
            {loadingActivity ? (
              <div className="p-1 space-y-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 p-3">
                    <Skeleton className="size-3.5 rounded-sm" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-2 w-16" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : activity.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <div className="size-10 rounded-full bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center border border-zinc-100 dark:border-zinc-800">
                  <Github className="size-5 text-zinc-300" />
                </div>
                <div className="text-center space-y-0.5">
                  <p className="text-xs font-medium text-zinc-500">
                    No activity found today
                  </p>
                  {error && <p className="text-[10px] text-red-500">{error}</p>}
                </div>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                {activity.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleSelection(item.id)}
                    className="group flex items-start gap-3 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 cursor-pointer transition-colors"
                  >
                    <div
                      className={`
                      mt-0.5 flex size-3.5 items-center justify-center rounded-[4px] border transition-all duration-200 shadow-sm
                      ${
                        selectedIds.has(item.id)
                          ? "bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white"
                          : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 group-hover:border-zinc-400"
                      }
                    `}
                    >
                      <Check
                        className={`size-2.5 text-white dark:text-black transition-transform ${selectedIds.has(item.id) ? "scale-100" : "scale-0"}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        {item.type === "github" ? (
                          <GitCommit className="size-3 text-zinc-400" />
                        ) : (
                          <Code2 className="size-3 text-orange-500" />
                        )}
                        <span className="text-[10px] font-mono text-zinc-400 truncate max-w-[140px]">
                          {item.repo}
                        </span>
                      </div>
                      <p
                        className={`text-[11px] font-medium leading-snug line-clamp-2 transition-colors ${
                          selectedIds.has(item.id)
                            ? "text-zinc-900 dark:text-zinc-100"
                            : "text-zinc-500 dark:text-zinc-500"
                        }`}
                      >
                        {item.message || item.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Settings Section */}
        <section className="space-y-6">
          <div>
            <SectionHeader icon={Settings2} title="Platform" />
            <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800/50">
              {["twitter", "linkedin"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`
                    flex-1 flex items-center justify-center gap-2 h-8 rounded-md text-[10px] font-medium transition-all duration-200
                    ${
                      platform === p
                        ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm border border-zinc-200/50 dark:border-zinc-700"
                        : "text-zinc-500 hover:bg-white/50 dark:hover:bg-zinc-800"
                    }
                  `}
                >
                  {p === "twitter" ? (
                    <Twitter
                      className={`size-3 ${platform === p ? "text-sky-500" : ""}`}
                    />
                  ) : (
                    <Linkedin
                      className={`size-3 ${platform === p ? "text-blue-600" : ""}`}
                    />
                  )}
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader icon={Settings2} title="Tone" />
            <div className="flex gap-2.5">
              {["Technical", "Casual", "Hype"].map((t) => (
                <ToneButton
                  key={t}
                  label={t}
                  isActive={tone === t.toLowerCase()}
                  onClick={() => setTone(t.toLowerCase())}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Output Section */}
        {generated && (
          <section className="animate-fade-in pb-2">
            <div className="flex items-center justify-between mb-2">
              <SectionHeader icon={Sparkles} title="Preview" />
              <span
                className={`text-[9px] font-mono font-medium ${isOverLimit ? "text-red-500" : "text-zinc-400"}`}
              >
                {charCount} / {charLimit}
              </span>
            </div>
            <div className="relative group">
              <textarea
                value={generated}
                readOnly
                className="
                  w-full h-40 rounded-xl p-4 text-xs leading-relaxed resize-none 
                  bg-white dark:bg-[#0c0c0e] 
                  border border-zinc-200 dark:border-zinc-800 
                  focus:outline-none 
                  custom-scrollbar text-zinc-800 dark:text-zinc-300
                  shadow-sm
                "
              />
              <button
                onClick={handleCopy}
                className="
                  absolute bottom-3 right-3 p-2 rounded-lg
                  bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700
                  shadow-[0px_2px_8px_rgba(0,0,0,0.08)] 
                  hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer
                  opacity-0 group-hover:opacity-100
                "
              >
                {copied ? (
                  <Check className="size-4 text-emerald-500" />
                ) : (
                  <Copy className="size-4 text-zinc-500" />
                )}
              </button>
            </div>
          </section>
        )}
      </div>

      {/* FOOTER: Matches header padding */}
      <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] z-20">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || selectedIds.size === 0}
          className="
            group relative w-full flex items-center justify-center cursor-pointer gap-2 h-10 rounded-lg
            bg-zinc-900 dark:bg-zinc-50 
            text-white dark:text-black 
            shadow-[0px_1px_0px_0px_rgba(255,255,255,0.15)_inset] dark:shadow-[0px_-1px_0px_0px_rgba(0,0,0,0.1)_inset]
            hover:bg-zinc-800 dark:hover:bg-zinc-200 
            active:scale-[0.98] transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin text-zinc-400" />
          ) : (
            <Sparkles className="size-4 text-zinc-400 dark:text-zinc-500 group-hover:text-white dark:group-hover:text-black transition-colors" />
          )}
          <span className="text-sm font-medium">
            {isGenerating ? "Writing..." : "Generate Draft"}
          </span>
        </button>
      </div>
    </div>
  );
}
