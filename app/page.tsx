import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { HeroBackground } from "@/components/home/hero-background";
import { services, stats } from "@/lib/site-content";

export default function Home() {
  return (
    <>
      <section className="section relative overflow-hidden" data-animate="reveal" data-stagger="true">
        <HeroBackground />
        <div className="container relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="py-6">
            <p className="eyebrow">Precision-engineered support to scale your real estate pipeline.
            </p>
            <h1 className="mt-3 text-balance text-4xl font-black leading-tight md:text-6xl">
              Architectural <span className="text-[var(--color-primary)]">Precision</span> in Cold Calling
            </h1>
            <p className="mt-4 max-w-xl text-[var(--color-muted)]">
              We build support infrastructure that helps investors close faster with
              cleaner systems and better lead conversion.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/order" className="btn-primary">
                Initialize Campaign
              </Link>
              <Link href="/services" className="btn-outline">
                See Services
              </Link>
            </div>
          </div>
          <div className="card ml-auto w-full max-w-[300px] p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
              Available Slots
            </p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Next onboarding window opens in 48 hours.
            </p>
            <Link href="/order" className="btn-primary mt-4 w-full">
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-dark)] py-8 text-white" data-animate="reveal" data-stagger="true">
        <div className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center ">
          {stats.map((item) => (
            <div key={item.label}>
              <p className="text-3xl font-bold">{item.value}</p>
              <p className="text-sm text-blue-100">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Section
        eyebrow="Elite Support Verticals"
        title="Built for scale and conversion."
        description="Choose from core services designed for investor pipelines."
      >
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.key} className="card p-6">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {service.description}
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--color-muted)]">
                {service.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="The Blueprint"
        title="Built on the principles of precision engineering"
        description="Process control, clear data flow, and private operating standards."
      >
        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-center">
          <div className="card relative h-[340px] overflow-hidden">
            <Image
              src="/assets/smiling-customer-service-representative.jpg"
              alt="Precision operations"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <ul className="space-y-4">
              <li className="card p-4">
                <p className="font-semibold">Accuracy at Scale</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  Unified workflows keep every lead and interaction measurable.
                </p>
              </li>
              <li className="card p-4">
                <p className="font-semibold">Data-Driven Execution</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  Daily reporting enables quick optimization and cleaner handoffs.
                </p>
              </li>
              <li className="card p-4">
                <p className="font-semibold">Private Controls</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  Confidential process design tailored to your acquisition model.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Client Success"
        title="The portfolio of winners"
        className="bg-[var(--color-dark)] text-white"
      >
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-[var(--radius-card)] border border-white/15 bg-white/5 p-6">
            <p className="text-lg leading-relaxed text-blue-100">
              &ldquo;Azix didn&apos;t give us leads; they gave us a growth
              infrastructure.&rdquo;
            </p>
            <p className="mt-4 text-sm font-semibold">Sales Team Lead</p>
          </article>
          <article className="rounded-[var(--radius-card)] border border-white/15 bg-white/5 p-6">
            <p className="text-lg leading-relaxed text-blue-100">
              &ldquo;The quality of leads and system clarity cut our ramp-up time in
              half.&rdquo;
            </p>
            <p className="mt-4 text-sm font-semibold">Founder, Investment Group</p>
          </article>
        </div>
      </Section>

      <Section title="Scale your portfolio with structural certainty.">
        <div className="card mt-4  flex flex-col items-center justify-between gap-6 bg-[var(--color-accent)] p-8 text-center md:flex-row md:text-left">
          <p className="max-w-2xl text-lg text-[var(--color-muted)]">
            Join top investor teams that rely on Azix for repeatable growth systems.
          </p>
          <div className="flex gap-3">
            <Link href="/order" className="btn-primary">
              Book Your Audit
            </Link>
            <Link href="/services" className="btn-outline">
              View Pricing Plans
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
