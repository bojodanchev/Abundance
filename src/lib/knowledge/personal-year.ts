// ============================================================
// Personal Year Cycle Data
// ============================================================

export interface PersonalYearInfo {
  theme: string;
  focus: string;
  best: string[];
  avoid: string[];
}

export const PERSONAL_YEAR_CYCLES: Record<number, PersonalYearInfo> = {
  1: {
    theme: "New Beginnings",
    focus: "Initiation, planting seeds, independence",
    best: ["Starting ventures", "New relationships", "Moving", "Rebranding"],
    avoid: ["Expecting immediate results", "Scattered focus", "Clinging to past"],
  },
  2: {
    theme: "Cooperation",
    focus: "Relationships, patience, collaboration",
    best: ["Partnerships", "Diplomacy", "Building slowly", "Intuition"],
    avoid: ["Rushing", "Working alone", "Impatience"],
  },
  3: {
    theme: "Expression",
    focus: "Creativity, communication, joy",
    best: ["Creating content", "Socializing", "Marketing", "Launching"],
    avoid: ["Scattered energy", "Superficial commitments", "Escapism"],
  },
  4: {
    theme: "Foundation",
    focus: "Building, organizing, discipline",
    best: ["Systems", "Structure", "Long-term planning", "Organization"],
    avoid: ["Shortcuts", "Impulsivity", "Skipping steps"],
  },
  5: {
    theme: "Change",
    focus: "Freedom, adaptability, variety",
    best: ["Travel", "New experiences", "Flexibility", "Multiple streams"],
    avoid: ["Restriction", "Rigidity", "Overcommitment"],
  },
  6: {
    theme: "Responsibility",
    focus: "Home, family, service, beauty",
    best: ["Service", "Community", "Home projects", "Teaching"],
    avoid: ["Neglecting self", "Over-responsibility", "Perfectionism"],
  },
  7: {
    theme: "Analysis",
    focus: "Study, introspection, spiritual growth",
    best: ["Research", "Learning", "Solitude", "Planning"],
    avoid: ["Overwork", "Superficiality", "Isolation"],
  },
  8: {
    theme: "Abundance",
    focus: "Power, achievement, manifestation",
    best: ["Leadership", "Financial growth", "Big moves", "Authority"],
    avoid: ["Abuse of power", "Materialism", "Neglecting ethics"],
  },
  9: {
    theme: "Completion",
    focus: "Release, closure, preparation",
    best: ["Finishing projects", "Letting go", "Service", "Art"],
    avoid: ["Starting major new ventures", "Clinging", "New commitments"],
  },
};
