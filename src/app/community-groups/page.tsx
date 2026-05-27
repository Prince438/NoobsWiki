import { Metadata } from "next";
import fs from "fs";
import path from "path";
import CommunityGroupList from "./CommunityGroupList";
import BackToTopButton from "@/components/BackToTopButton";
import JumpNav from "@/components/JumpNav";
import type { GroupEntry } from "@/components/GroupCard";

export const metadata: Metadata = {
  title: "Community Groups",
  description:
    "A curated list of local tech community groups across Malaysia, including developer groups, startup communities, and industry-focused networks.",
};

export default function CommunityGroupsPage() {
  let groups: GroupEntry[] = [];

  try {
    const expandedPath = path.join(process.cwd(), "kd-tech-wiki-community-groups-expanded.json");

    if (fs.existsSync(expandedPath)) {
      const raw = JSON.parse(fs.readFileSync(expandedPath, "utf-8"));
      const entries: {
        name: string;
        description?: string;
        links?: { label: string; url: string }[];
        category?: string;
        pinned?: boolean;
      }[] = Array.isArray(raw) ? raw : (raw.entries ?? []);

      groups = entries.map((entry) => ({
        name: entry.name,
        description: entry.description ?? "",
        links: (entry.links ?? []).filter(
          (l) => l.url.startsWith("http") && l.url !== "#"
        ),
        category: entry.category ?? "general/ecosystem",
        pinned: entry.pinned ?? false,
      }));
    }
  } catch (error) {
    console.error("Error reading community groups data:", error);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-6xl px-6 pr-12 py-12 md:px-8 md:pr-14">

        <div className="mb-12 max-w-3xl space-y-3">
          <div className="font-mono text-[9px] font-semibold text-gold tracking-[0.25em] uppercase">
            [ DIRECTORY // SEC_01 ]
          </div>
          <h1 className="font-display text-[48px] font-bold tracking-[0.06em] text-charcoal uppercase leading-none md:text-[60px]">
            Community Groups
          </h1>
          <p className="font-sans text-[13px] leading-relaxed text-charcoal/60 max-w-xl">
            A curated list of local tech community groups across Malaysia — developer circles, startup networks, open source clubs, and industry-focused communities shaping the ecosystem.
          </p>
        </div>

        <CommunityGroupList groups={groups} />

      </div>
      <BackToTopButton />
      <JumpNav />
    </div>
  );
}
