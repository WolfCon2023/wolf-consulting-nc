import { ArrowRight, Phone } from "lucide-react";
import { NavLink } from "react-router-dom";

import { Seo } from "@/components/seo/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { site } from "@/config/site";

export function HomePage() {
  return (
    <>
      <Seo title="Home" path="/" />

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

      <section>
        <div className="container py-16">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Tailored Agile Transformation</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Leveraging Agile Coaching, Certified Scrum Masters, and Certified
                Product Owners, we customize agile methodologies to suit your
                organization's unique requirements, ensuring seamless adoption and
                alignment with business objectives.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Holistic IT Optimization</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                With IT Consulting, Operational Planning, and Implementation
                Planning, we provide comprehensive solutions to streamline IT
                processes, enhance operational efficiency, and drive business
                transformation.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Strategic Technology Alignment</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Through Technology Strategy Assessment, Architectural Planning, and
                Strategic Consultation, we help align technology strategy with
                business goals—optimizing scalability, flexibility, and innovation.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="container py-16">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight">
                Discover more about {site.legalName}
              </h2>
              <p className="mt-3 text-muted-foreground">
                Discover the power of expertise and innovation at Wolf Consulting
                Group, LLC. Explore our journey, methodologies, and motivations in
                transforming businesses through technology. Join us in shaping the
                future of IT solutions, one success story at a time.
              </p>
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
                <CardTitle>Enhance Your Connections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Elevate your communication and foster collaboration. Let us guide
                  your path to success in the digital landscape.
                </p>
                <Button asChild>
                  <NavLink to="/contact">
                    Contact <ArrowRight />
                  </NavLink>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}



