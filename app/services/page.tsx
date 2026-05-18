import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { PplPricing } from "@/components/services/ppl-pricing";
import { ServiceCard } from "@/components/services/service-card";
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
            <ServiceCard key={service.key} service={service} />
          ))}
        </div>
        <div className="mt-10">
          <PplPricing />
        </div>
      </Section>
      <Section title="Need a custom operating model?">
        <div className="card mt-4 p-6 md:p-8">
          <p className="text-[var(--color-muted)]">
            We can mix service tiers across lead generation, calling, and back-office
            support into a single delivery workflow.
          </p>
        </div>
      </Section>
    </>
  );
}
