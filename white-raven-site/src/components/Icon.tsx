import type { PanelId } from '../data/content';

// Thin, geometric line icons that echo the diamond construction of the logo.
const paths: Record<PanelId, string> = {
  services: 'M12 3l9 9-9 9-9-9z M12 8l4 4-4 4-4-4z',
  work: 'M4 20V10 M10 20V4 M16 20v-7 M22 20H2',
  about: 'M12 3l9 9-9 9-9-9z M12 3v18',
  contact: 'M4 5h16v11H9l-5 4z M8 10h8',
  industries: 'M3 21V9l6 4V9l6 4V5l6 4v12z',
  insights: 'M12 3l2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6z',
  careers: 'M3 8h18v12H3z M9 8V5h6v3 M3 13h18',
  affiliates: 'M8 12l4-4 4 4-4 4z M3 12h5 M16 12h5',
};

export default function Icon({ id }: { id: PanelId }) {
  return (
    <svg className="card-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[id]} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
