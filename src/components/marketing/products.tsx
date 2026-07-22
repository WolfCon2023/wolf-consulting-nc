import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { products, type Product } from "@/content/products";
import { cn } from "@/lib/utils";

function ProductCard({
  product,
  featured = false,
}: {
  product: Product;
  featured?: boolean;
}) {
  return (
    <article
      id={product.slug}
      className={cn(
        "scroll-mt-24 overflow-hidden rounded-2xl border bg-card",
        featured && "shadow-sm",
      )}
    >
      <div className="grid lg:grid-cols-5">
        <div
          className="flex flex-col justify-between gap-6 border-b p-6 lg:col-span-2 lg:border-b-0 lg:border-r"
          style={{
            background: `linear-gradient(160deg, ${product.accent}14, transparent 55%), hsl(var(--muted) / 0.35)`,
          }}
        >
          <div>
            <img
              src={`/${product.slug}-logo.png`}
              alt={`${product.name} logo`}
              className="h-14 w-auto"
              loading="lazy"
              decoding="async"
            />
            <h3 className="mt-5 text-2xl font-semibold tracking-tight md:text-3xl">
              {product.name}
            </h3>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              {product.tagline}
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Built for
              </p>
              <p className="mt-1 text-foreground/90">{product.audience}</p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Solves
              </p>
              <p className="mt-1 text-foreground/90">{product.problem}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 p-6 lg:col-span-3">
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {product.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: product.accent }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <a
                href={product.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {product.primaryCta.label} <ExternalLink />
              </a>
            </Button>
            {product.secondaryCta ? (
              <Button asChild variant="outline">
                <NavLink to={product.secondaryCta.href}>
                  {product.secondaryCta.label} <ArrowRight />
                </NavLink>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Products({
  featuredOnly,
}: {
  /** When true, render a tighter home teaser with link to full page */
  featuredOnly?: boolean;
} = {}) {
  const list = featuredOnly ? products.slice(0, 3) : products;

  return (
    <div className="grid gap-8">
      {list.map((product) => (
        <ProductCard key={product.slug} product={product} featured />
      ))}
      {featuredOnly ? (
        <div className="flex justify-center">
          <Button asChild variant="secondary" size="lg">
            <NavLink to="/products">
              See all products & demos <ArrowRight />
            </NavLink>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
