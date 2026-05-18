import { getServiceByKey, pplLeadPricing } from "@/lib/site-content";
import type { ServiceKey } from "@/lib/theme";

type ServiceSummaryProps = {
  serviceKey: ServiceKey;
};

export function ServiceSummary({ serviceKey }: ServiceSummaryProps) {
  const service = getServiceByKey(serviceKey);
  if (!service) return null;

  return (
    <div className="mb-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-accent)] p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
        About this service
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text)]">
        {service.detailedDescription}
      </p>
      {serviceKey === "ppl" ? (
        <div className="mt-4">
          <p className="text-xs font-semibold text-[var(--color-muted)]">Lead packages</p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-3">
            {pplLeadPricing.map((tier) => (
              <li
                key={tier.leads}
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-center text-sm"
              >
                <span className="block font-bold text-[var(--color-primary)]">
                  {tier.priceLabel}
                </span>
                <span className="text-[var(--color-muted)]">{tier.leads} leads</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
