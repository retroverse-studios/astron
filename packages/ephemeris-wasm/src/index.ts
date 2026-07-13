import SwissEph from "swisseph-wasm";
import {
  degreeInSign,
  julianDayUtc,
  norm360,
  signOf,
  type Ayanamsa,
  type Body,
  type BodyPosition,
  type CalendarSystem,
  type EphemerisProvider,
  type GeoLocation,
  type HouseData,
  type HouseSystem,
  type ZodiacMode,
} from "@astron/core";

const BODY_IDS: Record<Body, number> = {
  sun: 0,
  moon: 1,
  mercury: 2,
  venus: 3,
  mars: 4,
  jupiter: 5,
  saturn: 6,
  uranus: 7,
  neptune: 8,
  pluto: 9,
  meanNode: 10,
  trueNode: 11,
  meanLilith: 12,
  chiron: 15,
};

const SID_MODES: Record<Ayanamsa, number> = {
  faganBradley: 0,
  lahiri: 1,
  raman: 3,
  krishnamurti: 5,
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
 * EphemerisProvider backed by the Swiss Ephemeris compiled to WebAssembly
 * (swisseph-wasm) — same numbers as the native provider, but it runs in a
 * browser. Construction is async (WASM instantiation): use
 * `await WasmSwephProvider.create()`.
 */
export class WasmSwephProvider implements EphemerisProvider {
  private constructor(private swe: InstanceType<typeof SwissEph>) {}

  static async create(): Promise<WasmSwephProvider> {
    const swe = new SwissEph();
    await swe.initSwissEph();
    return new WasmSwephProvider(swe);
  }

  julianDayUt(utc: Date, calendar?: CalendarSystem): number {
    return julianDayUtc(utc, calendar);
  }

  private flags(zodiac: ZodiacMode): number {
    let f = this.swe.SEFLG_SWIEPH | this.swe.SEFLG_SPEED;
    if (zodiac.type === "sidereal") {
      this.swe.set_sid_mode(SID_MODES[zodiac.ayanamsa], 0, 0);
      f |= this.swe.SEFLG_SIDEREAL;
    }
    return f;
  }

  bodyPosition(jdUt: number, body: Body, zodiac: ZodiacMode): BodyPosition {
    const r = this.swe.calc_ut(jdUt, BODY_IDS[body], this.flags(zodiac));
    const [longitude, latitude, distance, speed] = r as unknown as number[];
    return {
      body,
      longitude: longitude!,
      latitude: latitude!,
      distance: distance!,
      speed: speed!,
      retrograde: speed! < 0,
      sign: signOf(longitude!),
      signDegree: degreeInSign(longitude!),
    };
  }

  houses(
    jdUt: number,
    location: GeoLocation,
    system: HouseSystem,
    zodiac: ZodiacMode,
  ): HouseData {
    const { cusps, ascmc } = this.swe.houses(
      jdUt,
      location.latitude,
      location.longitude,
      HOUSE_CODES[system],
    ) as unknown as { cusps: Float64Array; ascmc: Float64Array };

    // swe_houses returns tropical positions (cusps[1..12]); shift by the
    // ayanamsa for sidereal, recomputing whole-sign cusps from the sidereal
    // ascendant so they stay on sign boundaries.
    let cuspList = Array.from(cusps.slice(1, 13));
    let ascendant = ascmc[0]!;
    let midheaven = ascmc[1]!;
    let vertex = ascmc[3]!;

    if (zodiac.type === "sidereal") {
      const ay = this.ayanamsa(jdUt, zodiac.ayanamsa);
      ascendant = norm360(ascendant - ay);
      midheaven = norm360(midheaven - ay);
      vertex = norm360(vertex - ay);
      if (system === "wholeSign") {
        const first = Math.floor(ascendant / 30) * 30;
        cuspList = Array.from({ length: 12 }, (_, i) => norm360(first + i * 30));
      } else {
        cuspList = cuspList.map((c) => norm360(c - ay));
      }
    }

    return { system, cusps: cuspList, ascendant, midheaven, vertex };
  }

  ayanamsa(jdUt: number, ayanamsa: Ayanamsa): number {
    this.swe.set_sid_mode(SID_MODES[ayanamsa], 0, 0);
    // get_ayanamsa_ex_ut exists at runtime but is missing from the
    // package's type declarations.
    const swe = this.swe as unknown as {
      get_ayanamsa_ex_ut(jd: number, flag: number): number | { ayanamsa: number };
    };
    const r = swe.get_ayanamsa_ex_ut(jdUt, this.swe.SEFLG_SWIEPH);
    return typeof r === "number" ? r : r.ayanamsa;
  }
}
