import { useEffect, useRef, useState, type FormEvent } from 'react';
import { company, panelById, type PanelId } from '../data/content';

export default function Sheet({ id, onClose }: { id: PanelId | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [shown, setShown] = useState<PanelId | null>(id);

  // Keep content mounted while the closing animation runs.
  useEffect(() => {
    if (id) setShown(id);
    else { const t = setTimeout(() => setShown(null), 450); return () => clearTimeout(t); }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [id, onClose]);

  const panel = shown ? panelById(shown) : null;

  return (
    <div className={`sheet-wrap ${id ? 'is-open' : ''}`} aria-hidden={!id}>
      <div className="sheet-backdrop" onClick={onClose} />
      <aside className="sheet" role="dialog" aria-modal="true" aria-label={panel?.label}>
        {panel && (
          <>
            <div className="sheet-head">
              <p className="kicker">{panel.label}</p>
              <button ref={closeRef} type="button" className="sheet-close" onClick={onClose} aria-label="Close">×</button>
            </div>
            <h2>{panel.title}</h2>
            <p className="sheet-intro">{panel.intro}</p>

            <ol className="sheet-items">
              {panel.items.map((item, i) => (
                <li key={item.title} style={{ animationDelay: `${120 + i * 60}ms` }}>
                  <span className="sheet-n">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{item.href ? <a href={item.href} target={item.href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer">{item.title} ↗</a> : item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            {panel.id === 'contact' && <ContactForm />}

            {panel.cta && (
              <a className="btn btn-red" href={panel.cta.href} target={panel.cta.href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer">
                {panel.cta.label} →
              </a>
            )}
          </>
        )}
      </aside>
    </div>
  );
}

// Drafts an email to the team in the visitor's mail app (no backend needed for the draft site).
function ContactForm() {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get('name')}\nCompany: ${f.get('company')}\n\n${f.get('message')}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent('Website enquiry')}&body=${encodeURIComponent(body)}`;
  };
  return (
    <form className="contact-form" onSubmit={submit}>
      <input name="name" placeholder="Your name" required />
      <input name="company" placeholder="Company" />
      <textarea name="message" placeholder="What are you building?" rows={3} required />
      <button type="submit" className="btn btn-outline">Send message</button>
    </form>
  );
}
