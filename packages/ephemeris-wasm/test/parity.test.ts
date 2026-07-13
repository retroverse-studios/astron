import { beforeAll, describe, expect, it } from "vitest";
import { computeChart, type EphemerisProvider } from "@astron/core";
import { SwephProvider } from "@astron/core/sweph";
import { WasmSwephProvider } from "../src/index.js";

/**
 * The WASM provider must agree with the native provider — same library,
 * different compilation target. Tolerances are loose enough to absorb the
 * WASM build falling back to Moshier where its bundled files differ.
 */
describe("WASM ↔ native parity", () => {
  let wasm: EphemerisProvider;
  const native = new SwephProvider();
  const utc = new Date(Date.UTC(1990, 5, 15, 4, 30));

  beforeAll(async () => {
    wasm = await WasmSwephProvider.create();
  });

  it("agrees on Julian day", () => {
    expect(wasm.julianDayUt(utc)).toBeCloseTo(native.julianDayUt(utc), 8);
  });

  it("agrees on tropical positions to well under an arcminute", () => {
    const jd = native.julianDayUt(utc);
    for (const body of ["sun", "moon", "mercury", "mars", "saturn", "trueNode"] as const) {
      const a = wasm.bodyPosition(jd, body, { type: "tropical" });
      const b = native.bodyPosition(jd, body, { type: "tropical" });
      expect(Math.abs(a.longitude - b.longitude)).toBeLessThan(0.01);
      expect(a.retrograde).toBe(b.retrograde);
    }
  });

  it("agrees on the Lahiri ayanamsa to under an arcsecond", () => {
    const jd = native.julianDayUt(utc);
    const diff = Math.abs(wasm.ayanamsa(jd, "lahiri") - native.ayanamsa(jd, "lahiri"));
    expect(diff).toBeLessThan(1 / 3600);
  });

  it("agrees on Placidus houses, tropical and sidereal", () => {
    const jd = native.julianDayUt(utc);
    const loc = { latitude: 28.61, longitude: 77.2 };
    for (const zodiac of [
      { type: "tropical" } as const,
      { type: "sidereal", ayanamsa: "lahiri" } as const,
    ]) {
      const a = wasm.houses(jd, loc, "placidus", zodiac);
      const b = native.houses(jd, loc, "placidus", zodiac);
      expect(Math.abs(a.ascendant - b.ascendant)).toBeLessThan(0.01);
      for (let i = 0; i < 12; i++) {
        expect(Math.abs(a.cusps[i]! - b.cusps[i]!)).toBeLessThan(0.01);
      }
    }
  });

  it("puts sidereal whole-sign cusps on sign boundaries", () => {
    const jd = native.julianDayUt(utc);
    const houses = wasm.houses(jd, { latitude: 28.61, longitude: 77.2 }, "wholeSign", {
      type: "sidereal",
      ayanamsa: "lahiri",
    });
    for (const c of houses.cusps) expect(c % 30).toBeCloseTo(0, 6);
    const native0 = native.houses(jd, { latitude: 28.61, longitude: 77.2 }, "wholeSign", {
      type: "sidereal",
      ayanamsa: "lahiri",
    });
    expect(houses.cusps[0]).toBeCloseTo(native0.cusps[0]!, 4);
  });

  it("computes a full chart through computeChart", async () => {
    const chart = computeChart(
      {
        utc,
        location: { latitude: 28.61, longitude: 77.2 },
        zodiac: { type: "sidereal", ayanamsa: "lahiri" },
        houseSystem: "wholeSign",
      },
      wasm,
    );
    expect(chart.positions.length).toBeGreaterThan(9);
    expect(chart.houses).toBeDefined();
  });
});
