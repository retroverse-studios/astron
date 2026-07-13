import { SIGNS, type Sign, type Varga } from "./types.js";
import { degreeInSign, norm360, signIndex } from "./zodiac.js";

/** Trimsamsa (D30) rulers own fixed degree spans, reversed for even signs. */
const D30_ODD: [number, number][] = [
  // [span end, sign index of the ruler's sign used in D30]
  [5, 0], // Mars → Aries
  [10, 10], // Saturn → Aquarius
  [18, 8], // Jupiter → Sagittarius
  [25, 2], // Mercury → Gemini
  [30, 6], // Venus → Libra
];
const D30_EVEN: [number, number][] = [
  [5, 1], // Venus → Taurus
  [12, 5], // Mercury → Virgo
  [20, 11], // Jupiter → Pisces
  [25, 9], // Saturn → Capricorn
  [30, 7], // Mars → Scorpio
];

/**
 * Divisional (varga) chart sign calculation, per standard Parashari rules.
 * Input longitudes should already be sidereal for Vedic use, but the maths
 * itself is zodiac-agnostic. "Odd sign" below means Aries, Gemini, … (index
 * even, ordinal odd).
 */
export function vargaSign(longitude: number, varga: Varga): Sign {
  const lon = norm360(longitude);
  const rasi = signIndex(lon); // 0 = Aries
  const deg = degreeInSign(lon);
  const odd = rasi % 2 === 0;

  switch (varga) {
    case "d1":
      return SIGNS[rasi]!;
    case "d2": {
      // Hora: 15° halves; odd signs Sun-then-Moon, even signs Moon-then-Sun.
      const first = deg < 15;
      const sunHora = odd ? first : !first;
      return sunHora ? "Leo" : "Cancer";
    }
    case "d3": {
      // Drekkana: 10° thirds — the sign itself, the 5th, the 9th.
      return SIGNS[(rasi + 4 * Math.floor(deg / 10)) % 12]!;
    }
    case "d7": {
      // Saptamsa: sevenths; odd signs count from the sign, even from the 7th.
      const division = Math.floor(deg / (30 / 7));
      return SIGNS[(rasi + (odd ? 0 : 6) + division) % 12]!;
    }
    case "d9": {
      // Navamsa: nine 3°20′ divisions; counting starts from the sign itself
      // for movable, the 9th for fixed, the 5th for dual — equivalent to the
      // classic (rasi * 9 + division) formula.
      const division = Math.floor(deg / (30 / 9));
      return SIGNS[(rasi * 9 + division) % 12]!;
    }
    case "d10": {
      // Dashamsa: ten 3° divisions; odd signs count from the sign itself,
      // even signs from the 9th sign therefrom.
      const division = Math.floor(deg / 3);
      return SIGNS[(rasi + (odd ? 0 : 8) + division) % 12]!;
    }
    case "d12": {
      // Dvadasamsa: twelve 2°30′ divisions counted from the sign itself.
      return SIGNS[(rasi + Math.floor(deg / 2.5)) % 12]!;
    }
    case "d30": {
      const table = odd ? D30_ODD : D30_EVEN;
      for (const [end, sign] of table) {
        if (deg < end) return SIGNS[sign]!;
      }
      return SIGNS[table[table.length - 1]![1]]!;
    }
    case "d60": {
      // Shashtiamsa: sixty 0°30′ divisions counted from the sign itself.
      return SIGNS[(rasi + Math.floor(deg * 2)) % 12]!;
    }
  }
}
