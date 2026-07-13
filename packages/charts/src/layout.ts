import { norm360 } from "@astron/core";

export interface Point {
  x: number;
  y: number;
}

/**
 * Screen angle (degrees, counterclockwise from positive x-axis in a
 * y-down SVG) for an ecliptic longitude, with `rotation` (usually the
 * ascendant) pinned to the left horizon — the classic wheel orientation:
 * ASC left, IC bottom, DSC right, MC top, signs running counterclockwise.
 */
export function angleForLongitude(longitude: number, rotation: number): number {
  return norm360(180 + (longitude - rotation));
}

export function polarPoint(cx: number, cy: number, r: number, angleDeg: number): Point {
  const a = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) };
}

/**
 * Spread crowded glyphs apart: returns adjusted angles that keep each
 * glyph as close as possible to its true angle while enforcing a minimum
 * angular gap, preserving circular order. Iterative pairwise relaxation —
 * fine for the ≤ 15 bodies on a wheel.
 */
export function spreadAngles(angles: number[], minGap = 7): number[] {
  const n = angles.length;
  if (n < 2) return [...angles];

  const order = angles
    .map((a, i) => ({ a: norm360(a), i }))
    .sort((p, q) => p.a - q.a);
  const adjusted = order.map((o) => o.a);

  for (let pass = 0; pass < 64; pass++) {
    let moved = false;
    for (let k = 0; k < n; k++) {
      const next = (k + 1) % n;
      // gap from k to next, going counterclockwise (increasing angle)
      const gap = norm360(adjusted[next]! - adjusted[k]!) || (n > 1 ? 0 : 360);
      if (gap < minGap - 1e-6) {
        const push = (minGap - gap) / 2;
        adjusted[k] = norm360(adjusted[k]! - push);
        adjusted[next] = norm360(adjusted[next]! + push);
        moved = true;
      }
    }
    if (!moved) break;
  }

  const result = new Array<number>(n);
  order.forEach((o, k) => {
    result[o.i] = adjusted[k]!;
  });
  return result;
}
