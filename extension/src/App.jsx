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
} from "lucide-react";

const api = axios.create({
  baseURL: "http://localhost:8002",
  withCredentials: true,
});

export default function Popup() {
  const [loading, setLoading] = useState(true);
  // This is the Gatekeeper: It prevents saving empty data over your actual data
  const [isLoaded, setIsLoaded] = useState(false);

  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [platform, setPlatform] = useState("twitter");
  const [tone, setTone] = useState("technical");
  const [generated, setGenerated] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // 1. INITIALIZE: Load from Storage -> Then Check Session
  useEffect(() => {
    const init = async () => {
      try {
        // A. Load saved state from Chrome Storage
        if (
          typeof chrome !== "undefined" &&
          chrome.storage &&
          chrome.storage.local
        ) {
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

        // B. Verify Session (Background check)
        // We do this silently so we don't block the UI if we have cached data
        try {
          const { data } = await api.get("/auth/me");
          setUser(data);

          // Only auto-fetch if we have absolutely nothing
          if (
            (!chrome?.storage || !chrome.storage.local) &&
            activity.length === 0
          ) {
            fetchActivity();
          }
        } catch (err) {
          // If 401, only clear user if we don't have a cached one,
          // or force them to login again. For now, let's trust the cookie check.
          if (!user) setUser(null);
        }
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        setLoading(false);
        setIsLoaded(true); // <--- CRITICAL: Allow saving now
      }
    };

    init();
  }, []);

  // 2. AUTO-SAVE: Persist changes ONLY after loading is done
  useEffect(() => {
    // If we haven't finished loading storage yet, DO NOT SAVE.
    // This prevents overwriting storage with empty initial state.
    if (!isLoaded) return;
    if (
      typeof chrome === "undefined" ||
      !chrome.storage ||
      !chrome.storage.local
    )
      return;

    const stateToSave = {
      activity,
      selectedIds: Array.from(selectedIds),
      platform,
      tone,
      generated,
      user, // Save user to keep session feeling fast
    };

    chrome.storage.local.set(stateToSave);
  }, [activity, selectedIds, platform, tone, generated, user, isLoaded]);

  const fetchActivity = async () => {
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
      // On manual refresh, we typically want to select all new items
      const newIds = new Set(items.map((i) => i.id));
      setSelectedIds(newIds);
    } catch (err) {
      console.error("Failed to fetch activity");
    }
  };

  const handleLogin = () => {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.create({ url: "http://localhost:8002/auth/github" });
    } else {
      window.location.href = "http://localhost:8002/auth/github";
    }
  };

  const handleGenerate = async () => {
    if (selectedIds.size === 0) return;
    setIsGenerating(true);

    const selectedItems = activity.filter((i) => selectedIds.has(i.id));
    const payload = {
      github: selectedItems
        .filter((i) => i.type === "github")
        .map((i) => ({ message: i.message || i.title, repo: i.repo })),
      leetcode: selectedItems
        .filter((i) => i.type === "leetcode")
        .map((i) => ({ title: i.title, timestamp: i.timestamp })),
    };

    try {
      const { data } = await api.post("/api/posts/generate", {
        platform,
        tone,
        selectedActivity: payload,
      });
      setGenerated(data.content);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleSelection = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- RENDER ---

  if (loading) {
    return (
      <div className="w-[350px] h-[400px] bg-zinc-950 flex items-center justify-center text-zinc-500">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  // LOGIN STATE
  if (!user) {
    return (
      <div className="w-[350px] h-[450px] bg-zinc-950 text-zinc-50 p-8 flex flex-col items-center justify-center text-center font-sans">
        <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center mb-6 shadow-inner">
          <Terminal className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-medium tracking-tight mb-2">DevLog AI</h2>
        <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
          Connect your GitHub & LeetCode to generate updates instantly.
        </p>

        <button
          onClick={handleLogin}
          className="
            group relative flex items-center justify-center gap-2 w-full h-10 rounded-md 
            bg-zinc-50 text-zinc-950 
            hover:bg-zinc-200 transition-all
            shadow-[0px_-1px_0px_0px_rgba(0,0,0,0.1)_inset]
            active:scale-[0.98]
          "
        >
          <Github className="w-4 h-4" />
          <span className="text-xs font-semibold">Login with GitHub</span>
        </button>
      </div>
    );
  }

  // DASHBOARD STATE
  return (
    <div className="w-[380px] bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans min-h-[500px] flex flex-col">
      {/* HEADER */}
      <header className="h-12 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 bg-zinc-100/50 dark:bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          <span className="text-xs font-semibold tracking-wide">DevLog</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] text-zinc-500 font-mono">
            {user.username}
          </span>
        </div>
      </header>

      {/* CONTENT */}
      <div className="p-4 flex-1 flex flex-col gap-6">
        {/* 1. ACTIVITY SELECTOR */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
              Today's Work
            </span>
            <button
              onClick={() => fetchActivity()}
              className="text-zinc-500 hover:text-white transition-colors"
              title="Resync Activity"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          <div className="max-h-[150px] overflow-y-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-1 custom-scrollbar">
            {activity.length === 0 ? (
              <div className="text-center py-4 text-[10px] text-zinc-500">
                No activity found.
                <br />
                Click refresh to sync.
              </div>
            ) : (
              activity.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleSelection(item.id)}
                  className={`
                            flex items-center gap-3 p-2 rounded cursor-pointer transition-all border border-transparent
                            ${
                              selectedIds.has(item.id)
                                ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                                : "hover:bg-zinc-50 dark:hover:bg-zinc-900"
                            }
                        `}
                >
                  <div
                    className={`w-3 h-3 rounded-sm border flex items-center justify-center ${
                      selectedIds.has(item.id)
                        ? "bg-zinc-900 dark:bg-white border-transparent"
                        : "border-zinc-600"
                    }`}
                  >
                    {selectedIds.has(item.id) && (
                      <Check className="w-2 h-2 text-white dark:text-black" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-medium truncate leading-tight">
                      {item.message || item.title}
                    </div>
                    <div className="text-[9px] text-zinc-500 font-mono mt-0.5">
                      {item.repo}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* 2. CONTROLS */}
        <section className="grid grid-cols-2 gap-3">
          {/* Platform */}
          <div>
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block mb-2">
              Platform
            </span>
            <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-md border border-zinc-200 dark:border-zinc-800">
              {["twitter", "linkedin"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`flex-1 py-1 text-[10px] font-medium rounded capitalize transition-all ${
                    platform === p
                      ? "bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white"
                      : "text-zinc-500"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div>
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block mb-2">
              Tone
            </span>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full h-[26px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] rounded-md px-2 outline-none focus:ring-1 focus:ring-zinc-500 dark:text-white"
            >
              <option value="technical">Technical</option>
              <option value="casual">Casual</option>
              <option value="hype">Hype</option>
            </select>
          </div>
        </section>

        {/* 3. GENERATE BUTTON */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating || selectedIds.size === 0}
          className="
                group relative w-full h-9 rounded-md flex items-center justify-center gap-2
                bg-zinc-900 dark:bg-zinc-50 
                text-white dark:text-black
                shadow-[0px_1px_0px_0px_rgba(255,255,255,0.15)_inset] dark:shadow-[0px_-1px_0px_0px_rgba(0,0,0,0.1)_inset]
                hover:bg-zinc-800 dark:hover:bg-zinc-200
                active:scale-[0.98] transition-all
                disabled:opacity-50 disabled:cursor-not-allowed
            "
        >
          {isGenerating ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Sparkles className="w-3 h-3 text-zinc-400 group-hover:text-white dark:group-hover:text-black" />
          )}
          <span className="text-xs font-medium">
            {isGenerating ? "Writing..." : "Generate Draft"}
          </span>
        </button>

        {/* 4. OUTPUT AREA (PERSISTENT) */}
        {generated && (
          <div className="relative group animation-fade-in pb-4">
            <textarea
              readOnly
              value={generated}
              className="w-full h-[120px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md p-3 text-xs leading-relaxed resize-none focus:outline-none custom-scrollbar"
            />
            <button
              onClick={handleCopy}
              className="absolute bottom-6 right-2 p-1.5 bg-zinc-900 dark:bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-105 active:scale-95"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3 text-white dark:text-black" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
