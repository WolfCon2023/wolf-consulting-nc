import { LegalPage } from "@/pages/legal/_legal-page";
import { site } from "@/config/site";

export function TermsOfUsePage() {
  return (
    <LegalPage title="Terms of Use" path="/terms" updatedAt="January 7, 2026">
      <h2>Agreement and acceptance</h2>
      <p>
        These Terms of Use (&quot;Terms&quot;) govern your access to and use of the website
        and related Services operated by {site.legalName}. By accessing or using the Services,
        you agree to be bound by these Terms. If you do not agree, do not use the Services.
      </p>

      <h2>Eligibility</h2>
      <p>
        You must be able to form a binding contract to use the Services. If you are using the
        Services on behalf of an organization, you represent that you have authority to bind
        that organization to these Terms.
      </p>

      <h2>Accounts &amp; security</h2>
      <p>
        The Services may not require an account. If an account is offered in the future, you are
        responsible for maintaining the confidentiality of your credentials and for all activity
        under your account.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Services for unlawful, harmful, or fraudulent purposes.</li>
        <li>Attempt to gain unauthorized access to systems or data.</li>
        <li>Interfere with or disrupt the Services (including via malware or automated abuse).</li>
        <li>Copy, scrape, or harvest data from the site in a manner that violates applicable law.</li>
      </ul>

      <h2>User content and license</h2>
      <p>
        If you submit content (for example, through a contact form), you grant us a limited license
        to use that content solely to respond to you and provide the Services. You represent that
        you have the right to submit the content and that it does not violate any law or third-party
        rights.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Services, including text, graphics, logos, and design, are owned by {site.legalName} or
        its licensors and are protected by intellectual property laws. Except as expressly permitted,
        you may not copy, modify, distribute, or create derivative works from the Services.
      </p>

      <h2>Third-party links and services</h2>
      <p>
        The Services may contain links to third-party websites or services. We do not control and are
        not responsible for third-party content, policies, or practices. Access them at your own risk.
      </p>

      <h2>Disclaimers</h2>
      <p>
        The Services are provided on an “as is” and “as available” basis. To the fullest extent
        permitted by law, we disclaim all warranties, express or implied, including warranties of
        merchantability, fitness for a particular purpose, and non-infringement.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {site.legalName} will not be liable for indirect,
        incidental, special, consequential, or punitive damages, or any loss of profits or revenues,
        arising out of or related to your use of the Services.
      </p>
      <p>
        To the extent liability cannot be excluded, our aggregate liability will be limited to the
        amount you paid us (if any) to use the Services during the twelve (12) months before the event
        giving rise to the claim.
      </p>

      <h2>Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless {site.legalName} from and against claims, liabilities,
        damages, losses, and expenses (including reasonable attorneys’ fees) arising out of or related
        to your misuse of the Services or violation of these Terms.
      </p>

      <h2>Suspension and termination</h2>
      <p>
        We may suspend or terminate access to the Services at any time if we believe you violated these
        Terms or if necessary to protect the Services, our users, or others.
      </p>

      <h2>Governing law &amp; venue</h2>
      <p>
        These Terms are governed by the laws of the State of North Carolina, without regard to conflict
        of law principles. You agree that any disputes will be brought in state or federal courts located
        in North Carolina, and you consent to their jurisdiction.
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. The “Last updated” date at the top of this page
        indicates when changes were made. Continued use of the Services after changes become effective
        means you accept the updated Terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms? Contact us at{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>
    </LegalPage>
  );
}



