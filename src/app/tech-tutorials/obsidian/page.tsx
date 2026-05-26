import obsidianData from "@/data/obsidian-tutorials.json";
import type { HermesEntry } from "@/components/VideoCard";
import ObsidianView from "./ObsidianView";

export const metadata = {
  title: "Obsidian Tutorials — KD Tech Wiki",
  description: "76 curated YouTube tutorials for Obsidian covering setup, plugins, vault organisation, daily notes, Dataview, Canvas, and more.",
};

const entries = obsidianData as HermesEntry[];

export default function ObsidianPage() {
  return <ObsidianView entries={entries} />;
}
