"use client";

import { useEffect } from "react";
import { X, ExternalLink, CheckSquare, Users, Lightbulb, StickyNote } from "lucide-react";
import type { AgencyDetail } from "@/data/agency-data";

interface Props {
  agency: AgencyDetail;
  url: string;
  onClose: () => void;
}

export default function AgencyDetailModal({ agency, url, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/65"
        style={{ animation: "backdrop-in 0.2s ease both" }}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className="relative z-[101] flex h-full w-full max-w-2xl flex-col bg-panel border-l border-panel-border overflow-hidden"
        style={{ animation: "slide-in-right 0.28s cubic-bezier(0.16,1,0.3,1) both" }}
      >

        {/* Sticky header */}
        <div className="flex-shrink-0 border-b border-panel-border/60 px-6 pt-5 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-1.5 font-mono text-[9px] tracking-[0.25em] text-gold/60 uppercase">
                [ AGENCY_PROFILE ]
              </div>
              <h2 className="font-display text-[22px] font-bold tracking-[0.04em] text-charcoal uppercase leading-tight">
                {agency.name}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded border border-panel-border/80 bg-cream/50 px-2 py-0.5 font-mono text-[9px] text-charcoal/45 uppercase tracking-wider">
                  {agency.type}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded border border-panel-border bg-cream/30 text-charcoal/40 hover:text-gold hover:border-gold/30 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

          {/* Overview */}
          <div>
            <p className="font-sans text-[13px] leading-relaxed text-charcoal/65">
              {agency.overview}
            </p>
          </div>

          {/* Services */}
          <Section label="WHAT IT OFFERS" icon={<CheckSquare className="h-3 w-3 text-gold/40" />}>
            <ul className="space-y-2">
              {agency.services.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5 font-sans text-[12px] leading-relaxed text-charcoal/62">
                  <span className="mt-[5px] h-1 w-1 flex-shrink-0 rounded-full bg-gold/40" />
                  {s}
                </li>
              ))}
            </ul>
          </Section>

          {/* Who it's for */}
          <Section label="WHO IT'S FOR" icon={<Users className="h-3 w-3 text-gold/40" />}>
            <ul className="space-y-2">
              {agency.whoFor.map((w, i) => (
                <li key={i} className="flex items-start gap-2.5 font-sans text-[12px] leading-relaxed text-charcoal/62">
                  <span className="mt-[5px] h-1 w-1 flex-shrink-0 rounded-full bg-forest/55" />
                  {w}
                </li>
              ))}
            </ul>
          </Section>

          {/* How to engage */}
          {agency.howToEngage && agency.howToEngage.length > 0 && (
            <Section label="HOW TO ENGAGE" icon={<Lightbulb className="h-3 w-3 text-gold/40" />}>
              <ul className="space-y-2.5">
                {agency.howToEngage.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-[12px] leading-relaxed text-charcoal/60">
                    <span className="mt-[2px] font-mono text-[9px] text-gold/50 flex-shrink-0 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Notes */}
          {agency.notes && agency.notes.length > 0 && (
            <Section label="NOTES" icon={<StickyNote className="h-3 w-3 text-gold/40" />}>
              <ul className="space-y-2">
                {agency.notes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 font-sans text-[12px] leading-relaxed text-charcoal/50">
                    <span className="mt-[5px] h-1 w-1 flex-shrink-0 rounded-full bg-gold/30" />
                    {note}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Links */}
          <Section label="OFFICIAL LINKS" icon={<ExternalLink className="h-3 w-3 text-gold/40" />}>
            <div className="flex flex-wrap gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-panel-border/60 bg-cream/30 px-3 py-1.5 font-mono text-[9.5px] text-charcoal/45 hover:text-gold hover:border-gold/30 transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Official Website</span>
              </a>
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}

function Section({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5">
        {icon}
        <span className="font-mono text-[9px] tracking-[0.2em] text-charcoal/28 uppercase">{label}</span>
        <div className="h-px flex-1 bg-panel-border/30" />
      </div>
      {children}
    </div>
  );
}
