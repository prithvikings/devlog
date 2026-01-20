import Section from "./components/Section";
import Card from "./components/Card";
import Badge from "./components/Badge";
import { Download } from "lucide-react";
import BrowserMockup from "./BrowserMockup";

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

export default ExtensionCTA;
