// COMPONENT_INVENTORY.md §13: 3 equal-width images side by side, no
// gap-caption, no text overlay.
//
// ---- 2026-08-18: solid colour instead of grey ---------------------------
//
// D: "on the about page fill placeholders with solid colors for life."
//
// These are still PLACEHOLDERS and still say so — the label stays. What
// changed is that three identical system-grey rectangles gave the page
// nothing, and the Story page is otherwise two paragraphs and a line
// drawing. Colour is the cheapest thing that makes the section read as a
// composition while the real photography does not exist.
//
// THE THREE COLOURS ARE THE STUDIO'S OWN, not decoration picked to look
// nice. They are the House PB&J wrappers — gold, red, violet — which is the
// only place this site already prints more than one colour
// (src/assets/house-pbj-trio.png). Sampled off the packshot, then set at
// full chroma: an average across foil reads muted because half of every
// wrapper is in shadow, and a flat panel has no shadow to average.
//
// The middle one is `--red` itself rather than a sampled near-match, so the
// house accent stays one value in one place.
//
// `tone` per panel, not derived: it sets the LABEL's contrast, and the three
// backgrounds do not agree about what a legible label is. Measured against
// each fill — white on the gold is 3.0:1 and FAILS, black on it is 7.0:1;
// white on the red is 6.53:1 and on the violet 11.1:1. So the gold takes a
// dark label and the other two take light ones.

import { AssetPlaceholder } from "@/components/placeholder/AssetPlaceholder";

const PANELS = [
  { fill: "#c8862a", tone: "light" as const },
  { fill: "var(--red)", tone: "dark" as const },
  { fill: "#4b2a73", tone: "dark" as const },
];

export function Triptych() {
  return (
    <div className="grid grid-cols-1 gap-3 tablet:grid-cols-3">
      {PANELS.map((panel) => (
        <AssetPlaceholder
          key={panel.fill}
          tone={panel.tone}
          fill={panel.fill}
          className="aspect-[4/5] w-full"
        />
      ))}
    </div>
  );
}
