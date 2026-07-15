import type { Sign } from '@astron/core';
import type { ContentSet } from '../overrides.js';

/**
 * 🎙️ Sportscaster narrator — a complete alternative content set. Same meaning
 * entry-for-entry as the shipped text, different diction; the chart called like
 * a live match, placements as players, aspects as passages of play. The honesty
 * rules still bind, in character.
 */

const SUN: Record<Sign, string> = {
  Aries: "They're most themselves the instant the whistle blows! Identity here is a verb — relit at every fresh kickoff — and the whole job is converting the break that opening spark set up.",
  Taurus: 'Selfhood ripens slow and holds the line. They become who they are by protecting what lasts, and the unforced error to watch is mistaking a comfortable lead for the final whistle.',
  Gemini: 'Made of questions and quick give-and-goes! Identity lives in the exchange — telling, hearing, linking play to play — and it goes up a level the moment curiosity stops skimming and commits to the through-ball.',
  Cancer: 'The self is a shoreline defence: protective, tidal, deep with memory. They become who they are by sheltering what they love, and level up when that shell learns to open and attack as well as batten down.',
  Leo: 'They carry the stadium floodlights in the chest! Radiance is the assignment — warming a whole squad into life — and it matures when the shine no longer needs the crowd’s roar.',
  Virgo: 'They become themselves through craft: reading the play, refining, making the machine actually work. The gift sharpens into service the day the inner ref learns to wave good-enough on.',
  Libra: 'Identity forms in the space between players — they know themselves best mid-partnership. Grace is real power here, so long as their own game plan survives the peacemaking.',
  Scorpio: 'Built for the deep end and allergic to the shallows! Selfhood is forged in intensity and comebacks, and it breaks free the day control loosens its grip into trust.',
  Sagittarius: 'They’re the arrow and the horizon in one motion! Meaning is the fuel — found by going — and the campaign ripens when the halftime sermon gives way to the pilgrimage.',
  Capricorn: 'They become themselves by building something that outlasts the season. Mastery and time are the materials; the summit means most when worth stops being counted in trophies alone.',
  Aquarius: "Identity here stands just outside the huddle, reading the whole formation. Most themselves serving a future the rest can't picture yet — warmest when the game plan includes actual teammates.",
  Pisces: 'The self here has a porous back line and a long tide. They become who they are through compassion and imagination, and stand steadiest when the softness finds its own touchline.',
};

const MOON: Record<Sign, string> = {
  Aries: 'Feelings break fast, burn clean, leave little on the pitch. Safest when they can act on emotion instantly — the drill is pausing without smothering the flame.',
  Taurus: 'Fed by steadiness: the familiar meal, the familiar arms, the unhurried clock. Security is sensory and real here, and it deepens when routine stays nourishment, not a bunkered defence.',
  Gemini: 'They process feeling by talking it through with the bench. Safety is a good conversation, and the heart settles once the words stop circling and finally land.',
  Cancer: 'The needs here are the classic ones at full tide: belonging, memory, home ground. They read moods like the weather — their own storms included — and shelter others on pure instinct.',
  Leo: "They need to be seen to feel safe, and there's no shame in the celebration. Warmth received becomes warmth radiated; unwitnessed, the heart dims and starts playing to the camera.",
  Virgo: "They settle themselves by squaring things away — a tidy locker room is a tidy mind. Care shows up as usefulness, and rests easier when nobody's keeping the stat sheet.",
  Libra: 'An even scoreline is the comfort food; conflict lands in the body like a hard tackle. Fed by beauty and fair play, they grow sturdy when peace stops costing them their honesty.',
  Scorpio: 'Feelings run deep, silent, total. Trust is expensive and worth every point of it; the instinct to guard the well can also seal it shut.',
  Sagittarius: 'Nourished by open ground and long views. A locked-in position reads as danger; the drill is finding the horizon inside the commitment.',
  Capricorn: 'Feeling comes on with a chaperone here — measured, translated into duty. The tenderness is real and runs deep; it just asks permission to need without earning it first.',
  Aquarius: 'They process emotion from one step back up in the stands, which is a skill and a habit. Belonging to the whole league can dodge belonging to one teammate; the cool air warms with practice.',
  Pisces: "They feel the locker room before they walk in. The line between their weather and everyone else's blurs — the gift is compassion, the discipline is knowing whose tide is whose.",
};

const MERCURY: Record<Sign, string> = {
  Aries: 'Thought comes off like a struck flint — first call on the pitch, sometimes before the pitch is set. The mind is decisive and brave, and listens best on purpose.',
  Taurus: 'They think in layers of bedrock: slow build, firm conclusions. What they learn, they keep; the same grip that holds knowledge can hold an out-of-date playbook.',
  Gemini: 'The mind is on home turf — quick, plural, delighted. They link anything to anything; depth is a call this brilliance has to keep making.',
  Cancer: 'They think with the memory and speak from the tide. Facts arrive wrapped in feeling, which makes them persuasive — and makes double-checking the wrapping worth the effort.',
  Leo: 'Ideas take the field dressed for the big stage. They narrate, and beautifully; the craft matures when being interesting stops outranking being accurate.',
  Virgo: "The mind is a finely tuned instrument, calibrated for what's fixable. Analysis is love in this dialect — kindest when the red pen takes a seat sometimes.",
  Libra: 'They think in two-way play and weigh every side. Judgement here is genuinely fair and famously slow; some scales only settle when they put their own weight on.',
  Scorpio: "The mind is an investigator — quiet, thorough, not to be fooled. They hear what isn't said; the skill turns lonely when everything becomes evidence.",
  Sagittarius: 'They think in maps, morals, and punchlines. The big picture comes naturally; the fine print is a discipline worth borrowing from the analyst.',
  Capricorn: "Thought is structural here: what bears load, what won't. They speak little and build much — and the dry humour is a feature, not a leak.",
  Aquarius: 'The mind runs on pattern and principle, comfortable miles from consensus. They see the whole system from above; translating it for the players on the ground is the art.',
  Pisces: 'They think in images, osmosis, and tide. Logic arrives late but insight arrives early; the notebook by the bed is load-bearing equipment.',
};

const VENUS: Record<Sign, string> = {
  Aries: 'Desire is direct here — they love like a declaration shouted across the pitch. The chase delights them; the keeping asks for a different kind of courage.',
  Taurus: 'Love is at home in the body and the garden. They attach slowly, sensually, for keeps — and the holding is loveliest with the grip relaxed.',
  Gemini: "Attraction kicks off at the conversation. Variety isn't fickleness here, it's appetite for the mind's company; the deepening is a choice made twice a day.",
  Cancer: 'They love by feeding, keeping, remembering. Devotion pools deep, and it stays sweet when care asks first what the other one actually needs.',
  Leo: 'Love is theatre in the best sense — generous, loyal, floodlit. They give magnificently and wilt without notice; say so, rather than dimming.',
  Virgo: 'Affection here is practical devotion: the fixed hinge, the packed lunch, the noticed detail. It is love, entire — now let it also be received.',
  Libra: "Venus is on home turf here: harmony, beauty, the artistry of the pairing. They make partnership an art form; just keep one brushstroke that's only theirs.",
  Scorpio: 'They love at full depth or not at all. Intimacy is the true currency; the vault keeps treasure and, unwatched, keeps score.',
  Sagittarius: 'Love needs a horizon here — a shared journey beats a shared sofa. Freedom is the love language; make sure the other dialect gets spoken too.',
  Capricorn: "They love in signed contracts, not confetti. Time is the proof and the gift; let delight onto the field before it's earned.",
  Aquarius: 'Affection kicks off in friendship and keeps its airspace. They love the whole player, oddities first; closeness grows when distance stops being the default reply.',
  Pisces: 'They love the way water loves — totally, formlessly, sometimes past the point of self. Exalted here: the compassion is real magic, and it plays best with a shore.',
};

const MARS: Record<Sign, string> = {
  Aries: "The engine's on home turf: ignition without hesitation. They compete clean and forget fast; the finish line deserves the same fire as the start.",
  Taurus: 'Force moves slow here and cannot be shoved back. Patience is the weapon; so is stubbornness, and only one of them chooses.',
  Gemini: 'They fence with words and win on agility. Scattered fire lights nothing twice — aimed, this quickness is formidable.',
  Cancer: 'Drive here is tidal and protective — slow to anger, total in defence of its own. Sideways anger costs more than the direct hit; so they drill the direct kind.',
  Leo: 'They act from the heart with the volume up. Courage is native; the performance of courage is the counterfeit to wave off.',
  Virgo: "Effort is precise here — energy spent like a scalpel, not a sledgehammer. They win by craft; perfection is the ambush to run right past.",
  Libra: 'They compete for fair play and hate the fight. Grace under pressure is real strength; deciding is the muscle that needs the reps.',
  Scorpio: "Traditional ruler at full depth: will like pressure at the ocean floor. They outlast everyone; just make sure the campaign's still worth the siege.",
  Sagittarius: 'Drive needs a quest here. They act for meaning and travel light; scattershot crusades are the tax on that fire.',
  Capricorn: "Exalted: ambition with an engineer's patience. They climb in all weather; just remember to look up at the view they fought for.",
  Aquarius: 'They fight for the team and from the perimeter — strategy over heat. Detachment wins wars and loses evenings; pick your occasion.',
  Pisces: "Will moves like current here — indirect, persistent, dissolving obstacles rather than smashing them. Name the goal, or the current runs someone else's play.",
};

const JUPITER: Record<Sign, string> = {
  Aries: 'Growth comes by daring first. Their luck is at the front of the line — generosity of nerve, spent best on beginnings that get finished.',
  Taurus: 'Abundance grows like an orchard here: slowly, then dependably. The faith is in the tangible; the pruning is part of the tending.',
  Gemini: 'They expand by connecting everything to everything. In detriment, breadth outruns depth easily — the library grows; let some books get finished.',
  Cancer: 'Exalted: growth through shelter. Generosity pours out as care and multiplies; the feast means most when they also pull up a chair.',
  Leo: 'Faith wears its brightest kit here. They grow by giving heart at scale — magnanimity is the luck, vanity the leak.',
  Virgo: 'Growth by increments, meaning in the maintenance. In detriment, the big picture arrives via small correct steps — trust the accumulation.',
  Libra: 'They expand through partnership and fair play; luck arrives introduced by someone. Justice is the philosophy — now practise it on themselves too.',
  Scorpio: 'Growth happens in the deep end here: crisis survived, truth faced, trust rebuilt. The treasure is real and the descent is the price.',
  Sagittarius: 'On home turf: the horizon fund is fully vested. Meaning multiplies when travelled toward; the sermon stays honest while the journey continues.',
  Capricorn: 'In fall, faith submits to the audit — growth has to show its working. What survives the scrutiny is durable optimism, the rarest kind.',
  Aquarius: 'They grow by widening the circle. The luck is collective — visions that lift everyone — and it lands when the future includes the present.',
  Pisces: 'Traditional ruler at high tide: faith without walls. Compassion expands everything it touches; the boundary is what keeps the sea a gift.',
};

const SATURN: Record<Sign, string> = {
  Aries: 'In fall, the brake and the accelerator share one foot. Discipline has to learn to move at speed — hesitation studied until it becomes timing.',
  Taurus: 'They build slow and to last. Security is the project of decades; the lesson is that enough, eventually, must be allowed to be enough.',
  Gemini: 'Structure comes to the mind here: speech weighed, learning earned. The wall against scatter becomes a library, given time.',
  Cancer: 'In detriment, the wall runs right through the home ground. Feeling and duty negotiate; the mature treaty lets tenderness be structural too.',
  Leo: "In detriment, the captain's armband is heavy and the applause suspect. The work is shining without permission — authority earned past the fear of the big stage.",
  Virgo: 'Discipline finds its workshop. Standards are high and mostly met; mercy is the tool missing from the top drawer.',
  Libra: 'Exalted: justice with a spine. They build fairness that holds under load — commitments as architecture, kindness with terms.',
  Scorpio: 'Structure meets the deep: control tested against the uncontrollable. What survives is unshakeable; what has to be released was never holdable.',
  Sagittarius: 'The far horizon gets a survey crew. Faith is examined, then load-bearing; the journey gains a map it can trust.',
  Capricorn: 'On home turf: time, gravity, and the long climb all report to them. Mastery is native — the mountain is real, and so is the schedule for resting.',
  Aquarius: "Traditional ruler: the pattern gets proper engineering. They build for the future's players; the blueprint warms when those players are consulted.",
  Pisces: 'Structure in the water: hard here, and precious. The work is giving the boundless a container it consents to — banks, not dams.',
};

const URANUS: Record<Sign, string> = {
  Aries: 'The lightning takes the lead: rebellion as first instinct. Breakthroughs come fast; revolutions need a second week.',
  Taurus: 'In fall by tradition, the awakener meets the immovable. Change arrives through the ground itself — slow revolutions, permanent.',
  Gemini: 'The mind electrifies: ideas arrive in storms and networks. Genius is native; follow-through is imported.',
  Cancer: 'The lightning strikes home — family scripts interrupted, roots rewired. Freedom and belonging learn to share a house.',
  Leo: 'In detriment, the rebel wants the captaincy. The authentic performance breaks every format; the trap is being different for the mirror.',
  Virgo: 'Revolution by refinement: systems debugged, the work reinvented. The radical act here is the improved routine.',
  Libra: 'Partnership gets renegotiated from first principles. Fair play demands originality; the experiment is commitment without the cage.',
  Scorpio: 'Exalted by tradition: the awakener in the deep. Transformation arrives as rupture and turns out to be the rescue.',
  Sagittarius: 'Belief systems get struck by weather. The heresy is usually early truth; aim it, and it becomes a curriculum.',
  Capricorn: 'The lightning audits the establishment. Structures broken precisely — the rebel with a spreadsheet, the reform that holds.',
  Aquarius: 'On home turf: the future speaks in native tongue. The pattern-breaker serves the team; the distance from the crowd is the vantage point, not the wall.',
  Pisces: 'The awakener dissolves into the water table: intuition electrified. Visions arrive unscheduled — the drill is writing them down.',
};

const NEPTUNE: Record<Sign, string> = {
  Aries: 'The dream wants a spearhead at the front of the charge. Ideals arrive with adrenaline; the crusade stays holy exactly as long as it stays honest.',
  Taurus: 'The mist settles on the material: beauty found in the tangible, money touched by fantasy. Enchantment is lovely; the appraisals still matter.',
  Gemini: "Language turns to watercolour. Stories persuade beyond their facts here — a poet's gift with a fact-checker's homework.",
  Cancer: 'The longing is for the original home. Memory idealises; the compassion for family is real, and so is the fog around it.',
  Leo: 'Glamour in the classic sense: the shine that borrows from the dream. Creativity is genuinely inspired; the audience is genuinely imagined.',
  Virgo: 'In detriment, the boundless meets the checklist. Service becomes devotion — the sacred found in the useful, once perfection stops posing as holiness.',
  Libra: 'The ideal of the perfect teammate, projected in high resolution. Real love arrives when the projector dims and the person remains.',
  Scorpio: 'The solvent works at depth: obsession, mysticism, desire past its own explanations. The undertow is strong; so is what it teaches.',
  Sagittarius: 'Faith without borders, journey without maps. The vision is genuinely vast — the discernment is which horizon is real.',
  Capricorn: 'The dream meets the institution: idealism about structures, disillusion as the curriculum. What survives is the workable vision.',
  Aquarius: 'Utopia gets a schematic. Collective dreams run bright and impersonal; the players in the diagram need names.',
  Pisces: 'On home turf: the ocean, undiluted. Imagination, compassion, and dissolution at full strength — the raft of routine is not optional.',
};

const PLUTO: Record<Sign, string> = {
  Aries: 'Power comes out as raw initiative: demolish, begin, repeat. The furnace is enormous — pointed well it clears ground, pointed badly it just burns.',
  Taurus: 'In detriment, transformation grinds against permanence. What must change will change the slow way — through the foundations.',
  Gemini: 'The underworld enters the conversation: words that expose, information as power. The depth charge is a question.',
  Cancer: 'Power runs through the roots — family, nation, tribe, remade under pressure. The grip that protects can also entomb; the renewal starts at home.',
  Leo: "The will to shine becomes the will to matter. Creative force at plutonic pressure — the ego's death and the heart's return, centre stage.",
  Virgo: 'Transformation through the meticulous: systems purged, work remade, health rebuilt from the cell up. The humble domain hides the deepest overhaul.',
  Libra: 'Power surfaces in the mirror: relationships as crucibles. The balance of power is the actual subject; fairness, the actual revolution.',
  Scorpio: "On home turf: the underworld with the floodlights on. Regeneration is the native art — nothing held that hasn't survived the fire.",
  Sagittarius: 'Beliefs get the deep excavation. Dogma dies, meaning regenerates; the truth that survives its own funeral is theirs.',
  Capricorn: 'The structures themselves go into the crucible: institutions, ambitions, authority composted and rebuilt. Power learns accountability or learns collapse.',
  Aquarius: "The collective current runs at high voltage: systems, networks, futures transformed wholesale. The group's shadow is the group's material.",
  Pisces: 'The deep and the boundless merge: dissolution as transformation. What regrows here regrows everywhere the water reaches.',
};

const NODE: Record<Sign, string> = {
  Aries: 'The pull is toward selfhood: daring to want, going solo if needed. The familiar comfort of accommodating everyone is the old game; the appetite is for their own name on the sheet.',
  Taurus: 'The pull is toward the simple and the solid: their own values, their own ground. Drama is the old country; peace is the frontier.',
  Gemini: 'The pull is toward curiosity over certainty: asking, learning, staying for the answer. The sermon is behind them; the conversation is ahead.',
  Cancer: "The pull is toward the hearth: feeling, belonging, letting themselves be fed. The summit was last season's business; the home ground is this one's.",
  Leo: 'The pull is toward the centre of their own stage: creating, risking, being seen. The safe anonymity of the crowd is the habit to outgrow.',
  Virgo: 'The pull is toward craft and the useful day: order as devotion. The fog was comfortable; the checklist, surprisingly, is the spiritual path.',
  Libra: 'The pull is toward the other: partnership, fair play, the art of with. Going it alone is already mastered — the frontier is company.',
  Scorpio: 'The pull is toward the deep: intimacy, shared resources, transformation over hoarding. The comfortable surface is the outgrown shell.',
  Sagittarius: "The pull is toward meaning: the long journey, the honest philosophy. The gossip and the errands are yesterday's homework.",
  Capricorn: 'The pull is toward standing accountable: building, mattering, weathering the storm. The tide of moods is the old home; the mountain is the new one.',
  Aquarius: 'The pull is toward the wide circle: causes, teammates, futures. The private stage is well-rehearsed; the commons is calling.',
  Pisces: 'The pull is toward surrender: trust, imagination, the unplanned. The spreadsheet of the self is complete; the sea is the syllabus.',
};

const CHIRON: Record<Sign, string> = {
  Aries: 'The tender spot is the right to exist at full volume. Doubt about their own daring becomes, tended, a gift for stirring courage in others.',
  Taurus: 'The wound is about enough — worth, safety, the ground under them. Healed slowly, it becomes the steadiest hand the squad knows.',
  Gemini: 'The sore spot is the voice: being heard, being believed. The one who struggled to say it becomes the one who coaches the saying.',
  Cancer: 'The ache is around belonging and being mothered. What they needed and organise for others becomes, in time, theirs to receive.',
  Leo: 'The wound is around shining: praise withheld, or given for the wrong self. The healing performance is the unguarded one.',
  Virgo: "The tender spot is being useful enough to deserve a place on the roster. The healer's own healing is discovering worth precedes work.",
  Libra: 'The wound walks in through relationship: picked last, kept off-balance. The medicine they carry is fairness that includes themselves.',
  Scorpio: "The sore place is trust betrayed at depth. Survived and tended, it reads others' depths with a surgeon's kindness.",
  Sagittarius: 'The wound is around meaning: faith broken, questions punished. The coach they become holds the question open for others.',
  Capricorn: 'The ache is legitimacy: never quite enough rank, recognition, standing. The mastery they build anyway becomes the mentorship they needed.',
  Aquarius: 'The tender spot is the edge of the group — the odd one, tolerated. The gift matured is making room where no one is.',
  Pisces: "The wound is boundless: everyone's pain arriving as theirs. The healing is a shoreline — compassion with a body attached.",
};

const LILITH: Record<Sign, string> = {
  Aries: "What got benched is the raw want — anger, appetite, the unapologetic first move. It comes back as clean fire the moment it's finally called onto the field.",
  Taurus: 'The refused thing is pleasure without permission. The body keeps its own counsel here; owned, it becomes unshakeable ground.',
  Gemini: 'The banished voice is the unsayable said plainly. It comes back as wit with teeth — the truth-telling this chart was warned about.',
  Cancer: 'What got benched is the need itself — hunger for care called too much. Reclaimed, it feeds without apology and mothers without martyrdom.',
  Leo: 'The refused thing is the full spotlight. The shine that was called vanity comes back as sovereignty when it stops asking.',
  Virgo: 'The banishment was of imperfection: mess, appetite, the unoptimised self. Its return makes the standards humane.',
  Libra: "What got benched is the unaccommodating no. It comes back as fairness with a spine — beauty that doesn't barter.",
  Scorpio: 'The refused thing is power at full depth: desire, rage, the uncensored current. Owned, it stops leaking and starts steering.',
  Sagittarius: "The banished voice is the heresy — the belief that didn't fit the church. It comes back as a philosophy with their own fingerprints on it.",
  Capricorn: 'What got benched is ambition in its naked form. Reclaimed from shame, it builds without asking whose permission.',
  Aquarius: 'The refused thing is the true strangeness — the difference beyond the acceptable eccentric. Owned, it stops performing and starts leading.',
  Pisces: 'What got benched is the boundless self — called dreamy, called too much, called off. It comes back as vision the daylight can use.',
};

export const sportscaster: ContentSet = {
  planetArchetypes: {
    sun: 'the will calling the shots — what they’re becoming when they play truest to themselves',
    moon: 'the needs under the surface — instinct, memory, what safety feels like',
    mercury: 'the mind in motion — how they read the play, connect it, and call it',
    venus: 'what catches their eye and how they draw it close',
    mars: 'the engine room — how they want, give chase, and defend',
    jupiter: 'the appetite for more — growth, meaning, the luck they clear space for',
    saturn: 'the load-bearing wall — limits, time, what they have to build to keep',
    uranus: 'the lightning off the bench — where they tear up the script',
    neptune: 'the solvent — imagination, longing, the blur between self and sea',
    pluto: 'the engine in the deep — power, loss, and what regrows after the wreck',
    trueNode: 'the direction of the pull — an appetite the soul hasn’t satisfied yet',
    meanNode: 'the direction of the pull — an appetite the soul hasn’t satisfied yet',
    chiron: 'the tender spot — the old wound that teaches them to patch up others',
    meanLilith: 'the benched — what got cut from the squad and comes back untamed',
  },
  signLenses: {
    Aries: {
      light: 'courage that comes off the line first and figures out the rest on the run',
      truth: 'cardinal fire: ignition, the instinct to begin',
      shadow: 'impatience that mistakes speed for progress and one player for the whole side',
    },
    Taurus: {
      light: 'steadiness, the pleasures of the moment, a real talent for making things last',
      truth: 'fixed earth: holding the line, ripening, the value of what you can touch',
      shadow: 'inertia dressed up as loyalty; a comfortable position held long past its usefulness',
    },
    Gemini: {
      light: 'quickness, curiosity, the gift of moving the ball between worlds',
      truth: 'mutable air: circulation, the pollination of ideas',
      shadow: "a scattered game; a cleverness that skims where it's afraid to dive",
    },
    Cancer: {
      light: 'fierce shelter — the memory of the tribe kept warm',
      truth: 'cardinal water: the tide that feeds and protects its own',
      shadow: 'moods that fortify into walls; care that turns into control',
    },
    Leo: {
      light: 'warmth that makes the whole squad stand taller, not smaller',
      truth: 'fixed fire: the hearth, the heart performed under the lights',
      shadow: "the need for the crowd's roar eating the joy of the play itself",
    },
    Virgo: {
      light: 'precision in service of what actually helps the side win',
      truth: 'mutable earth: harvest, discernment, the craft of improvement',
      shadow: 'the foul called before the kindness; perfect as the enemy of done',
    },
    Libra: {
      light: 'grace, fair play, the art of making a handsome partnership of two',
      truth: 'cardinal air: the scales, the opening move toward balance',
      shadow: 'peace bought by swallowing their own unspoken game plan',
    },
    Scorpio: {
      light: 'depth that does not flinch; loyalty all the way down',
      truth: "fixed water: pressure of the deep, intimacy, the transformation of what's held",
      shadow: 'control, secrecy, the sting saved for their own side',
    },
    Sagittarius: {
      light: 'faith in the horizon — meaning found by going for it',
      truth: 'mutable fire: the arrow, the ever-widening circle',
      shadow: 'the halftime sermon that outruns the journey; truth flown as a flag of escape',
    },
    Capricorn: {
      light: 'the long climb to the summit, done with dry wit and clean hands',
      truth: 'cardinal earth: structure, ambition, time as material',
      shadow: 'worth measured only in trophies; a summit that keeps receding',
    },
    Aquarius: {
      light: "the clear eye from up in the stands, in service of everyone's future",
      truth: 'fixed air: the pattern seen from above, the circuit that binds the group',
      shadow: 'principled coldness; loving the whole league while dodging the teammates on the field',
    },
    Pisces: {
      light: 'porous compassion; the imagination that dissolves every line on the pitch',
      truth: 'mutable water: the return of all rivers, the unguarded door',
      shadow: 'escape, martyrdom, the fog that steers around the edge that has to be faced',
    },
  },
  houseDomains: [
    'the kit and the kickoff — body, presence, how the game first meets them',
    'what they keep in the locker — resources, worth, the ground under their boots',
    'the home ground of the mind — siblings, quick errands, the everyday chatter',
    'the home end — home, lineage, the private floor of the self',
    'the playground — creation, romance, kids, the courage to enjoy the game',
    'the training ground — craft, daily routines, health, the dignity of the grind',
    "the head-to-head — partners, rivals, everyone who isn't them",
    "the shared deep — other people's resources, debts, sex, grief, trust",
    'the far horizon — belief, study, long road trips, the bigger map',
    'the podium — vocation, reputation, what they answer for in public',
    'the whole league — friends, allies, movements, futures mapped together',
    'the quiet tunnel — solitude, endings, the hidden work before the next run-out',
  ],
  aspectLenses: {
    conjunction: {
      light: 'two players on one boot — a pair of functions moving as one amplified voice',
      truth: "no daylight between them: these parts of them can't see each other, only play together",
      shadow: 'a blend so total neither part can be reviewed nor subbed off',
    },
    sextile: {
      light: 'an open lane — cooperation on offer whenever they run into it',
      truth: 'friendly elements offering the chance, not a guaranteed goal',
      shadow: 'the chance left untaken because it never forces the play',
    },
    square: {
      light: 'the tough marking that builds real players — the aspect of earned strength',
      truth: 'two game plans at cross-purposes demanding a construction, not a winner',
      shadow: 'the same collision replayed until the lesson is finally logged',
    },
    trine: {
      light: 'a natural — flow so easy it feels like the weather',
      truth: 'same-element harmony: support that asks nothing of them',
      shadow: 'ease gone slack in the legs; the talent never sharpened because it never had to be',
    },
    opposition: {
      light: 'the view from the far end — the full-moon read of their own polarity',
      truth: 'a see-saw of momentum: two ends of one axis negotiating balance',
      shadow: 'projection — meeting their own disowned end in other players',
    },
    semisextile: {
      light: 'a slight adjacency that careful play can stitch together',
      truth: 'neighbouring signs with nothing in common but the touchline',
      shadow: 'low-grade friction waved off until it frays',
    },
    semisquare: {
      light: 'an itch in the boots that keeps them honest',
      truth: 'a minor scuffle: irritation without full stakes',
      shadow: "a chronic small grievance mistaken for the player's character",
    },
    sesquiquadrate: {
      light: 'corrective steering — course adjustments earned mid-play',
      truth: 'square-family friction coming in at odd angles',
      shadow: 'an agitation whose source is hard to name, so it gets pinned on the wrong opponent',
    },
    quincunx: {
      light: 'the skill of playing on with what will not resolve',
      truth: 'two players with no shared language, permanently side by side',
      shadow: 'perpetual adjustment that never asks whether to renegotiate the setup',
    },
    quintile: {
      light: 'a signature move — pattern-making talent',
      truth: 'fifth-harmonic creativity: style, craft, flair on the ball',
      shadow: 'cleverness performed for the highlight reel',
    },
    biquintile: {
      light: 'an elegant back-channel between far-flung talents',
      truth: 'fifth-harmonic linkage strung across a wide arc',
      shadow: 'gifts hoarded as private tricks rather than shared craft',
    },
  },
  dignityNotes: {
    domicile: 'on home turf — this function speaks its native language here',
    exaltation: 'the star signing — welcomed, amplified, now and then over-hyped',
    detriment: 'an away game — more effort, and often more growth for the trouble',
    fall: 'a quiet bench role — the function works, quietly and underestimated',
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
