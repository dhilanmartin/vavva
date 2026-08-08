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
      // Was 136/152px, sized for the old 88px-wide nav mark. The mark now
      // renders ~47px wide (height-matched to the reference's 22px bar), so
      // that hint was making the browser fetch a source several times wider
      // than any slot on the site actually uses. 96px covers a 2x display.
      sizes="96px"
      className={className}
    />
  );
}
