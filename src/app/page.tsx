import Link from "next/link";
import { Users, Cpu, ShieldAlert, Wrench, BookOpen, TrendingUp, ArrowRight } from "lucide-react";
import AsciiBackground from "@/components/AsciiBackground";
import HomepageSearch from "@/components/HomepageSearch";
import { getAllSearchItems } from "@/lib/search-data";

// ── Start Here quick actions ──────────────────────────────────────────────────
const QUICK_ACTIONS = [
  { href: "/community-groups",    icon: Users,        label: "Find a community",  sub: "Groups & networks"   },
  { href: "/malaysian-vcs",       icon: TrendingUp,   label: "Find funding",      sub: "VCs & investors"     },
  { href: "/tech-tools",          icon: Wrench,       label: "Browse tools",      sub: "8,000+ curated"      },
  { href: "/tech-tutorials",      icon: BookOpen,     label: "Learn a skill",     sub: "Tutorials & guides"  },
  { href: "/government-agencies", icon: ShieldAlert,  label: "Find support",      sub: "Grants & agencies"   },
];

// ── Onboarding paths ──────────────────────────────────────────────────────────
const PATHS = [
  { label: "Building a startup?",  hint: "Communities + VCs",         href: "/community-groups"    },
  { label: "Looking for grants?",  hint: "Government agencies",       href: "/government-agencies" },
  { label: "Need to learn a tool?", hint: "Tech tutorials",           href: "/tech-tutorials"      },
  { label: "Just exploring?",      hint: "Start with tech tools",     href: "/tech-tools"          },
];

export default function Home() {
  const searchItems = getAllSearchItems();

  return (
    <div className="relative flex min-h-screen flex-col">
      <AsciiBackground />

      {/* Dark scrim between canvas (z-1) and content (z-3) — makes content legible */}
      <div className="fixed inset-0 z-[2] pointer-events-none bg-[#090C0A]/60" />

      <main className="relative z-[3] mx-auto w-full max-w-5xl px-6 pt-14 pb-24 md:px-8">

        {/* ── Status badge ─────────────────────────────────────────────── */}
        <div className="mb-10 flex justify-center animate-fade-in">
          <div className="inline-flex items-center gap-2.5 rounded border border-panel-border bg-panel px-4 py-1.5 font-mono text-[10px] tracking-widest text-charcoal/62 shadow-sm whitespace-nowrap">
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-forest" />
            </span>
            <span>MALAYSIA TECH ECOSYSTEM INTEL</span>
            <span className="text-panel-border/60 select-none">·</span>
            <span className="font-bold text-gold/75">ACTIVE</span>
          </div>
        </div>

        {/* ── Brand + value prop ───────────────────────────────────────── */}
        <div className="mb-8 flex flex-col items-center text-center select-none animate-fade-in" style={{ animationDelay: "60ms" }}>

          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="KD Tech Wiki"
            className="mb-7 h-40 w-40 object-contain drop-shadow-[0_6px_24px_rgba(0,0,0,0.5)]"
          />

          {/* Wordmark */}
          <h1 className="font-display text-[44px] font-bold tracking-[0.06em] text-charcoal uppercase leading-none md:text-[56px]">
            KD Tech Wiki
            <span className="font-mono font-light text-gold text-[38px] animate-terminal-blink">_</span>
          </h1>

          {/* Value prop */}
          <p className="mt-4 font-sans text-[15px] leading-[1.65] text-charcoal/72 max-w-md">
            Malaysia&apos;s tech ecosystem, indexed — communities, funding, agencies, tools, and tutorials in one place.
          </p>
        </div>

        {/* ── Global search ────────────────────────────────────────────── */}
        <div className="relative z-10 mb-3 flex justify-center animate-fade-in" style={{ animationDelay: "120ms" }}>
          <HomepageSearch items={searchItems} />
        </div>

        {/* Search hint */}
        <div className="mb-10 flex justify-center animate-fade-in" style={{ animationDelay: "150ms" }}>
          <p className="font-mono text-[11px] text-charcoal/32 tracking-wider">
            Press <kbd className="rounded border border-panel-border/50 bg-cream/15 px-1 py-px text-charcoal/35">⌘K</kbd> from any page to search
          </p>
        </div>

        {/* ── Start Here quick actions ─────────────────────────────────── */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: "180ms" }}>
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.22em] text-charcoal/35 uppercase">// Start Here</span>
            <div className="h-px flex-1 bg-panel-border/30" />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {QUICK_ACTIONS.map(({ href, icon: Icon, label, sub }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col gap-2 rounded border border-panel-border bg-panel px-4 py-4 transition-all duration-200 hover:border-forest/50 hover:bg-panel-raised hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
              >
                <Icon className="h-4 w-4 text-gold/55 transition-colors group-hover:text-gold/80" />
                <div>
                  <div className="font-sans text-[14px] font-semibold text-charcoal group-hover:text-gold/90 transition-colors leading-tight">
                    {label}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-charcoal/42 tracking-wide">
                    {sub}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Onboarding block ─────────────────────────────────────────── */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: "220ms" }}>
          <div className="rounded border border-panel-border/60 bg-panel/60 px-5 py-5">
            <div className="mb-3 font-mono text-[10px] tracking-[0.22em] text-charcoal/35 uppercase">
              // Not sure where to start?
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {PATHS.map(({ label, hint, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center justify-between gap-3 rounded border border-panel-border/40 bg-cream/5 px-3.5 py-2.5 transition-colors hover:border-gold/30 hover:bg-forest/8"
                >
                  <div className="min-w-0">
                    <span className="font-sans text-[14px] text-charcoal/68 group-hover:text-charcoal/88 transition-colors">
                      {label}
                    </span>
                    <span className="mx-2 font-mono text-[10px] text-charcoal/32">→</span>
                    <span className="font-sans text-[14px] font-semibold text-gold/68 group-hover:text-gold/88 transition-colors">
                      {hint}
                    </span>
                  </div>
                  <ArrowRight className="h-3 w-3 flex-shrink-0 text-charcoal/22 group-hover:text-gold/50 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Directory cards ──────────────────────────────────────────── */}
        <div className="animate-fade-in" style={{ animationDelay: "260ms" }}>
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.22em] text-charcoal/35 uppercase">// All Directories</span>
            <div className="h-px flex-1 bg-panel-border/30" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">

            {/* Community Groups */}
            <Link href="/community-groups" className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel p-6 transition-all duration-300 hover:border-forest/50 hover:shadow-[0_4px_32px_rgba(0,0,0,0.4)] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 rounded-t pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none rounded tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div>
                <div className="mb-5 flex items-start justify-between">
                  <div className="icon-box relative flex h-9 w-9 items-center justify-center rounded overflow-hidden text-[#071007]">
                    <Users className="h-[17px] w-[17px] stroke-[1.8]" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-charcoal/42 pt-1">01</span>
                </div>
                <h2 className="mb-2 font-display text-[22px] font-bold tracking-[0.04em] text-charcoal uppercase transition-colors group-hover:text-gold/90">
                  Community Groups
                </h2>
                <p className="mb-7 font-sans text-[14.5px] leading-[1.65] text-charcoal/70">
                  Curated local tech communities across Malaysia — developer circles, startup networks, and industry-focused groups.
                </p>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.12em] text-gold/72 transition-colors group-hover:text-gold">
                <span>EXPLORE DIRECTORY</span>
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </Link>

            {/* Community Builders */}
            <Link href="/community-builders" className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel p-6 transition-all duration-300 hover:border-forest/50 hover:shadow-[0_4px_32px_rgba(0,0,0,0.4)] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 rounded-t pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none rounded tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div>
                <div className="mb-5 flex items-start justify-between">
                  <div className="icon-box relative flex h-9 w-9 items-center justify-center rounded overflow-hidden text-[#071007]">
                    <Cpu className="h-[17px] w-[17px] stroke-[1.8]" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-charcoal/42 pt-1">02</span>
                </div>
                <h2 className="mb-2 font-display text-[22px] font-bold tracking-[0.04em] text-charcoal uppercase transition-colors group-hover:text-gold/90">
                  Community Builders
                </h2>
                <p className="mb-7 font-sans text-[14.5px] leading-[1.65] text-charcoal/70">
                  Profiles of individuals organising meetups, programs, and initiatives that drive learning in the ecosystem.
                </p>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.12em] text-gold/72 transition-colors group-hover:text-gold">
                <span>VIEW BUILDERS</span>
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </Link>

            {/* Government Agencies */}
            <Link href="/government-agencies" className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel p-6 transition-all duration-300 hover:border-forest/50 hover:shadow-[0_4px_32px_rgba(0,0,0,0.4)] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 rounded-t pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none rounded tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div>
                <div className="mb-5 flex items-start justify-between">
                  <div className="icon-box relative flex h-9 w-9 items-center justify-center rounded overflow-hidden text-[#071007]">
                    <ShieldAlert className="h-[17px] w-[17px] stroke-[1.8]" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-charcoal/42 pt-1">03</span>
                </div>
                <h2 className="mb-2 font-display text-[22px] font-bold tracking-[0.04em] text-charcoal uppercase transition-colors group-hover:text-gold/90">
                  Government Agencies
                </h2>
                <p className="mb-7 font-sans text-[14.5px] leading-[1.65] text-charcoal/70">
                  Public institutions and regulatory bodies supporting the ecosystem through grants, programs, policies, and infrastructure.
                </p>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.12em] text-gold/72 transition-colors group-hover:text-gold">
                <span>EXPLORE BODIES</span>
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </Link>

            {/* Tech Tools */}
            <Link href="/tech-tools" className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel p-6 transition-all duration-300 hover:border-forest/50 hover:shadow-[0_4px_32px_rgba(0,0,0,0.4)] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 rounded-t pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none rounded tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div>
                <div className="mb-5 flex items-start justify-between">
                  <div className="icon-box relative flex h-9 w-9 items-center justify-center rounded overflow-hidden text-[#071007]">
                    <Wrench className="h-[17px] w-[17px] stroke-[1.8]" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-charcoal/42 pt-1">04</span>
                </div>
                <h2 className="mb-2 font-display text-[22px] font-bold tracking-[0.04em] text-charcoal uppercase transition-colors group-hover:text-gold/90">
                  Tech Tools
                </h2>
                <p className="mb-7 font-sans text-[14.5px] leading-[1.65] text-charcoal/70">
                  A curated directory of 8,000+ tools across AI, privacy, developer utilities, system tools, and more — organised by category.
                </p>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.12em] text-gold/72 transition-colors group-hover:text-gold">
                <span>BROWSE TOOLS</span>
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </Link>

            {/* Malaysian VCs */}
            <Link href="/malaysian-vcs" className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel p-6 transition-all duration-300 hover:border-forest/50 hover:shadow-[0_4px_32px_rgba(0,0,0,0.4)] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 rounded-t pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none rounded tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div>
                <div className="mb-5 flex items-start justify-between">
                  <div className="icon-box relative flex h-9 w-9 items-center justify-center rounded overflow-hidden text-[#071007]">
                    <TrendingUp className="h-[17px] w-[17px] stroke-[1.8]" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-charcoal/42 pt-1">05</span>
                </div>
                <h2 className="mb-2 font-display text-[22px] font-bold tracking-[0.04em] text-charcoal uppercase transition-colors group-hover:text-gold/90">
                  Malaysian VC&apos;s
                </h2>
                <p className="mb-7 font-sans text-[14.5px] leading-[1.65] text-charcoal/70">
                  A directory of Malaysian and Malaysia-active VC firms — stage focus, sector specialisation, and contact details for founders.
                </p>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.12em] text-gold/72 transition-colors group-hover:text-gold">
                <span>VIEW INVESTORS</span>
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </Link>

            {/* Tech Tutorials */}
            <Link href="/tech-tutorials" className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel p-6 transition-all duration-300 hover:border-forest/50 hover:shadow-[0_4px_32px_rgba(0,0,0,0.4)] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 rounded-t pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none rounded tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div>
                <div className="mb-5 flex items-start justify-between">
                  <div className="icon-box relative flex h-9 w-9 items-center justify-center rounded overflow-hidden text-[#071007]">
                    <BookOpen className="h-[17px] w-[17px] stroke-[1.8]" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-charcoal/42 pt-1">06</span>
                </div>
                <h2 className="mb-2 font-display text-[22px] font-bold tracking-[0.04em] text-charcoal uppercase transition-colors group-hover:text-gold/90">
                  Tech Tutorials
                </h2>
                <p className="mb-7 font-sans text-[14.5px] leading-[1.65] text-charcoal/70">
                  Tutorials on AI tools, dev tools, and software — curated by topic and skill level for the Malaysia tech community.
                </p>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.12em] text-gold/72 transition-colors group-hover:text-gold">
                <span>EXPLORE TUTORIALS</span>
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </Link>

          </div>
        </div>

      </main>
    </div>
  );
}
