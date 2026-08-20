import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AnnouncementBar } from "@/components/announce/AnnouncementBar";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import "./globals.css";

/* INTER, and it is the only face on the site (2026-08-19).

   D: "id rather have u use the same font for the page/footer as im using in
   my other project (prismarineco)". This is that project's exact loader —
   next/font/google, latin subset, the optical-size axis requested explicitly,
   exposed as a CSS variable and self-hosted at build time so no request
   leaves the origin at runtime.

   `opsz` is the reason this is worth doing properly rather than naming Inter
   in a font stack: Inter ships real optical cuts, so the 48px page titles get
   a different master than the 14px nav rather than one compromise outline
   scaled up and down.

   It replaces two faces at once — Satoshi (the sans) and GT Alpina (the
   serif display, whose files were trial cuts). Hierarchy that used to come
   from switching family now comes from the weight axis, which is what
   Prismarine does too. */
const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
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
      className={inter.variable}
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
      <body className="flex min-h-svh flex-col">
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
        {/* THE HEADER STANDS ON THE BAR (2026-08-19). D: "Place the current
            header components on the announcement bar and remove the current
            announcement bar copy ... keep the announcement bar how it is
            (same size) ... and just fit the buttons onto the announcement
            bar."

            One element of chrome at the top of every route, 43px tall — the
            bar's own height, unchanged — carrying the links, the mark and
            Contact. The bar no longer says anything; it is the white field
            and drop shadow the nav sits on. See AnnouncementBar.tsx for what
            had to go with the copy (the dismiss button, chiefly: it used to
            `display: none` this element, which would now delete the site's
            navigation).

            THE LANDING'S OVERLAID HEADER IS GONE WITH IT, and that is the
            visible half of the change rather than a side effect. `/` used to
            run the header absolutely over the artwork — transparent, over a
            dark scrim, with white links and a white-inverted mark, because
            no ink colour cleared 4.5:1 against foliage, sky and blossom at
            once. On an opaque white bar none of that applies, which is what
            makes the rest of D's ask safe: the mark is red again (6.5:1) and
            the links are black (21:1). The artwork itself does not move — it
            already began at the bottom edge of this bar, and it still does.
            globals.css keeps the contrast measurements at the deleted scrim.

            THE POSITIONING CONTEXT WENT WITH THE OVERLAY. The wrapper that
            used to hold the header and the page together existed so an
            absolute `top: 0` would land below the bar with no number to keep
            in step. Nothing is absolute here any more. */}
        <AnnouncementBar>
          <Nav />
        </AnnouncementBar>

        {/* ---- the header lamp strip is gone (2026-08-18) ----------------

            D: "remove the rotating header." Foreshadowed by the request two
            hours earlier to speed it up — "before we remove it so i can see
            how it looks" — so this is the decision that pass was staged for,
            not a reversal of it.

            What it was: a full-bleed row of green LEDs under the nav on
            every route, sliding continuously. Its whole history is in
            LoadingLamps.tsx, which stays on disk unmounted under the same
            paused-not-gone convention as Footer, MediaFrame and
            WaitlistForm. It still renders correctly if remounted — as a
            static lit row, since the slide and the on-load wipe went with it
            from globals.css. Recover those from git if the motion is wanted
            back.

            TWO NUMBERS MOVED WITH IT, and they are the reason this is not
            just a deleted line: the site's chrome was 64px of nav bar plus
            40px of strip, and both `.home-stage` (globals.css) and
            not-found.tsx subtracted that 104px to centre their content. It
            is 64px now. Left at 104 those two pages would centre against a
            band that no longer exists and sit visibly high.

            It also settles a conflict rather than only removing an element:
            the strip's LED green (#5CF05C over #00C000) was the second green
            on the landing once the coming-soon sign arrived, and DESIGN.md
            had it logged as an open problem. There is one accent per route
            again. */}

        {/* `flex flex-col` as well as `flex-1`, so a page can ask to fill
            whatever height is left rather than computing it. See
            `.home-stage` in globals.css — that rule subtracted a hardcoded
            chrome height and was wrong three times: 64, then 104 when the
            lamp strip arrived, then 64 again when it went, then 144 the
            moment a footer was mounted under it. It now just grows. */}
        <div className="flex flex-1 flex-col">{children}</div>

        {/* Remounted 2026-08-18 ("emulate their footer"), for the first time
            since 2026-08-07 when D removed it. Rebuilt against mimis.nyc's
            own — see Footer.tsx for the measurements and the three places
            Vavva's constraints forced a departure. The `flex-1` above is
            what puts it at the bottom of a short page. */}
        <Footer />
      </body>
    </html>
  );
}
