import { NavLink, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { cn } from "@/lib/utils";

export function CookieNotice() {
  const { pathname } = useLocation();
  const { showBanner, accept, decline } = useCookieConsent();

  // Per request: show on initial Home page load only.
  const shouldRender = showBanner && pathname === "/";
  if (!shouldRender) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[60] border-t bg-black text-white"
    >
      <div className="container flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-relaxed text-white/90">
          By using this website, you agree to our use of cookies. We use cookies to
          provide you with a great experience and to help our website run effectively.{" "}
          <NavLink
            to="/cookies"
            className={cn(
              "font-medium text-white underline underline-offset-4",
              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
            )}
          >
            Learn more
          </NavLink>
          .
        </p>

        <div className="flex gap-3 md:flex-shrink-0">
          <Button
            type="button"
            variant="outline"
            className="border-white/60 bg-transparent text-white hover:bg-white/10 focus-visible:ring-offset-black"
            onClick={decline}
          >
            Decline
          </Button>
          <Button
            type="button"
            className="bg-white text-black hover:bg-white/90 focus-visible:ring-offset-black"
            onClick={accept}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}



