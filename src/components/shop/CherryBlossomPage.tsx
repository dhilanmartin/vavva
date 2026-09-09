"use client";

import cherryBlossom from "../../assets/products/cherry-blossom.png";
import { ShopPdp } from "./ShopPdp";

export function CherryBlossomPage() {
  return (
    <ShopPdp
      title="Sakura"
      price="$200"
      lede="A sleep mask for wherever you are. Pastel cherry blossom on plush silk, designed for total darkness and all-day comfort."
      features={[
        "100% Mulberry silk (plush finish)",
        "Adjustable stretch band",
        "Lightweight & breathable",
        "Designed in New York",
      ]}
      gallery={[
        {
          src: cherryBlossom,
          alt: "Pastel cherry-blossom plush silk sleep mask.",
          fit: "contain",
        },
      ]}
      details="Plush mulberry silk on an adjustable band. Pastel cherry blossom. One size. Made to block light without pressing on the face."
    />
  );
}
