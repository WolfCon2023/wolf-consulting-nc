import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { NavLink } from "react-router-dom";

import { Seo } from "@/components/seo/seo";
import { Faq } from "@/components/marketing/faq";
import { Section, SectionHeader } from "@/components/marketing/section";
import { Testimonials } from "@/components/marketing/testimonials";
import { TrustBadges } from "@/components/marketing/trust-badges";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { site } from "@/config/site";
import { homeFaq } from "@/content/faq";

export function HomePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: site.legalName,
      url: site.url,
      telephone: site.contact.phone,
      email: site.contact.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location.city,
        addressRegion: site.location.state,
        postalCode: site.location.postalCode,
        addressCountry: "US",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: homeFaq.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    },
  ];

  return (
    <>
      <Seo
        title="Home"
        path="/"
        jsonLd={jsonLd}
        description="Agile coaching, IT consulting, and technology strategy tailored to your organization—delivered with integrity and measurable outcomes."
      />

      <section className="border-b">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              Agile. Strategic. Powerful. Wolf Consulting.
            </h1>
            <p className="mt-5 text-pretty text-lg text-muted-foreground md:text-xl">
              Empower your business growth. Transform your strategies into impactful
              results tailored to your unique business needs.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2">
                <CheckCircle2 className="h-4 w-4" /> Minority veteran-owned
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2">
                <CheckCircle2 className="h-4 w-4" /> Based in Waxhaw, NC
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2">
                <CheckCircle2 className="h-4 w-4" /> Agile + IT strategy + engineering
              </span>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <NavLink to={site.ctas.primary.href}>
                  {site.ctas.primary.label} <ArrowRight />
                </NavLink>
              </Button>
              <Button asChild size="lg" variant="outline">
                <NavLink to={site.ctas.secondary.href}>{site.ctas.secondary.label}</NavLink>
              </Button>
            </div>
            <div className="mt-6 text-sm text-muted-foreground">
              Prefer to talk now?{" "}
              <a className="font-medium text-foreground hover:underline" href={`tel:${site.contact.phone}`}>
                <span className="inline-flex items-center gap-1">
                  <Phone className="h-4 w-4" /> {site.contact.phone}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="container py-14">
          <SectionHeader
            eyebrow="Trust"
            title="A partner you can rely on"
            description="Built for leaders who want clarity, momentum, and outcomes—not noise."
            align="center"
          />
          <div className="mt-10">
            <TrustBadges />
          </div>
        </div>
      </Section>

      <Section tone="muted" className="border-y">
        <div className="container py-14">
          <SectionHeader
            eyebrow="Core outcomes"
            title="Make progress you can measure"
            description="A focused set of services that help you plan, deliver, and improve—without slowing teams down."
          />

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Tailored Agile Transformation</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Coaching and leadership to implement agile practices that fit your
                organization—aligned to business goals and real constraints.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Holistic IT Optimization</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Strategy, planning, and delivery improvements to streamline IT
                processes and increase reliability across teams and systems.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Strategic Technology Alignment</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Assessments and architectural planning to align technology
                investments with outcomes, scalability, and long-term resilience.
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <NavLink to="/services">
                Explore Services <ArrowRight />
              </NavLink>
            </Button>
            <Button asChild variant="outline">
              <NavLink to="/questionnaire">Start Website Questionnaire</NavLink>
            </Button>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container py-16">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="How we work"
                title="Clear, calm execution"
                description="You’ll always know what we’re doing, why it matters, and what’s next. We keep momentum without sacrificing quality."
              />
              <ul className="mt-6 grid gap-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-foreground" />
                  Discovery call → align goals, constraints, and success metrics.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-foreground" />
                  Lightweight assessment → surface risks, priorities, and quick wins.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-foreground" />
                  Engagement plan → scope, timeline, and cadence your team can sustain.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-foreground" />
                  Delivery + enablement → practical outcomes and team capability.
                </li>
              </ul>
              <div className="mt-6">
                <Button asChild variant="secondary">
                  <NavLink to="/about">
                    About Wolf Consulting <ArrowRight />
                  </NavLink>
                </Button>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Ready to get started?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Tell us what you’re trying to achieve. We’ll recommend a path
                  forward—whether that’s coaching, strategy, or engineering support.
                </p>
                <Button asChild>
                  <NavLink to="/contact">
                    Book a Consultation <ArrowRight />
                  </NavLink>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      <Section tone="muted" className="border-y">
        <div className="container py-14">
          <SectionHeader
            eyebrow="Results"
            title="What clients say"
            description="High-trust delivery, practical guidance, and outcomes your stakeholders can see."
          />
          <div className="mt-8">
            <Testimonials />
          </div>
        </div>
      </Section>

      <Section>
        <div className="container py-14">
          <SectionHeader
            eyebrow="FAQ"
            title="Common questions"
            description="If you have a different question, contact us and we’ll respond quickly."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Faq />
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Fastest way to scope your needs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Use our questionnaire to share goals, timelines, and constraints.
                  We’ll review it and follow up with recommendations.
                </p>
                <Button asChild>
                  <NavLink to="/questionnaire">
                    Start the Questionnaire <ArrowRight />
                  </NavLink>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}



