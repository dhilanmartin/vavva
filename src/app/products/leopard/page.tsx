import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NightLeopardPage } from "@/components/shop/NightLeopardPage";
import { isRouteLive } from "@/lib/site";

export const metadata: Metadata = { title: "Leopard — VAVVA" };

export default function LeopardRoute() {
  if (!isRouteLive("/products")) notFound();

  return (
    <main className="w-full bg-[var(--paper)] pb-24 pt-10 desktop:pt-16">
      <div className="vv-shop px-6">
        <NightLeopardPage />
      </div>
    </main>
  );
}
