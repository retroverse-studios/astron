#!/usr/bin/env node
import {
  formatCity,
  formatOffset,
  lmtOffsetMinutes,
  localToUtc,
  type Atlas,
} from "@astron/atlas";
import { loadAtlas } from "@astron/atlas/node";
import {
  computeChart,
  dignities,
  findCrossAspects,
  formatLongitude,
  houseOf,
  isDayChart,
  lunarReturn,
  MAJOR_ASPECTS,
  MINOR_ASPECTS,
  partOfFortune,
  scanIngresses,
  scanLunations,
  scanStations,
  scanTransits,
  scanVoidOfCourse,
  secondaryProgression,
  solarArcDirections,
  solarReturn,
  vargaSign,
  type Aspect,
  type Ayanamsa,
  type Body,
  type CalendarSystem,
  type Chart,
  type ChartInput,
  type GeoLocation,
  type HouseSystem,
  type RulershipScheme,
  type TransitHit,
  type Varga,
} from "@astron/core";
import { SwephProvider } from "@astron/core/sweph";
import { LIGHT_THEME, renderWheel } from "@astron/charts";
import { Command } from "commander";
import { DateTime } from "luxon";
import { writeFileSync } from "node:fs";

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
  zone?: string;
  lat?: string;
  lon?: string;
  place?: string;
  houses: string;
  sidereal?: string | boolean;
  varga?: string;
  minorAspects?: boolean;
  json?: boolean;
  timeStandard?: "auto" | "iana" | "lmt";
  julian?: boolean;
  svg?: string;
  light?: boolean;
}

function maybeWriteSvg(opts: CommonOpts, render: () => string): void {
  if (!opts.svg) return;
  writeFileSync(opts.svg, render());
  if (!opts.json) console.log(`(wheel written to ${opts.svg})\n`);
}

function wheelTheme(opts: CommonOpts) {
  return opts.light ? { theme: LIGHT_THEME } : {};
}

let sharedAtlas: Atlas | undefined;
function getAtlas(): Atlas {
  return (sharedAtlas ??= loadAtlas());
}

interface ResolvedMoment {
  utc: Date;
  calendar: CalendarSystem;
  location?: GeoLocation;
  zone: string;
  /** Wall-clock time as entered, for display. */
  wall: DateTime;
  timeNote?: string;
  noTime: boolean;
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

/**
 * Turn CLI date/time/place options into a UTC instant and location.
 * Place comes from --lat/--lon, or an atlas lookup of --place.
 * Pre-standard-time dates use the place's own Local Mean Time; --julian
 * dates are always LMT (time zones postdate the Gregorian reform).
 */
function resolveMoment(dateStr: string, opts: CommonOpts): ResolvedMoment {
  let location: GeoLocation | undefined;
  let zone = opts.zone;
  if (opts.lat !== undefined && opts.lon !== undefined) {
    location = {
      latitude: parseFloat(opts.lat),
      longitude: parseFloat(opts.lon),
      name: opts.place,
    };
  } else if (opts.place) {
    const city = getAtlas().bestMatch(opts.place);
    if (!city) {
      const near = getAtlas().search(opts.place.split(",")[0]!, 3);
      fail(
        `No atlas match for "${opts.place}".` +
          (near.length
            ? ` Closest: ${near.map(formatCity).join(" · ")}`
            : " Try 'astron atlas <name>' or give --lat/--lon."),
      );
    }
    location = {
      latitude: city.latitude,
      longitude: city.longitude,
      name: formatCity(city),
    };
    zone ??= city.timezone;
  }
  zone ??= "UTC";

  const noTime = !opts.time;
  const time = opts.time ?? "12:00";
  const calendar: CalendarSystem = opts.julian ? "julian" : "gregorian";
  const wall = DateTime.fromISO(`${dateStr}T${time}`, { zone: "UTC" });
  if (!wall.isValid) fail(`Invalid date/time: ${wall.invalidExplanation}`);

  if (opts.julian) {
    const offset = location ? lmtOffsetMinutes(location.longitude) : 0;
    return {
      utc: wall.minus({ minutes: offset }).toJSDate(),
      calendar,
      location,
      zone,
      wall,
      noTime,
      timeNote: location
        ? `Julian calendar; Local Mean Time ${formatOffset(offset)} from longitude`
        : "Julian calendar",
    };
  }

  const resolved = localToUtc(
    dateStr,
    time,
    { longitude: location?.longitude ?? 0, zone },
    { timeStandard: location ? (opts.timeStandard ?? "auto") : "iana" },
  );
  return {
    utc: resolved.utc,
    calendar,
    location,
    zone,
    wall,
    noTime,
    timeNote:
      resolved.method === "lmt"
        ? `pre-standard time: Local Mean Time ${formatOffset(resolved.offsetMinutes)} from longitude, not ${zone}`
        : undefined,
  };
}

function buildInput(moment: ResolvedMoment, opts: CommonOpts): ChartInput {
  if (!opts.json) {
    if (!moment.location) {
      console.log("(no place given: computing a planets-only chart, no houses)\n");
    } else if (moment.noTime) {
      console.log("(no --time given: using noon, houses omitted — treat Moon degree as ±6°)\n");
    }
    if (moment.timeNote) console.log(`(${moment.timeNote})\n`);
  }
  const sidereal = opts.sidereal;
  return {
    utc: moment.utc,
    calendar: moment.calendar,
    location: moment.noTime ? undefined : moment.location,
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

function chartToJson(chart: Chart, opts: CommonOpts, moment?: ResolvedMoment): object {
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
    ...(moment?.timeNote ? { timeNote: moment.timeNote } : {}),
  };
}

function printHeader(chart: Chart, moment: ResolvedMoment): void {
  const zodiacLabel =
    chart.zodiac.type === "tropical"
      ? "Tropical"
      : `Sidereal (${chart.zodiac.ayanamsa}, ayanamsa ${chart.ayanamsaValue?.toFixed(2)}°)`;
  console.log("═".repeat(64));
  const calNote = moment.calendar === "julian" ? " (Julian cal.)" : "";
  console.log(
    `  ${moment.wall.toFormat("d LLLL yyyy, HH:mm")} ${moment.zone}${calNote}  (${chart.utc.toISOString().slice(0, 16)}Z)`,
  );
  if (moment.location) {
    const { latitude, longitude, name } = moment.location;
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

function printChart(chart: Chart, moment: ResolvedMoment, opts: CommonOpts): void {
  for (const w of chart.warnings ?? []) console.log(`(${w})`);
  printHeader(chart, moment);
  printPositions(chart);
  printAnglesAndLots(chart);
  printAspects(chart.aspects);
  if (opts.varga) printVarga(chart, opts.varga);
  console.log();
}

function addCommonOptions(cmd: Command): Command {
  return cmd
    .option("-t, --time <HH:MM>", "local clock time of birth/event")
    .option("-z, --zone <iana>", "IANA time zone (default: the place's zone)")
    .option("-p, --place <query>", 'place lookup, e.g. "Perth" or "Perth, UK"')
    .option("--lat <deg>", "latitude, degrees north-positive (overrides --place coords)")
    .option("--lon <deg>", "longitude, degrees east-positive")
    .option("--houses <system>", "placidus|wholeSign|equal|koch|campanus|regiomontanus|porphyry", "placidus")
    .option("--sidereal [ayanamsa]", "sidereal zodiac: lahiri (default), raman, krishnamurti, faganBradley")
    .option("--varga <dN>", "also show a divisional chart: d1, d9, d10")
    .option("--minor-aspects", "include minor aspects")
    .option("--time-standard <mode>", "auto|iana|lmt — how to interpret clock time", "auto")
    .option("--julian", "date is in the Julian calendar (implies Local Mean Time)")
    .option("--svg <path>", "write a chart wheel SVG to this file")
    .option("--light", "use the ink-on-paper wheel theme (with --svg)")
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
  const moment = resolveMoment(opts.date, opts);
  const chart = computeChart(buildInput(moment, opts), new SwephProvider());
  maybeWriteSvg(opts, () => renderWheel(chart, wheelTheme(opts)));
  if (opts.json) {
    console.log(JSON.stringify(chartToJson(chart, opts, moment), null, 2));
  } else {
    printChart(chart, moment, opts);
  }
});

addCommonOptions(
  program
    .command("now")
    .description("chart of this exact moment (transits / horary)"),
).action((opts: CommonOpts) => {
  const probe = resolveMoment("2000-01-01", { ...opts, time: "12:00" });
  const nowLocal = DateTime.now().setZone(probe.zone);
  const moment = resolveMoment(nowLocal.toISODate()!, {
    ...opts,
    zone: probe.zone,
    time: nowLocal.toFormat("HH:mm"),
  });
  const chart = computeChart(buildInput(moment, opts), new SwephProvider());
  maybeWriteSvg(opts, () => renderWheel(chart, wheelTheme(opts)));
  if (opts.json) {
    console.log(JSON.stringify(chartToJson(chart, opts, moment), null, 2));
  } else {
    printChart(chart, moment, opts);
  }
});

addCommonOptions(
  program
    .command("transits")
    .description("current (or chosen) sky against a natal chart")
    .requiredOption("-d, --date <YYYY-MM-DD>", "natal date")
    .option("--on <YYYY-MM-DD>", "transit date (default: today)")
    .option("--at <HH:MM>", "transit time (default: now / noon with --on)")
    .option("--scan <days>", "list exact transit hits in the coming N days")
    .option("--moon", "include the transiting Moon in --scan"),
).action((opts: CommonOpts & { date: string; on?: string; at?: string; scan?: string; moon?: boolean }) => {
  const provider = new SwephProvider();
  const natalMoment = resolveMoment(opts.date, opts);
  const natal = computeChart(buildInput(natalMoment, opts), provider);

  const zone = natalMoment.zone;
  const transitDate = opts.on ?? DateTime.now().setZone(zone).toISODate()!;
  const transitTime =
    opts.at ?? (opts.on ? "12:00" : DateTime.now().setZone(zone).toFormat("HH:mm"));
  const sky = computeChart(
    {
      utc: localToUtc(transitDate, transitTime, {
        longitude: natalMoment.location?.longitude ?? 0,
        zone,
      }).utc,
      zodiac: natal.zodiac,
    },
    provider,
  );
  // Transiting planets are read through the natal houses.
  if (natal.houses) {
    for (const p of sky.positions) p.house = houseOf(p.longitude, natal.houses);
  }
  const hits = findCrossAspects(sky.positions, natal.positions);
  maybeWriteSvg(opts, () =>
    renderWheel(natal, {
      ...wheelTheme(opts),
      outer: { positions: sky.positions, aspects: hits },
    }),
  );

  const scanDays = opts.scan ? parseInt(opts.scan, 10) : 0;
  const scanHits: TransitHit[] = scanDays
    ? scanTransits(
        provider,
        natal.positions,
        { from: sky.utc, days: scanDays, zodiac: natal.zodiac },
        opts.moon
          ? { bodies: ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto", "chiron"] }
          : {},
      )
    : [];

  if (opts.json) {
    console.log(
      JSON.stringify(
        {
          natal: chartToJson(natal, opts, natalMoment),
          transiting: sky.positions.map((p) => ({ ...p, formatted: formatLongitude(p.longitude) })),
          transitUtc: sky.utc,
          aspects: hits,
          ...(scanDays ? { upcoming: scanHits } : {}),
        },
        null,
        2,
      ),
    );
    return;
  }

  printHeader(natal, natalMoment);
  console.log(`\n  TRANSITS for ${transitDate} ${transitTime} ${zone}`);
  for (const p of sky.positions) {
    const name = BODY_NAMES[p.body].padEnd(18);
    const pos = formatLongitude(p.longitude).padEnd(19);
    const house = p.house ? `natal house ${String(p.house).padStart(2)}` : "";
    const rx = p.retrograde ? "  ℞" : "";
    console.log(`  ${BODY_GLYPHS[p.body]}  ${name}${pos}${house}${rx}`);
  }
  printAspects(hits, "TRANSITING → NATAL (orb ≤ 3°)");
  if (scanDays) {
    console.log(`\n  EXACT HITS, NEXT ${scanDays} DAYS${opts.moon ? "" : " (Moon excluded; add --moon)"}`);
    for (const h of scanHits) {
      const when = DateTime.fromJSDate(h.utc).setZone(zone).toFormat("yyyy-LL-dd HH:mm");
      const label = `${BODY_NAMES[h.transiting]} ${h.aspect} natal ${BODY_NAMES[h.natal]}`.padEnd(42);
      console.log(`  ${when}  ${BODY_GLYPHS[h.transiting]}${h.retrograde ? "℞" : " "}–${BODY_GLYPHS[h.natal]}  ${label}`);
    }
    if (!scanHits.length) console.log("  (none)");
  }
  console.log();
});

addCommonOptions(
  program
    .command("return")
    .description("solar or lunar return chart")
    .argument("<kind>", "solar | lunar")
    .requiredOption("-d, --date <YYYY-MM-DD>", "natal date")
    .option("--year <YYYY>", "solar return year (default: current)")
    .option("--after <YYYY-MM-DD>", "lunar return after this date (default: today)"),
).action(function (this: Command, kind: string, opts: CommonOpts & { date: string; year?: string; after?: string }) {
    if (kind !== "solar" && kind !== "lunar") fail("kind must be solar or lunar");
    const provider = new SwephProvider();
    const natalMoment = resolveMoment(opts.date, opts);
    const natal = computeChart(buildInput(natalMoment, opts), provider);
    const chart =
      kind === "solar"
        ? solarReturn(provider, natal, opts.year ? parseInt(opts.year, 10) : new Date().getUTCFullYear())
        : lunarReturn(provider, natal, opts.after ? new Date(`${opts.after}T00:00:00Z`) : new Date());
    const local = DateTime.fromJSDate(chart.utc).setZone(natalMoment.zone);
    const moment: ResolvedMoment = {
      utc: chart.utc,
      calendar: "gregorian",
      location: chart.location,
      zone: natalMoment.zone,
      wall: DateTime.fromISO(local.toISO()!.slice(0, 16), { zone: "UTC" }),
      noTime: false,
      timeNote: `${kind} return for the natal chart of ${opts.date}`,
    };
    maybeWriteSvg(opts, () => renderWheel(chart, wheelTheme(opts)));
    if (opts.json) {
      console.log(JSON.stringify(chartToJson(chart, opts, moment), null, 2));
    } else {
      console.log(`(${moment.timeNote})\n`);
      printChart(chart, moment, opts);
    }
  });

addCommonOptions(
  program
    .command("progressed")
    .description("secondary progressed chart (and optional solar arc directions)")
    .requiredOption("-d, --date <YYYY-MM-DD>", "natal date")
    .option("--to <YYYY-MM-DD>", "date the progression is read for (default: today)")
    .option("--solar-arc", "also list solar arc directed positions"),
).action(function (this: Command, opts: CommonOpts & { date: string; to?: string; solarArc?: boolean }) {
    const provider = new SwephProvider();
    const natalMoment = resolveMoment(opts.date, opts);
    const natal = computeChart(buildInput(natalMoment, opts), provider);
    const target = opts.to ? new Date(`${opts.to}T12:00:00Z`) : new Date();
    const prog = secondaryProgression(provider, natal, target);
    const arc = opts.solarArc ? solarArcDirections(provider, natal, target) : undefined;
    const moment: ResolvedMoment = {
      utc: prog.utc,
      calendar: "gregorian",
      location: prog.location,
      zone: "UTC",
      wall: DateTime.fromJSDate(prog.utc, { zone: "UTC" }),
      noTime: false,
      timeNote: `secondary progression of ${opts.date} read for ${(opts.to ?? "today")}`,
    };
    if (opts.json) {
      console.log(
        JSON.stringify(
          {
            progressed: chartToJson(prog, opts, moment),
            ...(arc ? { solarArc: arc } : {}),
          },
          null,
          2,
        ),
      );
      return;
    }
    console.log(`(${moment.timeNote}; progressed houses are one convention of several)\n`);
    printChart(prog, moment, opts);
    if (arc) {
      console.log(`  SOLAR ARC DIRECTIONS (arc ${arc.arc.toFixed(2)}°)`);
      for (const p of arc.positions) {
        console.log(`  ${BODY_GLYPHS[p.body]}  ${BODY_NAMES[p.body].padEnd(18)}${formatLongitude(p.longitude)}`);
      }
      console.log();
    }
  });

program
  .command("ephemeris")
  .description("upcoming sky events: lunations, stations, ingresses, void-of-course Moon")
  .option("--from <YYYY-MM-DD>", "start date (default: today)")
  .option("--days <n>", "window length in days", "14")
  .option("-z, --zone <iana>", "IANA time zone for display", "UTC")
  .option("--json", "machine-readable JSON output")
  .action((opts: { from?: string; days: string; zone: string; json?: boolean }) => {
    const provider = new SwephProvider();
    const from = opts.from ? new Date(`${opts.from}T00:00:00Z`) : new Date();
    const days = parseInt(opts.days, 10);
    const window = { from, days };
    const lunations = scanLunations(provider, window);
    const stations = scanStations(provider, window);
    const ingresses = scanIngresses(provider, window);
    const voc = scanVoidOfCourse(provider, window);
    if (opts.json) {
      console.log(JSON.stringify({ from, days, lunations, stations, ingresses, voidOfCourse: voc }, null, 2));
      return;
    }
    const fmt = (d: Date) => DateTime.fromJSDate(d).setZone(opts.zone).toFormat("yyyy-LL-dd HH:mm");
    const LUNATION_LABEL = { new: "● new moon", firstQuarter: "◐ first quarter", full: "○ full moon", lastQuarter: "◑ last quarter" };
    console.log(`\n  SKY EVENTS — ${days} days from ${fmt(from)} (${opts.zone})\n`);
    const lines: { jd: number; text: string }[] = [
      ...lunations.map((e) => ({ jd: e.jd, text: `${fmt(e.utc)}  ${LUNATION_LABEL[e.type]} at ${formatLongitude(e.longitude)}` })),
      ...stations.map((e) => ({ jd: e.jd, text: `${fmt(e.utc)}  ${BODY_GLYPHS[e.body]} ${BODY_NAMES[e.body]} stations ${e.type} at ${formatLongitude(e.longitude)}` })),
      ...ingresses.filter((e) => e.body !== "moon").map((e) => ({ jd: e.jd, text: `${fmt(e.utc)}  ${BODY_GLYPHS[e.body]} ${BODY_NAMES[e.body]} ${e.retrograde ? "backs into" : "enters"} ${e.sign}` })),
      ...voc.map((p) => ({ jd: p.jdStart, text: `${fmt(p.start)}  ☽ void-of-course until ${fmt(p.end)} (enters ${p.entering})` })),
    ].sort((a, b) => a.jd - b.jd);
    for (const l of lines) console.log(`  ${l.text}`);
    if (!lines.length) console.log("  (nothing found — quiet sky)");
    console.log();
  });

program
  .command("atlas")
  .description("search the built-in city atlas")
  .argument("<query...>", 'e.g. astron atlas Perth, Australia')
  .option("--json", "machine-readable JSON output")
  .action((queryParts: string[], opts: { json?: boolean }) => {
    const query = queryParts.join(" ");
    const results = getAtlas().search(query);
    if (opts.json) {
      console.log(JSON.stringify(results, null, 2));
      return;
    }
    if (!results.length) {
      console.log(`No matches for "${query}".`);
      return;
    }
    for (const city of results) {
      console.log(
        `  ${formatCity(city).padEnd(52)}${city.latitude.toFixed(2).padStart(8)}°, ${city.longitude.toFixed(2).padStart(9)}°  ${city.timezone}`,
      );
    }
  });

program.parse();
