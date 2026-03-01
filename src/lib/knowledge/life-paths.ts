// ============================================================
// Life Path Numerology Data
// ============================================================

export interface LifePathInfo {
  archetype: string;
  coreTraits: string[];
  shadow: string[];
  financialPattern: string;
  lesson: string;
  businessModel: string;
}

export const LIFE_PATH_DATA: Record<number, LifePathInfo> = {
  1: {
    archetype: "The Leader",
    coreTraits: ["Independent", "Original", "Initiating", "Ambitious"],
    shadow: ["Ego", "Isolation", "Domination", "Impatience"],
    financialPattern:
      "Creates own wealth through initiative. Natural entrepreneur. Money flows when leading, not following. Risk: financial independence can lead to isolation in business.",
    lesson: "To lead while including others",
    businessModel: "Entrepreneurship, solo ventures, pioneering",
  },
  2: {
    archetype: "The Diplomat",
    coreTraits: ["Cooperative", "Sensitive", "Intuitive", "Patient"],
    shadow: ["Over-dependence", "Passivity", "Oversensitivity", "Indecision"],
    financialPattern:
      "Wealth through partnership and collaboration. Best in supporting roles or as part of a team. Risk: giving away power in financial negotiations.",
    lesson: "To cooperate while maintaining boundaries",
    businessModel: "Partnerships, mediation, support services",
  },
  3: {
    archetype: "The Communicator",
    coreTraits: ["Creative", "Expressive", "Optimistic", "Social"],
    shadow: ["Scattered", "Superficial", "Escapism", "Unfocused"],
    financialPattern:
      "Money through creative expression and communication. Needs multiple income streams. Risk: lack of follow-through on financial plans.",
    lesson: "To express while staying focused",
    businessModel: "Creative industries, media, entertainment, sales",
  },
  4: {
    archetype: "The Builder",
    coreTraits: ["Disciplined", "Organized", "Practical", "Reliable"],
    shadow: ["Rigidity", "Limitation", "Workaholism", "Stubbornness"],
    financialPattern:
      "Wealth through steady building and systems. Best with structured financial plans. Risk: limiting beliefs about money creating ceilings.",
    lesson: "To build while remaining flexible",
    businessModel: "Real estate, construction, systems, operations",
  },
  5: {
    archetype: "The Freedom Seeker",
    coreTraits: ["Adaptable", "Versatile", "Curious", "Progressive"],
    shadow: ["Restlessness", "Excess", "Inconsistency", "Impatience"],
    financialPattern:
      "Multiple income streams, variety in revenue sources. Needs freedom in financial approach. Risk: scattered focus dilutes wealth building.",
    lesson: "To experience freedom while maintaining commitment",
    businessModel: "Consulting, travel, variety-based businesses",
  },
  6: {
    archetype: "The Nurturer",
    coreTraits: ["Responsible", "Caring", "Harmonious", "Service-oriented"],
    shadow: ["Martyrdom", "Control", "Perfectionism", "Interference"],
    financialPattern:
      "Money through service and helping others. Values-based wealth. Risk: undercharging for services, financial martyrdom.",
    lesson: "To serve while receiving abundantly",
    businessModel: "Healthcare, teaching, counseling, service businesses",
  },
  7: {
    archetype: "The Seeker",
    coreTraits: ["Analytical", "Spiritual", "Introspective", "Wise"],
    shadow: ["Isolation", "Cynicism", "Analysis paralysis", "Secretiveness"],
    financialPattern:
      "Wealth through wisdom and expertise. Knowledge-based income. Risk: over-analyzing opportunities into paralysis.",
    lesson: "To seek truth while taking action",
    businessModel: "Research, analysis, consulting, spiritual work",
  },
  8: {
    archetype: "The Powerhouse",
    coreTraits: ["Authoritative", "Ambitious", "Organized", "Visionary"],
    shadow: ["Materialism", "Force", "Ruthlessness", "Workaholism"],
    financialPattern:
      "Large-scale wealth potential. Natural with power and money. Risk: using force instead of flow; money as scorecard.",
    lesson: "To wield power with compassion",
    businessModel: "Leadership, big business, finance, investing",
  },
  9: {
    archetype: "The Humanitarian",
    coreTraits: ["Compassionate", "Generous", "Artistic", "Universal"],
    shadow: ["Martyrdom", "Attachment", "Escapism", "Burnout"],
    financialPattern:
      "Money through serving humanity. Giving creates receiving. Risk: difficulty holding onto money; giving it all away.",
    lesson: "To give while allowing receiving",
    businessModel: "Non-profit, art, humanitarian work, healing",
  },
  11: {
    archetype: "The Illuminator",
    coreTraits: ["Intuitive", "Inspirational", "Visionary", "Sensitive"],
    shadow: ["Nervous tension", "Idealism", "Sensitivity", "Perfectionism"],
    financialPattern:
      "Wealth through inspiring others. Intuitive financial decisions. Risk: overwhelm from sensitivity to energy/money.",
    lesson: "To inspire while staying grounded",
    businessModel: "Teaching, inspiration, spirituality, innovation",
  },
  22: {
    archetype: "The Master Builder",
    coreTraits: ["Practical", "Visionary", "Organized", "Powerful"],
    shadow: ["Overwhelm", "Pressure", "Rigidity", "Impatience"],
    financialPattern:
      "Wealth through building large-scale systems. Practical idealism. Risk: pressure of big vision leading to breakdown.",
    lesson: "To build the dream one brick at a time",
    businessModel: "Large-scale projects, infrastructure, systems",
  },
  33: {
    archetype: "The Master Teacher",
    coreTraits: ["Compassionate", "Nurturing", "Selfless", "Healing"],
    shadow: ["Self-sacrifice", "Burden", "Perfectionism", "Control"],
    financialPattern:
      "Wealth through teaching and healing at scale. Risk: giving self away; financial self-sacrifice.",
    lesson: "To teach love while loving self",
    businessModel: "Teaching, healing, spiritual leadership",
  },
};
