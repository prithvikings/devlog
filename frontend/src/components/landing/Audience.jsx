import Section from "./components/Section";
import Card from "./components/Card";

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
          <ul className="space-y-3 text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed font-poppins">
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
          <ul className="space-y-3 text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed font-poppins">
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

export default Audience;
