"use client";

import sweetDreams from "../../assets/products/sweet-dreams.png";
import { ShopPdp } from "./ShopPdp";

export function SweetDreamsPage() {
  return (
    <ShopPdp
      title="Midnight"
      price="$200"
      lede="A sleep mask for wherever you are. A night sky on plush silk, designed for total darkness and all-day comfort."
      features={[
        "100% Mulberry silk (plush finish)",
        "Adjustable stretch band",
        "Lightweight & breathable",
        "Designed in New York",
      ]}
      gallery={[
        {
          src: sweetDreams,
          alt: "Navy starfield plush silk sleep mask.",
          fit: "contain",
        },
      ]}
      details="Plush mulberry silk on an adjustable band. Night sky print. One size. Made to block light without pressing on the face."
    />
  );
}
