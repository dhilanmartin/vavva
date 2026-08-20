import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageOpen } from "@/components/page/PageOpen";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ScrollReveal } from "@/components/reveal/ScrollReveal";
import { SECONDARY_PAGES_LIVE } from "@/lib/site";

export const metadata: Metadata = { title: "Products — VAVVA" };

export default function ProductsPage() {
  if (!SECONDARY_PAGES_LIVE) notFound();

  return (
    <main className="w-full pb-32">
      <PageOpen title="Products">
        {/* The statement carries what the old "A first look. Nothing is for
            sale yet." pair of sentences was reaching for, in one sentence and
            without apologising for it. It is the truest thing on the site. */}
        {/* Spacing on a WRAPPER, never on the role. `.vv-statement` sets
            `margin: 0` and is unlayered, so it beats a `mb-*` utility on a
            specificity tie and the gap silently does not apply — the same
            trap `.home-note` fell into. */}
        <div className="mb-16">
          <p className="vv-statement">
            Nothing is for sale yet. The prices are real; the shop opens when
            the first run does.
          </p>
        </div>

        <ScrollReveal
          className="reveal-stagger"
          style={{ ["--stagger-lead" as string]: "0.38s" }}
        >
          <ProductGrid />
        </ScrollReveal>
      </PageOpen>
    </main>
  );
}
