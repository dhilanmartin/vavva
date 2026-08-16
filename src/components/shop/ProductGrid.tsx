import { ProductTile } from "./ProductTile";
import trio from "../../assets/house-pbj-trio.png";
import teeScript from "../../assets/products/tee-script.jpg";
import teeStar from "../../assets/products/tee-star.jpg";
import teeFairies from "../../assets/products/tee-fairies.jpg";
import teeDobermans from "../../assets/products/tee-dobermans.jpg";
import teeSpider from "../../assets/products/tee-spider.jpg";
import teeGrid from "../../assets/products/tee-grid.jpg";
import teeBlankBlack from "../../assets/products/tee-blank-black.jpg";

// Seven tees added 2026-08-14 (D supplied the packshots; src/assets/products/).
//
// THE NAMES ARE PLACEHOLDERS, at D's instruction, and they are named for what
// is printed on them because a placeholder still has to be legible in a grid —
// "Star Tee" tells a visitor more than "Tee 02" and costs nothing to rename.
// Two of them are deliberately described rather than titled: the web-slinger
// and the star are licensed characters, so the site copy does not print those
// names. Replace all seven the moment real names exist.
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
// leads the tees, the blank closes. At four columns that is two full rows with
// no gap — the grid was built for a second product on 2026-08-12 and this is
// it arriving, no rebuild required.
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
    name: "Star Tee",
    image: teeStar,
    alt: "White cotton tee with a yellow star printed at centre chest.",
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
    name: "Web Tee",
    image: teeSpider,
    alt: "White cotton tee with a comic-book web-slinger printed at centre chest.",
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
