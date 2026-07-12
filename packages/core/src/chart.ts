import { findAspects, MAJOR_ASPECTS } from "./aspects.js";
import {
  DEFAULT_BODIES,
  type Chart,
  type ChartInput,
  type EphemerisProvider,
  type HouseData,
} from "./types.js";
import { norm360 } from "./zodiac.js";

/** House number (1–12) a longitude falls in, given cusp longitudes. */
export function houseOf(longitude: number, houses: HouseData): number {
  const lon = norm360(longitude);
  for (let i = 0; i < 12; i++) {
    const start = norm360(houses.cusps[i]!);
    const end = norm360(houses.cusps[(i + 1) % 12]!);
    const inHouse =
      start < end ? lon >= start && lon < end : lon >= start || lon < end;
    if (inHouse) return i + 1;
  }
  return 12; // unreachable with sane cusps
}

/**
 * Compute a chart for a moment (and optionally a place). This one function
 * covers natal, transit, horary and electional charts — they differ only in
 * which moment you pass in. Returns/progressions build on it in core.
 */
export function computeChart(
  input: ChartInput,
  provider: EphemerisProvider,
): Chart {
  const zodiac = input.zodiac ?? { type: "tropical" };
  const bodies = input.bodies ?? DEFAULT_BODIES;
  const jdUt = provider.julianDayUt(input.utc);

  const positions = bodies.map((b) => provider.bodyPosition(jdUt, b, zodiac));

  let houses: HouseData | undefined;
  if (input.location) {
    houses = provider.houses(
      jdUt,
      input.location,
      input.houseSystem ?? "placidus",
      zodiac,
    );
    for (const p of positions) p.house = houseOf(p.longitude, houses);
  }

  const aspects = findAspects(positions, input.aspectDefs ?? MAJOR_ASPECTS);

  return {
    julianDayUt: jdUt,
    utc: input.utc,
    location: input.location,
    zodiac,
    positions,
    houses,
    aspects,
    ayanamsaValue:
      zodiac.type === "sidereal"
        ? provider.ayanamsa(jdUt, zodiac.ayanamsa)
        : undefined,
  };
}
