export const site = {
  name: "Wolf Consulting Group",
  legalName: "Wolf Consulting Group, LLC",
  url: "https://www.wolfconsultingnc.com",
  domain: "www.wolfconsultingnc.com",
  brand: {
    logo: {
      /** Place the provided logo at `public/logo.webp` (recommended) */
      src: "/logo.webp",
      alt: "Wolf Consulting Group logo",
    },
  },
  location: {
    city: "Waxhaw",
    state: "NC",
    postalCode: "28173",
  },
  contact: {
    email: "contactWCG@wolfconsultingnc.com",
    phone: "704-803-0934",
  },
  hours: {
    days: "Monday – Saturday",
    time: "9:00 AM EST to 6:00 PM EST",
  },
  ctas: {
    primary: { label: "Book a Consultation", href: "/contact" },
    secondary: { label: "View Services", href: "/services" },
  },
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookies Policy", href: "/cookies" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Accessibility Statement", href: "/accessibility" },
  { label: "Open-Source Licenses", href: "/licenses" },
] as const;


