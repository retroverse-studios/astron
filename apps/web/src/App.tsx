import { renderBouquet, renderWheel } from "@astron/charts";
import {
  antardashas,
  compositeChart,
  dashaAt,
  davisonChart,
  findCrossAspects,
  formatLongitude,
  harmonicChart,
  houseOf,
  lunarReturn,
  scanTransits,
  secondaryProgression,
  solarArcDirections,
  solarReturn,
  synastry,
  synastryBouquet,
  vargaSign,
  vimshottariDashas,
  type Chart,
  type DashaPeriod,
  type EphemerisProvider,
  type HouseSystem,
  type TransitHit,
  type Varga,
} from "@astron/core";
import {
  aiReading,
  DEFAULT_AI_MODEL,
  FLUENT_PROVENANCE,
  fluentPlacement,
  readChart,
} from "@astron/interpret";
import { DateTime } from "luxon";
import { useState } from "react";
import { AspectTable, Notices, PlanetTable, WheelBox } from "./components/ChartView";
import { PersonForm } from "./components/PersonForm";
import { BODY_NAMES, GLYPHS, button, buttonGhost, input, label, panel } from "./components/glyphs";
import { getProvider } from "./lib/astro";
import { castNatal, castMoment, type ChartSettings, type PersonDraft } from "./lib/compute";
import { useSavedPeople } from "./lib/people";

const TABS = ["NATAL", "TRANSITS", "RETURNS", "PROGRESSED", "DASHAS", "RELATIONSHIP"] as const;
type Tab = (typeof TABS)[number];

const wheelTheme = { theme: { background: "none" as const } };

function useCast<T>() {
  const [result, setResult] = useState<T>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();
  const run = async (fn: (provider: EphemerisProvider) => T | Promise<T>) => {
    setBusy(true);
    setError(undefined);
    try {
      setResult(await fn(await getProvider()));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };
  return { result, busy, error, run };
}

function chartNotes(chart: Chart, resolvedMethod?: string, noTime?: boolean): (string | false)[] {
  return [
    resolvedMethod === "lmt" &&
      "pre-standard time: Local Mean Time from the birthplace's longitude was used",
    !!noTime && "unknown time: noon chart, houses omitted — Moon degree is ±6°",
    ...(chart.warnings ?? []),
  ];
}

interface TabProps {
  person: PersonDraft;
  setPerson: (p: PersonDraft) => void;
  settings: ChartSettings;
  scheme: "modern" | "traditional";
  peopleApi: ReturnType<typeof useSavedPeople>;
}

function PersonPanel({
  title,
  person,
  setPerson,
  peopleApi,
  children,
}: {
  title: string;
  person: PersonDraft;
  setPerson: (p: PersonDraft) => void;
  peopleApi: ReturnType<typeof useSavedPeople>;
  children?: React.ReactNode;
}) {
  return (
    <div className={panel + " p-4 space-y-4 h-fit"}>
      <PersonForm
        title={title}
        value={person}
        onChange={setPerson}
        people={peopleApi.people}
        onSave={(name) =>
          person.city &&
          peopleApi.save({ label: name, date: person.date, time: person.time, city: person.city })
        }
      />
      {children}
    </div>
  );
}

const VARGAS: { value: Varga | ""; label: string }[] = [
  { value: "", label: "none" },
  { value: "d2", label: "D2 hora" },
  { value: "d3", label: "D3 drekkana" },
  { value: "d7", label: "D7 saptamsa" },
  { value: "d9", label: "D9 navamsa" },
  { value: "d10", label: "D10 dashamsa" },
  { value: "d12", label: "D12 dvadasamsa" },
  { value: "d30", label: "D30 trimsamsa" },
  { value: "d60", label: "D60 shashtiamsa" },
];

type ReadingMode = "parts" | "fluent" | "ai";

function Reading({ chart, scheme }: { chart: Chart; scheme: "modern" | "traditional" }) {
  const [mode, setMode] = useState<ReadingMode>("parts");
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("astron.aiKey") ?? "");
  const [model, setModel] = useState(DEFAULT_AI_MODEL);
  const [aiText, setAiText] = useState<{ text: string; provenance: string }>();
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState<string>();
  const reading = readChart(chart, scheme);
  const Part = ({ k, v }: { k: string; v: string }) => (
    <p className="text-sm">
      <span className="inline-block w-24 text-crt-amber/80 text-xs tracking-widest uppercase">{k}</span>
      <span className="text-crt-text">{v}</span>
    </p>
  );

  const modeBar = (
    <div className="flex flex-wrap items-center gap-3">
      <h2 className="text-crt-dim text-xs tracking-widest">THE READING</h2>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value as ReadingMode)}
        className="bg-crt-bg border border-crt-line rounded px-2 py-1 text-xs text-crt-text"
      >
        <option value="parts">in parts — no AI, fully deterministic</option>
        <option value="fluent">fluent — built-in set, AI-written once</option>
        <option value="ai">AI live — your own key (data leaves this machine)</option>
      </select>
    </div>
  );

  if (mode === "fluent") {
    return (
      <div className={panel + " p-4 space-y-4"}>
        {modeBar}
        {chart.positions.map((p) => (
          <div key={p.body} className="border-t border-crt-line/40 pt-2">
            <h3 className="text-crt-bright mb-1">
              {GLYPHS[p.body]} {BODY_NAMES[p.body]} in {p.sign}
              {p.house ? `, house ${p.house}` : ""}
            </h3>
            <p className="text-sm text-crt-text leading-relaxed">
              {fluentPlacement(p.body, p.sign, p.house)}
            </p>
          </div>
        ))}
        <p className="text-xs text-crt-dim leading-relaxed border border-crt-line rounded p-3">
          {FLUENT_PROVENANCE}
        </p>
      </div>
    );
  }

  if (mode === "ai") {
    return (
      <div className={panel + " p-4 space-y-4"}>
        {modeBar}
        <p className="text-xs text-crt-amber leading-relaxed">
          This mode sends your chart data directly to Anthropic using your own API key —
          the only ASTRON feature that touches the network. The key is kept in this
          browser's local storage and goes nowhere else.
        </p>
        <div className="flex flex-wrap gap-2">
          <input
            type="password"
            placeholder="sk-ant-… (your Anthropic API key)"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              localStorage.setItem("astron.aiKey", e.target.value);
            }}
            className={input + " flex-1 min-w-56"}
          />
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={input + " w-64"}
            title="model id"
          />
          <button
            className={button}
            disabled={aiBusy || !apiKey}
            onClick={() => {
              setAiBusy(true);
              setAiError(undefined);
              aiReading(chart, scheme, { apiKey, model })
                .then(setAiText)
                .catch((e: unknown) => setAiError(e instanceof Error ? e.message : String(e)))
                .finally(() => setAiBusy(false));
            }}
          >
            {aiBusy ? "generating…" : aiText ? "REGENERATE" : "GENERATE"}
          </button>
        </div>
        {aiError && <p className="text-red-400 text-sm">{aiError}</p>}
        {aiText && (
          <>
            <div className="text-sm text-crt-text leading-relaxed whitespace-pre-wrap border-t border-crt-line/40 pt-3">
              {aiText.text}
            </div>
            <p className="text-xs text-crt-dim leading-relaxed border border-crt-line rounded p-3">
              {aiText.provenance}
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={panel + " p-4 space-y-4"}>
      {modeBar}
      {reading.placements.map((r) => (
        <div key={r.position.body} className="border-t border-crt-line/40 pt-2">
          <h3 className="text-crt-bright mb-1">
            {GLYPHS[r.position.body]} {BODY_NAMES[r.position.body]} in {r.position.sign}
            {r.position.house ? `, house ${r.position.house}` : ""}
          </h3>
          <Part k="the planet" v={r.archetype} />
          <Part k="light" v={r.sign.light} />
          <Part k="truth" v={r.sign.truth} />
          <Part k="shadow" v={r.sign.shadow} />
          {r.house && <Part k="the house" v={r.house} />}
          {r.dignityNotes.map((d) => (
            <Part key={d} k="dignity" v={d} />
          ))}
        </div>
      ))}
      <h2 className="text-crt-dim text-xs tracking-widest pt-2">ASPECT READINGS (orb ≤ 4°)</h2>
      {reading.aspects.map((r, i) => (
        <div key={i} className="border-t border-crt-line/40 pt-2">
          <h3 className="text-crt-bright mb-1">
            {GLYPHS[r.aspect.a]} {BODY_NAMES[r.aspect.a]} {r.aspect.name} {GLYPHS[r.aspect.b]}{" "}
            {BODY_NAMES[r.aspect.b]} <span className="text-crt-dim text-sm">orb {r.aspect.orb.toFixed(1)}°</span>
          </h3>
          <Part k="pairing" v={r.pairing} />
          <Part k="light" v={r.lenses.light} />
          <Part k="truth" v={r.lenses.truth} />
          <Part k="shadow" v={r.lenses.shadow} />
        </div>
      ))}
      <p className="text-xs text-crt-dim leading-relaxed border border-crt-line rounded p-3">
        {reading.disclaimer}
      </p>
    </div>
  );
}

function NatalTab({ person, setPerson, settings, scheme, peopleApi }: TabProps) {
  const cast = useCast<ReturnType<typeof castNatal>>();
  const [varga, setVarga] = useState<Varga | "">("");
  const [harmonic, setHarmonic] = useState("");
  const [showReading, setShowReading] = useState(false);
  const harmonicN = parseInt(harmonic, 10);
  return (
    <div className="grid lg:grid-cols-[340px_1fr] gap-6">
      <PersonPanel title="BIRTH DATA" person={person} setPerson={setPerson} peopleApi={peopleApi}>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className={label}>VARGA</label>
            <select value={varga} onChange={(e) => setVarga(e.target.value as Varga | "")} className={input}>
              {VARGAS.map((v) => (
                <option key={v.value} value={v.value}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className={label}>HARMONIC</label>
            <input
              type="number"
              min={2}
              placeholder="none"
              value={harmonic}
              onChange={(e) => setHarmonic(e.target.value)}
              className={input}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className={button + " flex-1"}
            disabled={cast.busy}
            onClick={() => void cast.run((p) => castNatal(p, person, settings))}
          >
            {cast.busy ? "computing…" : "CAST CHART"}
          </button>
          <button
            className={buttonGhost}
            disabled={cast.busy || !person.city}
            onClick={() => {
              const now = DateTime.now().setZone(person.city!.timezone);
              const draft = { ...person, date: now.toISODate()!, time: now.toFormat("HH:mm") };
              setPerson(draft);
              void cast.run((p) => castNatal(p, draft, settings));
            }}
          >
            NOW
          </button>
        </div>
        <label className="flex items-center gap-2 text-xs text-crt-dim">
          <input type="checkbox" checked={showReading} onChange={(e) => setShowReading(e.target.checked)} />
          show the reading (assembled from parts, disclaimer included)
        </label>
        {cast.error && <p className="text-red-400 text-sm">{cast.error}</p>}
        {cast.result && (
          <Notices notes={chartNotes(cast.result.chart, cast.result.resolved.method, cast.result.noTime)} />
        )}
      </PersonPanel>
      <div className="space-y-6">
        {cast.result ? (
          <>
            <WheelBox svg={renderWheel(cast.result.chart, wheelTheme)} />
            <PlanetTable chart={cast.result.chart} scheme={scheme} />
            {varga && (
              <div className={panel + " p-4"}>
                <h2 className="text-crt-dim text-xs mb-3 tracking-widest">
                  VARGA {varga.toUpperCase()}
                  {settings.zodiac.type === "tropical" && " (note: vargas are conventionally read sidereal)"}
                </h2>
                <p className="text-sm leading-7">
                  {cast.result.chart.positions.map((p) => (
                    <span key={p.body} className="mr-4 whitespace-nowrap">
                      {GLYPHS[p.body]} {vargaSign(p.longitude, varga)}
                    </span>
                  ))}
                </p>
              </div>
            )}
            {harmonicN >= 2 && (
              <div className={panel + " p-4"}>
                <h2 className="text-crt-dim text-xs mb-3 tracking-widest">HARMONIC {harmonicN}</h2>
                <p className="text-sm leading-7">
                  {harmonicChart(cast.result.chart, harmonicN).positions.map((p) => (
                    <span key={p.body} className="mr-4 whitespace-nowrap">
                      {GLYPHS[p.body]} {formatLongitude(p.longitude)}
                    </span>
                  ))}
                </p>
              </div>
            )}
            <AspectTable aspects={cast.result.chart.aspects} />
            {showReading && <Reading chart={cast.result.chart} scheme={scheme} />}
          </>
        ) : (
          <div className={panel + " p-16 text-center text-crt-dim"}>enter birth data and cast a chart</div>
        )}
      </div>
    </div>
  );
}

function DashasTab({ person, setPerson, peopleApi }: TabProps) {
  const cast = useCast<{ moonLon: number; periods: DashaPeriod[] }>();
  const now = new Date();
  const current = cast.result ? dashaAt(cast.result.periods, now) : undefined;
  const cap = (s: string) => s[0]!.toUpperCase() + s.slice(1);
  const fmtD = (d: Date) => DateTime.fromJSDate(d).toFormat("yyyy-LL-dd");

  return (
    <div className="grid lg:grid-cols-[340px_1fr] gap-6">
      <PersonPanel title="BIRTH DATA" person={person} setPerson={setPerson} peopleApi={peopleApi}>
        <button
          className={button + " w-full"}
          disabled={cast.busy}
          onClick={() =>
            void cast.run((p) => {
              if (!person.city) throw new Error("Pick a birthplace first.");
              const { chart } = castNatal(p, person, {
                zodiac: { type: "sidereal", ayanamsa: "lahiri" },
                houseSystem: "wholeSign",
              });
              const moon = chart.positions.find((x) => x.body === "moon")!;
              return { moonLon: moon.longitude, periods: vimshottariDashas(moon.longitude, chart.utc) };
            })
          }
        >
          {cast.busy ? "computing…" : "COMPUTE DASHAS"}
        </button>
        {cast.error && <p className="text-red-400 text-sm">{cast.error}</p>}
        {cast.result && (
          <p className="text-xs text-crt-dim">
            sidereal ☽ {formatLongitude(cast.result.moonLon)} (Lahiri) — Vimshottari is a Vedic
            technique and always uses the sidereal Moon
          </p>
        )}
      </PersonPanel>
      <div className="space-y-6">
        {cast.result ? (
          <>
            <div className={panel + " p-4"}>
              <h2 className="text-crt-dim text-xs mb-3 tracking-widest">VIMSHOTTARI MAHADASHAS</h2>
              <table className="w-full text-sm">
                <tbody>
                  {cast.result.periods.map((p, i) => (
                    <tr key={i} className={"border-t border-crt-line/40" + (p === current ? " text-crt-bright" : "")}>
                      <td className="py-1 pr-2">{p === current ? "▶" : ""}</td>
                      <td className="py-1 pr-4">{cap(p.lord)}</td>
                      <td className="py-1 text-crt-dim">
                        {fmtD(p.start)} → {fmtD(p.end)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {current && (
              <div className={panel + " p-4"}>
                <h2 className="text-crt-dim text-xs mb-3 tracking-widest">
                  ANTARDASHAS OF {cap(current.lord).toUpperCase()}
                </h2>
                <table className="w-full text-sm">
                  <tbody>
                    {antardashas(current).map((s, i) => {
                      const running = s.start <= now && now < s.end;
                      return (
                        <tr key={i} className={"border-t border-crt-line/40" + (running ? " text-crt-bright" : "")}>
                          <td className="py-1 pr-2">{running ? "▶" : ""}</td>
                          <td className="py-1 pr-4">
                            {cap(current.lord)}–{cap(s.lord)}
                          </td>
                          <td className="py-1 text-crt-dim">
                            {fmtD(s.start)} → {fmtD(s.end)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <div className={panel + " p-16 text-center text-crt-dim"}>
            the Vedic planetary periods — 120 years, nine lords
          </div>
        )}
      </div>
    </div>
  );
}

function TransitsTab({ person, setPerson, settings, scheme, peopleApi }: TabProps) {
  const [onDate, setOnDate] = useState("");
  const [atTime, setAtTime] = useState("");
  const [withScan, setWithScan] = useState(false);
  const cast = useCast<{
    natal: Chart;
    sky: Chart;
    hits: ReturnType<typeof findCrossAspects>;
    upcoming?: TransitHit[];
    when: string;
  }>();

  return (
    <div className="grid lg:grid-cols-[340px_1fr] gap-6">
      <PersonPanel title="NATAL DATA" person={person} setPerson={setPerson} peopleApi={peopleApi}>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className={label}>TRANSIT DATE (blank = now)</label>
            <input type="date" value={onDate} onChange={(e) => setOnDate(e.target.value)} className={input} />
          </div>
          <div className="flex-1">
            <label className={label}>TIME</label>
            <input type="time" value={atTime} onChange={(e) => setAtTime(e.target.value)} className={input} />
          </div>
        </div>
        <label className="flex items-center gap-2 text-xs text-crt-dim">
          <input type="checkbox" checked={withScan} onChange={(e) => setWithScan(e.target.checked)} />
          list exact hits over the next 30 days (slower)
        </label>
        <button
          className={button + " w-full"}
          disabled={cast.busy}
          onClick={() =>
            void cast.run((p) => {
              const natal = castNatal(p, person, settings).chart;
              const zone = person.city!.timezone;
              const now = DateTime.now().setZone(zone);
              const date = onDate || now.toISODate()!;
              const time = atTime || (onDate ? "12:00" : now.toFormat("HH:mm"));
              const sky = castMoment(p, date, time, person.city!, settings).chart;
              if (natal.houses) {
                for (const pos of sky.positions) pos.house = houseOf(pos.longitude, natal.houses);
              }
              const hits = findCrossAspects(sky.positions, natal.positions);
              const upcoming = withScan
                ? scanTransits(p, natal.positions, { from: sky.utc, days: 30, zodiac: natal.zodiac })
                : undefined;
              return { natal, sky, hits, upcoming, when: `${date} ${time} ${zone}` };
            })
          }
        >
          {cast.busy ? "computing…" : "CAST TRANSITS"}
        </button>
        {cast.error && <p className="text-red-400 text-sm">{cast.error}</p>}
      </PersonPanel>
      <div className="space-y-6">
        {cast.result ? (
          <>
            <WheelBox
              svg={renderWheel(cast.result.natal, {
                ...wheelTheme,
                outer: { positions: cast.result.sky.positions, aspects: cast.result.hits },
              })}
            />
            <AspectTable
              aspects={cast.result.hits}
              title={`TRANSITING → NATAL, ${cast.result.when} (orb ≤ 3°)`}
            />
            {cast.result.upcoming && (
              <div className={panel + " p-4"}>
                <h2 className="text-crt-dim text-xs mb-3 tracking-widest">
                  EXACT HITS, NEXT 30 DAYS (Moon excluded)
                </h2>
                <ul className="text-sm space-y-1">
                  {cast.result.upcoming.map((h, i) => (
                    <li key={i}>
                      <span className="text-crt-dim">
                        {DateTime.fromJSDate(h.utc).setZone(person.city!.timezone).toFormat("yyyy-LL-dd HH:mm")}
                      </span>{" "}
                      {GLYPHS[h.transiting]}
                      {h.retrograde ? "℞" : ""} {BODY_NAMES[h.transiting]}{" "}
                      <span className="text-crt-bright">{h.aspect}</span> natal {GLYPHS[h.natal]}{" "}
                      {BODY_NAMES[h.natal]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <div className={panel + " p-16 text-center text-crt-dim"}>
            the sky of any moment, read against a natal chart
          </div>
        )}
      </div>
    </div>
  );
}

function ReturnsTab({ person, setPerson, settings, scheme, peopleApi }: TabProps) {
  const [kind, setKind] = useState<"solar" | "lunar">("solar");
  const [year, setYear] = useState(String(new Date().getUTCFullYear()));
  const [after, setAfter] = useState("");
  const cast = useCast<{ chart: Chart; note: string }>();

  return (
    <div className="grid lg:grid-cols-[340px_1fr] gap-6">
      <PersonPanel title="NATAL DATA" person={person} setPerson={setPerson} peopleApi={peopleApi}>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className={label}>RETURN</label>
            <select value={kind} onChange={(e) => setKind(e.target.value as "solar" | "lunar")} className={input}>
              <option value="solar">Solar (birthday year)</option>
              <option value="lunar">Lunar (monthly)</option>
            </select>
          </div>
          <div className="flex-1">
            {kind === "solar" ? (
              <>
                <label className={label}>YEAR</label>
                <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className={input} />
              </>
            ) : (
              <>
                <label className={label}>AFTER (blank = today)</label>
                <input type="date" value={after} onChange={(e) => setAfter(e.target.value)} className={input} />
              </>
            )}
          </div>
        </div>
        <button
          className={button + " w-full"}
          disabled={cast.busy}
          onClick={() =>
            void cast.run((p) => {
              const natal = castNatal(p, person, settings).chart;
              const chart =
                kind === "solar"
                  ? solarReturn(p, natal, parseInt(year, 10))
                  : lunarReturn(p, natal, after ? new Date(`${after}T00:00:00Z`) : new Date());
              const local = DateTime.fromJSDate(chart.utc).setZone(person.city!.timezone);
              return {
                chart,
                note: `${kind} return exact at ${local.toFormat("d LLLL yyyy, HH:mm")} ${person.city!.timezone}`,
              };
            })
          }
        >
          {cast.busy ? "computing…" : "CAST RETURN"}
        </button>
        {cast.error && <p className="text-red-400 text-sm">{cast.error}</p>}
        {cast.result && <Notices notes={[cast.result.note]} />}
      </PersonPanel>
      <div className="space-y-6">
        {cast.result ? (
          <>
            <WheelBox svg={renderWheel(cast.result.chart, wheelTheme)} />
            <PlanetTable chart={cast.result.chart} scheme={scheme} />
            <AspectTable aspects={cast.result.chart.aspects} />
          </>
        ) : (
          <div className={panel + " p-16 text-center text-crt-dim"}>
            the chart of the Sun or Moon coming home
          </div>
        )}
      </div>
    </div>
  );
}

function ProgressedTab({ person, setPerson, settings, scheme, peopleApi }: TabProps) {
  const [to, setTo] = useState("");
  const cast = useCast<{ chart: Chart; arc: number; note: string }>();

  return (
    <div className="grid lg:grid-cols-[340px_1fr] gap-6">
      <PersonPanel title="NATAL DATA" person={person} setPerson={setPerson} peopleApi={peopleApi}>
        <div>
          <label className={label}>READ FOR (blank = today)</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className={input} />
        </div>
        <button
          className={button + " w-full"}
          disabled={cast.busy}
          onClick={() =>
            void cast.run((p) => {
              const natal = castNatal(p, person, settings).chart;
              const target = to ? new Date(`${to}T12:00:00Z`) : new Date();
              const chart = secondaryProgression(p, natal, target);
              const { arc } = solarArcDirections(p, natal, target);
              return {
                chart,
                arc,
                note:
                  "secondary progression (a day per year); progressed houses are one convention of several",
              };
            })
          }
        >
          {cast.busy ? "computing…" : "CAST PROGRESSION"}
        </button>
        {cast.error && <p className="text-red-400 text-sm">{cast.error}</p>}
        {cast.result && (
          <Notices notes={[cast.result.note, `solar arc: ${cast.result.arc.toFixed(2)}°`]} />
        )}
      </PersonPanel>
      <div className="space-y-6">
        {cast.result ? (
          <>
            <WheelBox svg={renderWheel(cast.result.chart, wheelTheme)} />
            <PlanetTable chart={cast.result.chart} scheme={scheme} />
            <AspectTable aspects={cast.result.chart.aspects} />
          </>
        ) : (
          <div className={panel + " p-16 text-center text-crt-dim"}>
            how the natal chart unfolds, a day for a year
          </div>
        )}
      </div>
    </div>
  );
}

function RelationshipTab({ person, setPerson, settings, scheme, peopleApi }: TabProps) {
  const [kind, setKind] = useState<"synastry" | "composite" | "davison">("synastry");
  const [personB, setPersonB] = useState<PersonDraft>({ date: "", time: "", city: undefined });
  const cast = useCast<
    | { kind: "synastry"; a: Chart; b: Chart; result: ReturnType<typeof synastry>; bouquet: ReturnType<typeof synastryBouquet> }
    | { kind: "composite" | "davison"; chart: Chart; note: string }
  >();

  return (
    <div className="grid lg:grid-cols-[340px_1fr] gap-6">
      <div className="space-y-6">
        <PersonPanel title="PERSON A" person={person} setPerson={setPerson} peopleApi={peopleApi} />
        <PersonPanel title="PERSON B" person={personB} setPerson={setPersonB} peopleApi={peopleApi}>
          <div>
            <label className={label}>TECHNIQUE</label>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as typeof kind)}
              className={input}
            >
              <option value="synastry">Synastry — charts compared</option>
              <option value="composite">Composite — midpoint chart</option>
              <option value="davison">Davison — time/space midpoint</option>
            </select>
          </div>
          <button
            className={button + " w-full"}
            disabled={cast.busy}
            onClick={() =>
              void cast.run((p) => {
                const a = castNatal(p, person, settings).chart;
                const b = castNatal(p, personB, settings).chart;
                if (kind === "synastry") {
                  const result = synastry(a, b);
                  return { kind, a, b, result, bouquet: synastryBouquet(result.aspects) };
                }
                if (kind === "composite") {
                  return {
                    kind,
                    chart: compositeChart(a, b),
                    note: "midpoint composite; houses are whole-sign from the midpoint ascendant (one convention of several)",
                  };
                }
                const chart = davisonChart(p, a, b);
                return {
                  kind,
                  chart,
                  note: `Davison: a real sky at the midpoint in time and space${chart.location ? ` (${chart.location.latitude.toFixed(1)}°, ${chart.location.longitude.toFixed(1)}°)` : ""}`,
                };
              })
            }
          >
            {cast.busy ? "computing…" : "CAST"}
          </button>
          {cast.error && <p className="text-red-400 text-sm">{cast.error}</p>}
        </PersonPanel>
      </div>
      <div className="space-y-6">
        {!cast.result && (
          <div className={panel + " p-16 text-center text-crt-dim"}>
            two charts, three ways to read them together
          </div>
        )}
        {cast.result?.kind === "synastry" && (
          <>
            <div className="grid md:grid-cols-[1fr_320px] gap-6 items-start">
              <WheelBox
                svg={renderWheel(cast.result.a, {
                  ...wheelTheme,
                  outer: { positions: cast.result.b.positions, aspects: cast.result.result.aspects },
                })}
              />
              <div className={panel + " p-4 space-y-3"}>
                <h2 className="text-crt-dim text-xs tracking-widest">THE BOUQUET</h2>
                <div
                  className="[&_svg]:w-full [&_svg]:h-auto"
                  dangerouslySetInnerHTML={{ __html: renderBouquet(cast.result.bouquet, wheelTheme) }}
                />
                <p className="text-xs text-crt-dim leading-relaxed">{cast.result.bouquet.disclaimer}</p>
              </div>
            </div>
            <AspectTable
              aspects={cast.result.result.aspects}
              title="INTER-ASPECTS"
              showApplying={false}
              pairLabels={["A's", "B's"]}
            />
            <div className={panel + " p-4 text-sm space-y-2"}>
              {cast.result.result.aInBHouses && (
                <p>
                  <span className="text-crt-dim text-xs tracking-widest">A IN B'S HOUSES </span>
                  {cast.result.result.aInBHouses.map((o) => `${GLYPHS[o.body]}${o.house}`).join(" ")}
                </p>
              )}
              {cast.result.result.bInAHouses && (
                <p>
                  <span className="text-crt-dim text-xs tracking-widest">B IN A'S HOUSES </span>
                  {cast.result.result.bInAHouses.map((o) => `${GLYPHS[o.body]}${o.house}`).join(" ")}
                </p>
              )}
            </div>
          </>
        )}
        {cast.result && cast.result.kind !== "synastry" && (
          <>
            <Notices notes={[cast.result.note]} />
            <WheelBox svg={renderWheel(cast.result.chart, wheelTheme)} />
            <PlanetTable chart={cast.result.chart} scheme={scheme} />
            <AspectTable aspects={cast.result.chart.aspects} showApplying={cast.result.kind === "davison"} />
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<Tab>("NATAL");
  const [person, setPerson] = useState<PersonDraft>({ date: "1990-06-15", time: "10:00" });
  const [sidereal, setSidereal] = useState(false);
  const [houses, setHouses] = useState<HouseSystem>("placidus");
  const peopleApi = useSavedPeople();

  const settings: ChartSettings = {
    zodiac: sidereal ? { type: "sidereal", ayanamsa: "lahiri" } : { type: "tropical" },
    houseSystem: houses,
  };
  const scheme = sidereal ? ("traditional" as const) : ("modern" as const);
  const tabProps: TabProps = { person, setPerson, settings, scheme, peopleApi };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl tracking-[0.3em] text-crt-bright">✷ ASTRON</h1>
          <p className="text-crt-dim mt-1 text-sm">
            The Clockwork of the Heavens, Charted. — real astronomy, honest tradition
          </p>
        </div>
        <div className="flex gap-3">
          <div>
            <label className={label}>ZODIAC</label>
            <select
              value={sidereal ? "sidereal" : "tropical"}
              onChange={(e) => setSidereal(e.target.value === "sidereal")}
              className="bg-crt-bg border border-crt-line rounded px-2 py-2 text-crt-bright outline-none"
            >
              <option value="tropical">Tropical</option>
              <option value="sidereal">Sidereal (Lahiri)</option>
            </select>
          </div>
          <div>
            <label className={label}>HOUSES</label>
            <select
              value={houses}
              onChange={(e) => setHouses(e.target.value as HouseSystem)}
              className="bg-crt-bg border border-crt-line rounded px-2 py-2 text-crt-bright outline-none"
            >
              <option value="placidus">Placidus</option>
              <option value="wholeSign">Whole Sign</option>
              <option value="equal">Equal</option>
              <option value="koch">Koch</option>
            </select>
          </div>
        </div>
      </header>

      <nav className="flex flex-wrap gap-1 mb-6 border-b border-crt-line">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "px-4 py-2 text-sm tracking-widest rounded-t " +
              (tab === t
                ? "bg-crt-panel text-crt-bright border border-crt-line border-b-0"
                : "text-crt-dim hover:text-crt-text")
            }
          >
            {t}
          </button>
        ))}
      </nav>

      {tab === "NATAL" && <NatalTab {...tabProps} />}
      {tab === "TRANSITS" && <TransitsTab {...tabProps} />}
      {tab === "RETURNS" && <ReturnsTab {...tabProps} />}
      {tab === "PROGRESSED" && <ProgressedTab {...tabProps} />}
      {tab === "DASHAS" && <DashasTab {...tabProps} />}
      {tab === "RELATIONSHIP" && <RelationshipTab {...tabProps} />}

      <footer className="mt-10 text-xs text-crt-dim leading-relaxed max-w-3xl">
        <p>
          The astronomy is real (Swiss Ephemeris, arcsecond precision, running in your browser —
          nothing leaves this page). The meanings belong to a symbolic tradition, not to
          predictive science. Enjoy it the way the tradition deserves: curiously, and with both
          feet on the ground.
        </p>
        <p className="mt-2">
          city data © GeoNames (CC-BY) · AGPL-3.0 ·{" "}
          <a className="underline" href="https://github.com/retroverse-studios/astron">
            source
          </a>
        </p>
      </footer>
    </div>
  );
}
