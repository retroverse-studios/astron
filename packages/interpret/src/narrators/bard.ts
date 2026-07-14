import type { ContentSet } from '../overrides.js';

/**
 * 🎭 Shakespearean player narrator — a complete alternative content set.
 * Same meaning entry-for-entry as the shipped text, different diction; the
 * honesty rules still bind, in character.
 */

type SignSet = ContentSet['fluentPlacements'][keyof ContentSet['fluentPlacements']];

const SUN: SignSet = {
  Aries: 'Thou art most thyself in the moment of beginning. Identity here is a verb — struck like flint to tinder, renewed by every fresh prologue — and the labour is finishing what the spark began.',
  Taurus: "Selfhood ripeneth slowly and holdeth fast. Thou becomest who thou art by tending what endureth, and the peril worth thy watch is mistaking comfort for the play's end.",
  Gemini: 'Thou art made of questions and quick bridges. Identity liveth in the exchange — telling, hearing, joining — and deepeneth the day curiosity ceaseth to skim.',
  Cancer: 'The self is a shoreline: protective, tidal, deep of memory. Thou becomest thyself by sheltering what thou lovest, and growest when the shell learneth to open as well as shut.',
  Leo: 'Thou bearest a hearth within thy breast. Radiance is the office — warming a whole house into life — and it ripeneth when the shining no longer craveth the applause.',
  Virgo: 'Thou becomest thyself through craft: noting, refining, making things truly serve. The gift sharpeneth into service when the inner critic learneth to bless what is good enough.',
  Libra: 'Identity taketh form in the space between players — thou knowest thyself best mid-scene with another. Grace is true power here, so long as thine own preference survive the peacemaking.',
  Scorpio: 'Thou art built for the deeps and canst not abide the shallows. Selfhood is forged in intensity and renewal, and it freeth itself the day control loosen into trust.',
  Sagittarius: 'Thou art the arrow and the horizon in one. Meaning is thy fuel — found by going — and the journey ripeneth when the sermon yieldeth to the pilgrimage.',
  Capricorn: 'Thou becomest thyself by building what outlasteth the mood. Mastery and time are thy materials; the summit meaneth most when worth cease to be reckoned in output alone.',
  Aquarius: 'Identity here standeth a little without the circle, beholding the pattern. Thou art most thyself serving a morrow others cannot yet picture — warmest when the ideals include living folk.',
  Pisces: 'The self here hath porous borders and a long tide. Thou becomest who thou art through compassion and fancy, and standest strongest when the softness findeth its own edge.',
};

const MOON: SignSet = {
  Aries: 'Feelings arrive swift, burn clean, and leave scant ash. Thou art safest when thou mayst act upon emotion straightway — the practice is pausing without smothering the flame.',
  Taurus: 'Thou art fed by steadiness: familiar fare, familiar arms, the unhurried hour. Safety is of the senses and real here, and deepeneth whilst routine remain nourishment and not fortress.',
  Gemini: 'Thou digestest feeling by talking it through. Safety is good discourse, and the heart settleth once the words cease their circling and alight.',
  Cancer: 'The needs here are the ancient ones, felt at full tide: belonging, memory, home. Thou readest moods like weather — thine own tempests among them — and shelterest others by instinct.',
  Leo: "Thou must be seen to feel safe, and there is no shame in't. Warmth received becometh warmth given forth; unwitnessed, the heart dimmeth and playeth a part instead.",
  Virgo: 'Thou soothest thyself by setting things aright — a tidied chamber is a tidied mind. Care arriveth as usefulness, and resteth easier when none audit it.',
  Libra: "Even balance is thy comfort's meat; discord landeth in the very body. Thou art fed by beauty and fair dealing, and growest sturdy when peace no longer cost thine honesty.",
  Scorpio: 'Feelings run deep, silent, and entire here. Trust is dear-bought and worth the price; the instinct that guardeth the well may also seal it.',
  Sagittarius: 'Thou art nourished by open doors and long prospects. Confinement readeth as danger; the practice is finding the horizon within the vow.',
  Capricorn: 'Feeling arriveth here with a chaperone — measured, translated into duty. The tenderness is real and runneth deep; it asketh leave to need without first earning.',
  Aquarius: 'Thou weighest emotion from one step back, which is a skill and a habit both. Belonging to all men may dodge belonging to one; the cool air warmeth with practice.',
  Pisces: "Thou feelest the room ere thou enter it. The borders between thy weather and all others' blur — the gift is compassion, the discipline is knowing whose tide be whose.",
};

const MERCURY: SignSet = {
  Aries: 'Thought moveth like struck flint — first word in the hall, sometimes ere the hall be ready. The mind is decisive and brave, and listeneth best of set purpose.',
  Taurus: 'Thou thinkest in slow strata: layer upon layer, conclusions firm as stone. What thou learnest, thou keepest; the same grip that holdeth knowledge may hold a map grown stale.',
  Gemini: 'The mind is at home — quick, manifold, delighted. Thou joinest anything to anything; depth is a choice this brilliance must keep making.',
  Cancer: 'Thou thinkest with the memory and speakest from the tide. Facts arrive wrapped in feeling, which maketh thee persuasive — and maketh the wrapping worth inspection.',
  Leo: 'Ideas arrive dressed for the stage. Thou tellest tales, and finely; the craft ripeneth when being interesting cease to outrank being true.',
  Virgo: 'The mind is a fine instrument, tuned for what may be mended. Analysis is love in this dialect — kindest when the red quill resteth at times.',
  Libra: 'Thou thinkest in dialogues and weighest every side. Judgement here is truly fair and famously slow; some scales settle only when thou lay thine own weight upon them.',
  Scorpio: 'The mind is an inquisitor — quiet, thorough, not to be gulled. Thou hearest what is left unsaid; the skill turneth lonely when all things become evidence.',
  Sagittarius: 'Thou thinkest in maps, morals, and jests. The great picture cometh naturally; the fine print is a discipline worth the borrowing.',
  Capricorn: 'Thought is masonry here: what beareth load, what will not. Thou speakest little and buildest much — and the dry wit is a feature, not a leak.',
  Aquarius: "The mind runneth on pattern and principle, at ease far from the crowd's consent. Thou seest the system whole; translating to the mortals within it is the art.",
  Pisces: 'Thou thinkest in images, osmosis, and tide. Logic cometh late but insight cometh early; the tablet by the bed is load-bearing furniture.',
};

const VENUS: SignSet = {
  Aries: 'Desire is direct here — thou lovest like a proclamation. The chase delighteth thee; the keeping asketh a different courage.',
  Taurus: 'Love is at home in the body and the garden. Thou attachest slowly, sensually, for keeps — and the holding is loveliest with the grip at ease.',
  Gemini: "Attraction beginneth at the conversation. Variety is not fickleness here, but appetite for the mind's company; the deepening is a choice made twice daily.",
  Cancer: 'Thou lovest by feeding, keeping, remembering. Devotion pooleth deep; it stayeth sweet when care first asketh what the other truly needeth.',
  Leo: 'Love is theatre in the best sense — generous, loyal, well-lit. Thou givest magnificently and wiltest without notice; say so, rather than dimming thy lamp.',
  Virgo: 'Affection here is practical devotion: the mended hinge, the packed satchel, the noted detail. It is love, entire — let it also be received.',
  Libra: 'Venus reigneth here: harmony, beauty, the artistry of the pair. Thou makest partnership an art form; keep one brushstroke that is thine alone.',
  Scorpio: 'Thou lovest at depth or not at all. Intimacy is the true coin; the vault keepeth treasure and, unwatched, keepeth score.',
  Sagittarius: "Love needeth a horizon here — a shared journey outweigheth a shared settle. Freedom is the love's tongue; see that the other dialect be spoken too.",
  Capricorn: 'Thou lovest in covenants, not confetti. Time is the proof and the gift; let delight be admitted ere it be earned.',
  Aquarius: 'Affection beginneth in friendship and keepeth its open air. Thou lovest the whole person, oddities foremost; closeness groweth when distance cease to be the standing reply.',
  Pisces: 'Thou lovest as water loveth — wholly, formlessly, sometimes past the point of self. Exalted here: the compassion is true magic, and it worketh best with a shore.',
};

const MARS: SignSet = {
  Aries: 'The engine is at home: ignition without hesitation. Thou fightest clean and forgettest fast; the finish deserveth the same passion as the start.',
  Taurus: 'Force moveth slowly here and cannot be moved back. Patience is thy weapon; so is stubbornness, and only one of them chooseth.',
  Gemini: 'Thou fencest with words and winnest by agility. Scattered fire lighteth nothing twice — aimed, this quickness is formidable.',
  Cancer: 'Drive here is tidal and protective — slow to wrath, total in defence of its own. Sidelong anger costeth more than the direct kind; rehearse the direct kind.',
  Leo: 'Thou actest from the heart with the trumpets up. Courage is native; the performance of courage is the counterfeit to refuse.',
  Virgo: 'Effort is precise here — strength spent like a lancet, not a mallet. Thou winnest by craft; perfection is the ambush to walk past.',
  Libra: 'Thou fightest for fairness and hatest the fighting. Grace amid conflict is true strength; deciding is the muscle that wanteth exercise.',
  Scorpio: "The ancient ruler at full depth: will like the pressure at the ocean's floor. Thou outlastest all comers; be sure the campaign still merit the siege.",
  Sagittarius: 'Drive needeth a quest here. Thou actest for meaning and travellest light; scattershot crusades are the toll upon that fire.',
  Capricorn: "Exalted: ambition with an engineer's patience. Thou climbest in all weathers; remember to behold the view thou foughtest for.",
  Aquarius: 'Thou fightest for the company and from the perimeter — stratagem over heat. Detachment winneth wars and loseth evenings; choose by occasion.',
  Pisces: "Will moveth like a current here — indirect, persistent, dissolving obstacles rather than breaking them. Name the goal, or the current serveth another's.",
};

const JUPITER: SignSet = {
  Aries: 'Increase cometh by daring first. Thy fortune standeth at the front of the line — a generosity of nerve, best spent on beginnings that get finished.',
  Taurus: 'Abundance groweth like an orchard here: slowly, then dependably. The faith is in the tangible; the pruning is part of the tending.',
  Gemini: 'Thou growest by joining everything to everything. In detriment, breadth outrunneth depth with ease — the library groweth; let some volumes be finished.',
  Cancer: 'Exalted: increase through shelter. Generosity poureth forth as care and multiplieth; the feast meaneth most when thou also take a chair.',
  Leo: 'Faith weareth its brightest coat here. Thou growest by giving heart at scale — magnanimity is the fortune, vanity the leak.',
  Virgo: 'Increase by inches, meaning in maintenance. In detriment, the great picture arriveth by small correct steps — trust the accumulation.',
  Libra: 'Thou growest through partnership and fair dealing; fortune arriveth introduced by someone. Justice is the philosophy — practise it upon thyself as well.',
  Scorpio: 'Increase happeneth in the deeps here: through crisis survived, truth faced, trust rebuilt. The treasure is real and the descent is the price.',
  Sagittarius: "At home: the horizon's treasury is fully vested. Meaning multiplieth when journeyed toward; the sermon stayeth honest whilst the pilgrimage continue.",
  Capricorn: 'In fall, faith submitteth to audit — increase must show its working. What survive the scrutiny is durable hope, the rarest kind.',
  Aquarius: "Thou growest by widening the circle. The fortune is the company's — visions that lift every player — and it landeth when the future include the present.",
  Pisces: 'The ancient ruler at high tide: faith without walls. Compassion enlargeth all it toucheth; the boundary is what keepeth the sea a gift.',
};

const SATURN: SignSet = {
  Aries: 'In fall, the brake and the spur share one boot. Discipline must learn to move at speed — hesitation studied until it become timing.',
  Taurus: 'Thou buildest slowly and to last. Security is the work of decades; the lesson is that enough must, at length, be suffered to be enough.',
  Gemini: 'Structure cometh to the mind here: speech weighed, learning earned. The wall against scatter becometh a library, given time.',
  Cancer: 'In detriment, the wall runneth through the home. Feeling and duty parley; the ripe treaty letteth tenderness be structural too.',
  Leo: 'In detriment, the crown sitteth heavy and the applause is suspect. The work is shining without permission — authority earned past the fear of the stage.',
  Virgo: 'Discipline findeth its workshop. Standards are high and mostly met; mercy is the tool missing from the top drawer.',
  Libra: 'Exalted: justice with a spine. Thou buildest fairness that beareth load — covenants as architecture, kindness with terms.',
  Scorpio: 'Structure meeteth the deeps: control tried against the uncontrollable. What surviveth is unshakeable; what must be released was never holdable.',
  Sagittarius: 'The far horizon getteth its surveyors. Faith is examined, then made load-bearing; the journey gaineth a map it may trust.',
  Capricorn: 'At home: time, gravity, and the long climb all answer to thee. Mastery is native — the mountain is real, and so is the schedule for rest.',
  Aquarius: "The ancient ruler: the pattern getteth its engineering. Thou buildest for the future's people; the blueprint warmeth when they be consulted.",
  Pisces: 'Structure in the water: hard here, and precious. The work is giving the boundless a vessel it consenteth to — banks, not dams.',
};

const URANUS: SignSet = {
  Aries: 'The lightning taketh the lead: rebellion as first instinct. Breakthroughs come swift; revolutions need a second week.',
  Taurus: 'In fall by tradition, the awakener meeteth the immovable. Change arriveth through the very ground — slow revolutions, permanent.',
  Gemini: 'The mind is electrified: ideas arrive in storms and networks. Genius is native; the following-through is imported.',
  Cancer: 'The lightning striketh home — family scripts interrupted, roots re-laid. Freedom and belonging learn to share one house.',
  Leo: 'In detriment, the rebel craveth a throne. The authentic performance breaketh every format; the trap is being different for the mirror.',
  Virgo: 'Revolution by refinement: systems mended of their faults, work reinvented. The radical act here is the bettered routine.',
  Libra: 'Partnership is renegotiated from first principles. Fairness demandeth originality; the experiment is commitment without the cage.',
  Scorpio: 'Exalted by tradition: the awakener in the deeps. Transformation arriveth as rupture and proveth to be rescue.',
  Sagittarius: 'Belief systems are struck by weather. The heresy is usually truth come early; aim it, and it becometh a curriculum.',
  Capricorn: 'The lightning auditeth the establishment. Structures are broken with precision — the rebel with a ledger, the reform that holdeth.',
  Aquarius: 'At home: the future speaketh in its mother tongue. The pattern-breaker serveth the company; the distance from the crowd is the vantage, not the wall.',
  Pisces: 'The awakener dissolveth into the water table: intuition electrified. Visions arrive unscheduled — the practice is writing them down.',
};

const NEPTUNE: SignSet = {
  Aries: 'The dream wanteth a spearhead. Ideals arrive with hot blood; the crusade is holy exactly so long as it stay honest.',
  Taurus: 'The mist settleth upon the material: beauty found in the tangible, coin touched by fancy. Enchantment is lovely; appraisals still matter.',
  Gemini: "Language turneth to watercolour. Tales persuade beyond their facts here — a poet's gift with a clerk's homework.",
  Cancer: 'The longing is for the first home. Memory gildeth; the compassion for kin is real, and so is the fog about it.',
  Leo: 'Glamour in the old sense: the shine that borroweth from dream. The making is truly inspired; the audience is truly imagined.',
  Virgo: 'In detriment, the boundless meeteth the checklist. Service becometh devotion — the sacred found in the useful, once perfection cease to pose as holiness.',
  Libra: 'The ideal of the perfect other, projected in high resolution. Real love arriveth when the lantern dimmeth and the person remain.',
  Scorpio: 'The solvent worketh at depth: obsession, mysticism, desire past its own explanations. The undertow is strong; so is what it teacheth.',
  Sagittarius: 'Faith without borders, journey without maps. The vision is truly vast — the discernment is which horizon be real.',
  Capricorn: 'The dream meeteth the institution: idealism about structures, disillusion as curriculum. What surviveth is the workable vision.',
  Aquarius: "Utopia getteth a schematic. The company's dreams run bright and impersonal; the mortals in the diagram need names.",
  Pisces: 'At home: the ocean, undiluted. Fancy, compassion, and dissolution at full strength — the raft of routine is not optional.',
};

const PLUTO: SignSet = {
  Aries: 'Power speaketh as raw initiative: destroy, begin, repeat. The furnace is enormous — pointed well, it cleareth land; pointed ill, it merely burneth.',
  Taurus: 'In detriment, transformation grindeth against permanence. What must change will change the slow way — through the foundations.',
  Gemini: 'The underworld entereth the conversation: words that lay bare, intelligence as power. The depth-charge is a question.',
  Cancer: 'Power runneth through the roots — family, nation, tribe, remade under pressure. The grip that protecteth may also entomb; the renewal beginneth at home.',
  Leo: "The will to shine becometh the will to matter. Creative force at the underworld's pressure — the ego's death and the heart's return, upon the stage.",
  Virgo: 'Transformation through the meticulous: systems purged, work remade, health rebuilt from the smallest part upward. The humble province hideth the deepest overhaul.',
  Libra: 'Power surfaceth in the mirror: partnerships as crucibles. The balance of power is the true subject; fairness, the true revolution.',
  Scorpio: 'At home: the underworld with the torches lit. Regeneration is the native art — nothing kept that hath not passed through the fire.',
  Sagittarius: 'Beliefs get the deep excavation. Dogma dieth, meaning regenerateth; the truth that surviveth its own funeral is thine.',
  Capricorn: 'The structures themselves go into the crucible: institutions, ambitions, authority composted and rebuilt. Power learneth accountability or learneth collapse.',
  Aquarius: "The collective current runneth at high charge: systems, networks, futures transformed wholesale. The company's shadow is the company's material.",
  Pisces: 'The deep and the boundless merge: dissolution as transformation. What regroweth here regroweth everywhere the water reacheth.',
};

const NODE: SignSet = {
  Aries: 'The pull is toward selfhood: daring to want, alone if need be. The familiar comfort of pleasing all is the past; the appetite is for thine own name.',
  Taurus: 'The pull is toward the simple and the solid: thine own values, thine own ground. Drama is the old country; peace is the frontier.',
  Gemini: 'The pull is toward curiosity over certainty: asking, learning, staying for the answer. The sermon lieth behind thee; the conversation lieth ahead.',
  Cancer: "The pull is toward the hearth: feeling, belonging, suffering thyself to be fed. The summit was last life's business; the home is this one's.",
  Leo: 'The pull is toward the centre of thine own stage: creating, hazarding, being seen. The safe anonymity of the crowd is the habit to outgrow.',
  Virgo: "The pull is toward craft and the useful day: order as devotion. The fog was comfortable; the task-list, to thy surprise, is the pilgrim's road.",
  Libra: 'The pull is toward the other: partnership, fairness, the art of with. Going alone is mastered already — the frontier is company.',
  Scorpio: 'The pull is toward the deeps: intimacy, shared coffers, transformation over hoarding. The comfortable surface is the shell outgrown.',
  Sagittarius: "The pull is toward meaning: the long journey, the honest philosophy. The gossip and the errands are yesterday's lessons.",
  Capricorn: 'The pull is toward standing accountable: building, mattering, weathering. The tide of moods is the old home; the mountain is the new.',
  Aquarius: 'The pull is toward the wide circle: causes, colleagues, futures. The private stage is well-rehearsed; the commons calleth.',
  Pisces: 'The pull is toward surrender: trust, imagination, the unplotted scene. The ledger of the self is complete; the sea is the syllabus.',
};

const CHIRON: SignSet = {
  Aries: 'The tender place is the right to exist at full voice. Doubt of thine own daring becometh, well-tended, a gift for stirring courage in others.',
  Taurus: 'The wound is about enough — worth, safety, the ground beneath thee. Healed slowly, it becometh the steadiest hand others know.',
  Gemini: 'The sore place is the voice: being heard, being believed. He who struggled to say it becometh the one who teacheth the saying.',
  Cancer: 'The ache is about belonging and being mothered. What thou didst need and now arrangest for others becometh, in time, thine to receive.',
  Leo: 'The wound is about shining: praise withheld, or given to the wrong self. The healing performance is the unguarded one.',
  Virgo: "The tender place is being useful enough to deserve a place. The healer's own healing is discovering that worth precedeth work.",
  Libra: 'The wound walketh in through relationship: chosen last, kept off-balance. The medicine thou carriest is fairness that includeth thyself.',
  Scorpio: "The sore place is trust betrayed at depth. Survived and tended, it readeth others' deeps with a surgeon's kindness.",
  Sagittarius: 'The wound is about meaning: faith broken, questions punished. The teacher thou becomest holdeth the question open for others.',
  Capricorn: 'The ache is legitimacy: never quite enough authority, recognition, standing. The mastery thou buildest anyway becometh the mentorship thou didst need.',
  Aquarius: 'The tender place is the edge of the company — the odd one, tolerated. The gift full-ripened is making rooms where no one is.',
  Pisces: "The wound is boundless: every soul's pain arriving as thine. The healing is a shoreline — compassion with a body attached.",
};

const LILITH: SignSet = {
  Aries: 'What was exiled is the raw want — wrath, appetite, the unapologetic first move. It returneth as clean fire when at last invited to the table.',
  Taurus: 'The refused thing is pleasure without permission. The body keepeth its own counsel here; owned, it becometh unshakeable ground.',
  Gemini: 'The banished voice is the unsayable said plainly. It returneth as wit with teeth — the truth-telling this chart was warned of.',
  Cancer: 'What was exiled is the need itself — hunger for care called too much. Reclaimed, it feedeth without apology and mothereth without martyrdom.',
  Leo: 'The refused thing is the full spotlight. The shine that was called vanity returneth as sovereignty when it ceaseth to ask.',
  Virgo: 'The banishment was of imperfection: disorder, appetite, the unpolished self. Its return maketh the standards humane.',
  Libra: 'What was exiled is the unaccommodating no. It cometh back as fairness with a spine — beauty that doth not barter.',
  Scorpio: 'The refused thing is power at full depth: desire, rage, the uncensored current. Owned, it ceaseth to leak and beginneth to steer.',
  Sagittarius: 'The banished voice is the heresy — the belief that fitted not the church. It returneth as a philosophy bearing thy fingerprints.',
  Capricorn: 'What was exiled is ambition in its naked form. Reclaimed from shame, it buildeth without asking whose permission.',
  Aquarius: 'The refused thing is the true strangeness — the difference beyond the acceptable eccentric. Owned, it ceaseth performing and beginneth to lead.',
  Pisces: 'What was exiled is the boundless self — called dreamy, called too much, called away. It returneth as vision the daylight may use.',
};

export const bard: ContentSet = {
  planetArchetypes: {
    sun: 'the waking will — the part thou art becoming when most thyself',
    moon: 'the needs beneath the boards — instinct, memory, what safety feeleth like',
    mercury: "the nimble messenger — how thou tak'st in, joinest, and speak'st",
    venus: "what thou find'st fair, and how thou draw'st it near",
    mars: 'the spur — how thou wantest, pursuest, and defendest',
    jupiter: 'the appetite for more — increase, meaning, the fortune thou makest room for',
    saturn: "the theatre's very beams — limits, time, what thou must build to keep",
    uranus: 'the lightning — where thou refusest the script',
    neptune: 'the solvent — fancy, longing, the blur betwixt self and sea',
    pluto: 'the trapdoor beneath the stage — power, loss, and what regroweth after',
    trueNode: 'the direction of pull — an appetite the soul hath not yet satisfied',
    meanNode: 'the direction of pull — an appetite the soul hath not yet satisfied',
    chiron: 'the tender place — the wound that teacheth thee to heal others',
    meanLilith: 'the refused — what was banished from court and returneth untamed',
  },
  signLenses: {
    Aries: {
      light: 'courage that strideth on first and learneth its lines upon the way',
      truth: 'cardinal fire: ignition, the instinct to begin the play',
      shadow: 'impatience that mistaketh haste for progress and self for centre-stage',
    },
    Taurus: {
      light: "steadfastness, the senses' feast, the art of making things endure",
      truth: 'fixed earth: holding, ripening, the worth of what the hand may touch',
      shadow: 'sloth attired as loyalty; comfort kept past its proper act',
    },
    Gemini: {
      light: "quickness, curiosity, the gift of translating 'twixt worlds",
      truth: 'mutable air: circulation, the pollination of ideas from ear to ear',
      shadow: 'scatter; a wit that skimmeth where it feareth to dive',
    },
    Cancer: {
      light: 'fierce shelter — the memory of the tribe kept warm by the hearth',
      truth: 'cardinal water: the tide that feedeth and defendeth',
      shadow: 'moods that harden into castle walls; care that turneth to command',
    },
    Leo: {
      light: 'warmth that maketh others feel more alive, not lesser players',
      truth: 'fixed fire: the hearth, the heart performed upon the boards',
      shadow: 'the hunger for applause devouring the joy of the act itself',
    },
    Virgo: {
      light: 'precision in service of what truly aideth',
      truth: 'mutable earth: harvest, discernment, the craft of mending',
      shadow: "the critic's note delivered ere compassion; perfect the enemy of done",
    },
    Libra: {
      light: 'grace, fair dealing, the art of making partnership a thing of beauty',
      truth: 'cardinal air: the scales, the opening move of balance',
      shadow: 'peace purchased with thine own unspoken preference',
    },
    Scorpio: {
      light: 'depth that flincheth not; loyalty unto the underworld itself',
      truth: 'fixed water: pressure, intimacy, the transmuting of what is held',
      shadow: 'control, secrecy, the sting kept sheathed for thine own breast',
    },
    Sagittarius: {
      light: 'faith in the horizon — meaning found by the going',
      truth: 'mutable fire: the arrow loosed, the widening circle',
      shadow: 'the sermon that outrunneth the pilgrimage; truth employed as escape',
    },
    Capricorn: {
      light: 'the long ascent made with dry wit and clean hands',
      truth: 'cardinal earth: structure, ambition, time itself the raw material',
      shadow: 'worth reckoned only in what is wrought; the summit that ever recedeth',
    },
    Aquarius: {
      light: "clear-eyed distance in service of all men's morrow",
      truth: 'fixed air: the pattern seen from the gallery, the circuit of the company',
      shadow: 'principled coldness; loving mankind whilst dodging men',
    },
    Pisces: {
      light: 'porous compassion; the fancy that dissolveth every border',
      truth: 'mutable water: the return of all rivers, the door left unbarred',
      shadow: 'escape, martyrdom, the fog that shunneth the needful edge',
    },
  },
  houseDomains: [
    'the mask and the entrance — body, presence, how the play first meeteth thee',
    'what thou keepest — coin, worth, the ground beneath thy feet',
    "the parish of the mind — siblings, errands, the day's common speech",
    'the taproot — home, lineage, the tiring-house of the self',
    'the playhouse of delight — creation, romance, children, the courage to make merry',
    'the workshop — craft, daily rounds, health, the dignity of upkeep',
    'the mirror — partners, rivals, every soul that is not thee',
    "the shared deeps — others' coin, debts, the marriage-bed, grief, trust",
    'the far horizon — belief, study, voyages, the greater map',
    'the summit — vocation, reputation, what thou answerest for before the crowd',
    'the commons — friends, allies, movements, futures yet imagined',
    'the retiring room — solitude, endings, the hidden labour before rebirth',
  ],
  aspectLenses: {
    conjunction: {
      light: 'fusion — two players speaking as one swelled voice',
      truth: 'no distance lieth between: these parts of thee cannot behold each other, only act as one',
      shadow: 'a blending so entire that neither part may be examined nor bid exit',
    },
    sextile: {
      light: 'a door left ajar — cooperation ready whensoever thou reach for it',
      truth: 'friendly elements proffering opportunity, not promises',
      shadow: 'the gift left unwrapped, for it never forceth the scene',
    },
    square: {
      light: 'friction that forgeth engines — the aspect of strength hard-won',
      truth: 'two purposes at cross, demanding a building and not a victor',
      shadow: 'the same quarrel replayed nightly until the lesson be at last taken',
    },
    trine: {
      light: 'native talent — a flow so easy it seemeth mere weather',
      truth: 'harmony of one element: support that asketh naught',
      shadow: 'ease grown slack; the talent never whetted, for it never had need',
    },
    opposition: {
      light: "perspective — the full moon's view of thine own two poles",
      truth: 'a see-saw: two ends of one beam treating for balance',
      shadow: "projection — meeting thine own disowned half upon another's face",
    },
    semisextile: {
      light: 'a slight adjacency that may be stitched with attention',
      truth: 'neighbouring signs with naught in common but the fence',
      shadow: 'small friction dismissed until the seam frayeth',
    },
    semisquare: {
      light: 'an itch that keepeth thee honest',
      truth: 'a lesser square: vexation without full stakes',
      shadow: 'a chronic small grievance mistaken for thy character',
    },
    sesquiquadrate: {
      light: 'corrective torque — the course amended in mid-flight',
      truth: "friction of the square's kin, arriving at odd angles",
      shadow: 'an agitation whose spring is hard to name, and so is laid at the wrong door',
    },
    quincunx: {
      light: 'the art of living with what will not resolve',
      truth: 'two functions sharing no common tongue, forever neighbours',
      shadow: 'perpetual adjustment that never asketh whether the terms should be renegotiated',
    },
    quintile: {
      light: 'a signature flourish — the gift of pattern-making',
      truth: 'fifth-harmonic invention: style, craft, play',
      shadow: 'cleverness performed for its own looking-glass',
    },
    biquintile: {
      light: 'an elegant back-stair between far-sundered talents',
      truth: 'fifth-harmonic linkage across a wide arc of the stage',
      shadow: 'gifts kept as private conjuring tricks rather than shared craft',
    },
  },
  dignityNotes: {
    domicile: 'at home — here this player speaketh in his mother tongue',
    exaltation: "an honoured guest — welcomed, amplified, and now and then o'er-praised",
    detriment: "a performance in a rival's house — more labour, and oft more growth for it",
    fall: 'a muted register — the part is played, quietly and under-esteemed',
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
