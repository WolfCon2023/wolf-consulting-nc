import { Seo } from "@/components/seo/seo";
import { site } from "@/config/site";
import type { ReactNode } from "react";

export function LegalPage({
  title,
  path,
  updatedAt,
  children,
}: {
  title: string;
  path: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <>
      <Seo title={title} path={path} />
      <section className="border-b">
        <div className="container py-14 md:py-20">
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: {updatedAt}
          </p>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            This page is provided for general informational purposes and is not legal
            advice. If you have questions, contact us at{" "}
            <a className="font-medium text-foreground hover:underline" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
            .
          </p>
        </div>
      </section>

      <section>
        <div className="container py-14">
          <article className="prose max-w-none prose-headings:scroll-mt-24 prose-a:text-foreground hover:prose-a:underline dark:prose-invert">
            {children}
          </article>
        </div>
      </section>
    </>
  );
}


