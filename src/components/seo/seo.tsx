import { Helmet } from "react-helmet-async";

import { defaultSeo } from "@/config/seo";
import { site } from "@/config/site";

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function Seo({
  title,
  description,
  path,
  image,
  noindex,
  jsonLd,
}: SeoProps) {
  const computedTitle = title
    ? defaultSeo.titleTemplate.replace("%s", title)
    : defaultSeo.title;

  const canonical = path
    ? new URL(path, defaultSeo.canonicalBase).toString()
    : defaultSeo.canonicalBase;

  const desc = description ?? defaultSeo.description;
  const ogImage = new URL(
    image ?? defaultSeo.ogImagePath,
    defaultSeo.canonicalBase,
  ).toString();

  return (
    <Helmet>
      <title>{computedTitle}</title>
      <link rel="canonical" href={canonical} />
      <meta name="description" content={desc} />
      {noindex ? <meta name="robots" content="noindex,nofollow" /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.legalName} />
      <meta property="og:title" content={computedTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={computedTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}
