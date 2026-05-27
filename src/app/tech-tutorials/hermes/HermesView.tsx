"use client";

import { useState, useMemo } from "react";
import { Search, RotateCcw, Shuffle } from "lucide-react";
import VideoCard, { type HermesEntry } from "@/components/VideoCard";
import VPSWalkthrough from "./VPSWalkthrough";

interface Props {
  entries: HermesEntry[];
}

const ALL = "All";

const CATEGORIES = [
  ALL,
  "Beginner Friendly / Start Here",
  "Skills & Skill Bundles",
  "Goals, Automation & Memory",
  "Desktop App, WebUI, Browser & Computer Use",
  "Integrations & Ecosystem",
  "Comparisons & Cost-Saving",
  "Use Cases & Productivity",
  "Updates & Releases",
];

type BeginnerFilter = "All" | "Yes" | "Somewhat" | "No";

type View = "tutorials" | "walkthrough";

export default function HermesView({ entries }: Props) {
  const [view, setView] = useState<View>("tutorials");
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const [beginnerFilter, setBeginnerFilter] = useState<BeginnerFilter>("All");

  const filtered = useMemo(() => {
    let result = entries;

    if (selectedCategory !== ALL) {
      result = result.filter((e) => e.category === selectedCategory);
    }

    if (beginnerFilter !== "All") {
      result = result.filter((e) => e.beginnerFriendly === beginnerFilter);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          (e.description?.toLowerCase().includes(q) ?? false) ||
          e.searchTags.some((t) => t.includes(q))
      );
    }

    return result;
  }, [entries, selectedCategory, searchQuery, beginnerFilter]);

  // "Start Here" section: beginner=Yes videos shown at top when All selected
  const startHereVideos = useMemo(() => {
    if (selectedCategory !== ALL || beginnerFilter !== "All" || searchQuery) return [];
    return entries.filter((e) => e.beginnerFriendly === "Yes");
  }, [entries, selectedCategory, beginnerFilter, searchQuery]);

  const startHereIds = useMemo(
    () => new Set(startHereVideos.map((e) => e.link)),
    [startHereVideos]
  );

  // When Start Here is shown, exclude those videos from the main category grouping
  const mainFiltered = useMemo(() => {
    if (startHereVideos.length === 0) return filtered;
    return filtered.filter((e) => !startHereIds.has(e.link));
  }, [filtered, startHereVideos, startHereIds]);

  // Group mainFiltered by category
  const groupedEntries = useMemo(() => {
    const map = new Map<string, HermesEntry[]>();
    for (const e of mainFiltered) {
      if (!map.has(e.category)) map.set(e.category, []);
      map.get(e.category)!.push(e);
    }
    return Array.from(map.entries());
  }, [mainFiltered]);

  const surpriseMe = () => {
    const pool = filtered;
    if (pool.length === 0) return;
    const entry = pool[Math.floor(Math.random() * pool.length)];
    // find the category section header
    const sectionId = entry.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const el = document.getElementById(`section-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("jump-active");
      setTimeout(() => el.classList.remove("jump-active"), 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen animate-fade-in">

      {/* ── Sub-navbar ── */}
      <div className="sticky top-0 z-20 border-b border-panel-border/50 bg-panel/80 backdrop-blur-sm">
        <div className="flex items-center overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {(["tutorials", "walkthrough"] as View[]).map((v) => {
            const label = v === "tutorials" ? "Video Tutorials" : "Hermes VPS Setup Walkthrough";
            const isActive = view === v;
            return (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-5 py-3.5 font-mono text-[9px] font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? "border-gold/60 text-gold"
                    : "border-transparent text-charcoal/38 hover:text-charcoal/65"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {view === "walkthrough" ? (
        <VPSWalkthrough />
      ) : (
      <div className="flex flex-1">

      {/* ── Desktop category rail ── */}
      <aside
        aria-label="Tutorial categories"
        className="hidden lg:flex flex-col sticky top-0 h-screen w-[210px] flex-shrink-0 overflow-y-auto border-r border-panel-border/50 bg-panel/70 backdrop-blur-sm"
      >
        <div className="px-4 pt-5 pb-2.5 border-b border-panel-border/30">
          <span className="font-mono text-[8px] tracking-[0.25em] text-charcoal/25 uppercase">
            Category
          </span>
        </div>

        <nav className="flex flex-col gap-0 py-1">
          {CATEGORIES.map((cat) => {
            const isActive = cat === selectedCategory;
            const count = cat === ALL ? entries.length : entries.filter((e) => e.category === cat).length;
            const shortLabel = cat === ALL ? "All Videos" : cat;
            return (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setSearchQuery(""); }}
                aria-pressed={isActive}
                className={`flex items-center justify-between gap-2 px-4 py-2.5 text-left border-l-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40 ${
                  isActive
                    ? "border-gold/55 bg-forest/10 text-gold"
                    : "border-transparent text-charcoal/45 hover:bg-panel-raised hover:text-charcoal/72"
                }`}
              >
                <span className="font-mono text-[8.5px] font-bold uppercase tracking-wide leading-snug">
                  {shortLabel}
                </span>
                <span className="font-mono text-[8px] text-charcoal/25 tabular-nums flex-shrink-0">
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 px-5 pr-12 py-8 md:px-8 md:pr-14">

        {/* Page header */}
        <div className="mb-6 space-y-1.5">
          <div className="font-mono text-[9px] tracking-[0.25em] text-gold/70 uppercase">
            [ TECH TUTORIALS // HERMES AGENT ]
          </div>
          <p className="font-sans text-[12px] text-charcoal/50 max-w-2xl leading-relaxed">
            82 community tutorials covering setup, skills, automation, integrations, and advanced use cases for Hermes Agent.
          </p>
        </div>

        {/* Mobile category chips */}
        <div
          role="tablist"
          aria-label="Tutorial categories"
          className="flex gap-1.5 overflow-x-auto pb-3 mb-5 lg:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat === selectedCategory;
            const shortLabel = cat === ALL ? "All" : cat.split(" ")[0];
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => { setSelectedCategory(cat); setSearchQuery(""); }}
                className={`flex-shrink-0 rounded border px-3 py-1.5 font-mono text-[8.5px] font-bold uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40 ${
                  isActive
                    ? "border-forest/45 bg-forest/10 text-gold"
                    : "border-panel-border bg-panel text-charcoal/42 hover:border-panel-border/80 hover:text-charcoal/65"
                }`}
              >
                {shortLabel}
              </button>
            );
          })}
        </div>

        {/* Search + filter bar */}
        <div className="mb-6 flex flex-col gap-3 rounded border border-panel-border bg-panel p-3.5 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-charcoal/28 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, description, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded border border-panel-border/50 bg-cream py-2 pr-4 pl-10 font-mono text-[11px] text-charcoal placeholder:text-charcoal/28 outline-none transition-colors focus:border-gold/40"
              aria-label="Search tutorials"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
            {/* Beginner filter pills */}
            {(["All", "Yes", "Somewhat", "No"] as BeginnerFilter[]).map((level) => {
              const labels: Record<string, string> = { All: "Any Level", Yes: "Beginner", Somewhat: "Intermediate", No: "Advanced" };
              return (
                <button
                  key={level}
                  onClick={() => setBeginnerFilter(level)}
                  className={`rounded border px-2.5 py-1.5 font-mono text-[8.5px] font-bold uppercase tracking-wide transition-colors ${
                    beginnerFilter === level
                      ? "border-gold/45 bg-forest/10 text-gold"
                      : "border-panel-border bg-cream text-charcoal/40 hover:text-charcoal/65"
                  }`}
                >
                  {labels[level]}
                </button>
              );
            })}

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="inline-flex items-center justify-center gap-1.5 rounded border border-panel-border bg-cream px-3 py-2 font-mono text-[9px] uppercase font-bold tracking-wider text-charcoal/50 hover:text-gold transition-colors"
                aria-label="Clear search"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            )}

            <button
              onClick={surpriseMe}
              disabled={filtered.length === 0}
              title="Jump to a random tutorial"
              className="inline-flex items-center justify-center gap-1.5 rounded border border-panel-border bg-cream px-3 py-2 font-mono text-[9px] uppercase font-bold tracking-wider text-charcoal/50 hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Shuffle className="h-3 w-3" />
              <span className="hidden sm:inline">Surprise</span>
            </button>
          </div>
        </div>

        {/* Count bar */}
        <div className="mb-5 flex items-center justify-between border-b border-panel-border/25 pb-3 font-mono text-[9px] text-charcoal/28">
          <span>[TUTORIALS_QUERY: SUCCESS]</span>
          <span className="font-bold text-charcoal/40">
            {filtered.length} VIDEOS
            {searchQuery && ` MATCHING "${searchQuery.toUpperCase()}"`}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded border border-dashed border-panel-border/35 bg-panel py-16 text-center">
            <p className="mb-1.5 font-mono text-[11px] text-charcoal/38">NO MATCHES FOUND</p>
            <p className="font-sans text-[11px] text-charcoal/28">Try resetting the search or changing the level filter.</p>
            <button
              onClick={() => { setSearchQuery(""); setBeginnerFilter("All"); setSelectedCategory(ALL); }}
              className="mt-6 rounded border border-panel-border bg-panel px-4 py-2 font-mono text-[9.5px] uppercase font-bold tracking-wider text-gold/70 hover:text-gold transition-colors"
            >
              Reset All
            </button>
          </div>
        ) : (
          <div className="space-y-10">

            {/* Start Here section */}
            {startHereVideos.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <h3
                    id="section-start-here"
                    data-jump-target=""
                    className="font-display text-[22px] font-bold uppercase tracking-[0.06em] text-charcoal leading-none min-w-0 break-words transition-colors"
                  >
                    Start Here
                  </h3>
                  <div className="h-px flex-1 bg-panel-border/20" />
                  <span className="font-mono text-[8.5px] text-charcoal/28">
                    {startHereVideos.length} {startHereVideos.length === 1 ? "video" : "videos"}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {startHereVideos.map((entry, idx) => (
                    <VideoCard key={`start-${entry.link}-${idx}`} entry={entry} />
                  ))}
                </div>
              </section>
            )}

            {/* Grouped category sections */}
            {groupedEntries.map(([category, catEntries]) => {
              const sectionId = `section-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
              return (
                <section key={category} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h3
                      id={sectionId}
                      data-jump-target=""
                      className="font-display text-[22px] font-bold uppercase tracking-[0.06em] text-charcoal leading-none min-w-0 break-words transition-colors"
                    >
                      {category}
                    </h3>
                    <div className="h-px flex-1 bg-panel-border/20" />
                    <span className="font-mono text-[8.5px] text-charcoal/28">
                      {catEntries.length} {catEntries.length === 1 ? "video" : "videos"}
                    </span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {catEntries.map((entry, idx) => (
                      <VideoCard key={`${entry.link}-${idx}`} entry={entry} />
                    ))}
                  </div>
                </section>
              );
            })}

          </div>
        )}
      </div>
      </div>
      )}
    </div>
  );
}
