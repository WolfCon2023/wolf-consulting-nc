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
];
