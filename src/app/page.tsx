import { BlurGlowMark } from "@/components/blur-glow/BlurGlowMark";
import { DiaGradient } from "@/components/dia/DiaGradient";

const INSTAGRAM = "https://www.instagram.com/casavavva/";
const NYC = "https://en.wikipedia.org/wiki/New_York_City";

export default function HomePage() {
  return (
    <main className="relative flex min-h-dvh w-full flex-col bg-[#E8E8E8] antialiased">
      {/* Top-anchored like dhilan.fyi: ~2.875rem mobile / ~5.875rem desktop */}
      <div className="relative z-10 mx-auto flex w-full max-w-[360px] flex-1 flex-col px-1 pb-28 pt-[2.875rem] md:pt-[5.875rem]">
        <div
          className="home-rise -mx-1 mb-6 h-[132px] w-[calc(100%+0.5rem)] md:h-[148px]"
          style={{ ["--i" as string]: 0 }}
        >
          <BlurGlowMark className="h-full w-full" />
        </div>

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
            className="home-rise mt-6 mb-0 text-black/45"
            style={{ ["--i" as string]: 2 }}
          >
            Vavva{" "}
            <span className="ipa" lang="el">
              [vaˈvˌvːa]
            </span>
            ; evokes a sense of beauty, peace, and abundance according to
            ancient Greek philosophy.
          </p>
        </header>

        <footer
          className="home-rise mt-9"
          style={{ ["--i" as string]: 3 }}
        >
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            follow us
          </a>
        </footer>
      </div>

      <div
        className="dia-stage pointer-events-none fixed inset-x-0 z-0"
        aria-hidden
      >
        <DiaGradient reveal="mount" />
      </div>
    </main>
  );
}
