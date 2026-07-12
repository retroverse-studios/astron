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

/**
 * Find aspects between every pair of positions. Each pair reports at most
 * one aspect (the tightest match). Applying/separating is judged from the
 * bodies' longitudinal speeds.
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
      const signedSep = norm180(p1.longitude - p2.longitude);
      const distance = Math.abs(signedSep);

      let best: Aspect | undefined;
      for (const def of defs) {
        const orb = Math.abs(distance - def.angle);
        if (orb > def.orb) continue;
        if (best && orb >= best.orb) continue;

        // Rate of change of the unsigned separation. Moving toward the exact
        // angle from either side means the aspect is applying.
        const dDistance = Math.sign(signedSep || 1) * (p1.speed - p2.speed);
        const applying =
          distance > def.angle ? dDistance < 0 : dDistance > 0;

        best = {
          a: p1.body,
          b: p2.body,
          name: def.name,
          angle: def.angle,
          orb,
          applying,
        };
      }
      if (best) aspects.push(best);
    }
  }
  return aspects.sort((x, y) => x.orb - y.orb);
}
