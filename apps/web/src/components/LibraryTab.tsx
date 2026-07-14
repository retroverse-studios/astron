import { SIGNS, type AspectName, type Body, type Sign } from "@astron/core";
import { mergeContent, SHIPPED_CONTENT } from "@astron/interpret";
import { useRef, useState } from "react";
import type { OverridesApi } from "../lib/overrides-store";
import { BODY_NAMES, GLYPHS, buttonGhost, input, label as labelCls, panel } from "./glyphs";

const SECTIONS = ["planets", "signs", "houses", "aspects", "dignities", "fluent"] as const;
type Section = (typeof SECTIONS)[number];

const EDIT_BODIES: Body[] = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto", "trueNode", "chiron", "meanLilith"];
const EDIT_ASPECTS: AspectName[] = ["conjunction", "sextile", "square", "trine", "opposition", "semisextile", "semisquare", "sesquiquadrate", "quincunx", "quintile", "biquintile"];
const LENSES = ["light", "truth", "shadow"] as const;

function EditField({
  label,
  value,
  shipped,
  onChange,
}: {
  label: string;
  value: string;
  shipped: string;
  onChange: (v: string | null) => void;
}) {
  const edited = value !== shipped;
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <span className={labelCls}>
          {label}
          {edited && <span className="text-crt-amber ml-2">● personalised</span>}
        </span>
        {edited && (
          <button type="button" className="text-xs text-crt-dim underline" onClick={() => onChange(null)}>
            restore shipped text
          </button>
        )}
      </div>
      <textarea
        value={value}
        rows={Math.max(2, Math.ceil(value.length / 80))}
        onChange={(e) => onChange(e.target.value === shipped ? null : e.target.value)}
        className={input + " leading-relaxed" + (edited ? " border-crt-amber/60" : "")}
      />
    </div>
  );
}

export function LibraryTab({ api }: { api: OverridesApi }) {
  const [section, setSection] = useState<Section>("planets");
  const [sign, setSign] = useState<Sign>("Aries");
  const [aspect, setAspect] = useState<AspectName>("conjunction");
  const [fluentBody, setFluentBody] = useState<Body>("sun");
  const fileRef = useRef<HTMLInputElement>(null);
  const merged = mergeContent(api.overrides);

  return (
    <div className="space-y-6">
      <div className={panel + " p-4 space-y-3"}>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-crt-dim text-xs tracking-widest">THE TEXT LIBRARY</h2>
          <span className="text-xs text-crt-amber">
            {api.count ? `${api.count} passage${api.count === 1 ? "" : "s"} personalised` : "all text as shipped"}
          </span>
          <span className="flex-1" />
          <button
            type="button"
            className={buttonGhost + " text-xs"}
            onClick={() => {
              const a = document.createElement("a");
              a.href = URL.createObjectURL(new Blob([api.exportJson()], { type: "application/json" }));
              a.download = "astron-text-overrides.json";
              a.click();
              URL.revokeObjectURL(a.href);
            }}
          >
            EXPORT
          </button>
          <button type="button" className={buttonGhost + " text-xs"} onClick={() => fileRef.current?.click()}>
            IMPORT
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              void f.text().then((t) => {
                try {
                  api.importJson(t);
                } catch (err) {
                  alert(`Could not import: ${err instanceof Error ? err.message : String(err)}`);
                }
              });
              e.target.value = "";
            }}
          />
          <button
            type="button"
            className={buttonGhost + " text-xs"}
            disabled={!api.count}
            onClick={() => {
              if (confirm("Restore ALL shipped text? Your personalised passages will be discarded (export first if unsure).")) {
                api.clearAll();
              }
            }}
          >
            RESTORE ALL
          </button>
        </div>
        <p className="text-xs text-crt-dim leading-relaxed">
          Every passage ASTRON uses in readings is editable here. Your words are stored on this
          machine only, marked as personalised wherever they appear, and the shipped text is always
          one click away. Export before big experiments; import merges nothing — it replaces.
        </p>
        <div className="flex flex-wrap gap-1">
          {SECTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSection(s)}
              className={
                "px-3 py-1 text-xs tracking-widest rounded " +
                (section === s ? "bg-crt-line/60 text-crt-bright" : "text-crt-dim hover:text-crt-text")
              }
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className={panel + " p-4 space-y-4"}>
        {section === "planets" &&
          EDIT_BODIES.map((b) => (
            <EditField
              key={b}
              label={`${GLYPHS[b]} ${BODY_NAMES[b]}`}
              value={merged.planetArchetypes[b]}
              shipped={SHIPPED_CONTENT.planetArchetypes[b]}
              onChange={(v) => api.setEntry("planetArchetypes", b, null, v)}
            />
          ))}

        {section === "signs" && (
          <>
            <select value={sign} onChange={(e) => setSign(e.target.value as Sign)} className={input + " w-56"}>
              {SIGNS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            {LENSES.map((lens) => (
              <EditField
                key={sign + lens}
                label={`${sign} — ${lens.toUpperCase()}`}
                value={merged.signLenses[sign][lens]}
                shipped={SHIPPED_CONTENT.signLenses[sign][lens]}
                onChange={(v) => api.setEntry("signLenses", sign, lens, v)}
              />
            ))}
          </>
        )}

        {section === "houses" &&
          merged.houseDomains.map((text, i) => (
            <EditField
              key={i}
              label={`House ${i + 1}`}
              value={text}
              shipped={SHIPPED_CONTENT.houseDomains[i]!}
              onChange={(v) => api.setEntry("houseDomains", String(i + 1), null, v)}
            />
          ))}

        {section === "aspects" && (
          <>
            <select value={aspect} onChange={(e) => setAspect(e.target.value as AspectName)} className={input + " w-56"}>
              {EDIT_ASPECTS.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
            {LENSES.map((lens) => (
              <EditField
                key={aspect + lens}
                label={`${aspect} — ${lens.toUpperCase()}`}
                value={merged.aspectLenses[aspect][lens]}
                shipped={SHIPPED_CONTENT.aspectLenses[aspect][lens]}
                onChange={(v) => api.setEntry("aspectLenses", aspect, lens, v)}
              />
            ))}
          </>
        )}

        {section === "dignities" &&
          (["domicile", "exaltation", "detriment", "fall"] as const).map((d) => (
            <EditField
              key={d}
              label={d}
              value={merged.dignityNotes[d]}
              shipped={SHIPPED_CONTENT.dignityNotes[d]}
              onChange={(v) => api.setEntry("dignityNotes", d, null, v)}
            />
          ))}

        {section === "fluent" && (
          <>
            <p className="text-xs text-crt-dim">
              The fluent set: one paragraph per planet-in-sign, originally AI-written (disclosed
              in-app). Edit any of them and they become yours.
            </p>
            <select
              value={fluentBody}
              onChange={(e) => setFluentBody(e.target.value as Body)}
              className={input + " w-56"}
            >
              {EDIT_BODIES.map((b) => (
                <option key={b} value={b}>
                  {GLYPHS[b]} {BODY_NAMES[b]}
                </option>
              ))}
            </select>
            {SIGNS.map((s) => (
              <EditField
                key={fluentBody + s}
                label={`${GLYPHS[fluentBody]} ${BODY_NAMES[fluentBody]} in ${s}`}
                value={merged.fluentPlacements[fluentBody][s]}
                shipped={SHIPPED_CONTENT.fluentPlacements[fluentBody][s]}
                onChange={(v) => api.setEntry("fluentPlacements", fluentBody, s, v)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
