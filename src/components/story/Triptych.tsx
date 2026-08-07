// COMPONENT_INVENTORY.md §13: 3 equal-width images side by side, no
// gap-caption, no text overlay. Reused twice on the Story page — same
// component, different placeholder content each time (the parent controls
// nothing content-specific, so re-using it twice is literally the same
// call).

import { AssetPlaceholder } from "@/components/placeholder/AssetPlaceholder";

export function Triptych() {
  return (
    <div className="grid grid-cols-1 gap-3 tablet:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <AssetPlaceholder key={i} tone="light" className="aspect-[4/5] w-full" />
      ))}
    </div>
  );
}
