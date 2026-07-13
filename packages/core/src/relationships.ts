import { findAspects, findCrossAspects, MAJOR_ASPECTS } from "./aspects.js";
import { computeChart, houseOf } from "./chart.js";
import { julianDayUtc, utcFromJulianDay } from "./time.js";
import type {
  Aspect,
  AspectDef,
  Body,
  BodyPosition,
  Chart,
  EphemerisProvider,
  GeoLocation,
  HouseSystem,
} from "./types.js";
import { degreeInSign, norm180, norm360, signOf } from "./zodiac.js";

/** Midpoint of two longitudes along the shorter arc (90° for exact opposites). */
export function circularMidpoint(a: number, b: number): number {
  return norm360(a + norm180(b - a) / 2);
}

function assertSameZodiac(a: Chart, b: Chart): void {
  if (JSON.stringify(a.zodiac) !== JSON.stringify(b.zodiac)) {
    throw new Error("both charts must use the same zodiac");
  }
}

export interface HouseOverlay {
  body: Body;
  house: number;
}

export interface SynastryResult {
  /** Inter-aspects; `a` is a body in chart A, `b` in chart B. */
  aspects: Aspect[];
  /** A's planets placed in B's houses (present when B has houses). */
  aInBHouses?: HouseOverlay[];
  /** B's planets placed in A's houses (present when A has houses). */
  bInAHouses?: HouseOverlay[];
}

/**
 * Synastry: two natal charts compared. Inter-aspects between every pair of
 * points, plus each person's planets overlaid on the other's houses.
 * Applying/separating is not meaningful between two birth charts, so every
 * aspect reports applying=false.
 */
export function synastry(
  a: Chart,
  b: Chart,
  aspectDefs: AspectDef[] = MAJOR_ASPECTS,
): SynastryResult {
  assertSameZodiac(a, b);
  const still = (ps: BodyPosition[]) => ps.map((p) => ({ ...p, speed: 0 }));
  return {
    aspects: findCrossAspects(still(a.positions), b.positions, aspectDefs),
    aInBHouses: b.houses
      ? a.positions.map((p) => ({ body: p.body, house: houseOf(p.longitude, b.houses!) }))
      : undefined,
    bInAHouses: a.houses
      ? b.positions.map((p) => ({ body: p.body, house: houseOf(p.longitude, a.houses!) }))
      : undefined,
  };
}

/**
 * Midpoint composite chart: the relationship as its own entity, each point
 * the shorter-arc midpoint of the two people's same point. Speeds are
 * meaningless for midpoints (zeroed); houses, when both charts have them,
 * are whole-sign from the midpoint ascendant — the least contentious of
 * several composite-house conventions, and labelled as such.
 */
export function compositeChart(a: Chart, b: Chart): Chart {
  assertSameZodiac(a, b);
  const positions: BodyPosition[] = [];
  for (const pa of a.positions) {
    const pb = b.positions.find((p) => p.body === pa.body);
    if (!pb) continue;
    const longitude = circularMidpoint(pa.longitude, pb.longitude);
    positions.push({
      body: pa.body,
      longitude,
      latitude: (pa.latitude + pb.latitude) / 2,
      distance: (pa.distance + pb.distance) / 2,
      speed: 0,
      retrograde: false,
      sign: signOf(longitude),
      signDegree: degreeInSign(longitude),
    });
  }

  let houses: Chart["houses"];
  if (a.houses && b.houses) {
    const ascendant = circularMidpoint(a.houses.ascendant, b.houses.ascendant);
    const first = Math.floor(ascendant / 30) * 30;
    houses = {
      system: "wholeSign",
      cusps: Array.from({ length: 12 }, (_, i) => norm360(first + i * 30)),
      ascendant,
      midheaven: circularMidpoint(a.houses.midheaven, b.houses.midheaven),
      vertex: circularMidpoint(a.houses.vertex, b.houses.vertex),
    };
    for (const p of positions) p.house = houseOf(p.longitude, houses);
  }

  const jd = (a.julianDayUt + b.julianDayUt) / 2;
  return {
    julianDayUt: jd,
    utc: utcFromJulianDay(jd),
    location: undefined,
    zodiac: a.zodiac,
    positions,
    houses,
    aspects: findAspects(positions),
  };
}

export type BouquetKind = "bloom" | "thorn" | "bud";

export interface BouquetItem {
  kind: BouquetKind;
  aspect: Aspect;
  /**
   * Visual weight in (0, 1]: how large this flower/thorn should draw.
   * Luminaries and personal planets weigh more than outer planets; tighter
   * orbs weigh more than wide ones.
   */
  weight: number;
}

export interface BouquetProfile {
  items: BouquetItem[];
  blooms: number;
  thorns: number;
  buds: number;
  /** The disclaimer that must accompany any rendering of the bouquet. */
  disclaimer: string;
}

const BOUQUET_KIND: Partial<Record<Aspect["name"], BouquetKind>> = {
  trine: "bloom",
  sextile: "bloom",
  quintile: "bloom",
  biquintile: "bloom",
  semisextile: "bloom",
  square: "thorn",
  opposition: "thorn",
  semisquare: "thorn",
  sesquiquadrate: "thorn",
  quincunx: "thorn",
  conjunction: "bud",
};

const BODY_WEIGHT: Partial<Record<Body, number>> = {
  sun: 3,
  moon: 3,
  venus: 2.5,
  mars: 2.5,
  mercury: 2,
  jupiter: 1.5,
  saturn: 1.5,
};

export const BOUQUET_DISCLAIMER =
  "The bouquet pictures this tradition's aspect rules applied to two charts — " +
  "it does not measure two people. Blooms are flowing aspects, thorns are " +
  "frictional ones, buds are conjunctions that could open either way. " +
  "Thorny bouquets are still bouquets: every rose garden has both.";

/**
 * Turn synastry inter-aspects into a bouquet: one bloom per harmonious
 * aspect, one thorn per hard aspect, one bud per conjunction — sized by the
 * planets involved and the tightness of the orb. Deliberately NOT a score:
 * two numbers side by side resist being read as a verdict.
 */
export function synastryBouquet(aspects: Aspect[]): BouquetProfile {
  const items: BouquetItem[] = [];
  for (const aspect of aspects) {
    const kind = BOUQUET_KIND[aspect.name];
    if (!kind) continue;
    const pair =
      ((BODY_WEIGHT[aspect.a] ?? 1) + (BODY_WEIGHT[aspect.b] ?? 1)) / 6; // 1/3..1
    const tightness = 1 - Math.min(aspect.orb / 8, 1) * 0.6; // 0.4..1
    items.push({ kind, aspect, weight: Math.min(1, pair * tightness) });
  }
  items.sort((a, b) => b.weight - a.weight);
  return {
    items,
    blooms: items.filter((i) => i.kind === "bloom").length,
    thorns: items.filter((i) => i.kind === "thorn").length,
    buds: items.filter((i) => i.kind === "bud").length,
    disclaimer: BOUQUET_DISCLAIMER,
  };
}

/** Great-circle midpoint of two places (undefined behaviour for antipodes). */
export function geographicMidpoint(a: GeoLocation, b: GeoLocation): GeoLocation {
  const rad = Math.PI / 180;
  const vec = (g: GeoLocation) => [
    Math.cos(g.latitude * rad) * Math.cos(g.longitude * rad),
    Math.cos(g.latitude * rad) * Math.sin(g.longitude * rad),
    Math.sin(g.latitude * rad),
  ];
  const [x1, y1, z1] = vec(a);
  const [x2, y2, z2] = vec(b);
  const [x, y, z] = [x1! + x2!, y1! + y2!, z1! + z2!];
  const len = Math.hypot(x, y, z);
  if (len < 1e-9) {
    throw new Error("geographic midpoint of antipodal points is undefined");
  }
  return {
    latitude: Math.asin(z / len) / rad,
    longitude: Math.atan2(y, x) / rad,
    name: "midpoint",
  };
}

/**
 * Davison relationship chart: a real chart cast for the midpoint in time
 * between two births and the geographic midpoint between the birthplaces —
 * unlike the composite, this sky actually existed, so it has genuine
 * houses, speeds and retrogrades.
 */
export function davisonChart(
  provider: EphemerisProvider,
  a: Chart,
  b: Chart,
  overrides: { houseSystem?: HouseSystem } = {},
): Chart {
  assertSameZodiac(a, b);
  const utc = utcFromJulianDay((julianDayUtc(a.utc) + julianDayUtc(b.utc)) / 2);
  const location =
    a.location && b.location ? geographicMidpoint(a.location, b.location) : undefined;
  return computeChart(
    {
      utc,
      location,
      zodiac: a.zodiac,
      houseSystem: overrides.houseSystem ?? a.houses?.system,
    },
    provider,
  );
}
