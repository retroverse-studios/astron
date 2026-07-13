import {
  dignities,
  formatLongitude,
  isDayChart,
  partOfFortune,
  type Aspect,
  type Chart,
  type RulershipScheme,
} from "@astron/core";
import { BODY_NAMES, GLYPHS, panel } from "./glyphs";

export function WheelBox({ svg }: { svg: string }) {
  return (
    <div
      className={panel + " p-2 [&_svg]:w-full [&_svg]:h-auto"}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export function AspectTable({
  aspects,
  title = "ASPECTS",
  showApplying = true,
  pairLabels,
}: {
  aspects: Aspect[];
  title?: string;
  showApplying?: boolean;
  /** e.g. ["A's", "B's"] for synastry columns. */
  pairLabels?: [string, string];
}) {
  if (!aspects.length) return null;
  return (
    <div className={panel + " p-4 overflow-x-auto"}>
      <h2 className="text-crt-dim text-xs mb-3 tracking-widest">{title}</h2>
      <table className="w-full text-sm">
        <tbody>
          {aspects.map((a, i) => (
            <tr key={i} className="border-t border-crt-line/40">
              <td className="py-1 pr-4">
                {pairLabels?.[0]} {GLYPHS[a.a]} {BODY_NAMES[a.a]}
              </td>
              <td className="py-1 pr-4 text-crt-bright">{a.name}</td>
              <td className="py-1 pr-4">
                {pairLabels?.[1]} {GLYPHS[a.b]} {BODY_NAMES[a.b]}
              </td>
              <td className="py-1 pr-4 text-crt-dim">orb {a.orb.toFixed(1)}°</td>
              {showApplying && (
                <td className="py-1 text-crt-dim">{a.applying ? "applying" : "separating"}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PlanetTable({
  chart,
  scheme,
}: {
  chart: Chart;
  scheme: RulershipScheme;
}) {
  const pof = partOfFortune(chart);
  const sun = chart.positions.find((p) => p.body === "sun");
  return (
    <div className={panel + " p-4 overflow-x-auto"}>
      <h2 className="text-crt-dim text-xs mb-3 tracking-widest">PLANETS</h2>
      <table className="w-full text-sm">
        <tbody>
          {chart.positions.map((p) => (
            <tr key={p.body} className="border-t border-crt-line/40">
              <td className="py-1 pr-2 text-crt-bright">{GLYPHS[p.body]}</td>
              <td className="py-1 pr-4">{BODY_NAMES[p.body]}</td>
              <td className="py-1 pr-4 text-crt-bright">{formatLongitude(p.longitude)}</td>
              <td className="py-1 pr-4 text-crt-dim">{p.house ? `house ${p.house}` : ""}</td>
              <td className="py-1 pr-4 text-crt-amber">{p.retrograde ? "℞" : ""}</td>
              <td className="py-1 text-crt-dim">{dignities(p.body, p.sign, scheme).join(", ")}</td>
            </tr>
          ))}
          {chart.houses && (
            <tr className="border-t border-crt-line/40">
              <td className="py-1 pr-2 text-crt-bright">AC</td>
              <td className="py-1 pr-4">Ascendant</td>
              <td className="py-1 text-crt-bright" colSpan={4}>
                {formatLongitude(chart.houses.ascendant)}
              </td>
            </tr>
          )}
          {chart.houses && pof !== undefined && sun && (
            <tr className="border-t border-crt-line/40">
              <td className="py-1 pr-2 text-crt-bright">⊗</td>
              <td className="py-1 pr-4">Part of Fortune</td>
              <td className="py-1 text-crt-bright" colSpan={3}>
                {formatLongitude(pof)}
              </td>
              <td className="py-1 text-crt-dim">
                {isDayChart(sun.longitude, chart.houses.ascendant) ? "day chart" : "night chart"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function Notices({ notes }: { notes: (string | undefined | false)[] }) {
  const shown = notes.filter((n): n is string => !!n);
  if (!shown.length) return null;
  return (
    <div className="space-y-1">
      {shown.map((n) => (
        <p key={n} className="text-crt-amber text-xs">
          {n}
        </p>
      ))}
    </div>
  );
}
