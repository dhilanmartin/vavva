import Image from "next/image";

// Lives in src/, not public/. A statically imported asset is already emitted to
// _next/static with a content hash; leaving the source in public/ shipped the
// same 42KB a second time at an unhashed, uncacheable URL.
import mark from "../../assets/vavva-mark.png";

/** The house wordmark — hand-brushed, flat, never animated. */
export function VavvaMark({ className }: { className?: string }) {
  return (
    <Image
      src={mark}
      alt="Vavva"
      priority
      sizes="(max-width: 768px) 136px, 152px"
      className={className}
    />
  );
}
