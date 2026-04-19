import { ServiceKey } from "@/lib/theme";

export const stats = [
  { value: "Revenue Generated", label: "Real Client Work Delivered" },
  { value: "Clients Reteantion", label: "Client Satisfaction Focused" },
  { value: "Leads  Processed", label: "High-Quality Solutions Delivered" },
  { value: "Average Ramp Time", label: "Fast & Optimized Performance" },
];

export const services: Array<{
  key: ServiceKey;
  title: string;
  shortTitle: string;
  description: string;
  bullets: string[];
}> = [
    {
      key: "ppl",
      title: "Pay Per Lead (PPL)",
      shortTitle: "PPL",
      description:
        "High-intent leads delivered directly to your CRM with strict quality checks.",
      bullets: ["Guaranteed delivery", "Market-specific targeting", "Fast launch"],
    },
    {
      key: "cold-calling",
      title: "Expert Cold Calling",
      shortTitle: "Cold Calling",
      description:
        "US-managed callers trained on objection handling and appointment setting.",
      bullets: ["Daily reports", "Script optimization", "Dedicated caller pods"],
    },
    {
      key: "virtual-assistant",
      title: "Virtual Assistant",
      shortTitle: "Virtual Assistant",
      description:
        "Admin and CRM support for investor teams that need operational speed.",
      bullets: ["Part-time or full-time", "Back-office workflows", "CRM management"],
    },
  ];

export const processSteps = [
  {
    title: "Select Service",
    text: "Pick the support model that best matches your growth goals.",
  },
  {
    title: "Customize Plan",
    text: "Define your market, staffing, and performance targets with our team.",
  },
  {
    title: "Scale Your Business",
    text: "Deploy quickly and focus on closings while we handle execution.",
  },
];
