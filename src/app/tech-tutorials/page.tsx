import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

export const metadata = {
  title: "Tech Tutorials — KD Tech Wiki",
  description: "Tutorials on how to use PC tech tools, AI tools, and related software.",
};

export default function TechTutorialsPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-12 md:px-8 animate-fade-in">

      {/* Page header */}
      <div className="mb-10 space-y-2">
        <div className="font-mono text-[9px] tracking-[0.25em] text-gold/70 uppercase">
          [ TECH TUTORIALS ]
        </div>
        <h1 className="font-display text-[32px] font-bold uppercase tracking-[0.08em] text-charcoal leading-none md:text-[40px]">
          Tech Tutorials
        </h1>
        <p className="font-sans text-[13px] leading-relaxed text-charcoal/52 max-w-xl">
          Tutorials on how to use PC tech tools, AI tools, and related software — curated by topic and skill level.
        </p>
      </div>

      {/* Tutorial category cards */}
      <div className="grid gap-4 md:grid-cols-2">

        {/* Hermes Agent */}
        <Link
          href="/tech-tutorials/hermes"
          className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel p-6 text-left transition-all duration-300 hover:border-forest/50 hover:shadow-[0_4px_32px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 rounded-t pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none rounded tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div>
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded border border-panel-border bg-cream text-gold transition-colors duration-300 group-hover:border-forest/35">
                <PlayCircle className="h-[17px] w-[17px] stroke-[1.8]" />
              </div>
              <span className="font-mono text-[9px] tracking-widest text-charcoal/22 pt-1">82 videos</span>
            </div>

            <h2 className="mb-2 font-display text-[20px] font-bold tracking-wide text-charcoal uppercase transition-colors group-hover:text-gold/90">
              Hermes Agent
            </h2>

            <p className="mb-7 font-sans text-[12px] leading-relaxed text-charcoal/52">
              Setup guides, skill tutorials, automation workflows, integrations, and advanced Hermes Agent use cases — from beginner crash courses to deep dives.
            </p>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[9.5px] font-bold tracking-wider text-gold/55 transition-colors group-hover:text-gold">
            <span>BROWSE TUTORIALS</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </Link>

        {/* Obsidian */}
        <Link
          href="/tech-tutorials/obsidian"
          className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel p-6 text-left transition-all duration-300 hover:border-forest/50 hover:shadow-[0_4px_32px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 rounded-t pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none rounded tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div>
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded border border-panel-border bg-cream text-gold transition-colors duration-300 group-hover:border-forest/35">
                <PlayCircle className="h-[17px] w-[17px] stroke-[1.8]" />
              </div>
              <span className="font-mono text-[9px] tracking-widest text-charcoal/22 pt-1">76 videos</span>
            </div>

            <h2 className="mb-2 font-display text-[20px] font-bold tracking-wide text-charcoal uppercase transition-colors group-hover:text-gold/90">
              Obsidian
            </h2>

            <p className="mb-7 font-sans text-[12px] leading-relaxed text-charcoal/52">
              Setup guides, plugin deep dives, vault organisation, daily notes, Dataview, Canvas, and second-brain workflows — for every level of Obsidian user.
            </p>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[9.5px] font-bold tracking-wider text-gold/55 transition-colors group-hover:text-gold">
            <span>BROWSE TUTORIALS</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </Link>

        {/* Claude */}
        <Link
          href="/tech-tutorials/claude"
          className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel p-6 text-left transition-all duration-300 hover:border-forest/50 hover:shadow-[0_4px_32px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 rounded-t pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none rounded tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div>
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded border border-panel-border bg-cream text-gold transition-colors duration-300 group-hover:border-forest/35">
                <PlayCircle className="h-[17px] w-[17px] stroke-[1.8]" />
              </div>
              <span className="font-mono text-[9px] tracking-widest text-charcoal/22 pt-1">70 videos</span>
            </div>

            <h2 className="mb-2 font-display text-[20px] font-bold tracking-wide text-charcoal uppercase transition-colors group-hover:text-gold/90">
              Claude
            </h2>

            <p className="mb-7 font-sans text-[12px] leading-relaxed text-charcoal/52">
              Beginner guides, Claude Code workflows, MCP integrations, artifacts, projects, and productivity — everything from first steps to advanced agentic AI.
            </p>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[9.5px] font-bold tracking-wider text-gold/55 transition-colors group-hover:text-gold">
            <span>BROWSE TUTORIALS</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </Link>

      </div>
    </div>
  );
}
