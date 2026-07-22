export type Product = {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  highlights: string[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export const products: Product[] = [
  {
    name: "BOAZ-OS",
    slug: "boaz-os",
    tagline: "Your back office, unified.",
    description:
      "BOAZ-OS is Wolf Consulting Group's modern back-office application suite built to help small to medium businesses centralize operations, improve visibility, and reduce reliance on disconnected tools.",
    highlights: [
      "CRM and customer visibility",
      "Scheduling and calendar coordination",
      "Project and work management",
      "Contracts and service tracking",
      "Analytics and operational insight",
    ],
    primaryCta: {
      label: "View Demo",
      href: "https://boaz-web-demo-production.up.railway.app/",
    },
    secondaryCta: {
      label: "Request a Walkthrough",
      href: "/contact",
    },
  },
  {
    name: "OptiAlign",
    slug: "optialign",
    tagline: "Practice management built for chiropractic clinics.",
    description:
      "OptiAlign is Wolf Consulting Group's cloud-based chiropractic practice management platform for individual offices, multi-provider clinics, and multi-location organizations — patients, scheduling, clinical notes, billing, and communications in one workspace.",
    highlights: [
      "Patient directory and longitudinal charts",
      "Multi-provider scheduling and appointment requests",
      "SOAP notes and clinical worklists",
      "Claims, remittances, and A/R tracking",
      "Reminders, campaigns, and practice analytics",
    ],
    primaryCta: {
      label: "View Demo",
      href: "https://optialign-demo-production.up.railway.app/",
    },
    secondaryCta: {
      label: "Request a Walkthrough",
      href: "/contact",
    },
  },
];
