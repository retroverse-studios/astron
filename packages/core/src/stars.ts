import type { Body, Chart, EphemerisProvider } from "./types.js";
import { norm180 } from "./zodiac.js";

/**
 * The classical short list: the four royal stars of Persia, plus the bright
 * and notorious ones traditional astrology actually reads.
 */
export const BRIGHT_STARS: string[] = [
  "Aldebaran",
  "Regulus",
  "Antares",
  "Fomalhaut",
  "Algol",
  "Alcyone",
  "Sirius",
  "Spica",
  "Vega",
  "Arcturus",
  "Capella",
  "Rigel",
  "Betelgeuse",
  "Procyon",
  "Pollux",
  "Altair",
];

export interface StarContact {
  star: string;
  starLongitude: number;
  /** The natal point contacted: a body, or "asc"/"mc". */
  point: Body | "asc" | "mc";
  orb: number;
}

/**
 * Conjunctions of fixed stars to chart points. Tradition reads fixed stars
 * by tight conjunction only (default orb 1°) — no aspects. Returns [] when
 * the provider lacks the star catalog (the WASM build, currently).
 */
export function fixedStarContacts(
  provider: EphemerisProvider,
  chart: Chart,
  options: { orb?: number; stars?: string[] } = {},
): StarContact[] {
  if (!provider.fixedStar) return [];
  const orb = options.orb ?? 1;
  const stars = options.stars ?? BRIGHT_STARS;

  const points: { point: StarContact["point"]; longitude: number }[] = [
    ...chart.positions.map((p) => ({ point: p.body as StarContact["point"], longitude: p.longitude })),
    ...(chart.houses
      ? [
          { point: "asc" as const, longitude: chart.houses.ascendant },
          { point: "mc" as const, longitude: chart.houses.midheaven },
        ]
      : []),
  ];

  const contacts: StarContact[] = [];
  for (const star of stars) {
    const s = provider.fixedStar(chart.julianDayUt, star, chart.zodiac);
    for (const { point, longitude } of points) {
      const deviation = Math.abs(norm180(s.longitude - longitude));
      if (deviation <= orb) {
        contacts.push({ star: s.name, starLongitude: s.longitude, point, orb: deviation });
      }
    }
  }
  return contacts.sort((a, b) => a.orb - b.orb);
}
