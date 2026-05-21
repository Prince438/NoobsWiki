import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-panel-border/35 bg-panel/50 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-8">

        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">

          {/* Brand column */}
          <div className="flex flex-col gap-2.5 max-w-[260px]">
            <div className="font-mono text-[12.5px] font-extrabold uppercase tracking-[0.14em] text-charcoal">
              KD Tech Wiki<span className="text-gold font-light">_</span>
            </div>
            <p className="font-sans text-[11px] leading-relaxed text-charcoal/38">
              A curated technical wiki and directory for Malaysia's technology and startup ecosystem.
            </p>
            <div className="font-mono text-[9px] text-charcoal/22 tracking-wider mt-1">
              &copy; {currentYear} KD Tech Wiki
            </div>
          </div>

          {/* Directory links column */}
          <div className="flex flex-col gap-2">
            <div className="font-mono text-[9px] tracking-widest text-charcoal/28 uppercase mb-0.5">
              Directories
            </div>
            {[
              { href: "/community-groups", label: "Community Groups" },
              { href: "/community-builders", label: "Community Builders" },
              { href: "/government-agencies", label: "Government Agencies" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[11.5px] text-charcoal/40 transition-colors hover:text-charcoal/72"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* System status column */}
          <div className="flex flex-col gap-2 items-start sm:items-end">
            <div className="font-mono text-[9px] tracking-widest text-charcoal/28 uppercase mb-0.5">
              System
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[9.5px] text-charcoal/40">
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-forest"></span>
              </span>
              <span>STATUS: OPERATIONAL</span>
            </div>
            <div className="font-mono text-[9px] text-charcoal/25">LOC: KUALA LUMPUR · TZ: GMT+8</div>
            <div className="font-mono text-[9px] text-charcoal/25">BUILD: PRODUCTION</div>
          </div>

        </div>

        {/* Bottom rule */}
        <div className="mt-8 pt-5 border-t border-panel-border/20 flex items-center justify-between">
          <span className="font-mono text-[9px] text-charcoal/18 tracking-widest uppercase">
            Structured Knowledge Base · Curated with Care
          </span>
          <span className="font-mono text-[9px] text-charcoal/18">v2.0.0</span>
        </div>

      </div>
    </footer>
  );
}
