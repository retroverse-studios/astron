import type { Sign } from '@astron/core';
import type { ContentSet } from '../overrides.js';

/**
 * 🎙️ Late-night radio DJ narrator — a complete alternative content set. Same
 * meaning entry-for-entry as the shipped text, different diction; the sky is
 * tonight's setlist and every placement a dedication going out to you, slow-jam
 * pacing. The honesty rules still bind, in character.
 */

const SUN: Record<Sign, string> = {
  Aries: "You're most yourself the moment the needle drops. Identity here is a verb — struck like a match, cued fresh with every new track — and the work, night listener, is playing the song all the way to its last bar.",
  Taurus: 'Selfhood ripens slow and holds the groove. You become who you are by tending what lasts, and the blue note to watch is mistaking a warm, comfortable booth for the end of the set.',
  Gemini: "You're made of questions and quick segues. Identity lives in the exchange — telling, hearing, mixing one track into the next — and it deepens the night curiosity stops skimming the surface.",
  Cancer: 'The self is a shoreline: protective, tidal, deep with memory like a well-loved record. You become who you are by sheltering what you love, and grow when the shell learns to open as easily as it closes.',
  Leo: "You carry a hearth in the chest, listener. Radiance is the gig — warming a whole room into life — and it matures the night the shine no longer needs the call-in applause.",
  Virgo: 'You become yourself through craft: noticing, remixing, making the whole thing actually play. The gift sharpens into service when the inner critic learns to bless the take that is good enough.',
  Libra: "Identity forms in the space between two people — you know yourself best mid-duet. Grace is real power on this frequency, so long as your own melody survives the harmonising.",
  Scorpio: "You're built for the deep cuts and allergic to the surface. Selfhood is forged in intensity and renewal, and it frees itself the night control loosens its grip into trust.",
  Sagittarius: "You're the arrow and the horizon in one long note. Meaning is your fuel — found by going — and the journey ripens when the sermon gives way to the pilgrimage.",
  Capricorn: 'You become yourself by cutting a record that outlasts the mood. Mastery and time are your studio; the top of the charts means most when worth stops being measured in output alone.',
  Aquarius: "Identity here sits just outside the circle, hearing the pattern under the noise. You're most yourself spinning a future the room can't picture yet — warmest when the ideals include actual people.",
  Pisces: 'The self here has porous borders and a long fade-out. You become who you are through compassion and imagination, and stand steadiest when the softness finds its own edge.',
};

const MOON: Record<Sign, string> = {
  Aries: 'Feelings arrive fast, burn clean, and leave little ash — a track that peaks early and lets go. You feel safest acting on emotion right away; the practice is pausing without smothering the flame.',
  Taurus: 'You are fed by steadiness: familiar food, familiar arms, the unhurried hour on the slow-jam hour. Security is sensory and real here, and it deepens when routine stays nourishment and not a locked booth.',
  Gemini: 'You metabolise feeling by talking it out on the line. Safety is a good conversation, and the heart settles once the words stop circling the block and finally land.',
  Cancer: 'The needs here are the classics, felt at full tide: belonging, memory, home. You read moods like weather over the airwaves — your own storms included — and you shelter others on pure instinct.',
  Leo: 'You need to be seen to feel safe, and there is no shame in the request line. Warmth received becomes warmth radiated; unwitnessed, the heart dims down and starts to perform instead.',
  Virgo: 'You soothe yourself by setting things right — a tidied studio is a tidied mind. Care arrives dressed as usefulness, and it rests easier when nobody is auditing the tape.',
  Libra: 'Equilibrium is your comfort food; conflict lands in the body like static. You are fed by beauty and fairness, and grow sturdy when peace no longer costs you your honesty.',
  Scorpio: 'Feelings run deep, silent, and total here, like a bassline you feel more than hear. Trust is expensive and worth every cent; the same instinct that guards the well can also seal it shut.',
  Sagittarius: 'You are nourished by open doors and long views down the highway. Confinement reads as danger on this dial; the practice is finding the horizon inside the commitment.',
  Capricorn: 'Feeling comes on air with a chaperone here — measured, translated into duty. The tenderness is real and runs deep; it just asks permission to need without earning it first.',
  Aquarius: 'You process emotion from one step back in the booth, which is a skill and a habit both. Belonging to everyone can dodge belonging to someone; the cool air warms with practice.',
  Pisces: "You feel the room before you walk into it. The line between your weather and everyone else's blurs — the gift is compassion, the discipline is knowing whose tide is whose.",
};

const MERCURY: Record<Sign, string> = {
  Aries: "Thought moves like a struck match — first word on the mic, sometimes before the room is ready. The mind is decisive and brave, and it listens best when it means to.",
  Taurus: 'You think in slow layers, like a track built one track at a time: firm conclusions, laid down to keep. What you learn, you hold — and the same grip can hold an outdated liner note too long.',
  Gemini: "The mind is home on this frequency — quick, plural, delighted. You mix anything into anything; depth is a choice this brilliance has to keep making, night after night.",
  Cancer: 'You think with the memory and speak from the tide. Facts arrive wrapped in feeling, which makes you persuasive on air — and makes checking the wrapping well worth the while.',
  Leo: 'Ideas come to the mic dressed for the main stage. You narrate, and beautifully; the craft matures when being interesting stops outranking being accurate.',
  Virgo: "The mind is a fine instrument, calibrated for what's fixable. Analysis is love in this dialect — and it plays kindest when the red pen rests once in a while.",
  Libra: 'You think in duets and weigh every side. Judgement here is genuinely fair and famously slow; some scales only settle when you finally set your own weight on them.',
  Scorpio: "The mind is an investigator — quiet, thorough, not to be fooled. You hear what isn't said between the lines; the skill turns lonely when everything starts sounding like evidence.",
  Sagittarius: 'You think in maps, morals, and punchlines. The big picture comes easy; the fine print is a discipline worth borrowing from the sound engineer.',
  Capricorn: "Thought is structural here: what bears load, what won't. You speak little and build much — and the dry humour is a feature on this show, not a glitch in the feed.",
  Aquarius: 'The mind runs on pattern and principle, comfortable far from consensus. You hear the whole system at once; translating it for the humans inside is the real art.',
  Pisces: 'You think in images, osmosis, and tide. Logic comes on late but insight comes on early; the notebook by the mixing desk is load-bearing equipment.',
};

const VENUS: Record<Sign, string> = {
  Aries: 'Desire is direct here — you love like a shout-out live on air. The chase delights you; the keeping asks for a different kind of courage.',
  Taurus: 'Love is at home in the body and the slow dance. You attach slowly, sensually, for keeps — and the holding plays loveliest with the grip relaxed.',
  Gemini: "Attraction begins at the conversation. Variety isn't fickleness here, it's appetite for the mind's company; the deepening is a choice you make twice a day.",
  Cancer: 'You love by feeding, keeping, remembering. Devotion pools deep as a midnight ballad; it stays sweet when care asks first what the other one actually needs.',
  Leo: 'Love is theatre in the best sense — generous, loyal, lit up like a marquee. You give magnificently and wilt without notice; say so, listener, rather than dimming the lights.',
  Virgo: 'Affection here is practical devotion: the fixed hinge, the packed lunch, the noticed detail. It is love, the whole of it — so let it also be received.',
  Libra: 'Venus rules this booth: harmony, beauty, the artistry of the pair. You make relationship an art form; just keep one brushstroke that is only yours.',
  Scorpio: 'You love at full depth or not at all. Intimacy is the true currency; the vault keeps treasure and, left unwatched, quietly keeps score.',
  Sagittarius: 'Love needs a horizon here — a shared road trip beats a shared sofa. Freedom is the love language; make sure the other dialect gets spoken too.',
  Capricorn: "You love in commitments, not confetti. Time is the proof and the gift; just let a little delight in before it's earned.",
  Aquarius: 'Affection begins in friendship and keeps its airspace. You love the whole person, the oddities first; closeness grows when distance stops being the default reply.',
  Pisces: 'You love the way water loves — totally, formlessly, sometimes clean past the point of self. Exalted here: the compassion is real magic, and it works best with a shore.',
};

const MARS: Record<Sign, string> = {
  Aries: 'The engine is home: ignition without hesitation. You fight clean and forget fast; the finish line deserves the same passion as the opening bar.',
  Taurus: 'Force moves slow here and will not be pushed back. Patience is your weapon; so is stubbornness, and only one of the two is actually choosing.',
  Gemini: 'You fence with words and win on agility. Scattered fire lights nothing twice — but aimed, this quickness is formidable.',
  Cancer: 'Drive here is tidal and protective — slow to anger, total in defence of its own. Sideways anger costs more than the direct kind; practise the direct kind, listener.',
  Leo: 'You act from the heart with the volume all the way up. Courage is native; the performance of courage is the counterfeit to refuse.',
  Virgo: 'Effort is precise here — energy spent like a scalpel, not a hammer. You win by craft; perfection is the ambush to walk right past.',
  Libra: 'You fight for fairness and hate the fighting. Grace under conflict is real strength; deciding is the muscle that needs the reps.',
  Scorpio: 'Traditional ruler at full depth: will like pressure at the ocean floor. You outlast everyone; just make sure the campaign is still worth the siege.',
  Sagittarius: 'Drive needs a quest here. You act for meaning and travel light; scattershot crusades are the tax you pay on that fire.',
  Capricorn: "Exalted: ambition with an engineer's patience. You climb in all weather; just remember to notice the view you fought for.",
  Aquarius: 'You fight for the group and from the perimeter — strategy over heat. Detachment wins wars and loses evenings; choose which one per occasion.',
  Pisces: "Will moves like current here — indirect, persistent, dissolving obstacles rather than breaking them. Name the goal, or the current ends up serving someone else's.",
};

const JUPITER: Record<Sign, string> = {
  Aries: 'Growth comes by daring first. Your luck stands at the front of the line — generosity of nerve, spent best on beginnings that get finished.',
  Taurus: 'Abundance grows like an orchard here: slowly, then dependably. The faith is in the tangible; the pruning is part of the tending.',
  Gemini: 'You expand by connecting everything to everything. In detriment, breadth outruns depth easy — the record collection grows; let a few of the tracks get finished.',
  Cancer: 'Exalted: growth through shelter. Generosity pours out as care and multiplies; the feast means most when you also pull up a chair.',
  Leo: 'Faith wears its brightest coat here. You grow by giving heart at scale — magnanimity is the luck, vanity the leak in the sound.',
  Virgo: 'Growth by increments, meaning in the maintenance. In detriment, the big picture arrives via small correct steps — trust the accumulation.',
  Libra: 'You expand through partnership and fairness; luck arrives introduced by someone. Justice is the philosophy — practise it on yourself too.',
  Scorpio: 'Growth happens in the depths here: through crisis survived, truth faced, trust rebuilt. The treasure is real and the descent is the price of it.',
  Sagittarius: 'Home turf: the horizon fund is fully vested. Meaning multiplies when you travel toward it; the sermon stays honest while the journey continues.',
  Capricorn: 'In fall, faith submits to the audit — growth has to show its working. What survives the scrutiny is durable optimism, the rarest cut on the record.',
  Aquarius: 'You grow by widening the circle. The luck is collective — visions that lift the whole room — and it lands when the future includes the present.',
  Pisces: 'Traditional ruler at high tide: faith without walls. Compassion expands everything it touches; the boundary is what keeps the sea a gift.',
};

const SATURN: Record<Sign, string> = {
  Aries: 'In fall, the brake and the accelerator share one foot. Discipline has to learn to move at speed — hesitation studied until it turns into timing.',
  Taurus: 'You build slow and to last. Security is the project of decades; the lesson is that enough, eventually, must be allowed to be enough.',
  Gemini: 'Structure comes to the mind here: speech weighed, learning earned. The wall against scatter becomes a whole library, given time.',
  Cancer: 'In detriment, the wall runs right through the home. Feeling and duty sit down to negotiate; the mature treaty lets tenderness be structural too.',
  Leo: 'In detriment, the crown is heavy and the applause suspect. The work is shining without permission — authority earned out past the fear of the stage.',
  Virgo: 'Discipline finds its workshop here. Standards are high and mostly met; mercy is the one tool missing from the top drawer.',
  Libra: 'Exalted: justice with a spine. You build fairness that holds under load — commitments as architecture, kindness with terms.',
  Scorpio: 'Structure meets the depths: control tested against the uncontrollable. What survives is unshakeable; what had to be released was never yours to hold.',
  Sagittarius: 'The far horizon gets a survey team. Faith is examined, then load-bearing; the journey gains a map it can actually trust.',
  Capricorn: 'Home turf: time, gravity, and the long climb all report to you. Mastery is native — the mountain is real, and so is the schedule for resting.',
  Aquarius: "Traditional ruler: the pattern gets real engineering. You build for the future's people; the blueprint warms the moment they're consulted.",
  Pisces: 'Structure in the water: hard here, and precious for it. The work is giving the boundless a container it consents to — banks, not dams.',
};

const URANUS: Record<Sign, string> = {
  Aries: 'The lightning takes the lead: rebellion as first instinct. Breakthroughs come fast; revolutions need a second week to hold.',
  Taurus: 'In fall by tradition, the awakener meets the immovable. Change arrives through the ground itself — slow revolutions, and permanent.',
  Gemini: 'The mind electrifies: ideas arrive in storms and networks. Genius is native here; follow-through is imported.',
  Cancer: 'The lightning strikes home — family scripts interrupted, roots rewired live. Freedom and belonging learn to share one house.',
  Leo: 'In detriment, the rebel wants a throne. The authentic performance breaks every format; the trap is being different just for the mirror.',
  Virgo: 'Revolution by refinement: systems debugged, the daily work reinvented. The radical act here is the improved routine.',
  Libra: 'Partnership gets renegotiated from first principles. Fairness demands originality; the experiment is commitment without the cage.',
  Scorpio: 'Exalted by tradition: the awakener down in the depths. Transformation arrives as rupture and turns out to be rescue.',
  Sagittarius: 'Belief systems get struck by weather. The heresy is usually early truth; aim it, and it becomes a whole curriculum.',
  Capricorn: 'The lightning audits the establishment. Structures are broken precisely — the rebel with a spreadsheet, the reform that actually holds.',
  Aquarius: 'Home turf: the future speaks in its native tongue. The pattern-breaker serves the group; the distance from the crowd is the vantage, not the wall.',
  Pisces: 'The awakener dissolves into the water table: intuition electrified. Visions arrive unscheduled — the practice is writing them down.',
};

const NEPTUNE: Record<Sign, string> = {
  Aries: 'The dream wants a spearhead at the front. Ideals arrive with adrenaline; the crusade stays holy exactly as long as it stays honest.',
  Taurus: 'The mist settles on the material: beauty found in the tangible, money touched by fantasy. Enchantment is lovely; the appraisals still matter.',
  Gemini: "Language turns to watercolour. Stories persuade past their facts here — a poet's gift with a fact-checker's homework still due.",
  Cancer: 'The longing is for the original home. Memory idealises; the compassion for family is real, and so is the fog wrapped around it.',
  Leo: 'Glamour in the classic sense: the shine that borrows from dream. Creativity is genuinely inspired; the audience is genuinely imagined.',
  Virgo: 'In detriment, the boundless meets the checklist. Service becomes devotion — the sacred found in the useful, once perfection stops posing as holiness.',
  Libra: 'The ideal of the perfect other, projected in high resolution. Real love comes on air when the projector dims and the person remains.',
  Scorpio: 'The solvent works at depth: obsession, mysticism, desire past its own explanations. The undertow is strong; so is what it has to teach.',
  Sagittarius: 'Faith without borders, journey without maps. The vision is genuinely vast — the discernment is telling which horizon is real.',
  Capricorn: 'The dream meets the institution: idealism about structures, disillusion as the curriculum. What survives is the workable vision.',
  Aquarius: 'Utopia gets a schematic. Collective dreams run bright and impersonal; the humans in the diagram still need names.',
  Pisces: 'Home turf: the ocean, undiluted. Imagination, compassion, and dissolution at full strength — the raft of routine is not optional.',
};

const PLUTO: Record<Sign, string> = {
  Aries: 'Power expresses as raw initiative: tear down, begin, repeat. The furnace is enormous — pointed well, it clears the land; pointed badly, it just burns.',
  Taurus: 'In detriment, transformation grinds against permanence. What must change will change the slow way — right through the foundations.',
  Gemini: 'The underworld enters the conversation: words that expose, information as power. The depth charge here is a question.',
  Cancer: 'Power runs through the roots — family, nation, tribe, remade under pressure. The grip that protects can also entomb; the renewal starts at home.',
  Leo: "The will to shine becomes the will to matter. Creative force at plutonic pressure — the ego's death and the heart's return, right there on stage.",
  Virgo: 'Transformation through the meticulous: systems purged, work remade, health rebuilt from the cell up. The humble domain hides the deepest overhaul.',
  Libra: 'Power surfaces in the mirror: relationships as crucibles. The balance of power is the real subject; fairness, the real revolution.',
  Scorpio: "Home turf: the underworld with the lights on. Regeneration is the native art — nothing held that hasn't survived the fire first.",
  Sagittarius: 'Beliefs get the deep excavation. Dogma dies, meaning regenerates; the truth that survives its own funeral is yours to keep.',
  Capricorn: 'The structures themselves go into the crucible: institutions, ambitions, authority composted and rebuilt. Power learns accountability or learns collapse.',
  Aquarius: "The collective current runs at high voltage: systems, networks, futures transformed wholesale. The group's shadow is the group's material.",
  Pisces: 'The deep and the boundless merge: dissolution as transformation. What regrows here regrows everywhere the water reaches.',
};

const NODE: Record<Sign, string> = {
  Aries: 'The pull is toward selfhood: daring to want, going solo if the song calls for it. The familiar comfort of accommodating everyone is the past; the appetite is for your own name up in lights.',
  Taurus: 'The pull is toward the simple and the solid: your own values, your own ground. Drama is the old country; peace is the frontier.',
  Gemini: 'The pull is toward curiosity over certainty: asking, learning, staying on the line for the answer. The sermon is behind you; the conversation is up ahead.',
  Cancer: "The pull is toward the hearth: feeling, belonging, letting yourself be fed. The summit was last life's business; the home is this one's.",
  Leo: 'The pull is toward the centre of your own stage: creating, risking, being seen. The safe anonymity of the crowd is the habit to outgrow.',
  Virgo: 'The pull is toward craft and the useful day: order as devotion. The fog was comfortable; the checklist, surprisingly, is the spiritual path.',
  Libra: 'The pull is toward the other: partnership, fairness, the art of duet. Going it alone is mastered already — the frontier is company.',
  Scorpio: 'The pull is toward the depths: intimacy, shared resources, transformation over accumulation. The comfortable surface is the outgrown shell.',
  Sagittarius: "The pull is toward meaning: the long journey, the honest philosophy. The gossip and the errands are yesterday's homework.",
  Capricorn: 'The pull is toward standing accountable: building, mattering, weathering the storm. The tide of moods is the old home; the mountain is the new one.',
  Aquarius: 'The pull is toward the wide circle: causes, colleagues, futures. The private stage is well-rehearsed; the commons is calling.',
  Pisces: 'The pull is toward surrender: trust, imagination, the unplanned. The spreadsheet of the self is complete; the sea is the syllabus.',
};

const CHIRON: Record<Sign, string> = {
  Aries: 'The tender place is the right to exist at full volume. Doubt about your own daring becomes, once tended, a gift for stirring courage in others.',
  Taurus: 'The wound is about enough — worth, safety, the ground under you. Healed slowly, it becomes the steadiest hand the room knows.',
  Gemini: 'The sore spot is the voice: being heard, being believed. The one who struggled to say it becomes the one who teaches the saying.',
  Cancer: 'The ache is around belonging and being mothered. What you needed and organise for others becomes, in time, yours to receive.',
  Leo: 'The wound is around shining: praise withheld, or given for the wrong self. The healing performance is the unguarded one.',
  Virgo: "The tender place is being useful enough to deserve a place. The healer's healing is discovering worth comes before the work.",
  Libra: 'The wound walks in through relationship: chosen last, kept off-balance. The medicine you carry is a fairness that includes yourself.',
  Scorpio: "The sore place is trust betrayed at depth. Survived and tended, it reads other people's depths with a surgeon's kindness.",
  Sagittarius: 'The wound is around meaning: faith broken, questions punished. The teacher you become holds the question open for others.',
  Capricorn: 'The ache is legitimacy: never quite enough authority, recognition, standing. The mastery you build anyway becomes the mentorship you needed.',
  Aquarius: 'The tender place is the edge of the group — the odd one, tolerated. The gift matured is making rooms where no one is.',
  Pisces: "The wound is boundless: everyone's pain arriving as yours. The healing is a shoreline — compassion with a body attached.",
};

const LILITH: Record<Sign, string> = {
  Aries: 'What was exiled is the raw want — anger, appetite, the unapologetic first move. It comes back as clean fire the moment it is finally invited to the table.',
  Taurus: 'The refused thing is pleasure without permission. The body keeps its own counsel here; owned, it becomes unshakeable ground.',
  Gemini: 'The banished voice is the unsayable said plainly. It comes back as wit with teeth — the truth-telling this chart was warned about.',
  Cancer: 'What was exiled is the need itself — hunger for care called too much. Reclaimed, it feeds without apology and mothers without martyrdom.',
  Leo: 'The refused thing is the full spotlight. The shine that got called vanity comes back as sovereignty the moment it stops asking.',
  Virgo: 'The banishment was of imperfection: mess, appetite, the unoptimised self. Its return makes the standards humane.',
  Libra: "What was exiled is the unaccommodating no. It comes back as fairness with a spine — beauty that doesn't barter.",
  Scorpio: 'The refused thing is power at full depth: desire, rage, the uncensored current. Owned, it stops leaking and starts steering.',
  Sagittarius: "The banished voice is the heresy — the belief that didn't fit the church. It comes back as a philosophy with your fingerprints all over it.",
  Capricorn: 'What was exiled is ambition in its naked form. Reclaimed from shame, it builds without asking whose permission.',
  Aquarius: 'The refused thing is the true strangeness — the difference beyond the acceptable eccentric. Owned, it stops performing and starts leading.',
  Pisces: 'What was exiled is the boundless self — called dreamy, called too much, called away with the tide. It comes back as vision the daylight can use.',
};

export const dj: ContentSet = {
  planetArchetypes: {
    sun: 'the conscious will — what you are becoming when you play truest to yourself',
    moon: 'the needs underneath — instinct, memory, what safety feels like',
    mercury: 'the mind in motion — how you take in, connect, and say it on air',
    venus: 'what you find beautiful and how you draw it close',
    mars: 'the engine — how you want, pursue, and defend',
    jupiter: 'the appetite for more — growth, meaning, the luck you make room for',
    saturn: 'the load-bearing wall — limits, time, what you must build to keep',
    uranus: 'the lightning — where you refuse the script',
    neptune: 'the solvent — imagination, longing, the blur between self and sea',
    pluto: 'the underworld engine — power, loss, and what regrows after',
    trueNode: "the direction of pull — an appetite the soul hasn't satisfied yet",
    meanNode: "the direction of pull — an appetite the soul hasn't satisfied yet",
    chiron: 'the tender place — the wound that teaches you to heal others',
    meanLilith: 'the refused — what was exiled and comes back untamed',
  },
  signLenses: {
    Aries: {
      light: 'courage that moves first and figures the rest out en route',
      truth: 'cardinal fire: ignition, the instinct to begin',
      shadow: 'impatience that mistakes speed for progress and self for the whole room',
    },
    Taurus: {
      light: 'steadiness, sensuality, the talent for making things last',
      truth: 'fixed earth: holding, ripening, the value of the tangible',
      shadow: 'inertia dressed up as loyalty; a comfort held on past its usefulness',
    },
    Gemini: {
      light: 'quickness, curiosity, the gift of translation between worlds',
      truth: 'mutable air: circulation, the pollination of ideas',
      shadow: 'scatter; a cleverness that skims where it is afraid to dive',
    },
    Cancer: {
      light: 'fierce shelter — the memory of the tribe kept warm',
      truth: 'cardinal water: the tide that feeds and protects its own',
      shadow: 'moods that fortify into walls; care that curdles into control',
    },
    Leo: {
      light: 'warmth that makes others feel more alive, not smaller',
      truth: 'fixed fire: the hearth, the heart performed on stage',
      shadow: 'the need for applause eating the joy of the act itself',
    },
    Virgo: {
      light: 'precision in service of what actually helps',
      truth: 'mutable earth: harvest, discernment, the craft of improvement',
      shadow: 'the criticism that arrives before the compassion; perfect as the enemy of done',
    },
    Libra: {
      light: 'grace, fairness, the art of making relationship beautiful',
      truth: 'cardinal air: the scales, the initiating of balance',
      shadow: 'a peace purchased with your own unspoken preferences',
    },
    Scorpio: {
      light: 'depth that does not flinch; loyalty all the way down to the underworld',
      truth: "fixed water: pressure, intimacy, the transformation of what's held",
      shadow: 'control, secrecy, the sting saved for your own hide',
    },
    Sagittarius: {
      light: 'faith in the horizon — meaning found by going',
      truth: 'mutable fire: the arrow, the ever-widening circle',
      shadow: 'the sermon that outruns the journey; truth flown as a flag of escape',
    },
    Capricorn: {
      light: 'the long climb done with dry humour and clean hands',
      truth: 'cardinal earth: structure, ambition, time as material',
      shadow: 'worth measured only in output; the summit that keeps on receding',
    },
    Aquarius: {
      light: "clear-eyed distance in service of everyone's future",
      truth: 'fixed air: the pattern seen from above, the circuit of the group',
      shadow: 'principled coldness; loving humanity while dodging the humans',
    },
    Pisces: {
      light: 'porous compassion; the imagination that dissolves every border',
      truth: 'mutable water: the return of all rivers, the unguarded door',
      shadow: 'escape, martyrdom, the fog that steers around the edge that must be faced',
    },
  },
  houseDomains: [
    'the mask and the doorway — body, presence, how life first meets you',
    'what you keep — resources, worth, the ground under your feet',
    'the neighbourhood of the mind — siblings, errands, everyday words',
    'the taproot — home, lineage, the private floor of the self',
    'the playground — creation, romance, children, the courage to enjoy',
    'the workshop — craft, routines, health, the dignity of maintenance',
    'the mirror — partners, rivals, everyone who is not you',
    "the shared depths — other people's resources, debts, sex, grief, trust",
    'the far horizon — belief, study, journeys, the bigger map',
    'the summit — vocation, reputation, what you answer for in public',
    'the commons — friends, allies, movements, futures imagined together',
    'the retreat — solitude, endings, the hidden work before the next set',
  ],
  aspectLenses: {
    conjunction: {
      light: 'two hands on one turntable — a pair of functions playing as one louder voice',
      truth: 'no distance between them: these parts of you cannot see each other, only act together',
      shadow: 'a blend so total neither part can be examined or turned off',
    },
    sextile: {
      light: 'an open door — cooperation on offer whenever you reach for it',
      truth: 'compatible elements offering opportunity, not a guarantee',
      shadow: 'the gift left unwrapped because it never forces the issue',
    },
    square: {
      light: 'the friction that builds engines — the aspect of earned strength',
      truth: 'two agendas at cross-purposes demanding a construction, not a winner',
      shadow: 'the same fight rerun until the lesson is finally taken',
    },
    trine: {
      light: 'native talent — flow so easy it feels like the weather',
      truth: 'same-element harmony: support that asks nothing of you',
      shadow: 'ease gone slack; the talent never sharpened because it never had to be',
    },
    opposition: {
      light: 'perspective — the full-moon view of your own polarity',
      truth: 'a see-saw: two ends of one axis negotiating balance',
      shadow: 'projection — meeting your own disowned end in other people',
    },
    semisextile: {
      light: 'a slight adjacency that careful attention can stitch together',
      truth: 'neighbouring signs with nothing in common but the fence',
      shadow: 'a low-grade friction dismissed until it frays the line',
    },
    semisquare: {
      light: 'an itch that keeps you honest',
      truth: 'a minor square: irritation without the full stakes',
      shadow: 'a chronic small grievance mistaken for personality',
    },
    sesquiquadrate: {
      light: 'corrective torque — course adjustments earned mid-flight',
      truth: 'square-family friction arriving at odd angles',
      shadow: 'an agitation whose source is hard to name, so it gets misassigned',
    },
    quincunx: {
      light: 'the skill of living with what will not resolve',
      truth: 'two functions with no shared language, permanently adjacent',
      shadow: 'perpetual adjustment that never asks whether to renegotiate',
    },
    quintile: {
      light: 'a signature flourish — pattern-making talent',
      truth: 'fifth-harmonic creativity: style, craft, play',
      shadow: 'cleverness performed for its own reflection',
    },
    biquintile: {
      light: 'an elegant back-channel between distant talents',
      truth: 'fifth-harmonic linkage strung across a wide arc',
      shadow: 'gifts kept as private tricks rather than shared craft',
    },
  },
  dignityNotes: {
    domicile: 'home turf — this function speaks its native language here',
    exaltation: 'an honoured guest — welcomed, amplified, once in a while over-praised',
    detriment: 'an away game — more effort, and often more growth for the trouble',
    fall: 'a muted register — the function works, quietly and underestimated',
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
