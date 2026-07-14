import type { Body, Sign } from "@astron/core";
import { HOUSE_DOMAINS } from "./content.js";

/**
 * The built-in fluent set: one short paragraph per planet-in-sign,
 * AI-generated ONCE (by Claude, during ASTRON's development), human-reviewed,
 * and shipped as static content. It never changes at runtime and needs no
 * network. FLUENT_PROVENANCE must be shown wherever this text is rendered.
 */
export const FLUENT_PROVENANCE =
  "This text comes from ASTRON's built-in fluent set: written once by an AI " +
  "(Claude), reviewed, and shipped with the app. It is not personalised — " +
  "everyone with this placement sees these same words. The tradition supplies " +
  "the symbols; the prose is machine-made; the judgement is yours.";

type SignSet = Record<Sign, string>;

const SUN: SignSet = {
  Aries: "You are most yourself at the moment of beginning. Identity here is a verb — struck like a match, renewed by every fresh start — and the work is finishing what the spark began.",
  Taurus: "Selfhood ripens slowly and holds. You become who you are by tending what lasts, and the risk worth watching is mistaking comfort for completion.",
  Gemini: "You are made of questions and quick bridges. Identity lives in the exchange — telling, hearing, connecting — and deepens the day curiosity stops skimming.",
  Cancer: "The self is a shoreline: protective, tidal, deeply memoried. You become who you are by sheltering what you love, and grow when the shell learns to open as well as close.",
  Leo: "You carry a hearth in the chest. Radiance is the job — warming a room into life — and it matures when the shine no longer needs the applause.",
  Virgo: "You become yourself through craft: noticing, refining, making things actually work. The gift sharpens into service when the inner critic learns to bless what is good enough.",
  Libra: "Identity forms in the space between people — you know yourself best mid-relationship. Grace is real power here, so long as your own preference survives the peacemaking.",
  Scorpio: "You are built for depth and allergic to the surface. Selfhood is forged in intensity and renewal, and it frees itself the day control loosens into trust.",
  Sagittarius: "You are the arrow and the horizon at once. Meaning is your fuel — found by going — and the journey ripens when the preaching gives way to the pilgrimage.",
  Capricorn: "You become yourself by building something that outlasts the mood. Mastery and time are your materials; the summit means most when worth stops being measured in output alone.",
  Aquarius: "Identity here stands slightly outside the circle, seeing the pattern. You are most yourself serving a future others can't yet picture — warmest when the ideals include actual people.",
  Pisces: "The self here has porous borders and a long tide. You become who you are through compassion and imagination, and stand strongest when the softness finds its own edge.",
};

const MOON: SignSet = {
  Aries: "Feelings arrive fast, burn clean, and leave little ash. You are safest when you can act on emotion immediately — the practice is pausing without smothering the flame.",
  Taurus: "You are fed by steadiness: familiar food, familiar arms, the unhurried hour. Security is sensory and real here, and it deepens when routine stays nourishment rather than fortress.",
  Gemini: "You metabolise feeling by talking it through. Safety is a good conversation, and the heart settles once the words stop circling and land.",
  Cancer: "The needs here are the classic ones, felt at full tide: belonging, memory, home. You read moods like weather — your own storms included — and shelter others as instinct.",
  Leo: "You need to be seen to feel safe, and there is no shame in it. Warmth received becomes warmth radiated; unwitnessed, the heart dims and performs instead.",
  Virgo: "You soothe yourself by making things right — a tidied room is a tidied mind. Care arrives as usefulness, and rests easier when it isn't audited.",
  Libra: "Equilibrium is your comfort food; conflict lands in the body. You are fed by beauty and fairness, and grow sturdy when peace no longer costs your honesty.",
  Scorpio: "Feelings run deep, silent, and total here. Trust is expensive and worth it; the instinct to guard the well can also seal it.",
  Sagittarius: "You are nourished by open doors and long views. Confinement reads as danger; the practice is finding the horizon inside the commitment.",
  Capricorn: "Feeling arrives with a chaperone here — measured, translated into duty. The tenderness is real and runs deep; it asks for permission to need without earning first.",
  Aquarius: "You process emotion from one step back, which is a skill and a habit. Belonging to everyone can dodge belonging to someone; the cool air warms with practice.",
  Pisces: "You feel the room before you enter it. Boundaries between your weather and everyone else's blur — the gift is compassion, the discipline is knowing whose tide is whose.",
};

const MERCURY: SignSet = {
  Aries: "Thought moves like a struck flint — first word in the room, sometimes before the room is ready. The mind is decisive and brave, and listens best on purpose.",
  Taurus: "You think in geology: slow layers, firm conclusions. What you learn, you keep; the same grip that holds knowledge can hold an outdated map.",
  Gemini: "The mind is at home — quick, plural, delighted. You connect anything to anything; depth is a choice this brilliance has to keep making.",
  Cancer: "You think with the memory and speak from the tide. Facts arrive wrapped in feeling, which makes you persuasive — and makes checking the wrapping worthwhile.",
  Leo: "Ideas arrive dressed for the stage. You narrate, and beautifully; the craft matures when being interesting stops outranking being accurate.",
  Virgo: "The mind is a fine instrument, calibrated for what's fixable. Analysis is love in this dialect — kindest when the red pen rests sometimes.",
  Libra: "You think in dialogues and weigh every side. Judgement here is genuinely fair and famously slow; some scales only settle when you place your own weight on them.",
  Scorpio: "The mind is an investigator — quiet, thorough, unfoolable. You hear what isn't said; the skill turns lonely when everything becomes evidence.",
  Sagittarius: "You think in maps, morals, and punchlines. The big picture comes naturally; the fine print is a discipline worth borrowing.",
  Capricorn: "Thought is structural here: what bears load, what won't. You speak little and build much — and the dry humour is a feature, not a leak.",
  Aquarius: "The mind runs on pattern and principle, comfortable far from consensus. You see the system whole; translation to the humans inside it is the art.",
  Pisces: "You think in images, osmosis, and tide. Logic arrives late but insight arrives early; the notebook by the bed is load-bearing equipment.",
};

const VENUS: SignSet = {
  Aries: "Desire is direct here — you love like a declaration. The chase delights you; the keeping asks for a different courage.",
  Taurus: "Love is at home in the body and the garden. You attach slowly, sensually, for keeps — and the holding is loveliest with the grip relaxed.",
  Gemini: "Attraction begins at the conversation. Variety is not fickleness here, it is appetite for the mind's company; the deepening is a choice made twice a day.",
  Cancer: "You love by feeding, keeping, remembering. Devotion pools deep; it stays sweet when care asks first what the other actually needs.",
  Leo: "Love is theatre in the best sense — generous, loyal, lit. You give magnificently and wilt without notice; say so, rather than dimming.",
  Virgo: "Affection here is practical devotion: the fixed hinge, the packed lunch, the noticed detail. It is love, entire — let it also be received.",
  Libra: "Venus rules here: harmony, beauty, the artistry of the pair. You make relationship an art form; keep one brushstroke that is only yours.",
  Scorpio: "You love at depth or not at all. Intimacy is the true currency; the vault keeps treasure and, unwatched, keeps score.",
  Sagittarius: "Love needs a horizon here — a shared journey beats a shared sofa. Freedom is the love language; make sure the other dialect gets spoken too.",
  Capricorn: "You love in commitments, not confetti. Time is the proof and the gift; let delight be allowed in before it's earned.",
  Aquarius: "Affection begins in friendship and keeps its airspace. You love the whole person, oddities first; closeness grows when distance stops being the default reply.",
  Pisces: "You love the way water loves — totally, formlessly, sometimes past the point of self. Exalted here: the compassion is real magic, and it works best with a shore.",
};

const MARS: SignSet = {
  Aries: "The engine is at home: ignition without hesitation. You fight clean and forget fast; the finish line deserves the same passion as the start.",
  Taurus: "Force moves slowly here and cannot be moved back. Patience is your weapon; so is stubbornness, and only one of them chooses.",
  Gemini: "You fence with words and win on agility. Scattered fire lights nothing twice — aimed, this quickness is formidable.",
  Cancer: "Drive here is tidal and protective — slow to anger, total in defence of its own. Sideways anger costs more than the direct kind; practise the direct kind.",
  Leo: "You act from the heart with the volume up. Courage is native; the performance of courage is the counterfeit to refuse.",
  Virgo: "Effort is precise here — energy spent like a scalpel, not a hammer. You win by craft; perfection is the ambush to walk past.",
  Libra: "You fight for fairness and hate the fighting. Grace under conflict is real strength; deciding is the muscle that needs the gym.",
  Scorpio: "Traditional ruler at full depth: will like pressure at the ocean floor. You outlast everyone; make sure the campaign is still worth the siege.",
  Sagittarius: "Drive needs a quest here. You act for meaning and travel light; scattershot crusades are the tax on that fire.",
  Capricorn: "Exalted: ambition with an engineer's patience. You climb in all weather; remember to notice the view you fought for.",
  Aquarius: "You fight for the group and from the perimeter — strategy over heat. Detachment wins wars and loses evenings; choose per occasion.",
  Pisces: "Will moves like current here — indirect, persistent, dissolving obstacles rather than breaking them. Name the goal, or the current serves someone else's.",
};

const JUPITER: SignSet = {
  Aries: "Growth comes by daring first. Your luck is at the front of the line — generosity of nerve, spent best on beginnings that get finished.",
  Taurus: "Abundance grows like an orchard here: slowly, then dependably. The faith is in the tangible; the pruning is part of the tending.",
  Gemini: "You expand by connecting everything. In detriment, breadth outruns depth easily — the library grows; let some books get finished.",
  Cancer: "Exalted: growth through shelter. Generosity pours out as care and multiplies; the feast means most when you also take a chair.",
  Leo: "Faith wears its brightest coat here. You grow by giving heart at scale — magnanimity is the luck, vanity the leak.",
  Virgo: "Growth by increments, meaning in maintenance. In detriment, the big picture arrives via small correct steps — trust the accumulation.",
  Libra: "You expand through partnership and fairness; luck arrives introduced by someone. Justice is the philosophy — practise it on yourself too.",
  Scorpio: "Growth happens in the depths here: through crisis survived, truth faced, trust rebuilt. The treasure is real and the descent is the price.",
  Sagittarius: "At home: the horizon fund is fully vested. Meaning multiplies when travelled toward; the sermon stays honest while the journey continues.",
  Capricorn: "In fall, faith submits to audit — growth must show its working. What survives the scrutiny is durable optimism, the rarest kind.",
  Aquarius: "You grow by widening the circle. The luck is collective — visions that lift everyone — and it lands when the future includes the present.",
  Pisces: "Traditional ruler at high tide: faith without walls. Compassion expands everything it touches; the boundary is what keeps the sea a gift.",
};

const SATURN: SignSet = {
  Aries: "In fall, the brake and the accelerator share a foot. Discipline must learn to move at speed — hesitation studied until it becomes timing.",
  Taurus: "You build slowly and to last. Security is the project of decades; the lesson is that enough, eventually, must be allowed to be enough.",
  Gemini: "Structure comes to the mind here: speech weighed, learning earned. The wall against scatter becomes a library, given time.",
  Cancer: "In detriment, the wall runs through the home. Feeling and duty negotiate; the mature treaty lets tenderness be structural too.",
  Leo: "In detriment, the crown is heavy and the applause suspect. The work is shining without permission — authority earned past the fear of the stage.",
  Virgo: "Discipline finds its workshop. Standards are high and mostly met; mercy is the tool missing from the top drawer.",
  Libra: "Exalted: justice with a spine. You build fairness that holds under load — commitments as architecture, kindness with terms.",
  Scorpio: "Structure meets the depths: control tested against the uncontrollable. What survives is unshakeable; what must be released was never holdable.",
  Sagittarius: "The far horizon gets a survey team. Faith is examined, then load-bearing; the journey gains a map it can trust.",
  Capricorn: "At home: time, gravity, and the long climb all report to you. Mastery is native — the mountain is real, and so is the schedule for resting.",
  Aquarius: "Traditional ruler: the pattern gets engineering. You build for the future's people; the blueprint warms when they're consulted.",
  Pisces: "Structure in the water: hard here, and precious. The work is giving the boundless a container it consents to — banks, not dams.",
};

const URANUS: SignSet = {
  Aries: "The lightning takes the lead: rebellion as first instinct. Breakthroughs come fast; revolutions need a second week.",
  Taurus: "In fall by tradition, the awakener meets the immovable. Change arrives through the ground itself — slow revolutions, permanent.",
  Gemini: "The mind electrifies: ideas arrive in storms and networks. Genius is native; follow-through is imported.",
  Cancer: "The lightning strikes home — family scripts interrupted, roots rewired. Freedom and belonging learn to share a house.",
  Leo: "In detriment, the rebel wants a throne. The authentic performance breaks every format; the trap is being different for the mirror.",
  Virgo: "Revolution by refinement: systems debugged, work reinvented. The radical act here is the improved routine.",
  Libra: "Partnership gets renegotiated from first principles. Fairness demands originality; the experiment is commitment without the cage.",
  Scorpio: "Exalted by tradition: the awakener in the depths. Transformation arrives as rupture and proves to be rescue.",
  Sagittarius: "Belief systems get struck by weather. The heresy is usually early truth; aim it, and it becomes a curriculum.",
  Capricorn: "The lightning audits the establishment. Structures are broken precisely — the rebel with a spreadsheet, the reform that holds.",
  Aquarius: "At home: the future speaks in native tongue. The pattern-breaker serves the group; the distance from the crowd is the vantage, not the wall.",
  Pisces: "The awakener dissolves into the water table: intuition electrified. Visions arrive unscheduled — the practice is writing them down.",
};

const NEPTUNE: SignSet = {
  Aries: "The dream wants a spearhead. Ideals arrive with adrenaline; the crusade is holy exactly as long as it stays honest.",
  Taurus: "The mist settles on the material: beauty found in the tangible, money touched by fantasy. Enchantment is lovely; appraisals still matter.",
  Gemini: "Language turns to watercolour. Stories persuade beyond their facts here — a poet's gift with a fact-checker's homework.",
  Cancer: "The longing is for the original home. Memory idealises; the compassion for family is real, and so is the fog around it.",
  Leo: "Glamour in the classic sense: the shine that borrows from dream. Creativity is genuinely inspired; the audience is genuinely imagined.",
  Virgo: "In detriment, the boundless meets the checklist. Service becomes devotion — the sacred found in the useful, once perfection stops posing as holiness.",
  Libra: "The ideal of the perfect other, projected in high resolution. Real love arrives when the projector dims and the person remains.",
  Scorpio: "The solvent works at depth: obsession, mysticism, desire past its own explanations. The undertow is strong; so is what it teaches.",
  Sagittarius: "Faith without borders, journey without maps. The vision is genuinely vast — the discernment is which horizon is real.",
  Capricorn: "The dream meets the institution: idealism about structures, disillusion as curriculum. What survives is the workable vision.",
  Aquarius: "Utopia gets a schematic. Collective dreams run bright and impersonal; the humans in the diagram need names.",
  Pisces: "At home: the ocean, undiluted. Imagination, compassion, and dissolution at full strength — the raft of routine is not optional.",
};

const PLUTO: SignSet = {
  Aries: "Power expresses as raw initiative: destroy, begin, repeat. The furnace is enormous — pointed well, it clears land; pointed badly, it just burns.",
  Taurus: "In detriment, transformation grinds against permanence. What must change will change the slow way — through the foundations.",
  Gemini: "The underworld enters the conversation: words that expose, information as power. The depth charge is a question.",
  Cancer: "Power runs through the roots — family, nation, tribe, remade under pressure. The grip that protects can also entomb; the renewal starts at home.",
  Leo: "The will to shine becomes the will to matter. Creative force at plutonic pressure — the ego's death and the heart's return, on stage.",
  Virgo: "Transformation through the meticulous: systems purged, work remade, health rebuilt from the cell up. The humble domain hides the deepest overhaul.",
  Libra: "Power surfaces in the mirror: relationships as crucibles. The balance of power is the actual subject; fairness, the actual revolution.",
  Scorpio: "At home: the underworld with the lights on. Regeneration is the native art — nothing held that hasn't survived the fire.",
  Sagittarius: "Beliefs get the deep excavation. Dogma dies, meaning regenerates; the truth that survives its own funeral is yours.",
  Capricorn: "The structures themselves go into the crucible: institutions, ambitions, authority composted and rebuilt. Power learns accountability or learns collapse.",
  Aquarius: "The collective current runs at high voltage: systems, networks, futures transformed wholesale. The group's shadow is the group's material.",
  Pisces: "The deep and the boundless merge: dissolution as transformation. What regrows here regrows everywhere the water reaches.",
};

const NODE: SignSet = {
  Aries: "The pull is toward selfhood: daring to want, alone if needed. The familiar comfort of accommodating everyone is the past; the appetite is for your own name.",
  Taurus: "The pull is toward the simple and the solid: your own values, your own ground. Drama is the old country; peace is the frontier.",
  Gemini: "The pull is toward curiosity over certainty: asking, learning, staying for the answer. The sermon is behind you; the conversation is ahead.",
  Cancer: "The pull is toward the hearth: feeling, belonging, letting yourself be fed. The summit was last life's business; the home is this one's.",
  Leo: "The pull is toward the centre of your own stage: creating, risking, being seen. The safe anonymity of the crowd is the habit to outgrow.",
  Virgo: "The pull is toward craft and the useful day: order as devotion. The fog was comfortable; the checklist, surprisingly, is the spiritual path.",
  Libra: "The pull is toward the other: partnership, fairness, the art of with. Going it alone is mastered already — the frontier is company.",
  Scorpio: "The pull is toward the depths: intimacy, shared resources, transformation over accumulation. The comfortable surface is the outgrown shell.",
  Sagittarius: "The pull is toward meaning: the long journey, the honest philosophy. The gossip and the errands are yesterday's homework.",
  Capricorn: "The pull is toward standing accountable: building, mattering, weathering. The tide of moods is the old home; the mountain is the new one.",
  Aquarius: "The pull is toward the wide circle: causes, colleagues, futures. The private stage is well-rehearsed; the commons is calling.",
  Pisces: "The pull is toward surrender: trust, imagination, the unplanned. The spreadsheet of the self is complete; the sea is the syllabus.",
};

const CHIRON: SignSet = {
  Aries: "The tender place is the right to exist at full volume. Doubt about your own daring becomes, tended, a gift for stirring courage in others.",
  Taurus: "The wound is about enough — worth, safety, the ground under you. Healed slowly, it becomes the steadiest hand others know.",
  Gemini: "The sore spot is the voice: being heard, being believed. The one who struggled to say it becomes the one who teaches saying.",
  Cancer: "The ache is around belonging and being mothered. What you needed and organise for others becomes, in time, yours to receive.",
  Leo: "The wound is around shining: praise withheld, or given for the wrong self. The healing performance is the unguarded one.",
  Virgo: "The tender place is being useful enough to deserve a place. The healer's healing is discovering worth precedes work.",
  Libra: "The wound walks in through relationship: chosen last, kept off-balance. The medicine you carry is fairness that includes yourself.",
  Scorpio: "The sore place is trust betrayed at depth. Survived and tended, it reads others' depths with a surgeon's kindness.",
  Sagittarius: "The wound is around meaning: faith broken, questions punished. The teacher you become holds the question open for others.",
  Capricorn: "The ache is legitimacy: never quite enough authority, recognition, standing. The mastery you build anyway becomes the mentorship you needed.",
  Aquarius: "The tender place is the edge of the group — the odd one, tolerated. The gift matured is making rooms where no one is.",
  Pisces: "The wound is boundless: everyone's pain arriving as yours. The healing is a shoreline — compassion with a body attached.",
};

const LILITH: SignSet = {
  Aries: "What was exiled is the raw want — anger, appetite, the unapologetic first move. It returns as clean fire when finally invited to the table.",
  Taurus: "The refused thing is pleasure without permission. The body keeps its own counsel here; owned, it becomes unshakeable ground.",
  Gemini: "The banished voice is the unsayable said plainly. It returns as wit with teeth — the truth-telling this chart was warned about.",
  Cancer: "What was exiled is the need itself — hunger for care called too much. Reclaimed, it feeds without apology and mothers without martyrdom.",
  Leo: "The refused thing is the full spotlight. The shine that was called vanity returns as sovereignty when it stops asking.",
  Virgo: "The banishment was of imperfection: mess, appetite, the unoptimised self. Its return makes the standards humane.",
  Libra: "What was exiled is the unaccommodating no. It comes back as fairness with a spine — beauty that doesn't barter.",
  Scorpio: "The refused thing is power at full depth: desire, rage, the uncensored current. Owned, it stops leaking and starts steering.",
  Sagittarius: "The banished voice is the heresy — the belief that didn't fit the church. It returns as a philosophy with your fingerprints.",
  Capricorn: "What was exiled is ambition in its naked form. Reclaimed from shame, it builds without asking whose permission.",
  Aquarius: "The refused thing is the true strangeness — the difference beyond the acceptable eccentric. Owned, it stops performing and starts leading.",
  Pisces: "What was exiled is the boundless self — called dreamy, called too much, called away. It returns as vision the daylight can use.",
};

export const FLUENT_PLACEMENTS: Record<Body, SignSet> = {
  sun: SUN,
  moon: MOON,
  mercury: MERCURY,
  venus: VENUS,
  mars: MARS,
  jupiter: JUPITER,
  saturn: SATURN,
  uranus: URANUS,
  neptune: NEPTUNE,
  pluto: PLUTO,
  trueNode: NODE,
  meanNode: NODE,
  chiron: CHIRON,
  meanLilith: LILITH,
};

/** The fluent paragraph for a placement, with the house clause appended. */
export function fluentPlacement(body: Body, sign: Sign, house?: number): string {
  const base = FLUENT_PLACEMENTS[body][sign];
  return house
    ? `${base} In this chart it plays out in the ${ordinal(house)} house — ${HOUSE_DOMAINS[house - 1]}.`
    : base;
}

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
}
