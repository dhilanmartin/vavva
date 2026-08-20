/* One product, as a ledger entry with a picture.
   ===========================================================================

   Rebuilt 2026-08-19 against the new system. Three things changed and each
   was a rule in DESIGN.md rather than a preference:

   THE VARIANTS NO LONGER APPEAR ON HOVER. Sizes and flavours used to fade in
   under the caption when the pointer entered the tile — Stussy's behaviour,
   reproduced. It fails anti-pattern #3: hover does not exist on touch, so on
   every phone the information simply was not there. They are printed.

   THE PRICE CARRIES A DATE. `$65` alone is a broken promise on a site with
   no cart; `$65 · Fall 2026` is a fact. Anti-pattern #4. The date is the
   only red on the page, because it is the part that does not exist yet.

   THE FRAME IS 4:5 AND THE IMAGE FILLS IT. `object-contain` inside a fixed
   frame was letterboxing every tee into grey bands top and bottom, which
   read as broken cropping rather than as product photography on a ground.
   `object-cover` with the tile's own paper behind it lets the garment fill
   its frame the way the reference grids do. */

import Image, { type StaticImageData } from "next/image";

/* Three columns at desktop rather than six, so the widths roughly double. */
const SIZES = "(min-width: 1200px) 400px, (min-width: 810px) 33vw, 50vw";

export function ProductTile({
  name,
  image,
  alt,
  price,
  when,
  variants,
  eager = false,
  index = 0,
}: {
  name: string;
  image: StaticImageData;
  price: string;
  when: string;
  variants: string[];
  alt: string;
  eager?: boolean;
  index?: number;
}) {
  return (
    <figure className="vv-product m-0" style={{ ["--i" as string]: index }}>
      <div className="vv-product-frame relative aspect-[4/5] w-full">
        <Image
          src={image}
          alt={alt}
          fill
          sizes={SIZES}
          loading={eager ? "eager" : "lazy"}
          placeholder="blur"
          className="object-cover"
        />
      </div>

      <figcaption className="mt-4 flex flex-col gap-1.5">
        <span className="vv-ledger">{name}</span>
        <span className="vv-ledger vv-ledger-mute">
          {price}
          {" · "}
          <span className="vv-ledger-red">{when}</span>
        </span>
        {/* Printed, not hovered. */}
        <span className="vv-ledger vv-ledger-mute mt-1">
          {variants.join(" / ")}
        </span>
      </figcaption>
    </figure>
  );
}
