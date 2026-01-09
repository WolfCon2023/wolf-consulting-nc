import { Seo } from "@/components/seo/seo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { services } from "@/content/services";

export function ServicesPage() {
  return (
    <>
      <Seo
        title="Services"
        path="/services"
        description="Agile coaching, Scrum leadership, IT consulting, strategy, application development, support, and engineering services."
      />

      <section className="border-b">
        <div className="container py-14 md:py-20">
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Our services.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Practical, outcome-focused support across agile transformation, IT strategy,
            delivery, and engineering.
          </p>
        </div>
      </section>

      <section>
        <div className="container py-14">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Service catalog</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Explore our core offerings. If you don’t see exactly what you need,
                reach out—many engagements are tailored.
              </CardContent>
            </Card>

            <div className="rounded-xl border bg-card">
              <Accordion type="single" collapsible className="px-6">
                {services.map((s) => (
                  <AccordionItem key={s.title} value={s.title}>
                    <AccordionTrigger>{s.title}</AccordionTrigger>
                    <AccordionContent>{s.description}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}



