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
   photo-grid layout.

   2026-08-12, later same day: container went 716px (Story's .mimi-measure)
   -> 560px -> 480px -> 610px. The 480px pass overcorrected: D compared
   full-window screenshots of internetlabs.co's CHIP card against ours at
   matching browser size and the reference measured ~710px wide against our
   ~562px — theirs is bigger, not smaller, at roughly a 1.27x ratio. 610px
   (480 * 1.27) targets that measured ratio directly instead of another
   eyeballed guess. Aspect ratio (16:9, set in ProductTile.tsx) was already
   correct — this was a size miss, not a shape miss. */
export default function ProductsPage() {
  // Disabled 2026-08-07 — see SECONDARY_PAGES_LIVE in src/lib/site.ts.
  if (!SECONDARY_PAGES_LIVE) notFound();

  return (
    <main className="w-full bg-[var(--paper)] px-6 pb-24 pt-10">
      <div className="mx-auto max-w-[610px]">
        <h1 className="mimi-title mb-16">Products</h1>
        <ScrollReveal>
          <ProductGrid />
        </ScrollReveal>
      </div>
    </main>
  );
}
