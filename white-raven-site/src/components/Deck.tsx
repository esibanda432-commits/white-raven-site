import { useEffect, useRef, useState } from 'react';
import { panels, type PanelId } from '../data/content';
import Icon from './Icon';

export default function Deck({ onOpen }: { onOpen: (id: PanelId) => void }) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const [progress, setProgress] = useState(0);

  const update = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const step = (dir: number) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>('.card');
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 14), behavior: 'smooth' });
  };

  // Mouse drag to swipe on desktop (touch devices swipe natively).
  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !track.current) return;
    drag.current = { down: true, x: e.clientX, left: track.current.scrollLeft, moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down || !track.current) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      track.current.classList.add('is-dragging');
    }
    if (d.moved) track.current.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    drag.current.down = false;
    track.current?.classList.remove('is-dragging');
    // Let the click that ends a drag be ignored, then reset.
    setTimeout(() => { drag.current.moved = false; }, 0);
  };

  return (
    <section className="deck" aria-label="Explore White Raven">
      <div className="deck-head">
        <p className="kicker">Explore</p>
        <div className="deck-nav">
          <span className="deck-progress" aria-hidden="true"><i style={{ transform: `scaleX(${0.12 + progress * 0.88})` }} /></span>
          <button type="button" onClick={() => step(-1)} aria-label="Previous">←</button>
          <button type="button" onClick={() => step(1)} aria-label="Next">→</button>
        </div>
      </div>

      <div
        className="deck-track"
        ref={track}
        onScroll={update}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      >
        {panels.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className={`card ${p.id === 'contact' ? 'is-primary' : ''}`}
            onClick={e => { if (drag.current.moved) { e.preventDefault(); drag.current.moved = false; return; } onOpen(p.id); }}
          >
            <span className="card-top">
              <span className="card-num">{String(i + 1).padStart(2, '0')}</span>
              <Icon id={p.id} />
            </span>
            <span className="card-label">{p.label}</span>
            <span className="card-teaser">{p.teaser}</span>
            <span className="card-go" aria-hidden="true">→</span>
          </button>
        ))}
      </div>
    </section>
  );
}
