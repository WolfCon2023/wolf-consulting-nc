import { products } from "@/content/products";

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
    secondary: { label: "Explore Products", href: "/products" },
  },
} as const;

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavLinkItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const navLinks: NavLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  {
    label: "Products",
    href: "/products",
    children: products.map((product) => ({
      label: product.name,
      href: `/products#${product.slug}`,
      description: product.tagline,
    })),
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookies Policy", href: "/cookies" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Accessibility Statement", href: "/accessibility" },
  { label: "Open-Source Licenses", href: "/licenses" },
] as const;
