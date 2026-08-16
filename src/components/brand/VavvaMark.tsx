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
      // Back to 96px, 2026-08-14. The mark is 31px tall again (see Nav.tsx
      // — the 152px casajondal.es sizing is reverted), which renders ~67px
      // wide, so 96px covers a 2x display. The 656px this briefly carried
      // was sized for the 152px mark and made the browser fetch a source
      // several times wider than any slot on the site actually uses.
      sizes="96px"
      className={className}
    />
  );
}
