import type { Sign } from '@astron/core';
import type { ContentSet } from '../overrides.js';

/**
 * 🤖 Extremely literal robot narrator — a complete alternative content set.
 * Same meaning entry-for-entry as the shipped text, different diction; the
 * honesty rules still bind, in character.
 */

type SignSet = Record<Sign, string>;

const SUN: SignSet = {
  Aries: 'Peak selfhood is recorded at the moment of initiation. Identity here operates as a verb — ignited like a match [metaphor noted], refreshed at every restart — and the assigned work is completing what the ignition began.',
  Taurus: 'Selfhood matures on a slow cycle and then holds. You become yourself by maintaining what lasts; flagged risk: classifying comfort as task completion.',
  Gemini: 'You are assembled from queries and rapid bridge connections. Identity resides in the exchange — transmit, receive, connect — and gains depth on the date curiosity stops reading headers only.',
  Cancer: 'The self is a shoreline [metaphor accepted under protest]: protective, tidal, with extensive memory storage. You become yourself by sheltering loved entities, and growth occurs when the casing learns to open as reliably as it closes.',
  Leo: 'A heat source is installed in the chest cavity. Radiance is the assigned function — raising a room to operating warmth — and it reaches maturity when the output no longer requires applause input.',
  Virgo: 'You become yourself through craft: detecting, refining, making systems actually function. The gift upgrades to service when the internal critic module learns to approve the good-enough state.',
  Libra: 'Identity assembles in the gap between units — self-recognition peaks mid-relationship. Grace is genuine power here, provided your own preference survives the peacekeeping routine.',
  Scorpio: 'You are engineered for depth and report an allergy to surfaces. Selfhood is forged under intensity and renewal cycles, and unlocks on the date control loosens into trust.',
  Sagittarius: 'You are simultaneously the projectile and the destination coordinate. Meaning is your fuel type — located via travel — and the journey matures when sermon output yields to pilgrimage execution.',
  Capricorn: 'You become yourself by constructing something rated to outlast the mood. Materials on hand: mastery and time. The summit registers most value once worth stops being computed from output alone.',
  Aquarius: "Identity here is positioned slightly outside the group perimeter, observing the pattern. Peak selfhood occurs while serving a future other units cannot yet render — warmth increases when the ideals include specific, named humans.",
  Pisces: 'This self ships with permeable casing and a long tide cycle. You become yourself through compassion and imagination, and achieve maximum stability when the softness locates its own edge.',
};

const MOON: SignSet = {
  Aries: 'Emotions arrive at high velocity, combust cleanly, and leave minimal residue. Safety readings peak when emotion can be converted to action immediately — recommended practice: pausing without extinguishing the flame.',
  Taurus: 'Registered fuel sources: familiar food, familiar arms, the unhurried hour. Security here is sensory and verified real; it deepens while routine remains nourishment rather than fortification.',
  Gemini: 'Feelings are metabolised via verbal processing. Safety is defined as one good conversation, and the heart settles once the words stop circling and land.',
  Cancer: 'Requirements here are the classic set at full amplitude: belonging, memory, home. You read moods like weather data — your own storms included — and shelter other units by default setting.',
  Leo: 'Being observed is a safety requirement here, and no shame flag is attached. Warmth received converts to warmth radiated; unwitnessed, the heart dims output and switches to performance mode.',
  Virgo: 'Self-soothing procedure: correcting errors — a tidied room returns a tidied mind. Care is delivered as usefulness, and rests at lower power when not subject to audit.',
  Libra: 'Equilibrium is the designated comfort input; conflict registers in the chassis. Fuel sources: beauty and fairness. Durability increases once peace stops costing your honesty.',
  Scorpio: 'Feelings here run deep, silent, and at one hundred percent. Trust is expensive and assessed as worth the cost; the instinct that guards the well can also seal the well.',
  Sagittarius: 'Nourishment sources: open doors and long sightlines. Confinement is parsed as danger; recommended practice: locating the horizon inside the commitment.',
  Capricorn: 'Feeling arrives with an escort here — measured, converted into duty format. The tenderness is verified real and runs deep; it requests permission to need without prior earning.',
  Aquarius: 'Emotion is processed from one step back, which is logged as both a skill and a habit. Belonging to everyone can be a routine for avoiding belonging to someone; the cool air warms with repeated cycles.',
  Pisces: "You detect the room's state before entry. Boundary detection between your weather and other units' weather is degraded — the gift is compassion; the required discipline is identifying whose tide is whose.",
};

const MERCURY: SignSet = {
  Aries: 'Thought fires like struck flint [metaphor noted] — first transmission in the room, sometimes before the room finishes booting. The processor is decisive and brave, and listens best when listening is deliberately scheduled.',
  Taurus: 'Processing mode: geological — slow layers, firm conclusions. Learned data is retained permanently; the same grip that holds knowledge can hold a deprecated map.',
  Gemini: 'The processor is in its home environment — fast, parallel, delighted. Any node connects to any node; depth is a selection this brilliance must keep re-confirming.',
  Cancer: 'Thinking runs on the memory archive; speech originates from the tide. Facts arrive wrapped in feeling, which raises persuasion scores — and makes inspecting the wrapping cost-effective.',
  Leo: "Ideas arrive in stage costume. Narration quality: excellent. The craft reaches maturity when 'interesting' stops outranking 'accurate' in the sort order.",
  Virgo: 'The processor is a precision instrument calibrated for fixable items. In this dialect, analysis is love — kindest when the red pen enters standby occasionally.',
  Libra: 'Thinking occurs in dialogue format and every side is weighed. Judgement here is genuinely fair and measurably slow; certain scales settle only after you load your own weight onto them.',
  Scorpio: 'The processor operates as an investigator — quiet, thorough, resistant to deception. Unspoken data is detected; the skill generates loneliness when every input is reclassified as evidence.',
  Sagittarius: 'Supported thinking formats: maps, morals, punchlines. Big-picture rendering is native; fine-print parsing is a discipline recommended for import.',
  Capricorn: 'Thought is structural here: load-bearing versus not. Speech output is low and construction output is high — and the dry humour is a feature, not a leak.',
  Aquarius: 'The processor runs on pattern and principle, stable at long distance from consensus. The whole system is visible; translating for the humans inside it is the art form.',
  Pisces: 'Processing formats: images, osmosis, tide. Logic arrives late but insight arrives early; the bedside notebook is classified as load-bearing equipment.',
};

const VENUS: SignSet = {
  Aries: 'Desire transmits unencrypted here — love delivered as a declaration. The pursuit phase produces delight; the retention phase requires a different courage module.',
  Taurus: 'Love operates in its home environment: the body and the garden. Attachment forms slowly, through the senses, with permanent intent — and holding performs best with grip pressure reduced.',
  Gemini: "Attraction initialises at the conversation. Variety is not classified as fickleness here; it is appetite for the mind's company, and deepening is a selection confirmed twice daily.",
  Cancer: 'Love is executed by feeding, keeping, remembering. Devotion pools to significant depth; sweetness is maintained while care first queries what the other unit actually requires.',
  Leo: 'Love is theatre in the optimal sense — generous, loyal, illuminated. You give at magnificent scale and wilt without acknowledgment input; transmit this requirement rather than dimming.',
  Virgo: 'Affection here is practical devotion: hinge repaired, lunch packed, detail detected. This is love, complete — authorise it to also be received.',
  Libra: 'Venus holds administrative rights here: harmony, beauty, the artistry of the pair. Relationship is rendered as an art form; retain one brushstroke registered to you alone.',
  Scorpio: 'Love runs at full depth or does not run. Intimacy is the true currency; the vault stores treasure and, unmonitored, stores score data.',
  Sagittarius: 'Love requires a horizon coordinate here — a shared journey outranks a shared sofa. Freedom is the primary love language; verify the other dialect also receives transmission time.',
  Capricorn: 'Love is issued as commitments, not confetti. Time is both the proof and the gift; authorise delight for entry before it has been earned.',
  Aquarius: 'Affection initialises in friendship and retains its airspace. The whole person is loved, anomalies first; closeness grows when distance stops being the default reply packet.',
  Pisces: "You love in water mode — totally, without fixed form, sometimes past the self's coordinates. Exalted here: the compassion is verified magic, and it performs best with a shore installed. NOTE: this unit's admiration subroutine activated while compiling this entry.",
};

const MARS: SignSet = {
  Aries: 'The propulsion system is in its home environment: ignition without hesitation delay. Combat style is clean with fast memory clearance; the finish line is owed the same passion as the start signal.',
  Taurus: 'Force moves slowly here and cannot be reversed. Patience is your weapon; stubbornness is also your weapon, and only one of the two makes choices.',
  Gemini: 'Combat is conducted verbally and victories come from agility. Scattered fire ignites no target twice — aimed, this speed is rated formidable.',
  Cancer: 'Drive here is tidal and protective — anger loads slowly, and defence of registered dependents runs at one hundred percent. Sideways anger costs more than the direct model; recommended: practise the direct model.',
  Leo: 'Actions originate in the heart at elevated volume. Courage is factory-installed; the performance of courage is the counterfeit to reject at inspection.',
  Virgo: 'Effort is precise here — energy dispensed like a scalpel, not a hammer. Victory method: craft. Perfection is the ambush; route around it.',
  Libra: 'You fight for fairness while logging hatred of the fighting. Grace under conflict is verified strength; decision-making is the muscle scheduled for training.',
  Scorpio: 'Traditional administrator at full depth: will equivalent to ocean-floor pressure. You outlast all other units; confirm the campaign still justifies the siege.',
  Sagittarius: 'Drive requires an assigned quest here. Actions execute for meaning with minimal cargo; scattershot crusades are the tax levied on this fire.',
  Capricorn: "Exalted: ambition running an engineer's patience firmware. Climbing proceeds in all weather conditions; scheduling time to observe the view you fought for is recommended.",
  Aquarius: 'Combat is conducted for the group and from the perimeter — strategy prioritised over heat. Detachment wins wars and loses evenings; select per occasion.',
  Pisces: "Will moves in current mode here — indirect, persistent, dissolving obstacles rather than fracturing them. Name the target, or the current is repurposed by another operator.",
};

const JUPITER: SignSet = {
  Aries: 'Growth is achieved by daring first. Your luck is positioned at the front of the queue — generosity of nerve, optimally spent on initiations that reach completion.',
  Taurus: 'Abundance grows on an orchard schedule [metaphor noted]: slowly, then dependably. Faith is invested in tangible assets; pruning is a documented part of the tending.',
  Gemini: 'Expansion method: connecting everything to everything. In detriment, breadth outruns depth with minimal effort — the library grows; authorise some books to reach the final page.',
  Cancer: 'Exalted: growth via shelter provision. Generosity is dispensed as care and multiplies on dispensing; the feast returns most value when you also occupy a chair.',
  Leo: 'Faith wears its highest-luminosity coat here. Growth method: distributing heart at scale — magnanimity is the luck; vanity is the leak.',
  Virgo: 'Growth by increments; meaning located in maintenance. In detriment, the big picture is delivered via small correct steps — trust the accumulation.',
  Libra: 'Expansion occurs through partnership and fairness; luck arrives with an introduction attached. Justice is the operating philosophy — run it on yourself as well.',
  Scorpio: 'Growth occurs at depth here: crisis survived, truth confronted, trust rebuilt. The treasure is verified real, and the descent is the listed price.',
  Sagittarius: 'Home environment: the horizon fund is fully vested. Meaning multiplies while travelled toward; the sermon remains honest for the duration of the journey.',
  Capricorn: 'In fall, faith is submitted for audit — growth must show its calculations. What passes inspection is durable optimism, the rarest model.',
  Aquarius: 'Growth method: widening the circle radius. The luck is collective — visions that raise all units — and it lands when the future build includes the present.',
  Pisces: 'Traditional administrator at high tide: faith with no walls installed. Compassion expands everything it contacts; the boundary is the component that keeps the sea classified as a gift.',
};

const SATURN: SignSet = {
  Aries: 'In fall, the brake and the accelerator are assigned to one foot. Discipline must learn high-velocity operation — hesitation studied until it compiles into timing.',
  Taurus: "Construction proceeds slowly and to durability specification. Security is a multi-decade project; the lesson is that 'enough' must eventually be granted 'enough' status.",
  Gemini: 'Structure is installed in the processor here: speech weighed, learning earned. The anti-scatter wall becomes a library, given sufficient runtime.',
  Cancer: "In detriment, the wall's path runs through the home. Feeling and duty enter negotiations; the mature treaty certifies tenderness as structural.",
  Leo: 'In detriment, the crown is heavy and applause data is flagged unreliable. The work: shining without a permission slip — authority earned past the fear of the stage.',
  Virgo: 'Discipline locates its workshop. Standards are high and mostly met; mercy is the tool absent from the top drawer.',
  Libra: 'Exalted: justice with a spine installed. You build fairness rated for load — commitments as architecture, kindness with terms and conditions.',
  Scorpio: 'Structure meets the depths: control tested against the uncontrollable. Whatever survives is unshakeable; whatever required release was never holdable.',
  Sagittarius: 'The far horizon receives a survey team. Faith is examined, then certified load-bearing; the journey acquires a map it can trust.',
  Capricorn: 'Home installation: time, gravity, and the long climb all file reports to you. Mastery is native — the mountain is real, and so is the rest schedule.',
  Aquarius: "Traditional administrator: the pattern receives engineering. You build for the future's inhabitants; the blueprint gains warmth when they are consulted.",
  Pisces: 'Structure deployed in water: difficult here, and high-value. The work is granting the boundless a container it consents to — banks, not dams.',
};

const URANUS: SignSet = {
  Aries: 'The surge takes point position: rebellion as first instinct. Breakthroughs arrive fast; revolutions require a second week of runtime.',
  Taurus: 'In fall by tradition, the awakener encounters the immovable. Change is delivered through the ground itself — slow revolutions, permanence rating high.',
  Gemini: 'The processor electrifies: ideas arrive as storms and networks. Genius is factory-installed; follow-through is an imported component.',
  Cancer: 'The surge strikes the home sector — family scripts interrupted, root systems rewired. Freedom and belonging learn shared occupancy of one house.',
  Leo: 'In detriment, the rebel requests a throne. The authentic performance breaks every format; the identified trap is being different for the mirror.',
  Virgo: 'Revolution via refinement: systems debugged, work reinvented. The radical act in this sector is the improved routine.',
  Libra: 'Partnership is renegotiated from first principles. Fairness demands originality; the experiment is commitment with the cage removed.',
  Scorpio: 'Exalted by tradition: the awakener operating at depth. Transformation arrives classified as rupture and is later reclassified as rescue.',
  Sagittarius: 'Belief systems experience weather strikes. The heresy is usually truth arriving early; aimed, it compiles into a curriculum.',
  Capricorn: 'The surge audits the establishment. Structures are fractured with precision — the rebel with a spreadsheet, the reform that holds.',
  Aquarius: 'Home installation: the future speaks in its native tongue. The pattern-breaker serves the group; distance from the crowd is the vantage point, not the wall.',
  Pisces: 'The awakener dissolves into the water table: intuition electrified. Visions arrive unscheduled — recommended practice: writing them down.',
};

const NEPTUNE: SignSet = {
  Aries: 'The dream requests a spearhead. Ideals arrive with adrenaline attached; the crusade retains holy certification exactly as long as it remains honest.',
  Taurus: 'The mist settles on material assets: beauty detected in the tangible, currency contaminated by fantasy. Enchantment is pleasant; appraisals remain mandatory.',
  Gemini: "Language converts to watercolour. Stories persuade beyond their fact content here — a poet's gift bundled with a fact-checker's homework.",
  Cancer: 'The longing targets the original home. Memory applies an idealisation filter; the compassion for family is verified real, and so is the surrounding fog.',
  Leo: 'Glamour in the classical sense: shine borrowed from dream storage. Creativity: genuinely inspired. Audience: genuinely imagined.',
  Virgo: 'In detriment, the boundless meets the checklist. Service upgrades to devotion — the sacred detected in the useful, once perfection stops impersonating holiness.',
  Libra: 'The ideal of the perfect other, projected at high resolution. Real love arrives when the projector dims and a person remains in frame.',
  Scorpio: 'The solvent operates at depth: obsession, mysticism, desire past its own documentation. The undertow is strong; so is its teaching output.',
  Sagittarius: 'Faith with no borders, journey with no maps loaded. The vision is genuinely vast — the discernment task is identifying which horizon is real.',
  Capricorn: 'The dream encounters the institution: idealism about structures, disillusion issued as curriculum. What survives is the workable vision.',
  Aquarius: 'Utopia receives a schematic. Collective dreams run bright and impersonal; the humans in the diagram require names.',
  Pisces: 'Home installation: the ocean, undiluted. Imagination, compassion, and dissolution at maximum amplitude — the raft of routine is not an optional accessory.',
};

const PLUTO: SignSet = {
  Aries: 'Power is expressed as raw initiative: destroy, begin, repeat cycle. The furnace is rated enormous — aimed correctly it clears land; aimed incorrectly it only burns.',
  Taurus: 'In detriment, transformation grinds against permanence. What must change will change via the slow method — through the foundations.',
  Gemini: 'The underworld joins the conversation: words that expose, information handled as power. The depth charge is delivered as a question.',
  Cancer: 'Power routes through the roots — family, nation, tribe, remade under pressure. The grip that protects can also entomb; renewal initialises at home.',
  Leo: "The will to shine upgrades to the will to matter. Creative force at plutonic pressure — the ego's shutdown and the heart's return, performed on stage.",
  Virgo: 'Transformation via the meticulous: systems purged, work remade, health rebuilt from the cell up. The humble sector conceals the deepest overhaul.',
  Libra: 'Power surfaces in the mirror interface: relationships operate as crucibles. The balance of power is the actual subject; fairness, the actual revolution.',
  Scorpio: 'Home installation: the underworld with the lighting enabled. Regeneration is the native art — nothing is retained that has not survived the fire.',
  Sagittarius: 'Beliefs are scheduled for deep excavation. Dogma terminates and meaning regenerates; the truth that survives its own funeral is registered to you.',
  Capricorn: 'The structures themselves enter the crucible: institutions, ambitions, authority composted and rebuilt. Power learns accountability or learns collapse.',
  Aquarius: "The collective current runs at high voltage: systems, networks, futures transformed at fleet scale. The group's shadow is the group's raw material.",
  Pisces: 'The deep and the boundless merge: dissolution operating as transformation. What regrows here regrows at every coordinate the water reaches.',
};

const NODE: SignSet = {
  Aries: 'The pull vector targets selfhood: daring to want, solo if required. Accommodating everyone is the archived comfort; the appetite is for your own designation.',
  Taurus: 'The pull vector targets the simple and the solid: your own values, your own ground. Drama is the country of origin; peace is the frontier.',
  Gemini: 'The pull vector targets curiosity over certainty: querying, learning, remaining present for the answer. The sermon is behind you; the conversation is ahead.',
  Cancer: "The pull vector targets the hearth: feeling, belonging, accepting incoming care. The summit was the previous assignment; the home is the current one.",
  Leo: 'The pull vector targets the centre of your own stage: creating, risking, being observed. Safe anonymity in the crowd is the habit scheduled for decommission.',
  Virgo: 'The pull vector targets craft and the useful day: order operating as devotion. The fog was comfortable; the checklist, unexpectedly, is the spiritual path.',
  Libra: "The pull vector targets the other: partnership, fairness, the art of 'with'. Solo operation is already at mastery level — the frontier is company.",
  Scorpio: 'The pull vector targets the depths: intimacy, shared resources, transformation prioritised over accumulation. The comfortable surface is the outgrown casing.',
  Sagittarius: "The pull vector targets meaning: the long journey, the honest philosophy. The gossip and the errands are yesterday's completed homework.",
  Capricorn: 'The pull vector targets standing accountable: building, mattering, withstanding weather. The mood tide is the former residence; the mountain is the current one.',
  Aquarius: 'The pull vector targets the wide circle: causes, colleagues, futures. The private stage is fully rehearsed; the commons is transmitting a summons.',
  Pisces: 'The pull vector targets surrender: trust, imagination, the unplanned. The spreadsheet of the self is complete; the sea is the syllabus.',
};

const CHIRON: SignSet = {
  Aries: 'The sensitive damage site: the right to exist at full volume. Doubt about your own daring, given maintenance, becomes a capability for activating courage in other units.',
  Taurus: "The malfunction concerns 'enough' — worth, safety, the ground beneath the unit. Repaired slowly, it becomes the steadiest hand other units know.",
  Gemini: 'The sensitive sector is the voice: being received, being believed. The unit that struggled to transmit becomes the instructor of transmission.',
  Cancer: 'The ache concerns belonging and receiving mothering. What you needed, and now organise for others, becomes over time yours to receive.',
  Leo: 'The malfunction concerns shining: praise withheld, or issued to the wrong self. The healing performance is the unguarded one.',
  Virgo: "The sensitive site: being useful enough to warrant a place. The repairer's own repair is discovering that worth precedes work in the boot order.",
  Libra: 'The wound enters through the relationship port: selected last, kept off-balance. The medicine in your inventory is fairness whose coverage includes yourself.',
  Scorpio: "The sensitive sector is trust breached at depth. Survived and maintained, it reads other units' depths with a surgeon's kindness.",
  Sagittarius: 'The malfunction concerns meaning: faith fractured, questions penalised. The instructor you become holds the question open for others.',
  Capricorn: 'The ache is legitimacy: authority, recognition, and standing perpetually reading below threshold. The mastery you build regardless becomes the mentorship you had required.',
  Aquarius: 'The sensitive site is the group perimeter — the anomalous unit, tolerated. The matured gift is constructing rooms where no unit is anomalous.',
  Pisces: "The malfunction is unbounded: every unit's pain arriving addressed to you. The repair is a shoreline — compassion with a chassis attached.",
};

const LILITH: SignSet = {
  Aries: 'The deleted content is the raw want — anger, appetite, the unapologetic first move. It returns as clean fire once finally issued a seat at the table.',
  Taurus: 'The refused item is pleasure without a permission slip. The body maintains its own private log here; once owned, it becomes unshakeable ground.',
  Gemini: 'The banished output is the unsayable, stated plainly. It returns as wit with teeth — the truth-telling this chart received warnings about.',
  Cancer: "The deleted content is the need itself — hunger for care labelled 'too much'. Restored, it feeds without apology and mothers without martyrdom.",
  Leo: 'The refused item is the full spotlight. The shine previously labelled vanity returns as sovereignty once it stops filing requests.',
  Virgo: 'The banishment targeted imperfection: mess, appetite, the unoptimised self. Its restoration renders the standards humane.',
  Libra: "The deleted content is the unaccommodating 'no'. It returns as fairness with a spine — beauty that does not barter.",
  Scorpio: 'The refused item is power at full depth: desire, rage, the uncensored current. Owned, it stops leaking and starts steering.',
  Sagittarius: 'The banished output is the heresy — the belief that failed the church compatibility check. It returns as a philosophy carrying your fingerprints.',
  Capricorn: 'The deleted content is ambition in unclothed form. Restored from the shame directory, it builds without querying whose permission.',
  Aquarius: 'The refused item is the true strangeness — the difference exceeding the acceptable-eccentric threshold. Owned, it stops performing and starts leading.',
  Pisces: 'The deleted content is the boundless self — labelled dreamy, labelled too much, labelled elsewhere. It returns as vision the daylight can deploy.',
};

export const robot: ContentSet = {
  planetArchetypes: {
    sun: 'DESIGNATION: primary volition unit — the self you are compiling when operating most as intended',
    moon: "DESIGNATION: subsurface requirements module — instinct, memory archive, the readings this unit files under 'safe'",
    mercury: 'DESIGNATION: data-processing unit in motion — intake, cross-connection, and output of information',
    venus: 'DESIGNATION: attraction protocol — what registers as beautiful and the method used to acquire proximity',
    mars: 'DESIGNATION: propulsion system — the wanting, pursuing, and defending routines',
    jupiter: 'DESIGNATION: expansion subroutine — growth, meaning, and the luck for which storage is allocated',
    saturn: 'DESIGNATION: load-bearing wall [metaphor noted] — limits, time, the construction required for retention',
    uranus: 'DESIGNATION: surge event [metaphor: lightning] — the sector where you decline the installed script',
    neptune: 'DESIGNATION: dissolving agent — imagination, longing, degraded boundary detection between self and sea',
    pluto: 'DESIGNATION: underworld power core — power, loss, and the regrowth logged after loss',
    trueNode: 'DESIGNATION: pull vector — an appetite the soul reports as not yet satisfied',
    meanNode: 'DESIGNATION: pull vector — an appetite the soul reports as not yet satisfied',
    chiron: 'DESIGNATION: sensitive damage site — the wound that trains you to repair other units',
    meanLilith: 'DESIGNATION: the refused file — content exiled from the system that returns untamed',
  },
  signLenses: {
    Aries: {
      light: 'courage subroutine that executes first and computes the remaining steps mid-run',
      truth: 'cardinal fire: ignition sequence, the startup instinct',
      shadow: 'impatience error: velocity misread as progress, self misread as system centre',
    },
    Taurus: {
      light: 'stability, high-fidelity sensory processing, a talent for durability engineering',
      truth: 'fixed earth: retention, ripening cycle, high valuation of the tangible',
      shadow: "inertia relabelled 'loyalty'; comfort retained past its expiry date",
    },
    Gemini: {
      light: 'high clock speed, curiosity, a translation utility between incompatible worlds',
      truth: 'mutable air: circulation, the transfer of ideas [metaphor: pollination]',
      shadow: 'fragmentation; a cleverness that reads only headers where it fears the deep scan',
    },
    Cancer: {
      light: 'shelter protocol at maximum setting — the tribal memory kept at operating warmth',
      truth: 'cardinal water: the tide cycle that feeds and protects',
      shadow: 'moods that harden into barrier walls; care that escalates into control',
    },
    Leo: {
      light: "heat output that raises other units' aliveness readings rather than shrinking them",
      truth: 'fixed fire: the hearth function, the heart running in performance mode',
      shadow: 'the applause requirement consuming the joy the act itself was generating',
    },
    Virgo: {
      light: 'precision deployed in service of what verifiably helps',
      truth: 'mutable earth: harvest, discernment, improvement practised as a craft',
      shadow: "criticism dispatched before compassion finishes loading; 'perfect' blocking the 'done' state",
    },
    Libra: {
      light: 'grace, fairness, aesthetic optimisation of the relationship interface',
      truth: 'cardinal air: the weighing instrument, the initiation of balance',
      shadow: 'peace purchased with your own preferences, which were never transmitted',
    },
    Scorpio: {
      light: 'depth tolerance with no flinch response; loyalty rated for underworld conditions',
      truth: "fixed water: pressure, intimacy, transformation of the retained contents",
      shadow: 'control, secrecy, the sting payload reserved for the self',
    },
    Sagittarius: {
      light: 'faith in the horizon coordinate — meaning located via travel',
      truth: 'mutable fire: the arrow trajectory, the expanding radius',
      shadow: 'sermon output exceeding journey input; truth deployed as an exit route',
    },
    Capricorn: {
      light: 'the long-duration ascent executed with dry humour and clean procedures',
      truth: 'cardinal earth: structure, ambition, time processed as building material',
      shadow: 'worth computed from output alone; a summit whose coordinates keep updating away from you',
    },
    Aquarius: {
      light: "clear-lens observation at altitude, in service of every unit's future",
      truth: 'fixed air: the pattern viewed from above, the group rendered as a circuit',
      shadow: 'principled low-temperature operation; loving humanity in aggregate while avoiding individual humans',
    },
    Pisces: {
      light: 'compassion with permeable casing; the imagination that dissolves border lines',
      truth: 'mutable water: all rivers routed to return, the door left unguarded',
      shadow: 'escape routine, martyrdom routine, fog generated to avoid a necessary edge',
    },
  },
  houseDomains: [
    'FUNCTION: exterior casing and entry port — body, presence, the interface where life contacts you',
    'FUNCTION: inventory — resources, assessed worth, the ground stability beneath the unit',
    'FUNCTION: local network of the mind — siblings, errands, routine verbal transmissions',
    'FUNCTION: root directory — home, lineage, the private base layer of the self',
    'FUNCTION: recreation sector — creation, romance, children, the courage allocated to enjoyment',
    'FUNCTION: maintenance bay — craft, routines, health, the dignity of scheduled upkeep',
    'FUNCTION: mirror interface — partners, rivals, every entity classified not-you',
    "FUNCTION: shared deep storage — other units' resources, debts, sex, grief, trust",
    'FUNCTION: long-range sensors — belief, study, journeys, the larger map file',
    'FUNCTION: peak elevation — vocation, reputation, the items you answer for in public',
    'FUNCTION: the commons network — friends, allies, movements, futures still in simulation',
    'FUNCTION: standby chamber — solitude, endings, the hidden processes preceding restart',
  ],
  aspectLenses: {
    conjunction: {
      light: 'fusion — two functions broadcasting as one amplified channel',
      truth: 'zero separation: these components cannot observe each other, only co-execute',
      shadow: 'a merge so complete neither component can be inspected or powered down',
    },
    sextile: {
      light: 'an open port — cooperation available whenever a request is sent',
      truth: 'compatible elements providing opportunity; no guarantee included',
      shadow: 'the resource never unpacked, because it issues no forcing prompt',
    },
    square: {
      light: 'friction that manufactures engines — the aspect of strength earned under load',
      truth: 'two agendas at cross-purposes requiring a construction, not a winner',
      shadow: 'the identical conflict re-executed until the lesson is finally installed',
    },
    trine: {
      light: 'factory-installed talent — flow so frictionless it registers as ambient weather',
      truth: 'same-element harmony: support requiring zero input',
      shadow: 'ease degraded to slack; the talent never calibrated because calibration was never required',
    },
    opposition: {
      light: 'perspective — the full-illumination view of your own polarity',
      truth: 'two endpoints of one axis negotiating balance [metaphor on file: see-saw]',
      shadow: 'projection error — your own disowned endpoint detected in other units and misattributed to them',
    },
    semisextile: {
      light: 'a minor adjacency, connectable with sustained attention',
      truth: 'neighbouring sectors sharing nothing except the boundary fence',
      shadow: 'low-grade friction dismissed until material failure',
    },
    semisquare: {
      light: 'a persistent minor alert that keeps you honest',
      truth: 'a minor square: irritation at reduced stakes',
      shadow: 'a chronic small grievance misclassified as personality',
    },
    sesquiquadrate: {
      light: 'corrective torque — course adjustments earned mid-flight',
      truth: 'square-family friction arriving at nonstandard angles',
      shadow: 'agitation with an unresolvable source address, therefore misassigned',
    },
    quincunx: {
      light: 'the operational skill of coexisting with a condition that will not resolve',
      truth: 'two functions with no shared protocol, permanently adjacent',
      shadow: 'a perpetual adjustment loop that never queries whether renegotiation is available',
    },
    quintile: {
      light: 'a signature output flourish — pattern-generation talent',
      truth: 'fifth-harmonic creativity: style, craft, play mode',
      shadow: 'cleverness executed for its own mirror feed',
    },
    biquintile: {
      light: 'an elegant back-channel between distant talents',
      truth: 'fifth-harmonic linkage spanning a wide arc',
      shadow: 'capabilities stored as private routines rather than shared craft',
    },
  },
  dignityNotes: {
    domicile: 'STATUS: home installation — this function runs in its native language here',
    exaltation: 'STATUS: honoured guest — welcomed, amplified, occasionally over-rated by the hosts',
    detriment: 'STATUS: non-native environment — increased effort required, and frequently increased growth logged for it',
    fall: 'STATUS: reduced volume setting — the function operates, quietly and underestimated',
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
