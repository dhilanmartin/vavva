import type { Metadata } from "next";
import { PageOpen } from "@/components/page/PageOpen";
import { LeadBlock } from "@/components/story/LeadBlock";

export const metadata: Metadata = { title: "Our Story — VAVVA" };

/* Rebuilt on the shared opening gesture, 2026-08-19.

   The page used to centre a 48px serif title over a centred prose column and
   then leave roughly 40% of the viewport empty above the footer. Both halves
   of that were wrong in the same way: centred prose reads as a caption, and
   padding a short page to full height is how a page with little to say ends
   up looking unfinished rather than brief.

   It is short now, and allowed to be. */
export default function StoryPage() {
  return (
    <main className="w-full pb-32">
      <PageOpen title="Our Story">
        <LeadBlock />
      </PageOpen>
    </main>
  );
}
