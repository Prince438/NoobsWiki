"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Users, Cpu, ShieldAlert, TrendingUp, BookOpen, Wrench } from "lucide-react";
import type { SearchItem, SearchItemType } from "@/lib/search-data";

const TYPE_LABELS: Record<SearchItemType, string> = {
  group: "Community",
  builder: "Builder",
  agency: "Agency",
  vc: "VC Firm",
  tutorial: "Tutorial",
};

const TYPE_ICONS: Record<SearchItemType, React.ElementType> = {
  group: Users,
  builder: Cpu,
  agency: ShieldAlert,
  vc: TrendingUp,
  tutorial: BookOpen,
};

function scoreItem(item: SearchItem, q: string): number {
  const name = item.name.toLowerCase();
  const desc = item.description.toLowerCase();
  if (name === q) return 10;
  if (name.startsWith(q)) return 7;
  if (name.includes(q)) return 4;
  if (desc.includes(q)) return 1;
  return 0;
}

interface Props {
  items: SearchItem[];
}

export default function HomepageSearch({ items }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return items
      .map((item) => ({ item, score: scoreItem(item, q) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map(({ item }) => item);
  }, [items, query]);

  // Count results by type for the header
  const countsByType = useMemo(() => {
    const counts: Partial<Record<SearchItemType, number>> = {};
    for (const item of results) {
      counts[item.type] = (counts[item.type] ?? 0) + 1;
    }
    return counts;
  }, [results]);

  // items list: results + tools row (always shown when query is set)
  const listLength = results.length + (query.trim() ? 1 : 0);

  useEffect(() => setSelectedIndex(0), [results]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, listLength - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex < results.length) {
        navigate(results[selectedIndex].href);
      } else {
        navigate(`/tech-tools`);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const showDropdown = open && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">

      {/* ── Search input ── */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-charcoal/38" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search communities, VCs, agencies, tools, tutorials..."
          className="w-full rounded border border-panel-border bg-panel/90 py-4 pl-12 pr-24 font-sans text-[14px] text-charcoal placeholder:text-charcoal/32 outline-none transition-all duration-200 focus:border-gold/50 focus:shadow-[0_0_0_3px_rgba(191,158,118,0.08)] backdrop-blur-sm"
        />
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-panel-border/55 bg-cream/20 px-1.5 font-mono text-[9px] text-charcoal/28">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* ── Dropdown ── */}
      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded border border-panel-border bg-panel shadow-[0_12px_40px_rgba(0,0,0,0.55)]">

          {results.length > 0 ? (
            <>
              {/* Header row */}
              <div className="flex items-center justify-between border-b border-panel-border/30 px-4 py-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] tracking-widest text-charcoal/30 uppercase">
                    {results.length} result{results.length !== 1 ? "s" : ""}
                  </span>
                  {(Object.entries(countsByType) as [SearchItemType, number][]).map(([type, count]) => (
                    <span key={type} className="rounded border border-panel-border/40 bg-cream/15 px-1.5 py-px font-mono text-[8px] text-charcoal/38 uppercase">
                      {count} {TYPE_LABELS[type]}
                    </span>
                  ))}
                </div>
                <span className="hidden sm:block font-mono text-[8.5px] text-charcoal/20">
                  ↑↓ navigate · ↵ open
                </span>
              </div>

              {/* Result list */}
              <div className="max-h-[min(440px,65vh)] overflow-y-auto">
                {results.map((item, idx) => {
                  const Icon = TYPE_ICONS[item.type];
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.href)}
                      className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
                        isSelected ? "bg-forest/10 border-l-2 border-gold/40" : "hover:bg-cream/5 border-l-2 border-transparent"
                      }`}
                    >
                      <Icon className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gold/50" />
                      <div className="min-w-0 flex-1">
                        <div className="mb-0.5 flex items-center gap-2">
                          <span className="font-sans text-[13.5px] font-semibold text-charcoal leading-tight">
                            {item.name}
                          </span>
                          <span className="flex-shrink-0 rounded border border-panel-border/50 bg-cream/20 px-1.5 py-px font-mono text-[8px] text-charcoal/40 uppercase tracking-wide">
                            {TYPE_LABELS[item.type]}
                          </span>
                        </div>
                        <p className="line-clamp-1 font-sans text-[11.5px] leading-snug text-charcoal/50">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            /* Empty state */
            <div className="px-4 py-6 text-center">
              <p className="mb-1 font-mono text-[10px] tracking-widest text-charcoal/32 uppercase">No matches found</p>
              <p className="font-sans text-[12.5px] text-charcoal/35">
                Try a different term, or browse a directory below
              </p>
            </div>
          )}

          {/* Search in tech tools — always shown when typing */}
          <button
            onClick={() => navigate("/tech-tools")}
            className={`flex w-full items-center gap-3 border-t border-panel-border/30 px-4 py-3 text-left transition-colors ${
              selectedIndex === listLength - 1 && query.trim()
                ? "bg-forest/10 border-l-2 border-gold/40"
                : "hover:bg-cream/5 border-l-2 border-transparent"
            }`}
          >
            <Wrench className="h-3.5 w-3.5 flex-shrink-0 text-gold/45" />
            <span className="flex-1 font-sans text-[12.5px] text-charcoal/55">
              Search <span className="font-semibold text-charcoal/75">8,000+ tech tools</span> for &ldquo;{query}&rdquo;
            </span>
            <ArrowRight className="h-3 w-3 flex-shrink-0 text-charcoal/25" />
          </button>

        </div>
      )}
    </div>
  );
}
