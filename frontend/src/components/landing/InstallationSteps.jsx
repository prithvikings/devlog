import { motion } from "motion/react";
import { FileArchive, CheckCircle2 } from "lucide-react";
import Section from "./components/Section";
import Card from "./components/Card";
import { FolderInput, Copy, Shield } from "lucide-react";

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

export default InstallationSteps;
