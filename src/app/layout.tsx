import type { Metadata, Viewport } from "next";
import { Inter, Newsreader, Literata } from "next/font/google";
import { Nav } from "@/components/nav/Nav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Serif role. Recon had never identified mimi's actual face and this slot
   carried Fraunces as an admitted guess; reading their live @font-face table
   on 2026-08-07 settled it — mimis.nyc sets **GT Alpina Regular** (Grilli
   Type), served from framerusercontent.com, with Inter for all nav/UI.
   Fraunces was the wrong shape for it: soft, wonky, low-contrast where GT
   Alpina is sharp and transitional.

   GT Alpina is a paid webfont and its .woff2 cannot be vendored here, so
   this is the stand-in and globals.css names "GT Alpina" ahead of it in
   --font-serif (with a ready @font-face slot) so a licence swaps it in
   without touching a single component. Newsreader over the alternatives
   because the Story lead runs a bold sentence into regular text inside one
   block: it needs a real 700 in the same family, which rules out Instrument
   Serif despite that face matching GT Alpina's display proportions more
   closely. `opsz` is requested explicitly so the 48px headings and 26px lead
   get their proper optical cuts rather than one compromise master. */
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  axes: ["opsz"],
  display: "swap",
});

/* Second serif, for the landing's URL list only.
   The two reference sites do not share a serif, so matching both honestly
   takes two faces — index.how itself ships three. Its list is set in a
   licensed "Schoolbook" (the woff2 is literally schoolbook_book-*.woff2), a
   Century Schoolbook-class face: very large x-height, low stroke contrast,
   sturdy bracketed serifs, wide. Newsreader — the GT Alpina stand-in
   carrying Story/Locations — is the opposite shape: narrower, higher
   contrast, more transitional, and at 20px in a tight list that difference
   was the most visible thing separating this page from the reference.
   Literata is the closest freely-licensed face to that Schoolbook skeleton.
   Scoped to .idx-slug in globals.css; it touches nothing else. */
const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  axes: ["opsz"],
  display: "swap",
});

const SITE = "https://vavva.xyz";
const INSTAGRAM = "https://instagram.com/casavavva";

/* A studio says what it is and where it is. The previous pair withheld both on
   purpose, because the page was a private house; that is no longer what this
   is, and the reticence was costing reach for nothing. */
const SEARCH_DESCRIPTION =
  "Casa Vavva is a creative studio based in New York City.";
const SOCIAL_DESCRIPTION = "A creative studio based in New York City.";

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
  areaServed: { "@type": "City", name: "New York City" },
  sameAs: [INSTAGRAM],
};

export const viewport: Viewport = {
  // Tracks --paper. Must be a literal — this is a <meta> value, so it can't
  // read a CSS custom property; it went white with the palette on
  // 2026-08-07. Left stale it would tint mobile browser chrome grey against
  // a white page.
  themeColor: "#FFFFFF",
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
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} ${literata.variable}`}
      suppressHydrationWarning
    >
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
      <body className={`${inter.className} flex min-h-svh flex-col antialiased`}>
        {/* Nav stays — persistent, route-agnostic chrome on every page.

            Footer removed 2026-08-07 at D's instruction ("keep the vavva
            header, and remove its footer"), site-wide rather than
            landing-only, which is what "remove the footer" said twice.
            The reference landing this page now follows carries no footer at
            all; a full-height vertically-centred column and a footer below
            it are two different pages fighting over the same viewport.

            Footer.tsx is left on disk, not deleted — same "paused, not
            gone" treatment this branch already gives FeatureBlock,
            CtaTileRow, Newsletter, IconTextBlock and Timeline. The sticky-
            footer flex scaffolding (min-h-svh + flex-1) is kept too: it
            costs nothing and is what the footer needs the day it returns.

            The footer's removal orphaned /gift-card, which was reachable
            only from it. D's answer was to drop that route entirely
            ("remove the gift card page for now"), so src/app/gift-card/ is
            gone and every remaining route is reachable from the nav. */}
        <Nav />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
