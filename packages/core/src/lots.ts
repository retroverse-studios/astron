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

function lotOf(
  chart: Chart,
  plus: "sun" | "moon",
  minus: "sun" | "moon",
): number | undefined {
  if (!chart.houses) return undefined;
  const sun = chart.positions.find((p) => p.body === "sun");
  const moon = chart.positions.find((p) => p.body === "moon");
  if (!sun || !moon) return undefined;
  const asc = chart.houses.ascendant;
  const lon = (b: "sun" | "moon") => (b === "sun" ? sun.longitude : moon.longitude);
  return isDayChart(sun.longitude, asc)
    ? norm360(asc + lon(plus) - lon(minus))
    : norm360(asc + lon(minus) - lon(plus));
}

/**
 * Part of Fortune, with sect: ASC + Moon − Sun by day, ASC + Sun − Moon by
 * night. Requires houses (an ascendant), so returns undefined for a
 * no-time/no-place chart.
 */
export function partOfFortune(chart: Chart): number | undefined {
  return lotOf(chart, "moon", "sun");
}

/**
 * Part of Spirit, Fortune's daimonic twin: ASC + Sun − Moon by day,
 * reversed by night.
 */
export function partOfSpirit(chart: Chart): number | undefined {
  return lotOf(chart, "sun", "moon");
}
