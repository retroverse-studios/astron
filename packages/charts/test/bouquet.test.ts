import { describe, expect, it } from "vitest";
import { synastryBouquet, type Aspect } from "@astron/core";
import { renderBouquet } from "../src/bouquet.js";

const aspect = (a: Aspect["a"], name: Aspect["name"], b: Aspect["b"], orb = 1): Aspect => ({
  a,
  b,
  name,
  angle: 0,
  orb,
  applying: false,
});

describe("synastryBouquet", () => {
  it("classifies aspects into blooms, thorns and buds", () => {
    const profile = synastryBouquet([
      aspect("sun", "trine", "moon"),
      aspect("venus", "sextile", "mars"),
      aspect("saturn", "square", "moon"),
      aspect("sun", "conjunction", "venus"),
    ]);
    expect(profile.blooms).toBe(2);
    expect(profile.thorns).toBe(1);
    expect(profile.buds).toBe(1);
    expect(profile.disclaimer).toMatch(/does not measure two people/);
  });

  it("weights luminaries and tight orbs above outers and wide orbs", () => {
    const profile = synastryBouquet([
      aspect("sun", "trine", "moon", 0.2),
      aspect("pluto", "trine", "neptune", 7),
    ]);
    const [heavy, light] = profile.items;
    expect(heavy!.aspect.a).toBe("sun");
    expect(heavy!.weight).toBeGreaterThan(light!.weight * 2);
    for (const i of profile.items) {
      expect(i.weight).toBeGreaterThan(0);
      expect(i.weight).toBeLessThanOrEqual(1);
    }
  });
});

describe("renderBouquet", () => {
  it("draws one titled group per aspect and an honest caption", () => {
    const profile = synastryBouquet([
      aspect("sun", "trine", "moon"),
      aspect("venus", "sextile", "mars"),
      aspect("saturn", "square", "moon"),
      aspect("mercury", "opposition", "mars"),
      aspect("sun", "conjunction", "venus"),
    ]);
    const svg = renderBouquet(profile);
    expect(svg.split("<title>").length - 1).toBe(5);
    expect(svg).toContain("2 blooms · 2 thorns · 1 bud");
    expect(svg).not.toContain("NaN");
    expect(svg).not.toContain("undefined");
  });

  it("renders deterministically", () => {
    const profile = synastryBouquet([aspect("sun", "trine", "moon")]);
    expect(renderBouquet(profile)).toBe(renderBouquet(profile));
  });

  it("handles the empty vase", () => {
    const svg = renderBouquet(synastryBouquet([]));
    expect(svg).toContain("empty vase");
  });
});
