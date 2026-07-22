import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { navLinks, site, type NavLinkItem } from "@/config/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

function ProductsDropdown({
  item,
  onNavigate,
}: {
  item: NavLinkItem;
  onNavigate: (e: React.MouseEvent, href: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const children = item.children ?? [];

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={(e) => {
          if (open) onNavigate(e, item.href);
          else setOpen(true);
        }}
      >
        {item.label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            role="menu"
            className="absolute left-0 top-full z-50 min-w-[220px] rounded-xl border bg-background p-2 shadow-lg"
          >
            <NavLink
              to={item.href}
              role="menuitem"
              onClick={(e) => {
                onNavigate(e, item.href);
                setOpen(false);
              }}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent/10"
            >
              All products
            </NavLink>
            <div className="my-1 border-t" />
            {children.map((child) => (
              <NavLink
                key={child.href}
                to={child.href}
                role="menuitem"
                onClick={(e) => {
                  onNavigate(e, child.href);
                  setOpen(false);
                }}
                className="block rounded-lg px-3 py-2 hover:bg-accent/10"
              >
                <span className="block text-sm font-medium text-foreground">{child.label}</span>
                {child.description ? (
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {child.description}
                  </span>
                ) : null}
              </NavLink>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [logoOk, setLogoOk] = useState(true);
  const [productsOpen, setProductsOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const location = useLocation();
  const navigate = useNavigate();

  const items = useMemo(() => navLinks, []);

  const handleHashLink = useCallback(
    (e: React.MouseEvent, href: string) => {
      const [path, hash] = href.split("#");
      if (!hash) return;

      e.preventDefault();
      setOpen(false);
      setProductsOpen(false);

      if (location.pathname === (path || "/")) {
        scrollToHash(`#${hash}`);
      } else {
        navigate(path || "/");
        requestAnimationFrame(() => {
          setTimeout(() => scrollToHash(`#${hash}`), 100);
        });
      }
    },
    [location.pathname, navigate],
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="inline-flex items-center justify-center rounded-lg border bg-background/60 p-1 shadow-sm">
            {logoOk ? (
              <span className="h-10 w-28 overflow-hidden rounded-md md:h-11 md:w-32">
                <img
                  src={site.brand.logo.src}
                  alt={site.brand.logo.alt}
                  className="h-full w-full object-cover object-center [transform:scale(2.3)]"
                  loading="eager"
                  decoding="async"
                  onError={() => setLogoOk(false)}
                />
              </span>
            ) : (
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground md:h-11 md:w-11">
                WC
              </span>
            )}
          </span>
          <span className="hidden sm:inline">{site.legalName}</span>
          <span className="sm:hidden">{site.name}</span>
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex">
          {items.map((item) =>
            item.children?.length ? (
              <ProductsDropdown key={item.label} item={item} onNavigate={handleHashLink} />
            ) : (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={(e) =>
                  item.href.includes("#") ? handleHashLink(e, item.href) : undefined
                }
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive && !item.href.includes("#") && "text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild>
            <NavLink to={site.ctas.primary.href}>{site.ctas.primary.label}</NavLink>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
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
              {items.map((item) =>
                item.children?.length ? (
                  <div key={item.label} className="flex flex-col gap-1">
                    <button
                      type="button"
                      className="flex min-h-11 items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent/10"
                      aria-expanded={productsOpen}
                      onClick={() => setProductsOpen((v) => !v)}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform",
                          productsOpen && "rotate-180",
                        )}
                      />
                    </button>
                    {productsOpen ? (
                      <div className="ml-2 flex flex-col gap-1 border-l pl-2">
                        <NavLink
                          to={item.href}
                          onClick={(e) => handleHashLink(e, item.href)}
                          className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                        >
                          All products
                        </NavLink>
                        {item.children.map((child) => (
                          <NavLink
                            key={child.href}
                            to={child.href}
                            onClick={(e) => handleHashLink(e, child.href)}
                            className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                          >
                            <span className="block font-medium text-foreground">{child.label}</span>
                            {child.description ? (
                              <span className="mt-0.5 block text-xs">{child.description}</span>
                            ) : null}
                          </NavLink>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={(e) => {
                      if (item.href.includes("#")) {
                        handleHashLink(e, item.href);
                      } else {
                        setOpen(false);
                      }
                    }}
                    className={({ isActive }) =>
                      cn(
                        "rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        isActive && !item.href.includes("#") && "bg-accent/10 text-foreground",
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ),
              )}
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
