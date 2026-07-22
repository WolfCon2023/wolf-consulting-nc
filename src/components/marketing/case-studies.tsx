import { caseStudies } from "@/content/caseStudies";

export function CaseStudies() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {caseStudies.map((study) => (
        <article
          key={study.id}
          className="flex flex-col rounded-2xl border bg-card p-6"
        >
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {study.industry}
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight">
            {study.role}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Challenge. </span>
            {study.challenge}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Approach. </span>
            {study.approach}
          </p>
          <ul className="mt-4 space-y-2 border-t pt-4">
            {study.results.map((result) => (
              <li key={result} className="flex gap-2 text-sm text-foreground/90">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {result}
              </li>
            ))}
          </ul>
          <blockquote className="mt-auto border-t pt-4 text-sm leading-relaxed text-muted-foreground italic">
            “{study.quote}”
          </blockquote>
        </article>
      ))}
    </div>
  );
}
