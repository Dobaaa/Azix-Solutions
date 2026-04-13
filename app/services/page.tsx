import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { services } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Services",
  description: "PPL, cold calling, and virtual assistant support for investors.",
};

export default function ServicesPage() {
  return (
    <>
      <Section
        eyebrow="Support Systems"
        title="Precision-engineered real estate support."
        description="We architect service layers that remove execution bottlenecks."
      >
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.key} className="card p-6">
              <h2 className="text-2xl font-bold">{service.title}</h2>
              <p className="mt-3 text-[var(--color-muted)]">{service.description}</p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--color-muted)]">
                {service.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <Link href="/order" className="btn-outline mt-6 inline-flex">
                Order Now
              </Link>
            </article>
          ))}
        </div>
      </Section>
      <Section title="Need a custom operating model?">
        <div className="card p-6 md:p-8">
          <p className="text-[var(--color-muted)]">
            We can mix service tiers across lead generation, calling, and back-office
            support into a single delivery workflow.
          </p>
        </div>
      </Section>
    </>
  );
}
