// Static content ported from the Claude Design prototype
// (personal-growth-intelligence-platform/project/Life OS Platform.dc.html).
// This is the fixed "Jordan Ellis" demo profile the whole platform is built around.

export const likertLabels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

export const questionBank = {
  'Life Position Assessment': [
    'I have a clear sense of where I stand in my life right now.',
    'I feel in control of the major decisions shaping my future.',
    'I regularly compare my current position against where I want to be.',
    'My daily actions are aligned with my long-term direction.',
    'I feel settled rather than adrift in my current life stage.',
  ],
  'Purpose & Calling Assessment': [
    'I have a clear sense of why I do the work I do.',
    'My daily activities feel connected to something larger than myself.',
    'I would describe my work as a calling rather than just a job.',
    'I regularly revisit and refine my sense of purpose.',
    'I feel energized rather than drained by my core pursuits.',
  ],
  'Values Assessment': [
    'I can name my top three personal values without hesitating.',
    'My calendar reflects what I say matters most to me.',
    'I rarely feel conflicted between what I value and what I do.',
    'I make major decisions by checking them against my values.',
    'My close relationships share or respect my core values.',
  ],
  'Personality Profile': [
    'I prefer decisive action over prolonged deliberation.',
    'I recharge more through solitude than social interaction.',
    'I adapt easily when plans change unexpectedly.',
    'I am energized by structure and clear expectations.',
    'I tend to lead conversations rather than follow them.',
  ],
  'Emotional Intelligence Assessment': [
    'I notice my emotional reactions before they affect my behavior.',
    'I can accurately read how others are feeling in a room.',
    'I stay composed when receiving critical feedback.',
    'I pause before responding when I feel triggered.',
    'I regularly check in on how my mood affects those around me.',
  ],
  'Leadership Readiness Assessment': [
    'I feel confident setting direction for a team.',
    'I actively solicit dissenting opinions before deciding.',
    'I take ownership of team failures, not just successes.',
    'I invest time developing the people I lead.',
    'I can motivate others even during setbacks.',
  ],
  'Communication Style Assessment': [
    'I adjust my tone depending on who I am speaking with.',
    'I ask clarifying questions before responding to a complex issue.',
    'People rarely misinterpret my intent in conversation.',
    'I am comfortable delivering difficult messages directly.',
    'I actively listen more than I speak in disagreements.',
  ],
  'Learning Intelligence Assessment': [
    'I seek out feedback actively rather than waiting for it.',
    'I learn best by applying ideas immediately rather than studying theory.',
    'I regularly reflect on lessons from recent mistakes.',
    'I enjoy learning outside my immediate area of expertise.',
    'I retain new information well without needing repetition.',
  ],
  'Productivity Profile': [
    'I complete my most important task before checking messages.',
    'I rarely leave tasks unfinished at the end of the day.',
    'I plan my week before it begins.',
    'I say no to low-value requests without guilt.',
    'I sustain focus for long stretches without distraction.',
  ],
  'Decision-Making Profile': [
    'I gather sufficient data before committing to a decision.',
    'I am comfortable deciding under uncertainty.',
    'I seek input from others before finalizing important choices.',
    'I rarely second-guess decisions once made.',
    'I distinguish reversible decisions from irreversible ones before acting.',
  ],
  'Relationship Style Assessment': [
    'I invest time in relationships with no immediate benefit to me.',
    'I express appreciation to people close to me regularly.',
    'I resolve conflict directly rather than avoiding it.',
    'I am comfortable being emotionally vulnerable with others.',
    'I prioritize relationships even under work pressure.',
  ],
  'Financial Behavior Assessment': [
    'I track my spending against a plan or budget.',
    'I save a consistent portion of my income each month.',
    'I avoid impulse purchases that conflict with my goals.',
    'I feel calm rather than anxious about my finances.',
    'I make financial decisions aligned with long-term goals over short-term comfort.',
  ],
  'Wellness & Energy Assessment': [
    'I get consistent, restorative sleep most nights.',
    'I notice and respond to early signs of burnout.',
    'I maintain physical activity as a regular habit.',
    'My energy stays steady through the day rather than crashing.',
    'I recover well after high-stress periods.',
  ],
  'Spiritual Growth Assessment': [
    'I make regular time for reflection or spiritual practice.',
    'I feel connected to something larger than my daily routine.',
    'I return to core beliefs when facing hard decisions.',
    'I feel a sense of peace independent of external circumstances.',
    'I actively grow my spiritual or philosophical understanding over time.',
  ],
  '12 Dimensions of Life Assessment': [
    'I feel my life is reasonably balanced across work, health, and relationships.',
    'No single area of my life is being neglected for the sake of another.',
    'I periodically audit how my time is distributed across life areas.',
    'I feel satisfied with my progress across most areas of life.',
    'I adjust my focus deliberately when one life area starts to slip.',
  ],
};

export const assessmentsData = [
  { name: 'Life Position Assessment', score: 74, insight: 'Stable footing, ready for the next stretch goal.' },
  { name: 'Purpose & Calling Assessment', score: 81, insight: 'Strong sense of direction; execution lags vision.' },
  { name: 'Values Assessment', score: 88, insight: 'Clear top-3 values: achievement, integrity, growth.' },
  { name: 'Personality Profile', score: 76, insight: 'Driver type — decisive, low patience for ambiguity.' },
  { name: 'Emotional Intelligence Assessment', score: 58, insight: 'Lowest score in the set — primary growth lever.' },
  { name: 'Leadership Readiness Assessment', score: 83, insight: 'Ready for scope; coaching needed on empathy.' },
  { name: 'Communication Style Assessment', score: 69, insight: 'Direct communicator, can read as blunt under stress.' },
  { name: 'Learning Intelligence Assessment', score: 85, insight: 'Fast learner, prefers applied over theoretical.' },
  { name: 'Productivity Profile', score: 90, insight: 'Top decile focus and follow-through.' },
  { name: 'Decision-Making Profile', score: 79, insight: 'Fast, data-led; occasionally skips buy-in step.' },
  { name: 'Relationship Style Assessment', score: 61, insight: 'Transactional tendency; second lowest score.' },
  { name: 'Financial Behavior Assessment', score: 77, insight: 'Disciplined saver, moderate risk tolerance.' },
  { name: 'Wellness & Energy Assessment', score: 66, insight: 'Energy dips midweek; recovery habits inconsistent.' },
  { name: 'Spiritual Growth Assessment', score: 70, insight: 'Values-driven but under-practiced reflection habit.' },
  { name: '12 Dimensions of Life Assessment', score: 75, insight: 'Balanced overall, career-weighted at present.' },
];

export const dimNames = [
  'Spirituality', 'Self Image', 'Purpose', 'Health-Mental and Physical Wellness', 'Emotional Health',
  'Education and Career', 'Finances', 'Growth', 'Contribution', 'Relationship', 'Environment', 'Recreation',
];

export const dimNamesVision = dimNames;

export const dimScoresBase = [70, 74, 81, 66, 58, 88, 77, 85, 72, 61, 79, 64];

export const areaAssessmentMap = {
  Spirituality: ['Spiritual Growth Assessment', 'Values Assessment'],
  'Self Image': ['Personality Profile', 'Emotional Intelligence Assessment'],
  Purpose: ['Purpose & Calling Assessment', 'Life Position Assessment'],
  'Health-Mental and Physical Wellness': ['Wellness & Energy Assessment', 'Emotional Intelligence Assessment'],
  'Emotional Health': ['Emotional Intelligence Assessment', 'Communication Style Assessment'],
  'Education and Career': ['Leadership Readiness Assessment', 'Learning Intelligence Assessment', 'Productivity Profile'],
  Finances: ['Financial Behavior Assessment', 'Decision-Making Profile'],
  Growth: ['Learning Intelligence Assessment', '12 Dimensions of Life Assessment'],
  Contribution: ['Leadership Readiness Assessment', 'Values Assessment'],
  Relationship: ['Relationship Style Assessment', 'Communication Style Assessment'],
  Environment: ['12 Dimensions of Life Assessment', 'Wellness & Energy Assessment'],
  Recreation: ['Wellness & Energy Assessment', '12 Dimensions of Life Assessment'],
};

export const lifeStageQuestions = [
  { text: 'Which best describes your current chapter?', options: [
    { label: 'Still exploring — figuring out direction and identity', stage: 'foundation' },
    { label: 'Actively building — establishing career, relationships, habits', stage: 'building' },
    { label: 'Established and leading — responsible for others\' outcomes too', stage: 'leading' },
    { label: 'Reassessing or transitioning to a new chapter', stage: 'transition' },
  ]},
  { text: 'How much of your daily routine feels genuinely yours vs. reactive?', options: [
    { label: 'Mostly reactive — I\'m still finding my footing', stage: 'foundation' },
    { label: 'A mix — some structure, a lot still in flux', stage: 'building' },
    { label: 'Mostly intentional — I run my days more than they run me', stage: 'leading' },
    { label: 'It used to be settled, now I\'m rethinking it', stage: 'transition' },
  ]},
  { text: 'How do you relate to responsibility for others (team, family, community)?', options: [
    { label: 'Mostly responsible for myself right now', stage: 'foundation' },
    { label: 'Taking on more, still learning to carry it', stage: 'building' },
    { label: 'Others regularly depend on my decisions', stage: 'leading' },
    { label: 'Stepping back from some responsibilities to make room for new ones', stage: 'transition' },
  ]},
  { text: 'How financially stable do you feel right now?', options: [
    { label: 'Getting by, building a base', stage: 'foundation' },
    { label: 'Stable but still growing it', stage: 'building' },
    { label: 'Comfortable, thinking about legacy/impact', stage: 'leading' },
    { label: 'Restructuring due to a life change', stage: 'transition' },
  ]},
  { text: 'What best describes your relationship to your work?', options: [
    { label: 'Still searching for the right fit', stage: 'foundation' },
    { label: 'Growing skills and proving myself', stage: 'building' },
    { label: 'Recognized, often mentoring or leading others', stage: 'leading' },
    { label: 'Questioning whether it still fits me', stage: 'transition' },
  ]},
  { text: 'How would you describe your energy for big life changes right now?', options: [
    { label: 'Open to anything, little is locked in', stage: 'foundation' },
    { label: 'Focused — I want to go deep on my current path', stage: 'building' },
    { label: 'Selective — I protect what\'s working', stage: 'leading' },
    { label: 'High — I\'m actively in a season of change', stage: 'transition' },
  ]},
  { text: 'How often do you reflect on whether you\'re on the right path?', options: [
    { label: 'Constantly — I\'m still deciding the path', stage: 'foundation' },
    { label: 'Occasionally, when things feel off', stage: 'building' },
    { label: 'Rarely — I trust the path I\'ve built', stage: 'leading' },
    { label: 'Very often lately — something is shifting', stage: 'transition' },
  ]},
  { text: 'What do you most want support with right now?', options: [
    { label: 'Clarity on direction and identity', stage: 'foundation' },
    { label: 'Consistency and skill-building', stage: 'building' },
    { label: 'Sustaining performance and developing others', stage: 'leading' },
    { label: 'Navigating a transition with intention', stage: 'transition' },
  ]},
];

export const lifeStageInfo = {
  foundation: {
    name: 'Foundation Building',
    description: 'You\'re in an exploration season — establishing identity, direction, and basic structure before optimizing anything. This is normal and valuable, not behind schedule.',
    impact: 'Goals are scoped shorter (30 days) and favor clarity and habit-formation over performance optimization. The roadmap leads with identity and structure before leadership-oriented steps.',
  },
  building: {
    name: 'Active Building',
    description: 'You\'re established enough to have real momentum, and still assembling the habits, skills, and relationships that will carry the next decade.',
    impact: 'Goals run 60-90 days and emphasize consistency and depth in your weakest dimensions. The roadmap balances skill-building with early leadership development.',
  },
  leading: {
    name: 'Leading & Sustaining',
    description: 'You carry real responsibility for others\' outcomes and have proven capability. The main risk here is drift and neglect, not lack of skill.',
    impact: 'Goals emphasize protecting strengths and closing quiet gaps (relationships, wellness) before they become liabilities. The roadmap weights sustainability and mentoring others.',
  },
  transition: {
    name: 'Transition & Reinvention',
    description: 'You\'re actively reassessing a chapter — by choice or circumstance. Stability in a few dimensions matters more right now than growth in all of them.',
    impact: 'Goals are shorter and more forgiving, focused on stabilizing 2-3 dimensions rather than progressing all 12 at once. The roadmap leads with grounding and reflection steps.',
  },
};

export const coachingCardsData = [
  { tag: 'THIS WEEK', title: 'Notice the pause', body: 'In your last three 1:1 debriefs, your EQ marker for active listening ticked up. Keep the 10-second pause habit going into Friday\'s review.', meta: 'Generated from Emotional Intelligence + weekly check-in data' },
  { tag: 'PATTERN', title: 'Output before rapport', body: 'Across Leadership Readiness and Relationship Style, decisions are made before stakeholders are consulted. Try surfacing the decision one step earlier next sprint.', meta: 'Cross-referenced from 3 assessments' },
  { tag: 'MILESTONE', title: '45-day values audit due soon', body: 'Your values-vs-calendar audit is scheduled in 6 days. Block 30 minutes to review time allocation against your top 3 values.', meta: 'From Growth Plan, item 5' },
  { tag: 'COACH NOTE', title: 'Dana left you a note', body: '"Great instinct sharing your rationale on the roadmap call — do that every time, even when you\'re sure you\'re right."', meta: 'From Dana Reyes, 2 days ago' },
  { tag: 'ENERGY', title: 'Midweek dip detected', body: 'Wellness & Energy data plus calendar density show a consistent Wednesday afternoon slump. Consider moving deep-focus work to mornings.', meta: 'Generated from Wellness & Energy Assessment' },
];

export const keyInsights = [
  { label: 'Composite Score', value: '78 / 100 — Emerging Leader tier', detail: 'Up 6 points since last cycle', color: 'oklch(50% 0.12 255)' },
  { label: 'Primary Gap', value: 'Emotional Intelligence', detail: 'Lowest-scoring input, weighted heaviest in plan', color: 'oklch(55% 0.15 25)' },
  { label: 'Strongest Trait', value: 'Productivity', detail: 'Score of 90 — consistent across cycles', color: 'oklch(55% 0.13 155)' },
  { label: 'Recommended Focus', value: 'Relationship Depth', detail: 'Growth plan weighted 40% here this quarter', color: 'oklch(50% 0.1 280)' },
];

export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const assessmentSlugs = assessmentsData.reduce((acc, a) => {
  acc[slugify(a.name)] = a.name;
  return acc;
}, {});
