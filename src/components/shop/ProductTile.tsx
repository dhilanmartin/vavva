// Product tile. Fourth pass, 2026-08-14 — the first three are in git history
// and summarised in DESIGN.md; the short version is internetlabs.co card ->
// "too much of a flashcard" -> flat mimis.nyc grid card.
//
// This pass re-measured mimis.nyc/shop live rather than trusting the notes
// the last pass left, and two of those notes turned out to be wrong:
//
//   radius  the last pass recorded "flat — no radius, no shadow." Their image
//           wrapper (.framer-1x451sv) computes `border-radius: 24px` with
//           `overflow: hidden`. It is rounded, and it always was; the flat
//           reading came from an outer container that carries no radius of
//           its own. 24px here, matching them exactly — which also happens to
//           be `.vv-embed`'s mobile radius, though this deliberately does not
//           reuse that class: .vv-embed carries a drop shadow and mimis'
//           card has none.
//   hover   the spec file says "no hover state, confirmed by direct hover
//           test," and that part still holds — re-confirmed by a real pointer
//           hover this session, not a synthetic event: their two stacked
//           image layers are SSR responsive variants (one is display:none per
//           breakpoint), not a hover swap. Vavva's hover exists for a reason
//           their catalogue doesn't have — see "not for sale" below.
//
// What is reproduced 1:1 from them:
//
//   grid gap    20px           (ProductGrid.tsx)
//   image→name  20px
//   name        Inter 600 16px / 20px, uppercase, centred
//   radius      24px, overflow hidden
//
// Three deliberate departures, each because Vavva's inventory is not theirs:
//
//   SQUARE, not their 4:3. Measured, not preferred: every tee source is
//   480x600 with the garment inked from y=125 to y=476. Covered into a 4:3
//   box the crop lands at y=120..480 — the shoulders and hem come within 5px
//   of the frame edge. Covered into a square the crop is y=60..540, which
//   leaves ~64px of air top and bottom and ~42px at the sides. Their photos
//   are full-bleed lifestyle shots that fill any frame you give them; these
//   are packshots whose subject brings its own margins, and the frame has to
//   respect the subject's proportions rather than the reference's.
//
//   HAIRLINE, 1px rgba(0,0,0,0.10) inset. Its reason has changed once
//   already: it arrived because the tees were shot on pure #FFFFFF against
//   a #FFFFFF paper and floated with no tile around them, and D re-exported
//   all seven on #F2F2F2 the same day, which solved that. It stays for a
//   different reason — the catalogue's backgrounds are not uniform (the
//   PB&J is on #FBFBFB, the tees on #F2F2F2), and the rule is what makes
//   all eight read as the same kind of object anyway. See globals.css.
//
//   NO PRICE LINE. Their card is image → name → price. Nothing here is for
//   sale, no tee has a price yet, and every tile repeating the same
//   "COMING SOON" in the price slot is noise, not information. Availability
//   is stated once, in page copy, and answered per-tile on hover.
//
// NOT FOR SALE, and how that is expressed (D, 2026-08-14: "nothing should be
// available for purchase yet. maybe a hover state showing that"):
//
//   - The tile is a <figure>, not a link. There is no product page to link
//     to, and a dead <a> would announce as a link, take a tab stop and show a
//     target in the status bar. Same reasoning NavItem already applies to the
//     inert nav labels — see Nav.tsx.
//   - Hover (pointer devices only) fades a "COMING SOON" chip up from the
//     bottom of the image and deepens the hairline. The chip is aria-hidden:
//     it is a pointer-only restatement of copy the page already carries in
//     text above the grid, so assistive tech and touch users lose nothing.
//     That page line is what makes a hover-only affordance acceptable here.
//   - The chip sits at the bottom edge rather than washing the whole image,
//     because a scrim over a white-on-white packshot erases the product to
//     say a sentence about it.

import Image, { type StaticImageData } from "next/image";

// Every column width the grid can produce, so the browser picks from the
// generated srcset instead of assuming 100vw. 401px is mimis' own measured
// column at this site's 1710px cap (1662px of content, 4 columns, 3x20px
// gaps); between 1200 and 1758 the grid is still 4 columns but fluid, hence
// the 25vw step. The sources are 480px wide, so Next caps there regardless —
// this exists to stop a phone downloading the widest candidate.
const SIZES =
  "(min-width: 1758px) 401px, (min-width: 1200px) 25vw, (min-width: 810px) 50vw, 100vw";

export function ProductTile({
  name,
  image,
  alt,
  eager = false,
  index = 0,
}: {
  name: string;
  image: StaticImageData;
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
}) {
  return (
    <figure
      className="vv-product m-0 flex flex-col gap-5"
      style={{ ["--i" as string]: index }}
    >
      <div className="vv-product-frame relative aspect-square w-full">
        <Image
          src={image}
          alt={alt}
          fill
          sizes={SIZES}
          loading={eager ? "eager" : "lazy"}
          placeholder="blur"
          className="object-cover"
        />
        <span aria-hidden className="vv-product-chip">
          Coming soon
        </span>
      </div>

      <figcaption className="text-center text-[16px] font-semibold uppercase leading-5 text-[var(--ink)]">
        {name}
      </figcaption>
    </figure>
  );
}
