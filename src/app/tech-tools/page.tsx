import { Metadata } from "next";
import TechToolsView from "./TechToolsView";
import BackToTopButton from "@/components/BackToTopButton";
import JumpNav from "@/components/JumpNav";
import { getCategories } from "@/lib/techToolsParser";

export const metadata: Metadata = {
  title: "Tech Tools",
  description:
    "A curated directory of tech tools across AI, privacy, developer utilities, system tools, and more.",
};

export default function TechToolsPage() {
  const categories = getCategories();
  const initialId = categories[0]?.id ?? "ai";

  return (
    <div className="min-h-screen">
      <div className="px-0 py-0">

        {/* Page header */}
        <div className="px-6 pt-10 pb-6 md:px-8 border-b border-panel-border/30">
          <div className="mb-2 font-mono text-[10px] font-semibold text-gold/85 tracking-[0.2em] uppercase">
            [ DIRECTORY // SEC_04 ]
          </div>
          <h1 className="font-display text-[48px] font-bold tracking-[0.06em] text-charcoal uppercase leading-none md:text-[60px]">
            Tech Tools
          </h1>
          <p className="mt-3 font-sans text-[14.5px] leading-relaxed text-charcoal/68 max-w-xl">
            A curated directory of tools across AI, privacy, developer utilities, system tools, and more — organised by category for quick reference.
          </p>
        </div>

        {/* Split-panel view */}
        <TechToolsView categories={categories} initialCategoryId={initialId} />

      </div>
      <BackToTopButton />
      <JumpNav />
    </div>
  );
}
