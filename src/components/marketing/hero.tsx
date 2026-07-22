import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { products } from "@/content/products";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b bg-[hsl(222_47%_9%)] text-[hsl(210_40%_98%)]">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 15% 20%, hsl(45 93% 47% / 0.18), transparent 55%), radial-gradient(ellipse 70% 50% at 85% 10%, hsl(210 40% 98% / 0.08), transparent 50%), linear-gradient(180deg, transparent 60%, hsl(222 47%_7%))",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(hsl(210 40% 98% / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(210 40% 98% / 0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(180deg, black, transparent 85%)",
        }}
      />

      <div className="container relative py-16 md:py-24">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold tracking-[0.22em] text-[hsl(45_93%_55%)] uppercase">
            {site.name}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Software that runs the work. Coaching that makes it stick.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-white/70 md:text-xl">
            We build purpose-built platforms for clinics, accounting firms, and
            operators — and partner with leaders who need agile delivery and IT
            strategy without the noise.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="bg-[hsl(45_93%_47%)] text-[hsl(222_47%_11%)] hover:bg-[hsl(45_93%_52%)]"
            >
              <NavLink to="/products">
                Explore products <ArrowRight />
              </NavLink>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <NavLink to="/contact">Book a consultation</NavLink>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-14"
        >
          <div className="mb-4 flex items-end justify-between gap-4">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/50 uppercase">
              Interactive demos
            </p>
            <NavLink
              to="/products"
              className="hidden text-sm font-medium text-[hsl(45_93%_55%)] hover:text-[hsl(45_93%_65%)] sm:inline"
            >
              View all products
            </NavLink>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {products.map((product, index) => (
              <motion.div
                key={product.slug}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + index * 0.06 }}
              >
                <NavLink
                  to={`/products#${product.slug}`}
                  className={cn(
                    "group flex min-h-[11rem] flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition",
                    "hover:border-white/25 hover:bg-white/[0.07]",
                  )}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white"
                        style={{ boxShadow: `0 0 0 1px ${product.accent}33` }}
                      >
                        <img
                          src={`/${product.slug}-logo.png`}
                          alt=""
                          className="h-7 w-auto"
                          loading="eager"
                          decoding="async"
                        />
                      </span>
                      <div>
                        <p className="font-semibold text-white">{product.name}</p>
                        <p className="text-xs text-white/55">{product.tagline}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {product.preview.map((item) => (
                        <span
                          key={item}
                          className="rounded-md bg-white/10 px-2 py-1 text-xs text-white/70"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[hsl(45_93%_55%)] group-hover:gap-2">
                    Open product <ArrowRight className="h-4 w-4" />
                  </span>
                </NavLink>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-3 sm:hidden">
            {products.map((product) => (
              <a
                key={`${product.slug}-demo`}
                href={product.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1 rounded-lg border border-white/15 px-3 text-xs font-medium text-white/80"
              >
                {product.name} demo <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
