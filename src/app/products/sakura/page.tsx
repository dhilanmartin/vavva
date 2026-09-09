import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CherryBlossomPage } from "@/components/shop/CherryBlossomPage";
import { isRouteLive } from "@/lib/site";

export const metadata: Metadata = { title: "Sakura — VAVVA" };

export default function SakuraRoute() {
  if (!isRouteLive("/products")) notFound();

  return (
    <main className="w-full bg-[var(--paper)] pb-24 pt-10 desktop:pt-16">
      <div className="vv-shop px-6">
        <CherryBlossomPage />
      </div>
    </main>
  );
}
