# @wolfconsulting/legal-pages

Configurable legal page components for React/Next.js applications. Provides complete, professionally structured pages for Privacy Policy, Cookies Policy, Terms of Use, Accessibility Statement, and Open-Source Licenses.

Built by **Wolf Consulting Group, LLC**.

## Features

- Five complete legal pages with consistent layout and navigation
- Configurable company name, contact info, jurisdiction, and effective date
- Theme-aware styling (light + dark mode via Tailwind `dark:` variants)
- Shared sticky sidebar table-of-contents navigation
- Next.js metadata generators for SEO
- Optional TCPA/SMS consent section (Terms)
- Optional Children's Privacy section (Privacy)
- Customizable technology list (Accessibility) and OSS library table (Licenses)
- Zero runtime dependencies beyond React and Next.js

## Installation

Add as a local dependency in your project's `package.json`:

```json
"@wolfconsulting/legal-pages": "file:./packages/legal-pages"
```

Then run:

```bash
npm install
```

### Tailwind Content Scan

The package uses Tailwind utility classes. Add the package to your Tailwind content configuration so the classes are included in your build:

**Tailwind v4 (CSS-first):**

```css
@source "../packages/legal-pages/dist";
```

**Tailwind v3 (JS config):**

```js
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./packages/legal-pages/dist/**/*.{js,mjs}",
  ],
};
```

## Quick Start

### 1. Create a shared config file

```tsx
// src/lib/legal-config.ts
import type { LegalConfig } from "@wolfconsulting/legal-pages";

export const legalConfig: LegalConfig = {
  company: {
    legalName: "Acme Corp, Inc.",
    shortName: "Acme",
    description: "a technology company that builds modern web applications",
  },
  contact: {
    privacyEmail: "privacy@acme.com",
    legalEmail: "legal@acme.com",
    accessibilityEmail: "accessibility@acme.com",
    phone: "(555) 123-4567",
    mailingAddress: "123 Main St, Suite 100, Charlotte, NC 28202",
  },
  governing: {
    state: "North Carolina",
    county: "Mecklenburg",
  },
  effectiveDate: "January 1, 2026",
  features: {
    tcpaSection: true,
    childrenSection: true,
  },
  technologies: ["HTML, WAI-ARIA", "CSS (Tailwind CSS)", "JavaScript (React/Next.js)"],
  libraries: [
    { name: "Next.js", version: "15.x", license: "MIT", homepage: "https://nextjs.org/" },
    { name: "React", version: "19.x", license: "MIT", homepage: "https://react.dev/" },
    { name: "Tailwind CSS", version: "4.x", license: "MIT", homepage: "https://tailwindcss.com/" },
  ],
};
```

### 2. Create each legal page route (~5 lines each)

```tsx
// src/app/privacy/page.tsx
import { PrivacyPage, generatePrivacyMetadata } from "@wolfconsulting/legal-pages";
import { legalConfig } from "@/lib/legal-config";

export const metadata = generatePrivacyMetadata(legalConfig);
export default function Page() {
  return <PrivacyPage config={legalConfig} />;
}
```

```tsx
// src/app/cookies/page.tsx
import { CookiesPage, generateCookiesMetadata } from "@wolfconsulting/legal-pages";
import { legalConfig } from "@/lib/legal-config";

export const metadata = generateCookiesMetadata(legalConfig);
export default function Page() {
  return <CookiesPage config={legalConfig} />;
}
```

```tsx
// src/app/terms/page.tsx
import { TermsPage, generateTermsMetadata } from "@wolfconsulting/legal-pages";
import { legalConfig } from "@/lib/legal-config";

export const metadata = generateTermsMetadata(legalConfig);
export default function Page() {
  return <TermsPage config={legalConfig} />;
}
```

```tsx
// src/app/accessibility/page.tsx
import { AccessibilityPage, generateAccessibilityMetadata } from "@wolfconsulting/legal-pages";
import { legalConfig } from "@/lib/legal-config";

export const metadata = generateAccessibilityMetadata(legalConfig);
export default function Page() {
  return <AccessibilityPage config={legalConfig} />;
}
```

```tsx
// src/app/licenses/page.tsx
import { LicensesPage, generateLicensesMetadata } from "@wolfconsulting/legal-pages";
import { legalConfig } from "@/lib/legal-config";

export const metadata = generateLicensesMetadata(legalConfig);
export default function Page() {
  return <LicensesPage config={legalConfig} />;
}
```

## Configuration Reference

```typescript
interface LegalConfig {
  company: {
    legalName: string;           // Full legal entity name
    shortName: string;           // Short display name
    description: string;         // Brief org description (used in Privacy overview)
  };
  contact: {
    privacyEmail: string;        // Email for privacy inquiries
    legalEmail: string;          // Email for legal/terms inquiries
    accessibilityEmail: string;  // Email for accessibility feedback
    phone?: string;              // Optional phone number
    mailingAddress?: string;     // Optional postal address
  };
  governing: {
    state: string;               // State for governing law clause
    county: string;              // County for venue clause
  };
  effectiveDate: string;         // Displayed on all pages
  features?: {
    tcpaSection?: boolean;       // Include TCPA/SMS section in Terms (default: false)
    childrenSection?: boolean;   // Include Children's Privacy in Privacy (default: true)
  };
  technologies?: string[];       // Tech stack for Accessibility page
  libraries?: Library[];         // OSS table for Licenses page
}

interface Library {
  name: string;
  version?: string;
  license: string;
  homepage?: string;
}
```

## Advanced: Custom Pages with LegalPageLayout

For pages not covered by the built-in components, use the shared layout directly:

```tsx
import { LegalPageLayout, LegalDisclaimer } from "@wolfconsulting/legal-pages";

export default function CustomLegalPage() {
  return (
    <LegalPageLayout
      eyebrow="Policy"
      title="Data Processing Agreement"
      subtitle="Our DPA for enterprise customers."
      effectiveDate="January 1, 2026"
      sections={[
        { id: "scope", label: "Scope" },
        { id: "obligations", label: "Obligations" },
      ]}
    >
      <section id="scope">
        <h2>Scope</h2>
        <p>...</p>
      </section>
      <section id="obligations">
        <h2>Obligations</h2>
        <p>...</p>
      </section>
      <LegalDisclaimer />
    </LegalPageLayout>
  );
}
```

## Peer Dependencies

- `react` >= 18
- `react-dom` >= 18
- `next` >= 13

## Styling

All components use standard Tailwind CSS utility classes with `dark:` variants for theme support. The consumer's Tailwind build must include the package in its content scan (see installation above). No separate CSS import is required.

The pages work with any Tailwind project using class-based dark mode (`darkMode: "class"` or Tailwind v4 `@custom-variant dark`).

## License

Proprietary. See [LICENSE](./LICENSE) for details.
