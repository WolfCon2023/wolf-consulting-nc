import { Outlet } from "react-router-dom";

import { Analytics } from "@/components/analytics/analytics";
import { CookieNotice } from "@/components/legal/cookie-notice";
import { Footer } from "@/components/layout/site-footer";
import { Header } from "@/components/layout/site-header";

export function SiteLayout() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Analytics />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <Header />
      <main id="content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CookieNotice />
    </div>
  );
}


