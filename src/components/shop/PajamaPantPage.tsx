"use client";

import pajamaPant from "../../assets/products/pajama-pant.png";
import { ShopPdp } from "./ShopPdp";

export function PajamaPantPage() {
  return (
    <ShopPdp
      title="Pajama"
      price="$85"
      lede="Pinstripe pajama pant. Light cotton, drawstring waist, cut to sleep in and leave the house in."
      features={[
        "Lightweight cotton",
        "Elastic waist with drawstring",
        "Relaxed straight leg",
        "Designed in New York",
      ]}
      gallery={[
        {
          src: pajamaPant,
          alt: "Blue and white pinstripe pajama pants.",
          fit: "contain",
        },
      ]}
      sizes={["S", "M", "L", "XL"]}
      details="Pinstripe pajama pant. Elastic waist with drawstring. Relaxed straight leg."
    />
  );
}
