import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { z } from "zod";

import { Seo } from "@/components/seo/seo";
import { Section, SectionHeader } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/config/site";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  organization: z.string().optional(),
  website: z.string().url("Please enter a valid URL (include https://)").optional().or(z.literal("")),
  goals: z.string().min(10, "Tell us a bit more (10+ characters)."),
  timeline: z.string().optional(),
  budgetRange: z.string().optional(),
  notes: z.string().optional(),
  companyWebsite: z.string().optional(), // honeypot
});

type Values = z.infer<typeof schema>;

export function QuestionnairePage() {
  const [status, setStatus] = useState<
    | { state: "idle" }
    | { state: "submitting" }
    | { state: "success" }
    | { state: "error"; message: string }
  >({ state: "idle" });

  const defaults = useMemo<Values>(
    () => ({
      name: "",
      email: "",
      organization: "",
      website: "",
      goals: "",
      timeline: "",
      budgetRange: "",
      notes: "",
      companyWebsite: "",
    }),
    [],
  );

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
  });

  async function onSubmit(values: Values) {
    setStatus({ state: "submitting" });
    try {
      // Reuse /api/contact for now: send the questionnaire as a formatted message.
      const message = [
        "Website Questionnaire",
        "",
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Organization: ${values.organization || "(not provided)"}`,
        `Website: ${values.website || "(not provided)"}`,
        `Timeline: ${values.timeline || "(not provided)"}`,
        `Budget range: ${values.budgetRange || "(not provided)"}`,
        "",
        "Goals:",
        values.goals,
        "",
        "Notes:",
        values.notes || "(not provided)",
      ].join("\n");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: "",
          message,
          companyWebsite: values.companyWebsite,
        }),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error || `Request failed (${res.status})`);
      }

      form.reset(defaults);
      setStatus({ state: "success" });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setStatus({ state: "error", message: msg });
    }
  }

  return (
    <>
      <Seo
        title="Website Questionnaire"
        path="/questionnaire"
        description="Share your goals and constraints so we can recommend the right next step."
      />

      <Section className="border-b">
        <div className="container py-14 md:py-20">
          <SectionHeader
            eyebrow="Lead capture"
            title="Website Questionnaire"
            description="Share a few details about what you’re building. We’ll follow up with recommendations and next steps."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <NavLink to={site.ctas.primary.href}>
                Book a Consultation <ArrowRight />
              </NavLink>
            </Button>
            <Button asChild variant="outline">
              <NavLink to="/services">View Services</NavLink>
            </Button>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container py-14">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Tell us about your project</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" autoComplete="name" {...form.register("name")} />
                      {form.formState.errors.name ? (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.name.message}
                        </p>
                      ) : null}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        {...form.register("email")}
                      />
                      {form.formState.errors.email ? (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.email.message}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="organization">Organization (optional)</Label>
                      <Input id="organization" {...form.register("organization")} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="website">Website (optional)</Label>
                      <Input
                        id="website"
                        placeholder="https://example.com"
                        {...form.register("website")}
                      />
                      {form.formState.errors.website ? (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.website.message}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="goals">Goals</Label>
                    <Textarea
                      id="goals"
                      placeholder="What are you building? What does success look like?"
                      {...form.register("goals")}
                    />
                    {form.formState.errors.goals ? (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.goals.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="timeline">Timeline (optional)</Label>
                      <Input
                        id="timeline"
                        placeholder="e.g., 2–4 weeks"
                        {...form.register("timeline")}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="budgetRange">Budget range (optional)</Label>
                      <Input
                        id="budgetRange"
                        placeholder="e.g., $5k–$10k"
                        {...form.register("budgetRange")}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="notes">Anything else? (optional)</Label>
                    <Textarea id="notes" {...form.register("notes")} />
                  </div>

                  {/* Honeypot (spam trap) */}
                  <div className="hidden">
                    <Label htmlFor="companyWebsite">Company Website</Label>
                    <Input id="companyWebsite" {...form.register("companyWebsite")} />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button type="submit" disabled={status.state === "submitting"}>
                      {status.state === "submitting" ? (
                        <>
                          <Loader2 className="animate-spin" /> Submitting…
                        </>
                      ) : (
                        "Submit questionnaire"
                      )}
                    </Button>
                    {status.state === "success" ? (
                      <p className="text-sm text-foreground">
                        Thanks—submitted successfully. We’ll follow up soon.
                      </p>
                    ) : null}
                    {status.state === "error" ? (
                      <p className="text-sm text-destructive">{status.message}</p>
                    ) : null}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="h-fit">
              <CardHeader>
                <CardTitle>What happens next</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>1) We review your answers and identify the fastest path to value.</p>
                <p>2) We follow up to confirm scope, timeline, and success metrics.</p>
                <p>
                  3) You receive a recommended plan (coaching, strategy, or engineering
                  support).
                </p>
                <p className="text-xs">
                  Please don’t include passwords, SSNs, or payment info.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}

