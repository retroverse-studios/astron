import { utcFromJulianDay } from "./time.js";
import {
  SIGNS,
  type AspectDef,
  type AspectName,
  type Body,
  type BodyPosition,
  type EphemerisProvider,
  type Sign,
  type ZodiacMode,
} from "./types.js";
import { norm180, norm360, signOf } from "./zodiac.js";

/**
 * Zero-crossings of a signed circular function (values in (-180, 180]) over
 * [jdStart, jdEnd]. A sign change only counts when the jump is small — a
 * ±180 wraparound is not a crossing. Each crossing is refined by bisection
 * to ~1 second.
 */
export function findCrossings(
  f: (jd: number) => number,
  jdStart: number,
  jdEnd: number,
  stepDays: number,
): number[] {
  const hits: number[] = [];
  let jdPrev = jdStart;
  let fPrev = f(jdPrev);
  for (let jd = jdStart + stepDays; jd <= jdEnd + stepDays / 2; jd += stepDays) {
    const jdCur = Math.min(jd, jdEnd);
    const fCur = f(jdCur);
    if (fPrev === 0) {
      hits.push(jdPrev);
    } else if (fPrev * fCur < 0 && Math.abs(fCur - fPrev) < 180) {
      let lo = jdPrev;
      let hi = jdCur;
      let fLo = fPrev;
      for (let i = 0; i < 48 && hi - lo > 1e-5; i++) {
        const mid = (lo + hi) / 2;
        const fMid = f(mid);
        if (fLo * fMid <= 0) {
          hi = mid;
        } else {
          lo = mid;
          fLo = fMid;
        }
      }
      hits.push((lo + hi) / 2);
    }
    jdPrev = jdCur;
    fPrev = fCur;
    if (jdCur >= jdEnd) break;
  }
  return hits;
}

/** Sampling step per body, chosen so a crossing can't be skipped. */
const STEP_DAYS: Record<Body, number> = {
  sun: 0.75,
  moon: 0.25,
  mercury: 0.75,
  venus: 0.75,
  mars: 1,
  jupiter: 1.5,
  saturn: 2,
  uranus: 2,
  neptune: 2,
  pluto: 2,
  trueNode: 1.5,
  meanNode: 1.5,
  chiron: 2,
  meanLilith: 1.5,
};

const TRANSIT_SCAN_BODIES: Body[] = [
  "sun",
  "mercury",
  "venus",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
  "pluto",
  "chiron",
];

export const SCAN_ASPECTS: AspectDef[] = [
  { name: "conjunction", angle: 0, orb: 0 },
  { name: "sextile", angle: 60, orb: 0 },
  { name: "square", angle: 90, orb: 0 },
  { name: "trine", angle: 120, orb: 0 },
  { name: "opposition", angle: 180, orb: 0 },
];

export interface ScanWindow {
  from: Date;
  days: number;
  zodiac?: ZodiacMode;
}

export interface TransitHit {
  transiting: Body;
  natal: Body;
  aspect: AspectName;
  angle: number;
  jd: number;
  utc: Date;
  /** The transiting body was retrograde at the moment of exactness. */
  retrograde: boolean;
}

/**
 * Exact transiting aspects to natal points inside a window. A slow body
 * that stations near a natal point reports each pass (direct, retrograde,
 * direct) separately. The Moon is excluded by default — it perfects every
 * aspect to everything monthly; pass it in `bodies` explicitly if wanted.
 */
export function scanTransits(
  provider: EphemerisProvider,
  natal: BodyPosition[],
  window: ScanWindow,
  options: { bodies?: Body[]; aspectDefs?: AspectDef[] } = {},
): TransitHit[] {
  const zodiac = window.zodiac ?? { type: "tropical" };
  const bodies = options.bodies ?? TRANSIT_SCAN_BODIES;
  const aspectDefs = options.aspectDefs ?? SCAN_ASPECTS;
  const jd0 = provider.julianDayUt(window.from);
  const jd1 = jd0 + window.days;

  const hits: TransitHit[] = [];
  for (const body of bodies) {
    const lonAt = (jd: number) => provider.bodyPosition(jd, body, zodiac).longitude;
    for (const point of natal) {
      for (const def of aspectDefs) {
        const targets =
          def.angle === 0 || def.angle === 180
            ? [norm360(point.longitude + def.angle)]
            : [norm360(point.longitude + def.angle), norm360(point.longitude - def.angle)];
        for (const target of targets) {
          for (const jd of findCrossings((t) => norm180(lonAt(t) - target), jd0, jd1, STEP_DAYS[body])) {
            hits.push({
              transiting: body,
              natal: point.body,
              aspect: def.name,
              angle: def.angle,
              jd,
              utc: utcFromJulianDay(jd),
              retrograde: provider.bodyPosition(jd, body, zodiac).speed < 0,
            });
          }
        }
      }
    }
  }
  return hits.sort((a, b) => a.jd - b.jd);
}

export interface StationEvent {
  body: Body;
  jd: number;
  utc: Date;
  type: "retrograde" | "direct";
  longitude: number;
}

/** Moments a body's longitudinal motion reverses (stations). */
export function scanStations(
  provider: EphemerisProvider,
  window: ScanWindow,
  bodies: Body[] = ["mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto", "chiron"],
): StationEvent[] {
  const zodiac = window.zodiac ?? { type: "tropical" };
  const jd0 = provider.julianDayUt(window.from);
  const jd1 = jd0 + window.days;
  const events: StationEvent[] = [];
  for (const body of bodies) {
    const speedAt = (jd: number) => provider.bodyPosition(jd, body, zodiac).speed;
    // speed is not circular, but findCrossings' wrap guard never triggers
    // on values this small, so it doubles as a plain root finder.
    for (const jd of findCrossings(speedAt, jd0, jd1, STEP_DAYS[body])) {
      const after = provider.bodyPosition(jd + 0.5, body, zodiac);
      events.push({
        body,
        jd,
        utc: utcFromJulianDay(jd),
        type: after.speed < 0 ? "retrograde" : "direct",
        longitude: provider.bodyPosition(jd, body, zodiac).longitude,
      });
    }
  }
  return events.sort((a, b) => a.jd - b.jd);
}

export interface IngressEvent {
  body: Body;
  jd: number;
  utc: Date;
  sign: Sign;
  /** True when the body backs into the sign moving retrograde. */
  retrograde: boolean;
}

/** Sign ingresses (including retrograde re-entries). */
export function scanIngresses(
  provider: EphemerisProvider,
  window: ScanWindow,
  bodies: Body[] = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn"],
): IngressEvent[] {
  const zodiac = window.zodiac ?? { type: "tropical" };
  const jd0 = provider.julianDayUt(window.from);
  const jd1 = jd0 + window.days;
  const events: IngressEvent[] = [];
  for (const body of bodies) {
    const lonAt = (jd: number) => provider.bodyPosition(jd, body, zodiac).longitude;
    for (const boundary of SIGNS.map((_, i) => i * 30)) {
      for (const jd of findCrossings((t) => norm180(lonAt(t) - boundary), jd0, jd1, STEP_DAYS[body])) {
        const after = provider.bodyPosition(jd + 1e-3, body, zodiac);
        events.push({
          body,
          jd,
          utc: utcFromJulianDay(jd),
          sign: signOf(after.longitude),
          retrograde: after.speed < 0,
        });
      }
    }
  }
  return events.sort((a, b) => a.jd - b.jd);
}
