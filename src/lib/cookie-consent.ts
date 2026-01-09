export type CookieConsent = "accepted" | "declined";

const STORAGE_KEY = "wcg_cookie_consent";

export function getCookieConsent(): CookieConsent | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "accepted" || v === "declined") return v;
    return null;
  } catch {
    return null;
  }
}

export function setCookieConsent(next: CookieConsent) {
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // ignore
  }
}



