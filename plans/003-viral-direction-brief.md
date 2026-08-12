# Plan 003: Business brief for AI agents — pushing the visual direction toward "viral"

Written 2026-08-12. Purpose: a portable, self-contained brief you can paste
into any AI agent (Claude, ChatGPT, Cursor) with zero prior context, so it
can generate on-brief ChatGPT image-gen prompts or design work without
re-deriving everything from scratch. Reference: https://internetlabs.co/,
studied 2026-08-12 as a visual/tonal model for "viral consumer product."

## The business, compressed

Casa Vavva is a New York consumer product studio. Its first real product is
House PB&J — a protein-forward remake of the Uncrustable, a real peanut
butter and jelly sandwich (target ~20g protein / ~200 cal, unconfirmed —
formulation isn't solved yet). Thesis: take foods people already love and
rebuild them with real nutrition, instead of inventing another protein bar
or supplement. Founder framing: "a product I can stand behind for the rest
of my life."

Status as of this writing: pre-launch. No real recipe yet, no NYC food
permit clearance, placeholder $9 price. Two real product photos exist
(AI-generated mockups, kraft-paper packaging + cross-section), documented in
plan 002. The live site (vavva.xyz) currently runs a restrained, minimal,
editorial aesthetic — one paper-grey background, one red accent color, no
chrome, no second accent — documented exhaustively in `DESIGN.md`.

**The open problem, as of 2026-08-12: the founder thinks the current site
isn't "viral enough."** This brief exists to give an agent enough context to
help push the visual direction louder without losing the product's honesty
(real photography, no overclaimed macros, no fake urgency).

## Reference: internetlabs.co — what it actually does differently

"Internet" is a company that builds consumer product companies — their own
tagline: "We build beautiful, viral consumer software and products... with
the aim of influencing culture." Portfolio spans digital (paws — pet health
app, golf — minigolf in iMessage, plant — gamified self-care, Tolan — AI
companion) and physical/CPG (bodega — mushroom gummies, expensive — $200
water as a luxury-goods stunt, CHIP — spicy chicken chips).

Visual/tonal patterns observed directly on their site:
- **Bold, saturated, single-color card backgrounds per product** — e.g. the
  "bodega" wellness product sits on a flat, fully-saturated green card, not
  a neutral/paper background.
- **Playful infographic/diagram overlays on the product itself** — bodega's
  card shows a radial diagram (Mental Clarity / Stress / Bloating / Mood)
  wrapped around the product, turning a photo into a mini-explainer at a
  glance.
- **High-fashion lifestyle photography mixed with product cards** — not
  every card is a product shot; some are styled human/fashion photography
  that sets a mood rather than showing the SKU.
- **Cheeky, culturally self-aware product concepts and copy** — "$200
  water" as a knowing stunt, plain lowercase product names, short punchy
  taglines ("your pet, wrapped," "minigolf in imessage").
- **Card-grid, feed-like layout** — browsing their portfolio feels like
  scrolling a feed of distinct visual worlds, one per product, rather than
  one unified quiet system.

This is the near-opposite of Casa Vavva's current approach: one muted
system vs. many saturated worlds; restraint vs. a wink; "let the work speak
quietly" vs. "make every card stop the scroll."

## Direction: what to actually change, and what to protect

**Change:** background/color treatment (bold, saturated, one strong color
per shot instead of paper-grey), composition energy (dynamic angle, a hook
element — a stat, a bite, a hand — instead of a flat top-down still life),
willingness to add a graphic/typographic overlay instead of leaving the
photo untouched.

**Protect:** the product still has to look real, not like a supplement ad
(see plan 002's central R&D tension — the whole point of this product is
"a real sandwich," not a fitness product). No fabricated urgency, no fake
review stars, no macro numbers presented as confirmed fact while the recipe
is still unsolved.

## Ready-to-use ChatGPT image-gen prompts

**Bold color-block hero (the "stop the scroll" version):**
> Product photography of a wrapped sandwich, shot at a slight 3/4 angle (not flat overhead), on a fully saturated solid color background — deep orange-red (#D9481F) or bold mustard-yellow, no gradient, no texture. The sandwich is wrapped in plain kraft paper tied with a single strand of thread in a contrasting color. Hard, slightly graphic studio lighting — a visible but clean shadow beneath the object, not shadowless. One small bold graphic badge/sticker element in the corner of the frame (a simple circular callout, like a price tag or a stat badge — leave it blank/plain, no text baked in). Confident, high-contrast, editorial-meets-advertising energy — closer to a DTC ad campaign than a museum object photo. Centered subject, some negative space, no logo, no text baked into the image.

**Bite/lifestyle hook shot (the "feels shareable" version):**
> Candid, slightly imperfect product photography: a hand holding half of a peanut butter and jelly sandwich mid-bite, cross-section visible, shot close and slightly from above like a phone photo, not a studio setup. Background is a bold saturated solid color (not neutral), out of focus. Natural but punchy lighting, slight warmth. Should feel like a real person's photo that could go viral, not a polished ad — a little raw, a little fun, energetic framing, not centered/symmetrical. No text, no logo, no visible brand.

**Stat/hook graphic version (explainer-card style, like bodega's diagram):**
> Flat-lay product photography of a wrapped sandwich, centered on a bold solid-color background (pick one saturated color, not neutral). Around the product, leave clean open space at the top and bottom of the frame for a graphic overlay to be added afterward (a short stat callout and a one-line hook, added in post — do not render any text yourself). Lighting is even and graphic, slight shadow for depth, not shadowless. The composition should read like a single explainer card in a scrollable feed — confident, a little playful, not precious.

Note: none of these ask the model to render text — text/stat overlays go on
top afterward in an image editor or code, same as `internetlabs.co`'s
bodega card does its diagram as an overlay, not as part of the photo. Baking
text into an AI-generated image usually looks wrong up close.

## Out of scope for this brief

Actually implementing a new visual direction in the `vavva` codebase,
regenerating the two existing product photos, or deciding whether "viral"
is the right register for this specific product's stage (permit/recipe
still unresolved, per plan 002) — this document informs that conversation,
it doesn't settle it.
