// All site content lives here, so copy can be edited without touching layout.

export const company = {
  name: 'White Raven Technologies',
  email: 'info@whiteraventech.com',
  locations: 'Florida, USA · Tartu, Estonia',
  consultationUrl: 'https://whiteraventech.com/schedule-consultation/',
  linkedin: 'https://linkedin.com/company/white-raven-technology',
  instagram: 'https://www.instagram.com/whiteraventechnology/',
};

export type PanelId =
  | 'services' | 'work' | 'about' | 'contact'
  | 'industries' | 'insights' | 'careers' | 'affiliates';

export interface PanelItem { title: string; text: string; href?: string }

export interface Panel {
  id: PanelId;
  label: string;
  teaser: string;
  title: string;
  intro: string;
  items: PanelItem[];
  cta?: { label: string; href: string };
}

export const panels: Panel[] = [
  {
    id: 'services',
    label: 'Our Services',
    teaser: 'Six disciplines, one accountable partner.',
    title: 'Strategy, software and delivery under one roof.',
    intro: 'Engage us for a single discipline or the full journey, from first idea to a product in market.',
    items: [
      { title: 'Consulting Services', text: 'Technology and business guidance for decisions such as refining your stack or preparing for your next funding round.' },
      { title: 'Product Development', text: 'From MVP to enterprise-grade platform, including market-fit consulting and post-launch optimisation.' },
      { title: 'Project Management', text: 'Experienced managers who understand software. Agile, Scrum or a tailored hybrid, kept on time and on budget.' },
      { title: 'AI Services', text: 'Connecting fragmented data and automating manual workflows so decisions happen faster.' },
      { title: 'QA & Testing', text: 'Manual and automated testing to keep your product stable, secure and ready to scale.' },
      { title: 'Custom Software', text: 'Digital products designed and built around your specific business goals.' },
    ],
    cta: { label: 'Schedule a consultation', href: company.consultationUrl },
  },
  {
    id: 'work',
    label: 'Case Studies',
    teaser: 'Selected work across our core sectors.',
    title: 'Selected work.',
    intro: 'A snapshot of the problems we are trusted to solve. Detailed case studies are available on request.',
    items: [
      { title: 'Automotive & Mobility', text: 'Lead generation, CRM modernisation and UI/UX for manufacturers and service providers.' },
      { title: 'Procurement Digitisation', text: 'Replacing spreadsheets and email chains with structured procurement and vendor workflows for real estate and construction.' },
      { title: 'Startups & SaaS', text: 'Taking founders from MVP to market traction with scalable technology and embedded teams.' },
      { title: 'Education & Nonprofit', text: 'Platforms that improve access and engagement for distributed teams and asynchronous learning.' },
    ],
    cta: { label: 'Request full case studies', href: `mailto:${company.email}?subject=Case%20study%20request` },
  },
  {
    id: 'about',
    label: 'About Us',
    teaser: 'Strategic insight, technical execution.',
    title: 'We bridge strategy and execution.',
    intro: 'White Raven Technologies helps businesses launch, grow and modernise with confidence, whether that means finding product-market fit or leading a digital transformation.',
    items: [
      { title: 'Build', text: 'Products engineered for the stage you are at, with the foundations for the stage you are aiming for.' },
      { title: 'Scale', text: 'Embedded teams, delivery management and quality assurance that grow with you.' },
      { title: 'Thrive', text: 'Ongoing optimisation and strategic support long after launch.' },
      { title: 'Global team', text: `Operating from ${company.locations}, supporting clients in English, German and Spanish.` },
    ],
  },
  {
    id: 'contact',
    label: 'Speak With Us',
    teaser: 'A conversation, not a sales pitch.',
    title: 'Let’s talk about what you are building.',
    intro: 'Tell us where you are and where you want to be. We will come back to you with clear next steps.',
    items: [
      { title: 'Email', text: company.email, href: `mailto:${company.email}` },
      { title: 'Locations', text: company.locations },
      { title: 'LinkedIn', text: 'White Raven Technology', href: company.linkedin },
    ],
    cta: { label: 'Schedule a consultation', href: company.consultationUrl },
  },
  {
    id: 'industries',
    label: 'Industries',
    teaser: 'Seven sectors, one method.',
    title: 'Industries we serve.',
    intro: 'Different markets, the same discipline: understand the problem, then build exactly what it needs.',
    items: [
      { title: 'Automotive & Mobility', text: 'Lead generation, CRM and customer experience.' },
      { title: 'Education & Nonprofit', text: 'Accessible, engaging learning platforms.' },
      { title: 'Real Estate, Construction & Procurement', text: 'Transparent, compliant vendor workflows.' },
      { title: 'Startups & SaaS', text: 'MVPs, scaling and embedded teams.' },
      { title: 'Tech & Innovation Units', text: 'Engineering capacity, QA and delivery planning.' },
      { title: 'Finance & Operations', text: 'Custom tools, integrations and modern SaaS.' },
      { title: 'Marketing, Media & Advertising', text: 'Automation and production-ready creative tech.' },
    ],
  },
  {
    id: 'insights',
    label: 'Insights',
    teaser: 'Thinking from the front line.',
    title: 'Insights.',
    intro: 'Practical perspectives on product development, procurement and scaling.',
    items: [
      { title: 'Procurement software for the modern company', text: 'Why emails and Excel cost more than you think.', href: 'https://whiteraventech.com/procurement-software-for-the-modern-company/' },
      { title: 'Building a high-performing remote tech team', text: 'Structure, communication and trust across time zones.', href: 'https://whiteraventech.com/build-a-high-performing-remote/' },
      { title: 'Why startups fail to scale', text: 'And how the right support changes the outcome.', href: 'https://whiteraventech.com/why-startups-fail-to-scale/' },
    ],
  },
  {
    id: 'careers',
    label: 'Careers',
    teaser: 'We are actively hiring.',
    title: 'Join a global team of builders.',
    intro: 'Developers, designers, project managers and creative thinkers: there is a place for you at White Raven.',
    items: [
      { title: 'Senior Software Engineer', text: 'Lead the build of client platforms end to end.' },
      { title: 'Web Developer', text: 'Craft fast, accessible, production-ready web experiences.' },
      { title: 'Sales', text: 'Open conversations with founders and technology leaders.' },
    ],
    cta: { label: 'Apply now', href: 'https://whiteraventech.com/#careers' },
  },
  {
    id: 'affiliates',
    label: 'Partner With Us',
    teaser: 'Earn by making the right introductions.',
    title: 'Our affiliate programme.',
    intro: 'Connected to founders or teams who need software, consulting or delivery support? Make the introduction and we handle the rest.',
    items: [
      { title: 'No selling required', text: 'Introduce the opportunity. Our team leads every conversation.' },
      { title: 'Rewarded connections', text: 'Earn for every valuable introduction that becomes a client.' },
    ],
    cta: { label: 'Become an affiliate', href: 'https://whiteraventech.com/affiliates/' },
  },
];

export const panelById = (id: PanelId) => panels.find(p => p.id === id)!;
