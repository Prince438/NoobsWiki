import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import CommandPalette from "@/components/CommandPalette";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "KD Tech Wiki | Malaysia Tech Startup Ecosystem Directory",
    template: "%s | KD Tech Wiki",
  },
  description: "A curated technical wiki and directory of Malaysia's tech community groups, builders, and government agencies.",
  keywords: ["Malaysia", "Startup", "Tech Community", "Ecosystem Builders", "Government Grants", "Malaysia Tech", "Developer Groups", "KD Tech Wiki"],
  authors: [{ name: "KD Tech Wiki" }],
  openGraph: {
    title: "KD Tech Wiki | Malaysia Tech Startup Ecosystem Directory",
    description: "Discover, connect, and collaborate with Malaysia's tech communities, builder networks, and official agencies.",
    type: "website",
    locale: "en_MY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans selection:bg-gold/30 selection:text-forest">
        {/* Fixed background image — matte + dimmed */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            backgroundImage: "url('/bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.55) saturate(0.65)",
          }}
        />
        <Sidebar />
        <CommandPalette />
        <div className="md:ml-[200px]">
          {children}
        </div>
      </body>
    </html>
  );
}
