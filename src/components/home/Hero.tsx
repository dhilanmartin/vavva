// Simplified 2026-08-06, by the owner: an "in between" of the original
// one-pager and this structural rebuild, specifically for the home hero.
// The two-video-block pattern (see git history on this branch for that
// version) is retired for now — there's no real photography/video yet, and
// a gray placeholder standing in for it read as unfinished rather than
// intentional. This reuses Vavva's own pre-existing copy (the original
// one-pager's statement + etymology gloss) and the real AccessGate
// mechanism — not a placeholder CTA — so the page stays honest about being
// early while remaining genuinely functional and pushable.

import { AccessGate } from "@/components/gate/AccessGate";

export function Hero() {
  return (
    <section className="px-4 py-20 md:px-5 tablet:px-6 tablet:py-28 desktop:py-32">
      <div className="mx-auto flex max-w-[432px] flex-col gap-6">
        <p className="font-serif text-[22px] font-normal leading-[1.4] tracking-[-0.01em] text-[var(--ink)] desktop:text-[26px]">
          Casa Vavva is a creative studio based in New York City.
        </p>
        <p className="text-[15px] font-medium leading-[1.4] tracking-[-0.015em] text-[var(--mute)]">
          Vavva [vaˈvˌvːa]; evokes a sense of beauty, peace, and abundance
          according to ancient Greek philosophy.
        </p>
        <p className="text-[15px] font-medium leading-[1.4] tracking-[-0.015em] text-[var(--mute)]">
          The full site is on its way.
        </p>
        <AccessGate />
      </div>
    </section>
  );
}
