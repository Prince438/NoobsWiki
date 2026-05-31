import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Tech Tutorials — Malaysian Tech Wiki",
  description: "Tutorials on how to use PC tech tools, AI tools, and related software.",
};

// ── logo sources (Clearbit CDN — reliable PNG logos) ──────────────────────
const LOGOS: Record<string, string> = {
  hermes:     "/logos/hermes.png",
  obsidian:   "/logos/obsidian.png",
  claude:     "/logos/claude.png",
  kimi:       "/logos/kimi.jpg",
  chatgpt:    "/logos/chatgpt.png",
  perplexity: "/logos/perplexity.avif",
  cursor:     "/logos/cursor.avif",
  copilot:    "/logos/copilot.png",
};

function Logo({ id, alt }: { id: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGOS[id]}
      alt={alt}
      width={24}
      height={24}
      className="h-6 w-6 object-contain"
    />
  );
}

// ── card data ─────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: "hermes",
    href: "/tech-tutorials/hermes",
    label: "Hermes Agent",
    count: "82 videos",
    desc: "Setup guides, skill tutorials, automation workflows, integrations, and advanced Hermes Agent use cases — from beginner crash courses to deep dives.",
  },
  {
    id: "obsidian",
    href: "/tech-tutorials/obsidian",
    label: "Obsidian",
    count: "76 videos",
    desc: "Setup guides, plugin deep dives, vault organisation, daily notes, Dataview, Canvas, and second-brain workflows — for every level of Obsidian user.",
  },
  {
    id: "claude",
    href: "/tech-tutorials/claude",
    label: "Claude",
    count: "70 videos",
    desc: "Beginner guides, Claude Code workflows, MCP integrations, artifacts, projects, and productivity — everything from first steps to advanced agentic AI.",
  },
  {
    id: "kimi",
    href: "/tech-tutorials/kimi",
    label: "Kimi",
    count: "65 videos",
    desc: "Long-context AI tutorials covering Kimi basics, PDF and research workflows, coding, multimodal features, and productivity use cases.",
  },
  {
    id: "chatgpt",
    href: "/tech-tutorials/chatgpt",
    label: "ChatGPT",
    count: "67 videos",
    desc: "Beginner guides, prompting techniques, images and voice, custom GPTs, coding workflows, and productivity — covering everything from basics to advanced use.",
  },
  {
    id: "perplexity",
    href: "/tech-tutorials/perplexity",
    label: "Perplexity",
    count: "54 videos",
    desc: "AI-powered search tutorials covering Perplexity basics, deep research, Pro Search, Pages, collections, and everyday productivity workflows.",
  },
  {
    id: "cursor",
    href: "/tech-tutorials/cursor",
    label: "Cursor",
    count: "106 videos",
    desc: "AI code editor tutorials covering Cursor setup, Composer, agent workflows, codebase navigation, MCP integrations, real project builds, and productivity tips.",
  },
  {
    id: "copilot",
    href: "/tech-tutorials/github-copilot",
    label: "GitHub Copilot",
    count: "108 videos",
    desc: "AI coding assistant tutorials covering setup, chat and prompting, coding and refactor workflows, PR reviews, CLI agents, integrations, and productivity tips.",
  },
];

export default function TechTutorialsPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-12 md:px-8 animate-fade-in">

      {/* Page header */}
      <div className="mb-10 space-y-2">
        <div className="font-mono text-[9px] tracking-[0.25em] text-gold/70 uppercase">
          [ TECH TUTORIALS ]
        </div>
        <h1 className="font-display text-[32px] font-bold uppercase tracking-[0.08em] text-gold leading-none md:text-[40px]">
          Tech Tutorials
        </h1>
        <p className="font-sans text-[13px] leading-relaxed text-charcoal/52 max-w-xl">
          Tutorials on how to use PC tech tools, AI tools, and related software — curated by topic and skill level.
        </p>
      </div>

      {/* Tutorial category cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {CARDS.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel p-6 text-left transition-all duration-300 hover:border-forest/50 hover:shadow-[0_4px_32px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 rounded-t pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none rounded tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div>
              <div className="mb-5 flex items-start justify-between">
                {/* Logo box — white bg so brand colours render correctly */}
                <div className="flex h-9 w-9 items-center justify-center rounded border border-panel-border/50 bg-white overflow-hidden transition-colors duration-300 group-hover:border-forest/35">
                  <Logo id={card.id} alt={card.label} />
                </div>
                <span className="font-mono text-[9px] tracking-widest text-charcoal/38 pt-1">
                  {card.count}
                </span>
              </div>

              <h2 className="mb-2 font-display text-[20px] font-bold tracking-wide text-gold/80 uppercase transition-colors group-hover:text-gold">
                {card.label}
              </h2>

              <p className="mb-7 font-sans text-[12px] leading-relaxed text-charcoal/52">
                {card.desc}
              </p>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[9.5px] font-bold tracking-wider text-gold/55 transition-colors group-hover:text-gold">
              <span>BROWSE TUTORIALS</span>
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
