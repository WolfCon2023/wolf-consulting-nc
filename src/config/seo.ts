import { site } from "@/config/site";

export const defaultSeo = {
  title: site.legalName,
  titleTemplate: `%s | ${site.legalName}`,
  description:
    "Agile coaching, IT consulting, technology strategy, and engineering services tailored to your organization.",
  canonicalBase: site.url,
} as const;



