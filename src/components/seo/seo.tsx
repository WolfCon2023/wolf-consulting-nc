import { Helmet } from "react-helmet-async";

import { defaultSeo } from "@/config/seo";

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function Seo({ title, description, path, noindex, jsonLd }: SeoProps) {
  const computedTitle = title
    ? defaultSeo.titleTemplate.replace("%s", title)
    : defaultSeo.title;

  const canonical = path
    ? new URL(path, defaultSeo.canonicalBase).toString()
    : defaultSeo.canonicalBase;

  return (
    <Helmet>
      <title>{computedTitle}</title>
      <link rel="canonical" href={canonical} />
      {description ? (
        <meta name="description" content={description} />
      ) : (
        <meta name="description" content={defaultSeo.description} />
      )}
      {noindex ? <meta name="robots" content="noindex,nofollow" /> : null}
      {jsonLd ? (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      ) : null}
    </Helmet>
  );
}



