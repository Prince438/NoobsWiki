import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommunityGroupList from "./CommunityGroupList";
import { parseCommunityGroups } from "@/lib/parser";

export const metadata: Metadata = {
  title: "Community Groups",
  description:
    "A curated list of local tech community groups across Malaysia, including developer groups, startup communities, and industry-focused networks.",
};

export default function CommunityGroupsPage() {
  // Read and parse community groups at runtime
  const categories = parseCommunityGroups();

  return (
    <div className="flex min-h-screen flex-col bg-cream/30 bg-dot-pattern">
      {/* Top Navbar */}
      <Navbar />

      {/* Spacious Outer Container */}
      <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 md:px-8">
        
        {/* Clean Header Area with generous spacing */}
        <div className="mb-12 max-w-3xl space-y-4">
          <div className="font-mono text-xs font-semibold text-gold tracking-widest uppercase">
            [ DIRECTORY // SEC_01 ]
          </div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-charcoal md:text-4xl">
            Community Groups
          </h1>
          <p className="font-sans text-base leading-relaxed text-charcoal/70">
            A curated list of local tech community groups across Malaysia, including developer groups, startup communities, and industry-focused networks. Discover, join, and stay connected with communities shaping the tech scene.
          </p>
        </div>

        {/* Dynamic Interactivity Layer */}
        <CommunityGroupList initialCategories={categories} />

      </div>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
