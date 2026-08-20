import { ProductTile } from "./ProductTile";
import trio from "../../assets/house-pbj-trio.png";
import teeScript from "../../assets/products/tee-script.jpg";
import teeFairies from "../../assets/products/tee-fairies.jpg";
import teeDobermans from "../../assets/products/tee-dobermans.jpg";
import teeGrid from "../../assets/products/tee-grid.jpg";
import teeBlankBlack from "../../assets/products/tee-blank-black.jpg";

// Seven tees added 2026-08-14 (D supplied the packshots; src/assets/products/).
//
// FIVE NOW. The star tee and the web tee came out 2026-08-18.
//
// The note they used to sit under said the two were "deliberately described
// rather than titled... so the site copy does not print those names," and
// treated that as sufficient. It was not, for two reasons.
//
// The smaller one: not printing a name does nothing about the artwork, and
// the artwork is what a rights holder acts on. This is a public, indexed page
// (see `robots` in layout.tsx) showing a Marvel character and a Nintendo
// power-up on garments presented as a catalogue.
//
// The larger one: the claim was FALSE ABOUT ITS OWN ASSET. tee-spider.jpg
// prints the SPIDER-MAN wordmark across the chest, in Marvel's own logotype,
// above the character. The workaround the note describes was defeated by the
// image it was written to protect, and nobody had opened the file since.
//
// The .jpgs stay on disk — same paused-not-gone convention as the unmounted
// components — because removing them from the CATALOGUE is what matters:
// unimported assets under src/ are never served or bundled. Do not reinstate
// either without a licence, and check the artwork rather than the caption.
//
// THE NAMES ARE PLACEHOLDERS, at D's instruction, and they are named for what
// is printed on them because a placeholder still has to be legible in a grid —
// "Grid Tee" tells a visitor more than "Tee 02" and costs nothing to rename.
// Replace all five the moment real names exist.
//
// `price` and `variants` are back as of 2026-08-18. D: "fix the prices text
// ($65 per tee)... on hover add sizes like the stussy... for the pbj make the
// price $15 and the sizes instead show flavors."
//
// They are stored as STRINGS, not numbers. There is no cart, no currency
// formatting and no locale switching on this site, so a number would only be
// a number that something has to turn back into "$65" — and the moment real
// commerce arrives, price stops being a display string and becomes a money
// type with a currency attached. A string is honest about being a label
// until then.
//
// `variants` is the same slot for two different kinds of thing: sizes on the
// tees, flavours on the sandwich. That is the reference's own row (Stussy
// reveals size variants under the price on hover) carrying whatever the
// product actually varies by. `variantLabel` is not stored — nothing prints
// the word "size" or "flavour", the values speak for themselves, and a label
// nobody renders is a field that goes stale.
//
// THE SIZES ARE PLACEHOLDERS, like the names above them. S/M/L/XL is the
// default run, not a stock list — no inventory exists behind any of it.
// The PB&J's three flavours are real: they are printed on the wrappers in
// house-pbj-trio.png.
//
// `description` is gone for the same reason it should not come back per-tile:
// the PB&J was the only product carrying one, so its cell ran a third text
// tier that no other cell in the row had, and the grid read ragged. A
// catalogue grid is names and pictures; the sentence about the sandwich
// belongs on a product page, which does not exist yet.
//
// Order is deliberate: the one real product leads, the house wordmark tee
// leads the tees, the blank closes.
//
// It was eight items — two clean rows of four. At six it is a row of four and
// a row of two, and that is left alone rather than padded back up: a short
// last row is what a real catalogue of six things looks like, and inventing
// two products to square the grid would be the grid deciding the inventory.
const PRODUCTS = [
  {
    name: "House PB&J",
    image: trio,
    alt: "Three foil-wrapped House PB&J sandwich bars stacked — gold, red and purple.",
    price: "$15",
    when: "Fall 2026",
    variants: ["PB", "PB&J", "Jam"],
  },
  {
    name: "Script Tee",
    image: teeScript,
    alt: "White cotton tee with the Vavva brush wordmark printed in red across the chest.",
    price: "$65",
    when: "Fall 2026",
    variants: ["S", "M", "L", "XL"],
  },
  {
    name: "Fairies Tee",
    image: teeFairies,
    alt: "White cotton tee with two blue fairies printed at centre chest.",
    price: "$65",
    when: "Fall 2026",
    variants: ["S", "M", "L", "XL"],
  },
  {
    name: "Dobermans Tee",
    image: teeDobermans,
    alt: "White cotton tee with three black dobermans printed at centre chest.",
    price: "$65",
    when: "Fall 2026",
    variants: ["S", "M", "L", "XL"],
  },
  {
    name: "Grid Tee",
    image: teeGrid,
    alt: "White cotton tee printed with a dense grid of small multicoloured figures.",
    price: "$65",
    when: "Fall 2026",
    variants: ["S", "M", "L", "XL"],
  },
  {
    name: "Blank Tee, Black",
    image: teeBlankBlack,
    alt: "Black cotton tee with no print.",
    price: "$65",
    when: "Fall 2026",
    variants: ["S", "M", "L", "XL"],
  },
];

/* ---- 2026-08-18: rebuilt against stussy.com/collections/tees --------------

   D: "redesign the shop page to look like https://www.stussy.com/collections/
   tees (the way the items are viewable/cropped/listed with names etc)." The
   parenthetical scopes it — this is the GRID AND THE CELL, not the page
   chrome. The h1 and the availability line above stay as they are.

   Measured live off their collection page rather than eyeballed, and only
   structure and metrics are taken across — no copy, no imagery, no colour
   values (see .claude/skills/clone-structure for this repo's rule on that):

     columns        2 below 1200px, 4 at and above it. Flat 2 all the way
                    from 375 to 900+, which is why the middle `tablet:` step
                    this grid used to carry is gone rather than retuned

                    SIX AT DESKTOP NOW, not the reference's four (D,
                    2026-08-18: "make it show each row shows 6 items on the
                    shop"). At the 1710px container that is 272px columns
                    against their 258px — so the cells land close to the
                    reference's actual size, and the whole catalogue of six
                    fits on one row. A `tablet:` step of 3 comes back with
                    it: 2 -> 6 straight across the 1200px line would have
                    gone from 560px cells to 188px ones in a single pixel
     column gap     5px — at every width, and it is the most distinctive
                    number on the page. The images very nearly touch
     row gap        40px below desktop, 30px at desktop
     image          4:5 portrait, flat: no radius, no border, no shadow
     image -> text  10px
     name           12px/16.8px below desktop, 10px/14px at desktop, weight
                    500, uppercase, LEFT aligned
     hover reveal   a second line fades in under the name, 250ms
                    cubic-bezier(0.215, 0.61, 0.355, 1), its height reserved
                    at rest so the grid cannot reflow

   THE 4:5 FRAME IS THE REAL WIN AND IT IS LUCK, not judgement: all five tee
   packshots are 480x600, which is exactly 4:5. The square frame this grid
   used to carry was cropping them to y=60..540 — the reference's own aspect
   ratio happens to show these garments whole, with no crop at all.

   A SECOND ROW OF EMPTY SLOTS follows the six real products (D, 2026-08-18:
   "add another row with all coming soon items"). Six of them, so the count
   is the desktop row rather than a number of planned products — nobody has
   said what is coming, only that something is. They continue the stagger's
   index from the real tiles so the entrance cascades through both rows as
   one gesture rather than restarting halfway down the page.

   The eager count follows the desktop row: 6 is the entire first row there,
   and at two columns it is the first three rows. Both are above the fold on
   the viewports they apply to, which is the only thing this number is for —
   Next would otherwise wait on an IntersectionObserver for images already on
   screen. With six products it happens to be the whole catalogue; leave it
   at 6 rather than tracking the count, or a seventh product silently starts
   eager-loading a below-fold image. */
const EAGER_TILES = 6;

/* THE SECOND ROW OF SIX EMPTY "COMING SOON" TILES IS GONE (2026-08-19).

   It was added at D's request and it doubled the page, but what it doubled
   was nothing: six identical grey rectangles labelled with the same two
   words. DESIGN.md anti-pattern #6 — never pad a page or a grid with blanks
   to reach a target height or column count — was written from looking at
   exactly this. A catalogue padded with blanks advertises how little is in
   it; six finished objects, larger, do the opposite.

   The grid also went from six columns at 5px gutters to three at 24px. Six
   was Stussy's density, and Stussy is filling it with a few hundred tees. */

// One desktop row of empty slots under the catalogue.

export function ProductGrid() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-14 tablet:grid-cols-3">
      {PRODUCTS.map((product, i) => (
        <ProductTile
          key={product.name}
          {...product}
          eager={i < EAGER_TILES}
          index={i}
        />
      ))}
    </div>
  );
}
