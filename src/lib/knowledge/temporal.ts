export interface DayEnergy {
  ruler: string;
  element: string;
  energy: string;
  bestFor: string[];
}

export const DAY_OF_WEEK_ENERGY: Record<string, DayEnergy> = {
  monday: {
    ruler: "Moon",
    element: "Water",
    energy: "Emotional, nurturing, reflective",
    bestFor: ["Planning", "Team nurturing", "Self-care", "Setting intentions"],
  },
  tuesday: {
    ruler: "Mars",
    element: "Fire",
    energy: "Action, courage, initiative",
    bestFor: ["Starting projects", "Difficult conversations", "Workouts", "Courageous actions"],
  },
  wednesday: {
    ruler: "Mercury",
    element: "Air",
    energy: "Communication, mental agility",
    bestFor: ["Meetings", "Writing", "Negotiations", "Presentations"],
  },
  thursday: {
    ruler: "Jupiter",
    element: "Fire",
    energy: "Expansion, growth, optimism",
    bestFor: ["Pitches", "Proposals", "Learning", "Publishing"],
  },
  friday: {
    ruler: "Venus",
    element: "Earth",
    energy: "Attraction, harmony, pleasure",
    bestFor: ["Sales", "Socializing", "Creative work", "Relationship building"],
  },
  saturday: {
    ruler: "Saturn",
    element: "Earth",
    energy: "Structure, discipline, review",
    bestFor: ["Organization", "Reviewing", "Planning", "Disciplined work"],
  },
  sunday: {
    ruler: "Sun",
    element: "Fire",
    energy: "Vitality, vision, renewal",
    bestFor: ["Rest", "Visioning", "Self-expression", "Preparation for week"],
  },
};
