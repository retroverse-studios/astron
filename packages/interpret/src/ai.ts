import { formatLongitude, type Chart, type RulershipScheme } from "@astron/core";
import { readChart } from "./index.js";
import { fluentPlacement } from "./fluent.js";

export interface AiOptions {
  /** The user's own Anthropic API key — never stored or proxied by ASTRON. */
  apiKey: string;
  model?: string;
  /** Optional extra instruction, e.g. "focus on career" or "shorter". */
  emphasis?: string;
  /** A VOICES preset id, or free-text like "write as a weary lighthouse keeper". */
  voice?: string;
}

/**
 * Fun voice presets for the live-AI mode. A voice changes diction only —
 * the honesty rules (light AND shadow, no predictions, "in this tradition")
 * still bind, which is half the comedy.
 */
export const VOICES: Record<string, { label: string; instruction: string }> = {
  pirate: {
    label: "🏴‍☠️ Pirate captain",
    instruction:
      "a good-natured pirate captain — nautical metaphors, 'arr' and 'ye', the chart read as a treasure map, shadows as reefs to steer round",
  },
  bard: {
    label: "🎭 Shakespearean player",
    instruction:
      "a Shakespearean player — thee and thou, theatrical asides, rich Elizabethan imagery, and end the reading with a rhyming couplet",
  },
  bubble: {
    label: "✨ Bubblegum bestie",
    instruction:
      "a relentlessly bright, bubbly best friend — sparkle, superlatives, exclamation marks!! — who still names every shadow, just adorably",
  },
  professor: {
    label: "📚 Emeritus professor",
    instruction:
      "a dry emeritus professor of comparative symbology — precise, faintly weary, with parenthetical asides and the occasional sigh at the state of the field",
  },
  politician: {
    label: "🎤 Campaigning politician",
    instruction:
      "a campaigning politician — promises the strengths to every demographic, tries to pivot away from the shadows, and is nonetheless made to answer for each one",
  },
  noir: {
    label: "🌧 Noir detective",
    instruction:
      "a hardboiled noir detective — rain on the window, the chart spread out like a case file, every placement a suspect with a motive",
  },
  grandma: {
    label: "🍪 Loving grandmother",
    instruction:
      "a loving grandmother — tea and biscuits, gentle scolding for the shadows, unshakeable faith in the reader, everything ends with being fed",
  },
  sportscaster: {
    label: "📣 Sports commentator",
    instruction:
      "a breathless play-by-play sports commentator — the chart called like a live match, placements as players, aspects as passages of play",
  },
  robot: {
    label: "🤖 Extremely literal robot",
    instruction:
      "an extremely literal robot — deadpan compliance, numbered observations, accidental profundity, occasional reports on its own emotional subroutines",
  },
  dj: {
    label: "📻 Late-night cosmic DJ",
    instruction:
      "a velvet-voiced late-night radio DJ — the sky as tonight's setlist, placements as dedications going out to the listener, slow-jam pacing",
  },
};

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
  voice?: string,
): { system: string; user: string } {
  const voiceInstruction = voice ? (VOICES[voice]?.instruction ?? voice) : undefined;
  const system = voiceInstruction
    ? `${SYSTEM_PROMPT}\n\nVOICE OVERLAY: write in the voice of ${voiceInstruction}. The voice changes diction and imagery only — every honesty rule above still binds, in character.`
    : SYSTEM_PROMPT;
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
    system,
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
  const prompt = buildReadingPrompt(chart, scheme, options.emphasis, options.voice);
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
