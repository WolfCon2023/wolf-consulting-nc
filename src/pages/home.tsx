import { Seo } from "@/components/seo/seo";
import { CaseStudies } from "@/components/marketing/case-studies";
import { Faq } from "@/components/marketing/faq";
import { Hero } from "@/components/marketing/hero";
import { Products } from "@/components/marketing/products";
import { Section, SectionHeader } from "@/components/marketing/section";
import { TrustBadges } from "@/components/marketing/trust-badges";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { site } from "@/config/site";
import { homeFaq } from "@/content/faq";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { NavLink } from "react-router-dom";

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
        description="Wolf Consulting Group builds purpose-built software for clinics, accounting firms, and operators — plus agile coaching and IT strategy that stick."
      />

      <Hero />

      <Section>
        <div className="container py-14">
          <SectionHeader
            eyebrow="Why teams choose us"
            title="A partner for systems and delivery"
            description="Minority veteran-owned. Based in Waxhaw, NC. Built for leaders who want clarity, momentum, and software they can actually run."
            align="center"
          />
          <div className="mt-10">
            <TrustBadges />
          </div>
        </div>
      </Section>

      <Section id="products">
        <div className="container py-14">
          <SectionHeader
            eyebrow="Products"
            title="Try the platforms we ship"
            description="Interactive demos for back office, chiropractic practice management, and accounting firms — fictional data, real workflows."
            align="center"
          />
          <div className="mt-10">
            <Products />
          </div>
        </div>
      </Section>

      <Section tone="muted" className="border-y">
        <div className="container py-14">
          <SectionHeader
            eyebrow="Consulting"
            title="When you need people, not just software"
            description="Coaching, strategy, and engineering support for teams that need to move — without slowing delivery down."
          />

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Agile that fits your constraints",
                body: "Practical coaching for leaders and teams — aligned to goals, not textbooks.",
              },
              {
                title: "IT that supports the business",
                body: "Strategy, reliability, and delivery improvements across systems and teams.",
              },
              {
                title: "Technology that scales with intent",
                body: "Architecture and planning that connect investments to outcomes.",
              },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-primary/20 pl-4">
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <NavLink to="/services">
                Explore services <ArrowRight />
              </NavLink>
            </Button>
            <Button asChild variant="outline">
              <NavLink to="/contact">Book a consultation</NavLink>
            </Button>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container py-16">
          <div className="grid items-start gap-10 md:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="How we work"
                title="Clear, calm execution"
                description="You’ll always know what we’re doing, why it matters, and what’s next."
              />
              <ul className="mt-6 grid gap-3 text-sm text-muted-foreground">
                {[
                  "Discovery call → align goals, constraints, and success metrics.",
                  "Lightweight assessment → surface risks, priorities, and quick wins.",
                  "Engagement plan → scope, timeline, and cadence your team can sustain.",
                  "Delivery + enablement → practical outcomes and team capability.",
                ].map((line) => (
                  <li key={line} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-foreground" />
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button asChild variant="secondary">
                  <NavLink to="/about">
                    About Wolf Consulting <ArrowRight />
                  </NavLink>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border bg-muted/20 p-6 md:p-8">
              <h3 className="text-xl font-semibold tracking-tight">Two clear paths</h3>
              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-sm font-semibold">Need software?</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Open a product demo, then request a walkthrough tailored to your
                    clinic, firm, or operations team.
                  </p>
                  <Button asChild className="mt-3" variant="outline">
                    <NavLink to="/products">
                      Browse products <ArrowRight />
                    </NavLink>
                  </Button>
                </div>
                <div className="border-t pt-5">
                  <p className="text-sm font-semibold">Need consulting?</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Tell us what you’re trying to achieve. We’ll recommend coaching,
                    strategy, or engineering support.
                  </p>
                  <Button asChild className="mt-3">
                    <NavLink to="/contact">
                      Book a consultation <ArrowRight />
                    </NavLink>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted" className="border-y">
        <div className="container py-14">
          <SectionHeader
            eyebrow="Proof"
            title="Outcomes from recent engagements"
            description="Attributed by role and organization type. Named logos and quotes available when clients approve public use."
          />
          <div className="mt-8">
            <CaseStudies />
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
                <CardTitle>Prefer a structured intake?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Share goals, timelines, and constraints through our questionnaire.
                  We’ll review it and follow up with recommendations.
                </p>
                <Button asChild>
                  <NavLink to="/questionnaire">
                    Start the questionnaire <ArrowRight />
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
