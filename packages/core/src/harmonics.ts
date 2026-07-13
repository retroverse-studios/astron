import { findAspects } from "./aspects.js";
import type { BodyPosition, Chart } from "./types.js";
import { degreeInSign, norm360, signOf } from "./zodiac.js";

/**
 * Harmonic positions: every longitude multiplied by n (mod 360). The 5th
 * harmonic highlights quintile structures, the 7th septiles, the 9th is the
 * Western cousin of the navamsa. Houses don't survive the transform.
 */
export function harmonicPositions(positions: BodyPosition[], n: number): BodyPosition[] {
  if (!Number.isInteger(n) || n < 1) throw new Error("harmonic must be a positive integer");
  return positions.map((p) => {
    const longitude = norm360(p.longitude * n);
    return {
      ...p,
      longitude,
      speed: p.speed * n,
      retrograde: p.speed * n < 0,
      sign: signOf(longitude),
      signDegree: degreeInSign(longitude),
      house: undefined,
    };
  });
}

/** A chart transformed to its nth harmonic (aspects recomputed, houses dropped). */
export function harmonicChart(chart: Chart, n: number): Chart {
  const positions = harmonicPositions(chart.positions, n);
  return {
    ...chart,
    positions,
    houses: undefined,
    aspects: findAspects(positions),
  };
}
