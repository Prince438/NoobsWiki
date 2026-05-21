import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "noobs | Malaysia Tech Startup Ecosystem Directory",
    template: "%s | noobs Malaysia",
  },
  description: "A minimalist, spacious, and curated directory of Malaysia's tech community groups, builders, and government agencies.",
  keywords: ["Malaysia", "Startup", "Tech Community", "Ecosystem Builders", "Government Grants", "Malaysia Tech", "Developer Groups"],
  authors: [{ name: "noobs community" }],
  openGraph: {
    title: "noobs | Malaysia Tech Startup Ecosystem Directory",
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
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-gold/30 selection:text-forest">
        {children}
      </body>
    </html>
  );
}

