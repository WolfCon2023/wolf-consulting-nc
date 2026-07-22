import { site } from "@/config/site";

export const defaultSeo = {
  title: site.legalName,
  titleTemplate: `%s | ${site.legalName}`,
  description:
    "Wolf Consulting Group builds purpose-built software for clinics, accounting firms, and operators — plus agile coaching and IT strategy that stick.",
  canonicalBase: site.url,
  ogImagePath: "/og-image.png",
} as const;
