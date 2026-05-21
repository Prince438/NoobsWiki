"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/community-groups", label: "Community Groups" },
    { href: "/community-builders", label: "Community Builders" },
    { href: "/government-agencies", label: "Government Agencies" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-panel-border/50 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 md:px-8">

        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-7 w-7 items-center justify-center rounded border border-panel-border bg-panel text-gold transition-colors duration-300 group-hover:border-forest/40">
            <svg className="h-[15px] w-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="8" x2="20" y2="8" strokeWidth="1.6"/>
              <line x1="6.5" y1="12" x2="17.5" y2="12" strokeWidth="1.6"/>
              <line x1="9" y1="16" x2="15" y2="16" strokeWidth="1.6"/>
              <line x1="12" y1="5.5" x2="12" y2="8" strokeWidth="1.6"/>
              <circle cx="12" cy="4.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </div>
          <div className="flex items-baseline gap-0">
            <span className="font-mono text-[12.5px] font-extrabold tracking-[0.14em] uppercase text-charcoal">
              KD Tech Wiki
            </span>
            <span className="text-gold font-mono text-[12.5px] font-light animate-terminal-blink">_</span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-[10px] font-bold uppercase tracking-widest transition-colors duration-200 ${
                  isActive
                    ? "text-gold"
                    : "text-charcoal/42 hover:text-charcoal/75"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Live status pill */}
          <div className="hidden items-center gap-1.5 rounded border border-panel-border bg-panel px-2.5 py-1 font-mono text-[9px] tracking-wider text-charcoal/38 sm:flex">
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-forest"></span>
            </span>
            <span>LIVE</span>
          </div>

          {/* Mobile nav */}
          <div className="flex gap-1.5 md:hidden">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded border px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-tight transition-colors ${
                    isActive
                      ? "border-forest/40 bg-forest/10 text-gold"
                      : "border-panel-border bg-panel text-charcoal/45"
                  }`}
                >
                  {link.label.split(" ")[1] || link.label}
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </header>
  );
}
