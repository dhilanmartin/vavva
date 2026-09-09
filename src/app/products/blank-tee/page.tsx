import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlankTeePage } from "@/components/shop/BlankTeePage";
import { isRouteLive } from "@/lib/site";

export const metadata: Metadata = { title: "Blank Tee, Black — VAVVA" };

export default function BlankTeeRoute() {
  if (!isRouteLive("/products")) notFound();

  return (
    <main className="w-full bg-[var(--paper)] pb-24 pt-10 desktop:pt-16">
      <div className="vv-shop px-6">
        <BlankTeePage />
      </div>
    </main>
  );
}
