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
   same reference. Gap to the grid is 44px (`mb-11`), their own measured
   heading→grid spacing at 1710px, replacing the old 64px that had no
   source. ProductGrid.tsx and ProductTile.tsx carry the rest of the
   measurements (grid columns, card shape, type). */
export default function ProductsPage() {
  // Disabled 2026-08-07 — see SECONDARY_PAGES_LIVE in src/lib/site.ts.
  if (!SECONDARY_PAGES_LIVE) notFound();

  return (
    <main className="w-full bg-[var(--paper)] px-6 pb-24 pt-10">
      <div className="mx-auto max-w-[1710px]">
        <h1 className="mimi-display mb-11">Products</h1>
        <ScrollReveal>
          <ProductGrid />
        </ScrollReveal>
      </div>
    </main>
  );
}
