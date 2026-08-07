// story-page.spec.md: centred single column — one bold lead sentence
// immediately followed, same block, by one regular-weight paragraph, both
// serif. Rendered as the page's <h1> + lead paragraph: the reference site's
// own page-structure breakdown doesn't list a separate title heading ahead
// of this block on the Story page, so this doubles as both rather than
// inventing an extra heading the spec didn't document.
//
// Heading resized 2026-08-07 to match a measured structural fact from
// mimis.nyc/story's own lead heading — 48px/400/leading-56px(≈1.17)/
// tracking--0.96px(≈-0.02em) — the same computed-CSS-only extraction
// method used for every other structural fact on this branch. The words
// are still Vavva's own; only the size/weight/leading/tracking match.

export function LeadBlock() {
  return (
    <div className="mx-auto max-w-[640px] px-4 text-center md:px-5">
      <h1 className="font-serif text-[36px] font-normal leading-[1.17] tracking-[-0.02em] text-[var(--ink)] desktop:text-[48px]">
        The Vavva Story
      </h1>
      <p className="mt-6 font-serif text-[18px] leading-[1.6] text-[var(--mute)]">
        It started with a mark, drawn once by hand, and a question: what
        would a studio feel like if it slowed down. Everything since has
        been in service of that same idea — fewer things, made with more
        care.
      </p>
    </div>
  );
}
