import { NavLink } from "react-router-dom";

import { Seo } from "@/components/seo/seo";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <>
      <Seo title="Not Found" path="/404" noindex />
      <section className="container py-20">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
          <p className="mt-3 text-muted-foreground">
            The page you’re looking for doesn’t exist or may have moved.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild>
              <NavLink to="/">Go home</NavLink>
            </Button>
            <Button asChild variant="outline">
              <NavLink to="/contact">Contact</NavLink>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}



