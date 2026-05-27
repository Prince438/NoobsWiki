"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Users, Cpu, ShieldAlert, Wrench, BookOpen, Bookmark, TrendingUp } from "lucide-react";

const directoryLinks = [
  { href: "/community-groups", label: "Community Groups", icon: Users },
  { href: "/community-builders", label: "Community Builders", icon: Cpu },
  { href: "/government-agencies", label: "Government Agencies", icon: ShieldAlert },
  { href: "/tech-tools", label: "Tech Tools", icon: Wrench },
  { href: "/malaysian-vcs", label: "Malaysian VC's", icon: TrendingUp },
  { href: "/tech-tutorials", label: "Tech Tutorials", icon: BookOpen },
];

const pageLinks = [
  { href: "/saved", label: "Saved", icon: Bookmark },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    const update = () => {
      try {
        const saved = JSON.parse(localStorage.getItem("kd-bookmarks") ?? "[]");
        setBookmarkCount(Array.isArray(saved) ? saved.length : 0);
      } catch {
        setBookmarkCount(0);
      }
    };
    update();
    window.addEventListener("kd-bookmarks-changed", update);
    return () => window.removeEventListener("kd-bookmarks-changed", update);
  }, []);

  const brandMark = (
    <svg className="h-[13px] w-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="8" x2="20" y2="8" strokeWidth="1.6" />
      <line x1="6.5" y1="12" x2="17.5" y2="12" strokeWidth="1.6" />
      <line x1="9" y1="16" x2="15" y2="16" strokeWidth="1.6" />
      <line x1="12" y1="5.5" x2="12" y2="8" strokeWidth="1.6" />
      <circle cx="12" cy="4.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );

  const renderNavLink = (link: { href: string; label: string; icon: React.ElementType }, isSaved = false) => {
    const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
    const Icon = link.icon;
    return (
      <Link
        key={link.href}
        href={link.href}
        className={`flex items-center gap-2.5 rounded px-2.5 py-[8px] transition-all duration-200 border-l-[2px] ${
          isActive
            ? "border-gold/55 bg-forest/10 text-gold"
            : "border-transparent text-charcoal/42 hover:bg-panel-raised hover:text-charcoal/72"
        }`}
      >
        <Icon
          className={`h-[13px] w-[13px] flex-shrink-0 transition-colors ${
            isActive ? "text-gold/75" : "text-charcoal/30"
          }`}
        />
        <span className="font-mono text-[9px] font-bold uppercase tracking-wide leading-snug flex-1">
          {link.label}
        </span>
        {isSaved && bookmarkCount > 0 && (
          <span className="inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gold px-0.5 font-mono text-[7px] font-bold text-panel leading-none">
            {bookmarkCount > 9 ? "9+" : bookmarkCount}
          </span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="fixed left-0 top-0 z-50 hidden md:flex h-screen w-[200px] flex-col border-r border-panel-border bg-panel/85 backdrop-blur-sm">

        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 border-b border-panel-border/50 px-4 py-[14px] transition-colors hover:bg-panel-raised"
        >
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border border-panel-border bg-cream text-gold transition-colors group-hover:border-forest/40">
            {brandMark}
          </div>
          <div className="min-w-0">
            <span className="font-mono text-[10px] font-extrabold tracking-[0.12em] uppercase text-charcoal">
              KD Tech Wiki
            </span>
            <span className="font-mono text-[10px] font-light text-gold animate-terminal-blink">_</span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 pt-4">

          {/* Directories section */}
          <div className="px-2 pb-2.5 font-mono text-[8px] tracking-[0.25em] text-charcoal/22 uppercase">
            Directories
          </div>
          {directoryLinks.map((link) => renderNavLink(link))}

          {/* Pages section */}
          <div className="px-2 pb-2.5 pt-5 font-mono text-[8px] tracking-[0.25em] text-charcoal/22 uppercase">
            Pages
          </div>
          {pageLinks.map((link) => renderNavLink(link, link.href === "/saved"))}

        </nav>

        {/* System status */}
        <div className="border-t border-panel-border/50 px-4 py-3.5">
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-forest" />
            </span>
            <span className="font-mono text-[8px] tracking-wider text-charcoal/35 uppercase">Operational</span>
          </div>
          <div className="font-mono text-[7.5px] uppercase tracking-wider text-charcoal/20 leading-relaxed">
            Loc: Kuala Lumpur<br />
            TZ: GMT+8
          </div>
        </div>

      </aside>

      {/* ── iOS safe-area fill — covers the Dynamic Island / notch zone ── */}
      <div
        className="fixed inset-x-0 top-0 z-[51] bg-panel/90 backdrop-blur-md md:hidden"
        style={{ height: "env(safe-area-inset-top, 0px)" }}
      />

      {/* ── Mobile header ── */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-panel-border/50 bg-panel/90 px-4 py-3 backdrop-blur-md md:hidden">
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border border-panel-border bg-cream text-gold transition-colors group-hover:border-forest/40">
            {brandMark}
          </div>
          <span className="font-mono text-[10px] font-extrabold tracking-[0.12em] uppercase text-charcoal">
            KD Tech Wiki<span className="text-gold font-light animate-terminal-blink">_</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 pr-10">
          {[...directoryLinks, ...pageLinks].map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            const Icon = link.icon;
            const isSaved = link.href === "/saved";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center justify-center rounded border p-1.5 transition-colors ${
                  isActive
                    ? "border-forest/40 bg-forest/10 text-gold"
                    : "border-panel-border bg-panel text-charcoal/40 hover:text-charcoal/70"
                }`}
                title={link.label}
              >
                <Icon className="h-3.5 w-3.5" />
                {isSaved && bookmarkCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold font-mono text-[7px] font-bold text-panel leading-none">
                    {bookmarkCount > 9 ? "9+" : bookmarkCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </header>
    </>
  );
}
