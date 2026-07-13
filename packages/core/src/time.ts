import type { CalendarSystem } from "./types.js";

/**
 * Julian Day (UT) from a UTC instant, pure arithmetic (Meeus, Astronomical
 * Algorithms ch. 7) — no ephemeris library needed, works in any runtime.
 * The Date's UTC Y/M/D are read as a date in the given calendar system.
 */
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
