import type {
  Body,
  EphemerisProvider,
  GeoLocation,
  HouseSystem,
  ZodiacMode,
} from "./types.js";
import { norm180, norm360 } from "./zodiac.js";

export interface RectificationEvent {
  utc: Date;
  label?: string;
}

export interface RectificationHit {
  event: RectificationEvent;
  transiting: Body;
  angle: "asc" | "mc";
  aspectAngle: number;
  orb: number;
}

export interface RectificationCandidate {
  utc: Date;
  ascendant: number;
  midheaven: number;
  score: number;
  hits: RectificationHit[];
}

export interface RectificationOptions {
  location: GeoLocation;
  /** Candidate birth instants to test (build with candidateTimes()). */
  candidates: Date[];
  /** Major life events (marriages, moves, losses, breaks). More is better. */
  events: RectificationEvent[];
  zodiac?: ZodiacMode;
  houseSystem?: HouseSystem;
  /** Slow movers only by default — fast bodies hit everything. */
  bodies?: Body[];
  /** Aspect angles from transit to angle that count as a hit. */
  aspectAngles?: number[];
  orb?: number;
}

/** Evenly spaced candidate instants across a birth-time bracket. */
export function candidateTimes(startUtc: Date, endUtc: Date, stepMinutes = 8): Date[] {
  const out: Date[] = [];
  for (let t = startUtc.getTime(); t <= endUtc.getTime(); t += stepMinutes * 60000) {
    out.push(new Date(t));
  }
  return out;
}

export const RECTIFICATION_DISCLAIMER =
  "Rectification is a best-guess technique, contested even within astrology: " +
  "it cannot be verified against any independent standard. Scores rank how " +
  "well each candidate time's angles line up with slow transits at your " +
  "events under this method's assumptions — nothing more. Treat the result " +
  "as a hypothesis to test against lived experience, not a recovered fact.";

/**
 * Event-based rectification: for each candidate birth time, cast the angles
 * (ASC/MC move ~1° every 4 minutes, which is what makes this possible at
 * all) and score how tightly slow transiting planets aspected those angles
 * on the given event dates. Returns candidates ranked by score. Read
 * RECTIFICATION_DISCLAIMER before believing anything.
 */
export function rectify(
  provider: EphemerisProvider,
  options: RectificationOptions,
): { candidates: RectificationCandidate[]; disclaimer: string } {
  const zodiac = options.zodiac ?? { type: "tropical" };
  const bodies = options.bodies ?? ["jupiter", "saturn", "uranus", "neptune", "pluto"];
  const angles = options.aspectAngles ?? [0, 90, 180];
  const orb = options.orb ?? 1.5;

  // Transit positions per event are the same for every candidate: compute once.
  const eventPositions = options.events.map((event) => ({
    event,
    positions: bodies.map((body) => ({
      body,
      longitude: provider.bodyPosition(provider.julianDayUt(event.utc), body, zodiac).longitude,
    })),
  }));

  const scored = options.candidates.map((utc) => {
    const houses = provider.houses(
      provider.julianDayUt(utc),
      options.location,
      options.houseSystem ?? "placidus",
      zodiac,
    );
    const hits: RectificationHit[] = [];
    let score = 0;
    for (const { event, positions } of eventPositions) {
      for (const { body, longitude } of positions) {
        for (const [angleName, angleLon] of [
          ["asc", houses.ascendant],
          ["mc", houses.midheaven],
        ] as const) {
          for (const aspectAngle of angles) {
            const targets =
              aspectAngle === 0 || aspectAngle === 180
                ? [norm360(angleLon + aspectAngle)]
                : [norm360(angleLon + aspectAngle), norm360(angleLon - aspectAngle)];
            for (const target of targets) {
              const deviation = Math.abs(norm180(longitude - target));
              if (deviation <= orb) {
                hits.push({ event, transiting: body, angle: angleName, aspectAngle, orb: deviation });
                score += 1 - deviation / orb;
              }
            }
          }
        }
      }
    }
    return { utc, ascendant: houses.ascendant, midheaven: houses.midheaven, score, hits };
  });

  return {
    candidates: scored.sort((a, b) => b.score - a.score),
    disclaimer: RECTIFICATION_DISCLAIMER,
  };
}
