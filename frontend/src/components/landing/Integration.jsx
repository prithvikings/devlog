import Section from "./components/Section";
import Card from "./components/Card";
import Badge from "./components/Badge";
import { Github, Terminal, Code2, Cpu } from "lucide-react";

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

export default Integrations;
