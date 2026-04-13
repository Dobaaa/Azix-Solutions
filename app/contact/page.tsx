import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Azix Solutions for custom real estate support systems.",
};

export default function ContactPage() {
  return (
    <Section
      eyebrow="Contact"
      title="Let us architect your support stack."
      description="Share your goals and we will respond with a tailored operating plan."
    >
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-2xl font-semibold">Email Us</h2>
          <p className="mt-3 text-[var(--color-muted)]">
            Reach us directly for partnerships or custom delivery questions.
          </p>
          <a
            href="mailto:hello@azixsolutions.com"
            className="mt-5 inline-flex text-lg font-semibold text-[var(--color-primary)]"
          >
            hello@azixsolutions.com
          </a>
        </div>
        <div className="card flex flex-col items-start justify-between p-6">
          <div>
            <h2 className="text-2xl font-semibold">Need Immediate Launch?</h2>
            <p className="mt-3 text-[var(--color-muted)]">
              Use our booking form to submit service details and get fast onboarding.
            </p>
          </div>
          <Link href="/order" className="btn-primary mt-6">
            Book Now
          </Link>
        </div>
      </div>
    </Section>
  );
}
