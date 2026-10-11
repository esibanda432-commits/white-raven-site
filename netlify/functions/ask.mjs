// Live AI answers for the website assistant.
// Activated by adding ANTHROPIC_API_KEY in Netlify: Site configuration → Environment variables.
// Without the key, the website falls back to its built-in answers automatically.

const SYSTEM = `You are the website assistant for White Raven Technologies (WRT).
Tagline: Strategy. Software. Delivery With Control.
Services: Consulting, Product Development (MVP to enterprise), Project Management (Agile/Scrum/hybrid), AI Services (connecting data, automating workflows), QA & Testing (manual and automated), Custom Software Development.
Industries: Automotive & Mobility; Education & Nonprofit; Real Estate, Construction & Procurement; Startups/SaaS; Tech Companies & Innovation Units; Finance & Operations; Marketing, Media & Advertising.
Locations: Florida, USA and Tartu, Estonia. Languages: English, German, Spanish.
Contact: info@whiteraventech.com. Consultations: https://whiteraventech.com/schedule-consultation/
Hiring: Senior Software Engineer, Web Developer, Sales. Affiliate programme available.

Rules: Reply in two to four concise, professional sentences in British English. Only state facts listed above.
Never invent prices, timelines, client names or results; for those, recommend booking a consultation.
If a question is unrelated to WRT, answer briefly and steer back to how WRT can help.`;

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return new Response(JSON.stringify({ error: 'not_configured' }), { status: 503 });

  let messages;
  try {
    ({ messages } = await req.json());
  } catch {
    return new Response('Bad request', { status: 400 });
  }
  if (!Array.isArray(messages) || messages.length === 0) return new Response('Bad request', { status: 400 });

  const clean = messages
    .filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: m.content.slice(0, 1500) }))
    .slice(-10);
  while (clean.length && clean[0].role !== 'user') clean.shift();

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5',
      max_tokens: 300,
      system: SYSTEM,
      messages: clean,
    }),
  });

  if (!res.ok) return new Response(JSON.stringify({ error: 'upstream' }), { status: 502 });
  const data = await res.json();
  const reply = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n');
  return new Response(JSON.stringify({ reply }), { headers: { 'content-type': 'application/json' } });
};
