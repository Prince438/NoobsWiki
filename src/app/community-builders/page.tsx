import { Metadata } from "next";
import fs from "fs";
import path from "path";
import CommunityBuildersList from "./CommunityBuildersList";
import BackToTopButton from "@/components/BackToTopButton";
import type { BuilderEntry, BuilderLink } from "@/components/BuilderCard";

export const metadata: Metadata = {
  title: "Community Builders",
  description:
    "The individuals organising meetups, events, and programs that support learning, collaboration, and innovation within the Malaysia tech ecosystem.",
};

// ─── Link filter ─────────────────────────────────────────────────────────────

const SKIP_URL_FRAGMENTS = [
  "facebook.com/wordcampmalaysia",
  "instagram.com/wordcampmy",
  "threads.com/@wordcampmy",
  "x.com/WordCampMY",
  "facebook.com/groups/wordcampmalaysia",
  "malaysia.wordcamp.org/2025/session/",
  "malaysia.wordcamp.org/2025/news/",
  "malaysia.wordcamp.org/2025/faq",
  "malaysia.wordcamp.org/2025/sessions/",
  "malaysia.wordcamp.org/2025/schedule/",
  "malaysia.wordcamp.org/2025/location",
  "malaysia.wordcamp.org/2025/tickets/",
  "malaysia.wordcamp.org/2025/contact/",
  "malaysia.wordcamp.org/2025/organizers/",
  "malaysia.wordcamp.org/2025/volunteers/",
  "malaysia.wordcamp.org/2025/attendees/",
  "malaysia.wordcamp.org/2025/speakers/",
  "malaysia.wordcamp.org/2025/sponsors",
  "malaysia.wordcamp.org/2025/media-partners/",
  "malaysia.wordcamp.org/2025/code-of-conduct/",
  "malaysia.wordcamp.org/2025/contributor-day/",
  "malaysia.wordcamp.org/2025/accommodation/",
  "malaysia.wordcamp.org/2025/visa",
];

const SKIP_LABELS = new Set([
  "← Back", "Attendees list", "Facebook Group",
  "News", "Info", "Venue", "Accommodation", "Visa",
  "Code of Conduct", "Sponsor FAQs", "Sponsors",
  "Speakers", "Attendees", "Organizers", "Volunteers",
  "Media Partners", "Conference", "Contributor Day",
  "Contact", "Sold Out", "English", "FAQs", "Sessions",
  "Location", "Floor Plan", "Visa Letter",
]);

function filterLinks(raw: { label: string; url: string }[]): BuilderLink[] {
  const seen = new Set<string>();
  const kept: BuilderLink[] = [];

  for (const link of raw) {
    if (!link.url.startsWith("http")) continue;
    if (SKIP_LABELS.has(link.label)) continue;
    if (link.label.length > 42) continue;
    if (link.label.startsWith("←") || link.label.startsWith("→")) continue;
    if (SKIP_URL_FRAGMENTS.some((frag) => link.url.includes(frag))) continue;
    if (seen.has(link.url)) continue;
    seen.add(link.url);
    kept.push({ label: link.label, url: link.url });
    if (kept.length >= 5) break;
  }

  return kept;
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CommunityBuildersPage() {
  let builders: BuilderEntry[] = [];

  try {
    const expandedPath = path.join(process.cwd(), "kd-tech-wiki-community-builders-expanded.json");
    const fallbackPath = path.join(process.cwd(), "src", "data", "community-builders.json");
    const filePath = fs.existsSync(expandedPath) ? expandedPath : fallbackPath;

    if (fs.existsSync(filePath)) {
      const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const entries: {
        name: string;
        description?: string;
        links?: { label: string; url: string }[];
        url?: string;
        category?: string;
        source?: string;
        role?: string;
      }[] = Array.isArray(raw) ? raw : (raw.entries ?? []);

      builders = entries.map((entry) => {
        const rawLinks: { label: string; url: string }[] =
          entry.links ??
          (entry.url ? [{ label: entry.source ?? entry.role ?? "Profile", url: entry.url }] : []);

        return {
          name: entry.name,
          description: entry.description ?? "",
          links: filterLinks(rawLinks),
          category: entry.category ?? "builder",
        };
      });
    }
  } catch (error) {
    console.error("Error reading community builders data:", error);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8">

        <div className="mb-12 max-w-3xl space-y-3">
          <div className="font-mono text-[9px] font-semibold text-gold tracking-[0.25em] uppercase">
            [ DIRECTORY // SEC_02 ]
          </div>
          <h1 className="font-display text-[48px] font-bold tracking-[0.06em] text-charcoal uppercase leading-none md:text-[60px]">
            Community Builders
          </h1>
          <p className="font-sans text-[13px] leading-relaxed text-charcoal/60 max-w-xl">
            The individuals organising meetups, events, and programs that support learning, collaboration, and innovation within the Malaysia tech ecosystem.
          </p>
        </div>

        <CommunityBuildersList builders={builders} />

      </div>
      <BackToTopButton />
    </div>
  );
}
