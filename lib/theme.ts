export const siteConfig = {
  name: "Azix Solutions",
  description:
    "Precision-engineered real estate support for investors and operators.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://azixsolutions.com",
};

export const theme = {
  colors: {
    bg: "#F7FAFF",
    surface: "#FFFFFF",
    text: "#0B1A36",
    mutedText: "#5B6781",
    primary: "#0A66E8",
    primaryDark: "#094CB1",
    dark: "#071A3A",
    border: "#D8E4FF",
    accent: "#EAF2FF",
  },
  spacing: {
    sectionY: "5.5rem",
    containerX: "1.25rem",
    cardRadius: "1rem",
    buttonRadius: "0.65rem",
  },
} as const;

export type ServiceKey = "ppl" | "cold-calling" | "virtual-assistant";
