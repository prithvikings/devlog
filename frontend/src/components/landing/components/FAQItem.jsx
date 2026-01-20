import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

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

export default FAQItem;
