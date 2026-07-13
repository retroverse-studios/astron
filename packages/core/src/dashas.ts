import { julianDayUtc, utcFromJulianDay } from "./time.js";
import { norm360 } from "./zodiac.js";

export type DashaLord =
  | "ketu"
  | "venus"
  | "sun"
  | "moon"
  | "mars"
  | "rahu"
  | "jupiter"
  | "saturn"
  | "mercury";

/** Vimshottari sequence and period lengths in years (total 120). */
const SEQUENCE: [DashaLord, number][] = [
  ["ketu", 7],
  ["venus", 20],
  ["sun", 6],
  ["moon", 10],
  ["mars", 7],
  ["rahu", 18],
  ["jupiter", 16],
  ["saturn", 19],
  ["mercury", 17],
];

const YEAR_DAYS = 365.25;
const NAKSHATRA_SPAN = 360 / 27; // 13°20′

export interface DashaPeriod {
  lord: DashaLord;
  start: Date;
  end: Date;
}

/**
 * Vimshottari mahadasha timeline from birth. The Moon's longitude must be
 * SIDEREAL (the system is Vedic; Lahiri is customary) — the nakshatra it
 * occupies fixes the first lord, and the fraction already traversed fixes
 * how much of that first period remains.
 */
export function vimshottariDashas(
  siderealMoonLongitude: number,
  birthUtc: Date,
  cycles = 1,
): DashaPeriod[] {
  const lon = norm360(siderealMoonLongitude);
  const nakshatra = Math.floor(lon / NAKSHATRA_SPAN);
  const traversed = (lon % NAKSHATRA_SPAN) / NAKSHATRA_SPAN;

  const firstIndex = nakshatra % 9;
  const periods: DashaPeriod[] = [];
  let jd = julianDayUtc(birthUtc);

  for (let i = 0; i < 9 * cycles; i++) {
    const [lord, years] = SEQUENCE[(firstIndex + i) % 9]!;
    const lengthDays =
      years * YEAR_DAYS * (i === 0 ? 1 - traversed : 1);
    periods.push({
      lord,
      start: utcFromJulianDay(jd),
      end: utcFromJulianDay(jd + lengthDays),
    });
    jd += lengthDays;
  }
  return periods;
}

/**
 * Antardashas (sub-periods) of a mahadasha: the full sequence starting from
 * the mahadasha's own lord, each sub-period proportional to its lord's
 * years out of 120.
 */
export function antardashas(maha: DashaPeriod): DashaPeriod[] {
  const startIndex = SEQUENCE.findIndex(([lord]) => lord === maha.lord);
  const jdStart = julianDayUtc(maha.start);
  const totalDays = julianDayUtc(maha.end) - jdStart;

  const periods: DashaPeriod[] = [];
  let jd = jdStart;
  for (let i = 0; i < 9; i++) {
    const [lord, years] = SEQUENCE[(startIndex + i) % 9]!;
    const lengthDays = (totalDays * years) / 120;
    periods.push({
      lord,
      start: utcFromJulianDay(jd),
      end: utcFromJulianDay(jd + lengthDays),
    });
    jd += lengthDays;
  }
  return periods;
}

/** The period covering a given date, if any. */
export function dashaAt(periods: DashaPeriod[], when: Date): DashaPeriod | undefined {
  return periods.find((p) => p.start <= when && when < p.end);
}
