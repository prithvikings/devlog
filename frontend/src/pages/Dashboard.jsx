import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api";

// Sub-components
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import ActivityLog from "../components/Dashboard/ActivityLog";
import ControlPanel from "../components/Dashboard/ControlPanel";
import {
  TwitterPreview,
  LinkedInPreview,
} from "../components/Dashboard/SocialCards";
import {
  CircularProgress,
  CopyButton,
  globalStyles,
} from "../components/Dashboard/Shared";

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

  return (
    <div className="flex h-[100dvh] lg:h-screen w-full flex-col bg-[#Fbfbfb] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <style>{globalStyles}</style>

      {/* --- HEADER --- */}
      <DashboardHeader user={user} logout={logout} />

      {/* --- MAIN LAYOUT --- */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
        {/* --- LEFT SIDEBAR (Controls) --- */}
        <aside className="w-full lg:w-[400px] xl:w-[440px] flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 bg-[#fcfcfc] dark:bg-[#09090b] z-10 shrink-0">
          <div className="p-4">
            <ActivityLog
              activity={combinedActivity}
              selectedIndices={selectedIndices}
              onToggleItem={handleToggleItem}
              onSelectAll={handleSelectAll}
              onRefresh={fetchActivity}
              loading={loadingActivity}
            />
          </div>

          <ControlPanel
            user={user}
            leetcodeInput={leetcodeInput}
            setLeetcodeInput={setLeetcodeInput}
            handleLinkLeetCode={handleLinkLeetCode}
            isSyncingLC={isSyncingLC}
            tone={tone}
            setTone={setTone}
            customTone={customTone}
            setCustomTone={setCustomTone}
            platform={platform}
            setPlatform={setPlatform}
            handleGenerate={handleGenerate}
            isGenerating={isGenerating}
            hasActivity={combinedActivity.length > 0}
          />
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
            {/* Background decoration */}
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

            {/* Floating Copy Button */}
            {generatedContent && (
              <div className="absolute bottom-8 right-8 z-20 flex gap-2">
                <CopyButton handleCopy={handleCopy} copied={copied} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
