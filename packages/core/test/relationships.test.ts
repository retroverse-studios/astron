import { describe, expect, it } from "vitest";
import {
  circularMidpoint,
  compositeChart,
  computeChart,
  davisonChart,
  geographicMidpoint,
  norm180,
  synastry,
} from "../src/index.js";
import { SwephProvider } from "../src/ephemeris/sweph-provider.js";

const provider = new SwephProvider();

const chartA = computeChart(
  {
    utc: new Date(Date.UTC(1990, 5, 15, 4, 30)),
    location: { latitude: 28.61, longitude: 77.2 },
  },
  provider,
);
const chartB = computeChart(
  {
    utc: new Date(Date.UTC(1988, 10, 2, 20, 0)),
    location: { latitude: -31.95, longitude: 115.86 },
  },
  provider,
);

describe("circular midpoint", () => {
  it("takes the shorter arc, including across 0° Aries", () => {
    expect(circularMidpoint(10, 50)).toBeCloseTo(30);
    expect(circularMidpoint(350, 10)).toBeCloseTo(0);
    expect(circularMidpoint(10, 350)).toBeCloseTo(0);
    expect(circularMidpoint(0, 180)).toBeCloseTo(90); // exact opposition: deterministic
  });
});

describe("synastry", () => {
  it("finds inter-aspects and house overlays both ways", () => {
    const result = synastry(chartA, chartB);
    expect(result.aspects.length).toBeGreaterThan(5);
    for (const a of result.aspects) {
      expect(a.applying).toBe(false); // meaningless between two birth charts
      expect(a.orb).toBeLessThanOrEqual(8);
    }
    expect(result.aInBHouses).toHaveLength(chartA.positions.length);
    expect(result.bInAHouses).toHaveLength(chartB.positions.length);
    for (const o of [...result.aInBHouses!, ...result.bInAHouses!]) {
      expect(o.house).toBeGreaterThanOrEqual(1);
      expect(o.house).toBeLessThanOrEqual(12);
    }
  });

  it("refuses mixed zodiacs", () => {
    const sidereal = computeChart(
      { utc: chartB.utc, zodiac: { type: "sidereal", ayanamsa: "lahiri" } },
      provider,
    );
    expect(() => synastry(chartA, sidereal)).toThrow(/same zodiac/);
  });
});

describe("composite", () => {
  it("puts every composite point on the pair midpoint", () => {
    const comp = compositeChart(chartA, chartB);
    for (const p of comp.positions) {
      const a = chartA.positions.find((x) => x.body === p.body)!;
      const b = chartB.positions.find((x) => x.body === p.body)!;
      expect(p.longitude).toBeCloseTo(circularMidpoint(a.longitude, b.longitude), 9);
      expect(p.speed).toBe(0);
    }
  });

  it("composite of a chart with itself is the chart", () => {
    const self = compositeChart(chartA, chartA);
    for (const p of self.positions) {
      const orig = chartA.positions.find((x) => x.body === p.body)!;
      expect(Math.abs(norm180(p.longitude - orig.longitude))).toBeLessThan(1e-9);
    }
  });

  it("builds whole-sign houses from the midpoint ascendant", () => {
    const comp = compositeChart(chartA, chartB);
    expect(comp.houses!.system).toBe("wholeSign");
    expect(comp.houses!.ascendant).toBeCloseTo(
      circularMidpoint(chartA.houses!.ascendant, chartB.houses!.ascendant),
      9,
    );
    for (const c of comp.houses!.cusps) expect(c % 30).toBeCloseTo(0, 9);
  });
});

describe("davison", () => {
  it("casts a real chart at the time and space midpoints", () => {
    const dav = davisonChart(provider, chartA, chartB);
    const midMs = (chartA.utc.getTime() + chartB.utc.getTime()) / 2;
    expect(Math.abs(dav.utc.getTime() - midMs)).toBeLessThan(1000);
    expect(dav.location).toBeDefined();
    expect(dav.houses).toBeDefined();
    // a real sky: speeds exist again
    expect(dav.positions.some((p) => p.speed !== 0)).toBe(true);
  });

  it("davison of twins is their natal chart", () => {
    const dav = davisonChart(provider, chartA, chartA);
    for (const p of dav.positions) {
      const orig = chartA.positions.find((x) => x.body === p.body)!;
      expect(Math.abs(norm180(p.longitude - orig.longitude))).toBeLessThan(1e-6);
    }
  });

  it("geographic midpoint follows the great circle", () => {
    const mid = geographicMidpoint(
      { latitude: 0, longitude: 0 },
      { latitude: 0, longitude: 90 },
    );
    expect(mid.latitude).toBeCloseTo(0);
    expect(mid.longitude).toBeCloseTo(45);
    // Delhi ↔ Perth midpoint sits in the Indian Ocean, between the two
    const io = geographicMidpoint(
      { latitude: 28.61, longitude: 77.2 },
      { latitude: -31.95, longitude: 115.86 },
    );
    expect(io.latitude).toBeGreaterThan(-31.95);
    expect(io.latitude).toBeLessThan(28.61);
    expect(io.longitude).toBeGreaterThan(77.2);
    expect(io.longitude).toBeLessThan(115.86);
  });
});
