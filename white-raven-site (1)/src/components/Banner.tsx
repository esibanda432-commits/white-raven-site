import { useEffect, useRef } from 'react';
import { company } from '../data/content';

// Slim banner built from White Raven's own shapes: the chevron and the diamond.
// A diamond lattice is revealed under a spotlight that follows the cursor.
export default function Banner() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--px', `${e.clientX - r.left}px`);
        el.style.setProperty('--py', `${e.clientY - r.top}px`);
        el.style.setProperty('--mx', String((e.clientX - r.left) / r.width - 0.5));
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(frame); };
  }, []);

  return (
    <header ref={ref} className="banner">
      <div className="lattice" aria-hidden="true" />

      <svg className="chevrons" viewBox="0 0 1200 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path className="chev c1" pathLength={1} d="M520 -40 L600 40 L680 -40" />
        <path className="chev c2" pathLength={1} d="M470 -40 L600 90 L730 -40" />
        <path className="chev c3" pathLength={1} d="M420 -40 L600 140 L780 -40" />
        <path className="dia d1" pathLength={1} d="M1080 30 L1130 80 L1080 130 L1030 80 Z" />
        <path className="dia d2" pathLength={1} d="M110 10 L150 50 L110 90 L70 50 Z" />
      </svg>

      <a className="brand" href="/" aria-label="White Raven Technologies">
        <img src="/wrt-mark-white.png" alt="" />
        <span>White Raven<em>Technologies</em></span>
      </a>

      <h1 className="headline">
        Strategy. Software. <span>Delivery with control.</span>
      </h1>

      <div className="photos" aria-hidden="true">
        <span className="ph-frame f1" />
        <figure className="ph ph1"><img src="/photo-team.jpg" alt="" /><i className="ph-band" /></figure>
        <figure className="ph ph2"><img src="/photo-devs.jpg" alt="" /></figure>
        <span className="ph-frame f2" />
        <span className="ph-dot" />
      </div>

      <a className="btn btn-red" aria-label="Schedule a consultation" href={company.consultationUrl} target="_blank" rel="noopener noreferrer">
        <span className="btn-full">Schedule a consultation</span><span className="btn-short" aria-label="Book a call"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 6h16v14H4z M4 10h16 M8 3v5 M16 3v5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg></span>
      </a>
    </header>
  );
}
