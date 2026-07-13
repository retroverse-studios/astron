import { computeChart } from "./chart.js";
import { findCrossings } from "./scan.js";
import { utcFromJulianDay } from "./time.js";
import type {
  Body,
  Chart,
  ChartInput,
  EphemerisProvider,
} from "./types.js";
import { norm180 } from "./zodiac.js";

export interface ReturnOverrides {
  /** Where the return is experienced (defaults to the natal location). */
  location?: ChartInput["location"];
  houseSystem?: ChartInput["houseSystem"];
}

function natalLongitude(natal: Chart, body: Body): number {
  const p = natal.positions.find((x) => x.body === body);
  if (!p) throw new Error(`natal chart has no ${body}`);
  return p.longitude;
}

function returnChart(
  provider: EphemerisProvider,
  natal: Chart,
  body: Body,
  jdGuessStart: number,
  jdGuessEnd: number,
  stepDays: number,
  overrides: ReturnOverrides,
): Chart {
  const target = natalLongitude(natal, body);
  const f = (jd: number) =>
    norm180(provider.bodyPosition(jd, body, natal.zodiac).longitude - target);
  const [jd] = findCrossings(f, jdGuessStart, jdGuessEnd, stepDays);
  if (jd === undefined) {
    throw new Error(`no ${body} return found in the search window`);
  }
  return computeChart(
    {
      utc: utcFromJulianDay(jd),
      location: overrides.location ?? natal.location,
      zodiac: natal.zodiac,
      houseSystem: overrides.houseSystem ?? natal.houses?.system,
    },
    provider,
  );
}

/**
 * Solar return: the chart for the instant the Sun returns to its natal
 * longitude in the given calendar year — the "birthday chart".
 */
export function solarReturn(
  provider: EphemerisProvider,
  natal: Chart,
  year: number,
  overrides: ReturnOverrides = {},
): Chart {
  const natalYear = natal.utc.getUTCFullYear();
  const jdGuess = natal.julianDayUt + 365.2422 * (year - natalYear);
  return returnChart(provider, natal, "sun", jdGuess - 4, jdGuess + 4, 0.75, overrides);
}

/**
 * Lunar return: the first chart after `after` where the Moon returns to
 * its natal longitude (roughly every 27.3 days).
 */
export function lunarReturn(
  provider: EphemerisProvider,
  natal: Chart,
  after: Date,
  overrides: ReturnOverrides = {},
): Chart {
  const jd0 = provider.julianDayUt(after);
  return returnChart(provider, natal, "moon", jd0, jd0 + 29, 0.25, overrides);
}
