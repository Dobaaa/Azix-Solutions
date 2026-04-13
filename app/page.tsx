import Link from "next/link";
import { Section } from "@/components/layout/section";
import { processSteps, services, stats } from "@/lib/site-content";

export default function Home() {
  return (
    <>
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Architectural Precision in Cold Calling</p>
            <h1 className="mt-3 text-balance text-4xl font-black leading-tight md:text-6xl">
              Precision-engineered support to scale your real estate pipeline.
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
          <div className="card h-[320px] bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center" />
        </div>
      </section>

      <section className="bg-[var(--color-dark)] py-8 text-white">
        <div className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
        title="Precision in 3 steps"
        description="Transparent process from strategy to deployment."
        className="bg-[var(--color-accent)]"
      >
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <article key={step.title} className="card p-6">
              <p className="text-sm font-semibold text-[var(--color-primary)]">
                0{index + 1}
              </p>
              <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{step.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Scale your portfolio with structural certainty.">
        <div className="card flex flex-col items-center justify-between gap-6 bg-[var(--color-dark)] p-8 text-center text-white md:flex-row md:text-left">
          <p className="max-w-2xl text-lg text-blue-100">
            Join top investor teams that rely on Azix for repeatable growth systems.
          </p>
          <Link href="/order" className="btn-primary">
            Book Your Audit
          </Link>
        </div>
      </Section>
    </>
  );
}
