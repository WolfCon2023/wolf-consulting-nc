import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/content/products";

export function Products() {
  return (
    <div className="grid gap-8">
      {products.map((product) => (
        <Card key={product.slug} className="overflow-hidden">
          <div className="grid md:grid-cols-5">
            <div className="flex flex-col items-center justify-center gap-4 border-b bg-muted/30 p-8 md:col-span-2 md:border-b-0 md:border-r">
              <img
                src={`/${product.slug}-logo.png`}
                alt={`${product.name} logo`}
                className="h-16 w-auto"
                loading="lazy"
                decoding="async"
              />
              <div className="text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Flagship product
                </span>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {product.tagline}
                </p>
              </div>
            </div>

            <CardHeader className="md:col-span-3">
              <CardTitle className="sr-only">{product.name} details</CardTitle>
              <CardContent className="p-0">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>

                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {product.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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
              </CardContent>
            </CardHeader>
          </div>
        </Card>
      ))}
    </div>
  );
}
