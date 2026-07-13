import { describe, expect, it } from "vitest";
import { norm360 } from "@astron/core";
import { angleForLongitude, polarPoint, spreadAngles } from "../src/layout.js";
import { renderWheel } from "../src/wheel.js";
import { computeChart } from "@astron/core";
import { SwephProvider } from "@astron/core/sweph";

describe("wheel geometry", () => {
  it("pins the ascendant to the left horizon", () => {
    const a = angleForLongitude(123.4, 123.4);
    const p = polarPoint(320, 320, 300, a);
    expect(p.x).toBeCloseTo(20); // 320 - 300
    expect(p.y).toBeCloseTo(320);
  });

  it("places the IC at the bottom and descendant at the right", () => {
    const ic = polarPoint(320, 320, 300, angleForLongitude(90, 0));
    expect(ic.y).toBeCloseTo(620);
    const dsc = polarPoint(320, 320, 300, angleForLongitude(180, 0));
    expect(dsc.x).toBeCloseTo(620);
  });

  it("spreads crowded glyphs to the minimum gap, preserving order", () => {
    const spread = spreadAngles([100, 101, 103], 8);
    const gaps = [
      norm360(spread[1]! - spread[0]!),
      norm360(spread[2]! - spread[1]!),
    ];
    for (const g of gaps) expect(g).toBeGreaterThanOrEqual(7.99);
    // stays near the original cluster
    for (const a of spread) {
      expect(Math.abs(norm360(a - 101.3 + 180) - 180)).toBeLessThan(15);
    }
  });

  it("leaves well-separated glyphs untouched", () => {
    expect(spreadAngles([0, 90, 180, 270], 8)).toEqual([0, 90, 180, 270]);
  });
});

describe("renderWheel", () => {
  const provider = new SwephProvider();
  const chart = computeChart(
    {
      utc: new Date(Date.UTC(1879, 2, 14, 10, 50)),
      location: { latitude: 48.4, longitude: 10.0 },
    },
    provider,
  );

  it("produces a self-contained SVG with all the parts", () => {
    const svg = renderWheel(chart);
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg.endsWith("</svg>")).toBe(true);
    for (const glyph of ["♈", "♓", "☉", "☽", "♄"]) {
      expect(svg).toContain(glyph);
    }
    expect(svg).toContain(">ASC<");
    expect(svg).toContain(">MC<");
    // 12 house numbers
    for (let h = 1; h <= 12; h++) expect(svg).toContain(`>${h}<`);
    // one aspect line per aspect
    expect(svg).toContain("℞"); // Uranus is retrograde in this chart
    expect(svg).not.toContain("undefined");
    expect(svg).not.toContain("NaN");
  });

  it("renders a houseless chart without angles", () => {
    const noHouses = computeChart(
      { utc: new Date(Date.UTC(2000, 0, 1, 12)) },
      provider,
    );
    const svg = renderWheel(noHouses);
    expect(svg).not.toContain(">ASC<");
    expect(svg).toContain("☉");
    expect(svg).not.toContain("NaN");
  });

  it("adds an outer ring and cross-aspect lines for bi-wheels", () => {
    const sky = computeChart({ utc: new Date(Date.UTC(2026, 6, 12, 12)) }, provider);
    const svg = renderWheel(chart, {
      outer: {
        positions: sky.positions,
        aspects: [
          { a: "saturn", b: "sun", name: "square", angle: 90, orb: 1, applying: true },
        ],
      },
    });
    // two suns now: natal + transiting
    expect(svg.split("☉").length - 1).toBe(2);
    expect(svg).not.toContain("NaN");
  });
});
