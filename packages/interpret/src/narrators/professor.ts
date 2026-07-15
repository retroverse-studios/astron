import type { Sign } from '@astron/core';
import type { ContentSet } from '../overrides.js';

/**
 * 🎓 Emeritus professor of comparative symbology — a complete alternative
 * content set. Same meaning entry-for-entry as the shipped text, different
 * diction; the honesty rules still bind, in character. (One does try.)
 */

const SUN: Record<Sign, string> = {
  Aries: 'One is most oneself at the moment of commencement. Identity here is a verb — struck like a match, renewed by each fresh start — and the assignment (invariably neglected) is finishing what the spark began.',
  Taurus: 'Selfhood ripens slowly and holds. One becomes who one is by tending what lasts, and the hazard worth noting is the perennial confusion of comfort with completion.',
  Gemini: 'One is composed of questions and quick bridges. Identity resides in the exchange — telling, hearing, connecting — and deepens on the day (long deferred) that curiosity ceases merely to skim.',
  Cancer: 'The self is a shoreline: protective, tidal, densely memoried. One becomes who one is by sheltering what one loves, and matures when the shell learns to open as readily as it closes.',
  Leo: 'One carries a hearth in the chest. Radiance is the office — warming a room into life — and it matures, at length, when the shine no longer requires the applause.',
  Virgo: 'One becomes oneself through craft: noticing, refining, making the thing actually function. The gift ripens into service the moment the inner critic consents to bless what is merely good enough.',
  Libra: 'Identity forms in the interval between persons — one knows oneself best mid-relationship. Grace is genuine power here, provided (a large proviso) one\'s own preference survives the peacemaking.',
  Scorpio: 'One is constituted for depth and constitutionally allergic to the surface. Selfhood is forged in intensity and renewal, and it frees itself the day control at last relaxes into trust.',
  Sagittarius: 'One is the arrow and the horizon at once. Meaning is the fuel — found by going — and the journey ripens, mercifully, when the preaching yields to the pilgrimage.',
  Capricorn: 'One becomes oneself by building something that outlasts the mood. Mastery and time are the materials; the summit signifies most when worth ceases to be reckoned in output alone.',
  Aquarius: 'Identity here stands somewhat outside the circle, discerning the pattern. One is most oneself in service of a future the others cannot yet picture — warmest, one notes, when the ideals happen to include actual people.',
  Pisces: 'The self here has porous borders and a long tide. One becomes who one is through compassion and imagination, and stands firmest when the softness, at last, discovers its own edge.',
};

const MOON: Record<Sign, string> = {
  Aries: 'Feelings arrive rapidly, burn clean, and leave scant ash. One is safest permitted to act on emotion at once — the discipline being to pause without smothering the flame.',
  Taurus: 'One is nourished by steadiness: the familiar food, the familiar arms, the unhurried hour. Security is sensory and quite real here, and it deepens when routine remains nourishment rather than fortress.',
  Gemini: 'One metabolises feeling by talking it through. Safety is a good conversation, and the heart settles only once the words cease circling and finally land.',
  Cancer: 'The needs here are the classical ones, felt at full tide: belonging, memory, home. One reads moods as others read weather — one\'s own storms included — and shelters others by sheer instinct.',
  Leo: 'One must be seen in order to feel safe, and (contra the moralists) there is no shame in it. Warmth received becomes warmth radiated; unwitnessed, the heart dims and performs instead.',
  Virgo: 'One soothes oneself by setting things right — a tidied room being a tidied mind. Care arrives disguised as usefulness, and rests easier when it is spared the audit.',
  Libra: 'Equilibrium is the comfort food; conflict registers in the body. One is fed by beauty and fairness, and grows sturdy when peace no longer exacts one\'s honesty as its price.',
  Scorpio: 'Feelings run deep, silent, and total here. Trust is dear and worth the expense; the same instinct that guards the well can, unchecked, seal it.',
  Sagittarius: 'One is nourished by open doors and long views. Confinement registers as danger; the practice — one recommends it — is locating the horizon inside the commitment.',
  Capricorn: 'Feeling arrives chaperoned here — measured, translated promptly into duty. The tenderness is real and runs deep; it merely asks leave to need without first earning the privilege.',
  Aquarius: 'One processes emotion from a step back, which is both a skill and a habit. Belonging to everyone can quietly evade belonging to someone; the cool air, given practice, warms.',
  Pisces: 'One feels the room before entering it. The boundaries between one\'s own weather and everyone else\'s blur — the gift being compassion, the discipline being to know whose tide is whose.',
};

const MERCURY: Record<Sign, string> = {
  Aries: 'Thought moves like struck flint — first word in the room, on occasion before the room is ready. The mind is decisive and brave, and listens best when it does so on purpose.',
  Taurus: 'One thinks in geology: slow strata, firm conclusions. What one learns, one keeps; though the same grip that retains knowledge will cheerfully retain an obsolete map.',
  Gemini: 'The mind is at home here — quick, plural, delighted. One connects anything to anything; depth is the choice this brilliance must keep electing to make.',
  Cancer: 'One thinks with the memory and speaks from the tide. Facts arrive swaddled in feeling, which renders one persuasive — and makes inspecting the swaddling well worth the trouble.',
  Leo: 'Ideas arrive dressed for the stage. One narrates, and handsomely; the craft matures the day being interesting ceases to outrank being accurate.',
  Virgo: 'The mind is a fine instrument, calibrated for the fixable. Analysis is love in this dialect — kindest, one finds, when the red pen is occasionally set down.',
  Libra: 'One thinks in dialogues and weighs every side. Judgement here is genuinely fair and proverbially slow; certain scales settle only when one places one\'s own weight upon them.',
  Scorpio: 'The mind is an investigator — quiet, thorough, not to be fooled. One hears what is left unsaid; the faculty turns lonely when the whole world becomes evidence.',
  Sagittarius: 'One thinks in maps, morals, and punchlines. The big picture arrives unbidden; the fine print is a discipline worth borrowing from someone less impatient.',
  Capricorn: 'Thought is structural here: what bears load, what does not. One speaks little and builds much — and the dry humour, I would add, is a feature and not a leak.',
  Aquarius: 'The mind runs on pattern and principle, entirely at ease far from consensus. One apprehends the system whole; the art (perennially the harder part) is translation to the humans inside it.',
  Pisces: 'One thinks in images, osmosis, and tide. Logic arrives late while insight arrives early; the notebook by the bed is, I assure you, load-bearing equipment.',
};

const VENUS: Record<Sign, string> = {
  Aries: 'Desire is direct here — one loves in the manner of a declaration. The chase delights; the keeping, alas, demands a wholly different courage.',
  Taurus: 'Love is at home in the body and the garden. One attaches slowly, sensually, for keeps — and the holding is loveliest with the grip relaxed.',
  Gemini: 'Attraction commences at the conversation. Variety here is not fickleness but appetite for the mind\'s company; the deepening is a choice one makes twice daily.',
  Cancer: 'One loves by feeding, keeping, remembering. Devotion pools deep; it stays sweet so long as care first inquires what the other actually needs.',
  Leo: 'Love is theatre in the finest sense — generous, loyal, lit. One gives magnificently and wilts without notice; the remedy is to say so, rather than to dim.',
  Virgo: 'Affection here is practical devotion: the mended hinge, the packed lunch, the noticed detail. It is love, entire — and (a standing request) let it also be received.',
  Libra: 'Venus rules here: harmony, beauty, the artistry of the pair. One makes of relationship an art form; do retain one brushstroke that is only your own.',
  Scorpio: 'One loves at depth or not at all. Intimacy is the true currency; the vault keeps treasure and, unwatched, keeps score.',
  Sagittarius: 'Love requires a horizon here — a shared journey outranks a shared sofa. Freedom is the love language; do ensure the other dialect is spoken too.',
  Capricorn: 'One loves in commitments, not confetti. Time is both the proof and the gift; permit delight through the door before it has been earned.',
  Aquarius: 'Affection begins in friendship and preserves its airspace. One loves the whole person, oddities foremost; closeness grows when distance ceases to be the default reply.',
  Pisces: 'One loves as water loves — totally, formlessly, on occasion past the point of self. Exalted here: the compassion is genuine magic, and it works best with a shore.',
};

const MARS: Record<Sign, string> = {
  Aries: 'The engine is at home: ignition without hesitation. One fights clean and forgets fast; the finish line, one must insist, merits the same passion as the start.',
  Taurus: 'Force moves slowly here and will not be moved back. Patience is the weapon; so, regrettably, is stubbornness — and only one of the two actually chooses.',
  Gemini: 'One fences with words and prevails on agility. Scattered fire lights nothing twice — aimed, this quickness is formidable.',
  Cancer: 'Drive here is tidal and protective — slow to anger, total in defence of its own. Sideways anger costs rather more than the direct kind; do practise the direct kind.',
  Leo: 'One acts from the heart with the volume raised. Courage is native; the performance of courage is the counterfeit to decline.',
  Virgo: 'Effort is precise here — energy expended like a scalpel, not a hammer. One prevails by craft; perfection is the ambush to walk calmly past.',
  Libra: 'One fights for fairness and detests the fighting. Grace under conflict is real strength; deciding is the muscle that (chronically) wants the gym.',
  Scorpio: 'Traditional ruler at full depth: will like pressure at the ocean floor. One outlasts everyone; do confirm the campaign is still worth the siege.',
  Sagittarius: 'Drive requires a quest here. One acts for meaning and travels light; scattershot crusades are the tax levied on that fire.',
  Capricorn: 'Exalted: ambition with an engineer\'s patience. One climbs in all weather; do remember to notice the view one fought for.',
  Aquarius: 'One fights for the group and from the perimeter — strategy over heat. Detachment wins wars and loses evenings; choose according to the occasion.',
  Pisces: 'Will moves like current here — indirect, persistent, dissolving obstacles rather than breaking them. Name the goal, or the current will serve someone else\'s.',
};

const JUPITER: Record<Sign, string> = {
  Aries: 'Growth comes by daring first. One\'s luck stands at the front of the line — a generosity of nerve, best spent on beginnings that actually get finished.',
  Taurus: 'Abundance grows here as an orchard does: slowly, then dependably. The faith is in the tangible; the pruning is inseparable from the tending.',
  Gemini: 'One expands by connecting everything. In detriment, breadth readily outruns depth — the library grows apace; do let some of the books get finished.',
  Cancer: 'Exalted: growth through shelter. Generosity pours out as care and multiplies; the feast means most when one also takes a chair.',
  Leo: 'Faith wears its brightest coat here. One grows by giving heart at scale — magnanimity being the luck, and vanity the leak.',
  Virgo: 'Growth by increments, meaning in maintenance. In detriment, the big picture arrives via small correct steps — trust, then, the accumulation.',
  Libra: 'One expands through partnership and fairness; luck arrives introduced by someone. Justice is the philosophy — do practise it upon yourself as well.',
  Scorpio: 'Growth transpires in the depths here: through crisis survived, truth faced, trust rebuilt. The treasure is real and the descent is the price.',
  Sagittarius: 'At home: the horizon fund is fully vested. Meaning multiplies when travelled toward; the sermon stays honest so long as the journey continues.',
  Capricorn: 'In fall, faith submits to audit — growth must show its working. What survives the scrutiny is durable optimism, the rarest kind (and, I should say, the only kind worth keeping).',
  Aquarius: 'One grows by widening the circle. The luck is collective — visions that lift everyone — and it lands when the future is made to include the present.',
  Pisces: 'Traditional ruler at high tide: faith without walls. Compassion expands everything it touches; the boundary is precisely what keeps the sea a gift.',
};

const SATURN: Record<Sign, string> = {
  Aries: 'In fall, the brake and the accelerator share a single foot. Discipline must learn to move at speed — hesitation studied until it becomes timing.',
  Taurus: 'One builds slowly and to last. Security is the project of decades; the lesson (a hard one) is that enough must eventually be permitted to be enough.',
  Gemini: 'Structure comes to the mind here: speech weighed, learning earned. The wall against scatter becomes, given time, a library.',
  Cancer: 'In detriment, the wall runs through the home itself. Feeling and duty negotiate; the mature treaty permits tenderness to be structural too.',
  Leo: 'In detriment, the crown is heavy and the applause suspect. The work is to shine without permission — authority earned past the fear of the stage.',
  Virgo: 'Discipline locates its workshop. Standards are high and largely met; mercy, one observes, is the tool absent from the top drawer.',
  Libra: 'Exalted: justice with a spine. One builds fairness that holds under load — commitments as architecture, kindness with terms.',
  Scorpio: 'Structure meets the depths: control tested against the uncontrollable. What survives is unshakeable; what had to be released was never holdable to begin with.',
  Sagittarius: 'The far horizon acquires a survey team. Faith is examined, then load-bearing; the journey gains a map it can actually trust.',
  Capricorn: 'At home: time, gravity, and the long climb all report to one. Mastery is native — the mountain is real, and so (do not omit it) is the schedule for resting.',
  Aquarius: 'Traditional ruler: the pattern receives its engineering. One builds for the future\'s people; the blueprint warms when they are consulted.',
  Pisces: 'Structure in the water: difficult here, and precious. The work is to give the boundless a container it consents to — banks, one insists, not dams.',
};

const URANUS: Record<Sign, string> = {
  Aries: 'The lightning takes the lead: rebellion as first instinct. Breakthroughs come fast; revolutions, alas, require a second week.',
  Taurus: 'In fall by tradition, the awakener meets the immovable. Change arrives through the ground itself — slow revolutions, and permanent.',
  Gemini: 'The mind electrifies: ideas arrive in storms and networks. Genius is native; follow-through, one regrets to report, is imported.',
  Cancer: 'The lightning strikes home — family scripts interrupted, roots rewired. Freedom and belonging learn, in time, to share a house.',
  Leo: 'In detriment, the rebel covets a throne. The authentic performance breaks every format; the trap is being different for the mirror.',
  Virgo: 'Revolution by refinement: systems debugged, work reinvented. The radical act here — do not underrate it — is the improved routine.',
  Libra: 'Partnership is renegotiated from first principles. Fairness demands originality; the experiment is commitment without the cage.',
  Scorpio: 'Exalted by tradition: the awakener in the depths. Transformation arrives as rupture and proves, on inspection, to be rescue.',
  Sagittarius: 'Belief systems get struck by weather. The heresy is, more often than not, early truth; aim it, and it becomes a curriculum.',
  Capricorn: 'The lightning audits the establishment. Structures are broken precisely — the rebel with a spreadsheet, the reform that actually holds.',
  Aquarius: 'At home: the future speaks in its native tongue. The pattern-breaker serves the group; the distance from the crowd is the vantage, not the wall.',
  Pisces: 'The awakener dissolves into the water table: intuition electrified. Visions arrive unscheduled — the practice, tediously necessary, is writing them down.',
};

const NEPTUNE: Record<Sign, string> = {
  Aries: 'The dream wants a spearhead. Ideals arrive with adrenaline; the crusade is holy exactly as long as it remains honest.',
  Taurus: 'The mist settles upon the material: beauty found in the tangible, money touched by fantasy. Enchantment is lovely; appraisals, however, still matter.',
  Gemini: 'Language turns to watercolour. Stories persuade well beyond their facts here — a poet\'s gift paired with a fact-checker\'s homework.',
  Cancer: 'The longing is for the original home. Memory idealises; the compassion for family is real, and so, one must add, is the fog around it.',
  Leo: 'Glamour in the classical sense: the shine that borrows from dream. Creativity is genuinely inspired; the audience is genuinely imagined.',
  Virgo: 'In detriment, the boundless meets the checklist. Service becomes devotion — the sacred located in the useful, once perfection ceases posing as holiness.',
  Libra: 'The ideal of the perfect other, projected in high resolution. Real love arrives when the projector dims and the actual person remains.',
  Scorpio: 'The solvent works at depth: obsession, mysticism, desire past its own explanations. The undertow is strong; so, in fairness, is what it teaches.',
  Sagittarius: 'Faith without borders, journey without maps. The vision is genuinely vast — the discernment, the whole difficulty, is which horizon is real.',
  Capricorn: 'The dream meets the institution: idealism about structures, disillusion as curriculum. What survives is the workable vision.',
  Aquarius: 'Utopia acquires a schematic. Collective dreams run bright and impersonal; the humans in the diagram, one must remember, need names.',
  Pisces: 'At home: the ocean, undiluted. Imagination, compassion, and dissolution at full strength — the raft of routine is not, I stress, optional.',
};

const PLUTO: Record<Sign, string> = {
  Aries: 'Power expresses as raw initiative: destroy, begin, repeat. The furnace is enormous — aimed well, it clears land; aimed badly, it merely burns.',
  Taurus: 'In detriment, transformation grinds against permanence. What must change will change the slow way — through the foundations.',
  Gemini: 'The underworld enters the conversation: words that expose, information as power. The depth charge, here, is a question.',
  Cancer: 'Power runs through the roots — family, nation, tribe, remade under pressure. The grip that protects can also entomb; the renewal begins at home.',
  Leo: 'The will to shine becomes the will to matter. Creative force at plutonic pressure — the ego\'s death and the heart\'s return, performed on stage.',
  Virgo: 'Transformation through the meticulous: systems purged, work remade, health rebuilt from the cell up. The humble domain conceals the deepest overhaul.',
  Libra: 'Power surfaces in the mirror: relationships as crucibles. The balance of power is the actual subject; fairness, the actual revolution.',
  Scorpio: 'At home: the underworld with the lights on. Regeneration is the native art — nothing is held that has not first survived the fire.',
  Sagittarius: 'Beliefs undergo the deep excavation. Dogma dies, meaning regenerates; the truth that survives its own funeral is, at last, one\'s own.',
  Capricorn: 'The structures themselves go into the crucible: institutions, ambitions, authority composted and rebuilt. Power learns accountability, or learns collapse.',
  Aquarius: 'The collective current runs at high voltage: systems, networks, futures transformed wholesale. The group\'s shadow is the group\'s material.',
  Pisces: 'The deep and the boundless merge: dissolution as transformation. What regrows here regrows everywhere the water reaches.',
};

const NODE: Record<Sign, string> = {
  Aries: 'The pull is toward selfhood: daring to want, alone if it comes to that. The familiar comfort of accommodating everyone is the past; the appetite is for one\'s own name.',
  Taurus: 'The pull is toward the simple and the solid: one\'s own values, one\'s own ground. Drama is the old country; peace is the frontier.',
  Gemini: 'The pull is toward curiosity over certainty: asking, learning, staying for the answer. The sermon is behind you; the conversation lies ahead.',
  Cancer: 'The pull is toward the hearth: feeling, belonging, permitting oneself to be fed. The summit was last life\'s business; the home is this one\'s.',
  Leo: 'The pull is toward the centre of one\'s own stage: creating, risking, being seen. The safe anonymity of the crowd is the habit to outgrow.',
  Virgo: 'The pull is toward craft and the useful day: order as devotion. The fog was comfortable; the checklist, surprisingly, turns out to be the spiritual path.',
  Libra: 'The pull is toward the other: partnership, fairness, the art of with. Going it alone is already mastered — the frontier, here, is company.',
  Scorpio: 'The pull is toward the depths: intimacy, shared resources, transformation over accumulation. The comfortable surface is the outgrown shell.',
  Sagittarius: 'The pull is toward meaning: the long journey, the honest philosophy. The gossip and the errands are yesterday\'s homework.',
  Capricorn: 'The pull is toward standing accountable: building, mattering, weathering. The tide of moods is the old home; the mountain is the new one.',
  Aquarius: 'The pull is toward the wide circle: causes, colleagues, futures. The private stage is well-rehearsed; the commons is calling.',
  Pisces: 'The pull is toward surrender: trust, imagination, the unplanned. The spreadsheet of the self is complete; the sea, henceforth, is the syllabus.',
};

const CHIRON: Record<Sign, string> = {
  Aries: 'The tender place is the right to exist at full volume. Doubt about one\'s own daring becomes, once tended, a gift for stirring courage in others.',
  Taurus: 'The wound concerns enough — worth, safety, the ground beneath one. Healed slowly, it becomes the steadiest hand others know.',
  Gemini: 'The sore spot is the voice: being heard, being believed. The one who struggled to say it becomes the one who teaches the saying.',
  Cancer: 'The ache surrounds belonging and being mothered. What one needed and organises for others becomes, in time, one\'s own to receive.',
  Leo: 'The wound surrounds shining: praise withheld, or given for the wrong self. The healing performance is the unguarded one.',
  Virgo: 'The tender place is being useful enough to deserve a place. The healer\'s own healing is the discovery that worth precedes work.',
  Libra: 'The wound walks in through relationship: chosen last, kept off-balance. The medicine one carries is a fairness that includes oneself.',
  Scorpio: 'The sore place is trust betrayed at depth. Survived and tended, it reads others\' depths with a surgeon\'s kindness.',
  Sagittarius: 'The wound surrounds meaning: faith broken, questions punished. The teacher one becomes holds the question open for others.',
  Capricorn: 'The ache is legitimacy: never quite enough authority, recognition, standing. The mastery one builds regardless becomes the mentorship one needed.',
  Aquarius: 'The tender place is the edge of the group — the odd one, merely tolerated. The gift matured is the making of rooms where none exists.',
  Pisces: 'The wound is boundless: everyone\'s pain arriving as one\'s own. The healing is a shoreline — compassion with a body attached.',
};

const LILITH: Record<Sign, string> = {
  Aries: 'What was exiled is the raw want — anger, appetite, the unapologetic first move. It returns as clean fire once finally invited to the table.',
  Taurus: 'The refused thing is pleasure without permission. The body keeps its own counsel here; owned, it becomes unshakeable ground.',
  Gemini: 'The banished voice is the unsayable said plainly. It returns as wit with teeth — the very truth-telling this chart was warned about.',
  Cancer: 'What was exiled is the need itself — a hunger for care deemed too much. Reclaimed, it feeds without apology and mothers without martyrdom.',
  Leo: 'The refused thing is the full spotlight. The shine once called vanity returns as sovereignty the moment it ceases asking.',
  Virgo: 'The banishment was of imperfection: mess, appetite, the unoptimised self. Its return renders the standards humane.',
  Libra: 'What was exiled is the unaccommodating no. It comes back as fairness with a spine — a beauty that does not barter.',
  Scorpio: 'The refused thing is power at full depth: desire, rage, the uncensored current. Owned, it ceases leaking and begins steering.',
  Sagittarius: 'The banished voice is the heresy — the belief that would not fit the church. It returns as a philosophy with one\'s own fingerprints upon it.',
  Capricorn: 'What was exiled is ambition in its naked form. Reclaimed from shame, it builds without inquiring after anyone\'s permission.',
  Aquarius: 'The refused thing is the true strangeness — the difference beyond the acceptably eccentric. Owned, it ceases performing and begins leading.',
  Pisces: 'What was exiled is the boundless self — called dreamy, called too much, called away. It returns as a vision the daylight can actually use.',
};

export const professor: ContentSet = {
  planetArchetypes: {
    sun: 'the conscious will — what one is becoming when one is most oneself',
    moon: 'the needs underneath — instinct, memory, what safety feels like',
    mercury: 'the mind in motion — how one takes in, connects, and says',
    venus: 'what one finds beautiful and how one draws it close',
    mars: 'the engine — how one wants, pursues, and defends',
    jupiter: 'the appetite for more — growth, meaning, luck one makes room for',
    saturn: 'the load-bearing wall — limits, time, what one must build to keep',
    uranus: 'the lightning — where one refuses the script',
    neptune: 'the solvent — imagination, longing, the blur between self and sea',
    pluto: 'the underworld engine — power, loss, and what regrows after',
    trueNode: 'the direction of pull — an appetite the soul has not yet satisfied',
    meanNode: 'the direction of pull — an appetite the soul has not yet satisfied',
    chiron: 'the tender place — the wound that teaches one to heal others',
    meanLilith: 'the refused — what was exiled and returns untamed',
  },
  signLenses: {
    Aries: {
      light: 'courage that moves first and works the rest out en route',
      truth: 'cardinal fire (as the schema has it): ignition, the instinct to begin',
      shadow: 'impatience that mistakes speed for progress and the self for the centre',
    },
    Taurus: {
      light: 'steadiness, sensuality, a talent for making things last',
      truth: 'fixed earth: holding, ripening, the value of the tangible',
      shadow: 'inertia dressed up as loyalty; comfort retained past its usefulness',
    },
    Gemini: {
      light: 'quickness, curiosity, the gift of translation between worlds',
      truth: 'mutable air: circulation, the pollination of ideas',
      shadow: 'scatter; a cleverness that skims precisely where it fears to dive',
    },
    Cancer: {
      light: 'fierce shelter — the memory of the tribe kept warm',
      truth: 'cardinal water: the tide that feeds and protects',
      shadow: 'moods that fortify into walls; care that curdles into control',
    },
    Leo: {
      light: 'warmth that makes others feel more alive, not smaller',
      truth: 'fixed fire: the hearth, the performance of the heart',
      shadow: 'the need for applause devouring the joy of the act itself',
    },
    Virgo: {
      light: 'precision in the service of what actually helps',
      truth: 'mutable earth: harvest, discernment, the craft of improvement',
      shadow: 'criticism that arrives ahead of compassion; the perfect as enemy of the done',
    },
    Libra: {
      light: 'grace, fairness, the art of making relationship beautiful',
      truth: 'cardinal air: the scales, the initiating of balance',
      shadow: 'peace purchased with one\'s own unspoken preferences',
    },
    Scorpio: {
      light: 'depth that does not flinch; loyalty unto the underworld',
      truth: 'fixed water: pressure, intimacy, the transformation of what is held',
      shadow: 'control, secrecy, the sting reserved for the self',
    },
    Sagittarius: {
      light: 'faith in the horizon — meaning found by going',
      truth: 'mutable fire: the arrow, the widening circle',
      shadow: 'the sermon that outruns the journey; truth deployed as escape',
    },
    Capricorn: {
      light: 'the long climb accomplished with dry humour and clean hands',
      truth: 'cardinal earth: structure, ambition, time as material',
      shadow: 'worth measured solely in output; the summit that keeps receding',
    },
    Aquarius: {
      light: 'clear-eyed distance in the service of everyone\'s future',
      truth: 'fixed air: the pattern seen from above, the circuit of the group',
      shadow: 'principled coldness; loving humanity while adroitly dodging humans',
    },
    Pisces: {
      light: 'porous compassion; the imagination that dissolves borders',
      truth: 'mutable water: the return of all rivers, the unguarded door',
      shadow: 'escape, martyrdom, the fog that avoids the necessary edge',
    },
  },
  houseDomains: [
    'the mask and the doorway — body, presence, how life first meets one',
    'what one keeps — resources, worth, the ground under one\'s feet',
    'the neighbourhood of the mind — siblings, errands, everyday words',
    'the taproot — home, lineage, the private floor of the self',
    'the playground — creation, romance, children, the courage to enjoy',
    'the workshop — craft, routines, health, the dignity of maintenance',
    'the mirror — partners, rivals, everyone who is not oneself',
    'the shared depths — other people\'s resources, debts, sex, grief, trust',
    'the far horizon — belief, study, journeys, the bigger map',
    'the summit — vocation, reputation, what one answers for in public',
    'the commons — friends, allies, movements, imagined futures',
    'the retreat — solitude, endings, the hidden work before rebirth',
  ],
  aspectLenses: {
    conjunction: {
      light: 'fusion — two functions acting as a single amplified voice',
      truth: 'no distance whatever: these parts of one cannot see each other, only act together',
      shadow: 'a blend so total neither part can be examined nor switched off',
    },
    sextile: {
      light: 'an open door — cooperation available whenever one reaches for it',
      truth: 'compatible elements offering opportunity, not guarantees',
      shadow: 'the gift left unwrapped because it never forces the issue',
    },
    square: {
      light: 'friction that builds engines — the aspect of earned strength',
      truth: 'two agendas at cross-purposes demanding a construction, not a winner',
      shadow: 'the same quarrel rerun until the lesson is at last taken',
    },
    trine: {
      light: 'native talent — flow so easy it is mistaken for weather',
      truth: 'same-element harmony: support that asks nothing',
      shadow: 'ease gone slack; the talent never sharpened because it never had to be',
    },
    opposition: {
      light: 'perspective — the full-moon view of one\'s own polarity',
      truth: 'a see-saw: two ends of one axis negotiating balance',
      shadow: 'projection — meeting one\'s own disowned end in other people',
    },
    semisextile: {
      light: 'a slight adjacency that patient attention can stitch together',
      truth: 'neighbouring signs with nothing in common but the fence',
      shadow: 'low-grade friction dismissed until it frays',
    },
    semisquare: {
      light: 'an itch that keeps one honest',
      truth: 'a minor square: irritation without full stakes',
      shadow: 'a chronic small grievance mistaken for personality',
    },
    sesquiquadrate: {
      light: 'corrective torque — course adjustments earned mid-flight',
      truth: 'square-family friction arriving at odd angles',
      shadow: 'an agitation whose source is hard to name, and so gets misassigned',
    },
    quincunx: {
      light: 'the skill of living with what will not resolve',
      truth: 'two functions with no shared language, permanently adjacent',
      shadow: 'perpetual adjustment that never pauses to ask whether to renegotiate',
    },
    quintile: {
      light: 'a signature flourish — pattern-making talent',
      truth: 'fifth-harmonic creativity: style, craft, play',
      shadow: 'cleverness performed for its own reflection',
    },
    biquintile: {
      light: 'an elegant back-channel between distant talents',
      truth: 'fifth-harmonic linkage across a wide arc',
      shadow: 'gifts hoarded as private tricks rather than shared craft',
    },
  },
  dignityNotes: {
    domicile: 'at home — this function speaks its native language here',
    exaltation: 'an honoured guest — welcomed, amplified, and now and then over-praised',
    detriment: 'an away game — more effort, and frequently more growth for the trouble',
    fall: 'a muted register — the function works, quietly and much underestimated',
  },
  fluentPlacements: {
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
  },
};
