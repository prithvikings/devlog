import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import {
  GitCommit,
  Terminal,
  Copy,
  Check,
  Loader2,
  Sparkles,
  LogOut,
} from "lucide-react";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { user, logout } = useAuth();

  // Data State
  const [activity, setActivity] = useState(null);
  const [loadingActivity, setLoadingActivity] = useState(true);

  // Generator State
  const [platform, setPlatform] = useState("twitter");
  const [tone, setTone] = useState("technical");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    api
      .get("/api/posts/activity")
      .then(({ data }) => setActivity(data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingActivity(false));
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const { data } = await api.post("/api/posts/generate", {
        platform,
        tone,
      });
      setGeneratedContent(data.content);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Terminal className="h-4 w-4" />
            <span>DevLog AI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
              {user?.username}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="h-8 w-8"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        {/* LEFT: Context */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium tracking-tight">
              Daily Ingestion
            </h2>
            <p className="text-sm text-zinc-500">
              Activity detected for {new Date().toLocaleDateString()}
            </p>
          </div>

          {loadingActivity ? (
            <div className="space-y-3">
              <Skeleton className="h-24 w-full bg-zinc-900" />
              <Skeleton className="h-24 w-full bg-zinc-900" />
            </div>
          ) : activity?.activity?.length > 0 ? (
            <div className="space-y-3">
              {activity.activity.map((item, idx) => (
                <Card
                  key={idx}
                  className="bg-zinc-900/50 border-zinc-800 shadow-none"
                >
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                        {item.repo}
                      </span>
                      <GitCommit className="h-3.5 w-3.5 text-zinc-600" />
                    </div>
                    <p className="text-sm text-zinc-300 font-medium leading-normal">
                      {item.message}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.files.slice(0, 3).map((f, i) => (
                        <span
                          key={i}
                          className="text-[10px] text-zinc-500 font-mono border-b border-zinc-800"
                        >
                          {f.filename}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-zinc-900/20 border-dashed border-zinc-800">
              <CardContent className="p-8 text-center space-y-1">
                <p className="text-sm text-zinc-400">No commits found today.</p>
                <p className="text-xs text-zinc-600">Go build something.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* RIGHT: Generator */}
        <div className="space-y-4 lg:pl-8 lg:border-l lg:border-zinc-800">
          <div>
            <h2 className="text-lg font-medium tracking-tight">
              Draft Generator
            </h2>
            <p className="text-sm text-zinc-500">Configure parameters.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-500 uppercase">
                Platform
              </label>
              <Tabs
                value={platform}
                onValueChange={setPlatform}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
                  <TabsTrigger value="twitter">Twitter</TabsTrigger>
                  <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-500 uppercase">
                Tone
              </label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-zinc-900 border-zinc-800">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-800">
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="ship_it">Ship It</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            className="w-full bg-zinc-50 text-zinc-950 hover:bg-zinc-200"
            size="lg"
            onClick={handleGenerate}
            disabled={isGenerating || !activity?.activity?.length}
          >
            {isGenerating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            {isGenerating ? "Drafting..." : "Generate Post"}
          </Button>

          <div className="relative pt-2">
            <Textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              placeholder="Output will appear here..."
              className="min-h-[250px] font-mono text-sm bg-transparent border-zinc-800 resize-none focus-visible:ring-zinc-700"
            />
            {generatedContent && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="absolute top-4 right-4 h-8 bg-zinc-950 border-zinc-800 hover:bg-zinc-900"
              >
                {copied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
