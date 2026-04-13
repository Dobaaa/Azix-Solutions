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

export function OrderForm() {
  const [service, setService] = useState<ServiceType>("ppl");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

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
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, service }),
      });
      if (!res.ok) throw new Error("submission failed");
      setStatus("success");
      reset({ service, tasksNeeded: [] });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="card p-5 md:p-8">
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

        {status === "success" ? (
          <p className="text-sm text-green-700">Thanks! Your request was received.</p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-red-700">
            Something went wrong. Please try again or contact us directly.
          </p>
        ) : null}
      </form>
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
