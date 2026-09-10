// Product tile.
//
// THIS HEADER WAS REWRITTEN 2026-09-09 BECAUSE IT HAD STOPPED BEING TRUE. It
// described the 2026-08-14 mimis.nyc pass — a 24px radius, a 1px inset
// hairline, a "COMING SOON" hover chip, a <figure> that was deliberately not
// a link, and a cell with "NO PRICE LINE" — and every one of those had been
// removed or reversed by the Stussy rebuild four days later, without the
// comment following. A reader trusting the top of this file was being handed
// a different component than the one below it. The history is in git and in
// ProductGrid.tsx; what follows is only what is here now.
//
// THE CELL, as built (measurements and their source live in ProductGrid.tsx,
// the CSS in globals.css under `---- product tile`):
//
//   photo       4:5, object-contain on a #F2F2F2 field, corners rounded —
//               14px on the phone, 18px from tablet up, squircled where
//               `corner-shape` exists. The field and the corner are both
//               departures from the reference; both are argued in globals.css
//   photo→text  10px
//   name        12px / 1.4, weight 500, uppercase, left, black
//   price       same metrics, --mute, directly under the name
//   variants    same metrics, --mute, 10px below the price. Height reserved
//               at rest so revealing it cannot reflow the grid
//
// LINK OR FIGURE, DECIDED BY `href`. A tile with a product page is wrapped in
// a <Link>; one without renders as a bare <figure> and is not a tab stop,
// because a dead <a> would announce as a link and show a target that goes
// nowhere. That is the same rule Nav.tsx applies to inert labels.
//
//   EVERY PRODUCT HAS A PAGE as of 2026-09-09, so the branch is currently
//   only exercised by ComingSoonTile below. It had drifted: Blank Tee, Black
//   printed $65 with no `href` while the four cells around it opened, which
//   made one tile in five look exactly like a link, behave like an image and
//   signal neither to touch or to the keyboard. That was closed by building
//   the page (BlankTeePage.tsx), not by styling the difference.
//
//   IF A PRODUCT EVER LANDS HERE WITHOUT A PAGE AGAIN, that is the decision
//   to revisit — an unlinked tile is indistinguishable from a linked one at
//   rest, since the only tell is `cursor: default`. Give it a page or leave
//   it out of PRODUCTS; do not invent a third state in this component.
//
// THE VARIANT ROW is a real <ul>, not a decorative string, and it is not
// aria-hidden: sizes and flavours are product information, and hiding them
// would leave a screen reader with a price and no idea what it buys. On
// pointer devices it is revealed by hover or by :focus-visible; on touch,
// where neither exists, it is simply always visible.

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

// Every column width the grid can actually produce, so the browser picks
// from the generated srcset instead of assuming 100vw.
//
// Re-derived 2026-09-10 for the Balenciaga crop: bleed grid (24px gutter,
// no `--shop` cap), 2 / 3 / 4 columns.
//
//   vw < 810      2 cols, (vw - 48 - 5) / 2       ~= 50vw
//   810..1199     3 cols, (vw - 48 - 10) / 3      ~= 33vw
//   vw >= 1200    4 cols, (vw - 48 - 15) / 4      ~= 25vw
//
// Sources are 480px wide, so Next caps the candidate list there. This exists
// so a phone does not reach for the widest file on principle.
const SIZES = "(min-width: 1200px) 25vw, (min-width: 810px) 33vw, 50vw";

export function ProductTile({
  name,
  image,
  hoverImage,
  alt,
  price,
  variants,
  href,
  eager = false,
  index = 0,
}: {
  name: string;
  image: StaticImageData;
  // Optional second frame, shown on hover. Packshot stays the default so
  // touch and reduced-motion visitors still see the product, not the ad.
  hoverImage?: StaticImageData;
  // Display strings, not money — see ProductGrid.tsx for why.
  // Optional until a price exists; omitting it drops the line rather than
  // inventing a dollar amount the tile would then have to recant.
  price?: string;
  // Sizes on the tees, flavours on the sandwich. One slot, because the
  // reference has one row there and the product decides what fills it.
  variants: string[];
  // The photograph, described. `name` is the product's name, which is not the
  // same sentence — "Star Tee" does not tell a screen reader there is a white
  // tee with a yellow star on it.
  alt: string;
  // First row only. `priority` is deprecated in Next 16 (see
  // node_modules/next/dist/docs/.../image.md — "use loading=eager or
  // fetchPriority instead"), and it was previously set on every tile, which
  // asked the browser to preload the whole catalogue at once.
  eager?: boolean;
  // Position in the grid, published to CSS as `--i` so the staggered entrance
  // can offset each tile (`.reveal-stagger` in globals.css). Exactly the
  // mechanism `.home-rise` already uses for the header's three zones — the
  // stagger is CSS's to own, the index is the component's.
  index?: number;
  href?: string;
}) {
  const tile = (
    <figure
      className={`vv-product m-0${href ? "" : " vv-product-static"}`}
      style={{ ["--i" as string]: index }}
    >
      <div className="vv-product-frame relative aspect-[4/5] w-full">
        <Image
          src={image}
          alt={alt}
          fill
          sizes={SIZES}
          loading={eager ? "eager" : "lazy"}
          placeholder="blur"
          className="object-contain"
        />
        {hoverImage ? (
          <Image
            src={hoverImage}
            alt=""
            fill
            sizes={SIZES}
            loading="lazy"
            placeholder="blur"
            className="vv-product-hover object-cover"
          />
        ) : null}
      </div>

      <figcaption className="vv-product-info">
        <span className="vv-product-name">{name}</span>
        {price ? <span className="vv-product-price">{price}</span> : null}
        {/* The reference's hover row. It is a real list, not a decorative
            string: a <ul> so the count and the boundaries between items are
            announced, and NOT aria-hidden — sizes and flavours are product
            information, and hiding them would leave a screen reader with a
            price and no idea what it buys.

            Its height is reserved at rest (globals.css), so revealing it
            cannot push the rows below it down. */}
        {variants.length > 0 ? (
          <ul className="vv-product-variants">
            {variants.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        ) : null}
      </figcaption>
    </figure>
  );

  if (!href) return tile;

  return (
    <Link href={href} className="vv-product-link">
      {tile}
    </Link>
  );
}

/* An empty slot in the same cell shape — a product that exists as a plan and
   not yet as a photograph. D, 2026-08-18: "add another row with all coming
   soon items."

   IT REUSES `.vv-product-frame` RATHER THAN AssetPlaceholder, and that is
   the whole design decision here. AssetPlaceholder paints Apple systemGray4
   (#D1D1D6) and stamps "VAVVA ASSET TBD" in the corner — it is a tool for
   reading layout rhythm on an unfinished page, and it looks like one. These
   slots sit directly under six finished products at the same size, so they
   have to read as part of the same grid: the frame keeps the #F2F2F2 field
   the real photographs are shot on, and the only difference between a filled
   cell and an empty one is that the empty one has nothing in it.

   THE CAPTION SAYS IT ONCE. An empty grey rectangle under a row of garments
   is ambiguous on its own — it could be an image that failed — and a label
   inside the frame AND under it would be saying the same thing twice in a
   cell that only has room for two lines. The name slot is where a visitor
   already looks for what a cell is, so that is where it goes.

   No price and no variant row: there is nothing to price and nothing to
   choose. That makes these cells shorter than the ones above, which is
   correct — they are a row of their own, uniform with each other. */
export function ComingSoonTile({ index = 0 }: { index?: number }) {
  return (
    <figure className="vv-product m-0" style={{ ["--i" as string]: index }}>
      <div
        aria-hidden
        className="vv-product-frame relative aspect-[4/5] w-full"
      />
      <figcaption className="vv-product-info">
        <span className="vv-product-name">Coming soon</span>
      </figcaption>
    </figure>
  );
}
