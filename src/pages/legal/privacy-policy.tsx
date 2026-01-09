import { LegalPage } from "@/pages/legal/_legal-page";
import { site } from "@/config/site";

export function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy" updatedAt="January 7, 2026">
      <h2>Overview and scope</h2>
      <p>
        This Privacy Policy explains how {site.legalName} (&quot;we&quot;,
        &quot;us&quot;, or &quot;our&quot;) collects, uses, discloses, and protects
        information when you visit our website, contact us, or otherwise interact with
        our services (collectively, the &quot;Services&quot;).
      </p>
      <p>
        This policy applies to information collected through this website and related
        communications. It does not cover third-party websites, applications, or
        services that may be linked from our website.
      </p>

      <h2>Types of information we collect</h2>
      <h3>Information you provide</h3>
      <ul>
        <li>
          <strong>Contact details</strong> (such as name, email address, phone number).
        </li>
        <li>
          <strong>Message content</strong> you submit via forms, email, or other
          communications.
        </li>
        <li>
          <strong>Business context</strong> you choose to share (such as project goals
          or timelines).
        </li>
      </ul>

      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Device and usage data</strong> (such as browser type, pages viewed,
          approximate location, referring URL, and timestamps).
        </li>
        <li>
          <strong>Cookie and similar technology data</strong> as described in our Cookies
          Policy.
        </li>
      </ul>

      <h2>Sources of personal data</h2>
      <ul>
        <li>
          <strong>Directly from you</strong> when you submit a form, send an email, or
          call us.
        </li>
        <li>
          <strong>Automatically</strong> from your browser or device when you use the
          Services.
        </li>
        <li>
          <strong>Third parties</strong> that provide analytics, security, or hosting
          services (as configured by us).
        </li>
      </ul>

      <h2>How we use information</h2>
      <ul>
        <li>
          <strong>Respond and provide services</strong>, including answering inquiries,
          scheduling consultations, and delivering engagements.
        </li>
        <li>
          <strong>Operate and improve the Services</strong>, including monitoring
          performance and fixing issues.
        </li>
        <li>
          <strong>Security and fraud prevention</strong>, including detecting abuse and
          protecting the Services.
        </li>
        <li>
          <strong>Legal and compliance</strong>, including enforcing our Terms and
          complying with applicable laws.
        </li>
      </ul>

      <h2>Legal bases (optional; for certain jurisdictions)</h2>
      <p>
        Depending on your location, we may rely on one or more legal bases to process
        personal data, such as: (a) your consent, (b) performance of a contract or steps
        you request before entering a contract, (c) our legitimate interests (for example,
        running and securing our business), and (d) compliance with legal obligations.
      </p>

      <h2>Cookies &amp; similar technologies</h2>
      <p>
        We may use cookies, local storage, pixels, and similar technologies to operate
        the Services, understand usage, and improve performance. For details and choices,
        review our Cookies Policy.
      </p>

      <h2>Analytics and third-party tools</h2>
      <p>
        We may use analytics and performance tools to understand how the Services are used
        (for example, which pages are visited and how users navigate). These tools may set
        cookies or collect usage data subject to their own policies. Where required, we
        will request consent before enabling non-essential analytics.
      </p>

      <h2>Disclosure and sharing</h2>
      <p>We may share information in the following circumstances:</p>
      <ul>
        <li>
          <strong>Service providers</strong> that help us operate the website and
          communications (for example, hosting, analytics, spam prevention).
        </li>
        <li>
          <strong>Legal and safety</strong> when required by law, subpoena, or to protect
          rights, safety, and security.
        </li>
        <li>
          <strong>Business transfers</strong> in connection with a merger, acquisition,
          or sale of assets (subject to applicable law).
        </li>
      </ul>
      <p>We do not sell personal information in the ordinary sense of the term.</p>

      <h2>Data retention</h2>
      <p>
        We retain personal information for as long as needed to fulfill the purposes
        described in this policy, including to comply with legal, accounting, or reporting
        requirements. Retention periods vary depending on the nature of the information
        and the context of the interaction.
      </p>

      <h2>Data security practices</h2>
      <p>
        We implement reasonable administrative, technical, and physical safeguards designed
        to protect personal information. However, no security system is perfect, and we
        cannot guarantee absolute security.
      </p>

      <h2>Children’s privacy</h2>
      <p>
        The Services are not directed to children under 13, and we do not knowingly collect
        personal information from children. If you believe a child has provided us personal
        information, contact us and we will take appropriate steps to delete it.
      </p>

      <h2>User rights and controls</h2>
      <p>
        Depending on your location, you may have rights to request access, correction,
        deletion, or portability of your personal information, and to object to or restrict
        certain processing. You may also withdraw consent where processing is based on consent.
      </p>
      <p>
        To make a request, contact us at{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. We may need to
        verify your identity before fulfilling certain requests.
      </p>

      <h2>Do Not Track</h2>
      <p>
        Some browsers offer a “Do Not Track” (DNT) signal. Because there is not a uniform
        standard for interpreting DNT signals, we do not currently respond to DNT in a
        standardized way.
      </p>

      <h2>International data transfers</h2>
      <p>
        If you access the Services from outside the United States, information may be
        processed in the United States or other jurisdictions where our service providers
        operate. These jurisdictions may not provide the same level of protection as your
        home country.
      </p>

      <h2>Policy changes</h2>
      <p>
        We may update this Privacy Policy from time to time. We will revise the “Last updated”
        date at the top of this page when changes are made. Continued use of the Services after
        changes become effective indicates your acceptance of the updated policy.
      </p>

      <h2>Contact us</h2>
      <p>
        If you have questions about this Privacy Policy or our privacy practices, contact{" "}
        {site.legalName} at{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>
    </LegalPage>
  );
}



