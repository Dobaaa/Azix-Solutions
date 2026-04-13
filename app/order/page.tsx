import type { Metadata } from "next";
import { OrderForm } from "@/components/order/order-form";

export const metadata: Metadata = {
  title: "Book Now",
  description: "Book PPL, cold calling, or virtual assistant support with Azix.",
};

export default function OrderPage() {
  return (
    <section className="section">
      <div className="container grid gap-8 lg:grid-cols-[340px_1fr]">
        <aside>
          <p className="eyebrow">Reserve Your Growth</p>
          <h1 className="mt-2 text-5xl font-black leading-tight">
            Precision real estate support.
          </h1>
          <p className="mt-4 text-[var(--color-muted)]">
            Select your service tier and define your requirements. Our architects
            design a tailored launch plan.
          </p>
          <div className="card mt-8 p-5 text-sm text-[var(--color-muted)]">
            <p className="font-semibold text-[var(--color-text)]">Vetted Quality</p>
            <p className="mt-1">
              Every lead and operator goes through strict validation before delivery.
            </p>
            <p className="mt-4 font-semibold text-[var(--color-text)]">Rapid Deployment</p>
            <p className="mt-1">Onboarding starts within 48 hours for qualified accounts.</p>
          </div>
        </aside>
        <OrderForm />
      </div>
    </section>
  );
}
