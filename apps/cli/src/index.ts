#!/usr/bin/env node
import {
  computeChart,
  dignities,
  findCrossAspects,
  formatLongitude,
  houseOf,
  isDayChart,
  MAJOR_ASPECTS,
  MINOR_ASPECTS,
  partOfFortune,
  SwephProvider,
  vargaSign,
  type Aspect,
  type Ayanamsa,
  type Body,
  type Chart,
  type ChartInput,
  type HouseSystem,
  type RulershipScheme,
  type Varga,
} from "@astron/core";
import { Command } from "commander";
import { DateTime } from "luxon";

const BODY_GLYPHS: Record<Body, string> = {
  sun: "☉",
  moon: "☽",
  mercury: "☿",
  venus: "♀",
  mars: "♂",
  jupiter: "♃",
  saturn: "♄",
  uranus: "♅",
  neptune: "♆",
  pluto: "♇",
  trueNode: "☊",
  meanNode: "☊",
  chiron: "⚷",
  meanLilith: "⚸",
};

const BODY_NAMES: Record<Body, string> = {
  sun: "Sun",
  moon: "Moon",
  mercury: "Mercury",
  venus: "Venus",
  mars: "Mars",
  jupiter: "Jupiter",
  saturn: "Saturn",
  uranus: "Uranus",
  neptune: "Neptune",
  pluto: "Pluto",
  trueNode: "North Node",
  meanNode: "North Node (mean)",
  chiron: "Chiron",
  meanLilith: "Lilith (mean)",
};

interface CommonOpts {
  time?: string;
  zone: string;
  lat?: string;
  lon?: string;
  place?: string;
  houses: string;
  sidereal?: string | boolean;
  varga?: string;
  minorAspects?: boolean;
  json?: boolean;
}

function resolveUtc(
  dateStr: string,
  timeStr: string | undefined,
  zone: string,
): { utc: Date; local: DateTime } {
  const local = DateTime.fromISO(`${dateStr}T${timeStr ?? "12:00"}`, { zone });
  if (!local.isValid) {
    console.error(`Invalid date/time/zone: ${local.invalidExplanation}`);
    process.exit(1);
  }
  return { utc: local.toUTC().toJSDate(), local };
}

function buildInput(utc: Date, noTime: boolean, opts: CommonOpts): ChartInput {
  const hasPlace = opts.lat !== undefined && opts.lon !== undefined;
  if (!opts.json) {
    if (!hasPlace) {
      console.log("(no --lat/--lon given: computing a planets-only chart, no houses)\n");
    } else if (noTime) {
      console.log("(no --time given: using noon, houses omitted — treat Moon degree as ±6°)\n");
    }
  }
  const sidereal = opts.sidereal;
  return {
    utc,
    location:
      hasPlace && !noTime
        ? {
            latitude: parseFloat(opts.lat!),
            longitude: parseFloat(opts.lon!),
            name: opts.place,
          }
        : undefined,
    zodiac: sidereal
      ? {
          type: "sidereal",
          ayanamsa: (typeof sidereal === "string" ? sidereal : "lahiri") as Ayanamsa,
        }
      : { type: "tropical" },
    houseSystem: opts.houses as HouseSystem,
    aspectDefs: opts.minorAspects
      ? [...MAJOR_ASPECTS, ...MINOR_ASPECTS]
      : undefined,
  };
}

/** Vedic charts read dignities with traditional rulers; Western with modern. */
function schemeFor(chart: Chart): RulershipScheme {
  return chart.zodiac.type === "sidereal" ? "traditional" : "modern";
}

function chartToJson(chart: Chart, opts: CommonOpts): object {
  const scheme = schemeFor(chart);
  return {
    ...chart,
    positions: chart.positions.map((p) => ({
      ...p,
      formatted: formatLongitude(p.longitude),
      dignities: dignities(p.body, p.sign, scheme),
      ...(opts.varga
        ? { [opts.varga.toLowerCase()]: vargaSign(p.longitude, opts.varga.toLowerCase() as Varga) }
        : {}),
    })),
    partOfFortune: partOfFortune(chart),
    sect: chart.houses
      ? isDayChart(
          chart.positions.find((p) => p.body === "sun")!.longitude,
          chart.houses.ascendant,
        )
        ? "day"
        : "night"
      : undefined,
    rulershipScheme: scheme,
  };
}

function printHeader(chart: Chart, local: DateTime): void {
  const zodiacLabel =
    chart.zodiac.type === "tropical"
      ? "Tropical"
      : `Sidereal (${chart.zodiac.ayanamsa}, ayanamsa ${chart.ayanamsaValue?.toFixed(2)}°)`;
  console.log("═".repeat(64));
  console.log(`  ${local.toFormat("d LLLL yyyy, HH:mm")} ${local.zoneName}  (${chart.utc.toISOString().slice(0, 16)}Z)`);
  if (chart.location) {
    const { latitude, longitude, name } = chart.location;
    console.log(`  ${name ?? "location"}: ${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`);
  }
  console.log(`  Zodiac: ${zodiacLabel}${chart.houses ? `   Houses: ${chart.houses.system}` : ""}`);
  console.log("═".repeat(64));
}

function printPositions(chart: Chart): void {
  const scheme = schemeFor(chart);
  console.log("\n  PLANETS");
  for (const p of chart.positions) {
    const name = BODY_NAMES[p.body].padEnd(18);
    const pos = formatLongitude(p.longitude).padEnd(19);
    const house = (p.house ? `house ${String(p.house).padStart(2)}` : "").padEnd(10);
    const rx = p.retrograde ? "℞ " : "  ";
    const dig = dignities(p.body, p.sign, scheme).join(", ");
    console.log(`  ${BODY_GLYPHS[p.body]}  ${name}${pos}${house}${rx}${dig}`);
  }
}

function printAnglesAndLots(chart: Chart): void {
  if (!chart.houses) return;
  console.log("\n  ANGLES & HOUSES");
  console.log(`  ASC ${formatLongitude(chart.houses.ascendant).padEnd(20)}MC ${formatLongitude(chart.houses.midheaven)}`);
  const pof = partOfFortune(chart);
  if (pof !== undefined) {
    const sun = chart.positions.find((p) => p.body === "sun")!;
    const sect = isDayChart(sun.longitude, chart.houses.ascendant) ? "day" : "night";
    console.log(`  ⊗   Part of Fortune ${formatLongitude(pof)}  (${sect} chart)`);
  }
  const cuspCols = chart.houses.cusps
    .map((c, i) => `${String(i + 1).padStart(2)}: ${formatLongitude(c)}`)
    .map((s) => s.padEnd(24));
  for (let i = 0; i < 12; i += 2) {
    console.log(`  ${cuspCols[i]}${cuspCols[i + 1] ?? ""}`);
  }
}

function printAspects(aspects: Aspect[], title = "ASPECTS"): void {
  if (!aspects.length) return;
  console.log(`\n  ${title}`);
  for (const a of aspects) {
    const label = `${BODY_NAMES[a.a]} ${a.name} ${BODY_NAMES[a.b]}`.padEnd(36);
    console.log(`  ${BODY_GLYPHS[a.a]}–${BODY_GLYPHS[a.b]}  ${label}orb ${a.orb.toFixed(1)}°  ${a.applying ? "applying" : "separating"}`);
  }
}

function printVarga(chart: Chart, vargaOpt: string): void {
  const varga = vargaOpt.toLowerCase() as Varga;
  console.log(`\n  VARGA ${varga.toUpperCase()}`);
  for (const p of chart.positions) {
    console.log(`  ${BODY_GLYPHS[p.body]}  ${BODY_NAMES[p.body].padEnd(18)}${vargaSign(p.longitude, varga)}`);
  }
}

function printChart(chart: Chart, local: DateTime, opts: CommonOpts): void {
  printHeader(chart, local);
  printPositions(chart);
  printAnglesAndLots(chart);
  printAspects(chart.aspects);
  if (opts.varga) printVarga(chart, opts.varga);
  console.log();
}

function addCommonOptions(cmd: Command): Command {
  return cmd
    .option("-t, --time <HH:MM>", "local clock time of birth/event")
    .option("-z, --zone <iana>", "IANA time zone, e.g. Australia/Perth", "UTC")
    .option("--lat <deg>", "latitude, degrees north-positive")
    .option("--lon <deg>", "longitude, degrees east-positive")
    .option("--place <name>", "place label for display")
    .option("--houses <system>", "placidus|wholeSign|equal|koch|campanus|regiomontanus|porphyry", "placidus")
    .option("--sidereal [ayanamsa]", "sidereal zodiac: lahiri (default), raman, krishnamurti, faganBradley")
    .option("--varga <dN>", "also show a divisional chart: d1, d9, d10")
    .option("--minor-aspects", "include minor aspects")
    .option("--json", "machine-readable JSON output");
}

const program = new Command()
  .name("astron")
  .description("ASTRON — astrology charts from the command line")
  .version("0.1.0");

addCommonOptions(
  program
    .command("natal")
    .description("cast a natal (or any event) chart")
    .requiredOption("-d, --date <YYYY-MM-DD>", "local date of birth/event"),
).action((opts: CommonOpts & { date: string }) => {
  const noTime = !opts.time;
  const { utc, local } = resolveUtc(opts.date, opts.time, opts.zone);
  const chart = computeChart(buildInput(utc, noTime, opts), new SwephProvider());
  if (opts.json) {
    console.log(JSON.stringify(chartToJson(chart, opts), null, 2));
  } else {
    printChart(chart, local, opts);
  }
});

addCommonOptions(
  program
    .command("now")
    .description("chart of this exact moment (transits / horary)"),
).action((opts: CommonOpts) => {
  const nowLocal = DateTime.now().setZone(opts.zone);
  const chart = computeChart(
    buildInput(nowLocal.toUTC().toJSDate(), false, opts),
    new SwephProvider(),
  );
  if (opts.json) {
    console.log(JSON.stringify(chartToJson(chart, opts), null, 2));
  } else {
    printChart(chart, nowLocal, opts);
  }
});

addCommonOptions(
  program
    .command("transits")
    .description("current (or chosen) sky against a natal chart")
    .requiredOption("-d, --date <YYYY-MM-DD>", "natal date")
    .option("--on <YYYY-MM-DD>", "transit date (default: today)")
    .option("--at <HH:MM>", "transit time (default: now / noon with --on)"),
).action((opts: CommonOpts & { date: string; on?: string; at?: string }) => {
  const provider = new SwephProvider();
  const noTime = !opts.time;
  const { utc: natalUtc, local: natalLocal } = resolveUtc(opts.date, opts.time, opts.zone);
  const natal = computeChart(buildInput(natalUtc, noTime, opts), provider);

  const transitLocal = opts.on
    ? resolveUtc(opts.on, opts.at, opts.zone).local
    : opts.at
      ? resolveUtc(DateTime.now().setZone(opts.zone).toISODate()!, opts.at, opts.zone).local
      : DateTime.now().setZone(opts.zone);
  const sky = computeChart(
    { utc: transitLocal.toUTC().toJSDate(), zodiac: natal.zodiac },
    provider,
  );
  // Transiting planets are read through the natal houses.
  if (natal.houses) {
    for (const p of sky.positions) p.house = houseOf(p.longitude, natal.houses);
  }
  const hits = findCrossAspects(sky.positions, natal.positions);

  if (opts.json) {
    console.log(
      JSON.stringify(
        {
          natal: chartToJson(natal, opts),
          transiting: sky.positions.map((p) => ({ ...p, formatted: formatLongitude(p.longitude) })),
          transitUtc: sky.utc,
          aspects: hits,
        },
        null,
        2,
      ),
    );
    return;
  }

  printHeader(natal, natalLocal);
  console.log(`\n  TRANSITS for ${transitLocal.toFormat("d LLLL yyyy, HH:mm")} ${transitLocal.zoneName}`);
  for (const p of sky.positions) {
    const name = BODY_NAMES[p.body].padEnd(18);
    const pos = formatLongitude(p.longitude).padEnd(19);
    const house = p.house ? `natal house ${String(p.house).padStart(2)}` : "";
    const rx = p.retrograde ? "  ℞" : "";
    console.log(`  ${BODY_GLYPHS[p.body]}  ${name}${pos}${house}${rx}`);
  }
  printAspects(hits, "TRANSITING → NATAL (orb ≤ 3°)");
  console.log();
});

program.parse();
