import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

import { Seo } from "@/components/seo/seo";
import { Section, SectionHeader } from "@/components/marketing/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { serviceEngagements, services } from "@/content/services";

const groups = [
  "Agile & delivery",
  "Strategy & architecture",
  "Build & engineering",
  "Support & operations",
] as const;

export function ServicesPage() {
  return (
    <>
      <Seo
        title="Services"
        path="/services"
        description="Outcome-focused agile coaching, IT strategy, custom product builds, and operations support from Wolf Consulting Group."
      />

      <section className="relative overflow-hidden border-b bg-[hsl(222_47%_9%)] text-[hsl(210_40%_98%)]">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 50% at 15% 0%, hsl(45 93% 47% / 0.14), transparent 55%)",
          }}
        />
        <div className="container relative py-14 md:py-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-[hsl(45_93%_55%)] uppercase">
            Services
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Engagements defined by outcomes — not buzzwords.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-white/70">
            Choose a path by what you need to change in 30, 60, and 90 days. We
            tailor scope — the catalog below is how we staff the work.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-[hsl(45_93%_47%)] text-[hsl(222_47%_11%)] hover:bg-[hsl(45_93%_52%)]"
          >
            <NavLink to="/contact">
              Book a consultation <ArrowRight />
            </NavLink>
          </Button>
        </div>
      </section>

      <Section>
        <div className="container py-14">
          <SectionHeader
            eyebrow="How clients engage"
            title="Four clear offers"
            description="Each engagement has a who-it’s-for, a target outcome, and a practical 90-day arc."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {serviceEngagements.map((engagement) => (
              <article
                key={engagement.id}
                id={engagement.id}
                className="scroll-mt-24 flex flex-col rounded-2xl border bg-card p-6"
              >
                <h2 className="text-xl font-semibold tracking-tight">
                  {engagement.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">For: </span>
                  {engagement.forWho}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                  <span className="font-medium">Outcome: </span>
                  {engagement.outcome}
                </p>

                <dl className="mt-5 grid gap-3 border-t pt-5 text-sm sm:grid-cols-3">
                  <div>
                    <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      30 days
                    </dt>
                    <dd className="mt-1 text-muted-foreground">{engagement.days30}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      60 days
                    </dt>
                    <dd className="mt-1 text-muted-foreground">{engagement.days60}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      90 days
                    </dt>
                    <dd className="mt-1 text-muted-foreground">{engagement.days90}</dd>
                  </div>
                </dl>

                <ul className="mt-5 space-y-1.5 border-t pt-5 text-sm text-muted-foreground">
                  {engagement.deliverables.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="muted" className="border-y">
        <div className="container py-14">
          <SectionHeader
            eyebrow="Capability catalog"
            title="How we staff the work"
            description="Capabilities we draw from when shaping an engagement. Most clients buy an outcome above — not a single line item."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {groups.map((group) => {
              const items = services.filter((s) => s.group === group);
              return (
                <div key={group} className="rounded-2xl border bg-card px-5">
                  <Accordion type="single" collapsible>
                    <AccordionItem value={group} className="border-none">
                      <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                        {group}
                        <span className="ml-2 text-xs font-normal text-muted-foreground">
                          ({items.length})
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-4 pb-2">
                          {items.map((s) => (
                            <li key={s.title}>
                              <p className="text-sm font-medium text-foreground">
                                {s.title}
                              </p>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {s.description}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border bg-background p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-semibold">Not sure which engagement fits?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tell us the outcome you need — we’ll recommend a path.
              </p>
            </div>
            <Button asChild>
              <NavLink to="/contact">
                Talk with us <ArrowRight />
              </NavLink>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
