import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "muted" | "bordered";
}) {
  return (
    <section
      className={cn(
        tone === "muted" && "bg-muted/30",
        tone === "bordered" && "border-y",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-pretty text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

