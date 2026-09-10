import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ScrollReveal } from "@/components/reveal/ScrollReveal";
import { isRouteLive } from "@/lib/site";

// Renamed from /shop to /products 2026-08-12, at D's instruction — label
// and route stay in agreement, same rule this repo already applied when
// "Merch" was reverted to "Shop" 2026-08-07 (see git history). Nav.tsx,
// Footer.tsx (unmounted), and sitemap.ts all updated alongside this file.
export const metadata: Metadata = { title: "Products — VAVVA" };

/* Reopened 2026-08-07 alongside Story — the per-route notFound() gate is
   gone site-wide (see src/lib/site.ts).

   ---- 2026-09-10: Balenciaga collection crop.

   D: "replicate cropping for where the product images start / headline...
   based on the 1:1 visual cropped appearance" of a Balenciaga store
   screenshot. Structure only — no their copy, type, or marks.

   Their collection page has no page title between chrome and grid. The
   first row of photographs starts a few pixels under the header's bottom
   rule. The band of paper that used to hold a 32px "Products" heading plus
   44px of gap (pt-10/16 + mt-11) is what made our crop read as a magazine
   cover instead of a catalogue. That band is gone.

   The <h1> stays, sr-only — document outline and search still need a name,
   and the nav's Products link already says the word on screen. 16px under
   the rule is the measured breath in the reference; not zero, not a title
   block. */
export default function ProductsPage() {
  // Gated per-route as of 2026-09-04 — see PRODUCTS_PAGE_LIVE in site.ts.
  if (!isRouteLive("/products")) notFound();

  return (
    <main className="vv-shop-page w-full bg-[var(--paper)] pb-24">
      <div className="vv-shop-bleed px-6">
        <h1 className="sr-only">Products</h1>
        <ScrollReveal className="reveal-stagger">
          <ProductGrid />
        </ScrollReveal>
      </div>
    </main>
  );
}
