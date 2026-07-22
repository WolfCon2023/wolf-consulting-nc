import { caseStudies } from "@/content/caseStudies";

export function Testimonials() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {caseStudies.map((study) => (
        <figure
          key={study.id}
          className="rounded-2xl border bg-card p-6"
        >
          <blockquote className="text-sm leading-relaxed text-muted-foreground">
            “{study.quote}”
          </blockquote>
          <figcaption className="mt-4">
            <p className="text-sm font-semibold text-foreground">{study.role}</p>
            <p className="text-xs text-muted-foreground">{study.industry}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
