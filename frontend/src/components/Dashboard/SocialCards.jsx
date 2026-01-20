import {
  MessageCircle,
  Repeat,
  Heart,
  Share,
  BarChart2,
  Globe,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Send,
} from "lucide-react";

export const TwitterPreview = ({ user, content, setContent }) => {
  return (
    <div className="w-full max-w-[700px] mx-auto bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
      <div className="flex gap-3">
        <div className="size-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0">
          <span className="font-bold text-sm text-zinc-500">
            {user?.username?.[0]?.toUpperCase() || "D"}
          </span>
        </div>
        <div className="flex-1 min-w-0">
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
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What is happening?!"
            className="w-full outline-none bg-transparent border-none focus:ring-0 p-0 mt-4 text-[15px] leading-normal placeholder:text-zinc-500 text-zinc-900 dark:text-zinc-100 resize-none min-h-[120px] custom-scrollbar overflow-y-auto"
            style={{ fieldSizing: "content" }}
          />
          <div className="flex justify-between items-center mt-3 text-zinc-500 max-w-[400px]">
            <div className="group flex items-center gap-1 cursor-pointer hover:text-sky-500">
              <div className="p-2 group-hover:bg-sky-500/10 rounded-full transition-colors">
                <MessageCircle className="size-[18px]" />
              </div>
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

export const LinkedInPreview = ({ user, content, setContent }) => {
  return (
    <div className="w-full max-w-[550px] mx-auto bg-white dark:bg-[#1b1f23] border border-zinc-200 dark:border-zinc-700/50 rounded-lg shadow-sm overflow-hidden font-sans">
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
      <div className="px-4 py-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What do you want to talk about?"
          className="w-full bg-transparent outline-none border-none focus:ring-0 p-0 mt-4 text-sm leading-relaxed placeholder:text-zinc-500 text-zinc-900 dark:text-zinc-100 resize-none min-h-[150px] custom-scrollbar"
          spellCheck="false"
        />
      </div>
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
