"use client";

// The door. One field, no label, no explanation of what happens next.
//
// Two modes, chosen at build time:
//   NEXT_PUBLIC_ACCESS_ENDPOINT set → the field posts there and settles on "noted."
//   unset                          → a plain link to the Instagram profile, so a
//                                    request is never silently swallowed by a
//                                    form with nowhere to send it.

import { useState } from "react";

const ENDPOINT = process.env.NEXT_PUBLIC_ACCESS_ENDPOINT;

// The profile, and the only outbound URL in this file. Not ig.me/m: that deep
// link opens a compose view against whatever account the visitor happens to be
// signed into, which is a demand rather than a door. The profile opens the page
// and lets them decide.
const PROFILE = "https://instagram.com/casavavva";

type State = "idle" | "sending" | "done" | "error";

export function AccessGate() {
  const [value, setValue] = useState("");
  const [state, setState] = useState<State>("idle");

  if (!ENDPOINT) {
    return (
      <a
        href={PROFILE}
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      >
        request access
      </a>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const handle = value.trim();
    if (!handle || state === "sending") return;

    setState("sending");
    try {
      const res = await fetch(ENDPOINT!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    // Says nothing about whether it worked out. That is the point.
    // role="status" because this replaces the form rather than adding to it —
    // without it a screen reader user gets silence where the door used to be.
    return (
      <p className="gate-note" role="status">
        noted.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="gate">
      <input
        type="text"
        inputMode="email"
        autoComplete="email"
        spellCheck={false}
        aria-label="Email or Instagram handle"
        placeholder="email or @handle"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (state === "error") setState("idle");
        }}
        className="gate-field"
      />
      <button
        type="submit"
        className="gate-submit"
        disabled={!value.trim() || state === "sending"}
        aria-label="Request access"
      >
        {state === "sending" ? "…" : "→"}
      </button>
      {state === "error" && (
        <p className="gate-note" role="status">
          {"didn't send — "}
          <a href={PROFILE} target="_blank" rel="noopener noreferrer">
            try Instagram
          </a>
        </p>
      )}
    </form>
  );
}
