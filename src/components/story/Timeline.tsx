// curved-timeline.spec.md: DEFERRED. The reference component is an
// SVG/CSS arc of date ticks with click-driven recentring — flagged by
// recon as the single most novel, most expensive pattern on the reference
// site, with an explicit recommendation to treat it as optional.
//
// This ships a static vertical rail instead, carrying the same content
// structure (date + icon-equivalent marker + caption per milestone) without
// the arc math or the click-to-recentre state machine. All captions render
// inline rather than being gated behind a click-driven "active" state,
// since building that gate without the arc it was designed for would just
// be a worse version of the same interaction. The full interactive
// curved/click-driven version is a deferred follow-up, not shipped here —
// see the build report.

const MILESTONES = [1, 2, 3, 4, 5, 6, 7];

export function Timeline() {
  return (
    <div className="mx-auto max-w-[720px] px-4 md:px-5">
      <ol className="relative flex flex-col gap-8 border-l border-black/15 pl-6 tablet:gap-10">
        {MILESTONES.map((id, i) => (
          <li key={id} className="relative">
            <span
              aria-hidden
              className={`absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-[var(--paper)] ${
                i === 0 ? "bg-[var(--red)]" : "bg-black/30"
              }`}
            />
            <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--mute)]">
              [VAVVA COPY TBD]
            </span>
            <p
              className={`mt-1 text-[15px] leading-[1.5] ${
                i === 0 ? "font-semibold text-[var(--ink)]" : "text-[var(--mute)]"
              }`}
            >
              [VAVVA COPY TBD]
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
