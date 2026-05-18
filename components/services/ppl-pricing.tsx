import { pplLeadPricing } from "@/lib/site-content";

type PplPricingProps = {
  compact?: boolean;
};

export function PplPricing({ compact = false }: PplPricingProps) {
  return (
    <div className={compact ? "" : "card p-6"}>
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
        Pay Per Lead pricing
      </p>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        Transparent packages—pay only for qualified motivated seller leads.
      </p>
      <ul className={`grid gap-3 ${compact ? "mt-3" : "mt-5 sm:grid-cols-3"}`}>
        {pplLeadPricing.map((tier) => (
          <li
            key={tier.leads}
            className="flex flex-col items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-accent)] px-4 py-4 text-center"
          >
            <span className="text-2xl font-black text-[var(--color-primary)]">
              {tier.priceLabel}
            </span>
            <span className="mt-1 text-sm font-semibold text-[var(--color-text)]">
              {tier.leads} leads
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
