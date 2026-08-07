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

const MILESTONES = [
  {
    label: "Origin",
    caption: "Vavva starts as a question: what would a studio feel like if it slowed down.",
  },
  {
    label: "First room",
    caption: "The first space is small, deliberately — enough to prove the idea, not perform it.",
  },
  {
    label: "The mark",
    caption: "The brush wordmark is drawn by hand, once, and never redrawn.",
  },
  {
    label: "First work",
    caption: "Early projects are chosen for fit, not scale — the right room over the big one.",
  },
  {
    label: "The gate",
    caption: "Access opens slowly, by invitation, before it opens to everyone.",
  },
  {
    label: "Today",
    caption: "Vavva works with a small circle of clients and collaborators in New York.",
  },
  {
    label: "Next",
    caption: "What comes after this page is still being decided — on purpose.",
  },
];

export function Timeline() {
  return (
    <div className="mx-auto max-w-[720px] px-4 md:px-5">
      <ol className="relative flex flex-col gap-8 border-l border-black/15 pl-6 tablet:gap-10">
        {MILESTONES.map((milestone, i) => (
          <li key={milestone.label} className="relative">
            <span
              aria-hidden
              className={`absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-[var(--paper)] ${
                i === 0 ? "bg-[var(--red)]" : "bg-black/30"
              }`}
            />
            <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--mute)]">
              {milestone.label}
            </span>
            <p
              className={`mt-1 font-serif text-[15px] leading-[1.5] ${
                i === 0 ? "font-semibold text-[var(--ink)]" : "text-[var(--mute)]"
              }`}
            >
              {milestone.caption}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
