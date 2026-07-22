import { CalendarDays, ExternalLink, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

export function BookingPanel() {
  const calLink = site.booking.calLink.trim();
  const hasCal = Boolean(calLink);
  const embedSrc = hasCal
    ? `https://cal.com/${calLink}?embed=true&theme=light`
    : null;

  return (
    <div className="rounded-2xl border bg-card p-6 md:p-8">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted">
          <CalendarDays className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            {site.booking.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {site.booking.description}
          </p>
        </div>
      </div>

      {embedSrc ? (
        <>
          <iframe
            title={site.booking.title}
            src={embedSrc}
            className="mt-6 h-[640px] w-full rounded-xl border bg-background"
            loading="lazy"
          />
          <p className="mt-3 text-xs text-muted-foreground">
            Prefer email?{" "}
            <a
              className="font-medium text-foreground hover:underline"
              href={`mailto:${site.contact.email}`}
            >
              {site.contact.email}
            </a>
          </p>
        </>
      ) : (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Pick a channel — we’ll confirm a time that works for both sides
            (typically within one business day).
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={`tel:${site.contact.phone}`}>
                <Phone /> Call {site.contact.phone}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Consultation request")}`}
              >
                <Mail /> Email to schedule
              </a>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Hours: {site.hours.days}, {site.hours.time}. To embed Cal.com, set{" "}
            <code className="rounded bg-muted px-1">site.booking.calLink</code> to
            your event path (e.g.{" "}
            <code className="rounded bg-muted px-1">your-org/30min</code>).
            {site.booking.externalUrl ? (
              <>
                {" "}
                Or open{" "}
                <a
                  className="inline-flex items-center gap-1 font-medium text-foreground hover:underline"
                  href={site.booking.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  the booking page <ExternalLink className="h-3 w-3" />
                </a>
                .
              </>
            ) : null}
          </p>
        </div>
      )}
    </div>
  );
}
