import type { LegalConfig } from "@wolfconsulting/legal-pages";

export const legalConfig: LegalConfig = {
  company: {
    legalName: "Wolf Consulting Group, LLC",
    shortName: "Wolf Consulting Group",
    description:
      "an IT consulting firm that provides agile coaching, technology strategy, and engineering services",
  },
  contact: {
    privacyEmail: "contactWCG@wolfconsultingnc.com",
    legalEmail: "contactWCG@wolfconsultingnc.com",
    accessibilityEmail: "contactWCG@wolfconsultingnc.com",
    phone: "704-803-0934",
    mailingAddress: "Waxhaw, NC 28173",
  },
  governing: {
    state: "North Carolina",
    county: "Union",
  },
  effectiveDate: "January 7, 2026",
  features: {
    tcpaSection: false,
    childrenSection: true,
  },
  technologies: [
    "HTML, WAI-ARIA",
    "CSS (Tailwind CSS)",
    "JavaScript (React)",
  ],
  libraries: [
    { name: "React", version: "18.x", license: "MIT", homepage: "https://react.dev/" },
    { name: "React DOM", version: "18.x", license: "MIT", homepage: "https://react.dev/" },
    { name: "React Router", version: "6.x", license: "MIT", homepage: "https://reactrouter.com/" },
    { name: "React Helmet Async", version: "2.x", license: "Apache-2.0", homepage: "https://github.com/staylor/react-helmet-async" },
    { name: "Vite", version: "7.x", license: "MIT", homepage: "https://vite.dev/" },
    { name: "Tailwind CSS", version: "3.x", license: "MIT", homepage: "https://tailwindcss.com/" },
    { name: "Framer Motion", version: "12.x", license: "MIT", homepage: "https://www.framer.com/motion/" },
    { name: "Lucide React", version: "0.x", license: "ISC", homepage: "https://lucide.dev/" },
    { name: "Radix UI", version: "1.x", license: "MIT", homepage: "https://www.radix-ui.com/" },
    { name: "React Hook Form", version: "7.x", license: "MIT", homepage: "https://react-hook-form.com/" },
    { name: "Zod", version: "3.x", license: "MIT", homepage: "https://zod.dev/" },
    { name: "clsx", version: "2.x", license: "MIT", homepage: "https://github.com/lukeed/clsx" },
    { name: "tailwind-merge", version: "2.x", license: "MIT", homepage: "https://github.com/dcastil/tailwind-merge" },
    { name: "class-variance-authority", version: "0.x", license: "Apache-2.0", homepage: "https://cva.style/" },
  ],
};
