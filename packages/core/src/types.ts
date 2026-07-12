/** Celestial bodies and points ASTRON can place on a chart. */
export type Body =
  | "sun"
  | "moon"
  | "mercury"
  | "venus"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune"
  | "pluto"
  | "trueNode"
  | "meanNode"
  | "chiron"
  | "meanLilith";

export const DEFAULT_BODIES: Body[] = [
  "sun",
  "moon",
  "mercury",
  "venus",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
  "pluto",
  "trueNode",
  "chiron",
];

export type Ayanamsa = "lahiri" | "raman" | "krishnamurti" | "faganBradley";

export type ZodiacMode =
  | { type: "tropical" }
  | { type: "sidereal"; ayanamsa: Ayanamsa };

export type HouseSystem =
  | "placidus"
  | "wholeSign"
  | "equal"
  | "koch"
  | "campanus"
  | "regiomontanus"
  | "porphyry";

export const SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export type Sign = (typeof SIGNS)[number];

export interface GeoLocation {
  latitude: number;
  /** East-positive, degrees. */
  longitude: number;
  name?: string;
}

export interface BodyPosition {
  body: Body;
  /** Ecliptic longitude in the requested zodiac, 0–360. */
  longitude: number;
  /** Ecliptic latitude, degrees. */
  latitude: number;
  /** Distance in AU. */
  distance: number;
  /** Longitudinal speed, degrees/day. Negative = retrograde. */
  speed: number;
  retrograde: boolean;
  sign: Sign;
  /** Degrees into the sign, 0–30. */
  signDegree: number;
  /** House number 1–12, when houses were computed. */
  house?: number;
}

export interface HouseData {
  system: HouseSystem;
  /** Cusp longitudes, index 0 = house 1. */
  cusps: number[];
  ascendant: number;
  midheaven: number;
  vertex: number;
}

export type AspectName =
  | "conjunction"
  | "sextile"
  | "square"
  | "trine"
  | "opposition"
  | "semisextile"
  | "semisquare"
  | "sesquiquadrate"
  | "quincunx"
  | "quintile"
  | "biquintile";

export interface AspectDef {
  name: AspectName;
  angle: number;
  orb: number;
}

export interface Aspect {
  a: Body;
  b: Body;
  name: AspectName;
  angle: number;
  /** Deviation from exact, degrees (unsigned). */
  orb: number;
  applying: boolean;
}

export interface ChartInput {
  /** Moment of the chart in UTC. */
  utc: Date;
  /** Omit for a "no houses" chart (unknown birth time / planets-only). */
  location?: GeoLocation;
  zodiac?: ZodiacMode;
  houseSystem?: HouseSystem;
  bodies?: Body[];
  aspectDefs?: AspectDef[];
}

export interface Chart {
  julianDayUt: number;
  utc: Date;
  location?: GeoLocation;
  zodiac: ZodiacMode;
  positions: BodyPosition[];
  houses?: HouseData;
  aspects: Aspect[];
  /** Ayanamsa value used, degrees (sidereal charts only). */
  ayanamsaValue?: number;
}

/** Divisional (varga) charts supported so far. D1 is the rasi chart itself. */
export type Varga = "d1" | "d9" | "d10";

export interface EphemerisProvider {
  julianDayUt(utc: Date): number;
  bodyPosition(jdUt: number, body: Body, zodiac: ZodiacMode): BodyPosition;
  houses(
    jdUt: number,
    location: GeoLocation,
    system: HouseSystem,
    zodiac: ZodiacMode,
  ): HouseData;
  /** Ayanamsa in degrees at the given moment for the given sidereal mode. */
  ayanamsa(jdUt: number, ayanamsa: Ayanamsa): number;
}
