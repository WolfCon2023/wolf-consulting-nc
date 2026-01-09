import { LegalPage } from "@/pages/legal/_legal-page";
import { site } from "@/config/site";

export function AccessibilityStatementPage() {
  return (
    <LegalPage
      title="Accessibility Statement"
      path="/accessibility"
      updatedAt="January 7, 2026"
    >
      <h2>Commitment to accessibility</h2>
      <p>
        {site.legalName} is committed to providing a website that is accessible to the
        widest possible audience, regardless of technology or ability.
      </p>

      <h2>Accessibility standard and target</h2>
      <p>
        We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.2, Level AA,
        where reasonably practicable.
      </p>

      <h2>Measures we take</h2>
      <ul>
        <li>Using semantic HTML and predictable navigation patterns.</li>
        <li>Maintaining sufficient color contrast and scalable text.</li>
        <li>Supporting keyboard navigation and visible focus states.</li>
        <li>Providing meaningful labels for form controls and interactive elements.</li>
        <li>Designing responsive layouts for mobile and desktop devices.</li>
      </ul>

      <h2>Compatibility</h2>
      <p>
        The website is designed to be compatible with modern browsers and assistive
        technologies. If you experience compatibility issues, please let us know.
      </p>

      <h2>Known limitations</h2>
      <p>
        We continuously improve accessibility, but some content or third-party integrations
        may not fully meet our accessibility goals. Where feasible, we will work to provide
        accessible alternatives.
      </p>

      <h2>Testing and continuous improvement</h2>
      <p>
        We use a combination of automated checks and manual reviews to evaluate accessibility,
        and we incorporate improvements as part of ongoing maintenance.
      </p>

      <h2>Feedback and help</h2>
      <p>
        If you need assistance using any part of this site, or if you encounter an accessibility
        barrier, contact us at{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. Please include the page
        URL and a description of the issue, and we will make reasonable efforts to address it.
      </p>

      <h2>Enforcement procedure</h2>
      <p>
        If you are not satisfied with our response, you may have the right to contact a relevant
        government agency or accessibility enforcement authority in your jurisdiction.
      </p>

      <h2>Statement date</h2>
      <p>This statement was last updated on January 7, 2026.</p>
    </LegalPage>
  );
}



