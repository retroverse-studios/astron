import { describe, expect, it } from "vitest";
import { computeChart, type Chart } from "../src/index.js";
import { SwephProvider } from "../src/ephemeris/sweph-provider.js";

const provider = new SwephProvider();

describe("natal chart (tropical)", () => {
  // Albert Einstein: 14 March 1879, 11:30 LMT, Ulm, Germany (48°24′N, 10°00′E).
  // LMT offset +0:40 for 10°E → 10:50 UT. Documented chart (astro-databank):
  // Sun ~23° Pisces, Moon ~14° Sagittarius, Ascendant ~11° Cancer.
  const einstein: Chart = computeChart(
    {
      utc: new Date(Date.UTC(1879, 2, 14, 10, 50, 0)),
      location: { latitude: 48.4, longitude: 10.0, name: "Ulm" },
      houseSystem: "placidus",
    },
    provider,
  );

  const pos = (body: string) =>
    einstein.positions.find((p) => p.body === body)!;

  it("places the Sun in Pisces near 23°", () => {
    expect(pos("sun").sign).toBe("Pisces");
    expect(pos("sun").signDegree).toBeGreaterThan(22);
    expect(pos("sun").signDegree).toBeLessThan(24);
  });

  it("places the Moon in Sagittarius", () => {
    expect(pos("moon").sign).toBe("Sagittarius");
    expect(pos("moon").signDegree).toBeGreaterThan(13);
    expect(pos("moon").signDegree).toBeLessThan(16);
  });

  it("puts the Ascendant in Cancer near 11°", () => {
    const asc = einstein.houses!.ascendant;
    expect(Math.floor(asc / 30)).toBe(3); // Cancer = 4th sign
    expect(asc % 30).toBeGreaterThan(9);
    expect(asc % 30).toBeLessThan(13);
  });

  it("assigns every body a house between 1 and 12", () => {
    for (const p of einstein.positions) {
      expect(p.house).toBeGreaterThanOrEqual(1);
      expect(p.house).toBeLessThanOrEqual(12);
    }
  });

  it("first Placidus cusp equals the Ascendant", () => {
    expect(einstein.houses!.cusps[0]).toBeCloseTo(
      einstein.houses!.ascendant,
      6,
    );
  });
});

describe("calendar systems", () => {
  it("Julian 1582-10-05 and Gregorian 1582-10-15 are the same day (the reform gap)", () => {
    const julian = provider.julianDayUt(
      new Date(Date.UTC(1582, 9, 5, 12)),
      "julian",
    );
    const gregorian = provider.julianDayUt(
      new Date(Date.UTC(1582, 9, 15, 12)),
      "gregorian",
    );
    expect(julian).toBeCloseTo(gregorian, 9);
  });

  it("Newton born 25 Dec 1642 (Julian) = 4 Jan 1643 (Gregorian)", () => {
    const julian = provider.julianDayUt(new Date(Date.UTC(1642, 11, 25)), "julian");
    const gregorian = provider.julianDayUt(new Date(Date.UTC(1643, 0, 4)), "gregorian");
    expect(julian).toBeCloseTo(gregorian, 9);
  });

  it("computes a 17th-century chart with the extended ephemeris files", () => {
    const chart = computeChart(
      { utc: new Date(Date.UTC(1642, 11, 25, 2)), calendar: "julian" },
      provider,
    );
    expect(chart.warnings).toBeUndefined();
    const sun = chart.positions.find((p) => p.body === "sun")!;
    expect(sun.sign).toBe("Capricorn"); // late December
    expect(chart.positions.some((p) => p.body === "chiron")).toBe(true);
  });

  it("omits bodies outside their ephemeris range with a warning instead of throwing", () => {
    const chart = computeChart(
      { utc: new Date(Date.UTC(900, 5, 15, 12)) },
      provider,
    );
    expect(chart.positions.some((p) => p.body === "sun")).toBe(true);
    expect(chart.positions.some((p) => p.body === "chiron")).toBe(false);
    expect(chart.warnings?.some((w) => w.includes("chiron"))).toBe(true);
  });
});

describe("pure julianDayUtc matches the Swiss Ephemeris", () => {
  it("agrees for modern, historical, and Julian-calendar dates", async () => {
    const { julianDayUtc } = await import("../src/time.js");
    const dates: [Date, "gregorian" | "julian"][] = [
      [new Date(Date.UTC(2000, 0, 1, 12)), "gregorian"],
      [new Date(Date.UTC(2026, 6, 13, 4, 30, 15)), "gregorian"],
      [new Date(Date.UTC(1879, 2, 14, 10, 50)), "gregorian"],
      [new Date(Date.UTC(1642, 11, 25, 2)), "julian"],
      [new Date(Date.UTC(1582, 9, 5, 12)), "julian"],
    ];
    for (const [d, cal] of dates) {
      expect(julianDayUtc(d, cal)).toBeCloseTo(provider.julianDayUt(d, cal), 8);
    }
  });
});

describe("astronomical sanity", () => {
  it("Sun sits at 0° Aries at the March 2000 equinox (2000-03-20 07:35 UTC)", () => {
    const jd = provider.julianDayUt(new Date(Date.UTC(2000, 2, 20, 7, 35)));
    const sun = provider.bodyPosition(jd, "sun", { type: "tropical" });
    const distFromZero = Math.min(sun.longitude, 360 - sun.longitude);
    expect(distFromZero).toBeLessThan(0.05);
  });

  it("detects Mercury retrograde in late August 2023", () => {
    // Mercury stationed retrograde 23 Aug 2023 and direct 15 Sep 2023.
    const jd = provider.julianDayUt(new Date(Date.UTC(2023, 8, 1)));
    const mercury = provider.bodyPosition(jd, "mercury", {
      type: "tropical",
    });
    expect(mercury.retrograde).toBe(true);
    expect(mercury.speed).toBeLessThan(0);
  });
});

describe("sidereal zodiac", () => {
  it("Lahiri ayanamsa is ~23°51′ at J2000 and shifts longitudes by that amount", () => {
    const utc = new Date(Date.UTC(2000, 0, 1, 12));
    const jd = provider.julianDayUt(utc);
    const ayanamsa = provider.ayanamsa(jd, "lahiri");
    expect(ayanamsa).toBeGreaterThan(23.7);
    expect(ayanamsa).toBeLessThan(24.0);

    const tropical = provider.bodyPosition(jd, "sun", { type: "tropical" });
    const sidereal = provider.bodyPosition(jd, "sun", {
      type: "sidereal",
      ayanamsa: "lahiri",
    });
    const diff =
      (tropical.longitude - sidereal.longitude + 360) % 360;
    expect(diff).toBeCloseTo(ayanamsa, 1);
  });

  it("whole-sign house cusps land on sign boundaries", () => {
    const chart = computeChart(
      {
        utc: new Date(Date.UTC(1990, 5, 15, 4, 30)),
        location: { latitude: 28.61, longitude: 77.2, name: "Delhi" },
        zodiac: { type: "sidereal", ayanamsa: "lahiri" },
        houseSystem: "wholeSign",
      },
      provider,
    );
    for (const cusp of chart.houses!.cusps) {
      expect(cusp % 30).toBeCloseTo(0, 6);
    }
  });
});
