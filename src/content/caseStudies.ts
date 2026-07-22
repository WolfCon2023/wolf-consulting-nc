export type CaseStudy = {
  id: string;
  industry: string;
  role: string;
  challenge: string;
  approach: string;
  results: string[];
  quote: string;
};

/**
 * Representative engagement outcomes.
 * Attributed by role + organization type (not named companies) unless/until
 * clients approve public logos and quotes.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "clinic-ops",
    industry: "Multi-provider outpatient clinic",
    role: "Clinic operations lead",
    challenge:
      "Scheduling, notes, and billing lived in separate tools. Front desk re-entered data; revenue follow-up lagged.",
    approach:
      "Mapped the visit-to-claim loop, piloted a unified practice workspace, and coached the front desk on a single check-in cadence.",
    results: [
      "Front-desk re-entry cut on core visit fields",
      "Clearer same-day visibility into open notes and A/R",
      "Staff trained on one workflow instead of three apps",
    ],
    quote:
      "We finally stopped asking which system was the source of truth for a visit. The team could see the day — and the follow-ups — in one place.",
  },
  {
    id: "accounting-firm",
    industry: "Regional accounting firm",
    role: "Firm managing partner",
    challenge:
      "Client books, bank rec, and tax prep were fragmented. Month-end felt like a scramble every cycle.",
    approach:
      "Stood up a multi-client firm workspace, standardized close checklists, and staged AR/AP and reconciliation for the top client panel.",
    results: [
      "Close checklist visible across the client panel",
      "Fewer missed bank-rec and filing follow-ups",
      "Partners could see status without chasing spreadsheets",
    ],
    quote:
      "The difference wasn’t more meetings — it was seeing every client’s close status without opening five workbooks.",
  },
  {
    id: "delivery-coaching",
    industry: "Mid-size services company",
    role: "Director of delivery",
    challenge:
      "Agile ceremonies were busy but outcomes were fuzzy. Stakeholders couldn’t tell what shipped or why dates slipped.",
    approach:
      "Reset working agreements, tied backlog to measurable outcomes, and installed a lightweight leadership scoreboard.",
    results: [
      "Sprint goals tied to stakeholder outcomes",
      "Fewer mid-sprint priority thrash events",
      "Leadership review shortened to a single scoreboard",
    ],
    quote:
      "Coaching was practical, not theatrical. Within a few cycles we had clearer priorities and a cadence the team could sustain.",
  },
];
