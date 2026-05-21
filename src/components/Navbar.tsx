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
    <header className="sticky top-0 z-50 w-full border-b border-panel-border/30 bg-cream/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
        
        {/* Brand / Logo */}
        <Link href="/" className="group flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.01]">
          {/* Techy Logo Symbol */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-panel-border bg-panel text-gold transition-colors duration-300 group-hover:border-gold/30">
            <svg className="h-4.5 w-4.5 stroke-[1.8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6.5V20m0-13.5C10.5 5 6 5 4 6.5V18c2-1.5 6.5-1.5 8 0m0-11.5c1.5-1.5 6-1.5 8-0.5V18c-2-1.5-6.5-1.5-8 0" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 10l1.5 1.5L8 13" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="flex items-center font-mono text-sm font-extrabold tracking-wider uppercase text-charcoal">
            KD Tech Wiki
            <span className="ml-0.5 text-gold font-mono text-base font-normal animate-terminal-blink">_</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-[11px] font-bold uppercase tracking-wider transition-colors hover:text-gold ${
                  isActive ? "text-gold relative after:absolute after:bottom-[-22px] after:left-0 after:right-0 after:h-[2px] after:bg-gold" : "text-charcoal/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Technical Status HUD Accent */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 rounded border border-panel-border bg-panel px-3 py-1 font-mono text-[9px] text-charcoal/50 sm:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-forest animate-pulse"></span>
            </span>
            <span>ENGINE: ACTIVE</span>
            <span className="text-panel-border/30">|</span>
            <span>v2.0.0</span>
          </div>

          {/* Mobile Navigation Bar Links */}
          <div className="flex gap-1 md:hidden">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded border px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-tight transition-colors ${
                    isActive ? "bg-forest/10 border-forest text-gold" : "bg-panel border-panel-border text-charcoal/60"
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
