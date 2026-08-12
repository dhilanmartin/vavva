"use client";

// Auto-rotating image stack for a product card. Not a hover treatment —
// ProductCard.tsx's own spec comment bans hover-triggered image changes
// ("deliberately no hover state... do not add a hover treatment to this
// card"), so this cycles on a timer instead, same as it would for any
// visitor regardless of pointer type. Crossfade, not a slide/wipe, so
// nothing moves — just opacity, on the same --ease-out token used for the
// site's press feedback. Gated on prefers-reduced-motion like every other
// looping effect in this codebase (see globals.css).

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

const ROTATE_MS = 3200;

export function RotatingProductImage({
  images,
  alt,
}: {
  images: StaticImageData[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="relative aspect-[5/4] w-full overflow-hidden">
      {images.map((img, i) => (
        <Image
          key={i}
          src={img}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          priority={i === 0}
          className={`object-cover transition-opacity duration-500 ease-[var(--ease-out)] ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
