import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Terminal,
  Shield,
  Zap,
  Sliders,
  Copy,
  Code2,
  Cpu,
  Chrome, // <--- Add this
  Download,
  FileArchive,
  ToggleRight,
  FolderInput,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
} from "lucide-react";
import Navbar from "../components/landing/Navbar"; // Adjust path if needed
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

/* -----------------------------
   CARD 
------------------------------ */
const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        relative h-full rounded-lg
        bg-white border border-zinc-300
        dark:bg-[#080808] dark:border-white/5
        shadow-sm dark:shadow-none
        transition-colors
        ${className}
      `}
    >
      <div className="h-full p-6">{children}</div>
    </div>
  );
};

/* -----------------------------
   SECTION (UPDATED FOR SMOOTH SCROLL OFFSET)
------------------------------ */
const Section = ({ children, className = "", id = "" }) => (
  <section
    id={id}
    // Added 'scroll-mt-28': This creates the buffer for the fixed navbar
    className={`relative z-10 max-w-5xl mx-auto px-6 py-20 scroll-mt-24 ${className}`}
  >
    {children}
  </section>
);

/* -----------------------------
   BADGE 
------------------------------ */
const Badge = ({ children }) => (
  <span
    className="
    inline-flex items-center px-2 py-0.5 rounded
    text-[10px] font-medium tracking-tight font-mono
    bg-zinc-100 text-zinc-600 border border-zinc-200
    dark:bg-white/5 dark:text-zinc-400 dark:border-white/5
  "
  >
    {children}
  </span>
);

/* -----------------------------
   HERO
------------------------------ */
const Hero = () => {
  const { login } = useAuth();

  return (
    <Section className="pt-32 pb-12">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="
          mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full
          border border-zinc-200 bg-zinc-50
          dark:border-white/5 dark:bg-white/[0.02]
        "
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-zinc-600 dark:text-zinc-500 font-medium">
            V1.0 Now Public
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-poppins tracking-tighter text-zinc-900 dark:text-white mb-6"
        >
          Code to content. <br />
          <span className="text-zinc-500 dark:text-zinc-600">
            Zero friction.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1 }}
          className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed mb-10"
        >
          Turn your daily engineering work into accurate, humble updates.
          Designed for developers who hate marketing.
        </motion.p>

        <button
          onClick={login}
          className="
    group relative flex h-10 items-center gap-2 overflow-hidden rounded-md px-6 
    text-sm font-medium transition-all duration-200 ease-out
    
    /* LIGHT MODE: High Contrast Zinc */
    bg-zinc-900 text-zinc-50 border border-zinc-800
    hover:bg-zinc-800 hover:border-zinc-700
    
    /* DARK MODE: White/Light Gray */
    dark:bg-zinc-50 dark:text-zinc-900 dark:border-white
    dark:hover:bg-zinc-200
    
    /* THE 'LINEAR' LIP: Inner highlights for 3D feel without gradient bloat */
    shadow-[0px_1px_0px_0px_rgba(255,255,255,0.15)_inset,0px_-1px_0px_0px_rgba(0,0,0,0.2)_inset]
    dark:shadow-[0px_-1px_0px_0px_rgba(0,0,0,0.1)_inset]

    /* INTERACTION */
    active:scale-95 active:shadow-none
    cursor-pointer
  "
        >
          {/* Icon with slight opacity shift on hover */}
          <Github className="w-4 h-4 text-zinc-400 transition-colors group-hover:text-white dark:text-zinc-500 dark:group-hover:text-black" />

          <span className="relative z-10">Continue with GitHub</span>
        </button>

        <p className="mt-4 text-xs text-zinc-500">Read-only • Open Source</p>
      </div>
    </Section>
  );
};

/* -----------------------------
   INTEGRATIONS
------------------------------ */
const Integrations = () => {
  const tools = [
    { name: "GitHub", icon: Github, status: "Connected" },
    { name: "LeetCode", icon: Code2, status: "Connected" },
    { name: "HackerRank", icon: Terminal, status: "Soon" },
    { name: "GeeksForGeeks", icon: Cpu, status: "Soon" },
  ];

  return (
    <Section id="integrations">
      <div className="max-w-3xl mb-8 mt-4">
        <h2 className="text-xl md:text-3xl tracking-tighter text-zinc-900 dark:text-white mb-3">
          Integrations
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed font-poppins">
          Connect your existing coding profiles to automatically pull your
          latest contributions and achievements.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tools.map((tool) => (
          <Card key={tool.name} className="h-32 flex flex-col justify-between">
            <tool.icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {tool.name}
              </h3>
              <Badge>{tool.status}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

/* -----------------------------
   AUDIENCE
------------------------------ */
const Audience = () => {
  return (
    <Section>
      <div className="max-w-3xl mb-8">
        <h2 className="text-xl md:text-3xl tracking-tighter text-zinc-900 dark:text-white mb-3">
          Who This Is For
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed font-poppins">
          This tool is intentionally narrow. If that sounds limiting, it
          probably isn’t for you and that’s okay.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* FOR */}
        <Card>
          <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-200 mb-4">
            Works best for
          </h3>
          <ul className="space-y-3 text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed font-poppins">
            <li>• Developers who ship code consistently</li>
            <li>• Engineers who dislike self-promotion</li>
            <li>• People who prefer facts over framing</li>
            <li>• Builders documenting work, not selling it</li>
            <li>• Anyone tired of performative updates</li>
          </ul>
        </Card>

        {/* NOT FOR */}
        <Card>
          <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-200 mb-4">
            Probably not for
          </h3>
          <ul className="space-y-3 text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed font-poppins">
            <li>• Influencer-style personal brands</li>
            <li>• Engagement-driven posting strategies</li>
            <li>• Emoji-heavy announcement threads</li>
            <li>• “Building in public” as a growth tactic</li>
            <li>• Hype-first, substance-second writing</li>
          </ul>
        </Card>
      </div>
    </Section>
  );
};

/* -----------------------------
   FEATURES
------------------------------ */
const Features = () => {
  const features = [
    {
      title: "Anti-Hype Filter",
      desc: "Automatically removes marketing fluff.",
      icon: Shield,
    },
    {
      title: "Context Aware",
      desc: "Understands the difference between fixes and features.",
      icon: Zap,
    },
    {
      title: "Tone Control",
      desc: "Casual, technical, or brutally minimal.",
      icon: Sliders,
    },
  ];

  return (
    <Section id="features">
      <div className="max-w-3xl mb-8">
        <h2 className="text-xl md:text-3xl tracking-tighter text-zinc-900 dark:text-white mb-3">
          Features
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed font-poppins">
          Everything you need to communicate clearly without the performative
          noise of modern social media.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {features.map((f) => (
          <Card key={f.title} className="h-48">
            <f.icon className="w-5 h-5 text-zinc-600 dark:text-zinc-400 mb-4" />
            <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-200 mb-2">
              {f.title}
            </h3>
            <p className="text-xs leading-relaxed font-poppins text-zinc-600 dark:text-zinc-500">
              {f.desc}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
};

/* -----------------------------
   MINIMAL DEMO
------------------------------ */
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

/* -----------------------------
   SUB-COMPONENT: BROWSER MOCKUP
------------------------------ */
const BrowserMockup = () => (
  <div
    className="
      relative w-full 
      h-64 md:h-full min-h-[250px] 
      overflow-hidden rounded-lg 
      bg-zinc-100 dark:bg-zinc-900 
      border border-zinc-200 dark:border-white/5 
      select-none
    "
  >
    {/* Browser Toolbar */}
    <div className="flex items-center gap-3 px-3 py-2 border-b border-zinc-200 dark:border-white/5 bg-white dark:bg-[#0A0A0A]">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
      </div>
      {/* Address Bar */}
      <div className="flex-1 flex items-center px-2 h-6 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] text-zinc-400 font-mono truncate">
        leetcode.com/problems/two-sum
      </div>
      {/* Extension Icon (Active) */}
      <div className="flex items-center justify-center w-6 h-6 rounded bg-zinc-200 dark:bg-zinc-700 shrink-0">
        <div className="w-3 h-3 bg-zinc-900 dark:bg-white rounded-full animate-pulse" />
      </div>
    </div>

    {/* Browser Content (Abstract) */}
    <div className="p-4 space-y-3 opacity-50">
      <div className="w-3/4 h-2 bg-zinc-200 dark:bg-zinc-800 rounded" />
      <div className="w-1/2 h-2 bg-zinc-200 dark:bg-zinc-800 rounded" />
      <div className="w-full h-32 mt-4 bg-zinc-200 dark:bg-zinc-800 rounded border border-zinc-300 dark:border-white/10" />
    </div>

    {/* The Pop-over Notification */}
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="absolute top-14 right-4 w-48 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl z-10"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-[10px] font-medium text-zinc-500 uppercase">
          Activity Detected
        </span>
      </div>
      <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
        Solved "Two Sum"
      </p>
      <div className="mt-2 h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full w-2/3 bg-zinc-900 dark:bg-white" />
      </div>
    </motion.div>
  </div>
);

/* -----------------------------
   EXTENSION SECTION
------------------------------ */
const ExtensionCTA = () => {
  const GOOGLE_DRIVE_LINK = "YOUR_GOOGLE_DRIVE_LINK_HERE";

  const handleDownload = () => {
    window.open(GOOGLE_DRIVE_LINK, "_blank");
  };

  return (
    <Section id="download">
      <div className="max-w-3xl mb-8">
        <h2 className="text-xl md:text-3xl tracking-tighter text-zinc-900 dark:text-white mb-3">
          Get Extension
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed font-poppins">
          Install the extension and connect your accounts to start tracking your
          progress.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* LEFT: Main Call to Action (Spans 3 columns on desktop) */}
        <Card className="col-span-1 md:col-span-3 flex flex-col justify-between overflow-hidden p-0">
          <div className="p-4 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge>v1.0.2</Badge>
              <span className="text-[10px] text-zinc-400 font-poppins tracking-wider font-medium">
                Chrome & Brave
              </span>
            </div>

            <h2 className="text-xl md:text-3xl font-poppins text-zinc-900 dark:text-white mb-4 tracking-tight">
              Capture context without <br className="hidden md:block" />{" "}
              <span className="text-zinc-400 dark:text-zinc-400 transition-colors duration-200 ease-in-out">
                leaving your tab.
              </span>
            </h2>

            <p className="text-xs text-zinc-600 dark:text-zinc-500 mb-8 max-w-sm leading-relaxed font-poppins">
              The extension sits quietly in your browser. When you solve a
              problem or push code, it captures the diff and logic
              automatically.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownload}
                className="
                  group relative flex h-10 items-center justify-center sm:justify-start gap-2 overflow-hidden rounded-md px-5 
                  text-sm font-medium transition-all duration-200 ease-out shrink-0 w-full sm:w-fit
                  bg-zinc-900 text-zinc-50 border border-zinc-800
                  hover:bg-zinc-800 hover:border-zinc-700
                  dark:bg-zinc-50 dark:text-zinc-900 dark:border-white
                  dark:hover:bg-zinc-200
                  shadow-[0px_1px_0px_0px_rgba(255,255,255,0.15)_inset,0px_-1px_0px_0px_rgba(0,0,0,0.2)_inset]
                  dark:shadow-[0px_-1px_0px_0px_rgba(0,0,0,0.1)_inset]
                  active:scale-95 active:shadow-none cursor-pointer
                "
              >
                <Download className="w-4 h-4 text-zinc-400 transition-colors group-hover:text-white dark:text-zinc-500 dark:group-hover:text-black" />
                <span className="relative z-10">Download Extension</span>
              </button>
            </div>
          </div>

          {/* Technical Metadata Strip (Scrollable on mobile) */}
          <div className="mt-auto px-6 md:px-8 py-4 bg-zinc-50 dark:bg-white/[0.02] border-t border-zinc-200 dark:border-white/5 flex gap-6 overflow-x-auto scrollbar-hide">
            <div className="flex flex-col shrink-0">
              <span className="text-[10px] text-zinc-400 uppercase">Size</span>
              <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300">
                1.2 MB
              </span>
            </div>
            <div className="flex flex-col shrink-0">
              <span className="text-[10px] text-zinc-400 uppercase">
                Privacy
              </span>
              <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300">
                Local Only
              </span>
            </div>
            <div className="flex flex-col shrink-0">
              <span className="text-[10px] text-zinc-400 uppercase">
                Format
              </span>
              <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300">
                .zip / .crx
              </span>
            </div>
          </div>
        </Card>

        {/* RIGHT: Visual Mockup (Spans 2 columns on desktop) */}
        <div className="col-span-1 md:col-span-2 flex flex-col h-full gap-4">
          {/* Mockup Container takes available height or fixed height on mobile */}
          <div className="flex-1 min-h-[250px]">
            <BrowserMockup />
          </div>

          {/* Quick Install Guide */}
          <div className="px-2 pb-2">
            <h4 className="text-xs font-medium text-zinc-900 dark:text-white mb-2">
              Installation
            </h4>
            <ol className="space-y-2 text-[10px] text-zinc-500 font-mono">
              <li className="flex gap-2">
                <span className="text-zinc-400 select-none">01.</span> Unzip the
                downloaded file
              </li>
              <li className="flex gap-2">
                <span className="text-zinc-400 select-none">02.</span> Go to
                chrome://extensions
              </li>
              <li className="flex gap-2">
                <span className="text-zinc-400 select-none">03.</span> Toggle
                "Dev Mode" & Load Unpacked
              </li>
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
};

/* -----------------------------
   INSTALLATION STEPS
------------------------------ */
const InstallationSteps = () => {
  const steps = [
    {
      step: "01",
      title: "Unzip the Archive",
      desc: "Extract the downloaded .zip file to a permanent location.",
      icon: (
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/5">
          <FileArchive className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-white dark:border-zinc-900">
            <CheckCircle2 className="w-3 h-3 text-white" />
          </div>
        </div>
      ),
    },
    {
      step: "02",
      title: "Enable Developer Mode",
      desc: "Go to chrome://extensions and toggle the switch in the top right.",
      url: "chrome://extensions",
      icon: (
        // Animated Toggle Switch
        <motion.div
          animate={{
            // Start Gray -> Turn Green -> Stay Green -> Turn Gray
            backgroundColor: ["#d4d4d8", "#10b981", "#10b981", "#d4d4d8"],
          }}
          transition={{
            duration: 5, // Slower total cycle (5 seconds)
            repeat: Infinity,
            ease: "easeInOut",
            // 0-20% (1s): Turn ON
            // 20-80% (3s): Hold ON
            // 80-100% (1s): Turn OFF
            times: [0, 0.2, 0.8, 1],
          }}
          className="relative w-14 h-8 rounded-full flex items-center px-1 border border-zinc-300 dark:border-white/10 shadow-inner"
        >
          {/* The Knob */}
          <motion.div
            animate={{ x: [0, 24, 24, 0] }} // Slide Right -> Stay -> Slide Left
            transition={{
              duration: 5, // Match parent duration
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.2, 0.8, 1], // Match parent timings
            }}
            className="w-6 h-6 bg-white rounded-full shadow-md shadow-black/10"
          />
        </motion.div>
      ),
    },
    {
      step: "03",
      title: "Load Unpacked",
      desc: "Click the button and select the folder you just unzipped.",
      icon: (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-white/10 shadow-sm">
          <FolderInput className="w-3 h-3 text-zinc-500" />
          <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-300">
            Load Unpacked
          </span>
        </div>
      ),
    },
  ];

  return (
    <Section id="extension" className="pt-0 pb-20">
      {/* Section Header */}
      <div className="mb-12 border-l-2 border-zinc-200 dark:border-zinc-800 pl-6">
        <h2 className="text-xl md:text-3xl tracking-tighter text-zinc-900 dark:text-white mb-3">
          Manual Installation
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed font-poppins max-w-lg">
          Since we are in private beta, the extension is not yet on the Chrome
          Web Store. Follow these 3 simple steps to install it securely.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <Card
            key={i}
            className="group relative overflow-hidden bg-transparent border-dashed border-zinc-300 dark:border-zinc-800 hover:border-solid hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-300"
          >
            {/* Step Number Background */}
            <span className="absolute -top-4 -right-4 text-9xl font-bold text-zinc-100 dark:text-zinc-900/50 select-none group-hover:text-zinc-200 dark:group-hover:text-zinc-800 transition-colors">
              {s.step}
            </span>

            <div className="relative z-10 flex flex-col h-full">
              {/* Visual Icon Area */}
              <div className="h-20 flex items-center mb-4">{s.icon}</div>

              {/* Content */}
              <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-200 mb-2">
                {s.title}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed font-poppins mb-4">
                {s.desc}
              </p>

              {/* Optional URL Copy Snippet */}
              {s.url && (
                <div className="mt-auto inline-flex items-center gap-2 px-2 py-1 bg-zinc-100 dark:bg-black/40 rounded border border-zinc-200 dark:border-white/5 w-fit">
                  <code className="text-[10px] font-mono text-zinc-500">
                    {s.url}
                  </code>
                  <Copy className="w-3 h-3 text-zinc-400 cursor-pointer hover:text-zinc-900 dark:hover:text-white" />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Safety Note (Updated Copy) */}
      <div className="mt-8 flex items-start gap-3 p-4 rounded-lg bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5  hidden md:flex">
        <Shield className="w-4 h-4 text-zinc-600 dark:text-zinc-400 mt-0.5 shrink-0" />
        <div className="space-y-1">
          <p className="text-xs font-medium text-zinc-900 dark:text-zinc-200">
            Developer Preview Build
          </p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
            You are skipping the Chrome Web Store review queue. This build is
            signed for developer use and runs 100% locally on your machine.
            Right Now we are in private beta so we are not on the chrome web
            store.
          </p>
        </div>
      </div>
    </Section>
  );
};

/* -----------------------------
   FAQ ITEM SUB-COMPONENT
------------------------------ */
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-zinc-200 dark:border-white/5 last:border-none">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-4 text-left group"
      >
        <span className="text-sm text-zinc-900 dark:text-zinc-200 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors font-poppins">
          {question}
        </span>
        <div className="relative flex items-center justify-center w-4 h-4">
          <motion.span
            initial={false}
            animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
            className="absolute"
          >
            <Plus className="w-4 h-4 text-zinc-400" />
          </motion.span>
          <motion.span
            initial={false}
            animate={{ rotate: isOpen ? 0 : -90, opacity: isOpen ? 1 : 0 }}
            className="absolute"
          >
            <Minus className="w-4 h-4 text-zinc-400" />
          </motion.span>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-500 font-poppins max-w-lg">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* -----------------------------
   FAQ SECTION
------------------------------ */
const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqs = [
    {
      q: "Does this read my private repositories?",
      a: "The extension only runs on the active tab DOM. It does not request OAuth scopes for your private repos. It simply 'sees' what you see on screen (diffs, problem descriptions) and formats it.",
    },
    {
      q: "Is the AI running locally?",
      a: "We use a hybrid approach. The DOM parsing happens 100% locally. The text summarization is sent to our secure instance of Gemini Flash, which is stateless (we don't train on your data).",
    },
    {
      q: "Is it free forever?",
      a: "The core extension will always be free for open-source contributors. We may introduce a 'Pro' tier for custom AI personalities and automated scheduling later.",
    },
    {
      q: "Can I edit the posts before publishing?",
      a: "Absolutely. We generate a draft. You have full control to edit, rewrite, or discard it before it ever touches your social feed.",
    },
  ];

  return (
    <Section id="faq" className="max-w-2xl">
      <div className="max-w-3xl mb-8">
        <h2 className="text-xl md:text-3xl tracking-tighter text-zinc-900 dark:text-white mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed font-poppins">
          Here are some common questions about DevLog AI.
        </p>
      </div>
      <div className="rounded-lg border border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02] px-6">
        {faqs.map((faq, i) => (
          <FAQItem
            key={i}
            question={faq.q}
            answer={faq.a}
            isOpen={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </Section>
  );
};

/* -----------------------------
   FOOTER
------------------------------ */
const Footer = () => (
  <footer className="py-12 border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950 font-poppins">
    <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-4 gap-8">
      {/* Brand */}
      <div className="md:col-span-2 space-y-4">
        <div className="flex items-center gap-2">
          <img src="./terminal.png" alt="" className="size-8" />
          <span className="font-semibold tracking-tight text-zinc-900 dark:text-white">
            DevLog AI
          </span>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-500 max-w-xs leading-relaxed font-poppins">
          Turning code contributions into social proof. <br />
          Built for engineers, not influencers.
        </p>
      </div>

      {/* Links Column 1 */}
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-1">
          Project
        </h4>
        <a
          href="#"
          className="text-xs text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
        >
          Download
        </a>
        <a
          href="#"
          className="text-xs text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
        >
          Changelog
        </a>
        <a
          href="#"
          className="text-xs text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
        >
          Docs
        </a>
      </div>

      {/* Links Column 2 */}
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-1">
          Legal
        </h4>
        <a
          href="#"
          className="text-xs text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
        >
          Privacy
        </a>
        <a
          href="#"
          className="text-xs text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
        >
          Terms
        </a>
        <a
          href="#"
          className="text-xs text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
        >
          Twitter
        </a>
      </div>
    </div>

    <div className="max-w-5xl mx-auto px-6 mt-12 flex items-center justify-between">
      <p className="text-[10px] text-zinc-400">© 2024 DevLog Inc.</p>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-[10px] text-zinc-500 font-mono">
          All Systems Normal
        </span>
      </div>
    </div>
  </footer>
);

/* -----------------------------
   PAGE
------------------------------ */
export default function LandingPage() {
  const { user, loading, login } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div
      className="
      min-h-screen font-sans
      bg-zinc-100 text-zinc-900
      dark:bg-zinc-950 dark:text-zinc-200
      selection:bg-black/10 dark:selection:bg-white/20
    "
    >
      <Navbar />
      <Hero />
      <Integrations />
      <MinimalDemo />
      <ExtensionCTA />
      <InstallationSteps />
      <Features />
      <Audience />
      <FAQ />
      <Footer />
    </div>
  );
}
