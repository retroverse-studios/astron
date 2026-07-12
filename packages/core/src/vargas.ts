import { SIGNS, type Sign, type Varga } from "./types.js";
import { degreeInSign, norm360, signIndex } from "./zodiac.js";

/**
 * Divisional (varga) chart sign calculation, per standard Parashari rules.
 * Input longitudes should already be sidereal for Vedic use, but the maths
 * itself is zodiac-agnostic.
 */
export function vargaSign(longitude: number, varga: Varga): Sign {
  const lon = norm360(longitude);
  const rasi = signIndex(lon); // 0 = Aries
  const deg = degreeInSign(lon);

  switch (varga) {
    case "d1":
      return SIGNS[rasi]!;
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
      const start = rasi % 2 === 0 ? rasi : rasi + 8;
      return SIGNS[(start + division) % 12]!;
    }
  }
}
