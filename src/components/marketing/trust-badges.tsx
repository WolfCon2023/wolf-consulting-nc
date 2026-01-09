import { ShieldCheck, Star, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { site } from "@/config/site";

const items = [
  {
    icon: ShieldCheck,
    title: "Minority veteran-owned",
    description: "Built on integrity, accountability, and service.",
  },
  {
    icon: Users,
    title: "Hands-on delivery",
    description: "Collaborative coaching + practical engineering outcomes.",
  },
  {
    icon: Star,
    title: "Established 2023",
    description: `${site.location.city}, ${site.location.state}`,
  },
] as const;

export function TrustBadges() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((i) => (
        <Card key={i.title} className="hover:shadow-sm">
          <CardContent className="flex items-start gap-3 p-5">
            <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-foreground">
              <i.icon className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <div className="font-semibold">{i.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {i.description}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

