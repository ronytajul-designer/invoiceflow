import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { revenueByMonth, usd } from '../../data/dashboard';

type Props = {
  height?: number;
  tone?: 'light' | 'dark';
  /** Number of trailing months to show. */
  months?: number;
  interactive?: boolean;
};

/**
 * Hand-built SVG area chart (no chart library). One scale drives the line,
 * gridlines and labels. Hovering a month moves the readout.
 */
export function RevenueChart({ height = 200, tone = 'light', months = 12, interactive = true }: Props) {
  const data = revenueByMonth.slice(-months);
  const [active, setActive] = useState(data.length - 1);
  const wrap = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(600);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(240, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const gid = useId().replace(/:/g, '');
  const H = height;
  const pad = { t: 16, r: 8, b: 24, l: 8 };
  const max = 35000;
  const ticks = [0, 10000, 20000, 30000];

  const pts = useMemo(
    () =>
      data.map((d, i) => ({
        x: pad.l + (i * (W - pad.l - pad.r)) / (data.length - 1),
        y: pad.t + (1 - d.value / max) * (H - pad.t - pad.b),
        ...d,
      })),
    [H, months, W],
  );

  // Smooth path using cardinal-like midpoints.
  const line = pts.reduce((acc, p, i, a) => {
    if (i === 0) return `M${p.x},${p.y}`;
    const prev = a[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} C${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`;
  }, '');
  const area = `${line} L${pts[pts.length - 1].x},${H - pad.b} L${pts[0].x},${H - pad.b} Z`;
  const a = pts[active];
  const dark = tone === 'dark';
  const grid = dark ? 'rgba(255,255,255,0.07)' : '#EDF1EF';
  const label = dark ? 'rgba(255,255,255,0.45)' : '#8A97A8';

  return (
    <div ref={wrap} className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full overflow-visible" height={H}
        role="img"
        aria-label={`Monthly revenue chart. ${a.month}: ${usd(a.value)}.`}
        onMouseLeave={() => setActive(pts.length - 1)}
      >
        <defs>
          <linearGradient id={`fill-${gid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#55C99A" stopOpacity={dark ? 0.32 : 0.24} />
            <stop offset="1" stopColor="#55C99A" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => {
          const y = pad.t + (1 - t / max) * (H - pad.t - pad.b);
          return <line key={t} x1={0} x2={W} y1={y} y2={y} stroke={grid} strokeWidth={1} />;
        })}
        <path d={area} fill={`url(#fill-${gid})`} />
        <path d={line} fill="none" stroke={dark ? '#8BD6B0' : '#2FA678'} strokeWidth={2.25} strokeLinecap="round" />
        <line x1={a.x} x2={a.x} y1={pad.t - 4} y2={H - pad.b} stroke={dark ? 'rgba(255,255,255,0.25)' : '#C9D3CF'} strokeDasharray="3 3" />
        <circle cx={a.x} cy={a.y} r={5} fill={dark ? '#0B1930' : '#fff'} stroke={dark ? '#8BD6B0' : '#2FA678'} strokeWidth={2.25} />
        {pts.map((p, i) => (
          <g key={p.month}>
            {(W > 420 || months <= 6 || i % 2 === 1) && (
              <text x={p.x} y={H - 6} textAnchor="middle" fontSize={11} fill={i === active ? (dark ? '#fff' : '#142746') : label} fontWeight={i === active ? 600 : 500}>
                {p.month}
              </text>
            )}
            {interactive && (
              <rect
                x={p.x - (W / pts.length) / 2}
                y={0}
                width={W / pts.length}
                height={H}
                fill="transparent"
                onMouseEnter={() => setActive(i)}
              />
            )}
          </g>
        ))}
      </svg>
      <div
        className={`pointer-events-none absolute -translate-y-full ${a.x / W > 0.82 ? '-translate-x-[92%]' : a.x / W < 0.12 ? '-translate-x-[8%]' : '-translate-x-1/2'} rounded-md px-2 py-1 text-[11px] font-semibold whitespace-nowrap shadow-sm transition-[left,top] duration-200 ${dark ? 'bg-white text-midnight' : 'bg-midnight text-white'}`}
        style={{ left: `${(a.x / W) * 100}%`, top: `calc(${(a.y / H) * 100}% - 10px)` }}
        aria-hidden="true"
      >
        <span className="tabular">{usd(a.value)}</span>
        <span className={dark ? 'ml-1 text-muted' : 'ml-1 text-white/60'}>{a.month}</span>
      </div>
    </div>
  );
}
