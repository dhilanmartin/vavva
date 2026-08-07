// story-page.spec.md: centred column — serif sub-heading → single
// outline-glyph icon → 1–3 body paragraphs, repeated 3×. mimi's actual
// icons (heart / strawberry / two-people) are content tied to their brand
// story, not structure — so this uses plain generic geometric glyphs
// instead of reproducing that specific icon set.

type IconKey = "circle" | "plus" | "triangle";

const ICONS: Record<IconKey, React.ReactNode> = {
  circle: <circle cx="12" cy="12" r="9" />,
  plus: <path d="M12 3v18M3 12h18" strokeLinecap="round" />,
  triangle: <path d="M12 3 21 20H3Z" strokeLinejoin="round" />,
};

export function IconTextBlock({
  icon = "circle",
  title,
  body,
}: {
  icon?: IconKey;
  title: string;
  body: string;
}) {
  return (
    <div className="mx-auto flex max-w-[480px] flex-col items-center gap-4 px-4 text-center md:px-5">
      <h3 className="font-serif text-[22px] font-normal tracking-[-0.01em] text-[var(--ink)]">
        {title}
      </h3>
      <span
        aria-hidden
        className="flex h-10 w-10 items-center justify-center text-[var(--ink)]"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
        >
          {ICONS[icon]}
        </svg>
      </span>
      <p className="font-serif text-[15px] leading-[1.6] text-[var(--mute)]">{body}</p>
    </div>
  );
}
