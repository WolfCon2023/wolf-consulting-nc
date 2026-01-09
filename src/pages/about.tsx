import { Seo } from "@/components/seo/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { site } from "@/config/site";

export function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        path="/about"
        description="Learn about Wolf Consulting Group, LLC—our story, motivations, and methodologies across agile and IT delivery."
      />

      <section className="border-b">
        <div className="container py-14 md:py-20">
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Professional Expertise
          </h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            {site.legalName} is a minority veteran-owned business. Established in
            February 2023 in Waxhaw, North Carolina, our firm embodies a commitment to
            excellence, integrity, and service. We believe in the power of expertise,
            innovation, and dedication to drive transformative change for our clients.
          </p>
        </div>
      </section>

      <section>
        <div className="container py-14">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Our Inception</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Founded by a minority, disabled veteran with over 25 years of extensive
                experience in information technology, our firm emerged from a vision to
                bridge the gap between cutting-edge technology and real-world business
                challenges. Our inception marks the beginning of a journey to empower
                organizations with strategic IT solutions that drive success and
                innovation.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Motivations</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Our motivations stem from a deep-seated passion for leveraging technology
                to catalyze positive change and growth. We are driven by the desire to
                empower organizations with the tools, strategies, and support they need
                to thrive in an ever-evolving digital landscape.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Identity</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {site.legalName} stands as a beacon of reliability and proficiency in
                the realm of information technology solutions. Our identity is rooted in
                our unwavering dedication to delivering exceptional results tailored to
                the unique needs of each client we serve.
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Our Methodologies</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                We employ a diverse range of methodologies honed through years of hands-on
                experience and continuous learning. From agile project management to scrum
                master expertise, infrastructure engineering to software development, our
                methodologies encompass a comprehensive spectrum of IT disciplines aimed at
                delivering impactful results.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Where we’re based</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {site.location.city}, {site.location.state} {site.location.postalCode}
                <div className="mt-3">
                  <div>
                    <span className="font-medium text-foreground">Hours:</span>{" "}
                    {site.hours.days}, {site.hours.time}
                  </div>
                  <div className="mt-1">
                    <span className="font-medium text-foreground">Contact:</span>{" "}
                    {site.contact.email} · {site.contact.phone}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}


