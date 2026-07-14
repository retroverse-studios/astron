import type { Sign } from '@astron/core';
import type { ContentSet } from '../overrides.js';

/**
 * 🌧 Noir detective narrator — a complete alternative content set. Same
 * meaning entry-for-entry as the shipped text, different diction; the
 * honesty rules still bind, in character.
 */

type SignSet = Record<Sign, string>;

const SUN: SignSet = {
  Aries: "You're most yourself the second the case opens. Identity here is a verb — struck like a match, new with every fresh start — and the job is closing what the spark opened.",
  Taurus: 'Selfhood ripens slow and holds its ground. You become who you are by tending what lasts, and the lead worth tailing is mistaking comfort for a closed case.',
  Gemini: "You're built out of questions and quick bridges. Identity lives in the exchange — telling, hearing, connecting — and it deepens the day the curiosity stops working only the surface.",
  Cancer: 'The self is a waterfront: protective, tidal, long on memory. You become who you are by sheltering what you love, and you grow when the shell learns to open as well as shut.',
  Leo: 'You carry a fire in the chest like a lit office at midnight. Radiance is the job — warming a cold room into life — and it grows up when the shine stops needing the applause.',
  Virgo: 'You become yourself through craft: noticing, refining, making the thing actually run. The gift sharpens into service once the inner critic learns to sign off on good enough.',
  Libra: 'Identity forms in the space between people — you know yourself best mid-negotiation. Grace is real leverage here, so long as your own preference walks out of the deal alive.',
  Scorpio: "You're built for depth and allergic to the shallow end. Selfhood gets forged in intensity and renewal, and it walks free the day control loosens into trust.",
  Sagittarius: "You're the arrow and the far road at once. Meaning is your fuel — found by going — and the trip ripens when the sermon gives way to the pilgrimage.",
  Capricorn: 'You become yourself by building something that outlasts the mood. Mastery and time are your materials; the summit means most once worth stops being tallied in output alone.',
  Aquarius: "Identity here stands a step outside the crowd, reading the pattern. You're most yourself working for a future nobody else can picture yet — warmest when the ideals have actual people in them.",
  Pisces: 'The self here has porous borders and a long tide. You become who you are through compassion and imagination, and you stand strongest when the softness finds its own edge.',
};

const MOON: SignSet = {
  Aries: "Feelings come in fast, burn clean, and leave little ash to sweep. You're safest when you can act on the feeling right away — the practice is pausing without snuffing the flame.",
  Taurus: "You're fed by the steady things: familiar food, familiar arms, an hour nobody's rushing. Security is sensory and real here, and it deepens while the routine stays nourishment instead of a fortress.",
  Gemini: 'You metabolise feeling by talking it out. Safety is a good conversation, and the heart settles once the words stop circling the block and park.',
  Cancer: 'The needs here are the classic ones, felt at full tide: belonging, memory, home. You read moods like weather reports — your own storms included — and shelter others on instinct.',
  Leo: "You need a witness to feel safe, and there's no shame in it. Warmth taken in becomes warmth given out; unseen, the heart dims and starts performing.",
  Virgo: "You calm yourself by setting things right — a tidied room is a tidied mind. Care shows up as usefulness, and it rests easier when nobody's auditing it.",
  Libra: "Equilibrium is your comfort food; conflict lands in the body like a bad night. You're fed by beauty and fair play, and you toughen up once peace stops costing your honesty.",
  Scorpio: 'Feelings run deep, silent, and total here. Trust costs plenty and is worth the price; the instinct that guards the well can also seal it.',
  Sagittarius: "You're fed by open doors and long views. A locked room reads as danger; the practice is finding the horizon inside the commitment.",
  Capricorn: 'Feeling shows up with a chaperone here — measured, translated into duty. The tenderness is real and runs deep; it wants a licence to need without earning first.',
  Aquarius: 'You process emotion from one step back, which is a skill and a habit. Belonging to everyone can dodge belonging to someone; the cool air warms up with practice.',
  Pisces: "You feel the room before you're through the door. The line between your weather and everyone else's blurs — the gift is compassion, the discipline is knowing whose tide is whose.",
};

const MERCURY: SignSet = {
  Aries: "Thought moves like a struck flint — first word in the room, sometimes before the room's ready for it. The mind is decisive and game, and it listens best on purpose.",
  Taurus: 'You think in geology: slow layers, firm verdicts. What you learn, you keep; the same grip that holds the knowledge can hold a map gone out of date.',
  Gemini: "The mind is on home turf — quick, plural, having a fine time. You'll connect anything to anything; depth is a choice this cleverness has to keep making.",
  Cancer: 'You think with the memory and talk from the tide. Facts arrive wrapped in feeling, which makes you persuasive — and makes checking the wrapping worth the trip.',
  Leo: 'Ideas show up dressed for the stage. You narrate, and beautifully; the craft grows up when being interesting stops outranking being accurate.',
  Virgo: 'The mind is a fine instrument, calibrated for what can be fixed. Analysis is love in this dialect — kindest when the red pen takes the odd night off.',
  Libra: 'You think in dialogues and weigh every side of the street. The judgement here is genuinely fair and famously slow; some scales only settle when you put your own weight on them.',
  Scorpio: "The mind is an investigator — quiet, thorough, hard to fool. You hear what isn't said; the skill turns lonely when everything becomes evidence.",
  Sagittarius: 'You think in maps, morals, and punchlines. The big picture comes cheap to you; the fine print is a discipline worth hiring.',
  Capricorn: 'Thought is structural here: what bears load, what folds. You say little and build plenty — and the dry humour is a feature, not a leak.',
  Aquarius: 'The mind runs on pattern and principle, comfortable a long way from the consensus. You see the whole system; translating it for the humans inside is the art.',
  Pisces: 'You think in images, osmosis, and tide. Logic clocks in late but insight clocks in early; the notebook by the bed is regulation equipment.',
};

const VENUS: SignSet = {
  Aries: 'Desire is direct here — you love like a signed confession. The chase delights you; the keeping asks for a different kind of nerve.',
  Taurus: 'Love is at home in the body and the garden. You attach slow, sensual, for keeps — and the holding is sweetest with the grip relaxed.',
  Gemini: "Attraction starts at the conversation. Variety isn't fickleness here, it's an appetite for the mind's company; the deepening is a choice made twice a day.",
  Cancer: 'You love by feeding, keeping, remembering. Devotion pools deep; it stays sweet when the care asks first what the other party actually needs.',
  Leo: 'Love is theatre in the best sense — generous, loyal, well lit. You give big and wilt without notice; say so, instead of dimming the lights.',
  Virgo: "Affection here is practical devotion: the fixed hinge, the packed lunch, the detail nobody else clocked. It's love, the whole case of it — let it be received too.",
  Libra: "Venus runs this precinct: harmony, beauty, the artistry of the pair. You make relationship an art form; keep one brushstroke that's yours alone.",
  Scorpio: 'You love at depth or not at all. Intimacy is the real currency; the vault keeps treasure and, left unwatched, keeps score.',
  Sagittarius: 'Love needs a horizon here — a shared road beats a shared sofa. Freedom is the love language; see the other dialect gets spoken too.',
  Capricorn: "You love in commitments, not confetti. Time is the proof and the gift; let delight through the door before it's earned.",
  Aquarius: 'Affection starts as friendship and keeps its airspace. You love the whole person, oddities first; closeness grows when distance stops being the standing reply.',
  Pisces: 'You love the way water loves — total, formless, sometimes past the point of self. Exalted here: the compassion is real magic, and it works best with a shore.',
};

const MARS: SignSet = {
  Aries: "The engine's on home ground: ignition, no hesitation. You fight clean and forget fast; the finish line deserves the same heat as the start.",
  Taurus: "Force moves slow here and can't be moved back. Patience is your weapon; so is stubbornness, and only one of them makes choices.",
  Gemini: 'You fence with words and win on footwork. Scattered fire lights nothing twice — aimed, this quickness is a serious piece of work.',
  Cancer: 'Drive here is tidal and protective — slow to anger, total in defence of its own. Sideways anger costs more than the direct kind; practise the direct kind.',
  Leo: 'You act from the heart with the volume up. Courage is native stock; the performance of courage is the counterfeit to turn away at the door.',
  Virgo: 'Effort is precise here — energy spent like a scalpel, not a crowbar. You win on craft; perfection is the ambush to walk on past.',
  Libra: 'You fight for fair play and hate the fighting. Grace under fire is real strength; deciding is the muscle that needs the workouts.',
  Scorpio: "Traditional ruler at full fathom: will like pressure on the ocean floor. You outlast everybody; just check the campaign's still worth the siege.",
  Sagittarius: 'Drive wants a quest here. You act for meaning and travel light; scattershot crusades are the tax on that fire.',
  Capricorn: "Exalted: ambition with an engineer's patience. You climb in any weather; remember to look at the view you fought for.",
  Aquarius: 'You fight for the group and from the perimeter — strategy over heat. Detachment wins wars and loses evenings; pick per occasion.',
  Pisces: 'Will moves like a current here — indirect, persistent, dissolving obstacles instead of breaking them. Name the goal, or the current works for somebody else.',
};

const JUPITER: SignSet = {
  Aries: 'Growth comes by daring first. Your luck stands at the front of the line — generosity of nerve, best spent on beginnings that get finished.',
  Taurus: 'Abundance grows like an orchard here: slow, then dependable. The faith is in the tangible; the pruning is part of the tending.',
  Gemini: 'You expand by connecting everything to everything. In detriment, breadth outruns depth easy — the library grows; let a few books get finished.',
  Cancer: 'Exalted: growth through shelter. Generosity pours out as care and multiplies; the spread means most when you also pull up a chair.',
  Leo: 'Faith wears its best coat here. You grow by giving heart at scale — magnanimity is the luck, vanity the slow leak.',
  Virgo: 'Growth by increments, meaning in the upkeep. In detriment, the big picture arrives by small correct steps — trust the accumulation.',
  Libra: 'You expand through partnership and fair dealing; luck arrives with an introduction. Justice is the philosophy — run it on yourself too.',
  Scorpio: "Growth happens in the depths here: crisis survived, truth faced, trust rebuilt. The treasure's real and the descent is the cover charge.",
  Sagittarius: 'At home: the horizon fund is fully vested. Meaning multiplies when travelled toward; the sermon stays honest while the journey keeps moving.',
  Capricorn: 'In fall, faith goes through audit — growth has to show its working. What survives the scrutiny is durable optimism, the rarest brand.',
  Aquarius: 'You grow by widening the circle. The luck is collective — visions that lift the whole block — and it lands when the future includes the present.',
  Pisces: 'Traditional ruler at high tide: faith without walls. Compassion expands everything it touches; the boundary is what keeps the sea a gift.',
};

const SATURN: SignSet = {
  Aries: 'In fall, the brake and the gas share one foot. Discipline has to learn to move at speed — hesitation studied until it turns into timing.',
  Taurus: 'You build slow and you build to last. Security is the project of decades; the lesson is that enough, eventually, has to be allowed to be enough.',
  Gemini: 'Structure comes to the mind here: speech weighed, learning earned. The wall against scatter becomes a library, given time.',
  Cancer: 'In detriment, the wall runs through the middle of the house. Feeling and duty sit at the table; the grown-up treaty lets tenderness be structural too.',
  Leo: 'In detriment, the crown weighs heavy and the applause smells wrong. The work is shining without a permit — authority earned past the fear of the stage.',
  Virgo: 'Discipline finds its workshop. Standards are high and mostly met; mercy is the tool missing from the top drawer.',
  Libra: 'Exalted: justice with a spine. You build fairness that holds under load — commitments like architecture, kindness with terms attached.',
  Scorpio: "Structure meets the depths: control tested against what can't be controlled. What survives is unshakeable; what has to be released was never holdable.",
  Sagittarius: 'The far horizon gets a survey crew. Faith is examined, then load-bearing; the journey gains a map it can trust.',
  Capricorn: 'At home: time, gravity, and the long climb all report to this desk. Mastery is native — the mountain is real, and so is the schedule for resting.',
  Aquarius: "Traditional ruler: the pattern gets engineering. You build for the future's people; the blueprint warms up when they get consulted.",
  Pisces: 'Structure in the water: hard duty here, and precious. The work is giving the boundless a container it consents to — banks, not dams.',
};

const URANUS: SignSet = {
  Aries: 'The lightning takes point: rebellion as first instinct. Breakthroughs come fast; revolutions need a second week on the job.',
  Taurus: 'In fall by tradition, the awakener meets the immovable. Change comes up through the ground itself — slow revolutions, permanent ones.',
  Gemini: 'The mind goes electric: ideas arrive in storms and networks. Genius is local stock; follow-through gets shipped in.',
  Cancer: 'The lightning hits the house — family scripts interrupted, the roots rewired. Freedom and belonging learn to split the rent.',
  Leo: 'In detriment, the rebel wants a throne. The authentic performance breaks every format; the trap is being different for the mirror.',
  Virgo: 'Revolution by refinement: systems debugged, the work reinvented. The radical act here is the improved routine.',
  Libra: 'Partnership gets renegotiated from first principles. Fairness demands originality; the experiment is commitment without the cage.',
  Scorpio: 'Exalted by tradition: the awakener working the depths. Transformation arrives as a break-in and turns out to be a rescue.',
  Sagittarius: 'Belief systems catch the weather. The heresy is usually truth arriving early; aim it, and it becomes a curriculum.',
  Capricorn: 'The lightning audits the establishment. Structures get broken precisely — the rebel with a ledger, the reform that holds.',
  Aquarius: 'At home: the future talks in its native tongue. The pattern-breaker works for the group; the distance from the crowd is the vantage point, not the wall.',
  Pisces: 'The awakener dissolves into the water table: intuition gone electric. Visions arrive unscheduled — the practice is writing them down.',
};

const NEPTUNE: SignSet = {
  Aries: 'The dream wants a spearhead. Ideals arrive with adrenaline on them; the crusade stays holy exactly as long as it stays honest.',
  Taurus: 'The mist settles on the merchandise: beauty found in the tangible, money with a little fantasy on it. Enchantment is lovely; appraisals still matter.',
  Gemini: "Language turns to watercolour. Stories here persuade past their facts — a poet's gift with a fact-checker's homework attached.",
  Cancer: 'The longing is for the original home. Memory idealises; the compassion for family is real, and so is the fog around it.',
  Leo: 'Glamour in the old sense: shine on loan from the dream. The creativity is genuinely inspired; the audience is genuinely imagined.',
  Virgo: 'In detriment, the boundless meets the checklist. Service becomes devotion — the sacred found in the useful, once perfection quits posing as holiness.',
  Libra: "The ideal of the perfect other, projected in high resolution. Real love shows up when the projector dims and the person's still standing there.",
  Scorpio: 'The solvent works at depth: obsession, mysticism, desire past its own explanations. The undertow is strong; so is what it teaches.',
  Sagittarius: 'Faith without borders, travel without maps. The vision is genuinely vast — the discernment is which horizon is on the level.',
  Capricorn: 'The dream meets the institution: idealism about structures, disillusion as the coursework. What survives is the workable vision.',
  Aquarius: 'Utopia gets a schematic. The collective dreams run bright and impersonal; the humans in the diagram need names.',
  Pisces: 'At home: the ocean, straight, no chaser. Imagination, compassion, and dissolution at full strength — the raft of routine is not optional.',
};

const PLUTO: SignSet = {
  Aries: 'Power shows up as raw initiative: demolish, begin, repeat. The furnace is enormous — pointed right, it clears ground; pointed wrong, it just burns.',
  Taurus: 'In detriment, transformation grinds against the permanent. What has to change will change the slow way — through the foundations.',
  Gemini: 'The underworld joins the conversation: words that expose, information as leverage. The depth charge is a question.',
  Cancer: 'Power runs through the roots — family, nation, tribe, remade under pressure. The grip that protects can also entomb; the renewal starts at home.',
  Leo: "The will to shine becomes the will to matter. Creative force at plutonic pressure — the ego's death and the heart's comeback, on stage.",
  Virgo: 'Transformation through the meticulous: systems purged, work remade, health rebuilt from the cell up. The humble beat hides the deepest overhaul.',
  Libra: 'Power surfaces in the mirror: relationships as crucibles. The balance of power is the actual subject; fairness, the actual revolution.',
  Scorpio: "At home: the underworld with the lights on. Regeneration is the house specialty — nothing kept that hasn't been through the fire.",
  Sagittarius: 'Beliefs get the deep excavation. Dogma dies, meaning grows back; the truth that walks out of its own funeral is yours.',
  Capricorn: 'The structures themselves go into the crucible: institutions, ambitions, authority composted and rebuilt. Power learns accountability or learns collapse.',
  Aquarius: "The collective current runs at high voltage: systems, networks, futures overhauled wholesale. The group's shadow is the group's material.",
  Pisces: 'The deep and the boundless merge: dissolution as transformation. What grows back here grows back everywhere the water reaches.',
};

const NODE: SignSet = {
  Aries: 'The pull is toward selfhood: daring to want, alone if the job calls for it. The old comfort of accommodating everybody is the past; the appetite is for your own name on the door.',
  Taurus: 'The pull is toward the simple and the solid: your own values, your own patch of ground. Drama is the old country; peace is the frontier.',
  Gemini: 'The pull is toward curiosity over certainty: asking, learning, sticking around for the answer. The sermon is behind you; the conversation is up ahead.',
  Cancer: "The pull is toward the hearth: feeling, belonging, letting somebody feed you for once. The summit was last life's business; the home is this one's.",
  Leo: 'The pull is toward the centre of your own stage: creating, risking, being seen. The safe anonymity of the crowd is the habit to outgrow.',
  Virgo: 'The pull is toward craft and the useful day: order as devotion. The fog was comfortable; the checklist, of all things, is the spiritual path.',
  Libra: 'The pull is toward the other party: partnership, fairness, the art of with. Going it alone is already mastered — the frontier is company.',
  Scorpio: "The pull is toward the depths: intimacy, shared resources, transformation over accumulation. The comfortable surface is the shell you've outgrown.",
  Sagittarius: "The pull is toward meaning: the long haul, the honest philosophy. The gossip and the errands are yesterday's paperwork.",
  Capricorn: 'The pull is toward standing accountable: building, mattering, taking the weather. The tide of moods is the old address; the mountain is the new one.',
  Aquarius: 'The pull is toward the wide circle: causes, colleagues, futures. The private stage is well rehearsed; the commons is calling.',
  Pisces: 'The pull is toward surrender: trust, imagination, the unplanned. The spreadsheet of the self is complete; the sea is the syllabus.',
};

const CHIRON: SignSet = {
  Aries: 'The tender spot is the right to exist at full volume. Doubt about your own daring becomes, worked over, a gift for putting nerve into other people.',
  Taurus: 'The wound is about enough — worth, safety, the ground under you. Healed slow, it becomes the steadiest hand anyone knows.',
  Gemini: 'The sore spot is the voice: getting heard, getting believed. The one who struggled to say it becomes the one who teaches the saying.',
  Cancer: 'The ache is around belonging and being mothered. What you needed and keep arranging for others becomes, in time, yours to receive.',
  Leo: 'The wound is around shining: praise withheld, or paid out to the wrong self. The healing performance is the unguarded one.',
  Virgo: "The tender place is being useful enough to deserve a chair. The healer's own cure is finding out worth precedes work.",
  Libra: 'The wound walks in through relationship: picked last, kept off balance. The medicine you carry is fairness that includes yourself.',
  Scorpio: "The sore place is trust sold out at depth. Survived and tended, it reads other people's depths with a surgeon's kindness.",
  Sagittarius: 'The wound is around meaning: faith broken, questions punished. The teacher you become holds the question open for others.',
  Capricorn: 'The ache is legitimacy: never quite enough authority, credit, standing. The mastery you build anyway becomes the mentorship you needed.',
  Aquarius: 'The tender place is the edge of the group — the odd one, tolerated. The gift, grown up, is building rooms where nobody is.',
  Pisces: "The wound is boundless: everyone's pain arriving addressed to you. The healing is a shoreline — compassion with a body attached.",
};

const LILITH: SignSet = {
  Aries: 'What got run out of town is the raw want — anger, appetite, the unapologetic first move. It comes back as clean fire when it finally gets a seat at the table.',
  Taurus: 'The refused thing is pleasure without a permit. The body keeps its own counsel here; owned, it becomes ground nothing can shake.',
  Gemini: 'The banished voice is the unsayable said plain. It comes back as wit with teeth — the truth-telling this chart was warned about.',
  Cancer: 'What was exiled is the need itself — a hunger for care that got called too much. Reclaimed, it feeds without apology and mothers without martyrdom.',
  Leo: 'The refused thing is the full spotlight. The shine they called vanity comes back as sovereignty when it stops asking.',
  Virgo: 'The banishment was of imperfection: mess, appetite, the unoptimised self. Its return makes the standards humane.',
  Libra: "What was exiled is the unaccommodating no. It comes back as fairness with a spine — beauty that doesn't cut deals.",
  Scorpio: 'The refused thing is power at full depth: desire, rage, the uncensored current. Owned, it stops leaking and starts steering.',
  Sagittarius: "The banished voice is the heresy — the belief that didn't fit the church. It comes back as a philosophy with your prints all over it.",
  Capricorn: 'What was exiled is ambition with its coat off. Reclaimed from shame, it builds without asking whose permission.',
  Aquarius: 'The refused thing is the true strangeness — the difference past the acceptable eccentric. Owned, it stops performing and starts leading.',
  Pisces: 'What was exiled is the boundless self — called dreamy, called too much, called absent. It comes back as vision the daylight can use.',
};

export const noir: ContentSet = {
  planetArchetypes: {
    sun: "the name on the case file — who you're becoming when you're most yourself",
    moon: 'the needs in the basement — instinct, memory, what a safe house feels like',
    mercury: 'the wire — how the mind takes it in, connects it, and says it',
    venus: 'the weakness for beauty — what catches your eye and how you draw it close',
    mars: 'the muscle — how you want, chase, and hold your corner',
    jupiter: 'the big appetite — growth, meaning, the luck you leave a door open for',
    saturn: 'the load-bearing wall — limits, time, what you build if you mean to keep it',
    uranus: 'the wild card — where you tear up the script',
    neptune: 'the fog off the harbour — imagination, longing, the blur between you and the water',
    pluto: 'the underworld boss — power, loss, and what grows back after the fire',
    trueNode: "the open case — the hunger the soul hasn't closed yet",
    meanNode: "the open case — the hunger the soul hasn't closed yet",
    chiron: 'the old scar — the wound that taught you to patch up others',
    meanLilith: 'the one they ran out of town — comes back, and not house-broken',
  },
  signLenses: {
    Aries: {
      light: 'the nerve to move first and work out the rest on the way',
      truth: 'cardinal fire: ignition, the instinct to open the case',
      shadow: 'impatience that books speed as progress and its own face as the centre of the file',
    },
    Taurus: {
      light: 'steady hands, warm senses, a knack for making things that last',
      truth: 'fixed earth: the vault, the slow ripening, the worth of what you can touch',
      shadow: "inertia wearing loyalty's coat; a comfort kept long after it stopped paying",
    },
    Gemini: {
      light: 'fast on the uptake, curious, fluent in every side of town',
      truth: 'mutable air: circulation, ideas carried block to block like pollen',
      shadow: 'scatter; a cleverness that works the surface because the deep end scares it',
    },
    Cancer: {
      light: 'fierce shelter — the memory of the family kept warm and guarded',
      truth: 'cardinal water: the tide that feeds its own and stands watch',
      shadow: 'moods that harden into walls; care that starts running the show',
    },
    Leo: {
      light: 'warmth that makes the room feel more alive, not smaller',
      truth: 'fixed fire: the hearth, the heart doing its number under the lights',
      shadow: 'a hunger for applause that eats the pleasure of the act itself',
    },
    Virgo: {
      light: 'precision spent on what actually helps',
      truth: 'mutable earth: the harvest, the sharp eye, the trade of making things better',
      shadow: 'the critique that arrives before the kindness; perfect gunning down done',
    },
    Libra: {
      light: 'grace, a fair shake, the fine art of making the partnership beautiful',
      truth: 'cardinal air: the scales, the opening move toward balance',
      shadow: 'a peace bought with your own preferences, never entered in the record',
    },
    Scorpio: {
      light: "depth that doesn't blink; loyalty that follows you down to the underworld",
      truth: 'fixed water: pressure, intimacy, the slow remaking of whatever it holds',
      shadow: 'control, secrets, the sting kept loaded for its own hide',
    },
    Sagittarius: {
      light: 'faith in the road out of town — meaning found by going',
      truth: 'mutable fire: the arrow, the beat that keeps getting wider',
      shadow: 'the sermon that outruns the legwork; truth used as a getaway car',
    },
    Capricorn: {
      light: 'the long climb, done with a dry line and clean hands',
      truth: 'cardinal earth: structure, ambition, time worked like a material',
      shadow: 'worth counted only in output; a summit that keeps moving its address',
    },
    Aquarius: {
      light: "a cool head at a distance, working for everybody's tomorrow",
      truth: 'fixed air: the city seen from the rooftop, the wiring of the crowd',
      shadow: 'cold on principle; devoted to humanity while giving humans the slip',
    },
    Pisces: {
      light: 'compassion with no locks on it; an imagination that dissolves the borders',
      truth: 'mutable water: where every river files back in, the door left off the latch',
      shadow: 'escape, martyrdom, a fog that keeps the necessary edge from getting named',
    },
  },
  houseDomains: [
    'the front you wear at the door — body, presence, how the street sizes you up',
    "what's in the safe — resources, worth, the floor under your shoes",
    'the local beat — siblings, errands, the talk on the corner',
    'the old address — home, bloodline, the basement rooms of the self',
    'the good-times district — creation, romance, kids, the nerve to enjoy it',
    'the back office — craft, routines, health, the honest work of upkeep',
    "the party of the second part — partners, rivals, everyone who isn't you",
    "the joint account — other people's money, debts, sex, grief, trust",
    'the road out of town — belief, study, long trips, the bigger map',
    'the name on the office door — vocation, reputation, what you answer for in public',
    'the usual crowd — friends, allies, movements, futures still on the drawing board',
    'the room nobody visits — solitude, endings, the quiet work before the next act',
  ],
  aspectLenses: {
    conjunction: {
      light: 'two operators working as one — a single voice, twice the volume',
      truth: "no distance between them: these parts of you can't watch each other, only move together",
      shadow: 'a partnership so tight neither one can be questioned alone or told to stand down',
    },
    sextile: {
      light: 'an unlocked door — cooperation there any time you turn the handle',
      truth: 'friendly elements offering a lead, not a conviction',
      shadow: 'the tip never followed up, because it never called twice',
    },
    square: {
      light: 'friction that builds engines — strength you earn the hard way',
      truth: 'two agendas at cross-purposes, and the case wants something built, not a winner',
      shadow: 'the same brawl rerun until somebody finally reads the report',
    },
    trine: {
      light: 'native talent — flow so easy it feels like the weather',
      truth: 'same-element harmony: backup that never sends a bill',
      shadow: 'ease gone soft; a talent never sharpened because nothing ever pushed it',
    },
    opposition: {
      light: 'perspective — the full-moon view across the street at your own other end',
      truth: 'a see-saw: two ends of one axis haggling over the balance',
      shadow: 'projection — pinning your own disowned end on the faces across the table',
    },
    semisextile: {
      light: 'a next-door adjacency — workable, if you put in the visits',
      truth: 'neighbouring signs sharing nothing but the fence line',
      shadow: 'a low-grade friction waved off until it wears through',
    },
    semisquare: {
      light: 'a pebble in the shoe that keeps you honest',
      truth: 'a small-time square: irritation without the big stakes',
      shadow: 'a chronic petty grievance mistaken for character',
    },
    sesquiquadrate: {
      light: 'corrective torque — course fixes earned with the wheels already up',
      truth: 'square-family friction that comes in at odd angles',
      shadow: 'agitation with no clear fingerprints, so the wrong party takes the fall',
    },
    quincunx: {
      light: "the knack for living with a case that won't close",
      truth: 'two functions with no common tongue, stuck on the same floor for good',
      shadow: 'perpetual adjustment that never asks whether to renegotiate the terms',
    },
    quintile: {
      light: 'a signature move — a talent for making patterns',
      truth: 'fifth-harmonic creativity: style, craft, a little play',
      shadow: 'cleverness playing to its own mirror',
    },
    biquintile: {
      light: 'an elegant back channel between talents on opposite sides of town',
      truth: 'fifth-harmonic wiring strung across a wide arc',
      shadow: 'gifts kept as house secrets instead of traded craft',
    },
  },
  dignityNotes: {
    domicile: 'on home turf — this operator speaks the local language',
    exaltation: 'the guest of honour — welcomed, amplified, now and then oversold',
    detriment: 'working the wrong side of town — more sweat, and often more growth for it',
    fall: 'a low voice in the back booth — the work gets done, quiet and underestimated',
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
