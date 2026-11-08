/**
 * Concentric quarter arcs taken from the logo's fold (radius 128 and 104 on a
 * 256 grid, repeated outward). Purely decorative.
 */
export function ArcMotif({ className = '', stroke = 'currentColor', rings = 7 }: { className?: string; stroke?: string; rings?: number }) {
  const r0 = 104;
  const step = 72;
  const size = r0 + step * (rings - 1) + 2;
  return (
    <svg className={className} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true" focusable="false">
      {Array.from({ length: rings }, (_, i) => {
        const r = r0 + step * i;
        return <path key={r} d={`M${size - r} 0A${r} ${r} 0 0 0 ${size} ${r}`} stroke={stroke} strokeWidth={1} vectorEffect="non-scaling-stroke" />;
      })}
    </svg>
  );
}
