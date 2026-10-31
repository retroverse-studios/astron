import type { Chart } from "@astron/core";
import {
  aiReading,
  DEFAULT_AI_MODEL,
  FLUENT_PROVENANCE,
  fluentPlacement,
  mergeContent,
  overridesNote,
  readChart,
  VOICES,
} from "@astron/interpret";
import { useState } from "react";
import type { LoadedNarrator } from "../lib/narrators";
import { narratorNoteText } from "../lib/narrators";
import type { OverridesApi } from "../lib/overrides-store";
import { BODY_NAMES, GLYPHS, button, input, panel } from "./glyphs";

type ReadingMode = "parts" | "fluent" | "ai";

function Part({ k, v }: { k: string; v: string }) {
  return (
    <p className="text-sm">
      <span className="inline-block w-24 text-crt-amber/80 text-xs tracking-widest uppercase">
        {k}
      </span>
      <span className="text-crt-text">{v}</span>
    </p>
  );
}

const SESSION_KEY = "astron.aiKey.session";
const REMEMBER_KEY = "astron.aiKey";

export function Reading({
  chart,
  scheme,
  overridesApi,
  narrator,
}: {
  chart: Chart;
  scheme: "modern" | "traditional";
  overridesApi: OverridesApi;
  narrator: LoadedNarrator;
}) {
  const [mode, setMode] = useState<ReadingMode>("parts");
  const [apiKey, setApiKey] = useState(
    () =>
      sessionStorage.getItem(SESSION_KEY) ??
      localStorage.getItem(REMEMBER_KEY) ??
      "",
  );
  const [rememberKey, setRememberKey] = useState(
    () => !!localStorage.getItem(REMEMBER_KEY),
  );
  const [model, setModel] = useState(DEFAULT_AI_MODEL);
  const [voice, setVoice] = useState("");
  const [customVoice, setCustomVoice] = useState("");
  const [aiText, setAiText] = useState<{ text: string; provenance: string }>();
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState<string>();
  // Narrator sets are complete alternative wordings; the user's personalised
  // passages are edits to the plain text, so they only apply there.
  const content =
    narrator.id === "plain"
      ? mergeContent(overridesApi.overrides)
      : narrator.content;
  const personalised =
    narrator.id === "plain"
      ? overridesNote(overridesApi.overrides)
      : narratorNoteText(narrator.id);
  const reading = readChart(chart, scheme, { content });

  function storeKey(value: string, remember: boolean) {
    // Session storage by default; local storage only on explicit opt-in.
    sessionStorage.setItem(SESSION_KEY, value);
    if (remember) localStorage.setItem(REMEMBER_KEY, value);
    else localStorage.removeItem(REMEMBER_KEY);
  }

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
        <option value="ai">
          AI live — your own key (data leaves this machine)
        </option>
      </select>
      {mode !== "ai" && narrator.id !== "plain" && (
        <span className="text-crt-dim text-xs tracking-widest">
          NARRATOR: {narrator.label}
        </span>
      )}
      {mode === "ai" && (
        <span className="text-crt-dim text-xs">
          (the NARRATOR setting applies to the parts &amp; fluent readings; AI
          mode uses its own VOICE below)
        </span>
      )}
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
              {fluentPlacement(p.body, p.sign, p.house, content)}
            </p>
          </div>
        ))}
        {personalised && (
          <p className="text-xs text-crt-amber leading-relaxed">
            {personalised}
          </p>
        )}
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
          This mode sends your chart data directly to Anthropic using your own
          API key — the only ASTRON feature that touches the network. The key is
          kept for this browser session only, unless you opt in to remembering
          it on this device.
        </p>
        <div className="flex flex-wrap gap-2">
          <input
            type="password"
            placeholder="sk-ant-… (your Anthropic API key)"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              storeKey(e.target.value, rememberKey);
            }}
            className={input + " flex-1 min-w-56"}
          />
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={input + " w-64"}
            title="model id"
          />
        </div>
        <label className="flex items-center gap-2 text-xs text-crt-dim">
          <input
            type="checkbox"
            checked={rememberKey}
            onChange={(e) => {
              setRememberKey(e.target.checked);
              storeKey(apiKey, e.target.checked);
            }}
          />
          remember the key on this device (local storage, plaintext — this
          session only if unticked)
        </label>
        <div className="flex flex-wrap gap-2 items-center">
          <label className="text-xs text-crt-dim tracking-widest">VOICE</label>
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className={input + " w-64"}
          >
            <option value="">house style (default)</option>
            {Object.entries(VOICES).map(([id, v]) => (
              <option key={id} value={id}>
                {v.label}
              </option>
            ))}
            <option value="custom">✍️ custom…</option>
          </select>
          {voice === "custom" && (
            <input
              placeholder='e.g. "a weary lighthouse keeper"'
              value={customVoice}
              onChange={(e) => setCustomVoice(e.target.value)}
              className={input + " flex-1 min-w-48"}
            />
          )}
          <button
            className={button}
            disabled={aiBusy || !apiKey}
            onClick={() => {
              setAiBusy(true);
              setAiError(undefined);
              const chosenVoice =
                voice === "custom"
                  ? customVoice || undefined
                  : voice || undefined;
              aiReading(chart, scheme, { apiKey, model, voice: chosenVoice })
                .then(setAiText)
                .catch((e: unknown) =>
                  setAiError(e instanceof Error ? e.message : String(e)),
                )
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
            {GLYPHS[r.position.body]} {BODY_NAMES[r.position.body]} in{" "}
            {r.position.sign}
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
      <h2 className="text-crt-dim text-xs tracking-widest pt-2">
        ASPECT READINGS (orb ≤ 4°)
      </h2>
      {reading.aspects.map((r, i) => (
        <div key={i} className="border-t border-crt-line/40 pt-2">
          <h3 className="text-crt-bright mb-1">
            {GLYPHS[r.aspect.a]} {BODY_NAMES[r.aspect.a]} {r.aspect.name}{" "}
            {GLYPHS[r.aspect.b]} {BODY_NAMES[r.aspect.b]}{" "}
            <span className="text-crt-dim text-sm">
              orb {r.aspect.orb.toFixed(1)}°
            </span>
          </h3>
          <Part k="pairing" v={r.pairing} />
          <Part k="light" v={r.lenses.light} />
          <Part k="truth" v={r.lenses.truth} />
          <Part k="shadow" v={r.lenses.shadow} />
        </div>
      ))}
      {personalised && (
        <p className="text-xs text-crt-amber leading-relaxed">{personalised}</p>
      )}
      <p className="text-xs text-crt-dim leading-relaxed border border-crt-line rounded p-3">
        {reading.disclaimer}
      </p>
    </div>
  );
}
