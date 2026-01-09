import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import { legalLinks, navLinks, site } from "@/config/site";
import { cn } from "@/lib/utils";

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "rounded-md text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isActive && "text-foreground",
        )
      }
    >
      {children}
    </NavLink>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <div className="font-semibold">{site.legalName}</div>
            <p className="text-sm text-muted-foreground">
              {site.location.city}, {site.location.state} {site.location.postalCode}
            </p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">Email:</span>{" "}
                <a
                  className="rounded-md hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  href={`mailto:${site.contact.email}`}
                >
                  {site.contact.email}
                </a>
              </div>
              <div>
                <span className="font-medium text-foreground">Phone:</span>{" "}
                <a
                  className="rounded-md hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  href={`tel:${site.contact.phone}`}
                >
                  {site.contact.phone}
                </a>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Hours:</span>{" "}
              {site.hours.days}, {site.hours.time}
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold tracking-tight">Pages</div>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <FooterLink to={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold tracking-tight">Legal</div>
            <ul className="space-y-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <FooterLink to={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold tracking-tight">
              Our commitments
            </div>
            <p className="text-sm text-muted-foreground">
              We take privacy, cookies, security, and accessibility seriously. By
              using this site you agree to our Terms. Review our policies for
              details on data handling, analytics, and your choices.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>
            © {year} {site.legalName}. All rights reserved.
          </div>
          <div className="text-xs">
            This website content is provided for informational purposes and does not
            constitute legal advice.
          </div>
        </div>
      </div>
    </footer>
  );
}


