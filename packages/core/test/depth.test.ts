import { describe, expect, it } from "vitest";
import {
  antardashas,
  computeChart,
  dashaAt,
  harmonicChart,
  harmonicPositions,
  julianDayUtc,
  partOfFortune,
  partOfSpirit,
  vargaSign,
  vimshottariDashas,
  norm360,
  signOf,
  isDayChart,
} from "../src/index.js";
import { SwephProvider } from "../src/ephemeris/sweph-provider.js";

const provider = new SwephProvider();

describe("harmonics", () => {
  it("multiplies longitudes mod 360", () => {
    const chart = computeChart({ utc: new Date(Date.UTC(1990, 5, 15, 4, 30)) }, provider);
    const h5 = harmonicChart(chart, 5);
    for (const p of h5.positions) {
      const natal = chart.positions.find((x) => x.body === p.body)!;
      expect(p.longitude).toBeCloseTo(norm360(natal.longitude * 5), 9);
    }
    expect(h5.houses).toBeUndefined();
  });

  it("9th harmonic sign equals the navamsa sign (the classical identity)", () => {
    for (const lon of [0.5, 10, 45, 123.45, 222.2, 359, 300.01]) {
      expect(signOf(norm360(lon * 9))).toBe(vargaSign(lon, "d9"));
    }
  });

  it("rejects nonsense harmonics", () => {
    expect(() => harmonicPositions([], 0)).toThrow();
    expect(() => harmonicPositions([], 2.5)).toThrow();
  });
});

describe("extended vargas", () => {
  it("hora (D2) lands only in Leo or Cancer, by sign parity", () => {
    expect(vargaSign(10, "d2")).toBe("Leo"); // 10° Aries, odd sign first half
    expect(vargaSign(20, "d2")).toBe("Cancer"); // 20° Aries, second half
    expect(vargaSign(40, "d2")).toBe("Cancer"); // 10° Taurus, even sign first half
    expect(vargaSign(50, "d2")).toBe("Leo"); // 20° Taurus
  });

  it("drekkana (D3) steps by trines", () => {
    expect(vargaSign(5, "d3")).toBe("Aries");
    expect(vargaSign(15, "d3")).toBe("Leo");
    expect(vargaSign(25, "d3")).toBe("Sagittarius");
  });

  it("dvadasamsa (D12) counts twelfths from the sign itself", () => {
    expect(vargaSign(0, "d12")).toBe("Aries");
    expect(vargaSign(2.6, "d12")).toBe("Taurus");
    expect(vargaSign(29.9, "d12")).toBe("Pisces");
    expect(vargaSign(31, "d12")).toBe("Taurus"); // 1° Taurus, first twelfth
  });

  it("trimsamsa (D30) follows the unequal Parashari spans", () => {
    expect(vargaSign(3, "d30")).toBe("Aries"); // odd sign, Mars span
    expect(vargaSign(7, "d30")).toBe("Aquarius"); // Saturn span
    expect(vargaSign(29, "d30")).toBe("Libra"); // Venus span
    expect(vargaSign(33, "d30")).toBe("Taurus"); // 3° Taurus, even: Venus first
    expect(vargaSign(57, "d30")).toBe("Scorpio"); // 27° Taurus, Mars last
  });

  it("shashtiamsa (D60) uses half-degree steps", () => {
    expect(vargaSign(0.25, "d60")).toBe("Aries");
    expect(vargaSign(0.75, "d60")).toBe("Taurus");
    expect(vargaSign(29.75, "d60")).toBe("Pisces"); // 59th step from Aries
  });
});

describe("vimshottari dashas", () => {
  const birth = new Date(Date.UTC(1990, 5, 15, 4, 30));

  it("a Moon at 0° Aries starts a full Ketu period", () => {
    const periods = vimshottariDashas(0, birth);
    expect(periods[0]!.lord).toBe("ketu");
    const years =
      (julianDayUtc(periods[0]!.end) - julianDayUtc(periods[0]!.start)) / 365.25;
    expect(years).toBeCloseTo(7, 5);
  });

  it("a full cycle spans 120 years and follows the sequence", () => {
    const periods = vimshottariDashas(0, birth);
    expect(periods.map((p) => p.lord)).toEqual([
      "ketu", "venus", "sun", "moon", "mars", "rahu", "jupiter", "saturn", "mercury",
    ]);
    const total =
      (julianDayUtc(periods[8]!.end) - julianDayUtc(periods[0]!.start)) / 365.25;
    expect(total).toBeCloseTo(120, 5);
  });

  it("a Moon mid-nakshatra halves the first period", () => {
    // mid of the 2nd nakshatra (Bharani, lord Venus): 13°20′ + 6°40′ = 20°
    const periods = vimshottariDashas(20, birth);
    expect(periods[0]!.lord).toBe("venus");
    const years =
      (julianDayUtc(periods[0]!.end) - julianDayUtc(periods[0]!.start)) / 365.25;
    expect(years).toBeCloseTo(10, 5);
  });

  it("antardashas partition their mahadasha exactly, starting from its lord", () => {
    const maha = vimshottariDashas(0, birth)[1]!; // full Venus period
    const subs = antardashas(maha);
    expect(subs[0]!.lord).toBe("venus");
    expect(subs).toHaveLength(9);
    expect(subs[0]!.start.getTime()).toBe(maha.start.getTime());
    expect(Math.abs(subs[8]!.end.getTime() - maha.end.getTime())).toBeLessThan(5);
    // Venus antardasha of Venus mahadasha = 20*20/120 years
    const years = (julianDayUtc(subs[0]!.end) - julianDayUtc(subs[0]!.start)) / 365.25;
    expect(years).toBeCloseTo((20 * 20) / 120, 5);
  });

  it("dashaAt finds the running period", () => {
    const periods = vimshottariDashas(0, birth, 1);
    const tenYearsIn = new Date(birth.getTime() + 10 * 365.25 * 86400000);
    expect(dashaAt(periods, tenYearsIn)!.lord).toBe("venus");
  });
});

describe("part of spirit", () => {
  it("mirrors fortune around the ascendant by sect", () => {
    const chart = computeChart(
      {
        utc: new Date(Date.UTC(1879, 2, 14, 10, 50)),
        location: { latitude: 48.4, longitude: 10.0 },
      },
      provider,
    );
    const fortune = partOfFortune(chart)!;
    const spirit = partOfSpirit(chart)!;
    const asc = chart.houses!.ascendant;
    const sun = chart.positions.find((p) => p.body === "sun")!;
    expect(isDayChart(sun.longitude, asc)).toBe(true);
    // day chart: fortune = asc+moon-sun, spirit = asc+sun-moon → they mirror
    expect(norm360(fortune + spirit)).toBeCloseTo(norm360(2 * asc), 6);
  });
});
