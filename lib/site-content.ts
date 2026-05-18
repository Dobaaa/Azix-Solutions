import { ServiceKey } from "@/lib/theme";

export const stats = [
  { value: "Revenue Generated", label: "Real Client Work Delivered" },
  { value: "Clients Reteantion", label: "Client Satisfaction Focused" },
  { value: "Leads  Processed", label: "High-Quality Solutions Delivered" },
  { value: "Average Ramp Time", label: "Fast & Optimized Performance" },
];

export const pplLeadPricing = [
  { leads: 20, priceLabel: "$500" },
  { leads: 40, priceLabel: "$1,000" },
  { leads: 100, priceLabel: "$1,899" },
] as const;

export const services: Array<{
  key: ServiceKey;
  title: string;
  shortTitle: string;
  description: string;
  detailedDescription: string;
  bullets: string[];
}> = [
  {
    key: "ppl",
    title: "Pay Per Lead (PPL)",
    shortTitle: "PPL",
    description:
      "Motivated seller leads delivered to your team—you only pay for qualified opportunities.",
    detailedDescription:
      "Our Pay Per Lead service is designed for investors and real estate businesses looking for motivated seller leads without paying hourly rates. We generate and qualify leads based on your target market and criteria, then deliver verified opportunities directly to your team. You only pay for qualified leads, making it a cost-effective and results-driven solution for scaling your business.",
    bullets: [
      "Market-specific targeting",
      "Verified motivated sellers",
      "Pay only for qualified leads",
    ],
  },
  {
    key: "cold-calling",
    title: "Expert Cold Calling",
    shortTitle: "Cold Calling",
    description:
      "Experienced callers who generate motivated seller leads and book acquisitions appointments.",
    detailedDescription:
      "We provide experienced cold callers with strong communication and sales skills to help generate motivated seller leads. Our callers reach out to property owners, build rapport, qualify leads, gather property details, and schedule appointments for acquisitions teams. We focus on professionalism, consistency, and high-quality conversations that help increase conversion opportunities.",
    bullets: [
      "Motivated seller outreach",
      "Lead qualification & scheduling",
      "Daily reporting & consistency",
    ],
  },
  {
    key: "virtual-assistant",
    title: "Virtual Assistant",
    shortTitle: "Virtual Assistant",
    description:
      "Trained VAs for CRM, follow-ups, scheduling, and day-to-day real estate operations.",
    detailedDescription:
      "Our Virtual Assistants are trained to support real estate businesses with daily operational tasks such as CRM management, lead follow-ups, appointment scheduling, data entry, email handling, and administrative support. We help business owners save time, stay organized, and focus on closing more deals while we handle the backend operations professionally and efficiently.",
    bullets: [
      "CRM & lead follow-ups",
      "Scheduling & data entry",
      "Email & admin support",
    ],
  },
];

export function getServiceByKey(key: ServiceKey) {
  return services.find((service) => service.key === key);
}

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
