import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "Wolf Consulting helped us align delivery with outcomes. The agile coaching was practical, not theoretical—and we saw immediate improvements in clarity and throughput.",
    by: "Delivery leader (confidential)",
  },
  {
    quote:
      "We came in for strategy and left with a plan we could actually execute. Strong communication, solid architecture thinking, and reliable follow-through.",
    by: "Technology stakeholder (confidential)",
  },
  {
    quote:
      "Great partner for modernizing our approach: coaching, process, and engineering support all in one. The engagement felt structured and calm.",
    by: "Operations manager (confidential)",
  },
] as const;

export function Testimonials() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {testimonials.map((t) => (
        <Card key={t.by}>
          <CardContent className="p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              “{t.quote}”
            </p>
            <div className="mt-4 text-sm font-semibold">{t.by}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

