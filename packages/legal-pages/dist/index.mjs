// src/components/LegalPageLayout.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function LegalPageLayout({
  eyebrow,
  title,
  subtitle,
  effectiveDate,
  sections: sections3,
  children
}) {
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx("section", { className: "border-b border-neutral-200 bg-gradient-to-b from-neutral-50 to-white dark:border-white/10 dark:from-neutral-900/40 dark:to-neutral-950", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-6 py-12 sm:py-16", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wider text-neutral-500 dark:text-white/60", children: eyebrow }),
      /* @__PURE__ */ jsx("h1", { className: "mt-2 text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl", children: title }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-3xl text-neutral-700 dark:text-white/80", children: subtitle }),
      effectiveDate && /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-neutral-500 dark:text-white/60", children: [
        "Effective date: ",
        effectiveDate
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-6xl px-6 py-10 lg:grid lg:grid-cols-12 lg:gap-10", children: [
      /* @__PURE__ */ jsx("aside", { className: "mb-10 lg:col-span-3 lg:mb-0", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-24 rounded-2xl border border-neutral-200 bg-neutral-100/50 p-4 dark:border-white/10 dark:bg-neutral-900/50", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-white/60", children: "On this page" }),
        /* @__PURE__ */ jsx("nav", { className: "mt-3 space-y-1 text-sm", children: sections3.map((s) => /* @__PURE__ */ jsx(
          "a",
          {
            href: `#${s.id}`,
            className: "block rounded-md px-2 py-1 text-neutral-700 hover:bg-neutral-200/60 dark:text-white/80 dark:hover:bg-white/5",
            children: s.label
          },
          s.id
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("article", { className: "prose prose-neutral dark:prose-invert max-w-none lg:col-span-9", children })
    ] })
  ] });
}

// src/components/LegalDisclaimer.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function LegalDisclaimer() {
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx2("hr", { className: "my-12 border-neutral-200 dark:border-white/10" }),
    /* @__PURE__ */ jsx2("p", { className: "text-sm text-neutral-500 dark:text-white/60", children: "This page is provided for general informational purposes and does not constitute legal advice. Please consult counsel for guidance tailored to your organization." })
  ] });
}

// src/pages/PrivacyPage.tsx
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var baseSections = [
  { id: "overview", label: "Overview" },
  { id: "scope", label: "Scope & Who We Are" },
  { id: "data-we-collect", label: "Information We Collect" },
  { id: "sources", label: "Where We Get Data" },
  { id: "use", label: "How We Use Information" },
  { id: "legal-bases", label: "Legal Bases (GDPR/UK GDPR)" },
  { id: "cookies", label: "Cookies & Similar Tech" },
  { id: "analytics", label: "Analytics & Third Parties" },
  { id: "sharing", label: "When We Share Information" },
  { id: "retention", label: "Data Retention" },
  { id: "security", label: "Data Security" },
  { id: "children", label: "Children's Privacy" },
  { id: "rights", label: "Your Privacy Rights (GDPR/CCPA/CPRA)" },
  { id: "choices", label: "Your Choices & Controls" },
  { id: "dnt", label: "Do Not Track" },
  { id: "intl", label: "International Transfers" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact Us" }
];
function PrivacyPage({ config }) {
  const showChildren = config.features?.childrenSection !== false;
  const sections3 = showChildren ? baseSections : baseSections.filter((s) => s.id !== "children");
  return /* @__PURE__ */ jsxs3(
    LegalPageLayout,
    {
      eyebrow: "Policy",
      title: "Privacy Policy",
      subtitle: `This Privacy Policy explains how we collect, use, and share information when you use ${config.company.shortName}'s websites, pages, and services. It also describes your rights and choices.`,
      effectiveDate: config.effectiveDate,
      sections: sections3,
      children: [
        /* @__PURE__ */ jsxs3("section", { id: "overview", children: [
          /* @__PURE__ */ jsx3("h2", { children: "Overview" }),
          /* @__PURE__ */ jsxs3("p", { children: [
            config.company.legalName,
            " (\u201C",
            /* @__PURE__ */ jsx3("strong", { children: config.company.shortName }),
            ",\u201D \u201C",
            /* @__PURE__ */ jsx3("strong", { children: "we" }),
            ",\u201D \u201C",
            /* @__PURE__ */ jsx3("strong", { children: "us" }),
            ",\u201D or \u201C",
            /* @__PURE__ */ jsx3("strong", { children: "our" }),
            "\u201D) is ",
            config.company.description,
            ". We respect your privacy and are committed to protecting it through our compliance with this policy."
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("section", { id: "scope", children: [
          /* @__PURE__ */ jsx3("h2", { children: "Scope & Who We Are" }),
          /* @__PURE__ */ jsxs3("p", { children: [
            "This policy applies to information we collect through our website and related pages that link to it (collectively, the \u201C",
            /* @__PURE__ */ jsx3("strong", { children: "Services" }),
            "\u201D). It does not apply to third-party websites, apps, or services that are not controlled by us."
          ] }),
          /* @__PURE__ */ jsxs3("ul", { children: [
            /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "Controller:" }),
              " ",
              config.company.legalName
            ] }),
            /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "Contact:" }),
              " ",
              /* @__PURE__ */ jsx3("a", { href: `mailto:${config.contact.privacyEmail}`, children: config.contact.privacyEmail })
            ] }),
            config.contact.mailingAddress && /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "Postal:" }),
              " ",
              config.contact.mailingAddress
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("section", { id: "data-we-collect", children: [
          /* @__PURE__ */ jsx3("h2", { children: "Information We Collect" }),
          /* @__PURE__ */ jsxs3("ul", { children: [
            /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "Account & Profile Data:" }),
              " name, email, and other details you provide when creating an account or filling out forms."
            ] }),
            /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "Content You Provide:" }),
              " messages, feedback, uploads, and other content you submit through the Services."
            ] }),
            /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "Usage Data:" }),
              " pages viewed, links clicked, referral pages, time on page, approximate location (from IP), device/browser type, and similar diagnostics."
            ] }),
            /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "Cookies/Identifiers:" }),
              " cookies, local storage, pixel tags, and similar technologies (see \u201CCookies & Similar Tech\u201D)."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("section", { id: "sources", children: [
          /* @__PURE__ */ jsx3("h2", { children: "Where We Get Data" }),
          /* @__PURE__ */ jsxs3("ul", { children: [
            /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "Directly from you" }),
              " when you use the Services."
            ] }),
            /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "Automatically" }),
              " via cookies, pixels, and logs when you interact with the Services."
            ] }),
            /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "From service providers" }),
              " (e.g., hosting, analytics, email) who act on our instructions."
            ] }),
            /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "From publicly available sources" }),
              ", where permitted by law."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("section", { id: "use", children: [
          /* @__PURE__ */ jsx3("h2", { children: "How We Use Information" }),
          /* @__PURE__ */ jsxs3("ul", { children: [
            /* @__PURE__ */ jsx3("li", { children: "Provide, maintain, and improve the Services and your experience." }),
            /* @__PURE__ */ jsx3("li", { children: "Operate features and fulfill your requests." }),
            /* @__PURE__ */ jsx3("li", { children: "Communicate with you (service messages, updates, and\u2014where permitted\u2014marketing)." }),
            /* @__PURE__ */ jsx3("li", { children: "Analyze usage to improve content, performance, and safety." }),
            /* @__PURE__ */ jsx3("li", { children: "Protect against fraud, abuse, and misuse; comply with legal obligations." }),
            /* @__PURE__ */ jsx3("li", { children: "With your consent for specific purposes when required." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("section", { id: "legal-bases", children: [
          /* @__PURE__ */ jsx3("h2", { children: "Legal Bases (GDPR/UK GDPR)" }),
          /* @__PURE__ */ jsx3("p", { children: "For EEA/UK users, we rely on:" }),
          /* @__PURE__ */ jsxs3("ul", { children: [
            /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "Contract" }),
              " (to provide the Services you request)."
            ] }),
            /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "Legitimate interests" }),
              " (e.g., improving and securing the Services)."
            ] }),
            /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "Consent" }),
              " (e.g., non-essential cookies/marketing, where required)."
            ] }),
            /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "Legal obligation" }),
              " (e.g., to keep certain records)."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("section", { id: "cookies", children: [
          /* @__PURE__ */ jsx3("h2", { children: "Cookies & Similar Technologies" }),
          /* @__PURE__ */ jsx3("p", { children: "We use cookies and similar technologies to make the site work, remember preferences, and understand usage. You can control cookies through your browser settings and, where applicable, through in-product controls (e.g., a cookie banner). Disabling certain cookies may impact site functionality." })
        ] }),
        /* @__PURE__ */ jsxs3("section", { id: "analytics", children: [
          /* @__PURE__ */ jsx3("h2", { children: "Analytics & Third-Party Tools" }),
          /* @__PURE__ */ jsx3("p", { children: "We may use analytics and infrastructure providers (for example: hosting, CDN, logging, and performance tools) to operate and improve the Services. These providers process limited data on our behalf pursuant to contracts that restrict their use of your data." })
        ] }),
        /* @__PURE__ */ jsxs3("section", { id: "sharing", children: [
          /* @__PURE__ */ jsx3("h2", { children: "When We Share Information" }),
          /* @__PURE__ */ jsxs3("ul", { children: [
            /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "Service providers" }),
              " who help us deliver the Services."
            ] }),
            /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "Partners" }),
              " when you ask us to share or when it is core to a feature you use."
            ] }),
            /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "Legal/Compliance" }),
              " (to comply with law, enforce terms, protect rights)."
            ] }),
            /* @__PURE__ */ jsxs3("li", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "Business changes" }),
              " (e.g., reorganization). We will continue to protect your data consistent with this policy or provide notice if policies change."
            ] })
          ] }),
          /* @__PURE__ */ jsx3("p", { className: "text-sm text-neutral-500 dark:text-white/70", children: "We do not \u201Csell\u201D personal information as defined by the CCPA/CPRA, nor do we share it for cross-context behavioral advertising. If this changes, we will update this policy and provide required opt-out mechanisms." })
        ] }),
        /* @__PURE__ */ jsxs3("section", { id: "retention", children: [
          /* @__PURE__ */ jsx3("h2", { children: "Data Retention" }),
          /* @__PURE__ */ jsx3("p", { children: "We retain information only as long as necessary to provide the Services, comply with legal obligations, resolve disputes, and enforce agreements. Retention periods vary by data category and context." })
        ] }),
        /* @__PURE__ */ jsxs3("section", { id: "security", children: [
          /* @__PURE__ */ jsx3("h2", { children: "Data Security" }),
          /* @__PURE__ */ jsx3("p", { children: "We use administrative, technical, and physical safeguards designed to protect your information. No method of transmission or storage is 100% secure; we continuously improve our protections." })
        ] }),
        showChildren && /* @__PURE__ */ jsxs3("section", { id: "children", children: [
          /* @__PURE__ */ jsx3("h2", { children: "Children\u2019s Privacy" }),
          /* @__PURE__ */ jsx3("p", { children: "Our Services are not directed to children under 13. Where parental consent is required by law (e.g., under COPPA in the U.S.), we obtain it before collecting personal information. If you believe a child provided personal information without consent, contact us and we will take appropriate action." })
        ] }),
        /* @__PURE__ */ jsxs3("section", { id: "rights", children: [
          /* @__PURE__ */ jsx3("h2", { children: "Your Privacy Rights (GDPR/CCPA/CPRA)" }),
          /* @__PURE__ */ jsx3("p", { children: "You may have the right to:" }),
          /* @__PURE__ */ jsxs3("ul", { children: [
            /* @__PURE__ */ jsx3("li", { children: "Access, correct, or delete your personal information." }),
            /* @__PURE__ */ jsx3("li", { children: "Object to or restrict certain processing." }),
            /* @__PURE__ */ jsx3("li", { children: "Port your data to another service (where technically feasible)." }),
            /* @__PURE__ */ jsx3("li", { children: "Opt out of certain uses or disclosures, including targeted advertising or profiling (where applicable)." }),
            /* @__PURE__ */ jsx3("li", { children: "Not be discriminated against for exercising your rights." })
          ] }),
          /* @__PURE__ */ jsxs3("p", { children: [
            "To exercise rights, email",
            " ",
            /* @__PURE__ */ jsx3("a", { href: `mailto:${config.contact.privacyEmail}`, children: config.contact.privacyEmail }),
            ". We may need to verify your identity and, if applicable, your authority to make a request on behalf of someone else (authorized agent)."
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("section", { id: "choices", children: [
          /* @__PURE__ */ jsx3("h2", { children: "Your Choices & Controls" }),
          /* @__PURE__ */ jsxs3("ul", { children: [
            /* @__PURE__ */ jsx3("li", { children: "Update your info or preferences by contacting us." }),
            /* @__PURE__ */ jsx3("li", { children: "Control cookies via your browser and any in-product settings." }),
            /* @__PURE__ */ jsx3("li", { children: "Unsubscribe from marketing emails using the link in those emails." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("section", { id: "dnt", children: [
          /* @__PURE__ */ jsx3("h2", { children: "Do Not Track" }),
          /* @__PURE__ */ jsx3("p", { children: "Some browsers send \u201CDo Not Track\u201D signals. Because industry standards are still evolving, we do not respond to DNT signals at this time." })
        ] }),
        /* @__PURE__ */ jsxs3("section", { id: "intl", children: [
          /* @__PURE__ */ jsx3("h2", { children: "International Data Transfers" }),
          /* @__PURE__ */ jsx3("p", { children: "If you access the Services from outside the United States, your information may be processed in countries that may not provide the same level of data protection as your home jurisdiction. Where required, we rely on appropriate safeguards for transfers." })
        ] }),
        /* @__PURE__ */ jsxs3("section", { id: "changes", children: [
          /* @__PURE__ */ jsx3("h2", { children: "Changes to This Policy" }),
          /* @__PURE__ */ jsx3("p", { children: "We may update this policy from time to time. The \u201CEffective date\u201D above reflects the latest version. Material changes will be posted on this page and, where appropriate, we will notify you by additional means." })
        ] }),
        /* @__PURE__ */ jsxs3("section", { id: "contact", children: [
          /* @__PURE__ */ jsx3("h2", { children: "Contact Us" }),
          /* @__PURE__ */ jsxs3("p", { children: [
            "Questions or requests? Email",
            " ",
            /* @__PURE__ */ jsx3("a", { href: `mailto:${config.contact.privacyEmail}`, children: config.contact.privacyEmail }),
            config.contact.mailingAddress && /* @__PURE__ */ jsxs3(Fragment2, { children: [
              " or write to us at ",
              config.contact.mailingAddress
            ] }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsx3(LegalDisclaimer, {})
      ]
    }
  );
}

// src/pages/CookiesPage.tsx
import Link from "next/link";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var sections = [
  { id: "about", label: "About This Policy" },
  { id: "what-are-cookies", label: "What Are Cookies?" },
  { id: "types", label: "Types of Cookies We Use" },
  { id: "similar", label: "Similar Technologies" },
  { id: "control", label: "How to Control Cookies" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact" }
];
function CookiesPage({ config }) {
  return /* @__PURE__ */ jsxs4(
    LegalPageLayout,
    {
      eyebrow: "Policy",
      title: "Cookies Policy",
      subtitle: `This Cookies Policy explains how ${config.company.shortName} uses cookies and similar technologies on our website and how you can manage your preferences.`,
      effectiveDate: config.effectiveDate,
      sections,
      children: [
        /* @__PURE__ */ jsxs4("section", { id: "about", children: [
          /* @__PURE__ */ jsx4("h2", { children: "About This Policy" }),
          /* @__PURE__ */ jsxs4("p", { children: [
            "This policy should be read together with our",
            " ",
            /* @__PURE__ */ jsx4(Link, { href: "/privacy", children: "Privacy Policy" }),
            ". It describes what cookies are, which ones we use, and how you can control them."
          ] })
        ] }),
        /* @__PURE__ */ jsxs4("section", { id: "what-are-cookies", children: [
          /* @__PURE__ */ jsx4("h2", { children: "What Are Cookies?" }),
          /* @__PURE__ */ jsx4("p", { children: "Cookies are small text files that are stored on your device when you visit a website. They help websites work properly, remember preferences, and understand how visitors use them." })
        ] }),
        /* @__PURE__ */ jsxs4("section", { id: "types", children: [
          /* @__PURE__ */ jsx4("h2", { children: "Types of Cookies We Use" }),
          /* @__PURE__ */ jsxs4("ul", { children: [
            /* @__PURE__ */ jsxs4("li", { children: [
              /* @__PURE__ */ jsx4("strong", { children: "Strictly Necessary:" }),
              " Required for core site functionality (e.g., page navigation, security). These cannot be switched off."
            ] }),
            /* @__PURE__ */ jsxs4("li", { children: [
              /* @__PURE__ */ jsx4("strong", { children: "Performance/Analytics:" }),
              " Help us understand usage and improve the site (e.g., page views, traffic sources)."
            ] }),
            /* @__PURE__ */ jsxs4("li", { children: [
              /* @__PURE__ */ jsx4("strong", { children: "Functional:" }),
              " Remember choices (e.g., language, preferences) to provide enhanced features."
            ] }),
            /* @__PURE__ */ jsxs4("li", { children: [
              /* @__PURE__ */ jsx4("strong", { children: "Marketing (if used):" }),
              " Used to deliver relevant content/ads. We do not use third-party targeted advertising by default. If that changes, we will update this page."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs4("section", { id: "similar", children: [
          /* @__PURE__ */ jsx4("h2", { children: "Similar Technologies" }),
          /* @__PURE__ */ jsx4("p", { children: "We may also use local storage, pixels, or device identifiers that serve similar purposes to cookies and are subject to this policy." })
        ] }),
        /* @__PURE__ */ jsxs4("section", { id: "control", children: [
          /* @__PURE__ */ jsx4("h2", { children: "How to Control Cookies" }),
          /* @__PURE__ */ jsxs4("ul", { children: [
            /* @__PURE__ */ jsxs4("li", { children: [
              /* @__PURE__ */ jsx4("strong", { children: "Browser Controls:" }),
              " Most browsers allow you to block or delete cookies via settings. Refer to your browser\u2019s help for instructions."
            ] }),
            /* @__PURE__ */ jsxs4("li", { children: [
              /* @__PURE__ */ jsx4("strong", { children: "In-Product Controls:" }),
              " If we present a cookie banner or preferences center, you can manage non-essential cookies there."
            ] }),
            /* @__PURE__ */ jsxs4("li", { children: [
              /* @__PURE__ */ jsx4("strong", { children: "Do Not Track:" }),
              " We do not respond to DNT signals at this time (see",
              " ",
              /* @__PURE__ */ jsx4(Link, { href: "/privacy#dnt", children: "Privacy Policy" }),
              ")."
            ] })
          ] }),
          /* @__PURE__ */ jsx4("p", { className: "text-sm text-neutral-500 dark:text-white/70", children: "Disabling certain cookies may impact site functionality." })
        ] }),
        /* @__PURE__ */ jsxs4("section", { id: "changes", children: [
          /* @__PURE__ */ jsx4("h2", { children: "Changes to This Policy" }),
          /* @__PURE__ */ jsx4("p", { children: "We may update this Cookies Policy periodically. The \u201CEffective date\u201D above reflects the latest version. Material changes will be posted here and, where appropriate, we will provide additional notice." })
        ] }),
        /* @__PURE__ */ jsxs4("section", { id: "contact", children: [
          /* @__PURE__ */ jsx4("h2", { children: "Contact" }),
          /* @__PURE__ */ jsxs4("p", { children: [
            "Questions? Email",
            " ",
            /* @__PURE__ */ jsx4("a", { href: `mailto:${config.contact.privacyEmail}`, children: config.contact.privacyEmail }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsx4(LegalDisclaimer, {})
      ]
    }
  );
}

// src/pages/TermsPage.tsx
import Link2 from "next/link";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var baseSections2 = [
  { id: "agreement", label: "Agreement & Acceptance" },
  { id: "eligibility", label: "Eligibility" },
  { id: "accounts", label: "Accounts & Security" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "user-content", label: "User Content & License" },
  { id: "ip", label: "Intellectual Property" },
  { id: "third-party", label: "Third-Party Links & Services" },
  { id: "tcpa", label: "TCPA / Text Message Consent" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "limitation", label: "Limitation of Liability" },
  { id: "indemnity", label: "Indemnification" },
  { id: "termination", label: "Suspension/Termination" },
  { id: "governing-law", label: "Governing Law & Venue" },
  { id: "changes", label: "Changes to These Terms" },
  { id: "contact", label: "Contact" }
];
function TermsPage({ config }) {
  const showTcpa = config.features?.tcpaSection === true;
  const sections3 = showTcpa ? baseSections2 : baseSections2.filter((s) => s.id !== "tcpa");
  return /* @__PURE__ */ jsxs5(
    LegalPageLayout,
    {
      eyebrow: "Legal",
      title: "Terms of Use",
      subtitle: `These Terms of Use (\u201CTerms\u201D) govern your access to and use of ${config.company.shortName}\u2019s websites and services. By accessing or using the Services, you agree to be bound by these Terms.`,
      effectiveDate: config.effectiveDate,
      sections: sections3,
      children: [
        /* @__PURE__ */ jsxs5("section", { id: "agreement", children: [
          /* @__PURE__ */ jsx5("h2", { children: "Agreement & Acceptance" }),
          /* @__PURE__ */ jsxs5("p", { children: [
            "These Terms constitute a binding agreement between you and ",
            config.company.legalName,
            " (\u201C",
            /* @__PURE__ */ jsx5("strong", { children: config.company.shortName }),
            ",\u201D \u201C",
            /* @__PURE__ */ jsx5("strong", { children: "we" }),
            ",\u201D \u201C",
            /* @__PURE__ */ jsx5("strong", { children: "us" }),
            ",\u201D or \u201C",
            /* @__PURE__ */ jsx5("strong", { children: "our" }),
            "\u201D). If you do not agree to these Terms, do not use the Services. You also agree to our",
            " ",
            /* @__PURE__ */ jsx5(Link2, { href: "/privacy", children: "Privacy Policy" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("section", { id: "eligibility", children: [
          /* @__PURE__ */ jsx5("h2", { children: "Eligibility" }),
          /* @__PURE__ */ jsx5("p", { children: "You must be able to form a binding contract and comply with applicable laws. If you are under the age of consent in your jurisdiction, you may only use the Services with permission of a parent or legal guardian." })
        ] }),
        /* @__PURE__ */ jsxs5("section", { id: "accounts", children: [
          /* @__PURE__ */ jsx5("h2", { children: "Accounts & Security" }),
          /* @__PURE__ */ jsxs5("ul", { children: [
            /* @__PURE__ */ jsx5("li", { children: "You are responsible for the accuracy of information you provide and for safeguarding your credentials." }),
            /* @__PURE__ */ jsx5("li", { children: "Notify us immediately of any unauthorized access or suspected breach." }),
            /* @__PURE__ */ jsx5("li", { children: "We may suspend or terminate accounts for violations of these Terms." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("section", { id: "acceptable-use", children: [
          /* @__PURE__ */ jsx5("h2", { children: "Acceptable Use" }),
          /* @__PURE__ */ jsx5("p", { children: "You agree not to:" }),
          /* @__PURE__ */ jsxs5("ul", { children: [
            /* @__PURE__ */ jsx5("li", { children: "Use the Services in any unlawful, harmful, fraudulent, or misleading manner." }),
            /* @__PURE__ */ jsx5("li", { children: "Interfere with or disrupt the integrity or performance of the Services." }),
            /* @__PURE__ */ jsx5("li", { children: "Scrape, crawl, or harvest data except as permitted by robots.txt or written consent." }),
            /* @__PURE__ */ jsx5("li", { children: "Upload malicious code or circumvent security measures." }),
            /* @__PURE__ */ jsx5("li", { children: "Impersonate others or misrepresent your affiliation." }),
            /* @__PURE__ */ jsx5("li", { children: "Post content that is infringing, defamatory, obscene, or otherwise objectionable." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("section", { id: "user-content", children: [
          /* @__PURE__ */ jsx5("h2", { children: "User Content & License" }),
          /* @__PURE__ */ jsxs5("p", { children: [
            "You may submit content (e.g., profiles, messages, media). You retain ownership of your content, but grant ",
            config.company.shortName,
            " a non-exclusive, worldwide, royalty-free license to host, store, display, and transmit your content as necessary to operate the Services. You are responsible for the legality of your content."
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("section", { id: "ip", children: [
          /* @__PURE__ */ jsx5("h2", { children: "Intellectual Property" }),
          /* @__PURE__ */ jsxs5("p", { children: [
            "The Services, including text, graphics, logos, and software, are owned by or licensed to",
            " ",
            config.company.shortName,
            " and are protected by intellectual property laws. Except as permitted by these Terms, you may not copy, modify, distribute, sell, or lease any part of the Services."
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("section", { id: "third-party", children: [
          /* @__PURE__ */ jsx5("h2", { children: "Third-Party Links & Services" }),
          /* @__PURE__ */ jsx5("p", { children: "The Services may link to third-party sites or services. We are not responsible for their content, policies, or practices. Your use of third-party services is at your own risk and subject to their terms." })
        ] }),
        showTcpa && /* @__PURE__ */ jsxs5("section", { id: "tcpa", children: [
          /* @__PURE__ */ jsx5("h2", { children: "TCPA / Text Message Consent" }),
          /* @__PURE__ */ jsxs5("p", { children: [
            "If you provide a mobile phone number and opt in to receive text messages, you consent to receive SMS/text messages from ",
            config.company.legalName,
            " (and our service providers) at that number, including messages that may be sent using an automatic telephone dialing system (autodialer) or prerecorded/artificial voice, where permitted by law."
          ] }),
          /* @__PURE__ */ jsxs5("ul", { children: [
            /* @__PURE__ */ jsxs5("li", { children: [
              /* @__PURE__ */ jsx5("strong", { children: "Purpose:" }),
              " messages may include program updates, reminders, and related communications you request."
            ] }),
            /* @__PURE__ */ jsxs5("li", { children: [
              /* @__PURE__ */ jsx5("strong", { children: "Message frequency:" }),
              " varies."
            ] }),
            /* @__PURE__ */ jsxs5("li", { children: [
              /* @__PURE__ */ jsx5("strong", { children: "Costs:" }),
              " message and data rates may apply."
            ] }),
            /* @__PURE__ */ jsxs5("li", { children: [
              /* @__PURE__ */ jsx5("strong", { children: "Opt out:" }),
              " reply ",
              /* @__PURE__ */ jsx5("strong", { children: "STOP" }),
              " to cancel."
            ] }),
            /* @__PURE__ */ jsxs5("li", { children: [
              /* @__PURE__ */ jsx5("strong", { children: "Help:" }),
              " reply ",
              /* @__PURE__ */ jsx5("strong", { children: "HELP" }),
              " for help."
            ] }),
            /* @__PURE__ */ jsxs5("li", { children: [
              /* @__PURE__ */ jsx5("strong", { children: "Not a condition:" }),
              " your consent to receive texts is not a condition of using the Services."
            ] }),
            /* @__PURE__ */ jsxs5("li", { children: [
              /* @__PURE__ */ jsx5("strong", { children: "Your number:" }),
              " you represent you are authorized to provide this number and will keep it current."
            ] })
          ] }),
          /* @__PURE__ */ jsxs5("p", { children: [
            "See our ",
            /* @__PURE__ */ jsx5(Link2, { href: "/privacy", children: "Privacy Policy" }),
            " for information about how we handle personal information and communications preferences."
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("section", { id: "disclaimers", children: [
          /* @__PURE__ */ jsx5("h2", { children: "Disclaimers" }),
          /* @__PURE__ */ jsx5("p", { children: "THE SERVICES ARE PROVIDED \u201CAS IS\u201D AND \u201CAS AVAILABLE\u201D WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do not warrant that the Services will be uninterrupted, error-free, secure, or accurate." })
        ] }),
        /* @__PURE__ */ jsxs5("section", { id: "limitation", children: [
          /* @__PURE__ */ jsx5("h2", { children: "Limitation of Liability" }),
          /* @__PURE__ */ jsxs5("p", { children: [
            "TO THE MAXIMUM EXTENT PERMITTED BY LAW, ",
            config.company.shortName.toUpperCase(),
            " AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICES."
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("section", { id: "indemnity", children: [
          /* @__PURE__ */ jsx5("h2", { children: "Indemnification" }),
          /* @__PURE__ */ jsxs5("p", { children: [
            "You agree to defend, indemnify, and hold harmless ",
            config.company.shortName,
            " from any claims, liabilities, damages, losses, and expenses, including reasonable legal and accounting fees, arising out of or in any way connected with your use of the Services or your violation of these Terms."
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("section", { id: "termination", children: [
          /* @__PURE__ */ jsx5("h2", { children: "Suspension/Termination" }),
          /* @__PURE__ */ jsx5("p", { children: "We may suspend or terminate your access to the Services at any time for any reason, including violation of these Terms. Upon termination, your right to use the Services will cease immediately." })
        ] }),
        /* @__PURE__ */ jsxs5("section", { id: "governing-law", children: [
          /* @__PURE__ */ jsx5("h2", { children: "Governing Law & Venue" }),
          /* @__PURE__ */ jsxs5("p", { children: [
            "These Terms are governed by the laws of the State of ",
            config.governing.state,
            ", without regard to conflict of law principles. You agree to the exclusive jurisdiction of state and federal courts located in ",
            config.governing.county,
            " County, ",
            config.governing.state,
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("section", { id: "changes", children: [
          /* @__PURE__ */ jsx5("h2", { children: "Changes to These Terms" }),
          /* @__PURE__ */ jsx5("p", { children: "We may update these Terms from time to time. The \u201CEffective date\u201D above reflects the latest version. Material changes will be posted on this page and, where appropriate, we will provide additional notice." })
        ] }),
        /* @__PURE__ */ jsxs5("section", { id: "contact", children: [
          /* @__PURE__ */ jsx5("h2", { children: "Contact" }),
          /* @__PURE__ */ jsxs5("p", { children: [
            "Questions about these Terms? Email",
            " ",
            /* @__PURE__ */ jsx5("a", { href: `mailto:${config.contact.legalEmail}`, children: config.contact.legalEmail }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsx5(LegalDisclaimer, {})
      ]
    }
  );
}

// src/pages/AccessibilityPage.tsx
import Link3 from "next/link";
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
var sections2 = [
  { id: "commitment", label: "Our Commitment" },
  { id: "standard", label: "Accessibility Standard & Target" },
  { id: "measures", label: "Measures We Take" },
  { id: "compatibility", label: "Browser & Assistive Tech Compatibility" },
  { id: "technical", label: "Technical Specifications" },
  { id: "known", label: "Known Limitations" },
  { id: "testing", label: "Testing & Continuous Improvement" },
  { id: "feedback", label: "Feedback & Help" },
  { id: "enforcement", label: "Enforcement Procedure" },
  { id: "date", label: "Statement Date" }
];
var defaultTechnologies = [
  "HTML, WAI-ARIA",
  "CSS (Tailwind CSS)",
  "JavaScript (React/Next.js)"
];
function AccessibilityPage({ config }) {
  const technologies = config.technologies ?? defaultTechnologies;
  return /* @__PURE__ */ jsxs6(
    LegalPageLayout,
    {
      eyebrow: "Accessibility",
      title: "Accessibility Statement",
      subtitle: `${config.company.shortName} is committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability. We are continually improving the user experience and applying relevant accessibility standards.`,
      sections: sections2,
      children: [
        /* @__PURE__ */ jsxs6("section", { id: "commitment", children: [
          /* @__PURE__ */ jsx6("h2", { children: "Our Commitment" }),
          /* @__PURE__ */ jsx6("p", { children: "We aim to make our content and features perceivable, operable, understandable, and robust for all users, including people who use assistive technologies such as screen readers, screen magnifiers, speech recognition software, and switch devices." })
        ] }),
        /* @__PURE__ */ jsxs6("section", { id: "standard", children: [
          /* @__PURE__ */ jsx6("h2", { children: "Accessibility Standard & Target" }),
          /* @__PURE__ */ jsx6("p", { children: "Our goal is conformance with the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA. Where full conformance is not yet possible, we work to provide accessible alternatives and prioritize fixes according to user impact." })
        ] }),
        /* @__PURE__ */ jsxs6("section", { id: "measures", children: [
          /* @__PURE__ */ jsx6("h2", { children: "Measures We Take" }),
          /* @__PURE__ */ jsxs6("ul", { children: [
            /* @__PURE__ */ jsx6("li", { children: "Use semantic HTML, proper heading structure, and accessible form patterns." }),
            /* @__PURE__ */ jsx6("li", { children: "Maintain sufficient color contrast and clear focus indicators." }),
            /* @__PURE__ */ jsx6("li", { children: "Provide text alternatives for non-text content (e.g., images)." }),
            /* @__PURE__ */ jsx6("li", { children: "Ensure keyboard operability and logical tab order." }),
            /* @__PURE__ */ jsx6("li", { children: "Label interactive components and ARIA attributes where required." }),
            /* @__PURE__ */ jsx6("li", { children: "Continuously review new UI against accessibility acceptance criteria." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs6("section", { id: "compatibility", children: [
          /* @__PURE__ */ jsx6("h2", { children: "Browser & Assistive Tech Compatibility" }),
          /* @__PURE__ */ jsx6("p", { children: "We test modern versions of major browsers (Chrome, Edge, Safari, Firefox) on desktop and mobile. We also spot-check with screen readers (e.g., VoiceOver, NVDA) where feasible. While we strive for broad support, older browsers or unusual configurations may not offer a fully accessible experience." })
        ] }),
        /* @__PURE__ */ jsxs6("section", { id: "technical", children: [
          /* @__PURE__ */ jsx6("h2", { children: "Technical Specifications" }),
          /* @__PURE__ */ jsxs6("p", { children: [
            "Accessibility of ",
            config.company.shortName,
            " relies on the following technologies to function with the particular combination of web browser and assistive technologies or plugins installed on your device:"
          ] }),
          /* @__PURE__ */ jsx6("ul", { children: technologies.map((tech) => /* @__PURE__ */ jsx6("li", { children: tech }, tech)) }),
          /* @__PURE__ */ jsx6("p", { children: "These technologies are relied upon to conform with the accessibility standards used." })
        ] }),
        /* @__PURE__ */ jsxs6("section", { id: "known", children: [
          /* @__PURE__ */ jsx6("h2", { children: "Known Limitations" }),
          /* @__PURE__ */ jsx6("p", { children: "Despite our best efforts, some content may not yet be fully accessible. Known items we monitor:" }),
          /* @__PURE__ */ jsxs6("ul", { children: [
            /* @__PURE__ */ jsx6("li", { children: "Third-party embeds or iframes may not meet our target standard (we provide titles/labels where possible)." }),
            /* @__PURE__ */ jsx6("li", { children: "Legacy media or documents may not have complete transcripts or alternative formats (contact us for an accessible copy)." }),
            /* @__PURE__ */ jsx6("li", { children: "User-generated content might not include full text alternatives on upload (we provide guidance and review paths)." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs6("section", { id: "testing", children: [
          /* @__PURE__ */ jsx6("h2", { children: "Testing & Continuous Improvement" }),
          /* @__PURE__ */ jsx6("p", { children: "We use a blend of automated checks and manual reviews during development. Accessibility feedback is triaged and tracked, and remediations are prioritized by severity and user impact." })
        ] }),
        /* @__PURE__ */ jsxs6("section", { id: "feedback", children: [
          /* @__PURE__ */ jsx6("h2", { children: "Feedback & Help" }),
          /* @__PURE__ */ jsx6("p", { children: "If you experience a barrier or need an alternative format, contact us. We try to respond within 5 business days." }),
          /* @__PURE__ */ jsxs6("ul", { children: [
            /* @__PURE__ */ jsxs6("li", { children: [
              "Email:",
              " ",
              /* @__PURE__ */ jsx6("a", { href: `mailto:${config.contact.accessibilityEmail}`, children: config.contact.accessibilityEmail })
            ] }),
            config.contact.phone && /* @__PURE__ */ jsxs6("li", { children: [
              "Phone: ",
              config.contact.phone
            ] }),
            config.contact.mailingAddress && /* @__PURE__ */ jsxs6("li", { children: [
              "Postal: ",
              config.contact.mailingAddress
            ] })
          ] }),
          /* @__PURE__ */ jsx6("p", { children: "When contacting us, please include the page URL, a description of the issue, your browser/OS, and any assistive technology in use." }),
          /* @__PURE__ */ jsxs6("p", { className: "text-sm text-neutral-500 dark:text-white/70", children: [
            "For privacy information, see our ",
            /* @__PURE__ */ jsx6(Link3, { href: "/privacy", children: "Privacy Policy" }),
            ". For site use rules, see our ",
            /* @__PURE__ */ jsx6(Link3, { href: "/terms", children: "Terms of Use" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs6("section", { id: "enforcement", children: [
          /* @__PURE__ */ jsx6("h2", { children: "Enforcement Procedure" }),
          /* @__PURE__ */ jsxs6("p", { children: [
            "If you believe your accessibility complaint has not been satisfactorily resolved, you may escalate it to our internal compliance lead at",
            " ",
            /* @__PURE__ */ jsx6("a", { href: `mailto:${config.contact.legalEmail}`, children: config.contact.legalEmail }),
            ". We will review and respond with next steps and timing."
          ] })
        ] }),
        /* @__PURE__ */ jsxs6("section", { id: "date", children: [
          /* @__PURE__ */ jsx6("h2", { children: "Statement Date" }),
          /* @__PURE__ */ jsxs6("p", { children: [
            "This statement was last updated on ",
            config.effectiveDate,
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsx6(LegalDisclaimer, {})
      ]
    }
  );
}

// src/pages/LicensesPage.tsx
import Link4 from "next/link";
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
var defaultLibraries = [
  { name: "Next.js", version: "15.x", license: "MIT", homepage: "https://nextjs.org/" },
  { name: "React", version: "19.x", license: "MIT", homepage: "https://react.dev/" },
  { name: "Tailwind CSS", version: "4.x", license: "MIT", homepage: "https://tailwindcss.com/" }
];
function LicensesPage({ config }) {
  const libraries = config.libraries ?? defaultLibraries;
  return /* @__PURE__ */ jsxs7("main", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx7("section", { className: "border-b border-neutral-200 bg-gradient-to-b from-neutral-50 to-white dark:border-white/10 dark:from-neutral-900/40 dark:to-neutral-950", children: /* @__PURE__ */ jsxs7("div", { className: "mx-auto max-w-6xl px-6 py-12 sm:py-16", children: [
      /* @__PURE__ */ jsx7("p", { className: "text-xs uppercase tracking-wider text-neutral-500 dark:text-white/60", children: "Legal" }),
      /* @__PURE__ */ jsx7("h1", { className: "mt-2 text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl", children: "Open-Source Licenses" }),
      /* @__PURE__ */ jsxs7("p", { className: "mt-3 max-w-3xl text-neutral-700 dark:text-white/80", children: [
        "We gratefully acknowledge the open-source projects that make",
        " ",
        config.company.shortName,
        " possible. This page lists third-party software and their licenses."
      ] }),
      /* @__PURE__ */ jsxs7("p", { className: "mt-2 text-sm text-neutral-500 dark:text-white/60", children: [
        "Updated: ",
        config.effectiveDate
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs7("section", { className: "mx-auto max-w-6xl px-6 py-10", children: [
      /* @__PURE__ */ jsxs7("div", { className: "rounded-2xl border border-neutral-200 bg-neutral-100/50 p-4 dark:border-white/10 dark:bg-neutral-900/50 sm:p-6", children: [
        /* @__PURE__ */ jsx7("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs7("table", { className: "min-w-full text-left text-sm", children: [
          /* @__PURE__ */ jsx7("thead", { className: "text-neutral-600 dark:text-white/70", children: /* @__PURE__ */ jsxs7("tr", { children: [
            /* @__PURE__ */ jsx7("th", { className: "px-3 py-2 font-semibold", children: "Library" }),
            /* @__PURE__ */ jsx7("th", { className: "px-3 py-2 font-semibold", children: "Version" }),
            /* @__PURE__ */ jsx7("th", { className: "px-3 py-2 font-semibold", children: "License" }),
            /* @__PURE__ */ jsx7("th", { className: "px-3 py-2 font-semibold", children: "Homepage" })
          ] }) }),
          /* @__PURE__ */ jsx7("tbody", { className: "divide-y divide-neutral-200 dark:divide-white/10", children: libraries.map((lib) => /* @__PURE__ */ jsxs7("tr", { children: [
            /* @__PURE__ */ jsx7("td", { className: "px-3 py-2 text-neutral-900 dark:text-white", children: lib.name }),
            /* @__PURE__ */ jsx7("td", { className: "px-3 py-2 text-neutral-700 dark:text-white/80", children: lib.version ?? "\u2014" }),
            /* @__PURE__ */ jsx7("td", { className: "px-3 py-2 text-neutral-700 dark:text-white/80", children: lib.license }),
            /* @__PURE__ */ jsx7("td", { className: "px-3 py-2", children: lib.homepage ? /* @__PURE__ */ jsx7(
              "a",
              {
                href: lib.homepage,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-neutral-700 underline hover:text-neutral-900 dark:text-white/80 dark:hover:text-white",
                children: lib.homepage
              }
            ) : "\u2014" })
          ] }, `${lib.name}-${lib.version ?? "x"}`)) })
        ] }) }),
        /* @__PURE__ */ jsxs7("p", { className: "mt-6 text-sm text-neutral-600 dark:text-white/70", children: [
          "For complete license texts, see the respective project pages or the",
          " ",
          /* @__PURE__ */ jsx7("code", { className: "rounded bg-neutral-200/60 px-1 py-0.5 text-[0.95em] dark:bg-white/10", children: "LICENSE" }),
          " ",
          "files included with the packages. If you believe an attribution is missing, contact us at",
          " ",
          /* @__PURE__ */ jsx7(
            "a",
            {
              className: "underline",
              href: `mailto:${config.contact.legalEmail}`,
              children: config.contact.legalEmail
            }
          ),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs7("div", { className: "mt-8 text-sm text-neutral-600 dark:text-white/70", children: [
        /* @__PURE__ */ jsx7(Link4, { href: "/privacy", className: "underline hover:text-neutral-900 dark:hover:text-white", children: "Privacy Policy" }),
        " ",
        "\xB7",
        " ",
        /* @__PURE__ */ jsx7(Link4, { href: "/cookies", className: "underline hover:text-neutral-900 dark:hover:text-white", children: "Cookies" }),
        " ",
        "\xB7",
        " ",
        /* @__PURE__ */ jsx7(Link4, { href: "/terms", className: "underline hover:text-neutral-900 dark:hover:text-white", children: "Terms of Use" })
      ] }),
      /* @__PURE__ */ jsx7("div", { className: "prose prose-neutral dark:prose-invert mt-8 max-w-none", children: /* @__PURE__ */ jsx7(LegalDisclaimer, {}) })
    ] })
  ] });
}

// src/metadata.ts
function generatePrivacyMetadata(config) {
  return {
    title: `Privacy Policy | ${config.company.shortName}`,
    description: `Learn how ${config.company.shortName} collects, uses, and protects your information. Read about cookies, analytics, your privacy rights (GDPR/CCPA), data security, and how to contact us.`,
    robots: { index: true, follow: true }
  };
}
function generateCookiesMetadata(config) {
  return {
    title: `Cookies Policy | ${config.company.shortName}`,
    description: `Understand how ${config.company.shortName} uses cookies and similar technologies, and learn how to manage your preferences.`,
    robots: { index: true, follow: true }
  };
}
function generateTermsMetadata(config) {
  return {
    title: `Terms of Use | ${config.company.shortName}`,
    description: `Read the Terms of Use for ${config.company.shortName}. Learn about acceptable use, user content, IP rights, disclaimers, and liability limits.`,
    robots: { index: true, follow: true }
  };
}
function generateAccessibilityMetadata(config) {
  return {
    title: `Accessibility | ${config.company.shortName}`,
    description: `Our commitment to an accessible experience for all users, including our WCAG conformance target, known limitations, and how to get help.`,
    robots: { index: true, follow: true }
  };
}
function generateLicensesMetadata(config) {
  return {
    title: `Open-Source Licenses | ${config.company.shortName}`,
    description: `Attributions and license notices for third-party open-source software used by ${config.company.shortName}.`,
    robots: { index: true, follow: true }
  };
}
export {
  AccessibilityPage,
  CookiesPage,
  LegalDisclaimer,
  LegalPageLayout,
  LicensesPage,
  PrivacyPage,
  TermsPage,
  generateAccessibilityMetadata,
  generateCookiesMetadata,
  generateLicensesMetadata,
  generatePrivacyMetadata,
  generateTermsMetadata
};
//# sourceMappingURL=index.mjs.map