import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api";
// Adjust this import path if your file structure is different
import { ThemeToggle } from "../components/Landing/Themetoggle";
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
  Settings2,
  Maximize2,
  ListFilter,
  Loader2,
  MessageCircle,
  Heart,
  Repeat,
  Share,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Send,
  Globe,
  BarChart2,
} from "lucide-react";

// --- Custom Scrollbar Styles (Refined for "Linear" look) ---
const globalStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.05);
    border: 3px solid transparent;
    background-clip: content-box;
    border-radius: 99px;
  }
  .custom-scrollbar:hover::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.1);
    border: 3px solid transparent;
    background-clip: content-box;
  }
  .dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.05);
    border: 3px solid transparent;
    background-clip: content-box;
  }
  .dark .custom-scrollbar:hover::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.1);
    border: 3px solid transparent;
    background-clip: content-box;
  }
`;

// --- Components ---

const TwitterPreview = ({ user, content, setContent }) => {
  return (
    <div className="w-full max-w-[700px] mx-auto bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="size-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0">
          <span className="font-bold text-sm text-zinc-500">
            {user?.username?.[0]?.toUpperCase() || "D"}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-1 text-[15px]">
            <span className="font-bold text-zinc-900 dark:text-white truncate">
              {user?.username || "Developer"}
            </span>
            <span className="text-zinc-500 truncate">
              @{user?.username || "dev"}
            </span>
            <span className="text-zinc-500">·</span>
            <span className="text-zinc-500">1m</span>
          </div>

          {/* Editor Area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What is happening?!"
            // CHANGE HERE: Added 'custom-scrollbar' and changed 'overflow-hidden' to 'overflow-y-auto'
            className="w-full outline-none bg-transparent border-none focus:ring-0 p-0 mt-4 text-[15px] leading-normal placeholder:text-zinc-500 text-zinc-900 dark:text-zinc-100 resize-none min-h-[120px] custom-scrollbar overflow-y-auto"
            style={{ fieldSizing: "content" }}
          />

          {/* Twitter Footer Actions */}
          <div className="flex justify-between items-center mt-3 text-zinc-500 max-w-[400px]">
            {/* ... (rest of the footer icons remain the same) ... */}
            <div className="group flex items-center gap-1 cursor-pointer hover:text-sky-500">
              <div className="p-2 group-hover:bg-sky-500/10 rounded-full transition-colors">
                <MessageCircle className="size-[18px]" />
              </div>
              <span className="text-xs"></span>
            </div>
            <div className="group flex items-center gap-1 cursor-pointer hover:text-green-500">
              <div className="p-2 group-hover:bg-green-500/10 rounded-full transition-colors">
                <Repeat className="size-[18px]" />
              </div>
            </div>
            <div className="group flex items-center gap-1 cursor-pointer hover:text-pink-500">
              <div className="p-2 group-hover:bg-pink-500/10 rounded-full transition-colors">
                <Heart className="size-[18px]" />
              </div>
            </div>
            <div className="group flex items-center gap-1 cursor-pointer hover:text-sky-500">
              <div className="p-2 group-hover:bg-sky-500/10 rounded-full transition-colors">
                <BarChart2 className="size-[18px]" />
              </div>
            </div>
            <div className="group flex items-center gap-1 cursor-pointer hover:text-sky-500">
              <div className="p-2 group-hover:bg-sky-500/10 rounded-full transition-colors">
                <Share className="size-[18px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LinkedInPreview = ({ user, content, setContent }) => {
  return (
    <div className="w-full max-w-[550px] mx-auto bg-white dark:bg-[#1b1f23] border border-zinc-200 dark:border-zinc-700/50 rounded-lg shadow-sm overflow-hidden font-sans">
      {/* Header */}
      <div className="flex gap-3 p-3 pb-1">
        <div className="size-12 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center shrink-0">
          <span className="font-bold text-sm text-zinc-500 dark:text-zinc-300">
            {user?.username?.[0]?.toUpperCase() || "D"}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white hover:text-blue-600 hover:underline cursor-pointer">
              {user?.username || "Developer"}
            </h3>
            <MoreHorizontal className="size-5 text-zinc-500" />
          </div>
          <p className="text-xs text-zinc-500 truncate">Software Engineer</p>
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <span>Now</span>
            <span>•</span>
            <Globe className="size-3" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What do you want to talk about?"
          // CHANGE HERE: Added 'custom-scrollbar'
          className="w-full bg-transparent outline-none border-none focus:ring-0 p-0 mt-4 text-sm leading-relaxed placeholder:text-zinc-500 text-zinc-900 dark:text-zinc-100 resize-none min-h-[150px] custom-scrollbar"
          spellCheck="false"
        />
      </div>

      {/* Footer Stats Mockup... (rest of the component remains the same) */}
      <div className="px-4 py-2 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex justify-between items-center py-1">
          <div className="flex gap-4 w-full">
            <button className="flex items-center gap-1.5 px-2 py-3 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex-1 justify-center text-zinc-500 dark:text-zinc-400">
              <ThumbsUp className="size-5 -scale-x-100" />
              <span className="text-sm font-medium">Like</span>
            </button>
            <button className="flex items-center gap-1.5 px-2 py-3 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex-1 justify-center text-zinc-500 dark:text-zinc-400">
              <MessageSquare className="size-5" />
              <span className="text-sm font-medium">Comment</span>
            </button>
            <button className="flex items-center gap-1.5 px-2 py-3 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex-1 justify-center text-zinc-500 dark:text-zinc-400">
              <Repeat className="size-5" />
              <span className="text-sm font-medium">Repost</span>
            </button>
            <button className="flex items-center gap-1.5 px-2 py-3 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex-1 justify-center text-zinc-500 dark:text-zinc-400">
              <Send className="size-5" />
              <span className="text-sm font-medium">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const CircularProgress = ({ value, max, size = 16, strokeWidth = 2 }) => {
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
        className={`${
          isOver ? "text-red-500" : "text-zinc-900 dark:text-zinc-100"
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

// High-precision toggle button
const ToneButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      px-3 py-1.5 rounded text-[11px] font-medium transition-all duration-200 
      border font-poppins cursor-pointer select-none
      ${
        isActive
          ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black border-zinc-900 dark:border-white shadow-sm"
          : "bg-transparent text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      }
    `}
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
        selectedIndices.has(item.id),
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
    <div className="flex h-[100dvh] lg:h-screen w-full flex-col bg-[#Fbfbfb] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <style>{globalStyles}</style>

      {/* --- HEADER --- */}
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
          {/* THEME TOGGLE INTEGRATION */}
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

      {/* --- MAIN LAYOUT --- */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
        {/* --- LEFT SIDEBAR (Controls) --- */}
        <aside className="w-full lg:w-[400px] xl:w-[440px] flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 bg-[#fcfcfc] dark:bg-[#09090b] z-10 shrink-0">
          <div className="p-6 space-y-8 lg:flex-1 lg:overflow-y-auto custom-scrollbar">
            {/* 1. ACTIVITY LIST */}
            <section>
              <SectionHeader
                icon={ListFilter}
                title="Daily Log"
                action={
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSelectAll}
                      className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      {isAllSelected ? "Deselect" : "Select All"}
                    </button>
                    <button
                      onClick={fetchActivity}
                      disabled={loadingActivity}
                      className="cursor-pointer text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      <RefreshCw
                        className={`size-3.5 ${
                          loadingActivity ? "animate-spin" : ""
                        }`}
                      />
                    </button>
                  </div>
                }
              />

              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0e] overflow-hidden shadow-sm">
                <div className="max-h-[240px] overflow-y-auto custom-scrollbar">
                  {combinedActivity.length > 0 ? (
                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                      {combinedActivity.map((item) => (
                        <label
                          key={item.id}
                          className="flex items-start gap-3 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 cursor-pointer group transition-colors"
                        >
                          <div className="pt-0.5">
                            <input
                              type="checkbox"
                              checked={selectedIndices.has(item.id)}
                              onChange={() => handleToggleItem(item.id)}
                              className="size-3.5 rounded-sm border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 checked:bg-zinc-900 dark:checked:bg-zinc-100 checked:border-zinc-900 dark:checked:border-zinc-100 focus:ring-0 focus:ring-offset-0 cursor-pointer transition-all"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              {item.type === "github" ? (
                                <GitCommit className="size-3 text-zinc-400" />
                              ) : (
                                <Code2 className="size-3 text-orange-400" />
                              )}
                              <span className="text-[10px] font-mono text-zinc-400">
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
                      <p className="text-xs text-zinc-400">
                        No commits found today.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* 2. LEETCODE SETTINGS */}
            <section>
              <SectionHeader icon={Code2} title="Sync Source" />
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={leetcodeInput}
                    onChange={(e) => setLeetcodeInput(e.target.value)}
                    className="
                        w-full h-9 rounded-md 
                        bg-zinc-50 dark:bg-[#0c0c0e]
                        border-transparent focus:bg-white dark:focus:bg-black
                        ring-1 ring-zinc-200 dark:ring-zinc-800 focus:ring-zinc-400 dark:focus:ring-zinc-600
                        px-3 text-xs placeholder:text-zinc-400 
                        outline-none transition-all shadow-[0px_1px_2px_rgba(0,0,0,0.04)_inset]
                        dark:text-white
                    "
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
                  className="
                    h-9 px-4 rounded-md 
                    bg-white dark:bg-zinc-800 
                    border border-zinc-200 dark:border-zinc-700 
                    text-xs font-medium text-zinc-600 dark:text-zinc-300 
                    hover:bg-zinc-50 dark:hover:bg-zinc-700 
                    transition-all shadow-sm active:translate-y-px
                    disabled:opacity-50 cursor-pointer
                  "
                >
                  {isSyncingLC ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    "Sync"
                  )}
                </button>
              </div>
            </section>

            {/* 3. SETTINGS */}
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
                  className="
                    w-full h-9 rounded-md 
                    bg-zinc-50 dark:bg-[#0c0c0e]
                    border-transparent focus:bg-white dark:focus:bg-black
                    ring-1 ring-zinc-200 dark:ring-zinc-800 focus:ring-zinc-400 dark:focus:ring-zinc-600
                    px-3 text-xs placeholder:text-zinc-400 
                    outline-none transition-all shadow-[0px_1px_2px_rgba(0,0,0,0.04)_inset]
                    dark:text-white font-poppins
                  "
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
                      className={`
                            flex items-center justify-center gap-2 h-9 rounded-md text-xs font-medium transition-all cursor-pointer border
                            ${
                              platform === p
                                ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black border-zinc-900 dark:border-white shadow-sm"
                                : "bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                            }
                        `}
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
              disabled={isGenerating || combinedActivity.length === 0}
              className="
                group relative w-full flex items-center justify-center gap-2 h-10 rounded-md 
                bg-zinc-900 dark:bg-zinc-50 
                text-white dark:text-black 
                shadow-[0px_1px_0px_0px_rgba(255,255,255,0.15)_inset] dark:shadow-[0px_-1px_0px_0px_rgba(0,0,0,0.1)_inset]
                hover:bg-zinc-800 dark:hover:bg-zinc-200 
                active:scale-[0.98] transition-all duration-200 ease-out
                disabled:opacity-50 disabled:cursor-not-allowed
                cursor-pointer
              "
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
        </aside>

        {/* --- RIGHT PREVIEW AREA --- */}
        <main className="flex-1 flex flex-col bg-[#Fbfbfb] dark:bg-[#000000] relative min-h-[500px] lg:min-h-0">
          {/* Preview Header */}
          <div className="flex h-12 items-center justify-between px-8 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Editor
            </span>
            <div className="flex items-center gap-3">
              {isOverLimit && (
                <span className="text-[10px] font-bold text-red-500">
                  Limit Exceeded
                </span>
              )}
              <div className="flex items-center gap-2 pl-3 border-l border-zinc-200 dark:border-zinc-800">
                <CircularProgress
                  value={charCount}
                  max={charLimit}
                  size={14}
                  strokeWidth={2}
                />
                <span className="text-[10px] font-mono text-zinc-400">
                  {charCount}/{charLimit}
                </span>
              </div>
            </div>
          </div>

          {/* Editor Area - Conditionally Rendered */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex items-center justify-center bg-zinc-50/50 dark:bg-black/50 custom-scrollbar relative">
            {/* Background decoration for "Preview" feel */}
            <div
              className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#a1a1aa 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            ></div>

            <div className="w-full z-0">
              {platform === "twitter" ? (
                <TwitterPreview
                  user={user}
                  content={generatedContent}
                  setContent={setGeneratedContent}
                />
              ) : (
                <LinkedInPreview
                  user={user}
                  content={generatedContent}
                  setContent={setGeneratedContent}
                />
              )}
            </div>

            {/* Floating Action Buttons */}
            {generatedContent && (
              <div className="absolute bottom-8 right-8 z-20 flex gap-2">
                <button
                  onClick={handleCopy}
                  className="
                  flex items-center gap-2 px-4 py-2.5 rounded-full 
                  bg-zinc-900 dark:bg-white text-white dark:text-black 
                  shadow-xl hover:-translate-y-0.5 
                  active:translate-y-0 active:scale-95 
                  transition-all duration-200 cursor-pointer
                  border border-zinc-800 dark:border-zinc-200
                "
                >
                  {copied ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  <span className="text-xs font-bold">
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
