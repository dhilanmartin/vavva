// The reference landing's centrepiece: a tall single-column list of the
// site's own URLs, each row a fixed 52px, divided by hairlines, clipped to a
// fraction of the viewport and faded out at the bottom rather than cut — so
// it reads as a table of contents continuing past the frame. The domain
// prefix is set in a muted serif and only the slug takes full ink, which is
// what makes eleven near-identical strings scan as a list of *subjects*
// instead of a list of links.
//
// Measured 2026-08-07 off index.how (getComputedStyle, desktop 1280):
//   row        flex, height 52px, align-items center
//   divider    1px hairline between rows only, not above the first
//   type       serif 20px / 20px leading / -0.4px tracking
//   prefix     33% black; slug full ink
//   clip       60vh mobile, 50vh ≥768, 60vh ≥1280, bottom mask to transparent
// All of it lives in globals.css under .idx-list / .idx-row / .idx-slug.
//
// These are NOT links. Neither are the reference's — the rows are inert
// (user-select: none is on the list) because the pages behind them don't
// exist yet, which is the whole premise of a waitlist page. Rendering them
// as <a>s pointing nowhere would be the one dishonest element on an
// otherwise honest page.
//
// [VAVVA COPY TBD] — the eleven slugs below are a draft standing in for the
// studio's actual disciplines, written to be true rather than decorative but
// not yet confirmed by D. Swap freely; the count is the only thing the
// layout cares about, and only loosely (the list is clipped anyway, so the
// tail rows exist to be half-visible).

const SLUGS = [
  "identity",
  "art-direction",
  "editorial",
  "motion",
  "sound",
  "spatial",
  "print",
  "film",
  "type",
  "objects",
  "archive",
];

export function SlugList() {
  return (
    <ul className="idx-list" aria-label="What the studio works in">
      {SLUGS.map((slug) => (
        <li key={slug} className="idx-row">
          <span className="idx-slug">
            vavva.xyz/<b>{slug}</b>
          </span>
        </li>
      ))}
    </ul>
  );
}
