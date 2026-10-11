import { company, type PanelId } from './content';

export interface Action { label: string; panel?: PanelId; href?: string }
export interface Reply { text: string; actions?: Action[] }

const open = (label: string, panel: PanelId): Action => ({ label, panel });
const book: Action = { label: 'Schedule a consultation', href: company.consultationUrl };

// Built-in answers: works with no backend. Each topic is matched on keywords.
const topics: { keys: string[]; reply: Reply }[] = [
  {
    keys: ['case', 'studies', 'study', 'work', 'portfolio', 'examples', 'clients', 'results', 'projects'],
    reply: {
      text: 'Our work spans automotive CRM modernisation, procurement digitisation for real estate and construction, and taking SaaS founders from MVP to traction. Here is a snapshot.',
      actions: [open('View case studies', 'work'), open('Industries we serve', 'industries')],
    },
  },
  {
    keys: ['service', 'services', 'offer', 'do you do', 'what do you', 'help with', 'capabilities'],
    reply: {
      text: 'We provide six services: consulting, product development, project management, AI services, QA and testing, and custom software development. You can engage us for one or the full journey.',
      actions: [open('Explore services', 'services')],
    },
  },
  {
    keys: ['mvp', 'product', 'build', 'app', 'platform', 'develop', 'development', 'software'],
    reply: {
      text: 'We take products from MVP to enterprise-grade platforms, covering market-fit consulting, design, engineering and post-launch optimisation.',
      actions: [open('Product development', 'services'), book],
    },
  },
  {
    keys: ['ai', 'automation', 'automate', 'data', 'machine learning', 'workflow'],
    reply: {
      text: 'Our AI services connect fragmented data and automate manual workflows, so decisions happen faster and teams spend less time on repetitive work.',
      actions: [open('See AI services', 'services'), book],
    },
  },
  {
    keys: ['qa', 'test', 'testing', 'bugs', 'quality'],
    reply: { text: 'We run manual and automated testing to keep your product stable, secure and ready to scale.', actions: [open('QA & testing', 'services')] },
  },
  {
    keys: ['project', 'manage', 'management', 'agile', 'scrum', 'delivery'],
    reply: { text: 'Our project managers understand software. We run Agile, Scrum or a tailored hybrid, and keep delivery on time and on budget.', actions: [open('Project management', 'services')] },
  },
  {
    keys: ['consult', 'consulting', 'advice', 'strategy', 'funding', 'stack'],
    reply: { text: 'Our consultants guide technology and business decisions, from refining your tech stack to preparing for your next funding round.', actions: [book] },
  },
  {
    keys: ['industry', 'industries', 'sector', 'sectors', 'automotive', 'construction', 'real estate', 'education', 'finance', 'saas', 'startup', 'marketing'],
    reply: { text: 'We serve seven sectors, including automotive, real estate and construction, startups and SaaS, finance and operations, and education.', actions: [open('All industries', 'industries')] },
  },
  {
    keys: ['price', 'pricing', 'cost', 'quote', 'budget', 'rates', 'how much', 'expensive'],
    reply: { text: 'Every engagement is scoped to your goals, so pricing depends on what you need. A short consultation is the quickest way to get a clear estimate.', actions: [book, open('Speak with us', 'contact')] },
  },
  {
    keys: ['how long', 'timeline', 'time', 'fast', 'quickly', 'weeks', 'deadline'],
    reply: { text: 'Timelines depend on scope. We agree milestones up front and manage delivery against them so you always know where things stand.', actions: [book] },
  },
  {
    keys: ['contact', 'speak', 'talk', 'call', 'email', 'reach', 'meeting', 'book', 'consultation', 'human', 'someone'],
    reply: { text: `You can email us at ${company.email} or book a consultation directly. We will reply with clear next steps.`, actions: [book, open('Contact details', 'contact')] },
  },
  {
    keys: ['where', 'location', 'located', 'based', 'office', 'country'],
    reply: { text: `We operate from ${company.locations}, and work with clients worldwide.`, actions: [open('About us', 'about')] },
  },
  {
    keys: ['who', 'about', 'company', 'team', 'background'],
    reply: { text: 'White Raven Technologies bridges strategic insight with technical execution, helping businesses launch, grow and modernise with confidence.', actions: [open('About us', 'about')] },
  },
  {
    keys: ['job', 'jobs', 'career', 'careers', 'hiring', 'hire me', 'vacancy', 'apply', 'work for'],
    reply: { text: 'Yes, we are actively hiring developers, engineers and sales professionals.', actions: [open('Open roles', 'careers')] },
  },
  {
    keys: ['affiliate', 'partner', 'referral', 'refer', 'commission'],
    reply: { text: 'Our affiliate programme rewards valuable introductions. You make the connection and our team leads the conversation.', actions: [open('Partner with us', 'affiliates')] },
  },
  {
    keys: ['language', 'german', 'spanish', 'deutsch', 'español'],
    reply: { text: 'We work in English, German and Spanish.' },
  },
  {
    keys: ['blog', 'article', 'insight', 'insights', 'read'],
    reply: { text: 'Our insights cover procurement, remote teams and scaling startups.', actions: [open('Read insights', 'insights')] },
  },
];

const YES = /^(yes|yeah|yep|sure|ok|okay|please|go on|show me|y)\b/i;
const NO = /^(no|nope|not now|later|n)\b/i;
const HELLO = /^(hi|hello|hey|good (morning|afternoon|evening))\b/i;

export const greeting: Reply = {
  text: 'Hello, I am the White Raven assistant. Ask me anything about our services, work or team. Would you like to see our case studies?',
  actions: [open('Yes, show me', 'work')],
};

export const suggestions = [
  'Do you want to see our case studies?',
  'What services do you offer?',
  'Can you build an MVP?',
  'How do I book a consultation?',
];

export function localReply(input: string, lastAssistant?: string): Reply {
  const q = input.trim().toLowerCase();
  const askedCaseStudies = lastAssistant?.includes('case studies?');
  if (askedCaseStudies && YES.test(q)) return topics[0].reply;
  if (askedCaseStudies && NO.test(q)) return { text: 'No problem. What would you like to know about White Raven?' };
  if (HELLO.test(q) && q.split(' ').length < 4) return { text: 'Hello. What can I help you with today?', actions: [open('Our services', 'services'), open('Case studies', 'work')] };

  let best: Reply | null = null;
  let bestScore = 0;
  for (const t of topics) {
    const score = t.keys.reduce((n, k) => n + (new RegExp(`\\b${k}\\b`).test(q) ? k.length : 0), 0);
    if (score > bestScore) { bestScore = score; best = t.reply; }
  }
  return best ?? {
    text: 'That is a great question for our team. Book a short consultation or send us a message and we will give you a considered answer.',
    actions: [book, open('Speak with us', 'contact')],
  };
}

// Full AI: if the hosting has an API key configured, answers come from the live model.
// Otherwise this returns null and the built-in answers are used instead.
export async function aiReply(history: { role: 'user' | 'assistant'; content: string }[]): Promise<string | null> {
  try {
    const res = await fetch('/.netlify/functions/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history.slice(-10) }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.reply === 'string' && data.reply.trim() ? data.reply.trim() : null;
  } catch {
    return null;
  }
}
