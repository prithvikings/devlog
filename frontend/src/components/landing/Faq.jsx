import Section from "./components/Section";
import FAQItem from "./components/FAQItem";
import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

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
          Here are some common questions about DevPostGen AI.
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

export default FAQ;
