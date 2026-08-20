import type { Metadata } from "next";
import { LeadBlock } from "@/components/story/LeadBlock";

export const metadata: Metadata = { title: "Our Story — VAVVA" };

export default function StoryPage() {
  return (
    <main className="doc-reader w-full bg-[var(--paper)]">
      <LeadBlock />
    </main>
  );
}
