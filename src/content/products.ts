export type Product = {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  audience: string;
  problem: string;
  highlights: string[];
  /** CSS color for product accent (used in cards/strip) */
  accent: string;
  preview: string[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export const products: Product[] = [
  {
    name: "BOAZ-OS",
    slug: "boaz-os",
    tagline: "Your back office, unified.",
    audience: "Small to mid-size operators who outgrew spreadsheets and disconnected tools.",
    problem: "CRM, scheduling, projects, and contracts live in separate apps — so nobody has a single source of truth.",
    description:
      "BOAZ-OS is Wolf Consulting Group's modern back-office application suite built to help small to medium businesses centralize operations, improve visibility, and reduce reliance on disconnected tools.",
    highlights: [
      "CRM and customer visibility",
      "Scheduling and calendar coordination",
      "Project and work management",
      "Contracts and service tracking",
      "Analytics and operational insight",
    ],
    accent: "#1e3a5f",
    preview: ["Customers", "Schedule", "Projects", "Contracts"],
    primaryCta: {
      label: "Try interactive demo",
      href: "https://boaz-web-demo-production.up.railway.app/",
    },
    secondaryCta: {
      label: "Request a walkthrough",
      href: "/contact",
    },
  },
  {
    name: "OptiAlign",
    slug: "optialign",
    tagline: "Practice management built for chiropractic clinics.",
    audience: "Clinic owners, front desk, providers, and billing teams.",
    problem: "Patients, schedule, notes, and claims don’t share one workspace — so visits slow down and revenue leaks.",
    description:
      "OptiAlign is Wolf Consulting Group's cloud-based chiropractic practice management platform for individual offices, multi-provider clinics, and multi-location organizations — patients, scheduling, clinical notes, billing, and communications in one workspace.",
    highlights: [
      "Patient directory and longitudinal charts",
      "Multi-provider scheduling and appointment requests",
      "SOAP notes and clinical worklists",
      "Claims, remittances, and A/R tracking",
      "Reminders, campaigns, and practice analytics",
    ],
    accent: "#0d9488",
    preview: ["Patients", "Schedule", "Clinical", "Billing"],
    primaryCta: {
      label: "Try interactive demo",
      href: "https://optialign-demo-production.up.railway.app/",
    },
    secondaryCta: {
      label: "Request a walkthrough",
      href: "/contact",
    },
  },
  {
    name: "LedgerOS",
    slug: "ledgeros",
    tagline: "Professional accounting OS for modern firms.",
    audience: "Accounting firms, bookkeepers, tax pros, and fractional CFOs.",
    problem: "Multi-client books, AR/AP, bank rec, and tax live in silos — so closes drag and compliance slips.",
    description:
      "LedgerOS is Wolf Consulting Group's multi-client accounting platform for firms — chart of accounts, general ledger, AR/AP, bank reconciliation, tax preparation, compliance, documents, and audit trail in one workspace.",
    highlights: [
      "Multi-client firm workspace with client switching",
      "Full books: CoA, general ledger, and bank rec",
      "Invoices, bills, expenses, and payments",
      "Tax preparation and compliance tracking",
      "Reports, documents, tasks, and audit logs",
    ],
    accent: "#0b7a71",
    preview: ["Clients", "Ledger", "Invoices", "Tax"],
    primaryCta: {
      label: "Try interactive demo",
      href: "https://ledgeros-demo-production.up.railway.app/",
    },
    secondaryCta: {
      label: "Request a walkthrough",
      href: "/contact",
    },
  },
];
