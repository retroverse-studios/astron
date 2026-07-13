import { findCrossings, scanIngresses, type ScanWindow } from "./scan.js";
import { utcFromJulianDay } from "./time.js";
import type { AspectName, Body, EphemerisProvider, Sign } from "./types.js";
import { norm180 } from "./zodiac.js";

export interface Lunation {
  type: "new" | "firstQuarter" | "full" | "lastQuarter";
  jd: number;
  utc: Date;
  /** Moon's longitude at the moment of exactness. */
  longitude: number;
}

const LUNATION_ANGLES: [number, Lunation["type"]][] = [
  [0, "new"],
  [90, "firstQuarter"],
  [180, "full"],
  [270, "lastQuarter"],
];

/** New moons, full moons and quarters in a window. */
export function scanLunations(
  provider: EphemerisProvider,
  window: ScanWindow,
): Lunation[] {
  const zodiac = window.zodiac ?? { type: "tropical" };
  const jd0 = provider.julianDayUt(window.from);
  const jd1 = jd0 + window.days;
  const phase = (jd: number) =>
    provider.bodyPosition(jd, "moon", zodiac).longitude -
    provider.bodyPosition(jd, "sun", zodiac).longitude;

  const events: Lunation[] = [];
  for (const [angle, type] of LUNATION_ANGLES) {
    for (const jd of findCrossings((t) => norm180(phase(t) - angle), jd0, jd1, 0.25)) {
      events.push({
        type,
        jd,
        utc: utcFromJulianDay(jd),
        longitude: provider.bodyPosition(jd, "moon", zodiac).longitude,
      });
    }
  }
  return events.sort((a, b) => a.jd - b.jd);
}

export interface VoidOfCoursePeriod {
  start: Date;
  end: Date;
  jdStart: number;
  jdEnd: number;
  /** Sign the Moon enters at the end of the void period. */
  entering: Sign;
  lastAspect: { body: Body; aspect: AspectName };
}

const VOC_ASPECT_BODIES: Body[] = [
  "sun",
  "mercury",
  "venus",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
  "pluto",
];

const MAJOR_ANGLES: [number, AspectName][] = [
  [0, "conjunction"],
  [60, "sextile"],
  [90, "square"],
  [120, "trine"],
  [180, "opposition"],
];

/**
 * Void-of-course Moon periods: from the Moon's last exact major aspect (to
 * Sun through Pluto) until its next sign ingress. Ingresses whose preceding
 * aspect falls before the scan window are skipped, so widen the window by a
 * few days on the left if the leading edge matters.
 */
export function scanVoidOfCourse(
  provider: EphemerisProvider,
  window: ScanWindow,
): VoidOfCoursePeriod[] {
  const zodiac = window.zodiac ?? { type: "tropical" };
  const jd0 = provider.julianDayUt(window.from);
  const jd1 = jd0 + window.days;
  const moonAt = (jd: number) => provider.bodyPosition(jd, "moon", zodiac).longitude;

  // All exact Moon aspects in the window.
  const aspects: { jd: number; body: Body; aspect: AspectName }[] = [];
  for (const body of VOC_ASPECT_BODIES) {
    const otherAt = (jd: number) => provider.bodyPosition(jd, body, zodiac).longitude;
    for (const [angle, name] of MAJOR_ANGLES) {
      for (const target of angle === 0 || angle === 180 ? [angle] : [angle, -angle]) {
        for (const jd of findCrossings((t) => norm180(moonAt(t) - otherAt(t) - target), jd0, jd1, 0.25)) {
          aspects.push({ jd, body, aspect: name });
        }
      }
    }
  }
  aspects.sort((a, b) => a.jd - b.jd);

  const periods: VoidOfCoursePeriod[] = [];
  let prevIngressJd = -Infinity;
  for (const ingress of scanIngresses(provider, window, ["moon"])) {
    const last = aspects.filter((a) => a.jd < ingress.jd).pop();
    const inThisSign = last && last.jd > prevIngressJd;
    prevIngressJd = ingress.jd;
    // No aspect since entering the sign (or the aspect precedes the scan
    // window): skip rather than misattribute an earlier sign's aspect.
    if (!last || !inThisSign) continue;
    periods.push({
      start: utcFromJulianDay(last.jd),
      end: ingress.utc,
      jdStart: last.jd,
      jdEnd: ingress.jd,
      entering: ingress.sign,
      lastAspect: { body: last.body, aspect: last.aspect },
    });
  }
  return periods;
}
