/* The ledger line — the site's one constant.
   ===========================================================================

   `MERCER ST · SOHO · NEW YORK · FALL 2026`

   It appears in exactly two places and is the same component in both: over
   the artwork on the landing, and under the wordmark at the top of every
   interior page. That repetition IS the design system. The landing is a
   full-bleed plate and the interiors are gridded paper — two different
   grounds on purpose — and what makes them one site is that the same chrome
   sits on both at the same size with the same spacing.

   The pattern is Aimé Leon Dore's: a small centred wordmark over full-bleed
   media with the city and the current time printed beneath it. It is the one
   borrow in the new system, taken at the level of MECHANISM rather than
   measurement (DESIGN.md anti-pattern #1 forbids the other kind), and it
   passes the arbitration test — it states a place and a date.

   WHY THE DATE IS RED AND NOTHING ELSE IS: red is reserved for what does not
   exist yet. The street, the neighbourhood and the city are facts today;
   fall 2026 is not one yet. Splitting the line on that boundary is the whole
   colour system stated in a single row of 11px type. */

const PLACE = ["Mercer St", "SoHo", "New York"];
const WHEN = "Fall 2026";

/* U+00B7 with hair spaces either side. A bullet with normal spaces reads as
   a list separator; this reads as one continuous address, which is what a
   ledger line is. */
const SEP = " · ";

export function LedgerLine({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <p className={`vv-ledger ${className}`} style={style}>
      {PLACE.join(SEP)}
      {SEP}
      <span className="vv-ledger-red">{WHEN}</span>
    </p>
  );
}
