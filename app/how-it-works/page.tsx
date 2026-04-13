import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { processSteps } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Three-step process to deploy real estate support within days.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Section
        eyebrow="Our Process"
        title="The blueprint to your growth."
        description="A precision process that integrates support systems into your current workflow."
      >
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <article key={step.title} className="card p-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--color-primary)] font-bold text-white">
                0{index + 1}
              </span>
              <h2 className="mt-4 text-2xl font-semibold">{step.title}</h2>
              <p className="mt-3 text-[var(--color-muted)]">{step.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="card bg-[var(--color-dark)] p-8 text-center text-white">
          <h2 className="text-3xl font-bold">Ready to redesign your workflow?</h2>
          <p className="mt-2 text-blue-100">
            Start with a tailored audit call and we will map your support architecture.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/order" className="btn-primary">
              Book Your Audit
            </Link>
            <Link href="/services" className="btn-outline border-white text-white">
              View Services
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
