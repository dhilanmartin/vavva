import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SweetDreamsPage } from "@/components/shop/SweetDreamsPage";
import { isRouteLive } from "@/lib/site";

export const metadata: Metadata = { title: "Midnight — VAVVA" };

export default function MidnightRoute() {
  if (!isRouteLive("/products")) notFound();

  return (
    <main className="w-full bg-[var(--paper)] pb-24 pt-10 desktop:pt-16">
      <div className="vv-shop px-6">
        <SweetDreamsPage />
      </div>
    </main>
  );
}
