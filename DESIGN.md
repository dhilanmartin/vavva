# DESIGN.md — Casa Vavva

Updated 2026-07-31.

## Direction

Minimal craft on `#E8E8E8`. The brush wordmark is the only brand object; everything else is light. The Dia aurora rises from the floor on mount and holds the bottom of the frame alone. The city in the house red. One CTA.

**A menu, not a landing page.** The mark is centred; the copy and CTA are ragged-left beneath it. That mismatch is the design, not an oversight — a centred head over a left-set block is how a menu, a title page, or a bill of fare is set, and it is the whole reason the page reads as a house rather than a product. The mark is the only centred object on the page; nothing else may be centred, or the head stops reading as a head.

## Layout

- Canvas: `#E8E8E8`
- Column: `max-w-[248px]` / `md:max-w-[432px]`, `px-4` / `md:px-5` — **216px of measure on a phone, 392px on desktop**. Two measures, on purpose (see below). The phone column never goes fluid, so everything from 320px up renders the identical block
- Top-anchored: `3.25rem` mobile / `6rem` desktop, stepping to `9rem` above 1000px of viewport *height* — the aurora owns the bottom 44dvh, so on a tall frame the block was riding high over a dead stripe of paper
- Mark: centred in the column, `136px` mobile / `152px` desktop — signature scale, never banner scale
- Copy and CTA: ragged-left on the column's left edge

Centring the mark is done geometrically, and that is correct here rather than lazy: the asset is alpha-trimmed and its glyph extents are symmetric — ink spans x=2..1023 of 1026, midpoint 512.5 against a frame centre of 513.0. The ink *mass* is left-heavy (59.9/40.1, centroid 6.68% left of centre) because the V is the tallest and heaviest stroke, but for a word the eye tracks extents, not density; correcting to the centroid would visibly shove the mark right. If the asset is ever re-cut, re-check the extents before trusting `justify-center`.
- Type: Inter · 15px · medium · tracking `-0.015em` · line-height `1.4` · `text-wrap: pretty` — one size for statement and gloss alike; the gloss separates on colour, not scale
- Motion: staggered blur-rise (`intro-js` / `intro-go`), 0.5s, 0.08s stagger

### Vertical scale

| Gap | Mobile | Desktop |
|-----|--------|---------|
| Mark → copy | `40px` | `44px` |
| Paragraph → paragraph | `24px` | `24px` |
| Copy → CTA | `24px` | `24px` |

Two rules behind those numbers.

Mark → copy is ~0.65× the mark's own height (63px / 70.5px). A masthead needs a gap proportional to its mass, not a fixed step, or it reads as either glued on or adrift.

Copy → CTA is `24px` metric but ~`36px` optical. The CTA is an `inline-flex` with a `2.75rem` tap-target floor, so its 21px line box centres inside a 44px box and donates ~11.5px of invisible padding above the glyphs. Anything set here must be read net of that. At `36px` it measured 47px optical and the CTA had visibly drifted off the copy.

### Two measures, and why the old rule went

This file used to require one measure at every width. That rule is gone, knowingly, and it is the only place the page sets a different measure per breakpoint.

| | Measure | Statement | Gloss |
|---|---|---|---|
| Phone | `216px` | 2 lines, 169 / 214 — **89%** inked | 4 lines — 72% |
| Desktop (`md`) | `392px` | **1 line**, 386 — **98%** | 2 lines, 326 / 305 — 80% |

The statement is 386px set on a single line, so 392 is the width at which the whole sentence resolves at once — the strongest setting this copy can make. It is unreachable on a phone: 375px of viewport clears 343, so mobile would fall back to the same 169 / 214 pair inside a column half again too wide for it. Two measures beats one compromise that is second-best at both ends.

What the old rule protected against was real and has happened here: a widening column pulls an accent phrase up onto the previous line and splits it in half. That is why the phrase it guarded was `white-space: nowrap`. `.place` deliberately is not, because it now sits at the **end** of the sentence — at 216 it lands whole on line two, at 392 whole on the single line, verified at both. Nothing else in the copy can straddle a break. Re-check this if the copy ever puts words after the city.

### The gloss

The etymology is `15px / 1.4` — the same as the statement — in `--mute`.

**Size is a fill control here, not a hierarchy control.** The line count is pinned by word boundaries: four lines at the phone measure for anything from 12px to 16px, two lines on desktop from 12px to 15px. Inside a fixed line count, smaller type does not fit more words per line, it draws the same words narrower — so it strands the gloss in the middle of the column and pulls the whole block visibly off centre.

| Size | Phone (216) | Desktop (392) |
|---|---|---|
| 13px | 4 lines — 73% | 2 lines — 81% |
| 14px | 4 lines — 78% | 2 lines — 87% |
| **15px** | 4 lines — **84%** | 2 lines — **93%** |
| 16px | 4 lines — 89% | 3 lines — 66% |
| 17px | 5 lines — 76% | 3 lines — 70% |

16px fills the phone best and is still rejected on two counts: it overflows desktop to three lines at 66%, and it would set the gloss *larger* than the statement it glosses. 15px is the largest size that is neither. At 392 it is also near-perfectly matched to the statement — the gloss's long line measures 378 against the statement's 386.

This was set to 13px on 2026-07-31 and reverted the same day. The 13px version bought real hierarchy and paid for it in fill, and the fill was the thing that showed.

Hierarchy is carried by **colour** instead: `--mute` against the statement's `black/90`, which costs no fill at all. `--mute` contrasts 4.55:1 on the paper, comfortably over the 4.5:1 WCAG asks of text this size.

`.ipa` is the third tier: `font-weight: 400` against the gloss's 500, same size and colour. It previously set `font-weight: 500` and `--mute`, which is exactly what the gloss already inherits — the rule styled nothing. Weight is the only lever left that separates a parenthetical from its sentence without a fourth size or a second grey.

The span carries **no `lang` attribute**, and should not get one back. It used to say `lang="el"`, which was wrong: the brackets hold IPA — Latin letters plus the modifiers `ˈ ˌ ː` — not Greek script. That attribute asked assistive tech to switch to a Greek voice and apply Greek pronunciation to characters Greek does not have. The etymology being glossed is Greek; the notation is not.

`.ipa` is the third and last tier: `font-weight: 400` against the gloss's 500, same size and colour. It previously set `font-weight: 500` and `--mute`, which is exactly what the gloss already inherits — the rule styled nothing. Weight is the only lever left that separates a parenthetical from its sentence without introducing a fourth size or a second grey.

The span carries **no `lang` attribute**, and should not get one back. It used to say `lang="el"`, which was wrong: the brackets hold IPA — Latin letters plus the modifiers `ˈ ˌ ː` — not Greek script. That attribute asked assistive tech to switch to a Greek voice and apply Greek pronunciation to characters Greek does not have. The etymology being glossed is Greek; the notation is not.

## Brand objects

| Object | File | Behaviour |
|--------|------|-----------|
| Brush wordmark | `src/assets/vavva-mark.png` | Static. Hand-drawn, keyed to transparency, trimmed. Never animated, never recoloured. Lives in `src/`, not `public/` — a statically imported asset is already emitted to `_next/static` with a content hash, so a copy in `public/` ships the same 42KB again at an uncacheable URL. |
| Aurora | `src/components/dia/DiaGradient.tsx` | SVG bars + CSS blur, rises on mount. `44dvh`, dropping to `26dvh` under 620px tall. Static — it does not cycle, and it is the only object in the bottom zone. |
| Access gate | `src/components/gate/AccessGate.tsx` | The door. One field, no label. Falls back to a plain Instagram profile link when no endpoint is configured — see README. One outbound URL only: no `ig.me/m` deep link, on either the resting or the send-failure path. |

## Copy

```
Casa Vavva is a creative studio based in New York City.

Vavva [vaˈvˌvːa]; evokes a sense of beauty, peace, and abundance according to
ancient Greek philosophy.

request access
```

Rules: no NYU, no term dates, no event listings. The etymology stays because it
implies rather than answers.

**The city name is the only red in the copy** (`.place`), and it is deliberately
*not* a link. Three reasons, in order of weight: a Wikipedia article about New
York is a leak off a one-page site; `.bio-link` resolved its hover to `#000`, so
a red link would have *darkened* on hover; and `.social-link` already answers in
red, so red would have meant "link" and "hover" at once. `.bio-link` had no
remaining users after this and was deleted.

**Revised 2026-07-31, by the owner.** A creative studio, not a private members
club. The club line claimed members and an address that did not exist yet; a
studio is true the moment it makes something. Two consequences that are easy to
miss:

- **"You must be 21 or under to enter" is gone.** It was the door rule of a club
  without a door. Nothing inherited its meaning — only its colour.
- **The measure moves to meet the sentence, every time the sentence changes.**
  See the comment in `src/app/page.tsx`. This copy went through three settings
  in one day — 336 for the club line, 308 for a two-city version, 216 for what
  shipped — and each move was a measurement, not a preference. Re-measure before
  editing this copy; the number in the comment is the output of that, not an
  input to it.

Los Angeles appeared in the copy briefly on 2026-07-31 and was removed the same
day, by the owner. The city is New York.

**Superseded 2026-07-26 note, kept for the trade-off.** This file once said
"never say what it is, only what it feels like to be near," and banned "members
club" on the grounds that *club* invites a licensing question. That ban was
overridden, and the licensing question has now gone away on its own — a studio
raises none. The history stays so the reasoning is visible rather than lost.

## Color

| Token | Value | Use |
|-------|--------|-----|
| `--paper` | `#E8E8E8` | page |
| `--ink` | `rgba(0,0,0,0.90)` | primary line |
| `--mute` | `rgba(0,0,0,0.45)` | etymology line, resting CTA |
| `--red` | `#B32622` | sampled from the brush mark — the city, CTA hover, gate focus rule |

One accent only. No second brand colour (no Instagram purple, no gradient buttons).

### The landing inverts figure and ground (2026-08-14)

> **SUPERSEDED the same day it was written.** D reverted the landing to white
> paper within hours, taking the reversed wordmark, `.brand-place` and the
> `html:has(.brand-stage)` skin with it. Kept in full because the reasoning is
> reusable — the figure/ground argument, the filter-over-second-asset call and
> the measured contrast table all hold if a brand-colour page ever returns —
> but **nothing below describes the live site.** The lamp strip is visible on
> `/` again. See "The landing as of 2026-08-18" below for what is actually
> there.

D: *"make the landing page VAVVA red and flip the logo color to white... (a
brand landing)."*

The one-accent rule is **not broken by this, it is inverted.** On `/`, `--red`
stops being an accent applied to a white page and becomes the page itself,
with the paper colour demoted to the ink. No new hue was introduced to do it —
it is the same single house colour used as ground rather than figure. Every
other route keeps white paper with the red accent exactly as before, so the
rule still describes the site; the landing is the one place the relationship
flips, which is what makes it read as a cover rather than as another page.

Consequences worth knowing:

- **The wordmark reverses to white** via `filter: brightness(0) invert(1)`,
  not a second PNG. The asset is a single-colour brush mark with a real alpha
  channel, so the filter drives every opaque pixel to white and leaves the
  antialiased edges intact. A parallel white file would be 42KB to maintain
  and would drift the day the mark is re-cut.
- **`.place` cannot be used there.** The city is set in `--red` everywhere
  else; on a red page it would vanish. `.brand-place` carries the same
  emphasis through weight and full white instead.
- **The lamp strip is hidden on `/`.** Green lamps on `#B32622` put a second,
  clashing hue on the one page whose entire job is to be the brand colour. The
  strip is decorative and `aria-hidden`, so it has no meaning to lose.
- **The whole skin is driven by `html:has(.brand-stage)`**, not by branching
  Nav on `usePathname()`. Nav renders on the server first, so a JS branch
  paints the white header for one frame and flips it on hydration — a red page
  that flashes a white bar on every load, which is the same class of load-in
  bug this repo has already fixed twice. `:has()` is resolved by the style
  engine on first paint, server markup included.
- **Contrast was measured, not assumed**, against `#B32622` (luminance
  0.1109): white 6.53:1, cream `#F5EFE6` 5.71:1, white at 85% (nav rest)
  5.09:1. All clear the 4.5:1 body floor. The status line shipped at 72% cream
  for one pass, which composites to 3.61:1 and **failed** — it is full cream
  now, with hierarchy carried by size, weight, case and tracking instead.

### The landing's one CTA is Instagram (2026-08-14)

> **SUPERSEDED.** The Instagram link went too, later the same day, along with
> the COMING SOON line that sat under it. The landing carried no call to
> action at all from then until 2026-08-18, and still carries none — the sign
> that arrived on the 18th is an object, not a control. The reasoning about
> `WaitlistForm` below is still the reason not to reinstate a field.

The video and the email field are both gone. `MediaFrame` and `WaitlistForm`
stay on disk under the usual paused-not-gone convention.

Dropping the field rather than setting it beside the Instagram link is the
honest call, not just the tidy one: `WaitlistForm` posts to
`NEXT_PUBLIC_ACCESS_ENDPOINT`, and with no endpoint configured its actual live
behaviour was already `window.open(instagram)`. The form was a door painted on
the wall in front of the real door.

One clause of copy changed with it and is flagged rather than quietly kept:
*"Join the waitlist for behind-the-scenes updates"* became *"Follow along for
behind-the-scenes updates,"* because a sentence pointing at a control that no
longer exists is worse than an edited sentence. Everything else is D's own
wording, untouched.

### The landing as of 2026-08-18: one sign, and nothing else

> The header lamp strip was removed on this date too, site-wide, so every
> route lost 40px of chrome and its brightest element. `.home-stage` and
> not-found.tsx both subtract 64px now rather than 104. See layout.tsx.

The landing is a full-bleed pixel-art view of Manhattan in spring, with an
MUTCD guide sign reading **Coming Soon** — green panel, white rule set in from
the edge, white Title Case legend — tearing itself apart in bursts over the
centre of it. The artwork arrived later the same day; the sign and the
`sr-only` heading are still the only content on top of it. D replaced the
studio's one sentence with it outright — *"replace the text in total (creative
studio....) with the coming soon component"* — and the arrow the sign used to
carry went with the copy, since it had nothing left to point at.

**WHAT THIS COSTS, stated plainly:** that sentence was the only place the site
said what the studio is, where it is, and when it opens. It survives in
layout.tsx's `description` and JSON-LD, so search results and link previews
still carry it, but a visitor now reads two words. `.home-note` and `.place`
stay in globals.css unused, and the sentence is one line up in git. A
`sr-only` <h1> keeps the route from shipping with no heading and no text node
at all — see page.tsx for why that is not decoration.

**One exception to the list below, not three.** The sign is chrome and it is a
second accent; it is no longer a second centred object, because it is the only
one. The colour moved four times in a day — guide green, caution yellow, Vavva
red, back to green — and each move was a change of MUTCD sign class rather
than a repaint, which is why the legend and rule inverted twice on the way
round. globals.css carries the full argument. Green is a genuine second accent
and that is the honest cost; red would have avoided it but put two reds on a
page holding one object, and made the sign read as branding rather than as a
found thing.

**The header is parked.** Locations, Products and Our Story are still real
links with real hover and press states, and all three go to `/` — D:
*"disable the header buttons. (make them clickable and hoverable) but just
link to the same home page."* This is deliberately NOT
`SECONDARY_PAGES_LIVE = false`, which renders inert labels and 404s the
routes. The routes stay live and stay in sitemap.xml, so a search result can
still land on /products even though nothing in the UI points there — flip that
flag if they should go dark too. Contact is untouched; it goes to Instagram,
which is a real destination.

**What has not changed:** one wordmark, one measure, white paper, red as the
house accent on every route.

## The ambient wordmark, and why it is gone

Removed 2026-07-26. `src/components/blur-glow/` — a WebGL "VAVVA" that sat fixed at the bottom of the frame and cycled five colour worlds — is deleted. Restore with `git show 213a2c9 -- src/components/blur-glow`.

It is worth recording why, because the idea will come back.

The mark was drawn at `bottom: 4dvh`, which put it 204px **below** the aurora crest, buried in the most saturated band. Its palettes all resolved to `#E8E8E8` at their light end — they were calibrated for the paper — so composited over saturated blue every world's ink measured **2.15–3.19:1** and the bloom had no paper to bloom into. It read as a dark stain, not a light.

There were only two honest fixes. Lift it onto bare paper, which meant shrinking the aurora from `44dvh` to `30dvh` because at 1280×720 there were just 34px of clear ground between the CTA and the crest and the mark is 62px tall. Or rework the composite so the mark is additive light rather than a dark mask — real shader work.

The third option won: the page has one wordmark now. That resolves the two-VAVVAs-on-one-screen problem outright, gives the aurora its full `44dvh` back, and costs nothing but an effect almost nobody could see. If it returns, it returns as light, not as ink.

## Anti-patterns

- ~~Full-bleed sky~~ / frosted overlay cards — **the landing is now exactly this; see below**
- Banner-scale logo
- Dense brand essays
- Extra chrome (nav, cards, pills)
- A second accent colour
- ~~A second VAVVA anywhere, at any scale~~ — **amended 2026-08-18, see below**
- A second centred object — centring is what marks the head; spend it once

**Scoped exception, the landing artwork (2026-08-18).** The landing is a
full-bleed pixel-art NYC skyline running to all four edges, with the header
floating transparently over it and no footer rendered. That breaks the
"Full-bleed sky" entry above about as literally as it can be broken, and it
is D's call: *"use this new image on our landing page (between the header and
lander)"*, then *"mayb remove footer and make header transparent.. idk if i
like the white bars."*

Three things this drags along, all recorded so the next change knows:

- **A scrim exists and is load-bearing.** With the header sitting straight on
  the artwork the nav's black ink measured **1.31–2.05:1** against the pixels
  under it — unreadable, not merely low. The top edge is mixed (dark foliage
  left, bright sky centre, blossom right) so no ink colour fixes it. A white
  gradient fading out over 150px lifts the worst case to ~11:1 without
  reintroducing a bar. Do not remove it without re-measuring.
- **The footer is hidden on `/` only.** It still renders on the other three
  routes, where nothing is behind it.
- **`:has()`, not a route check.** Nav renders on the server, so a
  `usePathname()` branch would paint the paper bar for one frame and flip it
  on hydration — the same white-flash failure the red-landing pass hit.

**Amendment, the header came off the artwork (2026-08-19).** D: *"Place the
current header components on the announcement bar and remove the current
announcement bar copy ... Make the Vavva logo back to red as well, and turn
the other header buttons black."* The header no longer floats over the image;
it sits inside the 43px announcement bar above it, which is opaque white.

So the FIRST bullet above is now history rather than instruction — the scrim
is gone, along with the white nav links and the white-inverted mark it was
holding up. Its measurements stand and are worth keeping: they describe the
artwork, and the artwork has not changed. **Put anything over this image
again and re-measure before you do.** On the white bar the question does not
arise — black type is 21:1 and the red mark 6.5:1, which is what makes the
mark red again rather than a contrast regression re-entering by the back
door.

The other two bullets are untouched. The footer is still hidden on `/` only,
still by `:has()`.

The artwork did not move: it already began at the bottom edge of the bar,
because the header was floating over it rather than displacing it. What
changed is that the site's chrome went from 43px of copy above a 64px bar of
links to one 43px bar carrying both jobs, and that nothing is on top of the
picture any more.

**Amendment, the footer mark (2026-08-18).** The second-VAVVA ban above is
lifted for the footer, and only for the footer. It was written when this site
was a one-page landing whose whole composition was a single centred wordmark,
and the previous footer left its left zone deliberately EMPTY under it —
recording that the exemption "needs D's explicit sign-off, which hasn't
happened."

It has now: D, rebuilding the footer against mimis.nyc — *"replace their logo
with ours."* Their footer's left zone is their monogram; a 1:1 emulation with
that slot empty is not the thing that was asked for.

The narrowness is the point. One mark in the header, one 20px stamp in the
footer, nowhere else — not in the landing, not in a section heading, not at
any size in body copy. The ban still describes the rest of the site.

**Scoped exception, the landing's coming-soon sign (2026-08-18):** it breaks
the chrome ban and the one-accent rule, both deliberately and both argued in
"The landing as of 2026-08-18" above. That section is the authority on `/`;
this list is the authority everywhere else. The one-centred-object rule is NOT
excepted — it was broken for part of that day by a second and third object,
both since removed, and the landing is a single centred object again.

**Scoped exception, Home's video only (2026-08-12, revised three times same
day):** a rounded card + soft drop shadow (`.vv-embed` in globals.css) sits
on Home's hero video, deliberately breaking the chrome ban above. Started as
a Products-only match to internetlabs.co's portfolio-card pattern (D
attached the CHIP card as a reference), widened to Locations and Products
for cross-page cohesion, then both let go of it the same day: Locations
reverted to its own pre-existing flush mix-blend-multiply treatment (D:
didn't want it read as "the product page" — see `LocationCard.tsx`), and
Products was rebuilt flat against a mimis.nyc reference instead (see the
Products-tile note below). `.vv-embed` now styles exactly one thing on the
whole site — Home's video, see `MediaFrame.tsx` — and stays a named token
rather than an inline value on the chance a second video embed shows up
later. Nav, footer, and everything else stay exactly as restrained as the
rest of this file describes; this is one component's exception, not a
system-wide reversal.

**Products page (2026-08-12, rebuilt twice same day).** *Superseded in part
by the 2026-08-14 note above — the "no radius" claim below is wrong, and the
grid is square rather than 4:3. Kept because the rest of it still holds and
the measurement trail is the point.* First redesigned to
internetlabs.co's portfolio-card pattern — single flat-shadow card, 610px
container. Rebuilt again the same day, this time against mimis.nyc's own
`/shop` — D: "resize our product page to look like mimis with the same font
and design." Measured live at 1710px rather than eyeballed: a flat 4-column
grid (no radius, no shadow) at this site's standard 1710px/24px-gutter page
width, not a single narrow card. The page heading also moved from
`.mimi-title` (43px, Locations' size) to `.mimi-display` (48px) — mimis'
actual `/shop` heading is 48px; `.mimi-title` had been borrowed from the
wrong page of the same reference. The tag row from the first redesign
(including "Internal," a categorization label that never should have been
customer-facing) is gone with it — price now sits centred under the name,
matching mimis' own card, not beside it. One populated grid cell today, for
one real product, is the honest state of a real catalog with one SKU — not
a sign the grid is wrong. See `ProductTile.tsx`, `ProductGrid.tsx`,
`products/page.tsx`.

**Products page (2026-08-14, seven tees + a re-measure).** D supplied seven
tee packshots and asked for placeholder names, for nothing to be purchasable,
and for mimis.nyc/shop to stay the reference. The catalogue goes from one
product to eight. Three things changed beyond the data.

*Two corrections to what this file recorded about the reference.* Re-measured
live, not trusted from notes:

- **The cards are rounded.** This file said "flat — no radius, no shadow."
  mimis' image wrapper computes `border-radius: 24px` with `overflow: hidden`.
  The flat reading came off an outer container that carries no radius of its
  own. Products' tiles are 24px now, matching them. Still no shadow — that
  part was right, and it is what keeps this distinct from `.vv-embed`, which
  is radius **plus** a drop shadow and is still Home's video only.
- **No hover state, confirmed again.** Their two stacked image layers look
  like a hover swap and are not — they are SSR responsive variants, one
  `display: none` per breakpoint. A real pointer hover changes nothing on
  their card. Vavva's tile does have a hover, for a reason their catalogue
  does not have (below).

*Three deliberate departures, each because the inventory differs.*

- **Square tiles, not their 4:3.** Every tee source is 480×600 with the
  garment inked y=125..476. Covered into 4:3 the crop is y=120..480 and the
  shoulders and hem land within 5px of the frame. Covered into a square it is
  y=60..540 — ~64px of air top and bottom. Their photos are full-bleed
  lifestyle shots that fill any frame; these are packshots whose subject
  brings its own margins.
- **A 1px hairline** (`rgba(0,0,0,0.10)`, inset, on `::after`). It first
  shipped at 0.06, which computes to #F0F0F0 — a 1.05:1 edge that measured as
  present and rendered as nothing.

  Its *reason* changed the same day and the current one is worth stating,
  because the original no longer applies. It arrived because the tees were
  shot on pure #FFFFFF against a #FFFFFF paper and floated with no tile around
  them; D then re-exported all seven on **#F2F2F2**, which fixes that at the
  source. It stays because the catalogue's backgrounds are not uniform — the
  PB&J is photographed on #FBFBFB, the tees on #F2F2F2 — and the rule is what
  makes all eight tiles read as the same kind of object regardless of what
  each photograph happened to be shot against.
- **No price line.** Their card is image → name → price. Nothing is for sale,
  no tee has a price, and eight tiles each repeating "COMING SOON" in the
  price slot is noise. `price` is out of the data model entirely; the PB&J's
  $9 is in git.

*Not for sale, stated twice on purpose.* The page carries one line of copy
under the heading — "A first look. Nothing is for sale yet." — and each tile
answers on hover with a "COMING SOON" chip plus a deepened hairline. The page
line is not redundant with the hover: a hover-only fact does not exist on a
touch device, and it is what makes a pointer-only affordance acceptable at
all. The chip is `aria-hidden` for the same reason. Tiles are `<figure>`, not
links — there is no product page to link to, and a dead `<a>` announces as a
link and takes a tab stop.

The chip is a pill, which the anti-pattern list below bans. It is the second
scoped exception in this file, and it is the smallest thing that answers
"why can't I buy this" at the moment a visitor tries. Nothing else in the
grid gets a border, a pill or a shadow.

**Home hero (2026-08-12, corrected same day):** D — "resize the video
looping on the landing to the same size as the landing video on mimis.nyc.
and where the text on mimis 'meet me' is is where the email signup and copy
should go." The video grew from a 460px centred column to mimis' own
measured hero proportions (2.4334:1, 1662×683 at 1710px), first at full
page width, and the waitlist paragraph + field moved to sit directly below
it, centred — the same position mimis gives "Meet me at Mimi's."

Width corrected immediately after: D — full width was "too big... blurry
since its not 4k." The source clip is a re-encode at a literal 800×450 (see
MediaFrame.tsx); anything wider than 800px CSS width is upscaling past the
file's actual resolution, so the video is now capped at `max-w-[800px]`,
keeping the same 2.4334:1 shape at a size the source can actually cover. A
"no scroll to see the copy" requirement came with it and is satisfied at
800px with room to spare — verified, not assumed.

Vavva's own footage, copy, and 460px-tuned paragraph typography are
untouched throughout; only the video's size/proportions and the copy
block's position changed. This also retired the old `.idx-stage` grid-
centre-in-one-screen trick (page.tsx / globals.css) — it existed for a
small composition that needed help not looking lost in a tall viewport,
which this hero doesn't have at either size tried. See `page.tsx`,
`MediaFrame.tsx`.

**Header line (2026-08-12, revised again later same day):** the
LoadingLamps strip (previously homepage-only, above the video) renders
site-wide directly under Nav, in layout.tsx. It went through an infinite
wave and then a one-shot sweep-then-static entrance before D asked for
neither: "just leave the leds on 24/7... i dont want it like that" (the
sweep version's edge cases around load-in). Every lamp now renders lit
unconditionally, with no animation of any kind — see `LoadingLamps.tsx` for
the full history if the motion is ever wanted back.
