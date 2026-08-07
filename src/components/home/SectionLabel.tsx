// COMPONENT_INVENTORY.md §3: single centred line of serif text dividing two
// full-bleed sections. No icon, no button — a divider, not a heading.

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-10 text-center md:px-5 tablet:py-12 desktop:py-16">
      <p className="font-serif text-[20px] font-normal tracking-[-0.01em] text-[var(--ink)] desktop:text-[24px]">
        {children}
      </p>
    </div>
  );
}
