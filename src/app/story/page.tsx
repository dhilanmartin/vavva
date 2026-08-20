import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeadBlock } from "@/components/story/LeadBlock";
import { SECONDARY_PAGES_LIVE } from "@/lib/site";

export const metadata: Metadata = { title: "Our Story — VAVVA" };

export default function StoryPage() {
  /* Disabled 2026-08-19 — see SECONDARY_PAGES_LIVE in src/lib/site.ts. D:
     "disable the locations/products/our story pages for now."

     THIS GATE WAS MISSING, and its absence was a live bug waiting for the
     flag to be flipped rather than a style difference. /products and
     /locations have carried it since 2026-08-07; /story did not, because it
     was reopened separately and the gate was never added back. So the flag
     would have taken this page out of sitemap.xml and out of both link
     lists while leaving it answering 200 — an unlinked, uncrawled page that
     is nonetheless public.

     That is ISSUE-001 (commit e9a9e5e) inverted: that one was a live, linked
     page missing from the sitemap, and this would have been a live page
     missing from everything. One flag, three routes, same gate. */
  if (!SECONDARY_PAGES_LIVE) notFound();

  return (
    <main className="doc-reader w-full bg-[var(--paper)]">
      <LeadBlock />
    </main>
  );
}
