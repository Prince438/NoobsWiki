import kimiData from "@/data/kimi-tutorials.json";
import type { HermesEntry } from "@/components/VideoCard";
import KimiView from "./KimiView";

export const metadata = {
  title: "Kimi Tutorials — Malaysian Tech Wiki",
  description: "65 curated YouTube tutorials for Kimi covering basics, long-context workflows, coding, multimodal features, and productivity use cases.",
};

const entries = kimiData as HermesEntry[];

export default function KimiPage() {
  return <KimiView entries={entries} />;
}
