import { AccessibilityPage, generateAccessibilityMetadata } from "@wolfconsulting/legal-pages";
import { Seo } from "@/components/seo/seo";
import { legalConfig } from "@/lib/legal-config";

const meta = generateAccessibilityMetadata(legalConfig);

export function AccessibilityStatementPage() {
  return (
    <>
      <Seo title="Accessibility" description={meta.description} path="/accessibility" />
      <AccessibilityPage config={legalConfig} />
    </>
  );
}
