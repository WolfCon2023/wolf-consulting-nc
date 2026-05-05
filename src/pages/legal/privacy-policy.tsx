import { PrivacyPage, generatePrivacyMetadata } from "@wolfconsulting/legal-pages";
import { Seo } from "@/components/seo/seo";
import { legalConfig } from "@/lib/legal-config";

const meta = generatePrivacyMetadata(legalConfig);

export function PrivacyPolicyPage() {
  return (
    <>
      <Seo title="Privacy Policy" description={meta.description} path="/privacy" />
      <PrivacyPage config={legalConfig} />
    </>
  );
}
