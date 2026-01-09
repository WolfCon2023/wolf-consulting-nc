import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Seo } from "@/components/seo/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/config/site";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  message: z.string().min(10, "Please add a bit more detail (10+ characters)."),
  companyWebsite: z.string().optional(), // honeypot
  turnstileToken: z.string().optional(),
  source: z.enum(["contact", "questionnaire"]).optional(),
});

type ContactValues = z.infer<typeof contactSchema>;

export function ContactPage() {
  const [status, setStatus] = useState<
    | { state: "idle" }
    | { state: "submitting" }
    | { state: "success" }
    | { state: "error"; message: string }
  >({ state: "idle" });

  const defaultValues = useMemo<ContactValues>(
    () => ({
      name: "",
      email: "",
      phone: "",
      message: "",
      companyWebsite: "",
      turnstileToken: "",
    }),
    [],
  );

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  async function onSubmit(values: ContactValues) {
    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, source: "contact" }),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error || `Request failed (${res.status})`);
      }

      form.reset(defaultValues);
      setStatus({ state: "success" });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setStatus({ state: "error", message: msg });
    }
  }

  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description="Reach out to Wolf Consulting Group, LLC for agile transformation and IT strategy guidance."
      />

      <section className="border-b">
        <div className="container py-14 md:py-20">
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Enhance Your Business with Our Consultation
          </h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Reach out to us for expert guidance on agile transformation and IT
            strategy. Let us navigate the complexities of IT services together,
            ensuring a seamless experience for your business.
          </p>
        </div>
      </section>

      <section>
        <div className="container grid gap-6 py-14 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Contact details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-foreground" />
                <div>
                  <div className="font-medium text-foreground">Email</div>
                  <a className="hover:underline" href={`mailto:${site.contact.email}`}>
                    {site.contact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-foreground" />
                <div>
                  <div className="font-medium text-foreground">Phone</div>
                  <a className="hover:underline" href={`tel:${site.contact.phone}`}>
                    {site.contact.phone}
                  </a>
                </div>
              </div>
              <div>
                <div className="font-medium text-foreground">Location</div>
                {site.location.city}, {site.location.state} {site.location.postalCode}
              </div>
              <div>
                <div className="font-medium text-foreground">Hours</div>
                {site.hours.days}, {site.hours.time}
              </div>
              <p className="text-xs">
                Do not include sensitive information (e.g., passwords, SSNs, or payment
                details).
              </p>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" autoComplete="name" {...form.register("name")} />
                  {form.formState.errors.name ? (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.name.message}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
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

                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input id="phone" autoComplete="tel" {...form.register("phone")} />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" {...form.register("message")} />
                  {form.formState.errors.message ? (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.message.message}
                    </p>
                  ) : null}
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
                        <Loader2 className="animate-spin" /> Sending…
                      </>
                    ) : (
                      "Send message"
                    )}
                  </Button>
                  {status.state === "success" ? (
                    <p className="text-sm text-foreground">
                      Thanks—your message was sent. A member of our team will reach out
                      shortly (typically within 1 business day).
                    </p>
                  ) : null}
                  {status.state === "error" ? (
                    <p className="text-sm text-destructive">{status.message}</p>
                  ) : null}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}


