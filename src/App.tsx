import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SiteLayout } from "@/components/layout/site-layout";
import { AboutPage } from "@/pages/about";
import { ContactPage } from "@/pages/contact";
import { HomePage } from "@/pages/home";
import { QuestionnairePage } from "@/pages/questionnaire";
import { ServicesPage } from "@/pages/services";
import { AccessibilityStatementPage } from "@/pages/legal/accessibility-statement";
import { CookiesPolicyPage } from "@/pages/legal/cookies-policy";
import { OpenSourceLicensesPage } from "@/pages/legal/open-source-licenses";
import { PrivacyPolicyPage } from "@/pages/legal/privacy-policy";
import { TermsOfUsePage } from "@/pages/legal/terms-of-use";
import { NotFoundPage } from "@/pages/not-found";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />

            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/cookies" element={<CookiesPolicyPage />} />
            <Route path="/terms" element={<TermsOfUsePage />} />
            <Route
              path="/accessibility"
              element={<AccessibilityStatementPage />}
            />
            <Route path="/licenses" element={<OpenSourceLicensesPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
