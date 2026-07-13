import { scanIngresses, scanStations, type ScanWindow } from "./scan.js";
import { scanLunations, scanVoidOfCourse } from "./moon-events.js";
import { utcFromJulianDay } from "./time.js";
import type { Body, EphemerisProvider, Sign } from "./types.js";
import { signOf } from "./zodiac.js";

export interface ElectionalCriteria {
  /** Skip void-of-course Moon periods (default true). */
  avoidVoidOfCourse?: boolean;
  /** Skip times when any of these bodies is retrograde. */
  avoidRetrograde?: Body[];
  /** Only allow times with the Moon in these signs. */
  moonSigns?: Sign[];
  /** Only allow the waxing Moon (new → full). */
  waxingMoon?: boolean;
}

export interface ElectionalWindow {
  start: Date;
  end: Date;
  /** Moon sign at the window's start. */
  moonSign: Sign;
}

type Interval = [number, number]; // jd

function mergeIntervals(intervals: Interval[]): Interval[] {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged: Interval[] = [];
  for (const [s, e] of sorted) {
    const last = merged[merged.length - 1];
    if (last && s <= last[1]) last[1] = Math.max(last[1], e);
    else merged.push([s, e]);
  }
  return merged;
}

function complement(blocked: Interval[], jd0: number, jd1: number): Interval[] {
  const free: Interval[] = [];
  let cursor = jd0;
  for (const [s, e] of mergeIntervals(blocked)) {
    if (s > cursor) free.push([cursor, Math.min(s, jd1)]);
    cursor = Math.max(cursor, e);
    if (cursor >= jd1) break;
  }
  if (cursor < jd1) free.push([cursor, jd1]);
  return free.filter(([s, e]) => e - s > 1e-6);
}

/**
 * Electional search: the reverse of horary. Instead of reading a moment,
 * find the moments worth choosing — the stretches of a window that dodge
 * the classic "don't start it now" conditions. What counts as auspicious
 * beyond that is the tradition's argument to have, not the software's:
 * combine criteria to taste and read the resulting charts yourself.
 */
export function scanElectional(
  provider: EphemerisProvider,
  window: ScanWindow,
  criteria: ElectionalCriteria = {},
): ElectionalWindow[] {
  const zodiac = window.zodiac ?? { type: "tropical" };
  const jd0 = provider.julianDayUt(window.from);
  const jd1 = jd0 + window.days;
  const blocked: Interval[] = [];

  if (criteria.avoidVoidOfCourse ?? true) {
    // Pad left so a VoC period already underway at the window start is seen.
    const padded = { from: utcFromJulianDay(jd0 - 3), days: window.days + 3, zodiac };
    for (const p of scanVoidOfCourse(provider, padded)) {
      blocked.push([p.jdStart, p.jdEnd]);
    }
  }

  for (const body of criteria.avoidRetrograde ?? []) {
    // Stations inside the window plus the state at its edges.
    const stations = scanStations(provider, { from: window.from, days: window.days, zodiac }, [body]);
    let cursor = jd0;
    let retro = provider.bodyPosition(jd0, body, zodiac).speed < 0;
    for (const st of stations) {
      if (retro) blocked.push([cursor, st.jd]);
      retro = st.type === "retrograde";
      cursor = st.jd;
    }
    if (retro) blocked.push([cursor, jd1]);
  }

  if (criteria.moonSigns?.length) {
    const allowed = new Set(criteria.moonSigns);
    const ingresses = scanIngresses(provider, { from: window.from, days: window.days, zodiac }, ["moon"]);
    let cursor = jd0;
    let sign = signOf(provider.bodyPosition(jd0, "moon", zodiac).longitude);
    for (const ing of ingresses) {
      if (!allowed.has(sign)) blocked.push([cursor, ing.jd]);
      sign = ing.sign;
      cursor = ing.jd;
    }
    if (!allowed.has(sign)) blocked.push([cursor, jd1]);
  }

  if (criteria.waxingMoon) {
    // Waning stretches run full → new.
    const lunations = scanLunations(provider, {
      from: utcFromJulianDay(jd0 - 16),
      days: window.days + 16,
      zodiac,
    });
    for (let i = 0; i < lunations.length; i++) {
      const l = lunations[i]!;
      if (l.type !== "full") continue;
      const nextNew = lunations.slice(i + 1).find((x) => x.type === "new");
      blocked.push([l.jd, nextNew ? nextNew.jd : jd1 + 1]);
    }
  }

  return complement(blocked, jd0, jd1).map(([s, e]) => ({
    start: utcFromJulianDay(s),
    end: utcFromJulianDay(e),
    moonSign: signOf(provider.bodyPosition(s + 1e-4, "moon", zodiac).longitude),
  }));
}
