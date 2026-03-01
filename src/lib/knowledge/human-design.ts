export interface HdTypeInfo {
  population: string;
  aura: string;
  strategy: string;
  signature: string;
  notSelf: string;
  businessApplication: string;
  financialBlueprint: string;
}

export interface HdProfileInfo {
  archetype: string;
  theme: string;
  lifePattern: string;
  businessStrength: string;
}

export interface HdAuthorityInfo {
  description: string;
  decisionProcess: string;
  businessUse: string;
}

export interface HdCenterInfo {
  defined: string;
  undefined: string;
  businessNote: string;
}

export const HD_TYPES: Record<string, HdTypeInfo> = {
  Manifestor: {
    population: "~9%",
    aura: "Closed and repelling",
    strategy: "Inform before acting",
    signature: "Peace",
    notSelf: "Anger",
    businessApplication: "Natural entrepreneurs and innovators. Best as founders, not maintainers. Must inform team before taking action to avoid resistance. Need autonomy above all. Marketing should be bold and initiatory.",
    financialBlueprint: "Money comes through initiating new ventures, creating new markets. Not suited for maintenance roles. Should delegate execution to Generators.",
  },
  Generator: {
    population: "~37%",
    aura: "Open and enveloping",
    strategy: "Wait to respond",
    signature: "Satisfaction",
    notSelf: "Frustration",
    businessApplication: "The builders and doers. Sustainable energy for work they love. Must wait for something to respond to — don't initiate. Marketing should be attraction-based. Success comes through mastery.",
    financialBlueprint: "Money flows when doing satisfying work. Frustration is a sign they're initiating or forcing. Best income comes from responding to what the market asks for.",
  },
  ManifestingGenerator: {
    population: "~33%",
    aura: "Open and enveloping",
    strategy: "Wait to respond, then inform",
    signature: "Satisfaction",
    notSelf: "Frustration/Anger",
    businessApplication: "Fast workers who skip steps. Most efficient type when following strategy. Must respond before acting, then inform those affected. Multi-passionate.",
    financialBlueprint: "Can create income through multiple streams. Must finish what they start or frustration builds. Money comes from efficiency and multitasking.",
  },
  Projector: {
    population: "~20%",
    aura: "Focused and absorbing",
    strategy: "Wait for invitation",
    signature: "Success",
    notSelf: "Bitterness",
    businessApplication: "Guides and advisors. Must be recognized before sharing wisdom. Best in consulting, coaching, managing. Should position as authority first, then wait to be invited. Premium pricing fits their energy.",
    financialBlueprint: "Money comes through recognition of their gifts. Cannot compete on volume with Generators. Best ROI on time spent on positioning and systems.",
  },
  Reflector: {
    population: "~1%",
    aura: "Resistant and sampling",
    strategy: "Wait lunar cycle (28 days)",
    signature: "Surprise",
    notSelf: "Disappointment",
    businessApplication: "Mirrors and evaluators. Best as advisors, community facilitators. Major decisions require waiting full moon cycle. Environment is critical.",
    financialBlueprint: "Reflects the wealth of their environment. Must surround with abundance to reflect it. Not suited for quick decisions about money.",
  },
};

export const HD_PROFILES: Record<string, HdProfileInfo> = {
  "1/3": {
    archetype: "The Researcher",
    theme: "Deep research through experimentation",
    lifePattern: "Investigate foundations, learn through mistakes",
    businessStrength: "Thorough understanding, resilient",
  },
  "1/4": {
    archetype: "The Expert Networker",
    theme: "Deep knowledge shared through close networks",
    lifePattern: "Research deeply, share through established connections",
    businessStrength: "Authority through expertise, network leverage",
  },
  "2/4": {
    archetype: "The Natural",
    theme: "Natural talent called out by others",
    lifePattern: "Alone time, then discovered by network",
    businessStrength: "Effortless expertise, network leverage",
  },
  "2/5": {
    archetype: "The Reluctant Hero",
    theme: "Natural talent with a projection field",
    lifePattern: "Others see them as saviors, retreat needed",
    businessStrength: "Natural genius, problem-solving reputation",
  },
  "3/5": {
    archetype: "The Experimenter",
    theme: "Learn by doing, then solve for others",
    lifePattern: "Experimentation leads to practical solutions",
    businessStrength: "Tested solutions, real-world wisdom",
  },
  "3/6": {
    archetype: "The Resilient Role Model",
    theme: "Three life phases with experimentation",
    lifePattern: "Chaos (to ~30), observation (~30-50), example (50+)",
    businessStrength: "Optimistic resilience, lived wisdom",
  },
  "4/6": {
    archetype: "The Influencer",
    theme: "Network building to lived example",
    lifePattern: "Young: network. Middle: observation. Late: wisdom.",
    businessStrength: "Connections, eventual authority",
  },
  "4/1": {
    archetype: "The Friendly Authority",
    theme: "Fixed foundation shared through established networks",
    lifePattern: "Deep knowledge shared through community",
    businessStrength: "Stable expertise, network influence",
  },
  "5/1": {
    archetype: "The Practical Theorist",
    theme: "Solutions backed by deep research",
    lifePattern: "Others project solutions onto them",
    businessStrength: "Authority, practical expertise",
  },
  "5/2": {
    archetype: "The Called Hero",
    theme: "Called out to solve problems, then retreats",
    lifePattern: "Reluctant hero with natural genius",
    businessStrength: "Problem-solving, natural talent",
  },
  "6/2": {
    archetype: "The Example",
    theme: "Living wisdom through natural talent",
    lifePattern: "Three-stage life: trial, observation, wisdom",
    businessStrength: "Inspiration, effortless mastery",
  },
  "6/3": {
    archetype: "The Optimistic Explorer",
    theme: "Three life phases with ongoing experimentation",
    lifePattern: "Experimentation across all life phases",
    businessStrength: "Optimistic resilience, broad experience",
  },
};

export const HD_AUTHORITIES: Record<string, HdAuthorityInfo> = {
  Sacral: {
    description: "Gut response — uh-huh or un-un",
    decisionProcess: "Wait to be asked. Listen for immediate sound from lower abdomen.",
    businessUse: "Only say yes to opportunities that get an uh-huh",
  },
  Emotional: {
    description: "Solar plexus wave — clarity over time",
    decisionProcess: "Never decide in emotional wave peak or valley. Sleep on it.",
    businessUse: "No spontaneous business decisions",
  },
  Splenic: {
    description: "Instant intuition — first impression",
    decisionProcess: "In-the-moment instinct. First hit is correct. Doesn't repeat.",
    businessUse: "Trust first impressions of people/opportunities",
  },
  Ego: {
    description: "Willpower — what you have heart for",
    decisionProcess: "'Do I have the energy/will for this?'",
    businessUse: "Only commit to what you truly have will for",
  },
  Self: {
    description: "Inner knowing — 'I just know'",
    decisionProcess: "G-center authority. Cannot explain why.",
    businessUse: "Follow the direction that feels like 'me'",
  },
  Mental: {
    description: "Environment — talk it out",
    decisionProcess: "No inner authority. Must talk with others to hear own truth.",
    businessUse: "Consult trusted advisors for all major decisions",
  },
  Lunar: {
    description: "Moon cycle — 28 days",
    decisionProcess: "Wait full lunar cycle. Track feelings throughout month.",
    businessUse: "No major business decisions in less than 28 days",
  },
};

export const HD_CENTERS: Record<string, HdCenterInfo> = {
  Head: {
    defined: "Consistent mental pressure for inspiration",
    undefined: "Takes in and amplifies others' questions/inspiration",
    businessNote: "Open head: Don't try to answer everyone's questions",
  },
  Ajna: {
    defined: "Consistent way of processing information",
    undefined: "Open to others' ways of thinking",
    businessNote: "Undefined: Can see multiple perspectives",
  },
  Throat: {
    defined: "Consistent ability to communicate/initiate",
    undefined: "Waits for right timing; amplifies others' communication",
    businessNote: "Undefined: Less is more; strategic speaking",
  },
  G: {
    defined: "Fixed sense of self and direction",
    undefined: "Shapeshifter; takes in others' identities",
    businessNote: "Undefined: Who you're with matters enormously",
  },
  Heart: {
    defined: "Consistent willpower and drive",
    undefined: "No consistent will; don't make promises from will",
    businessNote: "Undefined: Don't commit based on willpower",
  },
  SolarPlexus: {
    defined: "Emotional wave; clarity over time",
    undefined: "Takes in and amplifies others' emotions",
    businessNote: "Undefined: Not your emotion; don't decide from it",
  },
  Sacral: {
    defined: "Sustainable work force; gut response",
    undefined: "No consistent work energy; takes in others' energy",
    businessNote: "Undefined: Don't overwork to keep up with others",
  },
  Spleen: {
    defined: "Consistent intuition and survival instincts",
    undefined: "Takes in others' fears and intuitive hits",
    businessNote: "Undefined: Not your fear; intuition not reliable",
  },
  Root: {
    defined: "Handles pressure and stress consistently",
    undefined: "Amplified pressure; feels rushed",
    businessNote: "Undefined: Pressure isn't real; don't rush",
  },
};
