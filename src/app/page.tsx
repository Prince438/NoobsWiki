import Link from "next/link";
import { Users, Cpu, ShieldAlert, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">

      <main className="mx-auto flex flex-1 w-full max-w-5xl flex-col items-center justify-center px-6 py-20 text-center md:px-8">

        {/* System status badge */}
        <div className="mb-10 inline-flex items-center gap-2.5 rounded border border-panel-border bg-panel px-4 py-1.5 font-mono text-[9.5px] tracking-widest text-charcoal/45 shadow-sm animate-fade-in">
          <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60"></span>
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-forest"></span>
          </span>
          <span>MALAYSIA TECH ECOSYSTEM INTEL</span>
          <span className="text-panel-border/60 select-none">·</span>
          <span className="font-bold text-gold/75">ACTIVE</span>
        </div>

        {/* Logo mark + wordmark */}
        <div className="mb-10 flex flex-col items-center select-none animate-fade-in" style={{ animationDelay: "80ms" }}>

          {/* Icon mark */}
          <div className="relative mb-5 flex h-[76px] w-[76px] items-center justify-center rounded border border-panel-border bg-panel text-gold shadow-[inset_0_1px_0_rgba(191,158,118,0.06),0_1px_12px_rgba(0,0,0,0.4)]">
            <span className="absolute top-[6px] left-[6px] h-[8px] w-[8px] border-t border-l border-gold/20 pointer-events-none"></span>
            <span className="absolute top-[6px] right-[6px] h-[8px] w-[8px] border-t border-r border-gold/20 pointer-events-none"></span>
            <span className="absolute bottom-[6px] left-[6px] h-[8px] w-[8px] border-b border-l border-gold/20 pointer-events-none"></span>
            <span className="absolute bottom-[6px] right-[6px] h-[8px] w-[8px] border-b border-r border-gold/20 pointer-events-none"></span>
            <svg className="h-9 w-9" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="13" x2="29" y2="13" strokeWidth="1.5"/>
              <line x1="10" y1="18" x2="26" y2="18" strokeWidth="1.5"/>
              <line x1="14" y1="23" x2="22" y2="23" strokeWidth="1.5"/>
              <line x1="18" y1="9" x2="18" y2="13" strokeWidth="1.5"/>
              <circle cx="18" cy="8" r="1.75" fill="currentColor" stroke="none"/>
            </svg>
          </div>

          {/* Wordmark */}
          <h1 className="font-display text-[42px] font-bold tracking-[0.1em] text-charcoal uppercase leading-none md:text-[52px]">
            KD Tech Wiki
            <span className="font-mono font-light text-gold text-[36px] animate-terminal-blink">_</span>
          </h1>

          {/* Descriptor line */}
          <div className="mt-3 font-mono text-[9px] tracking-[0.28em] text-charcoal/30 uppercase">
            Curated Ecosystem Database · Knowledge Reference System
          </div>
        </div>

        {/* Hero description */}
        <p className="mx-auto mb-14 max-w-lg font-sans text-[13.5px] leading-relaxed text-charcoal/52 animate-fade-in" style={{ animationDelay: "140ms" }}>
          A structured technical wiki and directory of Malaysia's technology and startup ecosystem — indexing community groups, active builders, and public institutions in a single reference interface.
        </p>

        {/* Navigation panel grid */}
        <div className="grid w-full gap-4 sm:grid-cols-1 md:grid-cols-3 animate-fade-in" style={{ animationDelay: "200ms" }}>

          {/* Card 1 — Community Groups */}
          <Link
            href="/community-groups"
            className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel p-6 text-left transition-all duration-300 hover:border-forest/50 hover:shadow-[0_4px_32px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 rounded-t pointer-events-none"></div>
            <div className="absolute inset-0 pointer-events-none rounded tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div>
              <div className="mb-5 flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded border border-panel-border bg-cream text-gold transition-colors duration-300 group-hover:border-forest/35">
                  <Users className="h-[17px] w-[17px] stroke-[1.8]" />
                </div>
                <span className="font-mono text-[9px] tracking-widest text-charcoal/22 pt-1">01</span>
              </div>

              <h2 className="mb-2 font-display text-[20px] font-bold tracking-wide text-charcoal uppercase transition-colors group-hover:text-gold/90">
                Community Groups
              </h2>

              <p className="mb-7 font-sans text-[12px] leading-relaxed text-charcoal/52">
                Curated local tech communities across Malaysia — developer circles, startup networks, and industry-focused groups shaping the ecosystem.
              </p>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[9.5px] font-bold tracking-wider text-gold/55 transition-colors group-hover:text-gold">
              <span>EXPLORE DIRECTORY</span>
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* Card 2 — Community Builders */}
          <Link
            href="/community-builders"
            className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel p-6 text-left transition-all duration-300 hover:border-forest/50 hover:shadow-[0_4px_32px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 rounded-t pointer-events-none"></div>
            <div className="absolute inset-0 pointer-events-none rounded tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div>
              <div className="mb-5 flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded border border-panel-border bg-cream text-gold transition-colors duration-300 group-hover:border-forest/35">
                  <Cpu className="h-[17px] w-[17px] stroke-[1.8]" />
                </div>
                <span className="font-mono text-[9px] tracking-widest text-charcoal/22 pt-1">02</span>
              </div>

              <h2 className="mb-2 font-display text-[20px] font-bold tracking-wide text-charcoal uppercase transition-colors group-hover:text-gold/90">
                Community Builders
              </h2>

              <p className="mb-7 font-sans text-[12px] leading-relaxed text-charcoal/52">
                Profiles of the individuals organising meetups, programs, and initiatives that drive learning and collaboration in the ecosystem.
              </p>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[9.5px] font-bold tracking-wider text-gold/55 transition-colors group-hover:text-gold">
              <span>VIEW BUILDERS</span>
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* Card 3 — Government Agencies */}
          <Link
            href="/government-agencies"
            className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel p-6 text-left transition-all duration-300 hover:border-forest/50 hover:shadow-[0_4px_32px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 rounded-t pointer-events-none"></div>
            <div className="absolute inset-0 pointer-events-none rounded tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div>
              <div className="mb-5 flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded border border-panel-border bg-cream text-gold transition-colors duration-300 group-hover:border-forest/35">
                  <ShieldAlert className="h-[17px] w-[17px] stroke-[1.8]" />
                </div>
                <span className="font-mono text-[9px] tracking-widest text-charcoal/22 pt-1">03</span>
              </div>

              <h2 className="mb-2 font-display text-[20px] font-bold tracking-wide text-charcoal uppercase transition-colors group-hover:text-gold/90">
                Government Agencies
              </h2>

              <p className="mb-7 font-sans text-[12px] leading-relaxed text-charcoal/52">
                Public institutions and regulatory bodies supporting the ecosystem through grants, programs, policies, and infrastructure investment.
              </p>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[9.5px] font-bold tracking-wider text-gold/55 transition-colors group-hover:text-gold">
              <span>EXPLORE BODIES</span>
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </Link>

        </div>

      </main>

    </div>
  );
}
