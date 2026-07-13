import { formatCity, localToUtc, type City, type ResolvedTime } from "@astron/atlas";
import { renderWheel } from "@astron/charts";
import {
  computeChart,
  dignities,
  formatLongitude,
  isDayChart,
  partOfFortune,
  type Body,
  type Chart,
  type HouseSystem,
} from "@astron/core";
import { DateTime } from "luxon";
import { useEffect, useMemo, useRef, useState } from "react";
import { getAtlas, getProvider } from "./lib/astro";

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
  meanNode: "North Node",
  chiron: "Chiron",
  meanLilith: "Lilith",
};

const GLYPHS: Record<Body, string> = {
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

interface Result {
  chart: Chart;
  city: City;
  resolved: ResolvedTime;
  noTime: boolean;
}

function PlaceSearch({ city, onPick }: { city?: City; onPick: (c: City) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<City[]>([]);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    let live = true;
    const t = setTimeout(async () => {
      const atlas = await getAtlas();
      if (live) {
        setResults(atlas.search(query, 6));
        setOpen(true);
      }
    }, 120);
    return () => {
      live = false;
      clearTimeout(t);
    };
  }, [query]);

  return (
    <div ref={box} className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length && setOpen(true)}
        placeholder={city ? formatCity(city) : "city of birth…"}
        className="w-full bg-crt-bg border border-crt-line rounded px-3 py-2 text-crt-bright placeholder-crt-dim focus:border-crt-dim outline-none"
      />
      {open && results.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-crt-panel border border-crt-line rounded max-h-56 overflow-auto">
          {results.map((c, i) => (
            <li key={i}>
              <button
                type="button"
                className="w-full text-left px-3 py-1.5 hover:bg-crt-line/40 text-sm"
                onClick={() => {
                  onPick(c);
                  setQuery("");
                  setOpen(false);
                }}
              >
                {formatCity(c)}
                <span className="text-crt-dim"> · {c.timezone}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function App() {
  const [date, setDate] = useState("1990-06-15");
  const [time, setTime] = useState("10:00");
  const [city, setCity] = useState<City>();
  const [sidereal, setSidereal] = useState(false);
  const [houses, setHouses] = useState<HouseSystem>("placidus");
  const [result, setResult] = useState<Result>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();

  async function cast(atDate: string, atTime: string, forCity: City | undefined) {
    if (!forCity) {
      setError("Pick a birthplace first.");
      return;
    }
    setBusy(true);
    setError(undefined);
    try {
      const provider = await getProvider();
      const noTime = !atTime;
      const resolved = localToUtc(atDate, atTime || "12:00", forCity);
      const chart = computeChart(
        {
          utc: resolved.utc,
          location: noTime
            ? undefined
            : {
                latitude: forCity.latitude,
                longitude: forCity.longitude,
                name: formatCity(forCity),
              },
          zodiac: sidereal ? { type: "sidereal", ayanamsa: "lahiri" } : { type: "tropical" },
          houseSystem: houses,
        },
        provider,
      );
      setResult({ chart, city: forCity, resolved, noTime });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  const svg = useMemo(
    () => (result ? renderWheel(result.chart, { theme: { background: "none" } }) : undefined),
    [result],
  );

  const scheme = sidereal ? "traditional" : "modern";
  const pof = result ? partOfFortune(result.chart) : undefined;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl tracking-[0.3em] text-crt-bright">✷ ASTRON</h1>
        <p className="text-crt-dim mt-1 text-sm">
          The Clockwork of the Heavens, Charted. — real astronomy, honest tradition
        </p>
      </header>

      <div className="grid lg:grid-cols-[340px_1fr] gap-6">
        <form
          className="bg-crt-panel border border-crt-line rounded-lg p-4 space-y-4 h-fit"
          onSubmit={(e) => {
            e.preventDefault();
            void cast(date, time, city);
          }}
        >
          <div>
            <label className="text-xs text-crt-dim block mb-1">DATE</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full bg-crt-bg border border-crt-line rounded px-3 py-2 text-crt-bright outline-none focus:border-crt-dim"
            />
          </div>
          <div>
            <label className="text-xs text-crt-dim block mb-1">
              TIME <span className="normal-case">(blank = unknown → noon, no houses)</span>
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-crt-bg border border-crt-line rounded px-3 py-2 text-crt-bright outline-none focus:border-crt-dim"
            />
          </div>
          <div>
            <label className="text-xs text-crt-dim block mb-1">PLACE</label>
            <PlaceSearch city={city} onPick={setCity} />
            {city && (
              <p className="text-xs text-crt-dim mt-1">
                {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}° · {city.timezone}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-crt-dim block mb-1">ZODIAC</label>
              <select
                value={sidereal ? "sidereal" : "tropical"}
                onChange={(e) => setSidereal(e.target.value === "sidereal")}
                className="w-full bg-crt-bg border border-crt-line rounded px-2 py-2 text-crt-bright outline-none"
              >
                <option value="tropical">Tropical</option>
                <option value="sidereal">Sidereal (Lahiri)</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs text-crt-dim block mb-1">HOUSES</label>
              <select
                value={houses}
                onChange={(e) => setHouses(e.target.value as HouseSystem)}
                className="w-full bg-crt-bg border border-crt-line rounded px-2 py-2 text-crt-bright outline-none"
              >
                <option value="placidus">Placidus</option>
                <option value="wholeSign">Whole Sign</option>
                <option value="equal">Equal</option>
                <option value="koch">Koch</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={busy}
              className="flex-1 bg-crt-line/60 hover:bg-crt-line text-crt-bright rounded px-3 py-2 disabled:opacity-50"
            >
              {busy ? "computing…" : "CAST CHART"}
            </button>
            <button
              type="button"
              disabled={busy || !city}
              title="chart of this moment at the chosen place"
              onClick={() => {
                const now = DateTime.now().setZone(city!.timezone);
                setDate(now.toISODate()!);
                setTime(now.toFormat("HH:mm"));
                void cast(now.toISODate()!, now.toFormat("HH:mm"), city);
              }}
              className="bg-crt-line/30 hover:bg-crt-line text-crt-text rounded px-3 py-2 disabled:opacity-40"
            >
              NOW
            </button>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          {result?.resolved.method === "lmt" && (
            <p className="text-crt-amber text-xs">
              pre-standard time: Local Mean Time from longitude was used, not{" "}
              {result.resolved.zone}
            </p>
          )}
          {result?.noTime && (
            <p className="text-crt-amber text-xs">
              unknown time: noon chart, houses omitted — Moon degree is ±6°
            </p>
          )}
          {result?.chart.warnings?.map((w) => (
            <p key={w} className="text-crt-amber text-xs">
              {w}
            </p>
          ))}
        </form>

        <div className="space-y-6">
          {svg ? (
            <div
              className="bg-crt-panel border border-crt-line rounded-lg p-2 [&_svg]:w-full [&_svg]:h-auto"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ) : (
            <div className="bg-crt-panel border border-crt-line rounded-lg p-16 text-center text-crt-dim">
              enter birth data and cast a chart
            </div>
          )}

          {result && (
            <>
              <div className="bg-crt-panel border border-crt-line rounded-lg p-4 overflow-x-auto">
                <h2 className="text-crt-dim text-xs mb-3 tracking-widest">PLANETS</h2>
                <table className="w-full text-sm">
                  <tbody>
                    {result.chart.positions.map((p) => (
                      <tr key={p.body} className="border-t border-crt-line/40">
                        <td className="py-1 pr-2 text-crt-bright">{GLYPHS[p.body]}</td>
                        <td className="py-1 pr-4">{BODY_NAMES[p.body]}</td>
                        <td className="py-1 pr-4 text-crt-bright">{formatLongitude(p.longitude)}</td>
                        <td className="py-1 pr-4 text-crt-dim">{p.house ? `house ${p.house}` : ""}</td>
                        <td className="py-1 pr-4 text-crt-amber">{p.retrograde ? "℞" : ""}</td>
                        <td className="py-1 text-crt-dim">
                          {dignities(p.body, p.sign, scheme).join(", ")}
                        </td>
                      </tr>
                    ))}
                    {result.chart.houses && (
                      <>
                        <tr className="border-t border-crt-line/40">
                          <td className="py-1 pr-2 text-crt-bright">AC</td>
                          <td className="py-1 pr-4">Ascendant</td>
                          <td className="py-1 text-crt-bright" colSpan={4}>
                            {formatLongitude(result.chart.houses.ascendant)}
                          </td>
                        </tr>
                        {pof !== undefined && (
                          <tr className="border-t border-crt-line/40">
                            <td className="py-1 pr-2 text-crt-bright">⊗</td>
                            <td className="py-1 pr-4">Part of Fortune</td>
                            <td className="py-1 text-crt-bright" colSpan={3}>
                              {formatLongitude(pof)}
                            </td>
                            <td className="py-1 text-crt-dim">
                              {isDayChart(
                                result.chart.positions.find((p) => p.body === "sun")!.longitude,
                                result.chart.houses.ascendant,
                              )
                                ? "day chart"
                                : "night chart"}
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="bg-crt-panel border border-crt-line rounded-lg p-4 overflow-x-auto">
                <h2 className="text-crt-dim text-xs mb-3 tracking-widest">ASPECTS</h2>
                <table className="w-full text-sm">
                  <tbody>
                    {result.chart.aspects.map((a, i) => (
                      <tr key={i} className="border-t border-crt-line/40">
                        <td className="py-1 pr-4">
                          {GLYPHS[a.a]} {BODY_NAMES[a.a]}
                        </td>
                        <td className="py-1 pr-4 text-crt-bright">{a.name}</td>
                        <td className="py-1 pr-4">
                          {GLYPHS[a.b]} {BODY_NAMES[a.b]}
                        </td>
                        <td className="py-1 pr-4 text-crt-dim">orb {a.orb.toFixed(1)}°</td>
                        <td className="py-1 text-crt-dim">{a.applying ? "applying" : "separating"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      <footer className="mt-10 text-xs text-crt-dim leading-relaxed max-w-3xl">
        <p>
          The astronomy is real (Swiss Ephemeris, arcsecond precision, running in your
          browser — nothing leaves this page). The meanings belong to a symbolic
          tradition, not to predictive science. Enjoy it the way the tradition deserves:
          curiously, and with both feet on the ground.
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
