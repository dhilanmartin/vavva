import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ScrollReveal } from "@/components/reveal/ScrollReveal";
import { SECONDARY_PAGES_LIVE } from "@/lib/site";

// Renamed from /shop to /products 2026-08-12, at D's instruction — label
// and route stay in agreement, same rule this repo already applied when
// "Merch" was reverted to "Shop" 2026-08-07 (see git history). Nav.tsx,
// Footer.tsx (unmounted), and sitemap.ts all updated alongside this file.
export const metadata: Metadata = { title: "Products — VAVVA" };

/* Reopened 2026-08-07 alongside Story — the per-route notFound() gate is
   gone site-wide (see src/lib/site.ts).

   2026-08-12: redesigned to internetlabs.co's case-study-card pattern (see
   ProductTile.tsx and plans/003-viral-direction-brief.md) instead of the
   photo-grid layout. Container went 716px (Story's .mimi-measure) -> 560px
   -> 480px -> 610px against that reference — see git history for the
   measurement trail if it's ever needed.

   Rebuilt again, later same day, against a different reference: D —
   "resize our product page to look like mimis with the same font and
   design." This retires the internetlabs.co card model above rather than
   tuning it further — mimis.nyc's own /shop is a flat 4-column grid at
   full page width, not a single narrow card, so the container widens to
   this site's standard 1710px/24px-gutter measure (matching Nav and the
   header LED line) instead of a bespoke 610px.

   Heading swapped from `.mimi-title` (43px — Locations' size) to
   `.mimi-display` (48px), because mimis' actual /shop heading measures
   48px, not 43px — `.mimi-title` was borrowed from the wrong page of the
   same reference. Gap to the grid is 44px, their own measured heading→grid
   spacing at 1710px, replacing the old 64px that had no source.
   ProductGrid.tsx and ProductTile.tsx carry the rest of the measurements
   (grid columns, card shape, type).

   2026-08-14: seven tees join the catalogue and the availability line below
   the heading arrives with them. D — "nothing should be available for
   purchase yet. maybe a hover state showing that."

   The hover state is real (ProductTile.tsx) but it cannot be the only place
   this is said: a hover-only fact is invisible on every touch device and to
   anything that is not a pointer. So the page states it once, in text, for
   everyone — and the tiles answer it on hover, where a visitor is closest to
   trying to buy. Saying it once here rather than once per tile in the grid is
   also why the tiles carry no price slot at all; eight repetitions of the
   same two words is noise, not information.

   The 44px heading→grid gap is preserved as a HEADING BLOCK→grid gap: the
   note sits 12px under the h1 and the 44px moves onto the grid wrapper
   (`mt-11`), so the reference's rhythm survives the extra line instead of
   being pushed 32px down by it. */
export default function ProductsPage() {
  // Disabled 2026-08-07 — see SECONDARY_PAGES_LIVE in src/lib/site.ts.
  if (!SECONDARY_PAGES_LIVE) notFound();

  return (
    <main className="w-full bg-[var(--paper)] px-6 pb-24 pt-10">
      <div className="mx-auto max-w-[1710px]">
        {/* On-load entrance, 2026-08-18. D: "add animation to the Products
            and Locations on their respective pages on refresh/load-in (see
            mimis.nyc)" — their page headings fade + rise on load, the same
            shape Vavva's header already uses.

            So this is `.home-rise`, not a new mechanism: the class is
            site-wide (globals.css), armed by the `intro-js`/`intro-go`
            classes layout.tsx stamps on <html>, and it fires on a hard
            refresh AND on a client-side navigation into this route — the h1
            is a freshly-inserted element either way, and a freshly-inserted
            element matching `html.intro-go .home-rise` starts its animation
            on insert.

            `--i` continues the header's own count (0/1/2 = links, mark,
            Contact) rather than restarting, which is the same thing the
            landing's one paragraph does at index 3. The page reads as one
            cascade from the top of the window down, not as two competing
            ones. */}
        <h1 className="mimi-display home-rise" style={{ ["--i" as string]: 3 }}>
          Products
        </h1>
        {/* `.mimi-body`'s own --ink-body, deliberately — this carried a
            `text-[var(--mute)]` utility for one pass and that class styled
            NOTHING. globals.css authors `.mimi-body` outside any cascade
            layer, after `@import "tailwindcss"`, and an unlayered rule beats
            every layered utility no matter the specificity. Measured, not
            assumed: the line rendered rgba(0,0,0,0.8), not the 0.55 the
            class asked for.

            Kept at --ink-body on the merits too, now that the choice is
            explicit: this is the only sentence on the page that tells a
            visitor nothing can be bought. It is body copy, not a footnote,
            and 12.63:1 is where it belongs. `mt-3` still applies — the same
            comment in globals.css explains why no `margin: 0` is set there. */}
        <p
          className="mimi-body home-rise mt-3"
          style={{ ["--i" as string]: 4 }}
        >
          A first look. Nothing is for sale yet.
        </p>
        {/* `reveal-stagger` moves the entrance off this wrapper and onto the
            tiles, 50ms apart — see globals.css. The wrapper still owns the
            observer and the intro-js gate.

            `--stagger-lead` (2026-08-18) holds the grid until the heading
            block above it has arrived. It exists because the two entrances
            are on DIFFERENT CLOCKS and nothing otherwise orders them: the
            heading's delay is measured from the intro classes landing on
            <html>, while the tiles' delays start from zero the moment the
            IntersectionObserver fires — one effect tick after hydration,
            which on a warm load can beat the h1's own 0.30s. Whichever wins
            is a race, and the losing arrangement is the page assembling
            backwards. 0.42s puts the first tile just after the 0.38s note
            and takes the race out of it.

            It is set here rather than in globals.css because it is a fact
            about THIS page's stack, not about the stagger: `.reveal-stagger`
            defaults the property to 0ms, so a grid revealed on scroll
            somewhere else still starts the instant it is seen, which is what
            a scroll reveal has to do. The 50ms step between tiles is
            untouched — the cascade is still 350ms wide, it just begins
            later. */}
        <ScrollReveal
          className="reveal-stagger mt-11"
          style={{ ["--stagger-lead" as string]: "0.42s" }}
        >
          <ProductGrid />
        </ScrollReveal>
      </div>
    </main>
  );
}
