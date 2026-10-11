import { useCallback, useEffect, useRef, useState } from 'react';
import { panels, type PanelId } from '../data/content';
import Icon from './Icon';

const N = panels.length;

// Shortest signed distance on a loop, so the carousel wraps endlessly.
const wrap = (d: number) => {
  let x = ((d % N) + N) % N;
  if (x > N / 2) x -= N;
  return x;
};

export default function Deck({ onOpen }: { onOpen: (id: PanelId) => void }) {
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0); // live drag distance in cards
  const stage = useRef<HTMLDivElement>(null);
  const ptr = useRef({ id: -1, x: 0, moved: false, width: 1 });
  const wheelLock = useRef(0);

  const go = useCallback((dir: number) => setActive(a => (a + dir + N) % N), []);

  // Pointer drag / swipe (mouse and touch).
  const down = (e: React.PointerEvent) => {
    const card = stage.current?.querySelector<HTMLElement>('.cf-card');
    ptr.current = { id: e.pointerId, x: e.clientX, moved: false, width: (card?.offsetWidth ?? 240) * 0.7 };
  };
  const move = (e: React.PointerEvent) => {
    const p = ptr.current;
    if (p.id !== e.pointerId) return;
    const dx = e.clientX - p.x;
    if (!p.moved && Math.abs(dx) > 6) {
      p.moved = true;
      stage.current?.setPointerCapture(e.pointerId);
    }
    if (p.moved) setDrag(-dx / p.width);
  };
  const up = (e: React.PointerEvent) => {
    const p = ptr.current;
    if (p.id !== e.pointerId) return;
    p.id = -1;
    if (p.moved) {
      const steps = Math.round(drag);
      if (steps) setActive(a => (a + steps + N * 10) % N);
      setDrag(0);
    }
  };

  // Mouse wheel / trackpad.
  const wheel = (e: React.WheelEvent) => {
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const now = Date.now();
    if (Math.abs(d) < 8 || now < wheelLock.current) return;
    wheelLock.current = now + 320;
    go(d > 0 ? 1 : -1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      if (document.querySelector('.sheet-wrap.is-open')) return;
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  // Tilt + light sheen on the focused card.
  const tilt = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'mouse') return;
    const el = e.currentTarget, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${(0.5 - y) * 10}deg`);
    el.style.setProperty('--ry', `${(x - 0.5) * 12}deg`);
    el.style.setProperty('--sx', `${x * 100}%`);
    el.style.setProperty('--sy', `${y * 100}%`);
  };
  const untilt = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  return (
    <section className="deck" aria-label="Explore White Raven" aria-roledescription="carousel">
      <div className="deck-head">
        <p className="kicker">Explore</p>
        <p className="deck-count" aria-live="polite">
          <b>{String(active + 1).padStart(2, '0')}</b> / {String(N).padStart(2, '0')}
        </p>
      </div>

      <div
        className={`cf-stage ${drag ? 'is-dragging' : ''}`}
        ref={stage}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onWheel={wheel}
      >
        {panels.map((p, i) => {
          const off = wrap(i - active) - drag;
          const abs = Math.abs(off);
          const isActive = Math.abs(wrap(i - active)) === 0 && Math.abs(drag) < 0.5;
          return (
            <button
              key={p.id}
              type="button"
              className={`cf-card ${isActive ? 'is-active' : ''} ${p.id === 'contact' ? 'is-cta' : ''}`}
              style={{
                '--off': off,
                '--abs': abs,
                zIndex: 100 - Math.round(abs * 10),
                opacity: abs > 2.6 ? 0 : 1,
                pointerEvents: abs > 2.6 ? 'none' : undefined,
              } as React.CSSProperties}
              tabIndex={isActive ? 0 : -1}
              aria-label={`${p.label}: ${p.teaser}`}
              onClick={() => {
                if (ptr.current.moved) { ptr.current.moved = false; return; }
                if (isActive) onOpen(p.id); else setActive(i);
              }}
              onPointerMove={isActive ? tilt : undefined}
              onPointerLeave={untilt}
            >
              <span className="cf-inner">
                <span className="cf-shine" aria-hidden="true" />
                <span className="cf-top">
                  <span className="cf-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="cf-icon"><Icon id={p.id} /></span>
                </span>
                <span className="cf-label">{p.label}</span>
                <span className="cf-teaser">{p.teaser}</span>
                <span className="cf-open">Open <span aria-hidden="true">→</span></span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="deck-foot">
        <button type="button" className="deck-arrow" onClick={() => go(-1)} aria-label="Previous">←</button>
        <div className="deck-dots" role="tablist">
          {panels.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={p.label}
              className={i === active ? 'is-on' : ''}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        <button type="button" className="deck-arrow" onClick={() => go(1)} aria-label="Next">→</button>
      </div>
    </section>
  );
}
