import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import {
  Terminal,
  RefreshCw,
  GitCommit,
  Code2,
  Twitter,
  Linkedin,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  LogOut,
  Github,
  Command,
  Settings2,
  Maximize2,
  CheckSquare,
  ListFilter,
  Loader2,
} from "lucide-react";

// --- Custom Scrollbar Styles ---
const globalStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.1);
    border-radius: 10px;
  }
  .custom-scrollbar:hover::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.2);
  }
  .dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.1);
  }
  .dark .custom-scrollbar:hover::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.2);
  }
`;

// --- Components ---

const CircularProgress = ({
  value,
  max,
  size = 18,
  strokeWidth = 2,
  colorClass = "text-indigo-600",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / max) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        className="text-zinc-100 dark:text-zinc-800"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className={`${
          value > max ? "text-red-500" : colorClass
        } transition-all duration-500 ease-out`}
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

const SectionHeader = ({ icon: Icon, title, action }) => (
  <div className="flex items-center justify-between mb-3 px-1">
    <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
      <Icon className="size-3.5" />
      <span className="text-[11px] uppercase tracking-widest leading-none font-roboto font-semibold">
        {title}
      </span>
    </div>
    {action}
  </div>
);

const ToneButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-md font-medium transition-all border cursor-pointer font-poppins text-xs ${
      isActive
        ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-sm"
        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
    }`}
  >
    {label}
  </button>
);

export default function Dashboard() {
  const { user, logout } = useAuth();

  // Data State
  const [githubData, setGithubData] = useState([]);
  const [leetcodeData, setLeetcodeData] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

  // Selection State
  const [selectedIndices, setSelectedIndices] = useState(new Set());

  // Generator State
  const [platform, setPlatform] = useState("twitter");
  const [tone, setTone] = useState("technical");
  const [customTone, setCustomTone] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // LeetCode UI State
  const [leetcodeInput, setLeetcodeInput] = useState("");
  const [isSyncingLC, setIsSyncingLC] = useState(false);

  // 1. Load Data on Mount
  useEffect(() => {
    fetchActivity();
    if (user?.leetcodeUsername) {
      setLeetcodeInput(user.leetcodeUsername);
    }
  }, [user]);

  // 2. Fetch both GitHub and LeetCode
  const fetchActivity = async () => {
    setLoadingActivity(true);
    setGithubData([]);
    setLeetcodeData([]);

    try {
      const [ghRes, lcRes] = await Promise.allSettled([
        api.get("/api/posts/activity"),
        api.get("/api/posts/leetcode"),
      ]);

      if (ghRes.status === "fulfilled") {
        setGithubData(ghRes.value.data.activity || []);
      }
      if (lcRes.status === "fulfilled") {
        setLeetcodeData(lcRes.value.data.data.recentSubmissions || []);
      }
    } catch (err) {
      console.error("Error fetching activity", err);
    } finally {
      setLoadingActivity(false);
    }
  };

  // 3. Combine Data for Display
  const combinedActivity = useMemo(() => {
    const ghItems = githubData.map((item, idx) => ({
      type: "github",
      id: `gh-${idx}`,
      title: item.message,
      subtitle: item.repo,
      time: new Date(),
    }));

    const lcItems = leetcodeData.map((item, idx) => ({
      type: "leetcode",
      id: `lc-${idx}`,
      title: `Solved: ${item.title}`,
      subtitle: "LeetCode",
      time: new Date(item.timestamp),
    }));

    return [...ghItems, ...lcItems];
  }, [githubData, leetcodeData]);

  // 4. Auto-Select All when data loads
  useEffect(() => {
    if (combinedActivity.length > 0) {
      const allIds = new Set(combinedActivity.map((item) => item.id));
      setSelectedIndices(allIds);
    }
  }, [combinedActivity]);

  // --- Handlers ---

  const handleLinkLeetCode = async () => {
    if (!leetcodeInput) return;
    setIsSyncingLC(true);
    try {
      await api.post("/api/posts/leetcode/user", { username: leetcodeInput });
      await fetchActivity();
    } catch (error) {
      alert("Failed to link LeetCode. Check username.");
    } finally {
      setIsSyncingLC(false);
    }
  };

  const handleToggleItem = (id) => {
    const newSet = new Set(selectedIndices);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIndices(newSet);
  };

  const handleSelectAll = () => {
    if (selectedIndices.size === combinedActivity.length) {
      setSelectedIndices(new Set());
    } else {
      const allIds = new Set(combinedActivity.map((item) => item.id));
      setSelectedIndices(allIds);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const selectedTone = customTone || tone;
      const selectedItems = combinedActivity.filter((item) =>
        selectedIndices.has(item.id)
      );

      const submissionData = {
        github: selectedItems
          .filter((i) => i.type === "github")
          .map((i) => ({
            message: i.title,
            repo: i.subtitle,
          })),
        leetcode: selectedItems
          .filter((i) => i.type === "leetcode")
          .map((i) => ({
            title: i.title.replace("Solved: ", ""),
            timestamp: i.time,
          })),
      };

      const { data } = await api.post("/api/posts/generate", {
        platform,
        tone: selectedTone,
        selectedActivity: submissionData,
      });

      setGeneratedContent(data.content);

      // OPTIONAL: Smooth scroll to preview on mobile
      if (window.innerWidth < 1024) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate post. Make sure you have activity today!");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const charCount = generatedContent.length;
  const charLimit = platform === "twitter" ? 280 : 3000;
  const isOverLimit = charCount > charLimit;
  const isAllSelected =
    combinedActivity.length > 0 &&
    selectedIndices.size === combinedActivity.length;

  return (
    <div className="flex h-[100dvh] lg:h-screen w-full flex-col bg-[#Fbfbfb] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden selection:bg-indigo-100 dark:selection:bg-indigo-900/30">
      <style>{globalStyles}</style>

      {/* --- HEADER --- */}
      <header className="flex h-12 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-sm px-4 z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex size-6 items-center justify-center rounded bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm">
            <Terminal className="size-3.5" />
          </div>
          <span className="text-sm font-semibold tracking-tight">
            DevPostGen
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
              Active
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="group relative flex items-center gap-2">
            <div className="size-6 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-700 dark:text-zinc-100">
              {user?.username?.charAt(0).toUpperCase() || "D"}
            </div>
            <span className="hidden sm:inline text-xs font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors font-poppins cursor-pointer">
              {user?.username || "Developer"}
            </span>

            <button
              onClick={logout}
              className="ml-2 flex items-center justify-center size-7 rounded-md text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-red-500 transition-all border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 cursor-pointer"
              title="Sign out"
            >
              <LogOut className="size-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN LAYOUT --- */}
      {/* Mobile: Stack vertically (flex-col), Scrollable (overflow-y-auto) */}
      {/* Desktop: Side-by-side (flex-row), Fixed (overflow-hidden) */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
        {/* --- LEFT SIDEBAR (Controls) --- */}
        <aside className="w-full lg:w-[420px] flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] z-10 shrink-0">
          {/* Scrollable Controls Area */}
          <div className="p-5 space-y-8 lg:flex-1 lg:overflow-y-auto custom-scrollbar">
            {/* 1. ACTIVITY LIST (GitHub + LeetCode) */}
            <section>
              <SectionHeader
                icon={ListFilter}
                title="Daily Activity"
                action={
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSelectAll}
                      className="text-[10px] tracking-wider font-medium text-sky-600 dark:text-sky-400 cursor-pointer transition-all"
                    >
                      {isAllSelected ? "Deselect All" : "Select All"}
                    </button>
                    <div className="h-3 w-px bg-zinc-200 dark:bg-zinc-700"></div>
                    <button
                      onClick={fetchActivity}
                      disabled={loadingActivity}
                      className="group p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
                      title="Refresh Activity"
                    >
                      <RefreshCw
                        className={`size-3.5 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 ${
                          loadingActivity ? "animate-spin" : ""
                        }`}
                      />
                    </button>
                  </div>
                }
              />

              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="max-h-[220px] overflow-y-auto custom-scrollbar divide-y divide-zinc-100 dark:divide-zinc-800">
                  {combinedActivity.length > 0 ? (
                    combinedActivity.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-start gap-3 p-3 hover:bg-white dark:hover:bg-zinc-800/80 cursor-pointer group transition-all duration-300"
                      >
                        <div className="pt-0.5">
                          <input
                            type="checkbox"
                            checked={selectedIndices.has(item.id)}
                            onChange={() => handleToggleItem(item.id)}
                            className="size-3.5 rounded border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 checked:bg-indigo-600 checked:border-indigo-600 text-indigo-600 focus:ring-0 focus:ring-offset-0 cursor-pointer transition-all"
                          />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col gap-1">
                          <p
                            className={`text-xs leading-snug font-poppins line-clamp-2 transition-colors ${
                              selectedIndices.has(item.id)
                                ? "text-zinc-700 dark:text-zinc-200"
                                : "text-zinc-400 dark:text-zinc-600"
                            }`}
                          >
                            {item.title}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="inline-flex items-center gap-1 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1.5 py-0.5 max-w-fit">
                              {item.type === "github" ? (
                                <GitCommit className="size-3 text-zinc-400" />
                              ) : (
                                <Code2 className="size-3 text-orange-400" />
                              )}
                              <span className="text-[10px] font-poppins font-medium text-zinc-500 dark:text-zinc-400 truncate max-w-[120px]">
                                {item.subtitle}
                              </span>
                            </div>
                          </div>
                        </div>
                      </label>
                    ))
                  ) : (
                    <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
                      <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                        <Github className="size-4 text-zinc-400" />
                      </div>
                      <p className="text-xs text-zinc-500">
                        No recent activity found.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <span className="text-[10px] text-zinc-400 font-poppins">
                  {selectedIndices.size} selected
                </span>
              </div>
            </section>

            {/* 2. LEETCODE SETTINGS */}
            <section>
              <SectionHeader icon={Code2} title="LeetCode Integration" />
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={leetcodeInput}
                    onChange={(e) => setLeetcodeInput(e.target.value)}
                    className="w-full h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 text-[13px] placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm dark:text-white"
                    placeholder="Enter LeetCode Username"
                  />
                  {user?.leetcodeUsername &&
                    user.leetcodeUsername === leetcodeInput && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <CheckCircle2 className="size-4 text-emerald-500" />
                      </div>
                    )}
                </div>
                <button
                  onClick={handleLinkLeetCode}
                  disabled={isSyncingLC}
                  className="h-9 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-[13px] font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-sm whitespace-nowrap disabled:opacity-50 cursor-pointer"
                >
                  {isSyncingLC ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Sync Data"
                  )}
                </button>
              </div>
              <p className="text-[10px] text-zinc-400 mt-1.5 ml-1 font-poppins">
                Enter your username to fetch today's solved problems.
              </p>
            </section>

            {/* 3. SETTINGS (Tone & Platform) */}
            <section className="space-y-6">
              <div>
                <SectionHeader icon={Settings2} title="Tone & Style" />
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
                  className="w-full h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all dark:text-white font-poppins text-xs"
                  placeholder="Or type a custom tone (e.g., 'Sarcastic senior dev')..."
                />
              </div>

              <div>
                <SectionHeader icon={Maximize2} title="Target Platform" />
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPlatform("twitter")}
                    className={`flex items-center justify-center gap-2 px-2 py-2.5 rounded-md border text-xs font-poppins transition-all cursor-pointer ${
                      platform === "twitter"
                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-sm"
                        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <Twitter className="size-3.5" fill="currentColor" />
                    Twitter
                  </button>
                  <button
                    onClick={() => setPlatform("linkedin")}
                    className={`flex items-center justify-center gap-2 px-2 py-2.5 rounded-md border text-xs font-poppins transition-all cursor-pointer ${
                      platform === "linkedin"
                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-sm"
                        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <Linkedin className="size-3.5" fill="currentColor" />
                    LinkedIn
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Fixed Bottom Action (Sticky on mobile) */}
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] sticky bottom-0 lg:static z-20">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || combinedActivity.length === 0}
              className="group relative w-full flex items-center justify-center gap-2 h-10 rounded-md bg-sky-600 hover:bg-sky-500 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
            >
              {isGenerating ? (
                <RefreshCw className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4 text-indigo-200 group-hover:text-white transition-colors" />
              )}
              <span className="text-sm font-poppins font-medium">
                {isGenerating ? "Drafting Content..." : "Generate Post"}
              </span>
            </button>
          </div>
        </aside>

        {/* --- RIGHT PREVIEW AREA --- */}
        <main className="flex-1 flex flex-col bg-[#Fbfbfb] dark:bg-[#0c0c0e] relative min-h-[500px] lg:min-h-0">
          <div className="flex h-12 items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-[#09090b]/50">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-[12px] font-poppins font-medium tracking-wider">
                Preview
              </span>
              {generatedContent && (
                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full text-[10px] font-medium border border-emerald-100 dark:border-emerald-500/20">
                  <CheckCircle2 className="size-3" />
                  <span>Optimized</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center size-5">
                  <CircularProgress
                    value={charCount}
                    max={charLimit}
                    size={16}
                    colorClass={
                      isOverLimit
                        ? "text-red-500"
                        : "text-zinc-900 dark:text-zinc-100"
                    }
                  />
                </div>
                <span
                  className={`text-xs font-mono ${
                    isOverLimit ? "text-red-500 font-bold" : "text-zinc-500"
                  }`}
                >
                  {charCount} / {charLimit}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative group overflow-hidden">
            <textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              className="w-full h-full p-8 lg:p-12 resize-none bg-transparent border-none outline-none leading-relaxed text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 font-poppins custom-scrollbar text-sm"
              placeholder="// Your generated post will appear here ready for editing..."
              spellCheck="false"
            />
            {generatedContent && (
              <div className="absolute bottom-8 right-8 transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 shadow-xl px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all"
                >
                  {copied ? (
                    <Check className="size-4 text-emerald-500" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                  <span className="text-xs font-medium">
                    {copied ? "Copied" : "Copy"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
