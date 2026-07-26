import { BlurGlowMark } from "@/components/blur-glow/BlurGlowMark";
import { VavvaMark } from "@/components/brand/VavvaMark";
import { DiaGradient } from "@/components/dia/DiaGradient";
import { AccessGate } from "@/components/gate/AccessGate";

const NYC = "https://en.wikipedia.org/wiki/New_York_City";

export default function HomePage() {
  return (
    <main className="relative flex min-h-dvh w-full flex-col bg-[#E8E8E8] antialiased">
      {/* Top-anchored like dhilan.fyi: ~2.875rem mobile / ~5.875rem desktop */}
      <div className="relative z-10 mx-auto flex w-full max-w-[368px] flex-1 flex-col px-5 pb-28 pt-13 md:px-1 md:pt-24">
        {/* The house logo: centred, and the only VAVVA on the page at brand
            scale. Everything else that says the name is subordinate to it.
            It is an h1 because it is the page's title — the mark carries the
            name, so without this the document has no heading at all. */}
        <h1
          className="home-rise m-0 mb-8 flex justify-center md:mb-9"
          style={{ ["--i" as string]: 0 }}
        >
          <VavvaMark className="h-auto w-[136px] md:w-[152px]" />
        </h1>

        <header className="text-[15px] font-medium leading-[1.4] tracking-[-0.015em]">
          <p
            className="home-rise m-0 text-black/90"
            style={{ ["--i" as string]: 1 }}
          >
            A private house in{" "}
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
            ; beauty, peace, and abundance — ancient Greek.
          </p>
        </header>

        <footer
          className="home-rise mt-9"
          style={{ ["--i" as string]: 3 }}
        >
          <AccessGate />
        </footer>
      </div>

      {/* Not a logo — a trademark stamp in the light. Kept subordinate to the
          brush mark by scaling the whole stage down: the bloom's energy budget
          is tied to the word/canvas ratio, so shrinking the word alone bleeds
          it out to a ghost. Miniaturise both together. */}
      <div className="glow-stage" aria-hidden>
        <BlurGlowMark className="h-full w-full" />
      </div>

      <div className="dia-stage" aria-hidden>
        <DiaGradient reveal="mount" />
      </div>
    </main>
  );
}
