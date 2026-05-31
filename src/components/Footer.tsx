import Link from "next/link";

const SOCIAL = [
  { label: "Discord",     href: "https://discord.gg/ThkRctzyRE",          icon: "/social/discord.svg"   },
  { label: "Twitter / X", href: "https://twitter.com/krackeddevs",         icon: "/social/twitter.svg"   },
  { label: "TikTok",      href: "https://www.tiktok.com/@krackeddevs",     icon: "/social/tiktok.svg"    },
  { label: "Instagram",   href: "https://www.instagram.com/krackeddev/",   icon: "/social/instagram.svg" },
];

const DIRECTORIES = [
  { label: "Community Groups",    href: "/community-groups"    },
  { label: "Community Builders",  href: "/community-builders"  },
  { label: "Government Agencies", href: "/government-agencies" },
  { label: "Tech Tools",          href: "/tech-tools"          },
  { label: "Malaysian VC's",      href: "/malaysian-vcs"       },
  { label: "Tech Tutorials",      href: "/tech-tutorials"      },
];

export default function Footer() {
  return (
    <footer className="relative z-[3] border-t border-panel-border/40 bg-panel/80 backdrop-blur-sm md:ml-[200px]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img src="/logo.svg" alt="KD Tech Wiki" className="h-8 w-8 object-contain" />
              <span className="font-mono text-[11px] font-extrabold tracking-[0.12em] uppercase text-charcoal">
                KD Tech Wiki
              </span>
            </div>
            <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-xs">
              A curated directory and learning hub for Malaysia's tech and startup ecosystem — communities, funding, agencies, tools, and tutorials in one place.
            </p>
            <p className="font-mono text-[9px] tracking-widest text-charcoal/25 uppercase">
              © {new Date().getFullYear()} KrackedDevs · Malaysia
            </p>
          </div>

          {/* Directories */}
          <div className="space-y-4">
            <div className="font-mono text-[9px] tracking-[0.22em] text-charcoal/38 uppercase">Directories</div>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {DIRECTORIES.map((d) => (
                <Link
                  key={d.href}
                  href={d.href}
                  className="font-sans text-[12.5px] text-charcoal/55 hover:text-gold transition-colors"
                >
                  {d.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <div className="font-mono text-[9px] tracking-[0.22em] text-charcoal/38 uppercase">Follow Us</div>
            <div className="flex flex-col gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-charcoal/55 hover:text-gold transition-colors"
                >
                  <img
                    src={s.icon}
                    alt={s.label}
                    className="h-[15px] w-[15px] flex-shrink-0 object-contain opacity-45 group-hover:opacity-90 transition-opacity"
                    style={{ filter: "invert(1) sepia(1) saturate(0) brightness(2)" }}
                  />
                  <span className="font-sans text-[13px]">{s.label}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-2 border-t border-panel-border/25 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[9px] text-charcoal/22 tracking-widest uppercase">
            Built by KrackedDevs · Malaysia Tech Ecosystem Index
          </span>
          <Link href="/saved" className="font-mono text-[9px] text-charcoal/28 tracking-widest uppercase hover:text-gold transition-colors">
            Saved Items →
          </Link>
        </div>
      </div>
    </footer>
  );
}
