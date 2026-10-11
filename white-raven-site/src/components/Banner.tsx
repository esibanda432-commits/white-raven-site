import { useEffect, useRef } from 'react';
import { company } from '../data/content';

// The banner reinterprets the White Raven mark: its diamond, spine and wing lines
// are drawn in as live line-work over a slowly drifting diamond lattice.
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
        el.style.setProperty('--mx', String((e.clientX - r.left) / r.width - 0.5));
        el.style.setProperty('--my', String((e.clientY - r.top) / r.height - 0.5));
      });
    };
    el.addEventListener('pointermove', onMove);
    return () => { el.removeEventListener('pointermove', onMove); cancelAnimationFrame(frame); };
  }, []);

  return (
    <header ref={ref} className="banner">
      <div className="lattice" aria-hidden="true" />

      <div className="banner-top">
        <a className="brand" href="/" aria-label="White Raven Technologies">
          <img src="/wrt-mark-white.png" alt="" />
          <span>White Raven<em>Technologies</em></span>
        </a>
        <a className="btn btn-light" href={company.consultationUrl} target="_blank" rel="noopener noreferrer">
          Schedule a consultation
        </a>
      </div>

      <div className="banner-body">
        <div className="banner-copy">
          <p className="kicker">Build · Scale · Thrive <span className="kicker-loc">· {company.locations}</span></p>
          <h1>
            Strategy. Software.
            <span>Delivery with control.</span>
          </h1>
          <p className="banner-sub">From MVPs to fully managed software services, we help you get there faster, smarter and stronger.</p>
        </div>

        <svg className="raven-mark" viewBox="0 0 400 400" aria-hidden="true">
          <g className="tilt">
            <path className="draw d1" pathLength={1} d="M200 18 L382 200 L200 382 L18 200 Z" />
            <path className="draw d2 faint" pathLength={1} d="M200 52 L348 200 L200 348 L52 200 Z" />
            <path className="draw d3" pathLength={1} d="M200 92 L262 152 L200 214 L138 152 Z" />
            <path className="draw d4" pathLength={1} d="M200 92 L200 382" />
            <path className="draw d5" pathLength={1} d="M200 214 L118 282 M200 214 L282 282" />
            <path className="draw d6" pathLength={1} d="M118 282 L282 282" />
            <path className="draw d7 wing" pathLength={1} d="M203 112 L244 66" />
            <path className="draw d8 wing" pathLength={1} d="M208 136 L258 80" />
            <path className="draw d9 wing" pathLength={1} d="M216 156 L272 94" />
            <circle className="node" cx="200" cy="214" r="4" />
            <path className="scan" d="M18 200 L382 200" />
          </g>
        </svg>
      </div>

    </header>
  );
}
