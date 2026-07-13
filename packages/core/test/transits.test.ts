import { describe, expect, it } from "vitest";
import { findCrossAspects } from "../src/aspects.js";
import { computeChart } from "../src/index.js";
import { SwephProvider } from "../src/ephemeris/sweph-provider.js";
import type { BodyPosition } from "../src/types.js";
import { degreeInSign, signOf } from "../src/zodiac.js";

function at(body: BodyPosition["body"], longitude: number, speed = 1): BodyPosition {
  return {
    body,
    longitude,
    latitude: 0,
    distance: 1,
    speed,
    retrograde: speed < 0,
    sign: signOf(longitude),
    signDegree: degreeInSign(longitude),
  };
}

describe("cross-aspects (transits)", () => {
  it("finds transiting aspects to natal points with tight orbs", () => {
    const natal = [at("sun", 10, 0), at("moon", 200, 0)];
    const transiting = [at("saturn", 101.5, 0.1)];
    const hits = findCrossAspects(transiting, natal);
    // Saturn 101.5° squares natal Sun 10° (orb 1.5°); 98.5° from natal Moon — nothing.
    expect(hits).toHaveLength(1);
    expect(hits[0]).toMatchObject({ a: "saturn", b: "sun", name: "square" });
    expect(hits[0]!.orb).toBeCloseTo(1.5);
  });

  it("judges applying from the transiting body's motion only", () => {
    const natal = [at("sun", 10, 0)];
    const direct = findCrossAspects([at("mars", 128.2, 0.6)], natal);
    expect(direct[0]!.name).toBe("trine");
    expect(direct[0]!.applying).toBe(true); // moving 128.2 → 130

    const retro = findCrossAspects([at("mars", 128.2, -0.3)], natal);
    expect(retro[0]!.applying).toBe(false); // backing away from 130
  });

  it("computes a real transit hit: Saturn conjunct natal Saturn at the 29y return", () => {
    const provider = new SwephProvider();
    // Natal Saturn for 1 Jan 1990; Saturn returned to that degree in early 2019.
    const natal = computeChart(
      { utc: new Date(Date.UTC(1990, 0, 1, 12)) },
      provider,
    );
    const natalSaturn = natal.positions.filter((p) => p.body === "saturn");
    const hits = [0, 1, 2, 3, 4, 5].flatMap((month) => {
      const sky = computeChart(
        { utc: new Date(Date.UTC(2019, month, 1, 12)) },
        provider,
      );
      return findCrossAspects(
        sky.positions.filter((p) => p.body === "saturn"),
        natalSaturn,
      );
    });
    const conjunctions = hits.filter((h) => h.name === "conjunction");
    expect(conjunctions.length).toBeGreaterThan(0);
    expect(Math.min(...conjunctions.map((c) => c.orb))).toBeLessThan(1.5);
  });
});
