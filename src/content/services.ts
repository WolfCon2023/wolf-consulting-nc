export type ServiceEngagement = {
  id: string;
  title: string;
  forWho: string;
  outcome: string;
  days30: string;
  days60: string;
  days90: string;
  deliverables: string[];
};

/** Primary offers — how clients actually buy, not a laundry list of buzzwords. */
export const serviceEngagements: ServiceEngagement[] = [
  {
    id: "agile-delivery",
    title: "Agile delivery coaching",
    forWho: "Leaders and teams stuck in process theater or inconsistent delivery.",
    outcome: "Clearer priorities, a sustainable cadence, and throughput you can measure.",
    days30: "Baseline flow, roles, and friction; establish a working cadence.",
    days60: "Coach ceremonies that matter; cut waste; align stakeholders to outcomes.",
    days90: "Team owns the system; leadership has a simple scoreboard for progress.",
    deliverables: [
      "Current-state delivery map",
      "Working agreements + cadence plan",
      "Leadership dashboard for outcomes",
    ],
  },
  {
    id: "it-strategy",
    title: "IT & technology strategy",
    forWho: "Operators who need technology decisions tied to business goals — not slide decks.",
    outcome: "A prioritized roadmap with risks, sequencing, and what not to build.",
    days30: "Assess systems, constraints, and decision bottlenecks.",
    days60: "Architecture options, cost/risk tradeoffs, and a 2–4 quarter plan.",
    days90: "Execution kickoff with owners, milestones, and success metrics.",
    deliverables: [
      "Strategy assessment brief",
      "Target architecture outline",
      "Prioritized implementation roadmap",
    ],
  },
  {
    id: "product-build",
    title: "Custom product & platform build",
    forWho: "Organizations that need software shaped to their workflows — clinics, firms, operators.",
    outcome: "A shipped increment users can run, with a path to production support.",
    days30: "Scope the MVP, data model, and UX against real workflows.",
    days60: "Build and validate the core loop with stakeholder feedback.",
    days90: "Harden, deploy, and hand off runbooks + training.",
    deliverables: [
      "Product brief + MVP scope",
      "Working software increment",
      "Launch checklist + support plan",
    ],
  },
  {
    id: "ops-reliability",
    title: "Operations & reliability support",
    forWho: "Teams that need systems kept healthy while they grow — apps, infra, and help desk.",
    outcome: "Fewer fire drills, clearer ownership, and support that scales with usage.",
    days30: "Stabilize critical paths; define severity and response norms.",
    days60: "Instrument monitoring, patching, and support workflows.",
    days90: "Steady-state support with measurable SLAs and continuous improvement.",
    deliverables: [
      "Support / severity model",
      "Runbooks for critical systems",
      "Monthly reliability readout",
    ],
  },
];

export type Service = {
  title: string;
  description: string;
  group: "Agile & delivery" | "Strategy & architecture" | "Build & engineering" | "Support & operations";
};

/** Detailed catalog — still available, grouped under each engagement. */
export const services: Service[] = [
  {
    group: "Agile & delivery",
    title: "Agile coaching",
    description:
      "Hands-on coaching to adopt agile practices that fit your constraints — not a one-size framework drop-in.",
  },
  {
    group: "Agile & delivery",
    title: "Scrum Master leadership",
    description:
      "Certified Scrum Masters who protect focus, remove blockers, and keep delivery honest.",
  },
  {
    group: "Agile & delivery",
    title: "Product ownership support",
    description:
      "Certified Product Owners who prioritize ruthlessly, align stakeholders, and keep value visible.",
  },
  {
    group: "Strategy & architecture",
    title: "IT consulting",
    description:
      "Strategic guidance for IT processes and systems with practical recommendations you can execute.",
  },
  {
    group: "Strategy & architecture",
    title: "Technology strategy assessment",
    description:
      "Evaluate current strategy, surface gaps, and align technology choices to business objectives.",
  },
  {
    group: "Strategy & architecture",
    title: "Architectural planning",
    description:
      "Scalable, flexible architecture plans tailored to your stack, risk tolerance, and growth path.",
  },
  {
    group: "Strategy & architecture",
    title: "Implementation & operational planning",
    description:
      "Project sequencing, resource plans, and operational workflows that survive contact with reality.",
  },
  {
    group: "Build & engineering",
    title: "Application development",
    description:
      "Custom applications shaped to unique workflows — from concept through production.",
  },
  {
    group: "Build & engineering",
    title: "Software engineering",
    description:
      "Engineers who ship maintainable software with clear ownership and documentation.",
  },
  {
    group: "Build & engineering",
    title: "Infrastructure engineering",
    description:
      "Design and implement infrastructure that supports security, performance, and day-to-day operations.",
  },
  {
    group: "Support & operations",
    title: "Application support",
    description:
      "Ongoing maintenance: troubleshooting, fixes, and performance work so production stays calm.",
  },
  {
    group: "Support & operations",
    title: "Help desk support",
    description:
      "User-facing support for technical issues so your team stays productive.",
  },
  {
    group: "Support & operations",
    title: "Service delivery management",
    description:
      "Oversight of IT service delivery, metrics, and continuous improvement of quality.",
  },
];
