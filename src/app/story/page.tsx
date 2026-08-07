import type { Metadata } from "next";
import { LeadBlock } from "@/components/story/LeadBlock";
import { Triptych } from "@/components/story/Triptych";
import { IconTextBlock } from "@/components/story/IconTextBlock";
import { Timeline } from "@/components/story/Timeline";
import { AssetPlaceholder } from "@/components/placeholder/AssetPlaceholder";

export const metadata: Metadata = { title: "Story — VAVVA" };

/* story-page.spec.md order: Lead block -> triptych -> section heading ->
   icon+text x3 -> triptych -> curved timeline (deferred, see Timeline.tsx)
   -> closing illustration. */
export default function StoryPage() {
  return (
    <main className="w-full bg-[var(--paper)] pb-24 pt-10 tablet:pt-14">
      <div className="flex flex-col gap-16 tablet:gap-20">
        <LeadBlock />

        <div className="px-4 md:px-5 tablet:px-6">
          <Triptych />
        </div>

        <h2 className="px-4 text-center font-serif text-[30px] font-normal leading-[1.17] tracking-[-0.02em] text-[var(--ink)] md:px-5 desktop:text-[36px]">
          What we believe
        </h2>

        <div className="flex flex-col gap-16 tablet:gap-20">
          <IconTextBlock
            icon="circle"
            title="Considered craft"
            body="Everything we make starts with a question worth answering slowly, not a trend worth chasing quickly."
          />
          <IconTextBlock
            icon="plus"
            title="Quiet patience"
            body="Good work takes the time it takes. We'd rather finish something right than finish it first."
          />
          <IconTextBlock
            icon="triangle"
            title="Shared abundance"
            body="A studio is nothing without the people who show up for it. Vavva is built to be shared."
          />
        </div>

        <div className="px-4 md:px-5 tablet:px-6">
          <Triptych />
        </div>

        <Timeline />

        <div className="px-4 md:px-5 tablet:px-6">
          <AssetPlaceholder
            tone="light"
            label="VAVVA ASSET TBD — illustration"
            className="mx-auto aspect-[16/7] w-full max-w-[900px] rounded-[24px]"
          />
        </div>
      </div>
    </main>
  );
}
