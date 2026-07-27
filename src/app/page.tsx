import { VavvaMark } from "@/components/brand/VavvaMark";
import { DiaGradient } from "@/components/dia/DiaGradient";
import { AccessGate } from "@/components/gate/AccessGate";

const NYC = "https://en.wikipedia.org/wiki/New_York_City";

export default function HomePage() {
  return (
    <main className="relative flex min-h-dvh w-full flex-col bg-[#E8E8E8] antialiased">
      {/* Top-anchored: 3.25rem mobile / 6rem desktop.

          The measure is 336px, and that number is measured, not chosen. The
          first paragraph sets two full lines at 336 (327px and 336px — an 8.6px
          spread, so it reads as a solid block) and three ragged ones at 335
          (264 / 255 / 139, a 73px notch where "based" fell to line two). The
          threshold is that sharp. Anything in 336–360 holds the two-line set;
          past ~364 it re-breaks to a long line over a stub.

          px-4 below md so a 375px phone still clears 336 (375 − 32 = 343);
          px-5 above, where max-w caps the column and 376 − 40 lands on 336. */}
      <div className="relative z-10 mx-auto flex w-full max-w-[376px] flex-1 flex-col px-4 pb-28 pt-13 md:px-5 md:pt-24">
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
            Casa Vavva is a private members club based in{" "}
            <a
              href={NYC}
              target="_blank"
              rel="noopener noreferrer"
              className="bio-link"
            >
              New York City
            </a>
            . You must be{" "}
            <span className="caution">21 or under</span> to enter.
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
