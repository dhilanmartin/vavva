import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE = "https://vavva.xyz";
const INSTAGRAM = "https://instagram.com/casavavva";

/* A studio says what it is and where it is. The previous pair withheld both on
   purpose, because the page was a private house; that is no longer what this
   is, and the reticence was costing reach for nothing. */
const SEARCH_DESCRIPTION =
  "Casa Vavva is a creative studio in Los Angeles & New York City.";
const SOCIAL_DESCRIPTION = "A creative studio in Los Angeles & New York City.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  // The name alone. This is the browser-tab string, and a sentence-length title
  // reads as a listing there rather than as a house.
  title: "VAVVA",
  description: SEARCH_DESCRIPTION,
  applicationName: "VAVVA",
  alternates: { canonical: "/" },
  /* Indexed, crawlable, and snippeted.
     `nosnippet: true` used to sit here. Its only job was to keep the words
     "private members club" out of Google, because Google writes snippets from
     visible page copy and the first paragraph said exactly that. The page no
     longer makes that claim, so the flag was suppressing the studio's own
     description for nothing. Removing it is the point of this line, not an
     oversight — put it back only if the copy goes private again.
     Still deliberately NOT a robots.txt disallow: that is what produces the
     "No information is available for this page" result, and it would take the
     social link previews down with it, since facebookexternalhit and Twitterbot
     both honour robots.txt. */
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "VAVVA",
    description: SOCIAL_DESCRIPTION,
    url: SITE,
    siteName: "VAVVA",
    locale: "en_US",
    type: "website",
  },
  // Without this X renders the card as a small square thumbnail and the 1200×630
  // mark is wasted. There is no twitter-image.* file; X falls back to og:image.
  twitter: {
    card: "summary_large_image",
    title: "VAVVA",
    description: SOCIAL_DESCRIPTION,
  },
  // Icons and the OG card come from src/app/{icon,apple-icon,opengraph-image}.png —
  // the file conventions win over anything declared here.
};

/* Tells Google this is one named entity rather than a page about a topic. It is
   deliberately an Organization and not a LocalBusiness: LocalBusiness expects a
   street address and opening hours, and the studio publishes neither. */
const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Casa Vavva",
  // Both strings, so "vavva" and "casa vavva" resolve to the same entity.
  alternateName: ["VAVVA", "Vavva"],
  description: SEARCH_DESCRIPTION,
  url: SITE,
  logo: `${SITE}/icon.png`,
  image: `${SITE}/opengraph-image.png`,
  // Both cities, in the order the page prints them.
  areaServed: [
    { "@type": "City", name: "Los Angeles" },
    { "@type": "City", name: "New York City" },
  ],
  sameAs: [INSTAGRAM],
};

export const viewport: Viewport = {
  themeColor: "#E8E8E8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The intro script stamps `intro-js` / `intro-go` on <html> before hydration,
    // so the server markup can't match — that mismatch is the point, not a bug.
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.classList.add('intro-js');requestAnimationFrame(function(){requestAnimationFrame(function(){document.documentElement.classList.add('intro-go');});});}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_JSONLD),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
