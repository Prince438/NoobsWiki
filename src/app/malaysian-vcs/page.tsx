import { Metadata } from "next";
import MalaysianVCsList from "./MalaysianVCsList";
import BackToTopButton from "@/components/BackToTopButton";
import JumpNav from "@/components/JumpNav";
import { VC_DATA } from "@/data/vc-data";

export const metadata: Metadata = {
  title: "Malaysian VC's — KD Tech Wiki",
  description:
    "A directory of Malaysian and Malaysia-active venture capital firms — covering stage focus, sector, and contact links for founders and ecosystem builders.",
};

export default function MalaysianVCsPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-6xl px-6 pr-12 py-12 md:px-8 md:pr-14">

        <div className="mb-12 max-w-3xl space-y-3">
          <div className="font-mono text-[9px] font-semibold text-gold tracking-[0.25em] uppercase">
            [ DIRECTORY // SEC_05 ]
          </div>
          <h1 className="font-display text-[48px] font-bold tracking-[0.06em] text-charcoal uppercase leading-none md:text-[60px]">
            Malaysian VC&apos;s
          </h1>
          <p className="font-sans text-[13px] leading-relaxed text-charcoal/60 max-w-xl">
            A directory of Malaysian and Malaysia-active venture capital firms — covering stage focus, sector specialisation, and contact details. Click any card to view the full firm profile.
          </p>
        </div>

        <MalaysianVCsList vcs={VC_DATA} />

      </div>
      <BackToTopButton />
      <JumpNav />
    </div>
  );
}
