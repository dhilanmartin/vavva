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
// `price` is gone from the model, not just from the tile. Nothing is for sale
// (see ProductTile.tsx and products/page.tsx), no tee has a price yet, and a
// field that every consumer ignores is a field that goes stale. The PB&J's $9
// is recoverable from git — 39a1a0d and earlier — the day the shop opens.
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
  },
  {
    name: "Script Tee",
    image: teeScript,
    alt: "White cotton tee with the Vavva brush wordmark printed in red across the chest.",
  },
  {
    name: "Fairies Tee",
    image: teeFairies,
    alt: "White cotton tee with two blue fairies printed at centre chest.",
  },
  {
    name: "Dobermans Tee",
    image: teeDobermans,
    alt: "White cotton tee with three black dobermans printed at centre chest.",
  },
  {
    name: "Grid Tee",
    image: teeGrid,
    alt: "White cotton tee printed with a dense grid of small multicoloured figures.",
  },
  {
    name: "Blank Tee, Black",
    image: teeBlankBlack,
    alt: "Black cotton tee with no print.",
  },
];

// mimis.nyc's own /shop grid: 4 fixed columns at a 20px gap, re-measured live
// at 1710px this session (400.5px columns in a 1662px row — this site's
// standard 24px page gutter, not a bespoke width). `gap-5` is Tailwind's 20px
// step.
//
// `grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4` down-steps from their
// desktop count rather than forcing 4 cramped columns on a phone — mimis' own
// site drops to 1 column under 810px (their tablet step still hasn't been
// directly observed; 2 is this site's usual middle step, not a measured mimis
// fact).
//
// The first four tiles load eagerly: at desktop they are the entire first row
// and sit above the fold, and Next's lazy loading would otherwise wait on an
// IntersectionObserver for images that are already on screen. Below desktop
// that over-fetches by at most three images on a 2-column tablet and three on
// a phone, which is the cheaper mistake than a blank first row.
const EAGER_TILES = 4;

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-4">
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
