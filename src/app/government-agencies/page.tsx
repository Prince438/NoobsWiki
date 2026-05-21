import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GovernmentAgenciesList from "./GovernmentAgenciesList";
import { parseGovernmentAgencies } from "@/lib/parser";

export const metadata: Metadata = {
  title: "Government Agencies",
  description:
    "Explore government agencies and public institutions supporting the tech and startup ecosystem in Malaysia through grants, programs, policies, and infrastructure.",
};

export default function GovernmentAgenciesPage() {
  // Read and parse government agencies at runtime
  const categories = parseGovernmentAgencies();

  return (
    <div className="flex min-h-screen flex-col bg-cream/30 bg-dot-pattern">
      {/* Top Navbar */}
      <Navbar />

      {/* Spacious Outer Container */}
      <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 md:px-8">
        
        {/* Clean Header Area with generous spacing */}
        <div className="mb-12 max-w-3xl space-y-4">
          <div className="font-mono text-xs font-semibold text-gold tracking-widest uppercase">
            [ DIRECTORY // SEC_03 ]
          </div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-charcoal md:text-4xl">
            Government Agencies
          </h1>
          <p className="font-sans text-base leading-relaxed text-charcoal/70">
            Explore government agencies and public institutions supporting the tech and startup ecosystem through grants, programs, policies, and infrastructure. A useful reference for founders, startups, and ecosystem builders.
          </p>
        </div>

        {/* Dynamic Interactivity Layer */}
        <GovernmentAgenciesList initialCategories={categories} />

      </div>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
