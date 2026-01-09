import { Helmet } from "react-helmet-async";

import { useCookieConsent } from "@/hooks/use-cookie-consent";

export function Analytics() {
  const ga4Id = import.meta.env.VITE_GA4_ID as string | undefined;
  const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as
    | string
    | undefined;

  const { allowAnalytics } = useCookieConsent();

  if (!ga4Id && !plausibleDomain) return null;
  if (!allowAnalytics) return null;

  return (
    <Helmet>
      {plausibleDomain ? (
        <script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
        />
      ) : null}

      {ga4Id ? (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} />
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}');
            `}
          </script>
        </>
      ) : null}
    </Helmet>
  );
}


