import { TermsPage, generateTermsMetadata } from "@wolfconsulting/legal-pages";
import { Seo } from "@/components/seo/seo";
import { legalConfig } from "@/lib/legal-config";

const meta = generateTermsMetadata(legalConfig);

export function TermsOfUsePage() {
  return (
    <>
      <Seo title="Terms of Use" description={meta.description} path="/terms" />
      <TermsPage config={legalConfig} />
    </>
  );
}
