import type { Metadata, Viewport } from "next";
import { Geist, Inter, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import CommandPalette from "@/components/CommandPalette";
import Footer from "@/components/Footer";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Malaysian Tech Wiki | Malaysia Tech Startup Ecosystem Directory",
    template: "%s | Malaysian Tech Wiki",
  },
  description: "A curated technical wiki and directory of Malaysia's tech community groups, builders, and government agencies.",
  keywords: ["Malaysia", "Startup", "Tech Community", "Ecosystem Builders", "Government Grants", "Malaysia Tech", "Developer Groups", "Malaysian Tech Wiki"],
  authors: [{ name: "Malaysian Tech Wiki" }],
  openGraph: {
    title: "Malaysian Tech Wiki | Malaysia Tech Startup Ecosystem Directory",
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
      className={`${geist.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* No-FOUC: apply saved theme class before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('kd-theme');if(t&&t!=='green')document.documentElement.classList.add('theme-'+t);}catch(e){}`,
          }}
        />
      </head>
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
          <Footer />
        </div>
      </body>
    </html>
  );
}
