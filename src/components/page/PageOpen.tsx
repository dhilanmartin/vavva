/* The opening gesture, shared by every interior route.
   ===========================================================================

     chrome
       80 ↓
     display title        flush left
       16 ↓
     ledger line
       40 ↓
     ─────────────────    full-width hairline
       48 ↓
     content

   Four numbers, four pages, no per-page tuning. This is deliberately a
   component rather than a documented convention: the previous system WAS a
   documented convention, and Locations drifted to a 43px title while
   Products ran 48px because both were separately "faithful" to different
   pages of the same reference site. A component cannot drift.

   The pages are one site because they BEGIN the same way. That is a cheaper
   and more durable unifier than a shared palette, and it is what Kinfolk and
   Dimes both do — you know what site you are on before you have read a word.

   If a page seems to need different spacing here, it needs a different role
   (see .vv-statement), not a different number. */

import { LedgerLine } from "@/components/chrome/LedgerLine";

export function PageOpen({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="vv-page vv-open">
      {/* `home-rise` carries the one entrance transition the system allows —
          opacity + 8px rise, staggered by --i, fired once on route load.
          The stagger runs title -> ledger -> rule so the page assembles in
          reading order rather than all at once. */}
      <h1 className="vv-display home-rise" style={{ ["--i" as string]: 0 }}>
        {title}
      </h1>

      <LedgerLine
        className="vv-open__ledger vv-ledger-mute home-rise"
        style={{ ["--i" as string]: 1 } as React.CSSProperties}
      />

      <div
        className="vv-open__rule home-rise"
        style={{ ["--i" as string]: 2 }}
      />

      {children ? <div className="vv-open__content">{children}</div> : null}
    </div>
  );
}
