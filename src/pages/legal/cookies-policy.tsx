import { CookiesPage, generateCookiesMetadata } from "@wolfconsulting/legal-pages";
import { Seo } from "@/components/seo/seo";
import { legalConfig } from "@/lib/legal-config";

const meta = generateCookiesMetadata(legalConfig);

export function CookiesPolicyPage() {
  return (
    <>
      <Seo title="Cookies Policy" description={meta.description} path="/cookies" />
      <CookiesPage config={legalConfig} />
    </>
  );
}
