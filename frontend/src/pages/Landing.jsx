import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Github,
  Terminal,
  Shield,
  Zap,
  Sliders,
  Copy,
  Code2,
  Cpu,
} from "lucide-react";
import Navbar from "../components/landing/Navbar";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
/* -----------------------------
CARD (theme-correct)
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
   SECTION
------------------------------ */
const Section = ({ children, className = "", id = "" }) => (
  <section
    id={id}
    className={`relative z-10 max-w-5xl mx-auto px-6 py-20 ${className}`}
  >
    {children}
  </section>
);

/* -----------------------------
   BADGE (fixed)
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
  const { user, loading, login } = useAuth();

  // ADD "return (" HERE
  return (
    <Section className="pt-24 pb-12">
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

        <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-zinc-900 dark:text-white mb-6">
          Code to content. <br />
          <span className="text-zinc-500 dark:text-zinc-600">
            Zero friction.
          </span>
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed mb-10">
          Turn your daily engineering work into accurate, humble updates.
          Designed for developers who hate marketing.
        </p>

        <button
          onClick={login}
          className="
          h-10 px-6 rounded text-sm font-medium flex items-center gap-2
          bg-zinc-900 text-white hover:bg-zinc-800
          dark:bg-white dark:text-black dark:hover:bg-zinc-200
          transition-colors
        "
        >
          <Github className="w-4 h-4" />
          Continue with GitHub
        </button>

        <p className="mt-4 text-[10px] text-zinc-500 uppercase tracking-widest font-medium">
          Read-only • Open Source
        </p>
      </div>
    </Section>
  ); // CLOSE PARENTHESIS HERE
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
   WHO IT'S FOR / NOT FOR
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

          <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-500 leading-relaxed">
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

          <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-500 leading-relaxed">
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
    <Section>
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
            <p className="text-sm text-zinc-600 dark:text-zinc-500">{f.desc}</p>
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
  <Section className="py-10">
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
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">
              Preview
            </span>
            <Copy className="w-3 h-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer" />
          </div>

          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Productive day shipping UI & fixes.
            <br />
            <br />• Fixed auth race condition • Shipped dark mode • Solved
            LeetCode arrays
          </p>
        </div>
      </div>
    </div>
  </Section>
);

/* -----------------------------
   PAGE
------------------------------ */
export default function LandingPage() {
  const { user, loading, login } = useAuth();
  if (loading) return null; // Or a minimal spinner
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
      <Hero onLogin={() => console.log("Login")} />
      <Integrations />
      <MinimalDemo />
      <Features />
      <Audience />
    </div>
  );
}
