import Image from "next/image";

import mark from "../../../public/brand/vavva-mark.png";

/** The house wordmark — hand-brushed, flat, never animated. */
export function VavvaMark({ className }: { className?: string }) {
  return (
    <Image
      src={mark}
      alt="Vavva"
      priority
      sizes="(max-width: 768px) 132px, 148px"
      className={className}
    />
  );
}
