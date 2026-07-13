import { computeChart } from "./chart.js";
import { julianDayUtc, utcFromJulianDay } from "./time.js";
import type { BodyPosition, Chart, EphemerisProvider } from "./types.js";
import { degreeInSign, norm360, signOf } from "./zodiac.js";

const TROPICAL_YEAR_DAYS = 365.2422;

/**
 * Secondary progressions: a day after birth for a year of life. Returns the
 * ephemeris instant whose sky is read as the progressed chart for
 * `targetUtc`.
 */
export function secondaryProgressedInstant(natalUtc: Date, targetUtc: Date): Date {
  const jdNatal = julianDayUtc(natalUtc);
  const yearsElapsed = (julianDayUtc(targetUtc) - jdNatal) / TROPICAL_YEAR_DAYS;
  return utcFromJulianDay(jdNatal + yearsElapsed);
}

/**
 * Secondary progressed chart for a target date. Houses (when the natal
 * chart has a location) are cast for the progressed instant at the natal
 * place — one of several conventions; treat progressed angles as a reading
 * choice, not gospel.
 */
export function secondaryProgression(
  provider: EphemerisProvider,
  natal: Chart,
  targetUtc: Date,
): Chart {
  return computeChart(
    {
      utc: secondaryProgressedInstant(natal.utc, targetUtc),
      location: natal.location,
      zodiac: natal.zodiac,
      houseSystem: natal.houses?.system,
    },
    provider,
  );
}

export interface SolarArcResult {
  /** The arc every point is directed by, degrees. */
  arc: number;
  positions: BodyPosition[];
}

/**
 * Solar arc directions: every natal point advanced by the progressed Sun's
 * distance from the natal Sun (~1° per year of life).
 */
export function solarArcDirections(
  provider: EphemerisProvider,
  natal: Chart,
  targetUtc: Date,
): SolarArcResult {
  const progressed = secondaryProgression(provider, natal, targetUtc);
  const natalSun = natal.positions.find((p) => p.body === "sun");
  const progressedSun = progressed.positions.find((p) => p.body === "sun");
  if (!natalSun || !progressedSun) throw new Error("charts need the Sun");
  const arc = norm360(progressedSun.longitude - natalSun.longitude);
  return {
    arc,
    positions: natal.positions.map((p) => {
      const longitude = norm360(p.longitude + arc);
      return {
        ...p,
        longitude,
        sign: signOf(longitude),
        signDegree: degreeInSign(longitude),
        house: undefined,
      };
    }),
  };
}
