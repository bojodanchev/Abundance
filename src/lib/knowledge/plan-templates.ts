export interface WeekPlan {
  title: string;
  actions: string[];
}

export interface PhasePlan {
  theme: string;
  weeks: WeekPlan[];
}

export interface TypePlanTemplate {
  type: string;
  phases: [PhasePlan, PhasePlan, PhasePlan];
}

export const PLAN_TEMPLATES: Record<string, TypePlanTemplate> = {
  Generator: {
    type: "Generator",
    phases: [
      {
        theme: "Foundation & Clarity",
        weeks: [
          { title: "Clean Up Your Yeses", actions: ["List all current commitments", "Sacral check each one (uh-huh or uhn-uh)", "Cancel or complete 'should' commitments"] },
          { title: "Set Up Response Systems", actions: ["Create ONE clear offer/ask", "Position where people can find you", "DO NOT chase or initiate — respond only"] },
          { title: "Sacral Calibration", actions: ["Practice sacral sounds daily", "Journal sacral responses to opportunities", "Notice what lights you up vs drains you"] },
          { title: "First True Response", actions: ["Respond to ONE opportunity using sacral only", "Say definitive YES or NO", "Track satisfaction levels daily"] },
        ],
      },
      {
        theme: "Growth & Visibility",
        weeks: [
          { title: "Build From Response", actions: ["Double down on what got sacral YES", "Share results and progress publicly", "Let work speak — attract more opportunities"] },
          { title: "Expand Satisfying Work", actions: ["Add one more satisfying commitment", "Remove remaining unsatisfying obligations", "Increase energy investment in flow activities"] },
          { title: "Master Your Rhythm", actions: ["Track daily energy patterns", "Schedule important work during peak energy", "Rest when sacral says stop"] },
          { title: "Celebrate Satisfaction", actions: ["Review 60-day progress", "Identify top satisfaction sources", "Prepare to systematize what works"] },
        ],
      },
      {
        theme: "Optimization & Systematization",
        weeks: [
          { title: "Systematize Success", actions: ["Create repeatable systems for satisfying work", "Automate or delegate draining tasks", "Build processes around sacral-approved activities"] },
          { title: "Scale Through Response", actions: ["Increase capacity for responding", "Build team/support for execution", "Create more response triggers"] },
          { title: "Integrate & Review", actions: ["Full 90-day review of satisfaction scores", "Adjust systems based on data", "Plan next quarter from sacral response"] },
          { title: "Set New Trajectory", actions: ["Identify next level of satisfying work", "Set up response mechanisms for growth", "Celebrate completion of first cycle"] },
        ],
      },
    ],
  },
  Projector: {
    type: "Projector",
    phases: [
      {
        theme: "Establish Authority",
        weeks: [
          { title: "Define Your Zone of Genius", actions: ["Identify your unique expertise/system", "Create authority-building content", "Set premium pricing that honors your energy"] },
          { title: "Be Visible", actions: ["Share expertise in one consistent channel", "Position, don't promote", "Let recognition come naturally"] },
          { title: "Receive Invitations", actions: ["Track invitations that come", "Evaluate each against your authority", "Accept only correct invitations"] },
          { title: "Guide, Don't Do", actions: ["Delegate execution tasks", "Charge for wisdom and guidance", "Protect your energy fiercely"] },
        ],
      },
      {
        theme: "Scale Through Recognition",
        weeks: [
          { title: "Deepen Authority", actions: ["Create signature framework", "Publish thought leadership", "Build case studies from results"] },
          { title: "Expand Invitation Channels", actions: ["Speak at events or guest on platforms", "Join mastermind or advisory groups", "Let network spread your reputation"] },
          { title: "Optimize Energy", actions: ["Track energy expenditure vs results", "Cut non-invitation activities", "Rest more — Projectors need it"] },
          { title: "Review Recognition Patterns", actions: ["Which invitations brought best results?", "Where is recognition strongest?", "Double down on those channels"] },
        ],
      },
      {
        theme: "Operate Through Invitation",
        weeks: [
          { title: "Refine Your System", actions: ["Perfect your signature offering", "Create leveraged delivery models", "Train others to execute your vision"] },
          { title: "Build Invitation Infrastructure", actions: ["Create waitlist or application process", "Automate authority content", "Set boundaries on availability"] },
          { title: "Full Review & Calibrate", actions: ["90-day success review", "Identify highest-value invitations", "Set next quarter from invitation data"] },
          { title: "Next Level Positioning", actions: ["Plan higher-level authority moves", "Identify next audience tier", "Celebrate recognition milestones"] },
        ],
      },
    ],
  },
  Manifestor: {
    type: "Manifestor",
    phases: [
      {
        theme: "Clarify Impact & Inform",
        weeks: [
          { title: "Identify Your Initiative", actions: ["What do you want to start/create?", "Clarify the impact you want to make", "Draft your informing communication"] },
          { title: "Practice Informing", actions: ["Inform all stakeholders of your plans", "Notice resistance drop when you inform", "Build informing into daily practice"] },
          { title: "Initiate ONE Thing", actions: ["Launch your primary initiative", "Inform before every action", "Delegate sustained work to others"] },
          { title: "Assess Impact", actions: ["Review initiative results", "Notice where peace arose vs anger", "Adjust approach based on feedback"] },
        ],
      },
      {
        theme: "Initiate With Impact",
        weeks: [
          { title: "Expand Initiative", actions: ["Scale what's working", "Inform wider circles", "Bring in Generator support for execution"] },
          { title: "Break New Ground", actions: ["Identify next frontier to initiate", "Research before launching", "Inform stakeholders of expansion"] },
          { title: "Manage Energy Waves", actions: ["Accept that energy comes in bursts", "Rest between creative surges", "Don't force consistency — honor your rhythm"] },
          { title: "Review & Inform", actions: ["60-day initiative review", "Inform all parties of progress", "Prepare for integration phase"] },
        ],
      },
      {
        theme: "Maintain Independence",
        weeks: [
          { title: "Remove Control Points", actions: ["Identify where you're being controlled", "Set boundaries on autonomy", "Inform about your independence needs"] },
          { title: "Build Autonomous Systems", actions: ["Create systems that don't need you daily", "Delegate maintenance", "Free yourself for next initiation"] },
          { title: "Full Review", actions: ["90-day impact assessment", "Peace vs anger tracking review", "Identify next major initiation"] },
          { title: "Plan Next Cycle", actions: ["What's the next thing to create?", "Who needs to be informed?", "Set up support structure"] },
        ],
      },
    ],
  },
  Reflector: {
    type: "Reflector",
    phases: [
      {
        theme: "Sample & Observe",
        weeks: [
          { title: "Environment Audit", actions: ["Evaluate current environments", "Visit potential new environments", "Track how each environment feels"] },
          { title: "Sample Approaches", actions: ["Try different work styles", "Meet different types of people", "Notice what you mirror vs what's yours"] },
          { title: "Begin Lunar Tracking", actions: ["Start a lunar journal", "Track decisions over moon cycle", "Notice patterns in clarity"] },
          { title: "Observe Without Deciding", actions: ["NO major decisions this month", "Gather data and observations", "Trust the sampling process"] },
        ],
      },
      {
        theme: "Recognize Patterns",
        weeks: [
          { title: "Mid-Lunar Evaluation", actions: ["Review first lunar cycle data", "Identify emerging patterns", "Note which environments energized you"] },
          { title: "Begin Leaning", actions: ["Start leaning toward preferred direction", "Test with small commitments", "Continue lunar tracking"] },
          { title: "Deepen Sampling", actions: ["Go deeper in promising environments", "Pull back from draining ones", "Track surprise and delight moments"] },
          { title: "Second Lunar Review", actions: ["Full second-cycle review", "Compare patterns across both cycles", "Prepare for decision phase"] },
        ],
      },
      {
        theme: "Decide With Clarity",
        weeks: [
          { title: "Full Lunar Decision", actions: ["Major decision after full cycle", "Commit to chosen direction", "Inform your community"] },
          { title: "Establish in Right Environment", actions: ["Set up in chosen environment", "Build supportive community", "Create reflection practices"] },
          { title: "Full Review", actions: ["90-day pattern review", "Surprise quotient assessment", "Environment satisfaction check"] },
          { title: "Next Cycle Planning", actions: ["What needs re-evaluation?", "Any environment changes needed?", "Set up next sampling cycle"] },
        ],
      },
    ],
  },
};
