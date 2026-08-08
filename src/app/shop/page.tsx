import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ScrollReveal } from "@/components/reveal/ScrollReveal";
import { SECONDARY_PAGES_LIVE } from "@/lib/site";

// Label reverted to "Shop" 2026-08-07 at D's instruction, matching the
// route. It briefly read "Merch" to mirror the reference site's own
// label/route split; that indirection is gone and the two agree again.
export const metadata: Metadata = { title: "Shop — VAVVA" };

/* Reopened 2026-08-07 alongside Story — the per-route notFound() gate is
   gone site-wide (see src/lib/site.ts).

   Every product image on this page is still an AssetPlaceholder, at D's
   instruction ("on the products page have it all placeholders still"). The
   catalog names and prices under them are invented too, and stay flagged as
   such in ProductGrid.tsx rather than reading as a real product list.

   h1 uses the 43px .mimi-title rather than Story's 48px .mimi-display: both
   sizes exist on the reference site and 43px is the one its non-Story
   section pages carry. 24px gutter, 40px below the header — their rhythm. */
export default function ShopPage() {
  // Disabled 2026-08-07 — see SECONDARY_PAGES_LIVE in src/lib/site.ts. This
  // also takes the invented catalog and its invented prices off the public
  // site, which is the one thing here that most wanted taking down.
  if (!SECONDARY_PAGES_LIVE) notFound();

  return (
    <main className="w-full bg-[var(--paper)] px-6 pb-24 pt-10">
      <div className="mx-auto max-w-[1710px]">
        <h1 className="mimi-title mb-16">Shop</h1>
        <ScrollReveal>
          <ProductGrid />
        </ScrollReveal>
      </div>
    </main>
  );
}
