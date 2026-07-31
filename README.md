# Casa Vavva

A creative studio — Los Angeles & New York City.

```bash
npm install
npm run dev
```

## The access gate

The CTA has two modes, picked at build time from `NEXT_PUBLIC_ACCESS_ENDPOINT`
(see `.env.example`):

| Endpoint | CTA |
|----------|-----|
| unset (default) | `request access` links to the Instagram profile |
| set | inline field; posts `{ "handle": "…" }` and settles on `noted.` |

The fallback is deliberate: a form with nowhere to send its requests silently
loses them, which is worse than no form.

## House rules

Read `DESIGN.md` before touching the page. The two constraints that are not
obvious from the code:

- **One VAVVA at brand scale.** The brush mark up top is the logo. The WebGL
  wordmark at the bottom is an effect, and stays subordinate to it.
- **Scale the glow stage, never the word alone.** The bloom's energy budget is
  tied to the word/canvas ratio; a small word in a large canvas bleeds out to an
  invisible ghost.
