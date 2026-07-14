import type { AspectName, Body, Sign } from "@astron/core";
import type { Dignity } from "@astron/core";

/** Every sign and aspect is read through three lenses, never just one. */
export interface Lensed {
  /** The gift — what this looks like at its best. */
  light: string;
  /** The neutral archetype — what it actually is, before judgement. */
  truth: string;
  /** The blind spot — how the same energy misfires. */
  shadow: string;
}

export const PLANET_ARCHETYPES: Record<Body, string> = {
  sun: "the conscious will — what you are becoming when you are most yourself",
  moon: "the needs underneath — instinct, memory, what safety feels like",
  mercury: "the mind in motion — how you take in, connect, and say",
  venus: "what you find beautiful and how you draw it close",
  mars: "the engine — how you want, pursue, and defend",
  jupiter: "the appetite for more — growth, meaning, luck you make room for",
  saturn: "the load-bearing wall — limits, time, what you must build to keep",
  uranus: "the lightning — where you refuse the script",
  neptune: "the solvent — imagination, longing, the blur between self and sea",
  pluto: "the underworld engine — power, loss, and what regrows after",
  trueNode: "the direction of pull — appetite the soul hasn't satisfied yet",
  meanNode: "the direction of pull — appetite the soul hasn't satisfied yet",
  chiron: "the tender place — the wound that teaches you to heal others",
  meanLilith: "the refused — what was exiled and comes back untamed",
};

export const SIGN_LENSES: Record<Sign, Lensed> = {
  Aries: {
    light: "courage that moves first and figures the rest out en route",
    truth: "cardinal fire: ignition, the instinct to begin",
    shadow: "impatience that mistakes speed for progress and self for centre",
  },
  Taurus: {
    light: "steadiness, sensuality, the talent for making things last",
    truth: "fixed earth: holding, ripening, the value of the tangible",
    shadow: "inertia dressed up as loyalty; comfort held past its usefulness",
  },
  Gemini: {
    light: "quickness, curiosity, the gift of translation between worlds",
    truth: "mutable air: circulation, the pollination of ideas",
    shadow: "scatter; a cleverness that skims where it fears to dive",
  },
  Cancer: {
    light: "fierce shelter — the memory of the tribe kept warm",
    truth: "cardinal water: the tide that feeds and protects",
    shadow: "moods that fortify into walls; care that becomes control",
  },
  Leo: {
    light: "warmth that makes others feel more alive, not smaller",
    truth: "fixed fire: the hearth, the performance of the heart",
    shadow: "the need for applause eating the joy of the act itself",
  },
  Virgo: {
    light: "precision in service of what actually helps",
    truth: "mutable earth: harvest, discernment, the craft of improvement",
    shadow: "criticism that arrives before compassion; perfect as enemy of done",
  },
  Libra: {
    light: "grace, fairness, the art of making relationship beautiful",
    truth: "cardinal air: the scales, the initiating of balance",
    shadow: "peace purchased with your own unspoken preferences",
  },
  Scorpio: {
    light: "depth that does not flinch; loyalty unto the underworld",
    truth: "fixed water: pressure, intimacy, the transformation of what's held",
    shadow: "control, secrecy, the sting saved for the self",
  },
  Sagittarius: {
    light: "faith in the horizon — meaning found by going",
    truth: "mutable fire: the arrow, the widening circle",
    shadow: "the sermon that outruns the journey; truth used as escape",
  },
  Capricorn: {
    light: "the long climb done with dry humour and clean hands",
    truth: "cardinal earth: structure, ambition, time as material",
    shadow: "worth measured only in output; the summit that keeps receding",
  },
  Aquarius: {
    light: "clear-eyed distance in service of everyone's future",
    truth: "fixed air: the pattern seen from above, the circuit of the group",
    shadow: "principled coldness; loving humanity while dodging humans",
  },
  Pisces: {
    light: "porous compassion; the imagination that dissolves borders",
    truth: "mutable water: the return of all rivers, the unguarded door",
    shadow: "escape, martyrdom, the fog that avoids the necessary edge",
  },
};

export const HOUSE_DOMAINS: string[] = [
  "the mask and the doorway — body, presence, how life meets you",
  "what you keep — resources, worth, the ground under your feet",
  "the neighbourhood of the mind — siblings, errands, everyday words",
  "the taproot — home, lineage, the private floor of the self",
  "the playground — creation, romance, children, the courage to enjoy",
  "the workshop — craft, routines, health, the dignity of maintenance",
  "the mirror — partners, rivals, everyone who is not you",
  "the shared depths — other people's resources, debts, sex, grief, trust",
  "the far horizon — belief, study, journeys, the bigger map",
  "the summit — vocation, reputation, what you answer for in public",
  "the commons — friends, allies, movements, imagined futures",
  "the retreat — solitude, endings, the hidden work before rebirth",
];

export const ASPECT_LENSES: Record<AspectName, Lensed> = {
  conjunction: {
    light: "fusion — two functions acting as one amplified voice",
    truth: "no distance: these parts of you cannot see each other, only act together",
    shadow: "a blend so total neither part can be examined or turned off",
  },
  sextile: {
    light: "an open door — cooperation available whenever you reach for it",
    truth: "compatible elements offering opportunity, not guarantees",
    shadow: "the gift left unwrapped because it never forces the issue",
  },
  square: {
    light: "friction that builds engines — the aspect of earned strength",
    truth: "two agendas at cross-purposes demanding a construction, not a winner",
    shadow: "the same fight rerun until the lesson is finally taken",
  },
  trine: {
    light: "native talent — flow so easy it feels like weather",
    truth: "same-element harmony: support that asks nothing",
    shadow: "ease gone slack; the talent never sharpened because it never had to be",
  },
  opposition: {
    light: "perspective — the full moon view of your own polarity",
    truth: "a see-saw: two ends of one axis negotiating balance",
    shadow: "projection — meeting your own disowned end in other people",
  },
  semisextile: {
    light: "a slight adjacency that can be stitched with attention",
    truth: "neighbouring signs with nothing in common but the fence",
    shadow: "low-grade friction dismissed until it frays",
  },
  semisquare: {
    light: "an itch that keeps you honest",
    truth: "a minor square: irritation without full stakes",
    shadow: "chronic small grievance mistaken for personality",
  },
  sesquiquadrate: {
    light: "corrective torque — course adjustments earned midflight",
    truth: "square-family friction arriving at odd angles",
    shadow: "agitation whose source is hard to name, so it gets misassigned",
  },
  quincunx: {
    light: "the skill of living with what will not resolve",
    truth: "two functions with no shared language, permanently adjacent",
    shadow: "perpetual adjustment that never asks whether to renegotiate",
  },
  quintile: {
    light: "a signature flourish — pattern-making talent",
    truth: "fifth-harmonic creativity: style, craft, play",
    shadow: "cleverness performed for its own reflection",
  },
  biquintile: {
    light: "an elegant back-channel between distant talents",
    truth: "fifth-harmonic linkage across a wide arc",
    shadow: "gifts kept as private tricks rather than shared craft",
  },
};

export const DIGNITY_NOTES: Record<Dignity, string> = {
  domicile: "at home — this function speaks its native language here",
  exaltation: "an honoured guest — welcomed, amplified, occasionally over-praised",
  detriment: "an away game — more effort, and often more growth for it",
  fall: "a muted register — the function works, quietly and underestimated",
};

export const INTERPRETATION_DISCLAIMER =
  "These readings are assembled from labelled parts — archetype, sign, house, " +
  "aspect — and the parts are shown, because that is honestly how astrological " +
  "interpretation works. The lenses are prompts for reflection in an old " +
  "symbolic tradition, not measurements of you: keep what rings true, argue " +
  "with what doesn't, and notice that both reactions are yours, not the sky's.";
