import { VavvaMark } from "@/components/brand/VavvaMark";
import { DiaGradient } from "@/components/dia/DiaGradient";
import { AccessGate } from "@/components/gate/AccessGate";

export default function HomePage() {
  return (
    <main className="relative flex min-h-dvh w-full flex-col bg-[#E8E8E8] antialiased">
      {/* Top-anchored: 3.25rem mobile / 6rem desktop / 9rem on a tall frame.

          The measure is 216px, and that number is measured, not chosen. It is
          fitted to the sentence rather than the other way round: the copy sets
          two lines at 216 (169px and 214px — 89% of the column inked) and the
          etymology sets four (178 / 196 / 169 / 181, 85%).

          216 looks aggressively narrow written down, and it is not. The whole
          sentence is 386px set on one line, and `text-wrap: balance` in
          globals.css splits it into the same two lines — 169 and 214 — at every
          width from 240 all the way to 360. So the column was not choosing
          between two-lines-narrow and one-line-wide; above 240 it was choosing
          between those same two lines and an ever-growing strip of bare paper
          to their right. At the previous 308 that strip put the fill at 62%.
          Half the measure was doing nothing but pushing the block off centre.

          The alternative worth knowing about: a measure of 390+ sets the copy
          on one line (386px, 97%) and the etymology on two (378 / 353, 96%),
          which is the best composition this sentence can make — but a 375px
          phone only clears 343, so mobile would fall back to the 169/214 pair
          inside a column half again too wide for it. The narrow measure is the
          one that holds at both ends.

          max-w is the measure plus the padding, so both breakpoints land on
          216: 248 − 32 below md, 256 − 40 above. The column is wider than the
          mark it sits under (136/152), which is the proportion that matters.

          The third padding step is keyed to viewport *height*, not width. The
          aurora is 44dvh, so the paper the column actually sits on is the top
          56% of the frame, and the block is ~332px tall on desktop. Optical
          centring in that band wants (0.56H − 332) / 2 of top padding: 86px at
          900 tall, near enough to the 96 that md:pt-24 already gives, and 136px
          at 1080, where the block was riding high over a dead stripe of paper.
          9rem covers the tall case without touching any other viewport.
          Deliberately a static breakpoint rather than a dvh calc — dvh
          arithmetic here is what produced the iOS seam this page has already
          been through once. */}
      <div className="relative z-10 mx-auto flex w-full max-w-[248px] flex-1 flex-col px-4 pb-28 pt-13 md:max-w-[256px] md:px-5 md:pt-24 [@media(min-height:1000px)]:md:pt-36">
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
            {/* The city carries the accent, and it is not a link. Sending a
                visitor to a Wikipedia article about New York is a leak off a
                one-page site, and a red link would have collided twice over:
                .bio-link resolved its hover to #000, so a red link would have
                *darkened* on hover, and .social-link already answers in red. */}
            Casa Vavva is a creative studio based in{" "}
            <span className="place">New York City</span>.
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
