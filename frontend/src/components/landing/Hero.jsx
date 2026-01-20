import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Section from "./components/Section";

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

export default Hero;
