import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import { Seo } from "@/components/seo/seo";
import { Products } from "@/components/marketing/products";
import { Section, SectionHeader } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { products } from "@/content/products";

export function ProductsPage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    });
  }, [location.hash]);

  return (
    <>
      <Seo
        title="Products"
        path="/products"
        description="Explore BOAZ-OS, OptiAlign, and LedgerOS — interactive product demos from Wolf Consulting Group."
      />

      <section className="relative overflow-hidden border-b bg-[hsl(222_47%_9%)] text-[hsl(210_40%_98%)]">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 50% at 20% 0%, hsl(45 93% 47% / 0.16), transparent 55%)",
          }}
        />
        <div className="container relative py-14 md:py-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-[hsl(45_93%_55%)] uppercase">
            Products
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Software we build. Demos you can try today.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-white/70">
            Every product below has a live interactive demo — no signup required.
            Explore the workspace, then book a walkthrough if it fits your team.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {products.map((product) => (
              <a
                key={product.slug}
                href={`#${product.slug}`}
                className="inline-flex min-h-11 items-center rounded-lg border border-white/15 bg-white/5 px-4 text-sm font-medium text-white/90 hover:bg-white/10"
              >
                {product.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="container py-14">
          <SectionHeader
            eyebrow="Interactive demos"
            title="Pick a product. Open the sandbox."
            description="Each demo mirrors the real product story with fictional data — search, filter, install modules, and walk the workflows."
          />
          <div className="mt-10">
            <Products />
          </div>
        </div>
      </Section>

      <Section tone="muted" className="border-y">
        <div className="container py-14">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Want this tailored to your firm or clinic?
              </h2>
              <p className="mt-2 text-muted-foreground">
                We’ll map your workflows, data, and rollout path — then walk you
                through the right product live.
              </p>
            </div>
            <Button asChild size="lg">
              <NavLink to="/contact">
                Book a consultation <ArrowRight />
              </NavLink>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
