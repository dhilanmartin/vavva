// Product tile, three redesigns in one 2026-08-12 session:
//
// 1. Started as a case-study tile modeled on internetlabs.co's portfolio
//    cards (see plans/003-viral-direction-brief.md) — rounded card, soft
//    shadow, name/description/pill-tag row, price folded in as one more
//    pill among equals.
// 2. D: "the product card isnt hitting. its too much of a 'flashcard'
//    rather than a product item." Dropped the tag row (including
//    "Internal," a categorization label that never should have shown to a
//    customer) and put price beside the name instead.
// 3. This pass — D: "resize our product page to look like mimis with the
//    same font and design." Rebuilt against mimis.nyc's own /shop grid,
//    measured live at 1710px, not eyeballed:
//
//      card    flat — no radius, no shadow, no chrome around the image
//      image   4:3 (measured 401×300 = 1.335, i.e. 4:3), object-cover
//      name    Inter 600 16px, uppercase, centred
//      price   Inter 600 14px, centred, directly below name (~8px gap)
//      rhythm  ~20px image→name; name→price is the tight 8px above
//
//    That's a full structural swap from step 2's card, not a refinement of
//    it: mimis stacks name then price centred under a flat image, it does
//    not run them side by side in a rounded card. `.vv-embed` (radius +
//    shadow) is dropped from this tile entirely as a result — it's now
//    Home-only, see DESIGN.md and globals.css.
//
//    One deliberate departure from the reference: `description` stays.
//    Mimi's is an established merch catalogue where a photo of a tote bag
//    needs no further explanation; Vavva's one product is a pre-launch
//    food item that does. It renders as a third, visually secondary tier
//    below name/price — new information mimis' own cards don't carry, not
//    a copy of how they'd carry it.
//
// `image` is optional: without one, the tile falls back to the flat --red
// + wordmark treatment (unchanged from before this pass).

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
    <div className="flex flex-col items-center gap-5">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--red)]">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            priority
            sizes="(min-width: 1200px) 400px, (min-width: 810px) 50vw, 100vw"
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

      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-[16px] font-semibold uppercase text-[var(--ink)]">
          {name}
        </span>
        <span className="text-[14px] font-semibold text-[var(--ink)]">
          {price}
        </span>
      </div>

      {description && (
        <span className="max-w-[320px] text-center text-[13px] text-[var(--mute)]">
          {description}
        </span>
      )}
    </div>
  );
}
