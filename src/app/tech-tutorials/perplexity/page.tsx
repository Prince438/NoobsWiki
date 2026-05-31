import perplexityData from "@/data/perplexity-tutorials.json";
import type { HermesEntry } from "@/components/VideoCard";
import PerplexityView from "./PerplexityView";

export const metadata = {
  title: "Perplexity Tutorials — Malaysian Tech Wiki",
  description: "54 curated YouTube tutorials for Perplexity covering AI search, research workflows, Pro Search, Pages, collections, and daily productivity use cases.",
};

const entries = perplexityData as HermesEntry[];

export default function PerplexityPage() {
  return <PerplexityView entries={entries} />;
}
