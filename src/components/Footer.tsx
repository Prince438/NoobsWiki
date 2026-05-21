import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-panel-border/20 bg-cream py-12 px-6 font-sans">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row sm:px-8">
        
        {/* Info & Legal */}
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <p className="font-mono text-xs font-extrabold uppercase tracking-widest text-charcoal">
            KD Tech Wiki<span className="text-gold">_</span>
          </p>
          <p className="text-[11px] leading-relaxed text-charcoal/40 text-center sm:text-left max-w-md">
            &copy; {currentYear} KD Tech Wiki. A curated technical database and ecosystem directory for Malaysia's tech scene.
          </p>
        </div>

        {/* Technical Logs / Visual Details */}
        <div className="flex flex-col items-center gap-2 sm:items-end">
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-charcoal/30">
            <span>[SYS: OPERATIONAL]</span>
            <span>•</span>
            <span>[LOC: KUALA_LUMPUR]</span>
            <span>•</span>
            <span>[TZ: GMT+8]</span>
            <span>•</span>
            <span className="text-forest font-bold">[BUILD: PRODUCTION]</span>
          </div>
          <p className="text-[9px] text-charcoal/30 font-mono">
            Structured knowledge base. Curated with care.
          </p>
        </div>

      </div>
    </footer>
  );
}
