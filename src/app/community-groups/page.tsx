import { Metadata } from "next";
import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommunityGroupList from "./CommunityGroupList";
import type { GroupEntry } from "@/components/GroupCard";

export const metadata: Metadata = {
  title: "Community Groups",
  description:
    "A curated list of local tech community groups across Malaysia, including developer groups, startup communities, and industry-focused networks.",
};

export default function CommunityGroupsPage() {
  let groups: GroupEntry[] = [];

  try {
    // Primary source: kd-tech-wiki-community-groups-expanded.json at project root
    const expandedPath = path.join(process.cwd(), "kd-tech-wiki-community-groups-expanded.json");

    if (fs.existsSync(expandedPath)) {
      const raw = JSON.parse(fs.readFileSync(expandedPath, "utf-8"));
      const entries: {
        name: string;
        description?: string;
        links?: { label: string; url: string }[];
        category?: string;
      }[] = Array.isArray(raw) ? raw : (raw.entries ?? []);

      groups = entries.map((entry) => ({
        name: entry.name,
        description: entry.description ?? "",
        links: (entry.links ?? []).filter(
          (l) => l.url.startsWith("http") && l.url !== "#"
        ),
        category: entry.category ?? "general/ecosystem",
      }));
    }
  } catch (error) {
    console.error("Error reading community groups data:", error);
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream bg-dot-pattern">
      <Navbar />

      <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 md:px-8">

        <div className="mb-12 max-w-3xl space-y-4">
          <div className="font-mono text-xs font-semibold text-gold tracking-widest uppercase">
            [ DIRECTORY // SEC_01 ]
          </div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-charcoal md:text-4xl">
            Community Groups
          </h1>
          <p className="font-sans text-base leading-relaxed text-charcoal/70">
            A curated list of local tech community groups across Malaysia — developer circles, startup networks, open source clubs, and industry-focused communities shaping the ecosystem.
          </p>
        </div>

        <CommunityGroupList groups={groups} />

      </div>

      <Footer />
    </div>
  );
}
