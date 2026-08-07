import type { Metadata } from "next";
import { ProductGrid } from "@/components/shop/ProductGrid";

export const metadata: Metadata = { title: "Shop — VAVVA" };

export default function ShopPage() {
  return (
    <main className="w-full bg-[var(--paper)] px-4 pb-24 pt-10 md:px-5 tablet:px-6 tablet:pt-14">
      <div className="mx-auto max-w-[1710px]">
        <h1 className="mb-12 text-center font-serif text-[36px] font-normal tracking-[-0.02em] text-[var(--ink)] tablet:mb-16 desktop:text-[48px]">
          Shop
        </h1>
        <ProductGrid />
      </div>
    </main>
  );
}
