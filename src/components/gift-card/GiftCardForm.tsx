"use client";

// gift-card-page.spec.md: 2-column sender row -> "send to myself" checkbox
// -> 2-column recipient row -> full-width message textarea. The checkbox's
// effect on the recipient fields was unverified by recon ("behavior
// inferred... not directly exercised") — this build takes the reading that
// makes the form make sense (checked = sending to self, hides recipient
// fields) and flags it as a judgment call, not a confirmed spec.
//
// No backend: submit is inert. Checkout/payment is explicitly out of scope
// per SKILL.md, and this route has none.

import { useState } from "react";

const inputClass =
  "min-h-11 w-full rounded-md border border-black/20 bg-transparent px-3 text-[14px] text-[var(--ink)] outline-none placeholder:text-[var(--mute)] transition-colors focus:border-[var(--red)]";

export function GiftCardForm() {
  const [sendToSelf, setSendToSelf] = useState(false);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mx-auto flex w-full max-w-[520px] flex-col gap-5"
    >
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
        <input className={inputClass} placeholder="Your name" />
        <input className={inputClass} type="email" placeholder="Your email" />
      </div>

      <label className="flex items-center gap-2 text-[14px] text-[var(--ink)]">
        <input
          type="checkbox"
          checked={sendToSelf}
          onChange={(e) => setSendToSelf(e.target.checked)}
          className="h-4 w-4 rounded-sm border border-black/30 accent-[var(--red)]"
        />
        Send this to myself
      </label>

      {!sendToSelf ? (
        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
          <input className={inputClass} placeholder="Recipient's name" />
          <input
            className={inputClass}
            type="email"
            placeholder="Recipient's email"
          />
        </div>
      ) : null}

      <textarea
        rows={4}
        placeholder="Add a message (optional)"
        className={`${inputClass} min-h-28 resize-none py-3`}
      />

      <button
        type="submit"
        className="mt-2 inline-flex min-h-11 items-center justify-center self-center rounded-full bg-[var(--ink)] px-8 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--paper)] transition-transform active:scale-[0.96]"
      >
        Send gift card
      </button>
    </form>
  );
}
