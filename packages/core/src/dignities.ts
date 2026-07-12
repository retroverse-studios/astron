import { SIGNS, type Body, type Sign } from "./types.js";

export type Dignity = "domicile" | "exaltation" | "detriment" | "fall";

/** Traditional scheme stops at Saturn; modern hands Scorpio/Aquarius/Pisces to the outers. */
export type RulershipScheme = "traditional" | "modern";

const TRADITIONAL_RULERS: Record<Sign, Body> = {
  Aries: "mars",
  Taurus: "venus",
  Gemini: "mercury",
  Cancer: "moon",
  Leo: "sun",
  Virgo: "mercury",
  Libra: "venus",
  Scorpio: "mars",
  Sagittarius: "jupiter",
  Capricorn: "saturn",
  Aquarius: "saturn",
  Pisces: "jupiter",
};

const MODERN_RULERS: Record<Sign, Body> = {
  ...TRADITIONAL_RULERS,
  Scorpio: "pluto",
  Aquarius: "uranus",
  Pisces: "neptune",
};

/** Classical exaltations. Outer-planet exaltations are contested and omitted. */
const EXALTATIONS: Partial<Record<Body, Sign>> = {
  sun: "Aries",
  moon: "Taurus",
  mercury: "Virgo",
  venus: "Pisces",
  mars: "Capricorn",
  jupiter: "Cancer",
  saturn: "Libra",
};

function oppositeSign(sign: Sign): Sign {
  return SIGNS[(SIGNS.indexOf(sign) + 6) % 12]!;
}

export function rulerOf(sign: Sign, scheme: RulershipScheme = "modern"): Body {
  return (scheme === "modern" ? MODERN_RULERS : TRADITIONAL_RULERS)[sign];
}

/**
 * Essential dignities of a body in a sign. Returns every dignity that applies —
 * Mercury in Virgo is both domicile and exaltation, in Pisces both detriment
 * and fall. Empty array = peregrine (no essential dignity).
 */
export function dignities(
  body: Body,
  sign: Sign,
  scheme: RulershipScheme = "modern",
): Dignity[] {
  const found: Dignity[] = [];
  if (rulerOf(sign, scheme) === body) found.push("domicile");
  if (EXALTATIONS[body] === sign) found.push("exaltation");
  if (rulerOf(oppositeSign(sign), scheme) === body) found.push("detriment");
  if (EXALTATIONS[body] === oppositeSign(sign)) found.push("fall");
  return found;
}
