// ============================================================
// Chinese Zodiac & Wu Xing Element Data
// ============================================================

export interface ChineseYearInfo {
  chinese: string;
  stem: string;
  branch: string;
  energyThemes: string[];
  favorableActivities: string[];
  cautionAreas: string[];
  byChineseZodiac: Record<string, string>;
}

export interface WuXingElement {
  quality: string;
  direction: string;
  season: string;
  businessApplication: string;
}

export const CHINESE_ZODIAC_2026: ChineseYearInfo = {
  chinese: "Fire Horse (\u4E19\u5348)",
  stem: "Bing (\u4E19) - Yang Fire",
  branch: "Wu (\u5348) - Horse",
  energyThemes: [
    "Fire at its peak \u2014 passion, action, visibility",
    "Horse year = movement, travel, progress",
    "Excellent for launching, visibility, expansion",
    "Challenging for rest, stillness, overthinking",
  ],
  favorableActivities: [
    "Starting new ventures",
    "Public speaking and visibility",
    "Travel and geographic expansion",
    "Creative projects and launches",
    "Leadership positions",
    "Taking bold action",
  ],
  cautionAreas: [
    "Burnout from excessive activity",
    "Impulsive decisions without reflection",
    "Conflict from heated emotions",
    "Neglecting rest and recovery",
    "Scattered energy from too many directions",
  ],
  byChineseZodiac: {
    Rat: "Challenge: Direct clash with Horse. Lay low, don't initiate major changes.",
    Ox: "Neutral: Steady progress, maintain routines.",
    Tiger: "Favorable: Natural ally of Horse. Good year for expansion.",
    Rabbit: "Favorable: Flowering relationship with Horse. Growth opportunities.",
    Dragon: "Neutral: Focus on completing existing projects.",
    Snake: "Challenge: Some tension with Horse energy. Plan carefully.",
    Horse: "Mixed: Your year brings visibility but watch for burnout.",
    Goat: "Favorable: Harmony with Horse. Good for relationships.",
    Monkey: "Neutral: Adapt to the fast pace. Stay flexible.",
    Rooster: "Neutral: Steady progress through discipline.",
    Dog: "Favorable: Natural ally. Good for loyalty-based ventures.",
    Pig: "Challenge: Some opposition. Focus on inner work.",
  },
};

export const WU_XING_ELEMENTS: Record<string, WuXingElement> = {
  Wood: {
    quality: "Growth, expansion, flexibility",
    direction: "East",
    season: "Spring",
    businessApplication: "New initiatives, R&D, startups, growth phases",
  },
  Fire: {
    quality: "Visibility, passion, transformation",
    direction: "South",
    season: "Summer",
    businessApplication: "Marketing, launches, visibility campaigns, leadership",
  },
  Earth: {
    quality: "Stability, nourishment, reliability",
    direction: "Center",
    season: "Late summer",
    businessApplication: "Operations, HR, customer service, maintenance",
  },
  Metal: {
    quality: "Structure, precision, discernment",
    direction: "West",
    season: "Autumn",
    businessApplication: "Finance, legal, systems, quality control",
  },
  Water: {
    quality: "Flow, wisdom, adaptability",
    direction: "North",
    season: "Winter",
    businessApplication: "Strategy, research, flow states, adaptation",
  },
};
