import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Finalize sua compra sem criar conta.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
        Checkout
      </h1>
      <p className="mt-2 text-sm text-neutral-600">
        Uma etapa, sem login obrigatório.
      </p>
      <div className="mt-8">
        <Suspense
          fallback={
            <div className="h-40 animate-pulse rounded-2xl bg-neutral-200/80" />
          }
        >
          <CheckoutForm />
        </Suspense>
      </div>
    </div>
  );
}
