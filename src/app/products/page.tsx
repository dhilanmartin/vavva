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

   2026-08-14: seven tees join the catalogue, and an availability line —
   "A first look. Nothing is for sale yet." — arrives under the heading with
   them, because D had asked that nothing read as purchasable.

   ---- 2026-08-18: that line is gone, and so is the position it argued for -

   D: "fix the prices text ($65 per tee)... for the pbj make the price $15...
   Also remove 'A first look. Nothing is for sale yet.'"

   Both halves of that are one decision. The line existed to say the tiles
   carried no prices ON PURPOSE; the tiles now carry prices, so the line was
   contradicting the grid under it. Removing it and adding prices had to
   happen together — either alone would have left the page arguing with
   itself.

   WORTH KNOWING, because nothing in the code says it: the page now prints
   prices with no way to pay them. There is no cart, no checkout and no
   product route — a visitor reads $65 and has nothing to click. That is a
   real gap rather than a styling one, and it is the next thing this page
   needs.

   The 44px heading→grid gap survives the removal unchanged: it was already
   living on the grid wrapper (`mt-11`) rather than on the deleted line, so
   the reference's rhythm did not depend on it. */
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
            backwards. 0.38s puts the first tile just after the heading —
            down from 0.42s, which was clearing the availability line that no
            longer exists.

            It is set here rather than in globals.css because it is a fact
            about THIS page's stack, not about the stagger: `.reveal-stagger`
            defaults the property to 0ms, so a grid revealed on scroll
            somewhere else still starts the instant it is seen, which is what
            a scroll reveal has to do. The 50ms step between tiles is
            untouched — the cascade is still 350ms wide, it just begins
            later. */}
        <ScrollReveal
          className="reveal-stagger mt-11"
          style={{ ["--stagger-lead" as string]: "0.38s" }}
        >
          <ProductGrid />
        </ScrollReveal>
      </div>
    </main>
  );
}
