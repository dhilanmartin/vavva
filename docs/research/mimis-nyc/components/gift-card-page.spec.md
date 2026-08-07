# Component spec: Gift-card composer page

Structural reference: mimis.nyc `/gift-card` (footer-only linked). See `PAGE_TOPOLOGY.md` and `COMPONENT_INVENTORY.md` §16. This is a functional purchase form — the checkout/payment flow itself is explicitly out of scope per SKILL.md; only the surrounding structure is captured here.

## Page structure
1. Nav (no active-state link — this page isn't in the primary nav).
2. **Card-art preview** — dark card-shaped visual with a glow/gradient border, centred. Purely decorative preview of the physical/digital card.
3. **Segmented tab control** (buy vs. reload) — 2 tabs, pill-bordered container, active tab filled black / inactive outline-only.
4. **Amount pill selector** — row of 5 pills (4 fixed amounts + 1 "custom"), same filled/outline active pattern.
5. **Form**, in order:
   - 2-column field row: sender name / sender email
   - Checkbox: "send to myself" toggle, unchecking reveals/hides the recipient fields below (behavior inferred from the checkbox's position and label, not directly exercised — verify before building)
   - 2-column field row: recipient name / recipient email
   - Full-width multi-line message textarea
6. **Second segmented tab control** (send instantly vs. scheduled) — same visual pattern as #3.
7. reCAPTCHA badge (third-party — not a structural element to replicate; Vavva would need its own bot-protection decision if this page type is ever built).
8. Footer.

## Variants
None — single form, single layout.

## States
- Tab controls: active (filled) vs. inactive (outline) — same visual language across both instances on this page.
- Amount pills: same active/inactive treatment.
- Checkbox: checked/unchecked — not exercised, effect on the recipient fields unverified.

## Responsive behavior
- 2-column field rows at desktop; mobile stacking **not directly verified on this specific page** (assume 1-column based on the site's general mobile pattern, but confirm before building).

## Interactions
- Tab clicks swap the active/inactive pill styling within each segmented control.
- Amount pill clicks swap selection within the amount row (radio-button semantics, not multi-select).
- Form submission not exercised.

## Animations
- None observed beyond standard focus states on inputs.

## Layout measurements
- Buttons/pills: 100px radius (full pill scale).
- Text inputs/textarea: plain rectangular border, distinct from the pill treatment used on buttons — inputs and buttons deliberately use different corner values on this site.

## Content fields
- Card-art preview: `[VAVVA ASSET TBD]`
- Tab labels (buy/reload): `[VAVVA COPY TBD]` × 2
- Amount pill values: `[VAVVA COPY TBD]` × 4 fixed + custom
- Field labels (sender name/email, recipient name/email, message): `[VAVVA COPY TBD]` × 5
- Checkbox label: `[VAVVA COPY TBD]`
- Send-timing tab labels: `[VAVVA COPY TBD]` × 2

## Open question for D
Gift cards imply real payment processing and account/order infrastructure — a much bigger commitment than the rest of this structural reference. Confirm whether this page type belongs on the punch list at all before scaffolding it; it's the one page in this inventory that can't be "placeholder copy + real structure," it needs a real backend decision first.
