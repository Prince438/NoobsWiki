"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search, X, Users, Cpu, ShieldAlert, TrendingUp, BookOpen, Wrench, Bookmark, ArrowRight,
} from "lucide-react";
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

type FilterType = SearchItemType | "saved" | "all";

const FILTERS: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "group", label: "Communities" },
  { key: "builder", label: "Builders" },
  { key: "agency", label: "Agencies" },
  { key: "vc", label: "VC Firms" },
  { key: "tutorial", label: "Tutorials" },
  { key: "saved", label: "Saved" },
];

interface SavedItem {
  id: string;
  name: string;
  type: string;
  description?: string;
  pageUrl?: string;
}

function getSavedItems(): SavedItem[] {
  try {
    const raw = localStorage.getItem("kd-bookmarks");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [savedResults, setSavedResults] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 150);

  // Open / close with Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setFilter("all");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Fetch results from API
  useEffect(() => {
    if (!open) return;
    if (!debouncedQuery.trim()) {
      setResults([]);
      setSavedResults([]);
      return;
    }

    const q = debouncedQuery.trim().toLowerCase();

    // Saved items (localStorage)
    const saved = getSavedItems().filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        (item.description ?? "").toLowerCase().includes(q)
    );
    setSavedResults(saved);

    // Server items
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`)
      .then((r) => r.json())
      .then((data: SearchItem[]) => setResults(data))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [debouncedQuery, open]);

  // Reset index when results change
  useEffect(() => setSelectedIndex(0), [results, savedResults, filter]);

  const visibleResults = results.filter(
    (item) => filter === "all" || item.type === filter
  );
  const visibleSaved = filter === "all" || filter === "saved" ? savedResults : [];
  const showToolsRow = !!query.trim() && (filter === "all");
  const listLength = visibleResults.length + visibleSaved.length + (showToolsRow ? 1 : 0);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, listLength - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const savedOffset = visibleResults.length;
      if (selectedIndex < visibleResults.length) {
        navigate(visibleResults[selectedIndex].href);
      } else if (selectedIndex < savedOffset + visibleSaved.length) {
        const savedItem = visibleSaved[selectedIndex - savedOffset];
        navigate(savedItem.pageUrl ?? "/saved");
      } else if (showToolsRow) {
        navigate("/tech-tools");
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh] px-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-[3px]"
        onClick={() => setOpen(false)}
        style={{ animation: "backdrop-in 0.15s ease both" }}
      />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-2xl rounded border border-panel-border bg-panel shadow-[0_24px_64px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col"
        style={{ animation: "fade-drop 0.18s cubic-bezier(0.16,1,0.3,1) both", maxHeight: "75vh" }}
      >
        {/* Search input row */}
        <div className="flex items-center gap-3 border-b border-panel-border/50 px-4 py-3.5">
          {loading ? (
            <div className="h-4 w-4 flex-shrink-0 animate-spin rounded-full border-2 border-panel-border border-t-gold/60" />
          ) : (
            <Search className="h-4 w-4 flex-shrink-0 text-charcoal/40" />
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search communities, VCs, agencies, tutorials..."
            className="flex-1 bg-transparent font-sans text-[14px] text-charcoal placeholder:text-charcoal/30 outline-none"
          />
          <div className="flex items-center gap-2">
            {query && (
              <button onClick={() => setQuery("")} className="text-charcoal/30 hover:text-charcoal/60 transition-colors">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <kbd className="rounded border border-panel-border/50 bg-cream/15 px-1.5 py-0.5 font-mono text-[9px] text-charcoal/28">
              ESC
            </kbd>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 overflow-x-auto border-b border-panel-border/30 px-4 py-2 scrollbar-none">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex-shrink-0 rounded px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider transition-colors ${
                filter === f.key
                  ? "bg-forest/15 text-gold border border-forest/35"
                  : "text-charcoal/40 hover:text-charcoal/65 border border-transparent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="overflow-y-auto flex-1">
          {!query.trim() ? (
            /* Idle state */
            <div className="px-4 py-8 text-center space-y-1">
              <p className="font-mono text-[10px] tracking-widest text-charcoal/30 uppercase">
                Start typing to search
              </p>
              <p className="font-sans text-[12px] text-charcoal/25">
                Communities · Builders · Agencies · VCs · Tutorials · Saved
              </p>
            </div>
          ) : visibleResults.length === 0 && visibleSaved.length === 0 ? (
            /* Empty state */
            <div className="px-4 py-8 space-y-4">
              <p className="text-center font-mono text-[10px] tracking-widest text-charcoal/32 uppercase">
                No matches for &ldquo;{query}&rdquo;
              </p>
              <div className="grid grid-cols-2 gap-2">
                {(["group", "agency", "vc", "tutorial"] as SearchItemType[]).map((type) => {
                  const Icon = TYPE_ICONS[type];
                  return (
                    <button
                      key={type}
                      onClick={() => navigate(
                        type === "group" ? "/community-groups" :
                        type === "agency" ? "/government-agencies" :
                        type === "vc" ? "/malaysian-vcs" : "/tech-tutorials"
                      )}
                      className="flex items-center gap-2 rounded border border-panel-border/50 bg-cream/8 px-3 py-2.5 text-left hover:border-gold/30 hover:text-gold transition-colors"
                    >
                      <Icon className="h-3.5 w-3.5 text-gold/45 flex-shrink-0" />
                      <span className="font-mono text-[9.5px] text-charcoal/45 uppercase tracking-wide">
                        Browse {TYPE_LABELS[type]}s
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {/* Result count */}
              <div className="px-4 py-2 border-b border-panel-border/20">
                <span className="font-mono text-[9px] tracking-widest text-charcoal/28 uppercase">
                  {visibleResults.length + visibleSaved.length} result{visibleResults.length + visibleSaved.length !== 1 ? "s" : ""}
                  {filter !== "all" && ` · ${FILTERS.find(f => f.key === filter)?.label}`}
                </span>
              </div>

              {/* Saved items */}
              {visibleSaved.length > 0 && (
                <div>
                  <div className="px-4 py-1.5 font-mono text-[8.5px] tracking-widest text-charcoal/25 uppercase bg-cream/5">
                    Saved Items
                  </div>
                  {visibleSaved.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={() => navigate(item.pageUrl ?? "/saved")}
                        className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors border-l-2 ${
                          isSelected ? "bg-forest/10 border-gold/40" : "hover:bg-cream/5 border-transparent"
                        }`}
                      >
                        <Bookmark className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gold/45" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-sans text-[13px] font-semibold text-charcoal">{item.name}</span>
                            <span className="rounded border border-panel-border/40 bg-cream/15 px-1.5 py-px font-mono text-[8px] text-charcoal/38 uppercase">
                              Saved
                            </span>
                          </div>
                          {item.description && (
                            <p className="line-clamp-1 font-sans text-[11.5px] text-charcoal/48">{item.description}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Directory results */}
              {visibleResults.length > 0 && (
                <div>
                  {visibleSaved.length > 0 && (
                    <div className="px-4 py-1.5 font-mono text-[8.5px] tracking-widest text-charcoal/25 uppercase bg-cream/5">
                      Directory
                    </div>
                  )}
                  {visibleResults.map((item, idx) => {
                    const absIdx = visibleSaved.length + idx;
                    const isSelected = absIdx === selectedIndex;
                    const Icon = TYPE_ICONS[item.type];
                    return (
                      <button
                        key={item.id}
                        onClick={() => navigate(item.href)}
                        className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors border-l-2 ${
                          isSelected ? "bg-forest/10 border-gold/40" : "hover:bg-cream/5 border-transparent"
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
              )}

              {/* Search tech tools */}
              {showToolsRow && (
                <button
                  onClick={() => navigate("/tech-tools")}
                  className={`flex w-full items-center gap-3 border-t border-panel-border/30 px-4 py-3 text-left transition-colors border-l-2 ${
                    selectedIndex === listLength - 1
                      ? "bg-forest/10 border-gold/40"
                      : "hover:bg-cream/5 border-transparent"
                  }`}
                >
                  <Wrench className="h-3.5 w-3.5 flex-shrink-0 text-gold/45" />
                  <span className="flex-1 font-sans text-[12.5px] text-charcoal/55">
                    Search <span className="font-semibold text-charcoal/75">8,000+ tech tools</span> for &ldquo;{query}&rdquo;
                  </span>
                  <ArrowRight className="h-3 w-3 flex-shrink-0 text-charcoal/25" />
                </button>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-panel-border/30 px-4 py-2">
          <span className="font-mono text-[8.5px] text-charcoal/22 uppercase tracking-widest">
            Malaysian Tech Wiki — Malaysia Ecosystem Index
          </span>
          <div className="flex items-center gap-2 font-mono text-[8px] text-charcoal/22">
            <span>↑↓ navigate</span>
            <span>·</span>
            <span>↵ open</span>
            <span>·</span>
            <span>esc close</span>
          </div>
        </div>

      </div>
    </div>
  );
}
