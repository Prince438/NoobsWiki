import hermesData from "@/data/hermes-tutorials.json";
import type { HermesEntry } from "@/components/VideoCard";
import HermesView from "./HermesView";

export const metadata = {
  title: "Hermes Agent Tutorials — Malaysian Tech Wiki",
  description: "82 curated YouTube tutorials for Hermes Agent covering setup, skills, automation, integrations, and advanced use cases.",
};

const entries = hermesData as HermesEntry[];

export default function HermesPage() {
  return <HermesView entries={entries} />;
}
