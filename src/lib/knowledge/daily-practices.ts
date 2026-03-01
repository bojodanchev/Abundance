export interface PracticeStep {
  step: string;
  description: string;
}

export const MORNING_RITUAL: PracticeStep[] = [
  { step: "Check Authority", description: "Tune into your specific authority (sacral response / emotional clarity / splenic intuition / ego will / self-direction / environmental cues / lunar awareness) before starting the day." },
  { step: "Check Timing", description: "Note your personal day number, day-of-week energy, and any relevant transits or Chinese timing considerations." },
  { step: "Set Intention", description: "State: 'Today I will [specific action] to create [specific result]' — aligned with your type strategy and current timing." },
  { step: "Visualize Alignment", description: "Spend 1 minute visualizing yourself operating in alignment with your design. Feel your signature emotion (satisfaction/success/peace/surprise)." },
];

export const AUTHORITY_CHECKPOINTS: Record<string, string> = {
  Sacral: "Before meetings, decisions, and commitments — check your gut response. Ask yes/no questions. Listen for the sound.",
  Emotional: "Before any major decision — have you waited through a full emotional wave? Check: am I in a high, low, or neutral? Only decide from neutral.",
  Splenic: "At decision points — what was your FIRST impression? That's your truth. It won't repeat. Trust it and act immediately.",
  Ego: "Before commitments — do I have the HEART for this? Is my will engaged? If not, don't promise.",
  Self: "Before direction changes — does this feel like ME? Talk it out, hear your own voice. The direction that feels like 'you' is correct.",
  Mental: "Before major decisions — have I discussed with trusted advisors? The answer comes from the outside in, not from thinking alone.",
  Lunar: "For major decisions — have I waited a full 28-day cycle? Track how this decision feels across the entire moon cycle.",
};

export interface EveningReviewTemplate {
  successes: string;
  challenges: string;
  tracking: string;
  preparation: string;
}

export const EVENING_REVIEW: EveningReviewTemplate = {
  successes: "When did I follow my design today? When did I feel my signature emotion (satisfaction/success/peace/surprise)?",
  challenges: "When did I operate from my not-self theme (frustration/bitterness/anger/disappointment)? What triggered it?",
  tracking: "Rate today's alignment 1-10. Note key decisions made and whether authority was followed.",
  preparation: "What am I responding to tomorrow? What invitations are pending? What do I need to inform about?",
};
