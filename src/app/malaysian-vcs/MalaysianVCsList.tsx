"use client";

import { useState, useMemo } from "react";
import { Search, Filter, RotateCcw, ExternalLink } from "lucide-react";
import type { VCDetail } from "@/data/vc-data";
import VCDetailModal from "./VCDetailModal";
import BookmarkButton, { type BookmarkItem } from "@/components/BookmarkButton";
import ShareButton from "@/components/ShareButton";

interface Props {
  vcs: VCDetail[];
}

const CATEGORY_ORDER = [
  "Pre-seed & Seed",
  "Seed to Series A",
  "Growth & Multi-stage",
  "Fund-of-Funds & Ecosystem",
  "Corporate & Regional",
];

export default function MalaysianVCsList({ vcs }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVC, setSelectedVC] = useState<VCDetail | null>(null);

  const filtered = useMemo(() => {
    return vcs.filter((vc) => {
      if (selectedCategory && vc.category !== selectedCategory) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        vc.name.toLowerCase().includes(q) ||
        vc.shortDesc.toLowerCase().includes(q) ||
        vc.sectors.some((s) => s.toLowerCase().includes(q)) ||
        vc.stages.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [vcs, searchQuery, selectedCategory]);

  const grouped = useMemo(() => {
    const map = new Map<string, VCDetail[]>();
    for (const vc of filtered) {
      if (!map.has(vc.category)) map.set(vc.category, []);
      map.get(vc.category)!.push(vc);
    }
    return CATEGORY_ORDER
      .filter((c) => map.has(c))
      .map((c) => [c, map.get(c)!] as [string, VCDetail[]]);
  }, [filtered]);

  const reset = () => { setSearchQuery(""); setSelectedCategory(null); };

  return (
    <>
      <div className="space-y-10 animate-fade-in">

        {/* Search & filter bar */}
        <div className="flex flex-col gap-3 rounded border border-panel-border bg-panel p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-charcoal/45 pointer-events-none" />
            <input
              type="text"
              placeholder="Search VC firms by name, stage, sector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded border border-panel-border/50 bg-cream py-2.5 pr-4 pl-10 font-sans text-[13px] text-charcoal placeholder:text-charcoal/42 outline-none transition-colors focus:border-gold/40"
            />
          </div>
          {(searchQuery || selectedCategory) && (
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded border border-panel-border bg-cream px-4 py-2.5 font-mono text-[10.5px] uppercase font-bold tracking-wider text-charcoal/62 hover:text-gold transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Category filter chips */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-charcoal/42">
            <Filter className="h-3 w-3 text-gold/55" />
            <span>FILTER BY STAGE</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded border px-3 py-1.5 font-mono text-[10.5px] uppercase font-bold tracking-wider transition-all duration-200 ${
                selectedCategory === null
                  ? "bg-forest/12 border-forest/45 text-gold"
                  : "border-panel-border bg-panel text-charcoal/52 hover:border-panel-border/80 hover:text-charcoal/75"
              }`}
            >
              All ({vcs.length})
            </button>
            {CATEGORY_ORDER.filter((c) => vcs.some((v) => v.category === c)).map((cat) => {
              const count = vcs.filter((v) => v.category === cat).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(isSelected ? null : cat)}
                  className={`rounded border px-3 py-1.5 font-mono text-[10.5px] uppercase font-bold tracking-wider transition-all duration-200 ${
                    isSelected
                      ? "bg-forest/12 border-forest/45 text-gold"
                      : "border-panel-border bg-panel text-charcoal/52 hover:border-panel-border/80 hover:text-charcoal/75"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between border-b border-panel-border/25 pb-3 font-mono text-[10px] text-charcoal/40">
          <span>[VC_DIRECTORY_QUERY: SUCCESS]</span>
          <span className="font-bold text-charcoal/40">{filtered.length} FIRMS</span>
        </div>

        {/* Results */}
        {grouped.length > 0 ? (
          <div className="space-y-12">
            {grouped.map(([cat, entries]) => (
              <section key={cat} className="space-y-5">
                <div className="flex items-center gap-4">
                  <h3
                    id={cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                    data-jump-target=""
                    className="font-display text-[22px] font-bold uppercase tracking-[0.06em] text-charcoal leading-none min-w-0 break-words"
                  >
                    {cat}
                  </h3>
                  <div className="h-px flex-1 bg-panel-border/20" />
                  <span className="font-mono text-[9px] text-charcoal/28">
                    {entries.length} {entries.length === 1 ? "firm" : "firms"}
                  </span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {entries.map((vc, idx) => (
                    <VCCard
                      key={vc.id}
                      vc={vc}
                      index={idx + 1}
                      categoryLabel={cat}
                      onClick={() => setSelectedVC(vc)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded border border-dashed border-panel-border/35 bg-panel py-16 text-center">
            <p className="mb-1.5 font-mono text-[11px] text-charcoal/38">NO MATCHES FOUND</p>
            <p className="font-sans text-[11px] text-charcoal/28">Try resetting the query or selecting another stage.</p>
            <button
              onClick={reset}
              className="mt-6 rounded border border-panel-border bg-panel px-4 py-2 font-mono text-[9.5px] uppercase font-bold tracking-wider text-gold/70 hover:text-gold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Modal */}
      {selectedVC && (
        <VCDetailModal vc={selectedVC} onClose={() => setSelectedVC(null)} />
      )}
    </>
  );
}

function VCCard({
  vc,
  index,
  categoryLabel,
  onClick,
}: {
  vc: VCDetail;
  index: number;
  categoryLabel: string;
  onClick: () => void;
}) {
  const formattedIndex = String(index).padStart(2, "0");

  const bookmarkItem: BookmarkItem = {
    id: `vc-${vc.id}`,
    name: vc.name,
    type: "vc",
    description: vc.shortDesc,
    externalUrl: vc.url,
    pageUrl: "/malaysian-vcs",
  };

  let displayUrl = vc.url;
  try {
    displayUrl = new URL(vc.url).hostname.replace("www.", "");
  } catch { /* keep as-is */ }

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel transition-all duration-300 hover:border-forest/45 hover:shadow-[0_4px_24px_rgba(0,0,0,0.35)] overflow-hidden cursor-pointer"
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 pointer-events-none" />
      {/* Corner tech marks */}
      <div className="absolute inset-0 pointer-events-none tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Body */}
      <div className="flex flex-col gap-2.5 p-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] tracking-widest text-charcoal/38 uppercase">
            // {categoryLabel}
          </span>
          <span className="font-mono text-[9px] text-gold/40 font-semibold tabular-nums">[{formattedIndex}]</span>
        </div>
        <h3 className="font-sans text-[14px] font-bold tracking-tight text-charcoal leading-snug transition-colors group-hover:text-gold/90">
          {vc.name}
        </h3>
        <p className="font-sans text-[11.5px] leading-relaxed text-charcoal/52 line-clamp-3">
          {vc.shortDesc}
        </p>
      </div>

      {/* Footer */}
      <div className="mx-5 mb-4 pt-3 border-t border-panel-border/30 flex items-center justify-between gap-2">
        <a
          href={vc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] text-gold/50 transition-colors hover:text-gold group-hover:text-gold/80"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="h-2.5 w-2.5 flex-shrink-0" />
          <span className="truncate max-w-[140px]">{displayUrl}</span>
        </a>
        <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          <ShareButton url={vc.url} />
          <BookmarkButton item={bookmarkItem} />
        </div>
      </div>
    </div>
  );
}
