import type { Sign } from '@astron/core';
import type { ContentSet } from '../overrides.js';

/**
 * 🏴‍☠️ Pirate captain narrator — a complete alternative content set. Same
 * meaning entry-for-entry as the shipped text, different diction; the
 * honesty rules still bind, in character.
 */

const SUN: Record<Sign, string> = {
  Aries: 'Ye be most yerself at the moment of weighing anchor. Identity here is a verb — struck like flint on powder, renewed by every fresh launch — and the work is finishing the voyage the spark began.',
  Taurus: "Selfhood ripens slow and holds fast. Ye become who ye are by tending what lasts, and the reef worth watching is mistaking a comfortable berth for journey's end.",
  Gemini: 'Ye be made of questions and quick gangplanks. Identity lives in the exchange — telling, hearing, running lines from port to port — and deepens the day curiosity stops skimming the shallows.',
  Cancer: 'The self is a shoreline: protective, tidal, deep with memory. Ye become who ye are by sheltering what ye love, and grow when the shell learns to open as well as batten down.',
  Leo: "Ye carry a galley hearth in the chest. Radiance is the job — warming a whole deck into life — and it matures when the shine no longer needs the crew's cheering.",
  Virgo: "Ye become yerself through craft: noticing, refitting, making the rigging actually hold. The gift sharpens into service when the inner quartermaster learns to bless what's seaworthy enough.",
  Libra: 'Identity forms in the space between sailors — ye know yerself best mid-parley. Grace is real power here, so long as yer own heading survives the peacemaking.',
  Scorpio: 'Ye be built for the deep and allergic to the shallows. Selfhood is forged in intensity and renewal, and it frees itself the day the grip on the wheel loosens into trust.',
  Sagittarius: 'Ye be the arrow and the horizon at once. Meaning is yer fuel — found by sailing — and the voyage ripens when the sermonising gives way to the pilgrimage.',
  Capricorn: 'Ye become yerself by building something that outlasts the weather. Mastery and time are yer timbers; the crow’s nest means most when worth stops being weighed in cargo landed alone.',
  Aquarius: "Identity here stands a little off from the fleet, sighting the pattern. Ye be most yerself serving a future others can't yet chart — warmest when the ideals include actual shipmates.",
  Pisces: 'The self here has a porous hull and a long tide. Ye become who ye are through compassion and imagination, and stand steadiest when the softness finds its own shoreline.',
};

const MOON: Record<Sign, string> = {
  Aries: 'Feelings arrive like sudden squalls, burn clean, and leave little wreckage. Ye be safest when ye can act on emotion straightaway — the practice is pausing without dousing the flame.',
  Taurus: 'Ye be fed by steadiness: familiar grub, familiar arms, the unhurried watch. Security is sensory and real here, and it deepens when routine stays provisions rather than fortress.',
  Gemini: 'Ye digest feeling by talking it through with the crew. Safety is a good yarn shared, and the heart settles once the words stop circling and drop anchor.',
  Cancer: 'The needs here are the classic ones, felt at full tide: belonging, memory, home port. Ye read moods like weather — yer own storms included — and shelter others by instinct.',
  Leo: "Ye need to be seen to feel safe, and there's no shame in flying that flag. Warmth received becomes warmth radiated; unwitnessed, the heart dims and performs instead.",
  Virgo: "Ye soothe yerself by squaring things away — a shipshape deck is a shipshape mind. Care arrives as usefulness, and rests easier when it isn't audited.",
  Libra: 'An even keel is yer comfort food; conflict lands in the body like rough seas. Ye be fed by beauty and fair dealing, and grow sturdy when peace no longer costs yer honesty.',
  Scorpio: 'Feelings run deep, silent, and total here. Trust is expensive and worth the doubloons; the instinct to guard the well can also seal it shut.',
  Sagittarius: 'Ye be nourished by open water and long views. A closed harbour reads as danger; the practice is finding the horizon inside the commitment.',
  Capricorn: 'Feeling comes aboard with a chaperone here — measured, translated into duty. The tenderness is real and runs deep; it asks leave to need without earning first.',
  Aquarius: 'Ye process emotion from one step up the rigging, which is a skill and a habit. Belonging to the whole fleet can dodge belonging to one shipmate; the cool air warms with practice.',
  Pisces: "Ye feel the fo'c'sle before ye enter it. The line between yer weather and everyone else's blurs — the gift is compassion, the discipline is knowing whose tide is whose.",
};

const MERCURY: Record<Sign, string> = {
  Aries: 'Thought moves like flint on steel — first word on deck, sometimes before the deck is ready. The mind is decisive and brave, and listens best on purpose.',
  Taurus: 'Ye think in ballast: slow layers, firm conclusions. What ye learn, ye keep; the same grip that holds knowledge can hold an outdated chart.',
  Gemini: 'The mind is in home port — quick, plural, delighted. Ye can rig a line from anything to anything; depth is a choice this brilliance must keep making.',
  Cancer: 'Ye think with the memory and speak from the tide. Facts arrive wrapped in feeling, which makes ye persuasive — and makes checking the wrapping worth the while.',
  Leo: 'Ideas come aboard dressed for the quarterdeck. Ye spin a yarn, and beautifully; the craft matures when being interesting stops outranking being accurate.',
  Virgo: "The mind is a fine sextant, calibrated for what's fixable. Analysis is love in this dialect — kindest when the red pen rests sometimes.",
  Libra: 'Ye think in parleys and weigh every side. Judgement here is genuinely fair and famously slow; some scales only settle when ye set yer own weight on them.',
  Scorpio: "The mind is an investigator — quiet, thorough, not to be fooled. Ye hear what isn't said; the skill turns lonely when everything becomes evidence.",
  Sagittarius: 'Ye think in charts, morals, and punchlines. The big map comes naturally; the fine print is a discipline worth borrowing from the ship’s clerk.',
  Capricorn: 'Thought is structural here: what bears cargo, what won’t. Ye speak little and build much — and the dry humour is a feature, not a leak below the waterline.',
  Aquarius: "The mind runs on pattern and principle, comfortable far from the fleet's consensus. Ye see the whole system from aloft; translating for the hands on deck is the art.",
  Pisces: 'Ye think in images, osmosis, and tide. Logic makes port late but insight makes port early; the logbook by the hammock is load-bearing equipment.',
};

const VENUS: Record<Sign, string> = {
  Aries: 'Desire is direct here — ye love like a declaration shouted across the water. The chase delights ye; the keeping asks for a different courage.',
  Taurus: 'Love is at home in the body and the garden ashore. Ye moor slowly, sensually, for keeps — and the holding is loveliest with the line eased.',
  Gemini: "Attraction begins at the conversation. Variety isn't fickleness here, it's appetite for the mind's company; the deepening is a choice made twice a day.",
  Cancer: 'Ye love by feeding, keeping, remembering. Devotion pools deep as a lagoon; it stays sweet when care asks first what the other actually needs.',
  Leo: 'Love is theatre in the best sense — generous, loyal, lantern-lit. Ye give magnificently and wilt without notice; say so, rather than dimming the lamp.',
  Virgo: 'Affection here is practical devotion: the mended sail, the packed rations, the noticed detail. It is love, entire — let it also be received.',
  Libra: "Venus rules in home port here: harmony, beauty, the artistry of sailing as a pair. Ye make partnership an art form; keep one brushstroke that's only yers.",
  Scorpio: 'Ye love at full fathom or not at all. Intimacy is the true currency; the sea-chest keeps treasure and, unwatched, keeps score.',
  Sagittarius: 'Love needs a horizon here — a shared voyage beats a shared berth. Freedom is the love language; see the other dialect gets spoken too.',
  Capricorn: "Ye love in signed articles, not confetti. Time is the proof and the gift; let delight come aboard before it's earned.",
  Aquarius: 'Affection begins in friendship and keeps its sea room. Ye love the whole sailor, oddities first; closeness grows when distance stops being the standing order.',
  Pisces: 'Ye love the way the sea loves — totally, formlessly, sometimes past the point of self. Exalted here: the compassion is real magic, and it works best with a shore.',
};

const MARS: Record<Sign, string> = {
  Aries: 'The engine room is in home port: ignition without hesitation. Ye fight clean and forget fast; the last league deserves the same fire as the launch.',
  Taurus: 'Force moves slow here and cannot be pushed back. Patience is yer weapon; so is stubbornness, and only one of them chooses.',
  Gemini: 'Ye duel with words and win on agility. Scattered fire lights nothing twice — aimed, this quickness is formidable.',
  Cancer: 'Drive here is tidal and protective — slow to anger, total in defence of the crew. Sideways anger costs more than the direct broadside; practise the direct kind.',
  Leo: 'Ye act from the heart with the volume up. Courage is native; the performance of courage is the counterfeit coin to refuse.',
  Virgo: "Effort is precise here — powder spent like a surgeon's blade, not a cannonball. Ye win by craft; perfection is the ambush to sail past.",
  Libra: 'Ye fight for fair dealing and hate the fighting. Grace under fire is real strength; deciding is the muscle that needs the drilling.',
  Scorpio: "Traditional ruler at full depth: will like pressure at the ocean floor. Ye outlast everyone; make sure the campaign's still worth the siege.",
  Sagittarius: 'Drive needs a quest here. Ye act for meaning and travel light; scattershot crusades are the tax on that fire.',
  Capricorn: 'Exalted: ambition with a shipwright’s patience. Ye climb in all weather; remember to sight the view ye fought for.',
  Aquarius: 'Ye fight for the fleet and from the perimeter — strategy over heat. Detachment wins wars and loses evenings in the mess; choose per occasion.',
  Pisces: 'Will moves like current here — indirect, persistent, dissolving obstacles rather than ramming them. Name the port, or the current serves another captain.',
};

const JUPITER: Record<Sign, string> = {
  Aries: 'Growth comes by daring first. Yer luck stands at the front of the boarding party — generosity of nerve, best spent on launches that get finished.',
  Taurus: 'Abundance grows like an orchard ashore: slowly, then dependably. The faith is in the tangible; the pruning is part of the tending.',
  Gemini: 'Ye expand by connecting every port to every other. In detriment, breadth outruns depth easily — the chart-room grows; let some charts get finished.',
  Cancer: 'Exalted: growth through shelter. Generosity pours out as care and multiplies; the feast means most when ye also take a seat at the mess table.',
  Leo: 'Faith wears its brightest coat here. Ye grow by giving heart at scale — magnanimity is the luck, vanity the leak in the hull.',
  Virgo: 'Growth by increments, meaning in the daily refit. In detriment, the big chart arrives via small correct steps — trust the accumulation.',
  Libra: 'Ye expand through partnership and fair articles; luck arrives introduced by someone. Justice is the philosophy — practise it on yerself too.',
  Scorpio: 'Growth happens in the deep here: through wrecks survived, truth faced, trust rebuilt. The treasure is real and the dive is the price.',
  Sagittarius: 'In home port: the horizon fund is fully vested. Meaning multiplies when sailed toward; the sermon stays honest while the voyage continues.',
  Capricorn: 'In fall, faith submits to the quartermaster’s audit — growth must show its working. What survives the scrutiny is durable optimism, the rarest cargo.',
  Aquarius: 'Ye grow by widening the fleet. The luck is collective — visions that lift every deck — and it lands when the future includes the present.',
  Pisces: 'Traditional ruler at high tide: faith without bulkheads. Compassion expands everything it touches; the shoreline is what keeps the sea a gift.',
};

const SATURN: Record<Sign, string> = {
  Aries: 'In fall, the anchor and the mainsail share one line. Discipline must learn to move at speed — hesitation studied until it becomes timing.',
  Taurus: 'Ye build slow and to last. Security is the project of decades; the lesson is that enough, eventually, must be allowed to be enough.',
  Gemini: 'Structure comes to the mind here: speech weighed, learning earned. The bulwark against scatter becomes a chart-room, given time.',
  Cancer: 'In detriment, the bulkhead runs through the home port. Feeling and duty negotiate; the mature treaty lets tenderness be structural too.',
  Leo: "In detriment, the captain's hat is heavy and the cheering suspect. The work is shining without permission — command earned past the fear of the quarterdeck.",
  Virgo: 'Discipline finds its workshop below decks. Standards are high and mostly met; mercy is the tool missing from the top drawer.',
  Libra: 'Exalted: justice with a keel. Ye build fairness that holds under load — articles as architecture, kindness with terms.',
  Scorpio: 'Structure meets the deep: control tested against the uncontrollable sea. What survives is unshakeable; what must be released was never holdable.',
  Sagittarius: 'The far horizon gets a survey crew. Faith is examined, then load-bearing; the voyage gains a chart it can trust.',
  Capricorn: 'In home port: time, gravity, and the long climb all report to yer quarterdeck. Mastery is native — the mountain is real, and so is the watch rota for resting.',
  Aquarius: "Traditional ruler: the pattern gets proper shipwrighting. Ye build for the future's sailors; the blueprint warms when they're consulted.",
  Pisces: 'Structure in the water: hard here, and precious. The work is giving the boundless a hull it consents to — banks, not dams.',
};

const URANUS: Record<Sign, string> = {
  Aries: 'The lightning takes the helm: mutiny against the script as first instinct. Breakthroughs come fast; revolutions need a second week at sea.',
  Taurus: 'In fall by tradition, the awakener meets the immovable. Change arrives through the seabed itself — slow revolutions, permanent.',
  Gemini: 'The mind electrifies: ideas arrive in storms and signal-flags. Genius is native; follow-through is imported cargo.',
  Cancer: 'The lightning strikes the home port — family scripts interrupted, roots rewired. Freedom and belonging learn to share a cabin.',
  Leo: 'In detriment, the mutineer wants the captaincy. The authentic performance breaks every format; the trap is being different for the looking glass.',
  Virgo: 'Revolution by refit: systems debugged, the daily watch reinvented. The radical act here is the improved routine.',
  Libra: 'Partnership gets renegotiated from first principles. Fair dealing demands originality; the experiment is signed articles without the brig.',
  Scorpio: 'Exalted by tradition: the awakener in the deep. Transformation arrives as shipwreck and proves to be rescue.',
  Sagittarius: 'Belief systems get struck by weather. The heresy is usually early truth; aim it, and it becomes a course to steer.',
  Capricorn: 'The lightning audits the admiralty. Structures are broken precisely — the rebel with a manifest, the reform that holds.',
  Aquarius: 'In home port: the future speaks its native tongue. The pattern-breaker serves the fleet; the distance from the crowd is the crow’s nest, not the wall.',
  Pisces: 'The awakener dissolves into the water table: intuition electrified. Visions arrive unscheduled — the practice is logging them down.',
};

const NEPTUNE: Record<Sign, string> = {
  Aries: 'The dream wants a figurehead at the prow. Ideals arrive with adrenaline; the crusade is holy exactly as long as it stays honest.',
  Taurus: 'The sea-mist settles on the material: beauty found in the tangible, gold touched by fantasy. Enchantment is lovely; the treasure still wants honest weighing.',
  Gemini: "Language turns to watercolour. Yarns persuade beyond their facts here — a poet's gift with a fact-checker's homework.",
  Cancer: 'The longing is for the original home port. Memory idealises; the compassion for kin is real, and so is the fog around it.',
  Leo: 'Glamour in the classic sense: the shine that borrows from dream. Creativity is genuinely inspired; the audience is genuinely imagined.',
  Virgo: "In detriment, the boundless meets the ship's manifest. Service becomes devotion — the sacred found in the useful, once perfection stops posing as holiness.",
  Libra: 'The ideal of the perfect first mate, projected in high resolution. Real love makes port when the lantern-show dims and the person remains.',
  Scorpio: 'The solvent works at depth: obsession, mysticism, desire past its own explanations. The undertow is strong; so is what it teaches.',
  Sagittarius: 'Faith without borders, voyage without charts. The vision is genuinely vast — the discernment is which horizon is real.',
  Capricorn: 'The dream meets the admiralty: idealism about structures, disillusion as curriculum. What survives is the workable vision.',
  Aquarius: 'Utopia gets a schematic. The fleet’s dreams run bright and impersonal; the sailors in the diagram need names.',
  Pisces: 'In home waters: the ocean, undiluted. Imagination, compassion, and dissolution at full strength — the raft of routine is not optional.',
};

const PLUTO: Record<Sign, string> = {
  Aries: 'Power expresses as raw initiative: scuttle, launch, repeat. The furnace is enormous — pointed well, it clears new coastline; pointed badly, it just burns.',
  Taurus: 'In detriment, transformation grinds against permanence. What must change will change the slow way — through the keel and foundations.',
  Gemini: 'The underworld enters the parley: words that expose, intelligence as power. The depth charge is a question.',
  Cancer: 'Power runs through the roots — kin, flag, crew, remade under pressure. The grip that protects can also entomb; the renewal starts at home port.',
  Leo: 'The will to shine becomes the will to matter. Creative force at ocean-floor pressure — the ego’s death and the heart’s return, on the quarterdeck.',
  Virgo: 'Transformation through the meticulous: systems purged, work remade, health rebuilt from the timber up. The humble domain hides the deepest overhaul.',
  Libra: 'Power surfaces in the looking glass: partnerships as crucibles. The balance of power is the actual subject; fairness, the actual revolution.',
  Scorpio: "In home waters: the underworld with the lanterns lit. Regeneration is the native art — nothing kept in the hold that hasn't survived the fire.",
  Sagittarius: 'Beliefs get the deep excavation. Dogma dies, meaning regenerates; the truth that survives its own burial at sea is yers.',
  Capricorn: 'The structures themselves go into the crucible: admiralties, ambitions, authority composted and rebuilt. Power learns accountability or learns collapse.',
  Aquarius: "The fleet's current runs at high voltage: systems, networks, futures transformed wholesale. The crew's shadow is the crew's material.",
  Pisces: 'The deep and the boundless merge: dissolution as transformation. What regrows here regrows everywhere the water reaches.',
};

const NODE: Record<Sign, string> = {
  Aries: 'The compass pulls toward selfhood: daring to want, sailing solo if needed. The familiar comfort of accommodating every hand is the past; the appetite is for yer own name on the ship’s papers.',
  Taurus: 'The compass pulls toward the simple and the solid: yer own values, yer own ground ashore. Drama is the old country; peace is the frontier.',
  Gemini: 'The compass pulls toward curiosity over certainty: asking, learning, staying for the answer. The sermon lies astern; the conversation lies ahead.',
  Cancer: "The compass pulls toward the hearth: feeling, belonging, letting yerself be fed. The summit was last voyage's business; the home port is this one's.",
  Leo: 'The compass pulls toward the centre of yer own stage: creating, risking, being seen. The safe anonymity of the crowd is the habit to outgrow.',
  Virgo: 'The compass pulls toward craft and the useful watch: order as devotion. The fog was comfortable; the ship’s checklist, surprisingly, is the spiritual path.',
  Libra: 'The compass pulls toward the other: partnership, fairness, the art of sailing with. Going it alone is mastered already — the frontier is company.',
  Scorpio: 'The compass pulls toward the deep: intimacy, shared treasure, transformation over hoarding. The comfortable surface is the outgrown shell.',
  Sagittarius: 'The compass pulls toward meaning: the long voyage, the honest philosophy. The dockside gossip and the errands are yesterday’s homework.',
  Capricorn: 'The compass pulls toward standing accountable: building, mattering, weathering the storm. The tide of moods is the old home; the mountain is the new one.',
  Aquarius: 'The compass pulls toward the wide fleet: causes, crewmates, futures. The private stage is well-rehearsed; the commons is calling.',
  Pisces: 'The compass pulls toward surrender: trust, imagination, the uncharted. The manifest of the self is complete; the sea is the syllabus.',
};

const CHIRON: Record<Sign, string> = {
  Aries: 'The tender place is the right to exist at full sail. Doubt about yer own daring becomes, tended, a gift for stirring courage in other sailors.',
  Taurus: 'The wound is about enough — worth, safety, the deck beneath ye. Healed slowly, it becomes the steadiest hand the crew knows.',
  Gemini: 'The sore spot is the voice: being heard, being believed. The one who struggled to say it becomes the one who teaches the saying.',
  Cancer: 'The ache is around belonging and being mothered. What ye needed and organise for the crew becomes, in time, yers to receive.',
  Leo: 'The wound is around shining: praise withheld, or given for the wrong self. The healing performance is the unguarded one.',
  Virgo: "The tender place is being useful enough to deserve a berth. The healer's healing is discovering worth precedes work.",
  Libra: 'The wound boards through relationship: picked last for the crew, kept off-balance. The medicine ye carry is fairness that includes yerself.',
  Scorpio: "The sore place is trust betrayed in deep water. Survived and tended, it reads other sailors' depths with a surgeon's kindness.",
  Sagittarius: 'The wound is around meaning: faith broken, questions punished. The navigator ye become holds the question open for others.',
  Capricorn: 'The ache is legitimacy: never quite enough rank, recognition, standing. The mastery ye build anyway becomes the mentorship ye needed.',
  Aquarius: 'The tender place is the edge of the crew — the odd hand, tolerated. The gift matured is making berths where no one is.',
  Pisces: "The wound is boundless: every sailor's pain arriving as yers. The healing is a shoreline — compassion with a body attached.",
};

const LILITH: Record<Sign, string> = {
  Aries: 'What was marooned is the raw want — anger, appetite, the unapologetic first move. It returns as clean fire when finally invited to the mess table.',
  Taurus: 'The refused thing is pleasure without permission. The body keeps its own log here; owned, it becomes unshakeable ground.',
  Gemini: 'The banished voice is the unsayable said plainly. It returns as wit with teeth — the truth-telling this chart was warned about.',
  Cancer: 'What was marooned is the need itself — hunger for care called too much. Reclaimed, it feeds without apology and mothers without martyrdom.',
  Leo: 'The refused thing is the full lantern-light. The shine that was called vanity returns as sovereignty when it stops asking.',
  Virgo: 'The banishment was of imperfection: mess, appetite, the untrimmed self. Its return makes the ship’s standards humane.',
  Libra: "What was marooned is the unaccommodating no. It rows back as fairness with a keel — beauty that doesn't barter.",
  Scorpio: 'The refused thing is power at full fathom: desire, rage, the uncensored current. Owned, it stops leaking and starts steering.',
  Sagittarius: "The banished voice is the heresy — the belief that didn't fit the chapel. It returns as a philosophy with yer fingerprints on it.",
  Capricorn: 'What was marooned is ambition in its naked form. Reclaimed from shame, it builds without asking whose leave.',
  Aquarius: 'The refused thing is the true strangeness — the difference beyond the acceptable eccentric. Owned, it stops performing and starts leading.',
  Pisces: 'What was marooned is the boundless self — called dreamy, called too much, called away with the tide. It returns as vision the daylight watch can use.',
};

export const pirate: ContentSet = {
  planetArchetypes: {
    sun: 'the captain’s will — what ye be becoming when ye sail truest to yerself',
    moon: 'the needs below decks — instinct, memory, what safe harbour feels like',
    mercury: 'the mind under sail — how ye take in, chart, and call out',
    venus: 'what treasure catches yer eye and how ye draw it aboard',
    mars: 'the engine room — how ye want, give chase, and defend the ship',
    jupiter: 'the hunger for open water — growth, meaning, the luck ye clear deck-space for',
    saturn: 'the keel that bears the load — limits, time, what ye must build to keep afloat',
    uranus: 'the lightning off the bow — where ye tear up the admiralty’s orders',
    neptune: 'the sea-mist — imagination, longing, the blur between sailor and sea',
    pluto: 'the engine in the deep — power, loss, and what grows back after the wreck',
    trueNode: 'the pull of the compass — an appetite the soul’s log hasn’t satisfied yet',
    meanNode: 'the pull of the compass — an appetite the soul’s log hasn’t satisfied yet',
    chiron: 'the tender place — the old wound that teaches ye to patch up other sailors',
    meanLilith: 'the marooned — what was cast off the ship and rows back untamed',
  },
  signLenses: {
    Aries: {
      light: 'courage that weighs anchor first and charts the course underway',
      truth: 'cardinal fire: ignition, the instinct to set sail',
      shadow: 'impatience that takes speed for headway and the captain for the whole crew',
    },
    Taurus: {
      light: 'steadiness, the pleasures of port, the knack for building things that last',
      truth: 'fixed earth: holding fast, ripening cargo, the worth of what ye can touch',
      shadow: 'an anchor dressed up as loyalty; a comfortable berth kept past its usefulness',
    },
    Gemini: {
      light: 'quickness, curiosity, the gift of carrying word between distant ports',
      truth: 'mutable air: circulation, the trade winds of ideas',
      shadow: 'a scattered course; a cleverness that skims where it fears to dive',
    },
    Cancer: {
      light: 'fierce shelter — the crew’s memory kept warm in the galley',
      truth: 'cardinal water: the tide that feeds and guards its own',
      shadow: 'moods that harden into hull walls; care that becomes keeping the crew below decks',
    },
    Leo: {
      light: 'warmth that makes the whole crew stand taller, not smaller',
      truth: 'fixed fire: the galley hearth, the heart performed on deck',
      shadow: 'the need for the crew’s cheering eating the joy of the voyage itself',
    },
    Virgo: {
      light: 'precision in service of what actually keeps the ship afloat',
      truth: 'mutable earth: the haul brought in, discernment, the craft of refitting',
      shadow: 'the fault called before the kindness; a perfect ship that never leaves dry dock',
    },
    Libra: {
      light: 'grace, fair dealing, the art of making a handsome crew of two',
      truth: 'cardinal air: the scales, the first move toward an even keel',
      shadow: 'peace bought by swallowing yer own unspoken bearings',
    },
    Scorpio: {
      light: 'depth that does not flinch; loyalty down to Davy Jones’s locker',
      truth: 'fixed water: pressure of the deep, intimacy, the transformation of what’s held in the hold',
      shadow: 'control, secrets in the hold, the sting saved for yer own hide',
    },
    Sagittarius: {
      light: 'faith in the horizon — meaning found by sailing toward it',
      truth: 'mutable fire: the arrow, the ever-widening chart',
      shadow: 'the sermon that outruns the voyage; truth flown as a flag of escape',
    },
    Capricorn: {
      light: 'the long haul to the summit, done with dry wit and clean hands',
      truth: 'cardinal earth: structure, ambition, time as ship’s timber',
      shadow: 'worth weighed only in cargo landed; a summit that recedes like the horizon',
    },
    Aquarius: {
      light: 'the clear eye from the crow’s nest, in service of every sailor’s future',
      truth: 'fixed air: the pattern sighted from aloft, the rigging that binds the fleet',
      shadow: 'principled coldness; loving the whole fleet while dodging the sailors aboard',
    },
    Pisces: {
      light: 'compassion with a porous hull; imagination that dissolves every border on the chart',
      truth: 'mutable water: the sea all rivers return to, the unguarded gangway',
      shadow: 'escape, martyrdom, the fog that steers around the edge that must be faced',
    },
  },
  houseDomains: [
    'the figurehead and the gangway — body, bearing, how the sea first meets ye',
    'what ye keep in the hold — cargo, worth, the deck beneath yer boots',
    'the home waters of the mind — siblings, short runs ashore, everyday signals',
    'the anchorage — home port, bloodline, the private quarters of the self',
    'the shore leave — creation, romance, young ’uns, the courage to enjoy the voyage',
    'the ship’s workshop — craft, daily watches, health, the dignity of swabbing the deck',
    'the looking glass — first mates, rivals, every soul who is not ye',
    'the shared deep — other crews’ treasure, debts, sex, grief, trust',
    'the far horizon — belief, study, long voyages, the bigger chart',
    'the crow’s nest — vocation, reputation, what ye answer for before the fleet',
    'the fleet — friends, allies, crews of common cause, futures charted together',
    'the quiet cove — solitude, voyage’s end, the hidden work before the next launch',
  ],
  aspectLenses: {
    conjunction: {
      light: 'two hands on one wheel — a pair of functions steering as one louder voice',
      truth: 'no sea room between them: these parts of ye cannot sight each other, only sail together',
      shadow: 'a blend so total neither part can be inspected nor stood down',
    },
    sextile: {
      light: 'a fair wind on offer — cooperation whenever ye trim the sails for it',
      truth: 'friendly elements offering opportunity, not a guaranteed haul',
      shadow: 'the chest left unopened because it never forces the boarding',
    },
    square: {
      light: 'the crosswind that builds true seamanship — the aspect of earned strength',
      truth: 'two headings at cross-purposes demanding a construction, not a victor',
      shadow: 'the same squall weathered again and again till the lesson is finally logged',
    },
    trine: {
      light: 'a following sea — native talent, flow so easy it feels like the weather',
      truth: 'same-element harmony: support that asks nothing of ye',
      shadow: 'ease gone slack in the rigging; the skill never honed because it never had to be',
    },
    opposition: {
      light: 'the sighting from the far shore — the full-moon view of yer own polarity',
      truth: 'a see-saw of tides: two ends of one axis negotiating balance',
      shadow: 'projection — meeting yer own disowned cargo in other sailors’ holds',
    },
    semisextile: {
      light: 'a slight adjacency that careful rigging can lash together',
      truth: 'neighbouring ports with nothing in common but the harbour wall',
      shadow: 'a low-grade chafe ignored until the line frays',
    },
    semisquare: {
      light: 'an itch in the boots that keeps ye honest',
      truth: 'a minor squall: irritation without full stakes',
      shadow: 'a chronic small grievance mistaken for the captain’s character',
    },
    sesquiquadrate: {
      light: 'corrective rudder — course adjustments earned mid-passage',
      truth: 'squall-family friction blowing in at odd angles',
      shadow: 'an agitation whose quarter is hard to name, so it gets blamed on the wrong wind',
    },
    quincunx: {
      light: 'the seamanship of living with what will not resolve',
      truth: 'two crews with no shared tongue, berthed forever side by side',
      shadow: 'perpetual trimming that never asks whether to renegotiate the articles',
    },
    quintile: {
      light: 'a signature knot — pattern-making talent',
      truth: 'fifth-harmonic creativity: style, craft, play on deck',
      shadow: 'cleverness performed for its own reflection in the water',
    },
    biquintile: {
      light: 'an elegant back-channel between far-flung talents',
      truth: 'fifth-harmonic rigging strung across a wide arc',
      shadow: 'gifts hoarded as private tricks rather than shared craft',
    },
  },
  dignityNotes: {
    domicile: 'in home port — this function speaks its native sea-tongue here',
    exaltation: 'an honoured guest aboard — welcomed, amplified, now and then over-toasted',
    detriment: 'sailing foreign waters — more effort, and often more growth for the trouble',
    fall: 'a quiet berth — the function works, softly and underestimated',
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
