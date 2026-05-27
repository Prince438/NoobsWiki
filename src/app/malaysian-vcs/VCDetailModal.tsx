"use client";

import { useEffect } from "react";
import { X, ExternalLink, Mail, AtSign, BookOpen, Link2 } from "lucide-react";
import type { VCDetail } from "@/data/vc-data";

interface Props {
  vc: VCDetail;
  onClose: () => void;
}

export default function VCDetailModal({ vc, onClose }: Props) {
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

        {/* ── Sticky header ── */}
        <div className="flex-shrink-0 border-b border-panel-border/60 px-6 pt-5 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-1.5 font-mono text-[9px] tracking-[0.25em] text-gold/60 uppercase">
                [ FIRM_PROFILE ]
              </div>
              <h2 className="font-display text-[28px] font-bold tracking-[0.05em] text-charcoal uppercase leading-none">
                {vc.name}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded border border-panel-border/80 bg-cream/50 px-2 py-0.5 font-mono text-[9px] text-charcoal/45 uppercase tracking-wider">
                  {vc.type}
                </span>
                <span className="rounded border border-forest/30 bg-forest/8 px-2 py-0.5 font-mono text-[9px] text-gold/70 uppercase tracking-wider">
                  {vc.category}
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

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

          {/* Overview paragraph */}
          <div>
            <p className="font-sans text-[13px] leading-relaxed text-charcoal/65">
              {vc.overview}
            </p>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <StatCell label="Founded" value={vc.founded} />
            <StatCell label="HQ" value={vc.hq} />
            {vc.stats?.map((s) => (
              <StatCell key={s.label} label={s.label} value={s.value} />
            ))}
          </div>

          {/* Investment Focus */}
          <Section label="INVESTMENT FOCUS">
            <div className="space-y-4">
              <div>
                <FieldLabel>Stage</FieldLabel>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {vc.stages.map((s) => (
                    <span key={s} className="rounded border border-forest/30 bg-forest/10 px-2.5 py-1 font-mono text-[9.5px] text-gold/75 tracking-wide">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Sectors</FieldLabel>
                <ul className="mt-1.5 space-y-1">
                  {vc.sectors.map((s) => (
                    <li key={s} className="flex items-start gap-2 font-sans text-[12px] text-charcoal/58">
                      <span className="mt-[3px] h-1 w-1 flex-shrink-0 rounded-full bg-gold/35" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              {vc.geographies && (
                <div>
                  <FieldLabel>Geographies</FieldLabel>
                  <ul className="mt-1.5 space-y-1">
                    {vc.geographies.map((g) => (
                      <li key={g} className="flex items-start gap-2 font-sans text-[12px] text-charcoal/58">
                        <span className="mt-[3px] h-1 w-1 flex-shrink-0 rounded-full bg-gold/35" />
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {vc.ticketSizes && (
                <div>
                  <FieldLabel>Ticket Sizes</FieldLabel>
                  <ul className="mt-1.5 space-y-1">
                    {vc.ticketSizes.map((t) => (
                      <li key={t} className="flex items-start gap-2 font-sans text-[12px] text-charcoal/58">
                        <span className="mt-[3px] h-1 w-1 flex-shrink-0 rounded-full bg-gold/35" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Section>

          {/* Portfolio */}
          {vc.portfolio && vc.portfolio.length > 0 && (
            <Section label="PORTFOLIO HIGHLIGHTS">
              <div className="space-y-1.5">
                {vc.portfolio.map((p) => (
                  <div
                    key={p.company}
                    className="flex items-start justify-between gap-3 rounded border border-panel-border/40 bg-cream/20 px-3.5 py-2.5"
                  >
                    <div>
                      <span className="font-sans text-[12.5px] font-semibold text-charcoal/85">
                        {p.company}
                      </span>
                      <span className="mx-1.5 text-charcoal/25">·</span>
                      <span className="font-sans text-[11.5px] text-charcoal/45">{p.sector}</span>
                    </div>
                    {p.notes && (
                      <span className="flex-shrink-0 font-mono text-[9px] text-charcoal/30 pt-0.5">
                        {p.notes}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Team */}
          {vc.team && vc.team.length > 0 && (
            <Section label="TEAM">
              <div className="space-y-2">
                {vc.team.map((m) => (
                  <div key={m.name} className="flex items-center gap-3">
                    <div className="h-[1px] w-3 bg-gold/25 flex-shrink-0" />
                    <span className="font-sans text-[12.5px] font-semibold text-charcoal/80">{m.name}</span>
                    <span className="font-mono text-[9px] text-charcoal/35">{m.role}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* How to Pitch */}
          {vc.pitchTips && vc.pitchTips.length > 0 && (
            <Section label="HOW TO PITCH">
              <ul className="space-y-2.5">
                {vc.pitchTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-[12px] leading-relaxed text-charcoal/60">
                    <span className="mt-[2px] font-mono text-[9px] text-gold/50 flex-shrink-0 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Notes */}
          {vc.notes && vc.notes.length > 0 && (
            <Section label="NOTES">
              <ul className="space-y-2">
                {vc.notes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 font-sans text-[12px] leading-relaxed text-charcoal/55">
                    <span className="mt-[5px] h-1 w-1 flex-shrink-0 rounded-full bg-gold/30" />
                    {note}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Contact */}
          <Section label="CONTACT & LINKS">
            <div className="flex flex-wrap gap-2">
              <ContactLink href={vc.url} icon={<ExternalLink className="h-3 w-3" />} label="Website" />
              {vc.email && (
                <ContactLink href={`mailto:${vc.email}`} icon={<Mail className="h-3 w-3" />} label={vc.email} />
              )}
              {vc.linkedin && (
                <ContactLink href={vc.linkedin} icon={<Link2 className="h-3 w-3" />} label="LinkedIn" />
              )}
              {vc.crunchbase && (
                <ContactLink href={vc.crunchbase} icon={<BookOpen className="h-3 w-3" />} label="Crunchbase" />
              )}
              {vc.twitter && (
                <ContactLink href={vc.twitter} icon={<AtSign className="h-3 w-3" />} label="Twitter / X" />
              )}
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-panel-border/50 bg-cream/20 px-3 py-2.5">
      <div className="mb-1 font-mono text-[8.5px] tracking-widest text-charcoal/30 uppercase">{label}</div>
      <div className="font-sans text-[11.5px] font-semibold text-charcoal/75 leading-snug">{value}</div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[9px] tracking-[0.2em] text-charcoal/28 uppercase">{label}</span>
        <div className="h-px flex-1 bg-panel-border/30" />
      </div>
      {children}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[9px] tracking-widest text-charcoal/30 uppercase">{children}</div>
  );
}

function ContactLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded border border-panel-border/60 bg-cream/30 px-3 py-1.5 font-mono text-[9.5px] text-charcoal/45 hover:text-gold hover:border-gold/30 transition-colors"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
