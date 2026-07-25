import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh w-full flex-col bg-[#E8E8E8] antialiased">
      <div className="mx-auto flex w-full max-w-[360px] flex-1 flex-col justify-center px-1 py-16">
        <p className="text-[15px] font-medium leading-[1.4] tracking-[-0.015em] text-black">
          Not found
        </p>
        <p className="mt-6">
          <Link href="/" className="social-link">
            back
          </Link>
        </p>
      </div>
    </main>
  );
}
