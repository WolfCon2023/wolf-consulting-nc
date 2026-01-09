import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { homeFaq, type FaqItem } from "@/content/faq";

export function Faq({ items = homeFaq }: { items?: FaqItem[] }) {
  return (
    <div className="rounded-xl border bg-card">
      <Accordion type="single" collapsible className="px-6">
        {items.map((i) => (
          <AccordionItem key={i.q} value={i.q}>
            <AccordionTrigger>{i.q}</AccordionTrigger>
            <AccordionContent>{i.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

