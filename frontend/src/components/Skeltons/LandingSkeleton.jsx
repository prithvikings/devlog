// src/components/skeletons/LandingSkeleton.jsx

const LandingSkeleton = () => {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
      {/* --- NAVBAR SKELETON --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/90 dark:bg-zinc-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo Skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
            <div className="w-24 h-6 rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
          </div>

          {/* Desktop Links Skeleton */}
          <div className="hidden md:flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-16 h-4 rounded bg-zinc-300 dark:bg-zinc-800 animate-pulse"
              />
            ))}
          </div>

          {/* Actions Skeleton */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
            <div className="w-24 h-9 rounded-md bg-zinc-300 dark:bg-zinc-800 animate-pulse hidden md:block" />
          </div>
        </div>
      </nav>

      {/* --- HERO SKELETON --- */}
      <div className="pt-32 pb-12 flex flex-col items-center text-center px-4">
        {/* Pill Badge */}
        <div className="mb-8 w-32 h-7 rounded-full bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 animate-pulse" />

        {/* Title Line 1 */}
        <div className="w-3/4 md:w-1/2 h-12 md:h-16 rounded-lg bg-zinc-300 dark:bg-zinc-800 animate-pulse mb-4" />

        {/* Title Line 2 (Shorter) */}
        <div className="w-1/2 md:w-1/3 h-12 md:h-16 rounded-lg bg-zinc-300 dark:bg-zinc-800 animate-pulse mb-8" />

        {/* Subtitle Lines */}
        <div className="w-full max-w-md space-y-3 mb-10">
          <div className="w-full h-4 rounded bg-zinc-200 dark:bg-zinc-900 animate-pulse" />
          <div className="w-5/6 mx-auto h-4 rounded bg-zinc-200 dark:bg-zinc-900 animate-pulse" />
        </div>

        {/* Button */}
        <div className="w-40 h-10 rounded-md bg-zinc-300 dark:bg-zinc-800 animate-pulse mb-6" />

        {/* Footer Text */}
        <div className="w-32 h-3 rounded bg-zinc-200 dark:bg-zinc-900 animate-pulse" />

        {/* Extra text to explain the delay (Optional but helpful for Render free tier) */}
        <div className="mt-8 text-xs text-zinc-400 font-mono animate-pulse">
          Waking up server...
        </div>
      </div>
    </div>
  );
};

export default LandingSkeleton;
