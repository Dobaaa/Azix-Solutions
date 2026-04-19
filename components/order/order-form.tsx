"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";

type ServiceType = "ppl" | "cold-calling" | "virtual-assistant";

type FormData = {
  service: ServiceType;
  fullName: string;
  email: string;
  leadsRequired?: string;
  targetMarket?: string;
  sqftRange?: string;
  bedBathCount?: string;
  propertyCondition?: string;
  callersNeeded?: string;
  hoursPerDay?: string;
  propertyTypeFocus?: string;
  tasksNeeded?: string[];
  hoursPerWeek?: string;
  crmPlatform?: string;
  notes?: string;
};

const tabs: Array<{ key: ServiceType; label: string }> = [
  { key: "ppl", label: "PPL (Pay Per Lead)" },
  { key: "cold-calling", label: "Cold Calling" },
  { key: "virtual-assistant", label: "Virtual Assistant" },
];

const taskOptions = [
  "Lead management",
  "Follow-up coordination",
  "CRM updates",
  "Appointment scheduling",
  "Inbox and admin",
];

const SUPPORT_EMAIL = "support@azixsolutions.com";

export function OrderForm() {
  const [service, setService] = useState<ServiceType>("ppl");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [modal, setModal] = useState<"success" | "error" | null>(null);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { service: "ppl", tasksNeeded: [] },
  });

  const title = useMemo(
    () => tabs.find((tab) => tab.key === service)?.label ?? "Service",
    [service],
  );

  async function onSubmit(values: FormData) {
    try {
      setStatus("submitting");
      setServerMessage(null);
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, service }),
      });

      let data: { ok?: boolean; error?: string } = {};
      try {
        data = (await res.json()) as typeof data;
      } catch {
        data = {};
      }

      const ok = res.ok && data.ok !== false;

      if (ok) {
        setStatus("success");
        reset({ service, tasksNeeded: [] });
        setModal("success");
      } else {
        setStatus("error");
        setServerMessage(typeof data.error === "string" ? data.error : null);
        setModal("error");
      }
    } catch {
      setStatus("error");
      setServerMessage(null);
      setModal("error");
    }
  }

  function closeModal() {
    setModal(null);
    setServerMessage(null);
    setStatus("idle");
  }

  return (
    <div className="card relative p-5 md:p-8">
      <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setService(tab.key)}
            className={`tab-btn ${service === tab.key ? "tab-btn-active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <h2 className="mb-1 text-2xl font-bold">Book {title}</h2>
      <p className="mb-6 text-sm text-[var(--color-muted)]">
        Fill details below and we will design your launch plan.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Full Name" required {...register("fullName", { required: true })} />
          <Input
            type="email"
            label="Work Email"
            required
            {...register("email", { required: true })}
          />
        </div>

        {service === "ppl" && (
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Leads Required" {...register("leadsRequired")} />
            <Input label="Target State/Market" {...register("targetMarket")} />
            <Input label="Sqft Range (Min - Max)" {...register("sqftRange")} />
            <Input label="Bed/Bath Count" {...register("bedBathCount")} />
            <Select
              label="Property Condition"
              options={["Distressed", "Turnkey", "Fixer Upper", "Any"]}
              {...register("propertyCondition")}
            />
          </div>
        )}

        {service === "cold-calling" && (
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Target Market & Location" {...register("targetMarket")} />
            <Select
              label="Number of Callers"
              options={["1", "2", "3", "4+"]}
              {...register("callersNeeded")}
            />
            <Select
              label="Hours Per Day"
              options={["4", "6", "8", "Custom"]}
              {...register("hoursPerDay")}
            />
            <Input
              label="Property Type Focus"
              placeholder="Motivated sellers, pre-foreclosures..."
              {...register("propertyTypeFocus")}
            />
          </div>
        )}

        {service === "virtual-assistant" && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="field-label">Tasks Needed</label>
              <div className="mt-2 space-y-2 rounded-lg border border-[var(--color-border)] p-3">
                {taskOptions.map((task) => (
                  <label key={task} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      value={task}
                      {...register("tasksNeeded")}
                      className="h-4 w-4"
                    />
                    {task}
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Select
                label="Hours Per Week"
                options={["Part-time", "Full-time", "Custom"]}
                {...register("hoursPerWeek")}
              />
              <Input label="CRM Platform" {...register("crmPlatform")} />
            </div>
          </div>
        )}

        <div>
          <label className="field-label">Additional Notes</label>
          <textarea
            rows={4}
            {...register("notes")}
            className="field mt-2 w-full resize-y"
            placeholder="Describe requirements, preferences, or script notes..."
          />
        </div>

        <button type="submit" className="btn-primary w-full" disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting..." : "Initialize Campaign"}
        </button>
      </form>

      {modal ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            className="card relative max-w-md border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl"
          >
            {modal === "success" ? (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-2xl">
                  ✓
                </div>
                <h3 id="booking-modal-title" className="mt-4 text-xl font-bold">
                  Submission successful
                </h3>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  Your booking request was received and confirmed by our server. Our team will
                  contact you shortly.
                </p>
              </>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15 text-2xl">
                  !
                </div>
                <h3 id="booking-modal-title" className="mt-4 text-xl font-bold">
                  We couldn&apos;t complete your submission
                </h3>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  A technical issue occurred while processing your request. Please try again
                  later, or email us below and we&apos;ll help you right away.
                </p>
                {serverMessage ? (
                  <p className="mt-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-accent)] px-3 py-2 font-mono text-xs text-[var(--color-text)]">
                    {serverMessage}
                  </p>
                ) : null}
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=Azix%20booking%20issue`}
                  className="mt-4 inline-flex text-sm font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline"
                >
                  {SUPPORT_EMAIL}
                </a>
              </>
            )}
            <button type="button" className="btn-primary mt-6 w-full" onClick={closeModal}>
              OK
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function Input({ label, ...props }: InputProps) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <input {...props} className="field mt-2 w-full" />
    </label>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: string[];
};

function Select({ label, options, ...props }: SelectProps) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <select {...props} className="field mt-2 w-full">
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
