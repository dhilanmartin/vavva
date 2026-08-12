// Product tile. Started as a case-study tile modeled on internetlabs.co's
// portfolio cards (see plans/003-viral-direction-brief.md and the CHIP card
// reference D attached 2026-08-12) — big rounded card, soft shadow, then a
// name/description/pill-tag row below, tags styled after their own
// Internal/External + category pattern with price folded in as one more
// pill among equals.
//
// Redesigned 2026-08-12, later same day: D — "the product card isnt
// hitting. its too much of a 'flashcard' rather than a product item." The
// tag row was the actual problem, not the card or the photo: a metadata
// row of same-weight pills (including "Internal," a categorization label
// copied straight from a portfolio-of-case-studies template) reads as a
// fact sheet ABOUT the product, not a listing it's FOR SALE from — no
// shopping page shows a customer an "Internal" tag. Dropped the tag row
// entirely and gave price the position an actual product listing gives it:
// beside the name, same weight, where a shopper looks first. `tags` is
// gone from the props along with it — this is a name/price/description
// tile now, nothing else pretending to be product metadata.
//
// The photo swap (real House PB&J photography over the flat-color +
// wordmark treatment) and the .vv-embed shared card styling are unrelated
// decisions from earlier the same day and are untouched here — see git
// history for that reasoning if it's needed. `image` is still optional:
// without one, the tile falls back to the flat --red + wordmark treatment.
//
// Still a deliberate, scoped exception to DESIGN.md's Anti-patterns list
// (cards/shadow banned everywhere else) — see the Products-page note there.
// Radius/shadow come from the shared .vv-embed class (globals.css) rather
// than repeating the values here — MediaFrame uses the same class.

import Image, { type StaticImageData } from "next/image";

export function ProductTile({
  wordmark,
  emoji,
  name,
  price,
  description,
  image,
}: {
  wordmark: string;
  emoji: string;
  name: string;
  price: string;
  description: string;
  image?: StaticImageData;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="vv-embed relative aspect-[16/9] w-full overflow-hidden bg-[var(--red)]">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            priority
            sizes="(min-width: 716px) 716px, 100vw"
            className="object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-full w-full items-center justify-center gap-3 text-[clamp(2.25rem,9vw,4rem)] font-extrabold uppercase tracking-[-0.02em] text-[var(--paper)]"
          >
            {wordmark}
            <span className="text-[0.7em] not-italic">{emoji}</span>
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[15px] font-semibold text-[var(--ink)]">
            {name}
          </span>
          <span className="text-[15px] font-semibold text-[var(--ink)]">
            {price}
          </span>
        </div>
        <span className="text-[14px] text-[var(--mute)]">{description}</span>
      </div>
    </div>
  );
}
