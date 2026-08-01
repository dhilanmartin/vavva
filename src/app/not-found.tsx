import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh w-full flex-col bg-[#E8E8E8] antialiased">
      {/* px-4 / md:px-5 to match the home column. This was px-1, which put the
          copy 4px off the bezel on a 320px phone while the home page held 16 —
          the two pages are the same site and should not gutter differently.
          max-w stays 360: there is no measure to fit here, only a short label,
          so it just needs to stop the block drifting on a wide screen. */}
      <div className="mx-auto flex w-full max-w-[360px] flex-1 flex-col justify-center px-4 py-16 md:px-5">
        {/* An h1, not a p. The home page's heading is carried by the mark; this
            page has no mark, so as a <p> it shipped with no heading at all. */}
        <h1 className="m-0 text-[15px] font-medium leading-[1.4] tracking-[-0.015em] text-black">
          Not found
        </h1>
        <p className="mt-6">
          <Link href="/" className="social-link">
            back
          </Link>
        </p>
      </div>
    </main>
  );
}
