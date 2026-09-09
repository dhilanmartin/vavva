import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PajamaPantPage } from "@/components/shop/PajamaPantPage";
import { isRouteLive } from "@/lib/site";

export const metadata: Metadata = { title: "Pajama Pant — VAVVA" };

export default function PajamaPantRoute() {
  if (!isRouteLive("/products")) notFound();

  return (
    <main className="w-full bg-[var(--paper)] pb-24 pt-10 desktop:pt-16">
      <div className="vv-shop px-6">
        <PajamaPantPage />
      </div>
    </main>
  );
}
