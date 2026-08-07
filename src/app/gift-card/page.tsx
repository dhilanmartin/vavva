import type { Metadata } from "next";
import { CardArtPreview } from "@/components/gift-card/CardArtPreview";
import { SegmentedTabs } from "@/components/gift-card/SegmentedTabs";
import { AmountPillSelector } from "@/components/gift-card/AmountPillSelector";
import { GiftCardForm } from "@/components/gift-card/GiftCardForm";
import { ScrollReveal } from "@/components/reveal/ScrollReveal";

export const metadata: Metadata = { title: "Gift Cards — VAVVA" };

/* gift-card-page.spec.md: structure only. Checkout/payment is explicitly
   out of scope per SKILL.md — this form has no backend and submits
   nowhere; it exists to carry the layout, not to sell anything. Footer-only
   route: not in Nav's PRIMARY_LINKS, so it carries no active-nav state,
   matching the reference site. No reCAPTCHA badge — third-party, not a
   structural element to replicate. */
export default function GiftCardPage() {
  return (
    <main className="w-full bg-[var(--paper)] px-4 pb-24 pt-10 md:px-5 tablet:px-6 tablet:pt-14">
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-10">
        <h1 className="text-center font-serif text-[36px] font-normal leading-[1.17] tracking-[-0.02em] text-[var(--ink)] desktop:text-[48px]">
          Gift Cards
        </h1>

        <CardArtPreview />

        <SegmentedTabs options={["Buy", "Reload"]} />

        <AmountPillSelector />

        <ScrollReveal className="w-full">
          <GiftCardForm />
        </ScrollReveal>

        <SegmentedTabs options={["Send now", "Schedule"]} />
      </div>
    </main>
  );
}
