---
name: clone-structure
description: Structural-reference redesign of the Vavva site against mimis.nyc — extracts layout topology, spacing/type scale, component structure, and interaction models ONLY. Never copies verbatim copy text, photos, video, or brand marks from the reference site. Use when the user wants to rebuild Vavva's page architecture "like mimis.nyc" without cloning their actual content or brand.
argument-hint: "[reference-url, defaults to https://mimis.nyc/]"
user-invocable: true
---

# Clone Structure (Vavva x mimis.nyc reference)

You are rebuilding Vavva's site architecture using **mimis.nyc** as a structural reference: page topology, layout grid, spacing/type scale, component inventory, and interaction models. This is derived from `JCodesMore/ai-website-cloner-template`'s `/clone-website` pipeline, with the scope deliberately narrowed.

## Hard constraints (read first, non-negotiable)

This is NOT a pixel-perfect content clone. It is a **structure-only** reference build:

- **No verbatim copy.** Never write mimis.nyc's actual marketing text, taglines, product names, or body copy into any file, spec, or component. Describe structure ("hero headline + subhead + CTA cluster, 3 buttons") not content.
- **No downloaded assets from mimis.nyc.** Do not save their photos, videos, logo, wordmark, or icons to `public/` or anywhere in this repo. Reference them only by description ("full-bleed hero photo, warm color grade") in spec files.
- **No literal brand colors/fonts from mimis.nyc.** Note their color *roles* (e.g., "one accent used on all primary buttons") not their hex values. Vavva's palette is fixed — see below.
- **Vavva's existing brand system is authoritative for all content and asset decisions:**
  - Brush wordmark: `src/assets/vavva-mark.png` (`src/components/brand/VavvaMark.tsx`) — the only logo, never re-drawn or replaced
  - Palette: `--paper #E8E8E8`, `--ink rgba(0,0,0,.90)`, `--mute rgba(0,0,0,.45)`, `--red #B32622` (one accent, sampled from the mark) — no new brand colors
  - Type: Inter
  - Aurora: `src/components/dia/DiaGradient.tsx` — existing signature motion element, keep or deliberately retire, don't ignore
  - Full existing rules: `DESIGN.md` at repo root
- **This is a scope pivot from the current one-pager**, which explicitly bans nav/cards/chrome (see `DESIGN.md` → Anti-patterns). Building nav, multi-page routing, and card grids per this skill is an intentional, user-approved supersession of those specific rules for this test branch — not a license to ignore the rest of `DESIGN.md` (measure discipline, one accent color, motion restraint, etc. still apply).
- **Everything happens on the current test branch.** Never merge to `main` or touch deploy config as part of this skill.
- If at any point you're unsure whether something counts as "content" (copyable) vs. "structure" (referenceable), treat it as content and don't copy it.

## Scope

- **In scope:** page topology (which page types exist: home, locations, shop, story, gift card, contact), nav pattern, hero layout, CTA cluster pattern, footer pattern, card/grid systems, spacing rhythm, type scale, responsive breakpoints, scroll/hover/interaction models.
- **Out of scope:** their copy, their imagery, their product catalog, their exact color values, their logo, checkout/payment flows, backend/CMS integration.
- **Customization:** total. Every piece of content and every asset in the rebuilt site is Vavva's own (new copy to be drafted collaboratively, existing brand assets reused, placeholder imagery where new photography would be needed).

## Pre-Flight

1. Confirm on test branch: `git branch --show-current` must NOT be `main`.
2. Browser automation required (Chrome MCP). If unavailable, stop and ask.
3. Verify `npm run build` passes on the current baseline before starting.
4. Create `docs/research/mimis-nyc/` and `docs/design-references/` if missing (already scaffolded).

## Phase 1: Structural Reconnaissance

Navigate to the reference URL (default `https://mimis.nyc/`) with browser MCP. For each distinct page/section:

- **Page topology** — list page types and how they're reached (nav links, footer links). Save to `docs/research/mimis-nyc/PAGE_TOPOLOGY.md` — structure only, e.g. "Home: hero (full-bleed image + headline + 4-button CTA cluster) → secondary section (2-col: text block + image) → footer (nav repeat + locations + social)."
- **Layout grid** — max-widths, column counts, gutter/gap values via `getComputedStyle()`.
- **Type scale** — heading/body/label sizes, weights, line-heights (values only, not which words they're applied to).
- **Spacing scale** — the padding/margin rhythm (e.g. "8/16/24/40/64px scale").
- **Component inventory** — nav bar, hero, CTA button cluster, card grid, footer: structure and variant count only. Save to `docs/research/mimis-nyc/COMPONENT_INVENTORY.md`.
- **Interaction models** — per the upstream methodology: scroll vs. click vs. hover driven, exact triggers and transition timing (timing/easing values are not copyrightable content — fine to capture exactly).
- Take screenshots for your own layout reference during this session; do not commit them to `docs/design-references/` if they'd let mimis.nyc's actual imagery/copy leak into the repo. Describe what you saw in the markdown instead, or crop/redact before saving if a screenshot is kept.

## Phase 2: Spec Files (structure-only template)

For each page/section, write `docs/research/mimis-nyc/components/<name>.spec.md` using the structure template from `docs/research/INSPECTION_GUIDE.md`, filled with **measurements and structure only** — every "content" field says `[VAVVA COPY TBD]` or `[VAVVA ASSET TBD]` rather than mimi's actual values.

## Phase 3: Build Against Vavva's System

Rebuild each section in `src/components/` using:
- The structural spec (layout, spacing, type scale, interaction model)
- Vavva's actual palette/type/logo from `DESIGN.md`
- Placeholder or `[VAVVA COPY TBD]` markers for content that needs D's input — do not invent brand copy wholesale without flagging it as a draft

Dispatch focused builder agents per section as the upstream skill describes (small tasks, one component at a time), each verifying `npx tsc --noEmit`.

## Phase 4: Assembly & Report

Wire sections into routed pages. Run `npm run build`. Report:
- Page types built, mapped to their mimis.nyc structural counterpart
- Every place a `[VAVVA COPY TBD]` or `[VAVVA ASSET TBD]` marker remains — this is the punch list for D
- Confirmation that no mimis.nyc copy, imagery, or brand assets were copied into the repo (spot-check `public/` and `src/assets/` diffs against the pre-existing baseline)
- Explicit note that `DESIGN.md`'s Anti-patterns section now conflicts with the built structure and needs a rewrite pass before this ships past the test branch
