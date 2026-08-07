// story-page.spec.md: centred single column — one bold lead sentence
// immediately followed, same block, by one regular-weight paragraph, both
// serif. Rendered as the page's <h1> + lead paragraph: the reference site's
// own page-structure breakdown doesn't list a separate title heading ahead
// of this block on the Story page, so this doubles as both rather than
// inventing an extra heading the spec didn't document.

export function LeadBlock() {
  return (
    <div className="mx-auto max-w-[640px] px-4 text-center md:px-5">
      <h1 className="font-serif text-[22px] font-semibold leading-[1.5] tracking-[-0.01em] text-[var(--ink)] desktop:text-[26px]">
        Casa Vavva began as an idea before it was a room.
      </h1>
      <p className="font-serif text-[22px] font-normal leading-[1.5] tracking-[-0.01em] text-[var(--ink)] desktop:text-[26px]">
        We build for people who want fewer, better things — spaces, objects,
        and work that hold up under attention.
      </p>
    </div>
  );
}
