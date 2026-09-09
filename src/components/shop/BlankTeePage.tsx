"use client";

import teeBlankBlack from "../../assets/products/tee-blank-black.jpg";
import { ShopPdp } from "./ShopPdp";

/* Added 2026-09-09. This tile was the one product in the grid with no page:
   it printed $65 next to four cells that opened and answered nothing itself,
   and because a tile without `href` renders as a bare <figure>, it was also
   not a tab stop — a cell that looked exactly like a link, behaved like an
   image, and gave no signal either way to touch or to the keyboard. D chose
   to build the page rather than pull the tile, so the grid is uniform again.

   THE COPY IS DERIVED, NOT WRITTEN. Every claim below comes from data the
   catalogue already asserted — the price and size run from ProductGrid.tsx,
   the material and the absence of a print from the tile's own alt text
   ("Black cotton tee with no print"), and the New York line from the
   organisation schema in layout.tsx that the Pajama page already prints.
   Nothing here describes fabric weight, fit or construction, because nobody
   has said what those are and a product page is the worst place to guess.
   Replace this with the real spec when it exists. */
export function BlankTeePage() {
  return (
    <ShopPdp
      title="Blank Tee, Black"
      price="$65"
      lede="Black cotton tee. No print, no logo, nothing on it at all."
      features={["Cotton", "Unprinted", "Designed in New York"]}
      gallery={[
        {
          src: teeBlankBlack,
          alt: "Black cotton tee with no print.",
          fit: "contain",
        },
      ]}
      sizes={["S", "M", "L", "XL"]}
      details="Black cotton tee with no print."
    />
  );
}
