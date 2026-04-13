import type { Metadata } from "next";
import Image from "next/image";
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
      <section className="section pt-10">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Our Process</p>
            <h1 className="mt-3 text-balance text-5xl font-black leading-tight md:text-6xl">
              The blueprint to your growth.
            </h1>
            <p className="mt-4 max-w-xl text-[var(--color-muted)]">
              A precision-engineered onboarding journey designed to integrate
              seamless real estate support into your existing workflow within days.
            </p>
          </div>
          <div className="card relative h-[320px] overflow-hidden">
            <Image
              src="/assets/smiling-customer-service-representative.jpg"
              alt="Azix process planning"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <Section
        title="Precision in 3 Steps"
        description="A simple execution flow from planning to deployment."
        className="bg-[var(--color-accent)]"
        centered
      >
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[var(--color-primary)]" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <article key={step.title} className="card p-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--color-primary)] font-bold text-white">
                0{index + 1}
              </span>
              <h3 className="mt-4 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-[var(--color-muted)]">{step.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Ready to redesign your workflow?" className="pt-0">
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
