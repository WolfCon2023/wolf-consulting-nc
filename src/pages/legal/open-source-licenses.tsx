import { LicensesPage, generateLicensesMetadata } from "@wolfconsulting/legal-pages";
import { Seo } from "@/components/seo/seo";
import { legalConfig } from "@/lib/legal-config";

const meta = generateLicensesMetadata(legalConfig);

export function OpenSourceLicensesPage() {
  return (
    <>
      <Seo title="Open-Source Licenses" description={meta.description} path="/licenses" />
      <LicensesPage config={legalConfig} />
    </>
  );
}
