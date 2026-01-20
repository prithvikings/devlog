import { Shield, Zap, Sliders } from "lucide-react";
import Card from "./components/Card";
import Section from "./components/Section";

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

export default Features;
