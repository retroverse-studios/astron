import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sweph from "sweph";
import type {
  Ayanamsa,
  Body,
  BodyPosition,
  CalendarSystem,
  EphemerisProvider,
  GeoLocation,
  HouseData,
  HouseSystem,
  ZodiacMode,
} from "../types.js";
import { degreeInSign, signOf } from "../zodiac.js";

const { constants } = sweph;

const BODY_IDS: Record<Body, number> = {
  sun: constants.SE_SUN,
  moon: constants.SE_MOON,
  mercury: constants.SE_MERCURY,
  venus: constants.SE_VENUS,
  mars: constants.SE_MARS,
  jupiter: constants.SE_JUPITER,
  saturn: constants.SE_SATURN,
  uranus: constants.SE_URANUS,
  neptune: constants.SE_NEPTUNE,
  pluto: constants.SE_PLUTO,
  trueNode: constants.SE_TRUE_NODE,
  meanNode: constants.SE_MEAN_NODE,
  chiron: constants.SE_CHIRON,
  meanLilith: constants.SE_MEAN_APOG,
};

const SID_MODES: Record<Ayanamsa, number> = {
  faganBradley: constants.SE_SIDM_FAGAN_BRADLEY,
  lahiri: constants.SE_SIDM_LAHIRI,
  raman: constants.SE_SIDM_RAMAN,
  krishnamurti: constants.SE_SIDM_KRISHNAMURTI,
};

const HOUSE_CODES: Record<HouseSystem, string> = {
  placidus: "P",
  wholeSign: "W",
  equal: "E",
  koch: "K",
  campanus: "C",
  regiomontanus: "R",
  porphyry: "O",
};

/**
 * EphemerisProvider backed by the Swiss Ephemeris native binding (`sweph`).
 * Looks for .se1 ephemeris files in ASTRON_EPHE_PATH or the package's `ephe`
 * directory; planets fall back to the built-in Moshier model when files are
 * missing, but Chiron requires seas_18.se1.
 */
export class SwephProvider implements EphemerisProvider {
  private hasFiles: boolean;

  constructor(ephePath?: string) {
    const candidates = [
      ephePath,
      process.env["ASTRON_EPHE_PATH"],
      join(dirname(fileURLToPath(import.meta.url)), "..", "..", "ephe"),
    ].filter((p): p is string => !!p);
    const found = candidates.find((p) => existsSync(p));
    if (found) sweph.set_ephe_path(found);
    this.hasFiles = !!found;
  }

  julianDayUt(utc: Date, calendar: CalendarSystem = "gregorian"): number {
    return sweph.julday(
      utc.getUTCFullYear(),
      utc.getUTCMonth() + 1,
      utc.getUTCDate(),
      utc.getUTCHours() +
        utc.getUTCMinutes() / 60 +
        (utc.getUTCSeconds() + utc.getUTCMilliseconds() / 1000) / 3600,
      calendar === "julian" ? constants.SE_JUL_CAL : constants.SE_GREG_CAL,
    );
  }

  private baseFlags(): number {
    return (
      (this.hasFiles ? constants.SEFLG_SWIEPH : constants.SEFLG_MOSEPH) |
      constants.SEFLG_SPEED
    );
  }

  private applyZodiac(flags: number, zodiac: ZodiacMode): number {
    if (zodiac.type === "sidereal") {
      sweph.set_sid_mode(SID_MODES[zodiac.ayanamsa], 0, 0);
      return flags | constants.SEFLG_SIDEREAL;
    }
    return flags;
  }

  bodyPosition(jdUt: number, body: Body, zodiac: ZodiacMode): BodyPosition {
    const flags = this.applyZodiac(this.baseFlags(), zodiac);
    const result = sweph.calc_ut(jdUt, BODY_IDS[body], flags);
    if (result.error && result.flag < 0) {
      throw new Error(`sweph calc_ut failed for ${body}: ${result.error}`);
    }
    const [longitude, latitude, distance, speed] = result.data;
    return {
      body,
      longitude,
      latitude,
      distance,
      speed,
      retrograde: speed < 0,
      sign: signOf(longitude),
      signDegree: degreeInSign(longitude),
    };
  }

  houses(
    jdUt: number,
    location: GeoLocation,
    system: HouseSystem,
    zodiac: ZodiacMode,
  ): HouseData {
    const flags = this.applyZodiac(0, zodiac);
    const result = sweph.houses_ex(
      jdUt,
      flags,
      location.latitude,
      location.longitude,
      HOUSE_CODES[system],
    );
    const { houses: cusps, points } = result.data;
    return {
      system,
      cusps: [...cusps],
      ascendant: points[0],
      midheaven: points[1],
      vertex: points[3],
    };
  }

  ayanamsa(jdUt: number, ayanamsa: Ayanamsa): number {
    sweph.set_sid_mode(SID_MODES[ayanamsa], 0, 0);
    const result = sweph.get_ayanamsa_ex_ut(jdUt, this.baseFlags());
    return result.data;
  }

  fixedStar(
    jdUt: number,
    star: string,
    zodiac: ZodiacMode,
  ): { name: string; longitude: number; latitude: number } {
    const flags = this.applyZodiac(this.baseFlags(), zodiac);
    const result = sweph.fixstar2_ut(star, jdUt, flags);
    if (result.error && result.flag < 0) {
      throw new Error(`fixstar2_ut failed for ${star}: ${result.error}`);
    }
    const [longitude, latitude] = result.data;
    return { name: result.name.split(",")[0]!, longitude, latitude };
  }
}
