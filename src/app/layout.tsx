import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { Nav } from "@/components/nav/Nav";
import { LoadingLamps } from "@/components/waitlist/LoadingLamps";
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

/* ---- Literata, and why it is no longer loaded ----------------------------

   Removed 2026-08-14. It was the third face in the stack, a Century
   Schoolbook-class serif chosen to stand in for index.how's licensed
   "Schoolbook" in the landing's URL list — Newsreader (the GT Alpina
   stand-in on Story/Locations) is a narrower, higher-contrast, more
   transitional shape, and at 20px in a tight list that difference was the
   most visible thing separating that page from its reference.

   The list it was chosen for is `SlugList`, and SlugList has not been
   mounted on any route since the landing was rebuilt. So `.idx-slug` — the
   one selector that ever named this font — matched nothing, while
   next/font kept injecting a `<link rel=preload>` and an @font-face table
   for it into every page on the site. Confirmed live, not assumed: reading
   document.styleSheets on /products showed Literata's latin .woff2
   downloaded and the browser then warning it went unused.

   A component sitting unused on disk costs nothing and this repo keeps
   several on purpose. A webfont sitting unused in <head> is a request on
   every page load, and that is a different kind of thing.

   To restore it with SlugList: put the Literata import and this loader
   back, and re-add `${literata.variable}` to <html>. `.idx-slug` still
   names `var(--font-literata)` first and falls through to Georgia, so the
   list degrades to a system serif until that happens rather than breaking.
*/

import { INSTAGRAM_HREF } from "@/lib/site";

const SITE = "https://vavva.xyz";

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
  sameAs: [INSTAGRAM_HREF],
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
      className={`${inter.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* THE HEADER-DISAPPEARS BUG (found and fixed 2026-08-14).
            D: "there seems to be a bug with how the vavva header is loading."

            This script used to be: add `intro-js`, then add `intro-go` inside
            a double requestAnimationFrame. `html.intro-js:not(.intro-go)
            .home-rise` sets `opacity: 0` (globals.css), and all three zones
            of the header — links, mark, Contact — carry `.home-rise`.

            requestAnimationFrame does not fire in a tab that is not being
            rendered. So on any load into a background tab — cmd-click, "open
            in new tab", a link tapped while the browser is not frontmost, a
            session restored at browser launch — `intro-js` landed, hid the
            header, and `intro-go` never arrived to bring it back. Measured
            live, not theorised: 48 seconds after such a load the <html>
            classes were still `["intro-js"]`, all three header zones
            computed `opacity: 0`, and the page had recorded zero paint
            entries. A site with no logo and no navigation.

            That is an animation mechanism gating CONTENT, which is the same
            failure D already rejected once on the lamp strip ("the load in
            is always bugging"). The entrance is a nicety; the header is not.

            The fix is NOT "add intro-go anyway" — that was tried first and
            measured, and it does not work. `.home-rise`'s keyframes run with
            `animation-fill-mode: backwards` behind an `animation-delay`, so
            an element whose animation has been queued but not yet advanced
            holds the `from` frame, which is `opacity: 0`. A hidden tab does
            not advance CSS animations any more than it fires rAF, so
            `intro-go` landed and the header stayed at zero regardless.

            What actually works is to NOT ENTER the intro system at all when
            the page starts hidden. `intro-js` is the class that hides
            things; if it is never added, neither the hiding rule nor the
            animation rule matches, and the header renders plain, static and
            visible. That is the no-JS fallback globals.css was already
            written to degrade to — this just routes the can't-animate case
            down the same path, instead of into a state that needs an
            animation to escape.

            Two paths, for two different moments:

              visibilityState  checked before anything is hidden. Covers the
                               page that loads into a background tab.
              setTimeout       the backstop for what that check cannot see:
                               the tab was visible when this ran and got
                               backgrounded before the second frame. Timers
                               are throttled in background tabs but they
                               still FIRE, which is exactly the property rAF
                               lacks. At 400ms — far past the ~16ms a healthy
                               double-rAF needs, so this is a no-op on a
                               normal load — it either lets the entrance
                               proceed or, if we are hidden by then, backs
                               the whole thing out to the static state.
              catch            un-hides rather than swallowing. If anything
                               here throws, the failure mode has to be a
                               visible header with no animation, never an
                               invisible one.

            Backing out removes `intro-js`, which also disarms `.scroll-
            reveal` (same class gates it, see globals.css). That is correct
            and deliberate: both are entrances, and a page that cannot play
            one should not be holding content back for the other either. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;if(document.visibilityState==='hidden')return;d.classList.add('intro-js');requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.add('intro-go')})});setTimeout(function(){if(d.classList.contains('intro-go'))return;if(document.visibilityState==='hidden'){d.classList.remove('intro-js')}else{d.classList.add('intro-go')}},400)}catch(e){try{document.documentElement.classList.remove('intro-js')}catch(_){}}})();`,
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

            NO FOOTER, and it is settled rather than pending. Removed
            2026-08-07 at D's instruction ("keep the vavva header, and remove
            its footer"), site-wide rather than landing-only, which is what
            "remove the footer" said twice. Briefly remounted 2026-08-10 and
            taken back off the same day, which restored the 08-07 decision
            along with its reasoning: the landing is a full-height vertically
            centred column, and a footer below it is a second page fighting
            the first over the same viewport. The reference landings this
            page has followed — index.how, then system.studio — carry no
            footer either.

            Footer.tsx is left on disk, not deleted — same "paused, not gone"
            treatment as SlugList, Hero, AccessGate, MediaFrame, WaitlistForm,
            FeatureBlock, CtaTileRow, Newsletter, IconTextBlock and Timeline.
            The sticky-footer flex scaffolding below (min-h-svh + flex-1) is
            kept too: it costs nothing and is exactly what the footer needs
            the day it returns.

            The footer's removal orphaned /gift-card, which was reachable only
            from it. D's answer was to drop that route entirely ("remove the
            gift card page for now"), so src/app/gift-card/ is gone and every
            remaining route is reachable from the nav.

            This note existed twice, near-verbatim, until 2026-08-14. */}
        <Nav />

        {/* Header line, added 2026-08-12. Was a homepage-only strip above
            the video (see the note it replaced in app/page.tsx) — moved
            here, site-wide, at D's instruction ("remove the leds from the
            homepage and i want to create a cool header line with them
            rather"). Same LoadingLamps component, same 24px gutter Nav
            uses, unchanged internally: it still only lights up once on
            first mount per page load, so it re-plays its power-on flicker
            on every navigation rather than staying lit across routes — a
            real behavior change from being homepage-only, and arguably the
            point of a "header line" (every page gets the entrance), not an
            oversight.

            Width-capped 2026-08-12 (later, same day): D noticed the lamp
            count didn't match "the entire header." The bug: this row was
            bare `w-full` — full raw viewport width — while Nav's own row is
            `mx-auto max-w-[1710px]`. Below 1758px (1710 + two 24px gutters)
            they coincide and nothing looked wrong, which is why it shipped;
            above it, Nav sits centred with margin on both sides but the
            lamp row kept going, so it computed a lamp count for a wider
            strip than the header actually is. The outer div stays `w-full`
            so the paper background still fills edge to edge; the new inner
            div reproduces Nav's own centring so LoadingLamps' ResizeObserver
            measures the same content width Nav uses, not the viewport. */}
        <div aria-hidden className="w-full bg-[var(--paper)] py-3">
          <div className="mx-auto max-w-[1710px] px-6">
            <LoadingLamps />
          </div>
        </div>

        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
