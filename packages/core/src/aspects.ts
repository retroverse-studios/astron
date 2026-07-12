import type { Aspect, AspectDef, BodyPosition } from "./types.js";
import { norm180 } from "./zodiac.js";

export const MAJOR_ASPECTS: AspectDef[] = [
  { name: "conjunction", angle: 0, orb: 8 },
  { name: "sextile", angle: 60, orb: 4 },
  { name: "square", angle: 90, orb: 7 },
  { name: "trine", angle: 120, orb: 7 },
  { name: "opposition", angle: 180, orb: 8 },
];

export const MINOR_ASPECTS: AspectDef[] = [
  { name: "semisextile", angle: 30, orb: 2 },
  { name: "semisquare", angle: 45, orb: 2 },
  { name: "quintile", angle: 72, orb: 2 },
  { name: "sesquiquadrate", angle: 135, orb: 2 },
  { name: "biquintile", angle: 144, orb: 2 },
  { name: "quincunx", angle: 150, orb: 3 },
];

/** Transits are read tighter than natal aspects. */
export const TRANSIT_ASPECTS: AspectDef[] = MAJOR_ASPECTS.map((a) => ({
  ...a,
  orb: Math.min(a.orb, 3),
}));

/**
 * Tightest matching aspect between two positions, or undefined.
 * relativeSpeed is d/dt of (a.longitude − b.longitude): pass the speed
 * difference for two moving bodies, or just a's speed against a static
 * natal point.
 */
function bestAspectBetween(
  a: BodyPosition,
  b: BodyPosition,
  defs: AspectDef[],
  relativeSpeed: number,
): Aspect | undefined {
  const signedSep = norm180(a.longitude - b.longitude);
  const distance = Math.abs(signedSep);
  let best: Aspect | undefined;
  for (const def of defs) {
    const orb = Math.abs(distance - def.angle);
    if (orb > def.orb) continue;
    if (best && orb >= best.orb) continue;

    // Rate of change of the unsigned separation. Moving toward the exact
    // angle from either side means the aspect is applying.
    const dDistance = Math.sign(signedSep || 1) * relativeSpeed;
    const applying = distance > def.angle ? dDistance < 0 : dDistance > 0;

    best = { a: a.body, b: b.body, name: def.name, angle: def.angle, orb, applying };
  }
  return best;
}

/**
 * Aspects between every pair of positions within one chart. Each pair
 * reports at most one aspect (the tightest match).
 */
export function findAspects(
  positions: BodyPosition[],
  defs: AspectDef[] = MAJOR_ASPECTS,
): Aspect[] {
  const aspects: Aspect[] = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const p1 = positions[i]!;
      const p2 = positions[j]!;
      const found = bestAspectBetween(p1, p2, defs, p1.speed - p2.speed);
      if (found) aspects.push(found);
    }
  }
  return aspects.sort((x, y) => x.orb - y.orb);
}

/**
 * Cross-aspects from moving bodies to static reference points — transits to
 * a natal chart (and later synastry, where nothing applies or separates but
 * the geometry is the same). `a` of each aspect is the moving body, `b` the
 * natal point; applying/separating is judged from the moving body's speed
 * alone.
 */
export function findCrossAspects(
  moving: BodyPosition[],
  natal: BodyPosition[],
  defs: AspectDef[] = TRANSIT_ASPECTS,
): Aspect[] {
  const aspects: Aspect[] = [];
  for (const t of moving) {
    for (const n of natal) {
      const found = bestAspectBetween(t, n, defs, t.speed);
      if (found) aspects.push(found);
    }
  }
  return aspects.sort((x, y) => x.orb - y.orb);
}
