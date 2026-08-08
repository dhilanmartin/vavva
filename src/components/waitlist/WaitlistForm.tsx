"use client";

// The waitlist door, ported from index.how's field 1:1 on structure and
// measurement (getComputedStyle, 2026-08-07):
//
//   form    52px tall, 12px radius, 1px hairline border, faint inset fill,
//           0 1px 1px rgba(0,0,0,.02) shadow, overflow hidden
//   input   fills the row, 16px type (15px ≥1024 — a deliberate step DOWN
//           at the wide breakpoint, not up), 16px side padding, +0.02em
//           tracking, real placeholder hidden
//   caret   2×18px bar at x=12, vertically centred, 1s hard blink
//   ghost   animated placeholder at x=16 y=14, alternating between a
//           gradient wash and flat grey in antiphase with the caret
//   button  24×24 square, 14px margin, 2px radius, mono 19px arrow,
//           scale(0.95) on press
//
// The 16px mobile / 15px desktop split is the one value worth flagging as
// intentional rather than a typo in the extraction: 16px is the threshold
// below which iOS Safari zooms the viewport on focus, so the reference site
// pays a point of size on small screens to avoid it and takes it back at
// 1024. Kept exactly.
//
// Two substitutions, both this house's rules rather than theirs:
// - Their accent green becomes the brush red, on the caret, the placeholder
//   gradient and the submit hover. One accent in the house.
// - The infinite blink is disabled under prefers-reduced-motion (globals.css).
//
// Behaviour reuses AccessGate's contract exactly — same NEXT_PUBLIC_ACCESS_
// ENDPOINT, same POST body, same Instagram fallback when it's unset — so
// this is a new front end on a door that already works, not a second
// half-wired one. AccessGate itself stays on disk for the gate treatment
// the home page used before this.

import { useState } from "react";

const ENDPOINT = process.env.NEXT_PUBLIC_ACCESS_ENDPOINT;
const PROFILE = "https://instagram.com/casavavva";

// index.how sets its own founder's address as the ghost placeholder. This is
// the same joke told with Vavva's own domain — an address at the house,
// not a real inbox.
const GHOST = "you@vavva.xyz";

type State = "idle" | "sending" | "done" | "error";

export function WaitlistForm() {
  const [value, setValue] = useState("");
  const [state, setState] = useState<State>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const email = value.trim();
    if (!email || state === "sending") return;

    // No endpoint configured: hand off to the profile rather than swallow
    // the address into a form with nowhere to send it. Same rule AccessGate
    // has always followed, just resolved at submit time instead of render
    // time so the field itself is always the page's focal object.
    if (!ENDPOINT) {
      window.open(PROFILE, "_blank", "noopener,noreferrer");
      setState("done");
      return;
    }

    setState("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle: email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    // role="status" because this replaces the form rather than adding to it —
    // without it a screen reader user gets silence where the door used to be.
    return (
      <p className="idx-note" role="status">
        noted.
      </p>
    );
  }

  // The caret and ghost placeholder are decoration over a real input, so they
  // clear the moment there's anything to read underneath them.
  const showGhost = value.length === 0;

  return (
    <>
      <form onSubmit={submit} className="idx-form">
        <input
          type="email"
          required
          autoComplete="email"
          spellCheck={false}
          aria-label="Email"
          placeholder={GHOST}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (state === "error") setState("idle");
          }}
          className="idx-input"
        />
        {showGhost && (
          <>
            <span aria-hidden className="idx-cursor" />
            <span aria-hidden className="idx-placeholder">
              {GHOST}
            </span>
          </>
        )}
        <button
          type="submit"
          className="idx-submit"
          disabled={!value.trim() || state === "sending"}
          aria-label="Join the waitlist"
        >
          <span className="inline-block -translate-y-px">
            {state === "sending" ? "·" : "→"}
          </span>
        </button>
      </form>
      {state === "error" && (
        <p className="idx-note" role="status">
          {"didn't send — "}
          <a
            href={PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-[3px]"
          >
            try Instagram
          </a>
        </p>
      )}
    </>
  );
}
