import { VavvaMark } from "@/components/brand/VavvaMark";
import { DiaGradient } from "@/components/dia/DiaGradient";
import { AccessGate } from "@/components/gate/AccessGate";

export default function HomePage() {
  return (
    <main className="relative flex min-h-dvh w-full flex-col bg-[#E8E8E8] antialiased">
      {/* Top-anchored: 3.25rem mobile / 6rem desktop / 9rem on a tall frame.

          The measure is 308px, and that number is measured, not chosen. It is
          fitted to the sentence rather than the other way round: this copy sets
          two lines at 308 (260px and 306px — 92% of the column inked) and the
          etymology sets three (223 / 233 / 272). Widening to the old 336 does
          not change a single break, it only adds 28px of bare paper to the
          right of every line and drops the fill to 84%. That gap is what made
          the block read as shoved left under a centred mark.

          The word "based" is absent on purpose — "a creative studio based in
          Los Angeles" ran three lines at 215 / 233 / 199 (64% inked, and "New
          York / City" split across the break). Deleting one word bought both
          the second line and the intact city name, so do not put it back
          without re-measuring.

          No white-space:nowrap on the city names. At this measure the break
          falls after "&", so "New York City" survives on its own; pinning it
          rags harder for the same fill.

          max-w is the measure plus the padding, so both breakpoints land on
          308: 340 − 32 below md, 348 − 40 above. Under ~340px of viewport the
          column goes fluid and the copy re-wraps to three lines — checked, and
          it still balances, because `text-wrap: balance` in globals.css is
          doing the equalising rather than this number.

          The third padding step is keyed to viewport *height*, not width. The
          aurora is 44dvh, so the paper the column actually sits on is the top
          56% of the frame, and the block is ~311px tall on desktop. Optical
          centring in that band wants (0.56H − 311) / 2 of top padding: 96px at
          900 tall, which is what md:pt-24 already is and presumably what it was
          tuned against, but 147px at 1080, where the block was riding high over
          a dead stripe of paper. 9rem covers the tall case without touching any
          other viewport. Deliberately a static breakpoint rather than a dvh
          calc — dvh arithmetic here is what produced the iOS seam this page has
          already been through once. */}
      <div className="relative z-10 mx-auto flex w-full max-w-[340px] flex-1 flex-col px-4 pb-28 pt-13 md:max-w-[348px] md:px-5 md:pt-24 [@media(min-height:1000px)]:md:pt-36">
        {/* The house logo, and now the only VAVVA on the page at all.
            It is an h1 because it is the page's title — the mark carries the
            name, so without this the document has no heading at all.

            Centred over ragged-left copy: a menu masthead. The mark is the only
            centred object on the page, which is what makes it read as a head
            rather than as the first line of the block.

            Centring is safe to do geometrically here because the asset is
            alpha-trimmed and its glyph extents are symmetric — ink spans
            x=2..1023 of 1026, midpoint 512.5 against a frame centre of 513.0.
            The ink *mass* is left-heavy (59.9/40.1, centroid 6.68% left of
            centre) because the V is the tallest, heaviest stroke, but for a word
            the eye tracks extents, not density. Correcting to the centroid would
            visibly shove it right. */}
        <h1
          className="home-rise m-0 mb-10 flex justify-center md:mb-11"
          style={{ ["--i" as string]: 0 }}
        >
          <VavvaMark className="h-auto w-[136px] md:w-[152px]" />
        </h1>

        <header className="text-[15px] font-medium leading-[1.4] tracking-[-0.015em]">
          <p
            className="home-rise m-0 text-black/90"
            style={{ ["--i" as string]: 1 }}
          >
            {/* The cities carry the accent, and they are not links. Sending a
                visitor to a Wikipedia article about Los Angeles is a leak off a
                one-page site, and a red link would have collided twice over:
                .bio-link resolves its hover to #000, so a red link would have
                *darkened* on hover, and .social-link already answers in red. */}
            Casa Vavva is a creative studio in{" "}
            <span className="place">Los Angeles</span> &amp;{" "}
            <span className="place">New York City</span>. Work in progress.
          </p>

          <p
            className="home-rise mt-6 mb-0 text-[color:var(--mute)]"
            style={{ ["--i" as string]: 2 }}
          >
            Vavva{" "}
            <span className="ipa" lang="el">
              [vaˈvˌvːa]
            </span>
            ; evokes a sense of beauty, peace, and abundance according to ancient
            Greek philosophy.
          </p>
        </header>

        {/* mt-6, not mt-9. The CTA is an inline-flex with a 2.75rem tap-target
            floor, so its 21px line box centres inside a 44px box and donates
            ~11.5px of invisible padding above the glyphs. At mt-9 the gap
            measured 36px and read as 47px. */}
        <footer
          className="home-rise mt-6"
          style={{ ["--i" as string]: 3 }}
        >
          <AccessGate />
        </footer>
      </div>

      <div className="dia-stage" aria-hidden>
        <DiaGradient reveal="mount" />
      </div>
    </main>
  );
}
