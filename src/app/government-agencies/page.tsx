import { Metadata } from "next";
import GovernmentAgenciesList from "./GovernmentAgenciesList";
import BackToTopButton from "@/components/BackToTopButton";
import JumpNav from "@/components/JumpNav";
import { parseGovernmentAgencies } from "@/lib/parser";

export const metadata: Metadata = {
  title: "Government Agencies",
  description:
    "Explore government agencies and public institutions supporting the tech and startup ecosystem in Malaysia through grants, programs, policies, and infrastructure.",
};

export default function GovernmentAgenciesPage() {
  const categories = parseGovernmentAgencies();

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-6xl px-6 pr-12 py-12 md:px-8 md:pr-14">

        <div className="mb-12 max-w-3xl space-y-3">
          <div className="font-mono text-[9px] font-semibold text-gold tracking-[0.25em] uppercase">
            [ DIRECTORY // SEC_03 ]
          </div>
          <h1 className="font-display text-[48px] font-bold tracking-[0.06em] text-charcoal uppercase leading-none md:text-[60px]">
            Government Agencies
          </h1>
          <p className="font-sans text-[13px] leading-relaxed text-charcoal/60 max-w-xl">
            Explore government agencies and public institutions supporting the tech and startup ecosystem through grants, programs, policies, and infrastructure. A useful reference for founders, startups, and ecosystem builders.
          </p>
        </div>

        <GovernmentAgenciesList initialCategories={categories} />

      </div>
      <BackToTopButton />
      <JumpNav />
    </div>
  );
}
