import type { Chart } from "./types.js";
import { norm360 } from "./zodiac.js";

/**
 * Sect: a chart is diurnal when the Sun is above the horizon, i.e. its
 * zodiacal longitude lies in the arc from the descendant forward to the
 * ascendant (houses 7–12).
 */
export function isDayChart(sunLongitude: number, ascendant: number): boolean {
  return norm360(sunLongitude - ascendant) >= 180;
}

/**
 * Part of Fortune, with sect: ASC + Moon − Sun by day, ASC + Sun − Moon by
 * night. Requires houses (an ascendant), so returns undefined for a
 * no-time/no-place chart.
 */
export function partOfFortune(chart: Chart): number | undefined {
  if (!chart.houses) return undefined;
  const sun = chart.positions.find((p) => p.body === "sun");
  const moon = chart.positions.find((p) => p.body === "moon");
  if (!sun || !moon) return undefined;
  const asc = chart.houses.ascendant;
  return isDayChart(sun.longitude, asc)
    ? norm360(asc + moon.longitude - sun.longitude)
    : norm360(asc + sun.longitude - moon.longitude);
}
