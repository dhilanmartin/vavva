# DESIGN.md

The design system for Casa Vavva. Read this before touching the page.

---

## Thesis

**The site is an address before it opens.**

Not a shop, not a portfolio, not a mood board. A specific building on Mercer Street
that will open in fall 2026, described honestly while it is still shut.

### The arbitration test

The thesis exists to say no. Before adding anything, ask:

> Does this state a fact about the place, the goods, or the date?

If it states nothing, it does not ship. This test is the whole point. The previous
version of this site was assembled by borrowing — a bar from one site, a grid from
another, a footer from a third — and every borrow was individually well-made. They
accumulated because the site's guiding idea was a *mood*, and a mood cannot reject
anything. "Anticipation" justifies a glitch, a petal, a pixel park, and a street
sign equally well. An address rejects three of the four.

---

## Two worlds, one chrome

The site has two grounds and that is deliberate:

- **The landing is a plate.** One full-bleed authored image. No paper, no grid.
- **Every interior page is paper.** Warm off-white, a 12-column grid, left-set type.

They read as one site because the same **chrome** sits on both, at the same size,
with the same spacing:

1. The wordmark — small, centred, ink
2. The **ledger line** — `MERCER ST · SOHO · NEW YORK · FALL 2026`
3. A hairline rule beneath it

On the landing the chrome sits over the artwork. On interiors it sits on paper above
the page title. Identical type, identical metrics. **This is the unification
mechanism.** Do not make the landing gridded and do not make the interiors
atmospheric — make the chrome constant and let the grounds differ.

The pattern comes from Aimé Leon Dore, which prints its city and the current
timestamp under a small wordmark over full-bleed media. It is the only borrow in
this document, it is borrowed at the level of *mechanism* rather than measurement,
and it passes the arbitration test: it states a place and a time.

---

## Type

**One face. Four roles. No exceptions.**

| Role | Spec | Used for |
|---|---|---|
| **Display** | Satoshi 700 · 56px / 1.0 / `-0.035em` — 36px / 1.05 mobile | One per page. The page's name. |
| **Statement** | Satoshi 400 · 22px / 1.4 / `-0.01em`, 34em measure | The single sentence that carries the page. |
| **Body** | Satoshi 400 · 16px / 1.55 / `0em`, 34em measure | Prose. |
| **Ledger** | Satoshi 500 · 12px / 1.2 / `0.08em`, uppercase | Address, date, price, status, nav, labels, footer. |

**The ledger is the spine of the system.** One size, one weight, one tracking,
everywhere. Address, price, nav item, product label, status, copyright — all the
same. It reads as *record* rather than *marketing*, which is the correct register
for a place that has nothing to sell yet. Dimes runs its entire navigation in this
role; ALD runs its place-and-time line in it.

The ledger shipped as a mono for about an hour and was pulled. The reasoning for a
mono was sound on paper — a monospaced face reads as a ledger by default — but on
the landing that one line is the *only* text on the page, so the mono became the
entire voice of the site and read as a terminal rather than as a plaque. **The
register comes from the size, the caps and the tracking far more than from the
face.** Stussy and mimis both set exactly these labels in a sans.

That leaves the site on one face, which is a better outcome than the two-face plan
it replaced and costs nothing: every role above is a size, a weight and a tracking
of Satoshi.

Measure is set in `em`, never `ch` — Satoshi's zero glyph is wide, and a `ch`-based
measure resolves far longer than intended (`62ch` measured 88 characters here).
34em lands at roughly 66 characters, which is correct.

### Font loading

Satoshi is self-hosted `woff2` from `/public/fonts`, with no request to an external
host. It is the only face loaded.

**GT Alpina is removed** — the shipped files were Grilli Type *trial* cuts (embedded
name `GT Alpina Trial`), trial licences cover evaluation only, and the face came
from mimis.nyc rather than from Vavva. Display type is Satoshi 700, cut tight.

If a second face is ever added, it must be self-hosted `woff2` on the same terms,
and it has to earn its place against the four roles above rather than beside them.
Verify the loading approach against `node_modules/next/dist/docs/` — this Next
version's font conventions differ from older ones.

---

## Colour

| Token | Value | Job |
|---|---|---|
| `--paper` | `#FAF8F4` | Ground of every interior page. Warm, never pure white. |
| `--ink` | `#111111` | All type, including the wordmark. |
| `--mute` | `#6B6B6B` | Ledger secondary only. Never prose. |
| `--rule` | `#E2DED6` | Hairlines and tile edges. The only structural line. |
| `--red` | `#B32622` | Reserved. See below. |

### Red means "not yet"

Red marks **only what does not exist yet**:

- `FALL 2026`
- `OPEN SOON`
- `COMING SOON`
- a price that has no way to be paid

Nothing else is ever red. Not the wordmark, not links, not hovers, not rules. The
accent then carries meaning instead of decoration, and it earns its loudness by
being rare.

This is why **the wordmark is ink, not red**. Red type over the daylight artwork
measured 1.39:1 — far below any accessibility floor — and every structural fix for
that (deeper scrim, drop shadow, chrome band) fought the artwork. Removing the case
solves it outright.

### The one licensed object

The street sign carries **MUTCD green `#00693E` with a white keyline**. This is not
a system colour and it never appears anywhere else — not as a background, not as a
link, not as an accent. It belongs to that single physical object, the way a real
enamel sign owns its green. Treat any green outside the sign as a bug.

---

## Layout

12 columns, 24px gutters, `max-width: 1280px`, 24px page margin.

**Every interior route opens with the identical gesture.** Same four numbers, four
times — this is what makes the pages feel authored rather than assembled:

```
chrome (wordmark · ledger line · hairline)
  ↓ 80px
Display title            ← flush left, column 1
  ↓ 16px
Ledger line
  ↓ 40px
────────────────────────  ← 1px --rule, full grid width
  ↓ 48px
content
```

**Nothing on an interior page is centred.** Titles, prose, product labels, and the
footer are all left-set. Centred prose reads as a caption, which is why the current
Story page reads as a fragment rather than a writeup.

**The landing is the single exception.** It is a plate, not a page: one image, one
object over it, centred. The grid does not apply there.

### Filling the page

Every interior page currently ends about 40% of the way down and leaves dead space
above the footer. A page that has little to say should be *short* — let the footer
rise — not padded to full height with air. Never pad a catalogue with blank tiles;
six empty COMING SOON boxes advertise thinness rather than anticipation.

---

## Motion

**One transition exists.**

```
opacity 0 → 1, translateY 8px → 0
400ms cubic-bezier(0.22, 1, 0.36, 1)
60ms stagger, fired once on route load
```

Hover changes **colour only** — no transform, no scale, no chip, no reveal. Anything
a hover discloses is invisible on touch, so hover may never carry information.

`prefers-reduced-motion` drops the translate and keeps the fade.

### Motion inside the plate

The landing artwork is one authored image, and motion *within* it — the falling
petals, the sign's own behaviour — belongs to the artwork rather than to the system.
It is exempt from the rule above. This exemption covers the plate only; it is not a
licence to animate anything on paper.

### Verification

Animation cannot be checked in the in-app browser or Chrome MCP — neither enters the
rendering steps, so `requestAnimationFrame` and `IntersectionObserver` never fire and
animated elements screenshot in their resting state. Use headless Chrome with virtual
time:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --disable-gpu --hide-scrollbars --window-size=1440,900 \
  --virtual-time-budget=4000 --screenshot=out.png http://localhost:3000
```

---

## Copy

Ledger voice: state the fact, stop. No adjectives that cannot be verified.

- **Good:** `MERCER ST · SOHO · NEW YORK · FALL 2026`
- **Good:** `$65 · FALL 2026`
- **Bad:** `We have news to share` — there is no news
- **Bad:** `A first look. Nothing is for sale yet.` — two sentences to say one thing

Prices ship with a date, never alone. `$65` by itself is a broken promise; `$65 ·
FALL 2026` is a fact.

Say what is true about the state of things. The site's strongest line is that
nothing is for sale yet — that is the thesis in seven words, and it should not be
apologised for.

---

## Anti-patterns

1. **Never source a number from another site's inspector.** Measuring someone
   else's computed styles is how this site acquired four design languages. Author
   the number or derive it from the grid.
2. **Never centre body copy.** Records are left-set.
3. **Never let hover carry information.** It does not exist on touch.
4. **Never print a price without a date or a mechanism.**
5. **Never introduce a second accent hue.** Red is the accent. Sign green belongs to
   the sign.
6. **Never pad a page or a grid with blanks** to reach a target height or column count.
7. **Never add an element that states no fact.** It fails the arbitration test.

---

## Removed, and why

| Element | Reason |
|---|---|
| Announcement bar | Copied from shadowlion.com; announced news that does not exist. |
| GT Alpina | Trial licence; came from mimis.nyc, not from Vavva. |
| A mono ledger | Became the site's whole voice on the landing. Register comes from size and tracking, not the face. |
| 6-column / 5px product grid | Stussy's outlet density applied to a six-item lookbook. Now 3-up desktop, 2-up mobile, 24px gutters. |
| Six empty COMING SOON tiles | Advertised thinness. |
| Equal-thirds footer | Copied from mimis.nyc. Now one ledger line above a hairline. |
| Line-art skyline | A third illustration language beside the pixel plate and the product frames. |
| Red wordmark | 1.39:1 over the artwork, and it spent the accent on decoration. |

---

## Open

- The Story page is missing its central paragraph — why the studio exists. Awaiting
  copy; it is deliberately absent rather than filled with generated prose.
- Products display prices with no way to buy. Under the copy rule they carry a date
  until a mechanism exists.
- `NAV_DESTINATIONS_PARKED` is `false` and `/story` is open; both were closed in
  production previously. Confirm this is intended before the next deploy.
