import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter_Tight } from "next/font/google";
import Link from "next/link";

import { Nav } from "@/components/nav";
import { site } from "@/content/site";
import "./globals.css";

/** Der Helvetica-nächste Schnitt, den Google Fonts hergibt. */
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.intro,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.intro,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.intro,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ececec",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${interTight.variable} ${geistMono.variable} antialiased`}>
      <body>
        <Nav />
        {children}
        {/* Die Anbieterkennzeichnung muss von jeder Seite aus erreichbar sein,
            darf aber nichts an sich ziehen — deshalb unten rechts, klein. */}
        <Link
          href="/legal"
          className="label fixed right-6 bottom-[3.6vh] z-50 transition-colors duration-200 hover:text-fg"
        >
          Impressum
        </Link>
      </body>
    </html>
  );
}
