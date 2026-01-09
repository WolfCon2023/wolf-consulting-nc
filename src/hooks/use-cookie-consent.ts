import { useEffect, useMemo, useState } from "react";

import {
  getCookieConsent,
  setCookieConsent,
  type CookieConsent,
} from "@/lib/cookie-consent";

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(() => {
    if (typeof window === "undefined") return null;
    return getCookieConsent();
  });

  useEffect(() => {
    // Sync in case another tab changes it.
    const onStorage = (e: StorageEvent) => {
      if (e.key !== "wcg_cookie_consent") return;
      setConsent(getCookieConsent());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const api = useMemo(() => {
    const accept = () => {
      setCookieConsent("accepted");
      setConsent("accepted");
    };
    const decline = () => {
      setCookieConsent("declined");
      setConsent("declined");
    };

    return {
      consent,
      accept,
      decline,
      allowAnalytics: consent === "accepted",
      showBanner: consent === null,
    };
  }, [consent]);

  return api;
}



