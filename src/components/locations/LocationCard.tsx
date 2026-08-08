// locations-page.spec.md / COMPONENT_INVENTORY.md §8: illustration (left) +
// text block (right) — name, 2-line address, hours — same side every entry,
// not alternating. Stacks to image-above-text on mobile.

import Image from "next/image";
import { ScrollReveal } from "@/components/reveal/ScrollReveal";
import skyline from "../../assets/nyc-skyline.png";

// Redesigned 2026-08-06 per D's reference mockup: one location, skyline
// illustration left / text right, no card chrome, generous whitespace —
// replaces the earlier stacked image-over-text card pattern. Illustration
// is D's own supplied asset (src/assets/nyc-skyline.png), swapped in for
// the placeholder hand-authored sketch this slot carried until now.
//
// The image is deliberately outside ScrollReveal (2026-08-07): any
// opacity transition on an ancestor forces a new stacking context for
// its duration, which blocks mix-blend-mode from seeing the real page
// background behind it — the flush blend broke while the reveal was
// mid-transition. Only the text half reveals; the image is just always
// there, which reads fine for a static illustration.
export function LocationCard({
  name,
  location,
  status,
}: {
  name: string;
  location: string;
  status: string;
}) {
  return (
    <div className="flex flex-col items-center gap-10 tablet:flex-row tablet:items-center tablet:gap-20">
      <Image
        src={skyline}
        alt="New York City skyline"
        priority
        sizes="(min-width: 810px) 46vw, 560px"
        className="w-full max-w-[560px] mix-blend-multiply tablet:w-[46%] tablet:max-w-none"
      />
      {/* Type is mimis.nyc/locations' own scale, measured off their live
          computed styles on 2026-08-07 and reproduced exactly — entry name
          at 26/36.4/-1.04px serif 400 (.mimi-lead), address and hours at
          14/19.6/-0.14px Inter 500 (.mimi-body), with a 20px gap between
          the two body lines, which is the margin their own stacked
          paragraphs carry. Only the fonting was asked for and only the
          fonting changed: this stays illustration-left / text-right per D's
          2026-08-06 mockup, where the reference stacks its entries centred.

          Text stays centred — the reference's own alignment, and it reads
          correctly as the right half of a two-column row. A
          `tablet:text-left` override was tried here and removed: .mimi-* is
          authored after Tailwind's utility layer in globals.css, so at equal
          specificity its `text-align: center` beat the utility and the
          override was doing nothing. Better to state the alignment once than
          to leave behind a line that only looks like it works. */}
      <ScrollReveal className="flex flex-col gap-5">
        <h3 className="mimi-lead">{name}</h3>
        <div className="flex flex-col gap-5">
          <p className="mimi-body">{location}</p>
          <p className="mimi-body">{status}</p>
        </div>
      </ScrollReveal>
    </div>
  );
}
