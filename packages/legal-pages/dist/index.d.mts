import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface Library {
    name: string;
    version?: string;
    license: string;
    homepage?: string;
}
interface LegalConfig {
    company: {
        /** Full legal entity name, e.g. "GoEducate, Inc." */
        legalName: string;
        /** Short display name, e.g. "GoEducate" */
        shortName: string;
        /** Brief description of the organization, e.g. "a nonprofit that helps student-athletes earn college scholarships" */
        description: string;
    };
    contact: {
        privacyEmail: string;
        legalEmail: string;
        accessibilityEmail: string;
        phone?: string;
        mailingAddress?: string;
    };
    governing: {
        /** State for governing law clause, e.g. "North Carolina" */
        state: string;
        /** County for venue clause, e.g. "Mecklenburg" */
        county: string;
    };
    /** Effective/updated date shown on all pages, e.g. "September 29, 2025" */
    effectiveDate: string;
    features?: {
        /** Include TCPA / Text Message Consent section in Terms (default: false) */
        tcpaSection?: boolean;
        /** Include Children's Privacy section in Privacy (default: true) */
        childrenSection?: boolean;
    };
    /** Technologies listed on the Accessibility page (default: ["HTML, WAI-ARIA", "CSS (Tailwind CSS)", "JavaScript (React/Next.js)"]) */
    technologies?: string[];
    /** Open-source libraries displayed on the Licenses page */
    libraries?: Library[];
}

interface PrivacyPageProps {
    config: LegalConfig;
}
declare function PrivacyPage({ config }: PrivacyPageProps): react_jsx_runtime.JSX.Element;

interface CookiesPageProps {
    config: LegalConfig;
}
declare function CookiesPage({ config }: CookiesPageProps): react_jsx_runtime.JSX.Element;

interface TermsPageProps {
    config: LegalConfig;
}
declare function TermsPage({ config }: TermsPageProps): react_jsx_runtime.JSX.Element;

interface AccessibilityPageProps {
    config: LegalConfig;
}
declare function AccessibilityPage({ config }: AccessibilityPageProps): react_jsx_runtime.JSX.Element;

interface LicensesPageProps {
    config: LegalConfig;
}
declare function LicensesPage({ config }: LicensesPageProps): react_jsx_runtime.JSX.Element;

interface PageMetadata {
    title: string;
    description: string;
    robots: {
        index: boolean;
        follow: boolean;
    };
}
declare function generatePrivacyMetadata(config: LegalConfig): PageMetadata;
declare function generateCookiesMetadata(config: LegalConfig): PageMetadata;
declare function generateTermsMetadata(config: LegalConfig): PageMetadata;
declare function generateAccessibilityMetadata(config: LegalConfig): PageMetadata;
declare function generateLicensesMetadata(config: LegalConfig): PageMetadata;

interface LegalSection {
    id: string;
    label: string;
}
interface LegalPageLayoutProps {
    eyebrow: string;
    title: string;
    subtitle: string;
    effectiveDate?: string;
    sections: LegalSection[];
    children: React.ReactNode;
}
declare function LegalPageLayout({ eyebrow, title, subtitle, effectiveDate, sections, children, }: LegalPageLayoutProps): react_jsx_runtime.JSX.Element;

declare function LegalDisclaimer(): react_jsx_runtime.JSX.Element;

export { AccessibilityPage, CookiesPage, type LegalConfig, LegalDisclaimer, LegalPageLayout, type LegalSection, type Library, LicensesPage, PrivacyPage, TermsPage, generateAccessibilityMetadata, generateCookiesMetadata, generateLicensesMetadata, generatePrivacyMetadata, generateTermsMetadata };
