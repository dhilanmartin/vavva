import { ProductTile } from "./ProductTile";
import teeBlankBlack from "../../assets/products/tee-blank-black.jpg";
import nightLeopard from "../../assets/products/silk-mask.png";
import nightLeopardWorn from "../../assets/products/silk-mask-worn.png";
import cherryBlossom from "../../assets/products/cherry-blossom.png";
import sweetDreams from "../../assets/products/sweet-dreams.png";
import pajamaPant from "../../assets/products/pajama-pant.png";

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
    name: "Leopard",
    image: nightLeopard,
    hoverImage: nightLeopardWorn,
    alt: "Leopard-print plush silk sleep mask.",
    price: "$200",
    variants: [],
    href: "/products/leopard",
  },
  {
    name: "Sakura",
    image: cherryBlossom,
    alt: "Pastel cherry-blossom plush silk sleep mask.",
    price: "$200",
    variants: [],
    href: "/products/sakura",
  },
  {
    name: "Midnight",
    image: sweetDreams,
    alt: "Navy starfield plush silk sleep mask.",
    price: "$200",
    variants: [],
    href: "/products/midnight",
  },
  {
    name: "Pajama",
    image: pajamaPant,
    alt: "Blue and white pinstripe pajama pants.",
    price: "$85",
    variants: ["S", "M", "L", "XL"],
    href: "/products/pajama",
  },
  {
    name: "Blank Tee, Black",
    image: teeBlankBlack,
    alt: "Black cotton tee with no print.",
    price: "$65",
    variants: ["S", "M", "L", "XL"],
    href: "/products/blank-tee",
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
     name           12px / 1.4, weight 500, uppercase, LEFT aligned.
                    Stussy steps this to 10px in a 4-col row; this grid is
                    two ~277px cells, so 12px holds at every width.
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

   The eager count is THE WIDEST FIRST ROW, and nothing else. Its only job is
   to stop Next waiting on an IntersectionObserver for images that are
   already on screen; every tile past the first row is a below-fold image
   being fetched for nobody.

   The grid is 2 columns on the phone and 3 from tablet up, so the widest
   first row is 3. It had drifted to 5 — the whole catalogue — against a
   comment that described 6, a six-column desktop row and an eight-item
   catalogue, none of which this grid has had since. At two columns that
   meant a phone eager-loading rows two and three before it had painted row
   one.

   Track the column count, never the product count: the moment this is the
   length of PRODUCTS it is not a first row any more, it is a preload of the
   catalogue wearing a first row's name. */
const EAGER_TILES = 4;

export function ProductGrid() {
  // 2 / 3 / 4. Four at desktop is the Balenciaga collection crop D asked
  // for 2026-09-10 — denser, edge-aligned under the header rule. Five SKUs
  // leave a short last row; that is a catalogue of five, not a bug.
  return (
    <div className="grid grid-cols-2 gap-x-[5px] gap-y-10 tablet:grid-cols-3 desktop:grid-cols-4 desktop:gap-y-[30px]">
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
