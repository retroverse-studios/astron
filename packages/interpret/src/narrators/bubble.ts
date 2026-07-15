import type { Sign } from '@astron/core';
import type { ContentSet } from '../overrides.js';

/**
 * ✨ Bubble narrator — a relentlessly bright, bubbly best-friend content set!
 * Same meaning entry-for-entry as the shipped text, just SO much sparklier; the
 * honesty rules still bind, and every shadow still gets named — adorably.
 */

const SUN: Record<Sign, string> = {
  Aries: "Okay you are MOST yourself the second something begins — eee! Identity here is a verb, struck like a match and relit by every fresh start, and the gorgeous homework is actually finishing what the spark started.",
  Taurus: "Selfhood ripens slooowly and then holds on for keeps — so worth the wait! You become who you are by tending what lasts, and the one teeny trap to watch is mistaking cozy comfort for actually-done.",
  Gemini: "You are made of questions and the quickest little bridges, and it's the BEST! Identity lives in the exchange — telling, hearing, connecting — and it goes even deeper the day curiosity stops skimming.",
  Cancer: "The self is a shoreline, hon — protective, tidal, brimming with memory! You become who you are by sheltering what you love, and you bloom when the shell learns to open as sweetly as it closes.",
  Leo: "You carry a whole hearth right there in your chest — glow, baby, glow! Radiance is the actual job, warming a room into life, and it grows up gorgeously when the shine no longer needs the applause.",
  Virgo: "You become yourself through craft — noticing, refining, making things truly WORK, and it's magic! The gift sharpens into service the moment your inner critic learns to bless what's already good enough.",
  Libra: "Identity blooms in the space between people — you know yourself best mid-relationship, how lovely is that! Grace is real power here, as long as your own precious preference survives the peacemaking.",
  Scorpio: "You are built for the deep end and totally allergic to shallow — I adore it! Selfhood is forged in intensity and renewal, and it sets itself free the day white-knuckle control loosens into trust.",
  Sagittarius: "You are the arrow AND the horizon at once — swoon! Meaning is your fuel, found by going, and the journey ripens beautifully when the preaching softens into pilgrimage.",
  Capricorn: "You become yourself by building something that outlasts the mood — icon behavior! Mastery and time are your materials, and the summit means the most when worth stops being measured in output alone.",
  Aquarius: "Identity here stands just a smidge outside the circle, spotting the pattern — genius! You are most yourself serving a future nobody else can picture yet, and warmest when the ideals include actual humans.",
  Pisces: "The self here has the dreamiest porous borders and the longest tide! You become who you are through compassion and imagination, and you stand strongest when all that softness finds its own edge.",
};

const MOON: Record<Sign, string> = {
  Aries: "Feelings show up FAST, burn clean, and leave barely a speck of ash — whoosh! You're safest when you can act on emotion right away, and the sweet practice is pausing without smothering the flame.",
  Taurus: "You are fed by steadiness — familiar food, familiar arms, the unhurried hour, bliss! Security is sensory and real here, and it deepens when routine stays cozy nourishment instead of hardening into a fortress.",
  Gemini: "You metabolise every feeling by talking it aaall the way through! Safety is a really good conversation, and your heart finally settles once the words stop circling and land.",
  Cancer: "The needs here are the classic ones, felt at full glorious tide: belonging, memory, home! You read moods like weather — your own storms included — and you shelter others purely on instinct.",
  Leo: "You need to be SEEN to feel safe, and babe, zero shame in that! Warmth received turns straight into warmth radiated; unwitnessed, the heart dims and starts performing instead.",
  Virgo: "You soothe yourself by making things right — a tidied room is a tidied mind, so satisfying! Care shows up as usefulness, and it rests way easier when nobody's auditing it.",
  Libra: "Equilibrium is your literal comfort food, and conflict lands right in the body — ouch. You're fed by beauty and fairness, and you grow sturdy the moment peace stops costing you your honesty.",
  Scorpio: "Feelings run deep, silent, and totally all-in here! Trust is expensive and SO worth it, but the same instinct that guards the well can also seal it shut.",
  Sagittarius: "You are nourished by open doors and long, sweeping views — freedom, yay! Confinement reads as danger, so the practice is finding the horizon tucked right inside the commitment.",
  Capricorn: "Feeling arrives with a little chaperone here — measured, translated into duty. The tenderness is SO real and runs deep; it just asks for permission to need without earning it first.",
  Aquarius: "You process emotion from one step back, which is honestly both a skill and a habit! Belonging to everyone can quietly dodge belonging to someone, and that cool air warms right up with practice.",
  Pisces: "You feel the whole room before you even walk in — magic! The boundaries between your weather and everyone else's blur, so the gift is compassion and the discipline is knowing whose tide is whose.",
};

const MERCURY: Record<Sign, string> = {
  Aries: "Thought moves like a struck flint — first word in the room, sometimes before the room is even ready, eek! The mind is decisive and brave, and it listens best totally on purpose.",
  Taurus: "You think in geology, hon — slow gorgeous layers, firm conclusions. What you learn, you KEEP; just know the same grip that holds knowledge can also hold onto an outdated map.",
  Gemini: "The mind is fully at home here — quick, plural, delighted, wheee! You can connect anything to anything, and depth is the one choice this brilliance has to keep on choosing.",
  Cancer: "You think with the memory and speak straight from the tide! Facts arrive all wrapped in feeling, which makes you SO persuasive — and makes double-checking the wrapping totally worthwhile.",
  Leo: "Ideas arrive dressed for the stage, darling! You narrate, and beautifully; the craft grows up when being interesting stops outranking being accurate.",
  Virgo: "The mind is a fine, fine instrument, calibrated for exactly what's fixable! Analysis is love in this dialect — and it's kindest when the red pen gets to rest sometimes.",
  Libra: "You think in dialogues and weigh every single side — so fair! Judgement here is genuinely balanced and famously slow, and some scales only settle once you place your own weight on them.",
  Scorpio: "The mind is a total detective — quiet, thorough, unfoolable! You hear what isn't said, and the only catch is the skill turns lonely when everything starts becoming evidence.",
  Sagittarius: "You think in maps, morals, and punchlines — the best combo! The big picture comes naturally, and the fine print is a discipline very much worth borrowing.",
  Capricorn: "Thought is structural here: what bears load, what won't. You speak little and build SO much — and that dry humour is a feature, not a leak.",
  Aquarius: "The mind runs on pattern and principle, totally comfy far from consensus! You see the whole system whole, and translating it for the humans inside is the actual art.",
  Pisces: "You think in images, osmosis, and tide — dreamy genius! Logic arrives late but insight arrives early, so the notebook by the bed is genuinely load-bearing equipment.",
};

const VENUS: Record<Sign, string> = {
  Aries: "Desire is SO direct here — you love like a full-on declaration! The chase absolutely delights you; the keeping just asks for a different kind of courage.",
  Taurus: "Love is right at home in the body and the garden — heaven! You attach slowly, sensually, for keeps, and the holding is loveliest with the grip relaxed.",
  Gemini: "Attraction kicks off at the conversation, every time! Variety isn't fickleness here, it's appetite for the mind's company, and the deepening is a choice you make twice a day.",
  Cancer: "You love by feeding, keeping, remembering — so tender! Devotion pools deep, and it stays sweet when your care asks first what the other person actually needs.",
  Leo: "Love is theatre in the very best sense — generous, loyal, LIT! You give magnificently and wilt without notice, so say so out loud instead of dimming.",
  Virgo: "Affection here is practical devotion: the fixed hinge, the packed lunch, the noticed little detail. It is love, entire — now let it also be received, okay?",
  Libra: "Venus RULES here, babe — harmony, beauty, the artistry of the pair! You make relationship an art form; just keep one brushstroke that's only, only yours.",
  Scorpio: "You love at full depth or not at all — all in! Intimacy is the true currency, and the vault keeps treasure but, left unwatched, it also keeps score.",
  Sagittarius: "Love needs a horizon here — a shared journey beats a shared sofa! Freedom is your love language, so just make sure the other dialect gets spoken too.",
  Capricorn: "You love in commitments, not confetti — steady heart! Time is the proof and the gift; just let a little delight in before it's technically earned.",
  Aquarius: "Affection starts in friendship and keeps its airspace — friends first, yay! You love the whole person, oddities first, and closeness grows once distance stops being your default reply.",
  Pisces: "You love the way water loves — totally, formlessly, sometimes clear past the point of self! Exalted here, the compassion is real magic, and it works best with a shore.",
};

const MARS: Record<Sign, string> = {
  Aries: "The engine is fully at home — ignition, zero hesitation, vroom! You fight clean and forget fast; just give the finish line the same passion you gave the start.",
  Taurus: "Force moves slowly here and cannot be shoved backward, period. Patience is your weapon, and so is stubbornness — but only one of them is actually choosing.",
  Gemini: "You fence with words and win on pure agility — quick draw! Scattered fire lights nothing twice, but aimed, this quickness is absolutely formidable.",
  Cancer: "Drive here is tidal and protective — slow to anger, total in defending its own! Sideways anger costs way more than the direct kind, so practise the direct kind, love.",
  Leo: "You act from the heart with the volume all the way UP! Courage is native to you; the performance of courage is the counterfeit to refuse.",
  Virgo: "Effort is precise here — energy spent like a scalpel, never a hammer! You win by craft, and perfection is the little ambush to spot and walk right past.",
  Libra: "You fight for fairness and honestly HATE the fighting! Grace under conflict is real strength; deciding is just the muscle that needs the gym.",
  Scorpio: "Traditional ruler at full depth: will like pressure at the ocean floor, wow! You outlast absolutely everyone — just make sure the campaign is still worth the siege.",
  Sagittarius: "Drive needs a quest here — give it a mission! You act for meaning and travel light, and scattershot crusades are the little tax on all that fire.",
  Capricorn: "Exalted, baby: ambition with an engineer's patience! You climb in every kind of weather; just remember to actually notice the view you fought for.",
  Aquarius: "You fight for the group and from the perimeter — strategy over heat, so cool! Detachment wins wars and loses evenings, so choose per occasion.",
  Pisces: "Will moves like current here — indirect, persistent, dissolving obstacles instead of breaking them. Just name the goal, or the current quietly serves someone else's.",
};

const JUPITER: Record<Sign, string> = {
  Aries: "Growth comes by daring first — go, go, GO! Your luck lives at the very front of the line, generosity of nerve, and it's spent best on beginnings that actually get finished.",
  Taurus: "Abundance grows like an orchard here: slowly, then SO dependably! The faith is in the tangible, and the pruning is a real part of the tending.",
  Gemini: "You expand by connecting absolutely everything — so many tabs open! In detriment, breadth outruns depth super easily; the library keeps growing, so let some books actually get finished.",
  Cancer: "Exalted — growth through shelter, aww! Generosity pours out as care and multiplies, and the feast means the most when you also pull up a chair for yourself.",
  Leo: "Faith wears its brightest, sparkliest coat here! You grow by giving heart at scale — magnanimity is the luck, and vanity is the little leak.",
  Virgo: "Growth by increments, meaning in maintenance — the small stuff counts! In detriment, the big picture arrives via tiny correct steps, so trust the accumulation.",
  Libra: "You expand through partnership and fairness, and luck arrives introduced by someone lovely! Justice is your philosophy — now practise it on yourself too, please.",
  Scorpio: "Growth happens in the depths here — through crisis survived, truth faced, trust rebuilt! The treasure is SO real, and the descent is honestly the price.",
  Sagittarius: "At home — the horizon fund is fully vested, jackpot! Meaning multiplies when you travel toward it, and the sermon stays honest as long as the journey keeps going.",
  Capricorn: "In fall, faith submits to the audit — growth has to show its working. And what survives all that scrutiny is durable optimism, the rarest kind of all!",
  Aquarius: "You grow by widening the circle — the more the merrier! The luck is collective, visions that lift everyone, and it lands when the future includes the present.",
  Pisces: "Traditional ruler at high tide: faith without walls, oceanic! Compassion expands everything it touches, and the boundary is the sweet thing that keeps the sea a gift.",
};

const SATURN: Record<Sign, string> = {
  Aries: "In fall, the brake and the accelerator share one foot — tricky! Discipline has to learn to move at speed, hesitation studied until it becomes gorgeous timing.",
  Taurus: "You build slowly and to LAST! Security is the project of decades, and the lesson is that enough, eventually, has to be allowed to be enough.",
  Gemini: "Structure comes to the mind here: speech weighed, learning earned! The wall against scatter becomes a proper library, given a little time.",
  Cancer: "In detriment, the wall runs right through the home. Feeling and duty have to negotiate, and the grown-up treaty lets tenderness be structural too.",
  Leo: "In detriment, the crown is heavy and the applause feels suspect. The real work is shining without permission — authority earned past the fear of the stage.",
  Virgo: "Discipline finds its perfect little workshop here! Standards are high and mostly met; mercy is just the one tool missing from the top drawer.",
  Libra: "Exalted — justice with a SPINE! You build fairness that holds under load, commitments as architecture, kindness with terms.",
  Scorpio: "Structure meets the depths: control tested against the totally uncontrollable. What survives is unshakeable, and what has to be released was never holdable anyway.",
  Sagittarius: "The far horizon gets a survey team! Faith is examined, then load-bearing, and the journey gains a map it can actually trust.",
  Capricorn: "At home: time, gravity, and the long climb all report to YOU! Mastery is native — the mountain is real, and so is the schedule for resting.",
  Aquarius: "Traditional ruler: the pattern gets real engineering! You build for the future's people, and the blueprint warms right up when they're consulted.",
  Pisces: "Structure in the water: hard here, and so precious. The work is giving the boundless a container it consents to — banks, not dams.",
};

const URANUS: Record<Sign, string> = {
  Aries: "The lightning takes the lead — rebellion as first instinct, zap! Breakthroughs come lightning-fast; revolutions just need a second week.",
  Taurus: "In fall by tradition, the awakener meets the totally immovable. Change arrives through the ground itself — slow revolutions, but permanent!",
  Gemini: "The mind electrifies — ideas arrive in storms and networks, so alive! Genius is native; follow-through is the part that's imported.",
  Cancer: "The lightning strikes home — family scripts interrupted, roots rewired! Freedom and belonging learn to share one house.",
  Leo: "In detriment, the rebel secretly wants a throne. The authentic performance breaks every format, and the trap is being different just for the mirror.",
  Virgo: "Revolution by refinement — systems debugged, work reinvented! The radical act here is honestly the improved routine.",
  Libra: "Partnership gets renegotiated from first principles! Fairness demands originality, and the experiment is commitment without the cage.",
  Scorpio: "Exalted by tradition — the awakener in the depths! Transformation arrives as rupture and then turns out to be rescue.",
  Sagittarius: "Belief systems get struck by weather! The heresy is usually early truth; aim it, and it becomes a whole curriculum.",
  Capricorn: "The lightning audits the establishment! Structures get broken precisely — the rebel with a spreadsheet, the reform that actually holds.",
  Aquarius: "At home: the future speaks in native tongue, wheee! The pattern-breaker serves the group, and the distance from the crowd is the vantage, not the wall.",
  Pisces: "The awakener dissolves into the water table — intuition electrified! Visions arrive totally unscheduled, so the practice is writing them down.",
};

const NEPTUNE: Record<Sign, string> = {
  Aries: "The dream wants a spearhead, charge! Ideals arrive with adrenaline, and the crusade stays holy exactly as long as it stays honest.",
  Taurus: "The mist settles on the material — beauty found in the tangible, money touched by fantasy, so pretty! Enchantment is lovely; appraisals still matter, hon.",
  Gemini: "Language turns to watercolour, gorgeous! Stories persuade way beyond their facts here — a poet's gift, with a fact-checker's homework.",
  Cancer: "The longing is for the original home. Memory idealises, and the compassion for family is SO real — and so is the fog around it.",
  Leo: "Glamour in the classic sense: the shine that borrows straight from dream! Creativity is genuinely inspired, and the audience is genuinely imagined.",
  Virgo: "In detriment, the boundless meets the checklist. Service becomes devotion — the sacred found in the useful, once perfection stops posing as holiness.",
  Libra: "The ideal of the perfect other, projected in dazzling high resolution! Real love arrives when the projector dims and the actual person remains.",
  Scorpio: "The solvent works at depth: obsession, mysticism, desire past its own explanations. The undertow is strong — and so is everything it teaches.",
  Sagittarius: "Faith without borders, journey without maps — adventure! The vision is genuinely vast, and the discernment is figuring out which horizon is real.",
  Capricorn: "The dream meets the institution: idealism about structures, disillusion as curriculum. What survives all that is the workable vision!",
  Aquarius: "Utopia gets a schematic, so smart! Collective dreams run bright and impersonal, so the humans in the diagram really do need names.",
  Pisces: "At home: the ocean, totally undiluted! Imagination, compassion, and dissolution at full strength — and the raft of routine is honestly not optional.",
};

const PLUTO: Record<Sign, string> = {
  Aries: "Power expresses as raw initiative — destroy, begin, repeat! The furnace is enormous: pointed well it clears land, pointed badly it just burns.",
  Taurus: "In detriment, transformation grinds against permanence. What must change will change the slow way — right through the foundations.",
  Gemini: "The underworld enters the conversation — words that expose, information as power! The depth charge here is a question.",
  Cancer: "Power runs through the roots — family, nation, tribe, all remade under pressure. The grip that protects can also entomb, and the renewal starts at home.",
  Leo: "The will to shine becomes the will to matter! Creative force at plutonic pressure — the ego's death and the heart's return, right there on stage.",
  Virgo: "Transformation through the meticulous — systems purged, work remade, health rebuilt from the cell up! The humble domain hides the very deepest overhaul.",
  Libra: "Power surfaces in the mirror: relationships as crucibles. The balance of power is the actual subject, and fairness is the actual revolution!",
  Scorpio: "At home — the underworld with the lights ON! Regeneration is the native art: nothing held that hasn't survived the fire.",
  Sagittarius: "Beliefs get the deep, deep excavation! Dogma dies, meaning regenerates, and the truth that survives its own funeral is completely yours.",
  Capricorn: "The structures themselves go into the crucible — institutions, ambitions, authority composted and rebuilt! Power learns accountability, or it learns collapse.",
  Aquarius: "The collective current runs at high voltage — systems, networks, futures transformed wholesale! The group's shadow is the group's material.",
  Pisces: "The deep and the boundless merge: dissolution as transformation. What regrows here regrows everywhere the water reaches!",
};

const NODE: Record<Sign, string> = {
  Aries: "The pull is toward selfhood — daring to want, alone if needed, you brave thing! The familiar comfort of accommodating everyone is the past; the appetite is for your very own name.",
  Taurus: "The pull is toward the simple and the solid — your own values, your own ground! Drama is the old country; peace is the shiny new frontier.",
  Gemini: "The pull is toward curiosity over certainty — asking, learning, staying for the answer! The sermon is behind you; the conversation is straight ahead.",
  Cancer: "The pull is toward the hearth — feeling, belonging, letting yourself be fed, aww! The summit was last life's business; the home is this one's.",
  Leo: "The pull is toward the centre of your own stage — creating, risking, being seen, YES! The safe anonymity of the crowd is the habit to outgrow.",
  Virgo: "The pull is toward craft and the useful day — order as devotion! The fog was comfy, but the checklist, surprisingly, is the spiritual path.",
  Libra: "The pull is toward the other — partnership, fairness, the art of with! Going it alone is mastered already; the frontier is company.",
  Scorpio: "The pull is toward the depths — intimacy, shared resources, transformation over accumulation! The comfortable surface is the outgrown shell.",
  Sagittarius: "The pull is toward meaning — the long journey, the honest philosophy! The gossip and the errands are yesterday's homework.",
  Capricorn: "The pull is toward standing accountable — building, mattering, weathering it all! The tide of moods is the old home; the mountain is the new one.",
  Aquarius: "The pull is toward the wide circle — causes, colleagues, futures! The private stage is well-rehearsed; the commons is calling your name.",
  Pisces: "The pull is toward surrender — trust, imagination, the unplanned! The spreadsheet of the self is complete; the sea is the syllabus now.",
};

const CHIRON: Record<Sign, string> = {
  Aries: "The tender place is the right to exist at full volume. Doubt about your own daring becomes, once tended, a gift for stirring up courage in everyone else!",
  Taurus: "The wound is about enough — worth, safety, the ground under you. Healed slowly, it becomes the steadiest hand anyone knows!",
  Gemini: "The sore spot is the voice — being heard, being believed. The one who struggled to say it becomes the one who teaches the saying!",
  Cancer: "The ache is around belonging and being mothered. What you needed and organise for others becomes, in time, yours to finally receive.",
  Leo: "The wound is around shining — praise withheld, or given for the wrong self. The healing performance is the beautifully unguarded one!",
  Virgo: "The tender place is being useful enough to deserve a place. The healer's own healing is discovering that worth comes before the work!",
  Libra: "The wound walks in through relationship — chosen last, kept off-balance. The medicine you carry is fairness that finally includes yourself!",
  Scorpio: "The sore place is trust betrayed at depth. Survived and tended, it reads other people's depths with a surgeon's kindness.",
  Sagittarius: "The wound is around meaning — faith broken, questions punished. The teacher you become holds the question wide open for others!",
  Capricorn: "The ache is legitimacy — never quite enough authority, recognition, standing. The mastery you build anyway becomes the very mentorship you needed!",
  Aquarius: "The tender place is the edge of the group — the odd one, tolerated. The gift, once matured, is making rooms where there weren't any!",
  Pisces: "The wound is boundless — everyone's pain arriving as yours. The healing is a shoreline: compassion with a body attached.",
};

const LILITH: Record<Sign, string> = {
  Aries: "What was exiled is the raw want — anger, appetite, the unapologetic first move. It comes back as clean fire the moment it's finally invited to the table!",
  Taurus: "The refused thing is pleasure without permission. The body keeps its own counsel here, and once owned, it becomes unshakeable ground.",
  Gemini: "The banished voice is the unsayable said plainly. It returns as wit with teeth — the exact truth-telling this chart was warned about!",
  Cancer: "What was exiled is the need itself — hunger for care called too much. Reclaimed, it feeds without apology and mothers without martyrdom!",
  Leo: "The refused thing is the full spotlight. The shine that got called vanity comes back as sovereignty the second it stops asking!",
  Virgo: "The banishment was of imperfection — mess, appetite, the unoptimised self. Its return makes the standards beautifully humane.",
  Libra: "What was exiled is the unaccommodating no. It comes back as fairness with a spine — beauty that absolutely doesn't barter!",
  Scorpio: "The refused thing is power at full depth — desire, rage, the uncensored current. Owned, it stops leaking and starts steering!",
  Sagittarius: "The banished voice is the heresy — the belief that didn't fit the church. It returns as a philosophy with your very own fingerprints on it!",
  Capricorn: "What was exiled is ambition in its naked form. Reclaimed from shame, it builds without asking whose permission!",
  Aquarius: "The refused thing is the true strangeness — the difference beyond the acceptable eccentric. Owned, it stops performing and starts leading!",
  Pisces: "What was exiled is the boundless self — called dreamy, called too much, called away. It returns as vision the daylight can actually use!",
};

export const bubble: ContentSet = {
  planetArchetypes: {
    sun: 'the conscious will — the you you are becoming when you are most gloriously yourself!',
    moon: 'the needs underneath — instinct, memory, what safety feels like, aww',
    mercury: 'the mind in motion — how you take in, connect, and say it all',
    venus: 'what you find beautiful and how you draw it close, swoon',
    mars: 'the engine — how you want, pursue, and defend, vroom!',
    jupiter: 'the appetite for MORE — growth, meaning, and the luck you make room for',
    saturn: 'the load-bearing wall — limits, time, and what you must build to keep',
    uranus: 'the lightning — the exact spot where you refuse the script, zap!',
    neptune: 'the solvent — imagination, longing, the dreamy blur between self and sea',
    pluto: 'the underworld engine — power, loss, and what regrows after, so mighty',
    trueNode: 'the direction of pull — an appetite the soul hasn’t satisfied just yet!',
    meanNode: 'the direction of pull — an appetite the soul hasn’t satisfied just yet!',
    chiron: 'the tender place — the old wound that teaches you to heal others',
    meanLilith: 'the refused — what got exiled and comes strutting back untamed!',
  },
  signLenses: {
    Aries: {
      light: 'courage that moves first and figures the rest out en route — go you!',
      truth: 'cardinal fire: ignition, the instinct to begin',
      shadow: 'impatience that mistakes speed for progress and self for centre',
    },
    Taurus: {
      light: 'steadiness, sensuality, and the total talent for making things last!',
      truth: 'fixed earth: holding, ripening, the value of the tangible',
      shadow: 'inertia dressed up as loyalty; comfort clung to way past its usefulness',
    },
    Gemini: {
      light: 'quickness, curiosity, and the gift of translation between worlds!',
      truth: 'mutable air: circulation, the pollination of ideas',
      shadow: 'scatter; a cleverness that skims right where it fears to dive',
    },
    Cancer: {
      light: 'fierce shelter — the memory of the tribe kept so warm!',
      truth: 'cardinal water: the tide that feeds and protects',
      shadow: 'moods that fortify into walls; care that quietly tips into control',
    },
    Leo: {
      light: 'warmth that makes everyone feel more alive, never smaller!',
      truth: 'fixed fire: the hearth, the performance of the heart',
      shadow: 'the need for applause eating the joy of the act itself',
    },
    Virgo: {
      light: 'precision in service of what actually, truly helps!',
      truth: 'mutable earth: harvest, discernment, the craft of improvement',
      shadow: 'criticism that arrives before compassion; perfect as the enemy of done',
    },
    Libra: {
      light: 'grace, fairness, and the art of making relationship beautiful!',
      truth: 'cardinal air: the scales, the initiating of balance',
      shadow: 'peace purchased with your own unspoken, swallowed preferences',
    },
    Scorpio: {
      light: 'depth that does not flinch; loyalty all the way to the underworld!',
      truth: 'fixed water: pressure, intimacy, the transformation of what’s held',
      shadow: 'control, secrecy, the sting saved up for the self',
    },
    Sagittarius: {
      light: 'faith in the horizon — meaning found by GOING!',
      truth: 'mutable fire: the arrow, the widening circle',
      shadow: 'the sermon that outruns the journey; truth used as an escape hatch',
    },
    Capricorn: {
      light: 'the long climb done with dry humour and clean hands — iconic!',
      truth: 'cardinal earth: structure, ambition, time as material',
      shadow: 'worth measured only in output; the summit that keeps receding',
    },
    Aquarius: {
      light: 'clear-eyed distance in service of everyone’s future — visionary!',
      truth: 'fixed air: the pattern seen from above, the circuit of the group',
      shadow: 'principled coldness; loving humanity while dodging actual humans',
    },
    Pisces: {
      light: 'porous compassion; the dreamy imagination that dissolves borders!',
      truth: 'mutable water: the return of all rivers, the unguarded door',
      shadow: 'escape, martyrdom, the fog that swerves around the necessary edge',
    },
  },
  houseDomains: [
    'the mask and the doorway — body, presence, how life first meets you!',
    'what you keep — resources, worth, the ground right under your feet',
    'the neighbourhood of the mind — siblings, errands, everyday words',
    'the taproot — home, lineage, the private floor of the self',
    'the playground — creation, romance, kids, the courage to just enjoy!',
    'the workshop — craft, routines, health, the dignity of maintenance',
    'the mirror — partners, rivals, everyone who is not you',
    'the shared depths — other people’s resources, debts, sex, grief, trust',
    'the far horizon — belief, study, journeys, the bigger map!',
    'the summit — vocation, reputation, what you answer for in public',
    'the commons — friends, allies, movements, futures dreamed up together!',
    'the retreat — solitude, endings, the hidden work before rebirth',
  ],
  aspectLenses: {
    conjunction: {
      light: 'fusion — two functions acting as one gorgeously amplified voice!',
      truth: 'no distance: these parts of you cannot see each other, only act together',
      shadow: 'a blend so total neither part can be examined or turned off',
    },
    sextile: {
      light: 'an open door — cooperation ready the second you reach for it!',
      truth: 'compatible elements offering opportunity, not guarantees',
      shadow: 'the gift left unwrapped because it never forces the issue',
    },
    square: {
      light: 'friction that builds ENGINES — the aspect of earned strength!',
      truth: 'two agendas at cross-purposes demanding a construction, not a winner',
      shadow: 'the same fight rerun and rerun until the lesson is finally taken',
    },
    trine: {
      light: 'native talent — flow so easy it honestly feels like the weather!',
      truth: 'same-element harmony: support that asks nothing',
      shadow: 'ease gone slack; the talent never sharpened because it never had to be',
    },
    opposition: {
      light: 'perspective — the full-moon view of your very own polarity!',
      truth: 'a see-saw: two ends of one axis negotiating balance',
      shadow: 'projection — meeting your own disowned end out in other people',
    },
    semisextile: {
      light: 'a slight adjacency that can be stitched together with a little attention!',
      truth: 'neighbouring signs with nothing in common but the fence',
      shadow: 'low-grade friction dismissed until it quietly frays',
    },
    semisquare: {
      light: 'an itch that keeps you honest — kind of a gift!',
      truth: 'a minor square: irritation without the full stakes',
      shadow: 'a chronic small grievance mistaken for personality',
    },
    sesquiquadrate: {
      light: 'corrective torque — course adjustments earned midflight!',
      truth: 'square-family friction arriving at odd angles',
      shadow: 'agitation whose source is hard to name, so it gets misassigned',
    },
    quincunx: {
      light: 'the real skill of living gracefully with what will not resolve!',
      truth: 'two functions with no shared language, permanently adjacent',
      shadow: 'perpetual adjustment that never asks whether to renegotiate',
    },
    quintile: {
      light: 'a signature flourish — pure pattern-making talent!',
      truth: 'fifth-harmonic creativity: style, craft, play',
      shadow: 'cleverness performed just for its own reflection',
    },
    biquintile: {
      light: 'an elegant back-channel between distant talents — so chic!',
      truth: 'fifth-harmonic linkage across a wide arc',
      shadow: 'gifts kept as private little tricks rather than shared craft',
    },
  },
  dignityNotes: {
    domicile: 'at home — this function speaks its native language here, fluent and free!',
    exaltation: 'an honoured guest — welcomed, amplified, and okay, occasionally over-praised',
    detriment: 'an away game — more effort, and honestly often more growth for it!',
    fall: 'a muted register — the function works, quietly and totally underestimated',
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
