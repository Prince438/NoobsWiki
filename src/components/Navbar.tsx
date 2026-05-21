"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/community-groups", label: "Community Groups" },
    { href: "/community-builders", label: "Community Builders" },
    { href: "/government-agencies", label: "Government Agencies" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-panel-border bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
        
        {/* Brand / Logo */}
        <Link href="/" className="group flex items-center gap-2.5 font-sans font-extrabold text-xl tracking-tight text-charcoal">
          <div className="flex items-center justify-center rounded-lg bg-forest p-1.5 text-cream transition-transform duration-300 group-hover:scale-105">
            <Terminal className="h-4 w-4 stroke-[2.5]" />
          </div>
          <span className="flex items-center">
            noobs
            <span className="ml-0.5 text-gold font-mono text-lg font-normal animate-terminal-blink">_</span>
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
                className={`font-sans text-sm font-medium transition-colors hover:text-forest ${
                  isActive ? "text-forest font-semibold relative after:absolute after:bottom-[-20px] after:left-0 after:right-0 after:h-[2px] after:bg-forest" : "text-charcoal/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Technical Status HUD Accent */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 rounded-full border border-panel-border bg-white px-3 py-1 font-mono text-[10px] text-charcoal/60 sm:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            </span>
            <span>SYS: OK</span>
            <span className="text-panel-border">|</span>
            <span>v1.0.0</span>
          </div>

          {/* Mobile Menu Toggle Button Link (represented nicely) */}
          <div className="flex gap-2 md:hidden">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                    isActive ? "bg-forest text-cream" : "bg-white text-charcoal/70 border border-panel-border"
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
