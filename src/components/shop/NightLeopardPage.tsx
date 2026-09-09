"use client";

import nightLeopard from "../../assets/products/silk-mask.png";
import nightLeopardWorn from "../../assets/products/silk-mask-worn.png";
import { ShopPdp } from "./ShopPdp";

export function NightLeopardPage() {
  return (
    <ShopPdp
      title="Leopard"
      price="$200"
      lede="A sleep mask for wherever you are. Leopard-print plush silk, designed for total darkness and all-day comfort."
      features={[
        "100% Mulberry silk (plush finish)",
        "Adjustable stretch band",
        "Lightweight & breathable",
        "Designed in New York",
      ]}
      gallery={[
        {
          src: nightLeopard,
          alt: "Leopard-print plush silk sleep mask.",
          fit: "contain",
        },
        {
          src: nightLeopardWorn,
          alt: "Leopard mask worn on the forehead.",
          fit: "cover",
        },
      ]}
      details="Plush mulberry silk on an adjustable band. One size. Made to block light without pressing on the face."
    />
  );
}
