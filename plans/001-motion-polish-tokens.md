# Plan 001: motion polish — hover gating + shared easing token

Stamped at commit `36f8538` on branch `test/mimi-structure-clone`.

## Scope

Two LOW/MEDIUM findings from the improve-animations audit, both mechanical:

1. Gate `hover:` states behind `@media (hover: hover) and (pointer: fine)` so touch taps don't leave a stuck hover state.
2. Add a shared `--ease-out` token and use it on the site's highest-frequency press-feedback interactions instead of Tailwind's default (weaker) easing.

## Step 1 — add the token

In `src/app/globals.css`, in the `:root` block alongside `--paper`/`--ink`/`--mute`/`--red`/`--red-rgb`, add:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
```

## Step 2 — apply the token to press feedback

These four files currently use bare `transition-transform` (Tailwind default easing) on their press-feedback button:

- `src/components/home/CtaTileRow.tsx:28`
- `src/components/home/Newsletter.tsx:43`
- `src/components/home/FeatureBlock.tsx:36`
- `src/components/gift-card/GiftCardForm.tsx:71`

Change `transition-transform` to `transition-transform ease-[var(--ease-out)]` in each (Tailwind arbitrary-value syntax; keep everything else on the className unchanged).

`src/components/nav/Nav.tsx:53` and `:58` (hamburger lines) currently use `transition-transform duration-300 ease-out` — change `ease-out` to `ease-[var(--ease-out)]`, keep `duration-300`.

`src/components/gift-card/SegmentedTabs.tsx:26` and `src/components/gift-card/AmountPillSelector.tsx:22` already use explicit `transition-[transform,...]` lists (fixed in an earlier /review pass) — leave the property list as-is, just confirm no easing override is needed there (Tailwind's transition-property utilities default to the same weak curve unless overridden; for consistency add `ease-[var(--ease-out)]` to both here too).

## Step 3 — gate hover states

`src/components/footer/Footer.tsx:49`:
```
className="text-[13px] font-medium uppercase tracking-[0.04em] text-[var(--mute)] transition-colors hover:text-[var(--ink)]"
```
Tailwind doesn't have a built-in `hover-hover:` variant out of the box in this v4 setup — simplest fix without a config change: wrap the hover rule in the media query directly in `globals.css` instead of a Tailwind utility. Add to `globals.css`:

```css
@media (hover: hover) and (pointer: fine) {
  .footer-link:hover {
    color: var(--ink);
  }
}
```

Then in `Footer.tsx`, replace `hover:text-[var(--ink)]` with a `footer-link` class addition: `className="footer-link text-[13px] font-medium uppercase tracking-[0.04em] text-[var(--mute)] transition-colors"`.

`src/components/nav/Nav.tsx:32` (`navLinkClass` function, the `hover:underline` branch): same pattern — add to `globals.css`:

```css
@media (hover: hover) and (pointer: fine) {
  .nav-link:hover {
    text-decoration-line: underline;
  }
}
```

Add `nav-link` to the className returned by `navLinkClass`, and change the ternary from `"no-underline hover:underline"` to `"nav-link no-underline"`.

## Verification

1. `npx tsc --noEmit` and `npm run build` both pass clean.
2. Visually: press any pill/tile/button — feel should be unchanged (same duration, same scale), just a slightly snappier-feeling curve. Feel-check by eye at normal speed; the difference is subtle by design (Tailwind's default vs. Emil's recommended curve are both ease-out family, this is a refinement not a rewrite).
3. On a touch device or Chrome DevTools mobile emulation with touch enabled: tap a footer link, then tap elsewhere — confirm the link does NOT stay highlighted in `--ink` color after the tap (it should return to `--mute` immediately, since hover never actually applied on a touch device with this gate in place).
4. Confirm `prefers-reduced-motion` handling in globals.css is untouched — this plan doesn't touch that block.

## Out of scope

Do not touch the `GiftCardForm.tsx` recipient-fields teleport (separate missed-opportunity item, not part of this plan — would need a height-transition approach, more involved). Do not touch `DiaGradient.tsx` — its `scaleY(0)` entrance is a confirmed deliberate exception, not a bug.
