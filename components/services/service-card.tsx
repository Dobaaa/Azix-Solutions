import Link from "next/link";
import { pplLeadPricing } from "@/lib/site-content";
import type { ServiceKey } from "@/lib/theme";

type ServiceCardProps = {
  service: {
    key: ServiceKey;
    title: string;
    description: string;
    detailedDescription: string;
    bullets: string[];
  };
  headingLevel?: "h2" | "h3";
  showPricing?: boolean;
};

export function ServiceCard({
  service,
  headingLevel = "h2",
  showPricing = false,
}: ServiceCardProps) {
  const Heading = headingLevel;

  return (
    <article className="card flex h-full flex-col p-6">
      <Heading className={headingLevel === "h3" ? "text-xl font-semibold" : "text-2xl font-bold"}>
        {service.title}
      </Heading>
      <p className="mt-3 text-[var(--color-muted)]">{service.description}</p>
      <p className="mt-4 text-sm leading-relaxed text-[var(--color-text)]">
        {service.detailedDescription}
      </p>
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--color-muted)]">
        {service.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      {showPricing && service.key === "ppl" ? (
        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
            Lead packages
          </p>
          <ul className="mt-2 space-y-2">
            {pplLeadPricing.map((tier) => (
              <li
                key={tier.leads}
                className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-accent)] px-3 py-2 text-sm"
              >
                <span>{tier.leads} leads</span>
                <span className="font-semibold text-[var(--color-text)]">{tier.priceLabel}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <Link
        href={`/order?service=${service.key}`}
        className="btn-outline mt-6 inline-flex w-fit"
      >
        {headingLevel === "h3" ? "Book this service" : "Book Now"}
      </Link>
    </article>
  );
}
