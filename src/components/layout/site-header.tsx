import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

import { navLinks, site } from "@/config/site";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [logoOk, setLogoOk] = useState(true);
  const reducedMotion = useReducedMotion();

  const items = useMemo(() => navLinks, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          {logoOk ? (
            <img
              src={site.brand.logo.src}
              alt={site.brand.logo.alt}
              className="h-9 w-auto"
              loading="eager"
              decoding="async"
              onError={() => setLogoOk(false)}
            />
          ) : (
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              WC
            </span>
          )}
          <span className="hidden sm:inline">{site.legalName}</span>
          <span className="sm:hidden">{site.name}</span>
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex">
          {items.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive && "text-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle showLabel />
          <Button asChild>
            <NavLink to={site.ctas.primary.href}>{site.ctas.primary.label}</NavLink>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reducedMotion ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
            className="border-t md:hidden"
          >
            <div className="container flex flex-col gap-2 py-4">
              {items.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      isActive && "bg-accent/10 text-foreground",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Button asChild className="mt-2">
                <NavLink to={site.ctas.primary.href} onClick={() => setOpen(false)}>
                  {site.ctas.primary.label}
                </NavLink>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}


