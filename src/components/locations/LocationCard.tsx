// locations-page.spec.md / COMPONENT_INVENTORY.md §8: illustration + text
// block — name, address, hours.
//
// ---- 2026-08-07: centred stack, replacing the two-column row ----
//
// D: "fix our locations to have the image centered."
//
// The reference lays each entry out as a centred ROW — 183×250 portrait
// illustration, 48px gutter, 300px text column, the pair centred on the page
// and vertically centred against each other. That works because their
// artwork is a tall, narrow building sketch.
//
// Vavva's illustration is a wide landscape skyline, so the same row put the
// image hard against the left of a 1400px container with the text stranded
// far right and dead space on both sides — the lopsided result D is
// reporting. Stacking it centred is the honest translation: it keeps the
// reference's actual composition (a centred entry, name → address → hours,
// everything centre-aligned) and drops only the horizontal arrangement,
// which was a consequence of their artwork's proportions rather than a
// design decision to copy.
//
// Vertical rhythm inside the text block is the reference's own, measured at
// 1710 on 2026-08-07:
//   name (26/36.4/-1.04)  →24px→  address (14/19.6/-0.14)  →20px→  hours
// The 40px image→name gap has no counterpart on their side (their layout is
// horizontal there), so it is chosen to give the illustration room without
// detaching it from its label.
//
// The image stays OUTSIDE ScrollReveal, unchanged from before: any opacity
// transition on an ancestor forces a new stacking context for its duration,
// which blocks mix-blend-mode from reading the real page background behind
// it and breaks the flush blend mid-reveal. Only the text half reveals.
//
// 2026-08-12: briefly swapped the flush mix-blend-multiply treatment for
// the shared .vv-embed card (rounded + shadow) to match Products, then
// reverted the same day — D: "make the locations back to how it was before
// where the image was embedded. i dont want it like the product page."
// .vv-embed stays in use on Home and Products; this page just isn't part of
// that language. See DESIGN.md's embed-treatment note, narrowed back to
// those two.

import Image from "next/image";
import { ScrollReveal } from "@/components/reveal/ScrollReveal";
import skyline from "../../assets/nyc-skyline.png";

export function LocationCard({
  name,
  address,
  status,
}: {
  name: string;
  address: string[];
  status: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={skyline}
        alt="New York City skyline"
        priority
        sizes="(max-width: 810px) 100vw, 560px"
        className="w-full max-w-[560px] mix-blend-multiply"
      />

      <ScrollReveal className="mt-10 flex flex-col items-center">
        <h3 className="mimi-lead">{name}</h3>
        <p className="mimi-body mt-6">
          {address.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <p className="mimi-body mt-5">{status}</p>
      </ScrollReveal>
    </div>
  );
}
