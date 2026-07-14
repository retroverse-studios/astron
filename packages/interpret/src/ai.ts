import { formatLongitude, type Chart, type RulershipScheme } from "@astron/core";
import { readChart } from "./index.js";
import { fluentPlacement } from "./fluent.js";

export interface AiOptions {
  /** The user's own Anthropic API key — never stored or proxied by ASTRON. */
  apiKey: string;
  model?: string;
  /** Optional extra instruction, e.g. "focus on career" or "shorter". */
  emphasis?: string;
}

export const DEFAULT_AI_MODEL = "claude-haiku-4-5-20251001";

export function aiProvenance(model: string): string {
  return (
    `This reading was generated just now by ${model}, called directly with ` +
    "your own API key. This is the one ASTRON mode where chart data leaves " +
    "your machine — it went to Anthropic and nowhere else. AI prose can be " +
    "fluent and wrong in the same sentence: the placements above it are the " +
    "facts; this is an interpretation of an interpretation."
  );
}

const SYSTEM_PROMPT = `You write astrological readings for ASTRON, software whose defining value is honesty about what astrology is: a rich symbolic tradition, not a predictive science. House style, non-negotiable:
- Address the reader as "you". Warm, literate, specific; no mysticism-as-authority.
- Every theme gets light AND shadow — never flattery-only. No predictions, no medical/financial/legal advice, no "the universe wants".
- Say "in this tradition" or equivalent at least once; the sky supplies symbols, not verdicts.
- 350–550 words of flowing prose (no headers, no bullet lists), weaving the placements into a portrait rather than listing them.
- End with one sentence reminding the reader that what rings true and what doesn't are both information about them, not the sky.`;

/** Build the exact prompt ASTRON sends — exported so it can be shown to the user. */
export function buildReadingPrompt(
  chart: Chart,
  scheme: RulershipScheme,
  emphasis?: string,
): { system: string; user: string } {
  const reading = readChart(chart, scheme);
  const placements = reading.placements.map((r) => ({
    point: r.position.body,
    position: formatLongitude(r.position.longitude),
    sign: r.position.sign,
    house: r.position.house,
    retrograde: r.position.retrograde || undefined,
    archetype: r.archetype,
    lenses: r.sign,
    houseDomain: r.house,
    dignities: r.dignityNotes,
    fluentDraft: fluentPlacement(r.position.body, r.position.sign, r.position.house),
  }));
  const aspects = reading.aspects.map((r) => ({
    a: r.aspect.a,
    b: r.aspect.b,
    aspect: r.aspect.name,
    orb: Number(r.aspect.orb.toFixed(1)),
    pairing: r.pairing,
    lenses: r.lenses,
  }));
  return {
    system: SYSTEM_PROMPT,
    user:
      `Write the reading for this chart.${emphasis ? ` Emphasis requested by the reader: ${emphasis}.` : ""}\n\n` +
      JSON.stringify({ zodiac: chart.zodiac, placements, aspects }, null, 1),
  };
}

/**
 * Generate a fluent reading with the user's own key, straight to Anthropic
 * (no ASTRON server exists to proxy it). Works in browsers and Node.
 */
export async function aiReading(
  chart: Chart,
  scheme: RulershipScheme,
  options: AiOptions,
): Promise<{ text: string; provenance: string; model: string }> {
  const model = options.model ?? DEFAULT_AI_MODEL;
  const prompt = buildReadingPrompt(chart, scheme, options.emphasis);
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": options.apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1500,
      system: prompt.system,
      messages: [{ role: "user", content: prompt.user }],
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Anthropic API ${res.status}: ${body.slice(0, 300)}`);
  }
  const data = (await res.json()) as { content: { type: string; text?: string }[] };
  const text = data.content
    .filter((b) => b.type === "text" && b.text)
    .map((b) => b.text)
    .join("\n")
    .trim();
  if (!text) throw new Error("Anthropic API returned no text");
  return { text, provenance: aiProvenance(model), model };
}
