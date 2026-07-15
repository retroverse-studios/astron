import type { Sign } from '@astron/core';
import type { ContentSet } from '../overrides.js';

/**
 * 👵 Loving-grandmother narrator — a complete alternative content set. Same
 * meaning entry-for-entry as the shipped text, different diction; the
 * honesty rules still bind, in character. The warmth never erases the
 * shadow — she names it gently, then puts the kettle on.
 */

const SUN: Record<Sign, string> = {
  Aries: "You're most yourself the moment you begin, sweetheart. Who you are is a doing here — struck like a match, made new by every fresh start — and your work, love, is finishing what that lovely spark begins.",
  Taurus: "Selfhood ripens slow in you, like fruit on the sill, and it holds. You become who you are by tending what lasts — and now, dear, I'll not pretend you never mistake a comfy chair for the whole journey done.",
  Gemini: "You're made of questions and quick little bridges, pet. Who you are lives in the to-and-fro — telling, hearing, joining things up — and it deepens the day your curiosity stops skimming the top and settles in.",
  Cancer: "The self in you is a shoreline, love: protective, tidal, deep with memory. You become who you are by sheltering what you love, and you grow, dear heart, when that shell learns to open as well as close.",
  Leo: "You carry a hearth right there in your chest, my darling. Shining is the job — warming a whole room to life — and it grows up lovely the day the glow no longer waits on anyone's clapping.",
  Virgo: "You become yourself through good honest craft, pet: noticing, tidying, making things truly work. The gift ripens into service, love, when that inner fusspot finally learns to bless what's good enough.",
  Libra: "Who you are takes shape in the space between people, dear — you know yourself best mid-friendship. Grace is real power in you, so long, love, as your own likings survive all that peacemaking.",
  Scorpio: "You're built for the deep end, pet, and the shallows never suited you. Selfhood is forged in you through intensity and renewal — and it sets itself free the day that tight grip loosens into trust.",
  Sagittarius: "You're the arrow and the horizon both at once, love. Meaning is your fuel — found by going — and the journey ripens, dear, when the preaching quiets down and the pilgrimage takes over.",
  Capricorn: "You become yourself by building something that outlasts the weather of a mood, pet. Mastery and time are your timber; the summit means most, love, when your worth stops being weighed by what you've made alone.",
  Aquarius: "Who you are stands a step outside the circle, dear, seeing the whole pattern. You're most yourself serving a future the rest can't yet picture — and warmest, love, when those grand ideals have room for actual people.",
  Pisces: "The self in you has soft, porous edges and a long, long tide, my love. You become who you are through compassion and imagination — and you stand steadiest, pet, when all that tenderness finds an edge of its own.",
};

const MOON: Record<Sign, string> = {
  Aries: "Your feelings arrive quick, burn clean, and leave hardly any ash, love. You're safest when you can act on a feeling straightaway — and the practice, pet, is learning to pause without ever smothering the flame.",
  Taurus: "You're fed by steadiness, dear: familiar food, familiar arms, the unhurried hour. Your safety is real and it lives in the senses — and it deepens, love, when routine stays a nourishment and doesn't harden into a fortress.",
  Gemini: "You digest a feeling by talking it right through, pet. Safety, for you, is a good long conversation — and the heart settles once the words stop circling and finally land somewhere.",
  Cancer: "Your needs are the old, dear ones, felt at the full tide, my love: belonging, memory, home. You read moods like weather — your own storms included — and you shelter others as easy as breathing.",
  Leo: "You need to be seen to feel safe, love, and there's not a scrap of shame in that. Warmth taken in becomes warmth given out; unwitnessed, though, the heart dims down and starts to perform instead.",
  Virgo: "You soothe yourself by setting things to rights, pet — a tidied room is a tidied mind for you. Your care comes out as usefulness, and it rests a good deal easier, dear, when nobody's totting it up.",
  Libra: "An even keel is your comfort food, love; a quarrel lands right in the body. You're fed by beauty and fair dealing — and you grow sturdy, dear, the day peace stops costing you your honesty.",
  Scorpio: "Your feelings run deep, quiet, and whole, pet. Trust is dear-bought in you and well worth it — but mind, love, the same instinct that guards the well can seal it over too.",
  Sagittarius: "You're nourished by open doors and long views, my love. A shut-in feeling reads to you as danger — so the practice, dear, is finding the horizon tucked inside the commitment.",
  Capricorn: "Feeling comes to you with a chaperone, love — measured out, turned into duty. The tenderness is real and runs deep, mind you; it only asks leave to need without having to earn it first.",
  Aquarius: "You take your feelings in from one step back, pet — that's a skill and a habit both. Belonging to everyone can dodge belonging to someone, dear; but the cool air does warm with practice.",
  Pisces: "You feel the room before you've so much as stepped in it, love. The line between your weather and everyone else's goes blurry — the gift is your compassion, pet, and the discipline is knowing whose tide is whose.",
};

const MERCURY: Record<Sign, string> = {
  Aries: "Your thinking moves like a struck flint, pet — first word in the room, sometimes before the room's quite ready. The mind is brave and decisive, love, and it listens best when it means to.",
  Taurus: "You think in slow layers, dear, like stone settling, and your conclusions hold firm. What you learn, you keep — though mind, love, the same grip that holds knowledge can hold onto an out-of-date map.",
  Gemini: "The mind is right at home here, pet — quick, plural, tickled pink. You can join anything to anything; depth, love, is just a choice all that brilliance has to keep on making.",
  Cancer: "You think with your memory and speak from the tide, dear. Facts come to you wrapped up in feeling, which makes you ever so persuasive — and makes it worthwhile, love, to check inside the wrapping.",
  Leo: "Your ideas arrive all dressed for the stage, pet. You tell a tale, and beautifully too; the craft grows up, love, the day being interesting stops outranking being right.",
  Virgo: "The mind in you is a fine instrument, dear, tuned for whatever's fixable. Analysis is how you say love — and it's kindest, pet, when that red pen gets to rest now and again.",
  Libra: "You think in back-and-forths and weigh up every side, love. Your judgement is genuinely fair and famously slow — and some scales, dear, only settle when you finally set your own weight on them.",
  Scorpio: "The mind in you is a proper investigator, pet — quiet, thorough, not to be fooled. You hear what isn't said; the trouble, love, is it turns lonely when everything starts looking like evidence.",
  Sagittarius: "You think in maps, morals, and punchlines, dear. The big picture comes to you natural as anything; the fine print, love, is a discipline well worth borrowing from someone.",
  Capricorn: "Your thinking is structural, pet — what'll bear a load and what won't. You say little and build much — and that dry humour, love, is a feature and no leak at all.",
  Aquarius: "Your mind runs on pattern and principle, dear, quite comfy far from what everyone agrees. You see the whole system at once; the art, love, is translating it back to the humans living inside it.",
  Pisces: "You think in pictures, in soaking-in, in tide, pet. Logic turns up late but insight arrives early — so that notebook by the bed, love, is load-bearing equipment, mark my words.",
};

const VENUS: Record<Sign, string> = {
  Aries: "Your wanting is direct, love — you love like a declaration. The chase delights you; the keeping, pet, asks for a different sort of courage.",
  Taurus: "Love is right at home in you, in the body and the garden. You attach slow, sensual, for keeps — and the holding, dear, is loveliest of all with the grip eased off.",
  Gemini: "Attraction begins for you at the conversation, pet. Variety's no fickleness here — it's appetite for the mind's good company; the deepening, love, is a choice you make twice a day.",
  Cancer: "You love by feeding, keeping, remembering, dear heart. Your devotion pools deep — and it stays sweet, love, when your care asks first what the other one actually needs.",
  Leo: "Love in you is theatre in the best sense — generous, loyal, all lit up. You give magnificently and wilt with no one noticing; so say so, pet, rather than dimming yourself down.",
  Virgo: "Your affection is practical devotion, love: the mended hinge, the packed lunch, the noticed little thing. It's love, all of it, dear — now let it be received as well.",
  Libra: "Venus is right at home in you, pet: harmony, beauty, the artistry of the pair. You make a relationship an art form — just keep one brushstroke, love, that's only yours.",
  Scorpio: "You love at the depths or not at all, dear. Intimacy's your true currency — but mind, love, that vault keeps treasure and, left unwatched, keeps score too.",
  Sagittarius: "Love needs a horizon in you, pet — a shared journey beats a shared sofa. Freedom is your love language; just see, dear, that the other one's dialect gets spoken too.",
  Capricorn: "You love in commitments, love, not confetti. Time is your proof and your gift — but do let a bit of delight in, pet, before it's gone and earned itself.",
  Aquarius: "Your affection begins in friendship and keeps its bit of airspace, dear. You love the whole person, oddities first — and closeness grows, love, once distance stops being your standing reply.",
  Pisces: "You love the way water loves, pet — totally, formlessly, sometimes clean past yourself. Venus is exalted in you: the compassion is real magic, and it works best, love, with a shore to come home to.",
};

const MARS: Record<Sign, string> = {
  Aries: "The engine's right at home in you, love: ignition, no dithering. You fight clean and forget fast; just remember, pet, the finish line deserves the same fire as the start.",
  Taurus: "Force moves slow in you, dear, and it won't be shoved backward. Patience is your weapon — so is stubbornness, mind you, and only the one of them actually chooses.",
  Gemini: "You fence with words, pet, and win on nimbleness. Scattered fire lights nothing twice — but aimed, love, this quickness of yours is a formidable thing.",
  Cancer: "Your drive is tidal and protective, dear — slow to anger, but total in defence of your own. Sideways anger costs you more than the straight kind; so practise the straight kind, love.",
  Leo: "You act from the heart with the volume turned right up, pet. Courage comes native to you — but the performance of courage, love, that's the counterfeit coin to refuse.",
  Virgo: "Your effort is precise, dear — energy spent like a scalpel, never a hammer. You win by craft; and perfection, love, is the ambush you learn to walk straight past.",
  Libra: "You fight for fairness, pet, and you hate the fighting itself. Grace under conflict is real strength — but deciding, love, that's the muscle that wants the gym.",
  Scorpio: "You're the old ruler here at full depth, dear: will like pressure at the ocean floor. You outlast every last one of them — just make sure, love, the campaign's still worth the siege.",
  Sagittarius: "Your drive needs a quest, pet. You act for meaning and travel light; scattershot crusades, love, are the tax on all that fire.",
  Capricorn: "Mars is exalted in you, dear: ambition with an engineer's patience. You climb in all weathers — just remember, love, to notice the view you fought so hard for.",
  Aquarius: "You fight for the group, pet, and from the perimeter — strategy over heat. Detachment wins wars and loses evenings, dear; so choose which, love, depending on the occasion.",
  Pisces: "Your will moves like a current, love — indirect, persistent, dissolving what's in the way rather than breaking it. Name the goal, pet, or that current goes and serves someone else's.",
};

const JUPITER: Record<Sign, string> = {
  Aries: "You grow by daring first, love. Your luck stands right at the front of the queue — a generosity of nerve, best spent, pet, on beginnings that actually get finished.",
  Taurus: "Abundance grows in you like an orchard, dear: slow, then dependable. Your faith is in the tangible — and the pruning, love, is every bit as much part of the tending.",
  Gemini: "You expand by joining everything up, pet. Jupiter's in detriment here, so breadth outruns depth easy as anything — the library grows lovely, dear; just let some of the books get finished.",
  Cancer: "Jupiter's exalted in you, love: growth through shelter. Your generosity pours out as care and multiplies — and the feast means most, pet, when you take a chair at it yourself.",
  Leo: "Faith wears its brightest coat in you, dear. You grow by giving heart at scale — magnanimity is the luck, love, and vanity's the little leak to mind.",
  Virgo: "You grow by increments, pet, and find your meaning in the maintenance. Jupiter's in detriment here — the big picture arrives by small correct steps, love, so do trust the accumulation.",
  Libra: "You expand through partnership and fairness, dear; your luck arrives introduced by somebody. Justice is your philosophy, love — now practise it on your own self too.",
  Scorpio: "Your growth happens down in the depths, pet: through crisis survived, truth faced, trust rebuilt. The treasure is real, dear — and the descent, love, is the price of it.",
  Sagittarius: "Jupiter's right at home in you, love: the horizon fund's fully vested. Meaning multiplies as you travel toward it — and the sermon stays honest, pet, so long as the journey keeps going.",
  Capricorn: "Jupiter's in fall here, dear, so your faith submits to the audit — growth must show its working. But what survives the scrutiny, love, is durable optimism, and that's the rarest kind there is.",
  Aquarius: "You grow by widening the circle, pet. Your luck is a collective thing — visions that lift everyone — and it lands, love, when that future has room for the present.",
  Pisces: "Jupiter's the old ruler here at high tide, dear: faith without walls. Compassion expands everything it touches — and the boundary, love, is the very thing that keeps the sea a gift.",
};

const SATURN: Record<Sign, string> = {
  Aries: "Saturn's in fall in you, love, so the brake and the accelerator share the one foot. Discipline has to learn to move at speed — hesitation studied, pet, until it turns into timing.",
  Taurus: "You build slow, dear, and to last. Security is the project of decades for you — and the lesson, love, is that enough must, in the end, be allowed to be enough.",
  Gemini: "Structure comes to the mind in you, pet: speech weighed, learning earned. That wall against scatter, dear, becomes a proper library, given time.",
  Cancer: "Saturn's in detriment here, love, so the wall runs right through the home. Feeling and duty sit down to negotiate — and the grown-up treaty, pet, lets tenderness be structural too.",
  Leo: "Saturn's in detriment in you, dear, so the crown feels heavy and the applause a touch suspect. The work is shining without waiting for leave — authority earned, love, past the fear of the stage.",
  Virgo: "Your discipline finds its workshop, pet. Standards are high and mostly met — but mercy, love, that's the one tool gone missing from the top drawer.",
  Libra: "Saturn's exalted in you, dear: justice with a spine. You build fairness that holds under load — commitments as architecture, love, kindness with its terms written in.",
  Scorpio: "Structure meets the depths in you, pet: control tested against what simply can't be controlled. What survives is unshakeable — and what must be let go, love, was never yours to hold.",
  Sagittarius: "The far horizon gets a survey team in you, dear. Faith is examined, then made load-bearing — and the journey, love, gains a map it can actually trust.",
  Capricorn: "Saturn's right at home in you, pet: time, gravity, the long climb, all reporting to you. Mastery comes native — the mountain's real, love, and so is the rest you must schedule in.",
  Aquarius: "Saturn's the old ruler here, dear: the pattern gets proper engineering. You build for the people of the future — and the blueprint warms up, love, the moment they're consulted.",
  Pisces: "Structure in the water, pet — hard-won here, and precious for it. The work is giving the boundless a container it consents to, love: banks, mind you, not dams.",
};

const URANUS: Record<Sign, string> = {
  Aries: "The lightning takes the lead in you, love: rebellion as first instinct. Breakthroughs come fast — but revolutions, pet, they need a second week to hold.",
  Taurus: "Uranus is in fall here by tradition, dear, so the awakener meets the immovable. Change arrives through the ground itself, love — slow revolutions, and permanent ones.",
  Gemini: "The mind electrifies in you, pet: ideas arrive in storms and networks. Genius comes native, love; follow-through, mind you, is imported.",
  Cancer: "The lightning strikes the home in you, dear — family scripts interrupted, roots rewired. Freedom and belonging, love, learn to share the one house.",
  Leo: "Uranus is in detriment in you, pet, so the rebel goes wanting a throne. The authentic performance breaks every format — the trap, love, is being different just for the mirror.",
  Virgo: "Revolution by refinement in you, dear: systems debugged, work reinvented. The radical act here, love, is the improved routine, believe it or not.",
  Libra: "Partnership gets renegotiated from first principles in you, pet. Fairness demands originality — the experiment, love, is commitment without the cage.",
  Scorpio: "Uranus is exalted here by tradition, dear: the awakener down in the depths. Transformation arrives as rupture, love, and proves in the end to be rescue.",
  Sagittarius: "Belief systems get struck by weather in you, pet. The heresy's usually just early truth — aim it, love, and it becomes a whole curriculum.",
  Capricorn: "The lightning audits the establishment in you, dear. Structures get broken precisely — the rebel with a spreadsheet, love, the reform that actually holds.",
  Aquarius: "Uranus is right at home in you, pet: the future speaking in its native tongue. The pattern-breaker serves the group — and the distance from the crowd, love, is the vantage, never the wall.",
  Pisces: "The awakener dissolves into the water table in you, dear: intuition electrified. Visions arrive unscheduled, love — so the practice, pet, is writing them down.",
};

const NEPTUNE: Record<Sign, string> = {
  Aries: "The dream wants a spearhead in you, love. Ideals arrive with the adrenaline — and the crusade stays holy, pet, exactly as long as it stays honest.",
  Taurus: "The mist settles on the material in you, dear: beauty found in the tangible, money touched by fantasy. Enchantment is lovely, love — but the appraisals, mind you, still matter.",
  Gemini: "Language turns to watercolour in you, pet. Your stories persuade well past their facts — a poet's gift, love, with a fact-checker's homework attached.",
  Cancer: "The longing in you is for the original home, dear. Memory idealises — and the compassion for family is real, love, and so, I'll grant you, is the fog around it.",
  Leo: "Glamour in the old sense lives in you, pet: the shine that borrows from a dream. Your creativity is genuinely inspired, love — and the audience is genuinely imagined.",
  Virgo: "Neptune's in detriment here, dear, so the boundless meets the checklist. Service becomes devotion — the sacred found in the useful, love, once perfection quits posing as holiness.",
  Libra: "The ideal of the perfect other, pet, projected in high resolution. Real love arrives, dear, when the projector dims and the actual person remains.",
  Scorpio: "The solvent works at depth in you, love: obsession, mysticism, desire past its own explanations. The undertow is strong, pet — and so is what it teaches you.",
  Sagittarius: "Faith without borders in you, dear, and journey without maps. The vision is genuinely vast — the discernment, love, is telling which horizon is real.",
  Capricorn: "The dream meets the institution in you, pet: idealism about structures, disillusion served up as curriculum. What survives, love, is the workable vision.",
  Aquarius: "Utopia gets a schematic in you, dear. Collective dreams run bright and impersonal — and the humans in the diagram, love, they do need names.",
  Pisces: "Neptune's right at home in you, my love: the ocean, undiluted. Imagination, compassion, dissolution, all at full strength — and the raft of routine, pet, that's not optional.",
};

const PLUTO: Record<Sign, string> = {
  Aries: "Power comes out as raw initiative in you, love: destroy, begin, repeat. The furnace is enormous — pointed well it clears land, pet; pointed badly, love, it just burns.",
  Taurus: "Pluto's in detriment here, dear, so transformation grinds against permanence. What must change will change the slow way, love — right through the foundations.",
  Gemini: "The underworld enters the conversation in you, pet: words that expose, information as power. The depth charge, love, is a question.",
  Cancer: "Power runs through the roots in you, dear — family, nation, tribe, remade under pressure. The grip that protects can also entomb, love; the renewal, pet, starts at home.",
  Leo: "The will to shine becomes the will to matter in you, love. Creative force at plutonic pressure — the ego's death and the heart's return, dear, right there on the stage.",
  Virgo: "Transformation through the meticulous in you, pet: systems purged, work remade, health rebuilt from the cell up. The humble domain, love, hides the very deepest overhaul.",
  Libra: "Power surfaces in the mirror for you, dear: relationships as crucibles. The balance of power is the real subject, love — and fairness, pet, the real revolution.",
  Scorpio: "Pluto's right at home in you, love: the underworld with the lights on. Regeneration is your native art — nothing held, dear, that hasn't survived the fire.",
  Sagittarius: "Beliefs get the deep excavation in you, pet. Dogma dies, meaning regenerates — and the truth that survives its own funeral, love, that one's yours.",
  Capricorn: "The structures themselves go into the crucible in you, dear: institutions, ambitions, authority composted and rebuilt. Power learns accountability, love, or it learns collapse.",
  Aquarius: "The collective current runs at high voltage in you, pet: systems, networks, futures transformed wholesale. The group's shadow, love, is the group's material.",
  Pisces: "The deep and the boundless merge in you, dear: dissolution as transformation. What regrows here, love, regrows everywhere the water reaches.",
};

const NODE: Record<Sign, string> = {
  Aries: "The pull is toward selfhood, love: daring to want, alone if you must. The familiar comfort of accommodating everyone is the past, pet — the appetite, dear, is for your own name.",
  Taurus: "The pull is toward the simple and the solid, dear: your own values, your own ground. Drama is the old country, love; peace, pet, is the frontier.",
  Gemini: "The pull is toward curiosity over certainty, love: asking, learning, staying for the answer. The sermon's behind you now, dear; the conversation's up ahead.",
  Cancer: "The pull is toward the hearth, pet: feeling, belonging, letting yourself be fed. The summit was last life's business, love; the home is this one's.",
  Leo: "The pull is toward the centre of your own stage, dear: creating, risking, being seen. The safe anonymity of the crowd, love, is the very habit to outgrow.",
  Virgo: "The pull is toward craft and the useful day, pet: order as devotion. The fog was comfortable, dear; but the checklist, surprisingly, love, is the spiritual path.",
  Libra: "The pull is toward the other, love: partnership, fairness, the art of with. Going it alone you've mastered already, pet — the frontier, dear, is company.",
  Scorpio: "The pull is toward the depths, dear: intimacy, shared resources, transformation over accumulation. The comfortable surface, love, is the outgrown shell.",
  Sagittarius: "The pull is toward meaning, pet: the long journey, the honest philosophy. The gossip and the errands, love, are yesterday's homework.",
  Capricorn: "The pull is toward standing accountable, dear: building, mattering, weathering. The tide of moods is the old home, love; the mountain, pet, is the new one.",
  Aquarius: "The pull is toward the wide circle, love: causes, colleagues, futures. The private stage is well-rehearsed by now, dear; the commons, pet, is calling.",
  Pisces: "The pull is toward surrender, sweetheart: trust, imagination, the unplanned. The spreadsheet of the self is complete, love; the sea, now, is the syllabus.",
};

const CHIRON: Record<Sign, string> = {
  Aries: "The tender place in you is the right to exist at full volume, love. Doubt about your own daring becomes, once it's tended, pet, a gift for stirring courage in others.",
  Taurus: "The wound is about enough, dear — worth, safety, the ground under you. Healed slow, love, it becomes the steadiest hand anyone knows.",
  Gemini: "The sore spot is the voice, pet: being heard, being believed. The one who struggled to say it, love, becomes the one who teaches the saying.",
  Cancer: "The ache is around belonging and being mothered, dear. What you needed and organise for others, love, becomes, in time, yours to receive.",
  Leo: "The wound is around shining, pet: praise withheld, or given for the wrong self. The healing performance, love, is the unguarded one.",
  Virgo: "The tender place is being useful enough to deserve a place, dear. The healer's own healing, love, is discovering that worth comes before the work.",
  Libra: "The wound walks in through relationship, pet: chosen last, kept off-balance. The medicine you carry, love, is fairness that includes your own self.",
  Scorpio: "The sore place is trust betrayed at depth, dear. Survived and tended, love, it reads others' depths with a surgeon's kindness.",
  Sagittarius: "The wound is around meaning, pet: faith broken, questions punished. The teacher you become, love, holds the question open for others.",
  Capricorn: "The ache is legitimacy, dear: never quite enough authority, recognition, standing. The mastery you build anyway, love, becomes the very mentorship you needed.",
  Aquarius: "The tender place is the edge of the group, pet — the odd one, tolerated. The gift, matured, love, is making rooms where none exist.",
  Pisces: "The wound is boundless, dear: everyone's pain arriving as your own. The healing, love, is a shoreline — compassion with a body attached.",
};

const LILITH: Record<Sign, string> = {
  Aries: "What was exiled is the raw want, love — anger, appetite, the unapologetic first move. It comes back as clean fire, pet, the day it's finally invited to the table.",
  Taurus: "The refused thing is pleasure without permission, dear. The body keeps its own counsel here — owned, love, it becomes unshakeable ground.",
  Gemini: "The banished voice is the unsayable said plainly, pet. It returns as wit with teeth, love — the truth-telling this chart was warned about.",
  Cancer: "What was exiled is the need itself, dear — hunger for care called too much. Reclaimed, love, it feeds without apology and mothers without martyrdom.",
  Leo: "The refused thing is the full spotlight, pet. The shine that got called vanity, love, comes back as sovereignty the moment it stops asking.",
  Virgo: "The banishment was of imperfection, dear: the mess, the appetite, the unoptimised self. Its return, love, makes the standards humane.",
  Libra: "What was exiled is the unaccommodating no, pet. It comes back as fairness with a spine, love — beauty that doesn't barter.",
  Scorpio: "The refused thing is power at full depth, dear: desire, rage, the uncensored current. Owned, love, it stops leaking and starts steering.",
  Sagittarius: "The banished voice is the heresy, pet — the belief that didn't fit the church. It returns as a philosophy, love, with your own fingerprints on it.",
  Capricorn: "What was exiled is ambition in its naked form, dear. Reclaimed from shame, love, it builds without asking whose permission.",
  Aquarius: "The refused thing is the true strangeness, pet — the difference beyond the acceptable eccentric. Owned, love, it stops performing and starts leading.",
  Pisces: "What was exiled is the boundless self, dear — called dreamy, called too much, called away. It returns as vision, love, that the daylight can actually use.",
};

export const grandma: ContentSet = {
  planetArchetypes: {
    sun: "the conscious will, dear — what you're becoming when you're most yourself",
    moon: 'the needs underneath, love — instinct, memory, what safety feels like',
    mercury: 'the mind in motion — how you take in, connect, and say, pet',
    venus: 'what you find beautiful, love, and how you draw it close',
    mars: 'the engine, dear — how you want, pursue, and defend',
    jupiter: 'the appetite for more — growth, meaning, the luck you make room for, love',
    saturn: 'the load-bearing wall, pet — limits, time, what you must build to keep',
    uranus: 'the lightning, dear — where you refuse the script',
    neptune: 'the solvent, love — imagination, longing, the blur between self and sea',
    pluto: 'the underworld engine — power, loss, and what regrows after, dear',
    trueNode: "the direction of pull, love — an appetite the soul hasn't satisfied yet",
    meanNode: "the direction of pull, love — an appetite the soul hasn't satisfied yet",
    chiron: 'the tender place, pet — the wound that teaches you to heal others',
    meanLilith: 'the refused, dear — what was exiled and comes back untamed',
  },
  signLenses: {
    Aries: {
      light: 'courage that moves first, love, and figures the rest out en route',
      truth: 'cardinal fire: ignition, the instinct to begin',
      shadow: "impatience that mistakes speed for progress and self for centre — I'll not pretend otherwise, pet",
    },
    Taurus: {
      light: 'steadiness, sensuality, the talent for making things last, dear',
      truth: 'fixed earth: holding, ripening, the value of the tangible',
      shadow: 'inertia dressed up as loyalty, love; comfort held on to past its usefulness',
    },
    Gemini: {
      light: 'quickness, curiosity, the gift of translation between worlds, pet',
      truth: 'mutable air: circulation, the pollination of ideas',
      shadow: "scatter, love; a cleverness that skims where it's afraid to dive",
    },
    Cancer: {
      light: 'fierce shelter, dear — the memory of the tribe kept warm',
      truth: 'cardinal water: the tide that feeds and protects',
      shadow: 'moods that fortify into walls, love; care that tips over into control',
    },
    Leo: {
      light: 'warmth that makes others feel more alive, pet, not smaller',
      truth: 'fixed fire: the hearth, the performance of the heart',
      shadow: 'the need for applause, love, eating up the joy of the act itself',
    },
    Virgo: {
      light: 'precision in service of what actually helps, dear',
      truth: 'mutable earth: harvest, discernment, the craft of improvement',
      shadow: "criticism that arrives before compassion, pet; perfect made the enemy of done",
    },
    Libra: {
      light: 'grace, fairness, the art of making a relationship beautiful, love',
      truth: 'cardinal air: the scales, the initiating of balance',
      shadow: 'peace bought, dear, with your own unspoken preferences',
    },
    Scorpio: {
      light: 'depth that does not flinch, pet; loyalty right down to the underworld',
      truth: "fixed water: pressure, intimacy, the transformation of what's held",
      shadow: 'control, secrecy, love — and the sting saved up for your own self',
    },
    Sagittarius: {
      light: 'faith in the horizon, dear — meaning found by going',
      truth: 'mutable fire: the arrow, the widening circle',
      shadow: 'the sermon that outruns the journey, love; truth used as an escape hatch',
    },
    Capricorn: {
      light: 'the long climb done with dry humour and clean hands, pet',
      truth: 'cardinal earth: structure, ambition, time as material',
      shadow: 'worth measured only in output, dear; the summit that keeps on receding',
    },
    Aquarius: {
      light: "clear-eyed distance, love, in service of everyone's future",
      truth: 'fixed air: the pattern seen from above, the circuit of the group',
      shadow: 'principled coldness, pet; loving humanity while dodging the humans',
    },
    Pisces: {
      light: 'porous compassion, dear; the imagination that dissolves borders',
      truth: 'mutable water: the return of all rivers, the unguarded door',
      shadow: 'escape, martyrdom, love — the fog that steers around the edge that must be faced',
    },
  },
  houseDomains: [
    'the mask and the doorway, love — body, presence, how life first meets you',
    'what you keep, dear — resources, worth, the ground under your feet',
    'the neighbourhood of the mind, pet — siblings, errands, everyday words',
    'the taproot — home, lineage, the private floor of the self, love',
    'the playground, dear — creation, romance, children, the courage to enjoy',
    'the workshop, pet — craft, routines, health, the dignity of maintenance',
    'the mirror, love — partners, rivals, everyone who is not you',
    "the shared depths — other people's resources, debts, sex, grief, trust, dear",
    'the far horizon, pet — belief, study, journeys, the bigger map',
    'the summit — vocation, reputation, what you answer for in public, love',
    'the commons, dear — friends, allies, movements, imagined futures',
    'the retreat, pet — solitude, endings, the hidden work before rebirth',
  ],
  aspectLenses: {
    conjunction: {
      light: 'fusion, love — two functions acting as one amplified voice',
      truth: 'no distance: these parts of you cannot see each other, only act together',
      shadow: 'a blend so total, dear, neither part can be examined nor turned off',
    },
    sextile: {
      light: 'an open door, pet — cooperation available whenever you reach for it',
      truth: 'compatible elements offering opportunity, not guarantees',
      shadow: 'the gift left unwrapped, love, because it never forces the issue',
    },
    square: {
      light: 'friction that builds engines, dear — the aspect of earned strength',
      truth: 'two agendas at cross-purposes demanding a construction, not a winner',
      shadow: 'the same fight rerun, love, until the lesson is finally taken',
    },
    trine: {
      light: 'native talent, pet — flow so easy it feels like weather',
      truth: 'same-element harmony: support that asks nothing',
      shadow: 'ease gone slack, dear; the talent never sharpened because it never had to be',
    },
    opposition: {
      light: 'perspective, love — the full moon view of your own polarity',
      truth: 'a see-saw: two ends of one axis negotiating balance',
      shadow: 'projection, pet — meeting your own disowned end in other people',
    },
    semisextile: {
      light: 'a slight adjacency, dear, that can be stitched with attention',
      truth: 'neighbouring signs with nothing in common but the fence',
      shadow: 'low-grade friction dismissed, love, until it frays',
    },
    semisquare: {
      light: 'an itch, pet, that keeps you honest',
      truth: 'a minor square: irritation without full stakes',
      shadow: 'chronic small grievance, dear, mistaken for personality',
    },
    sesquiquadrate: {
      light: 'corrective torque, love — course adjustments earned midflight',
      truth: 'square-family friction arriving at odd angles',
      shadow: 'agitation whose source is hard to name, pet, so it gets misassigned',
    },
    quincunx: {
      light: 'the skill of living with what will not resolve, dear',
      truth: 'two functions with no shared language, permanently adjacent',
      shadow: 'perpetual adjustment, love, that never asks whether to renegotiate',
    },
    quintile: {
      light: 'a signature flourish, pet — pattern-making talent',
      truth: 'fifth-harmonic creativity: style, craft, play',
      shadow: 'cleverness performed, dear, for its own reflection',
    },
    biquintile: {
      light: 'an elegant back-channel, love, between distant talents',
      truth: 'fifth-harmonic linkage across a wide arc',
      shadow: 'gifts kept as private tricks, pet, rather than shared craft',
    },
  },
  dignityNotes: {
    domicile: 'at home, love — this function speaks its native language here',
    exaltation: 'an honoured guest, dear — welcomed, amplified, and now and then over-praised',
    detriment: 'an away game, pet — more effort, and often more growth for it',
    fall: 'a muted register, love — the function works, quietly and underestimated',
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
