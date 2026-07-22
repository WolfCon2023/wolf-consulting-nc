import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

import { Seo } from "@/components/seo/seo";
import { Section, SectionHeader } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

export function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        path="/about"
        description="Wolf Consulting Group is a minority veteran-owned firm in Waxhaw, NC — building software and coaching teams with 25+ years of IT experience behind the work."
      />

      <section className="relative overflow-hidden border-b bg-[hsl(222_47%_9%)] text-[hsl(210_40%_98%)]">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 50% at 80% 0%, hsl(45 93% 47% / 0.14), transparent 55%)",
          }}
        />
        <div className="container relative py-14 md:py-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-[hsl(45_93%_55%)] uppercase">
            About
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Built by practitioners — not deck writers.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-white/70">
            {site.legalName} is a minority, disabled-veteran-owned firm founded in
            February 2023 in {site.location.city}, {site.location.state}. We combine
            more than 25 years of hands-on IT experience with product building and
            delivery coaching.
          </p>
        </div>
      </section>

      <Section>
        <div className="container py-14">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              <SectionHeader
                eyebrow="Our story"
                title="Why we exist"
                description="Too many organizations buy tools or frameworks that never fit the work. We started Wolf Consulting Group to close that gap — ship software that matches real workflows, and coach teams so the change sticks."
              />
              <p>
                The founder’s career spans infrastructure, software delivery, and
                leadership coaching. That mix shapes how we work: we won’t recommend
                what we wouldn’t run ourselves, and we won’t leave you with a slide
                deck where an operating system is what’s needed.
              </p>
              <p>
                Today that means purpose-built products — BOAZ-OS, OptiAlign, and
                LedgerOS — alongside consulting engagements for agile delivery, IT
                strategy, and custom builds.
              </p>
            </div>

            <aside className="h-fit rounded-2xl border bg-muted/20 p-6">
              <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                At a glance
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Ownership</dt>
                  <dd className="mt-1 font-medium text-foreground">
                    Minority & disabled-veteran owned
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Founded</dt>
                  <dd className="mt-1 font-medium text-foreground">
                    February 2023 · {site.location.city}, {site.location.state}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Experience behind the work</dt>
                  <dd className="mt-1 font-medium text-foreground">
                    25+ years in information technology
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Hours</dt>
                  <dd className="mt-1 font-medium text-foreground">
                    {site.hours.days}, {site.hours.time}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Contact</dt>
                  <dd className="mt-1 font-medium text-foreground">
                    <a className="hover:underline" href={`mailto:${site.contact.email}`}>
                      {site.contact.email}
                    </a>
                    <br />
                    <a className="hover:underline" href={`tel:${site.contact.phone}`}>
                      {site.contact.phone}
                    </a>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </Section>

      <Section tone="muted" className="border-y">
        <div className="container py-14">
          <SectionHeader
            eyebrow="How we show up"
            title="What we refuse to do"
            description="Boundaries matter as much as capabilities."
          />
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "No framework theater",
                body: "We don’t install ceremonies that don’t change outcomes. Cadence must earn its keep.",
              },
              {
                title: "No shelfware roadmaps",
                body: "Strategy ends with owners, sequencing, and what we will not build.",
              },
              {
                title: "No black-box handoffs",
                body: "Software ships with runbooks, training, and a path your team can operate.",
              },
            ].map((item) => (
              <li key={item.title} className="rounded-2xl border bg-card p-5">
                <h3 className="font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="container py-14">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Ready to talk?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Whether you need a product walkthrough or a delivery engagement, we’ll
                start with the outcome you need.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <NavLink to="/contact">
                  Book a consultation <ArrowRight />
                </NavLink>
              </Button>
              <Button asChild variant="outline">
                <NavLink to="/products">Explore products</NavLink>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
