import type { Metadata } from "next";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ScrollReveal } from "@/components/reveal/ScrollReveal";

// Route stays /shop, label reads "Merch" (D, 2026-08-07) — see Nav.tsx.
export const metadata: Metadata = { title: "Merch — VAVVA" };

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
  return (
    <main className="w-full bg-[var(--paper)] px-6 pb-24 pt-10">
      <div className="mx-auto max-w-[1710px]">
        <h1 className="mimi-title mb-16">Merch</h1>
        <ScrollReveal>
          <ProductGrid />
        </ScrollReveal>
      </div>
    </main>
  );
}
