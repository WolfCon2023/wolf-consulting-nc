import { LegalPage } from "@/pages/legal/_legal-page";
import { site } from "@/config/site";

export function CookiesPolicyPage() {
  return (
    <LegalPage title="Cookies Policy" path="/cookies" updatedAt="January 7, 2026">
      <h2>What cookies are</h2>
      <p>
        Cookies are small text files placed on your device by a website. Cookies can help
        websites function, remember preferences, and understand how visitors use a site.
        Similar technologies include local storage, pixels, and SDKs.
      </p>

      <h2>How we use cookies and similar technologies</h2>
      <p>We use these technologies to:</p>
      <ul>
        <li>Operate core website functionality and security features.</li>
        <li>Understand performance and usage to improve the site.</li>
        <li>Remember preferences where available (such as consent choices).</li>
      </ul>

      <h2>Categories of cookies</h2>
      <h3>Strictly Necessary</h3>
      <p>
        These cookies are required for basic site operation (for example, security,
        load balancing, or consent management). Without them, the site may not function
        properly.
      </p>

      <h3>Performance / Analytics</h3>
      <p>
        These cookies help us understand how visitors interact with the site (for example,
        which pages are most visited and whether errors occur). This information helps us
        improve content and performance.
      </p>

      <h3>Functional</h3>
      <p>
        These cookies allow enhanced functionality and personalization, such as remembering
        preferences. If disabled, some features may not work as intended.
      </p>

      <h3>Marketing</h3>
      <p>
        Marketing cookies may be used to measure advertising effectiveness or to show
        relevant messages. We will only enable these where applicable and where required
        by law or consent.
      </p>

      <h2>Similar technologies</h2>
      <ul>
        <li>
          <strong>Local storage</strong> may store limited data in your browser to improve
          performance and remember settings.
        </li>
        <li>
          <strong>Pixels and tags</strong> are small snippets of code that help measure
          interactions (such as page views or form submissions).
        </li>
      </ul>

      <h2>How to control cookies</h2>
      <ul>
        <li>
          <strong>Browser controls</strong>: Most browsers let you block or delete cookies.
          Check your browser’s help pages for instructions.
        </li>
        <li>
          <strong>Device controls</strong>: Your device may provide settings to limit tracking.
        </li>
        <li>
          <strong>Consent choices</strong>: Where we provide a cookie preference tool, you can
          adjust your choices at any time.
        </li>
      </ul>
      <p>
        Note: If you disable cookies, certain features of the site may not function properly.
      </p>

      <h2>Policy updates</h2>
      <p>
        We may update this Cookies Policy from time to time. The “Last updated” date at the
        top of this page reflects the most recent revision.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about cookies? Contact {site.legalName} at{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>
    </LegalPage>
  );
}



