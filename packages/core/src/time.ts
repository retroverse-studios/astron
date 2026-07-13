import type { CalendarSystem } from "./types.js";

/**
 * Julian Day (UT) from a UTC instant, pure arithmetic (Meeus, Astronomical
 * Algorithms ch. 7) — no ephemeris library needed, works in any runtime.
 * The Date's UTC Y/M/D are read as a date in the given calendar system.
 */
/**
 * UTC instant from a Julian Day (Meeus ch. 7 inverse). Dates before the
 * Gregorian reform (JD 2299161) come back in the Julian calendar, matching
 * historical usage.
 */
export function utcFromJulianDay(jd: number): Date {
  const j = jd + 0.5;
  const z = Math.floor(j);
  const f = j - z;
  let a = z;
  if (z >= 2299161) {
    const alpha = Math.floor((z - 1867216.25) / 36524.25);
    a = z + 1 + alpha - Math.floor(alpha / 4);
  }
  const b = a + 1524;
  const c = Math.floor((b - 122.1) / 365.25);
  const d = Math.floor(365.25 * c);
  const e = Math.floor((b - d) / 30.6001);
  const dayWithFraction = b - d - Math.floor(30.6001 * e) + f;
  const day = Math.floor(dayWithFraction);
  const month = e < 14 ? e - 1 : e - 13;
  const year = month > 2 ? c - 4716 : c - 4715;
  const ms = Math.round((dayWithFraction - day) * 86400000);
  return new Date(Date.UTC(year, month - 1, day) + ms);
}

export function julianDayUtc(
  utc: Date,
  calendar: CalendarSystem = "gregorian",
): number {
  let y = utc.getUTCFullYear();
  let m = utc.getUTCMonth() + 1;
  const day =
    utc.getUTCDate() +
    (utc.getUTCHours() +
      utc.getUTCMinutes() / 60 +
      (utc.getUTCSeconds() + utc.getUTCMilliseconds() / 1000) / 3600) /
      24;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  let b = 0;
  if (calendar === "gregorian") {
    const a = Math.floor(y / 100);
    b = 2 - a + Math.floor(a / 4);
  }
  return (
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    b -
    1524.5
  );
}
