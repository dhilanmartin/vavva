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

/* The name and the city, nothing else. What the house is stays on the page, for
   people who arrive at it — it is not advertised to search. See the robots block
   below, which is the half that actually enforces this. */
const SEARCH_DESCRIPTION = "Casa Vavva. New York City.";
const SOCIAL_DESCRIPTION = "New York City.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  // The name alone. This is the browser-tab string, and a sentence-length title
  // reads as a listing there rather than as a house.
  title: "VAVVA",
  description: SEARCH_DESCRIPTION,
  applicationName: "VAVVA",
  alternates: { canonical: "/" },
  /* Indexed and crawlable, but no snippet.
     `nosnippet` is doing the real work here, not the description above. Google
     writes snippets from visible page copy, and the first paragraph says what
     the house is in plain words — so rewriting the meta tag alone would have
     changed nothing about what shows up in search.
     This is deliberately NOT a robots.txt disallow, which is what produces the
     "No information is available for this page" line on sites that hide this
     way. facebookexternalhit and Twitterbot both honour robots.txt, so blocking
     there would take the link previews down with it. */
  robots: {
    index: true,
    follow: true,
    nosnippet: true,
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
   street address and opening hours, and the house publishes neither. */
const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Casa Vavva",
  // Both strings, so "vavva" and "casa vavva" resolve to the same entity. No
  // description field — the snippet is suppressed anyway, and this is the one
  // place left that would still hand search engines a sentence about the house.
  alternateName: ["VAVVA", "Vavva"],
  url: SITE,
  logo: `${SITE}/icon.png`,
  image: `${SITE}/opengraph-image.png`,
  areaServed: { "@type": "City", name: "New York City" },
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
