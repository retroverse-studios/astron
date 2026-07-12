import { describe, expect, it } from "vitest";
import { findAspects } from "../src/aspects.js";
import { vargaSign } from "../src/vargas.js";
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

describe("aspect detection", () => {
  it("finds an exact trine", () => {
    const aspects = findAspects([at("sun", 10), at("moon", 130)]);
    expect(aspects).toHaveLength(1);
    expect(aspects[0]!.name).toBe("trine");
    expect(aspects[0]!.orb).toBeCloseTo(0);
  });

  it("finds a square across the 0° Aries boundary", () => {
    const aspects = findAspects([at("sun", 355), at("moon", 85)]);
    expect(aspects[0]!.name).toBe("square");
  });

  it("respects orbs", () => {
    // 70° apart: 10° from sextile (orb 4), 20° from square (orb 7) — nothing.
    expect(findAspects([at("sun", 0), at("moon", 70)])).toHaveLength(0);
  });

  it("marks a faster body closing on exactness as applying", () => {
    // Moon at 57° moving 13°/day toward Sun's sextile point at 60°.
    const aspects = findAspects([at("moon", 57, 13), at("sun", 0, 1)]);
    expect(aspects[0]!.name).toBe("sextile");
    expect(aspects[0]!.applying).toBe(true);

    // Moon past exactness and pulling away: separating.
    const separating = findAspects([at("moon", 63, 13), at("sun", 0, 1)]);
    expect(separating[0]!.applying).toBe(false);
  });
});

describe("varga (divisional) charts", () => {
  it("computes navamsa (D9) per Parashari divisions", () => {
    expect(vargaSign(0.5, "d9")).toBe("Aries"); // 0°30′ Aries, 1st navamsa
    expect(vargaSign(10, "d9")).toBe("Cancer"); // 10° Aries → 4th navamsa
    expect(vargaSign(45, "d9")).toBe("Taurus"); // 15° Taurus (fixed, from 9th)
    expect(vargaSign(359, "d9")).toBe("Pisces"); // 29° Pisces = vargottama
  });

  it("computes dashamsa (D10)", () => {
    expect(vargaSign(0, "d10")).toBe("Aries");
    expect(vargaSign(29, "d10")).toBe("Capricorn"); // 29° Aries, 10th division
    expect(vargaSign(30, "d10")).toBe("Capricorn"); // 0° Taurus, even sign starts at 9th
  });
});
