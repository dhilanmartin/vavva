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
// The image stays OUTSIDE ScrollReveal, unchanged from before — an opacity
// transition on an ancestor forces a new stacking context for its duration,
// which would clip the card's own shadow mid-reveal. Only the text half
// reveals.
//
// 2026-08-12: dropped the flush mix-blend-multiply treatment for the shared
// .vv-embed card (rounded + shadow, see globals.css) — D asked for Home,
// Products, and Locations to read as one cohesive embed language rather
// than three different treatments (a flush ink-on-paper blend here, a plain
// 12px-radius video on Home, a bold shadowed card on Products). A blend
// mode that dissolves into the page and a framed card are different
// metaphors; once the page is moving toward "framed card" everywhere, the
// blend doesn't have anything to dissolve into anymore. Width (610px) and
// aspect (16:9) now match Products' card exactly, same reasoning.

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
      <div className="vv-embed relative aspect-[16/9] w-full max-w-[610px] overflow-hidden bg-[var(--placeholder-light)]">
        <Image
          src={skyline}
          alt="New York City skyline"
          priority
          fill
          sizes="(max-width: 810px) 100vw, 610px"
          className="object-cover"
        />
      </div>

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
