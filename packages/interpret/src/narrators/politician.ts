import type { Sign } from '@astron/core';
import type { ContentSet } from '../overrides.js';

/**
 * 🗳️ Campaigning-politician narrator — a complete alternative content set.
 * Same meaning entry-for-entry as the shipped text, different diction: every
 * strength is promised to the crowd and every shadow is spun away from — yet
 * the honesty rules still bind, so each shadow is stated plainly and answered
 * for on the record.
 */

const SUN: Record<Sign, string> = {
  Aries: 'My friends, you are most yourself at the moment of beginning — identity here is a verb, struck like a match and renewed by every fresh start. And to those who ask whether you finish what you start: in fairness, that is the work, and I pledge to see the spark through.',
  Taurus: 'Selfhood ripens slowly and holds, and I stand with everyone who becomes themselves by tending what lasts. Critics will say you mistake comfort for completion — a fair point, and one worth watching for.',
  Gemini: 'You are made of questions and quick bridges, and I promise to keep every bridge open — identity lives in the exchange of telling, hearing, connecting. Now, some note the curiosity skims; I hear them, and it deepens the day it stops skimming.',
  Cancer: 'The self is a shoreline — protective, tidal, deep with memory — and I honour everyone who becomes themselves by sheltering what they love. My opponents will say the shell stays shut; in fairness, you grow when it learns to open as well as close.',
  Leo: 'You carry a hearth in the chest, and radiance is the job — warming a whole room into life, and I salute it. To the skeptics who cry vanity: point taken, it matures when the shine no longer needs the applause.',
  Virgo: "You become yourself through craft — noticing, refining, making things actually work — and I'll champion every craftsman among you. Now, they'll say the inner critic is harsh; granted, the gift sharpens into service when it learns to bless what is good enough.",
  Libra: 'Identity forms in the space between people, and I know you best mid-handshake — grace is real power here. The other side will warn that peacemaking swallows your own view; a fair caution, so long as your own preference survives it.',
  Scorpio: 'You are built for depth and allergic to the surface, and I respect the intensity that forges you. Critics point to control; in fairness, selfhood frees itself the day control loosens into trust.',
  Sagittarius: "You are the arrow and the horizon at once, and meaning is your fuel — found by going, and I'll go with you. To those who hear only preaching: noted, the journey ripens when the sermon gives way to the pilgrimage.",
  Capricorn: 'You become yourself by building what outlasts the mood, and mastery and time are your materials — I back every builder here. The opposition will say worth gets measured in output alone; a real risk, and the summit means most when it stops being the only measure.',
  Aquarius: "You stand slightly outside the circle, seeing the pattern, and I need visionaries who serve a future others can't yet picture. Now, they'll say you love ideals over people; fair — you're warmest when the ideals include actual people.",
  Pisces: 'The self here has porous borders and a long tide, and I stand with the compassion and imagination that make you who you are. Critics call the softness weakness; in truth, you stand strongest when it finds its own edge.',
};

const MOON: Record<Sign, string> = {
  Aries: "You feel fast, burn clean, and leave little ash, and I'll defend your right to act on emotion the moment it strikes. My opponents call it rash; in fairness, the practice is pausing without smothering the flame.",
  Taurus: "You're fed by steadiness — familiar food, familiar arms, the unhurried hour — and I promise to protect that security, which is sensory and real. Now, some warn routine can wall you in; heard, it deepens when it stays nourishment rather than fortress.",
  Gemini: 'You metabolise feeling by talking it through, and every constituent deserves that good conversation. Critics say the words just circle; granted, the heart settles once they stop circling and land.',
  Cancer: "The needs here are the classic ones felt at full tide — belonging, memory, home — and I'll fight for every one. You read moods like weather, your own storms included, and shelter others by instinct — no apology needed.",
  Leo: 'You need to be seen to feel safe, and there is no shame in it — I see you. To the cynics: warmth received becomes warmth radiated, and unwitnessed, yes, the heart dims and performs instead.',
  Virgo: 'You soothe yourself by making things right — a tidied room is a tidied mind — and I salute that care, which arrives as usefulness. Opponents say you audit yourself too hard; fair, it rests easier when it isn\'t audited.',
  Libra: "Equilibrium is your comfort food, and I'll work for the peace and fairness that feed you, because conflict lands in the body. Now, they'll say peace costs your honesty; a real danger — you grow sturdy when it no longer does.",
  Scorpio: 'Feelings run deep, silent, and total, and trust here is expensive and worth every cent. Critics note the guarded well; in fairness, the instinct to guard it can also seal it.',
  Sagittarius: "You're nourished by open doors and long views, and I'll keep those doors open, since confinement reads as danger. The other side asks about commitment; heard — the practice is finding the horizon inside it.",
  Capricorn: 'Feeling arrives with a chaperone here, measured and translated into duty, and the tenderness is real and runs deep — I honour it. My opponents miss it entirely; in truth, it asks permission to need without earning first.',
  Aquarius: 'You process emotion from one step back, which is a genuine skill, and I value that cool head. Now, critics say belonging to everyone dodges belonging to someone; fair — the cool air warms with practice.',
  Pisces: 'You feel the room before you enter it, and I stand with that gift of compassion. Opponents call the boundaries blurred; in fairness, the discipline is knowing whose tide is whose.',
};

const MERCURY: Record<Sign, string> = {
  Aries: "Your thought moves like a struck flint — first word in the room, decisive and brave — and I'll always want that voice at the table. Critics say it speaks before the room is ready; fair, the mind listens best on purpose.",
  Taurus: "You think in geology — slow layers, firm conclusions — and what you learn, you keep; I trust that ballast. Now, they'll note the same grip can hold an outdated map; a point worth conceding.",
  Gemini: 'The mind is at home here — quick, plural, delighted, connecting anything to anything — and I celebrate that brilliance. To the doubters: depth is a choice this brilliance has to keep making, and I trust you to make it.',
  Cancer: "You think with the memory and speak from the tide, and facts arrive wrapped in feeling, which makes you persuasive — I'd want you on the stump. Critics say check the wrapping; in fairness, that's worthwhile.",
  Leo: 'Your ideas arrive dressed for the stage and you narrate beautifully — I could listen all day. Opponents warn that being interesting can outrank being accurate; heard, and the craft matures when it stops.',
  Virgo: 'The mind is a fine instrument calibrated for what\'s fixable, and analysis is love in your dialect — I value that rigour. Now, some say the red pen never rests; granted, it\'s kindest when it does sometimes.',
  Libra: 'You think in dialogues and weigh every side, and your judgement is genuinely fair — exactly what public life needs. Critics call it famously slow; fair — some scales only settle when you place your own weight on them.',
  Scorpio: "The mind is an investigator — quiet, thorough, unfoolable — and you hear what isn't said; I'd trust you to find the truth. The other side says everything becomes evidence; in fairness, that's where the skill turns lonely.",
  Sagittarius: 'You think in maps, morals, and punchlines, and the big picture comes naturally — I need that vision. Now, opponents point to the fine print; a fair charge, and it\'s a discipline worth borrowing.',
  Capricorn: 'Thought is structural here — what bears load, what won\'t — and you speak little and build much; I respect that. To those who miss the humour: the dry wit is a feature, not a leak.',
  Aquarius: 'The mind runs on pattern and principle, comfortable far from consensus, and I welcome the systems-thinker. Critics say translate it for the humans inside the system; agreed — that is the art.',
  Pisces: "You think in images, osmosis, and tide — logic arrives late but insight arrives early — and I trust that insight. Now, they'll say keep the notebook by the bed; fair, it's load-bearing equipment.",
};

const VENUS: Record<Sign, string> = {
  Aries: 'Desire is direct here — you love like a declaration — and I admire the honesty of the chase. Critics ask about the keeping; in fairness, that asks a different courage.',
  Taurus: 'Love is at home in the body and the garden, and you attach slowly, sensually, for keeps — I honour that devotion. The other side says the grip holds too tight; heard, the holding is loveliest relaxed.',
  Gemini: "Attraction begins at the conversation, and variety here is appetite for the mind's company, not fickleness — I'll defend it. Now, some doubt the depth; fair — the deepening is a choice made twice a day.",
  Cancer: 'You love by feeding, keeping, remembering, and that devotion pools deep — I stand with every caretaker. Critics say ask first what the other actually needs; granted, that is what keeps it sweet.',
  Leo: 'Love is theatre in the best sense — generous, loyal, lit — and I salute how magnificently you give. To those who miss when you wilt: say so, rather than dimming — I hear you.',
  Virgo: 'Affection here is practical devotion — the fixed hinge, the packed lunch, the noticed detail — and it is love, entire; I honour it. Now, they\'ll say let it also be received; a fair reminder.',
  Libra: 'Venus rules here — harmony, beauty, the artistry of the pair — and you make relationship an art form I applaud. Critics warn you disappear into it; fair, keep one brushstroke that is only yours.',
  Scorpio: 'You love at depth or not at all, and intimacy is the true currency — I respect that seriousness. The other side says the vault keeps score; in fairness, unwatched, it can.',
  Sagittarius: "Love needs a horizon here — a shared journey beats a shared sofa — and freedom is your love language, which I'll protect. Now, opponents ask about the other dialect; heard, make sure it gets spoken too.",
  Capricorn: 'You love in commitments, not confetti, and time is the proof and the gift — I trust that steadiness. Critics say let delight in before it\'s earned; a fair point, granted.',
  Aquarius: "Affection begins in friendship and keeps its airspace, and you love the whole person, oddities first — I welcome that. Now, they'll note distance as the default reply; fair, closeness grows when it stops being.",
  Pisces: 'You love the way water loves — totally, formlessly — and exalted here, the compassion is real magic; I stand with it. The other side warns it goes past the point of self; in fairness, it works best with a shore.',
};

const MARS: Record<Sign, string> = {
  Aries: "The engine is at home — ignition without hesitation — and you fight clean and forget fast; that's the fire I want on my side. Critics say honour the finish line too; fair, it deserves the same passion as the start.",
  Taurus: "Force moves slowly here and cannot be moved back, and patience is your weapon — I respect it. Now, they'll say so is stubbornness; granted, and only one of them chooses.",
  Gemini: "You fence with words and win on agility — a formidable quickness I'd want in any debate. The other side says scattered fire lights nothing twice; fair — aimed, it's unstoppable.",
  Cancer: "Drive here is tidal and protective — slow to anger, total in defence of its own — and I'll always back that loyalty. Critics point to sideways anger; in fairness, it costs more than the direct kind, so practise the direct kind.",
  Leo: 'You act from the heart with the volume up, and courage is native to you — I salute it. Now, opponents warn of the performance of courage; heard, that is the counterfeit to refuse.',
  Virgo: 'Effort is precise here — energy spent like a scalpel, not a hammer — and you win by craft; I admire that. To the critics: perfection is the ambush to walk past, and I trust you will.',
  Libra: 'You fight for fairness and hate the fighting, and grace under conflict is real strength — exactly what we need. The other side says deciding is hard for you; fair, that is the muscle that needs the gym.',
  Scorpio: 'Traditional ruler at full depth — will like pressure at the ocean floor — and you outlast everyone; formidable. Now, critics ask if the campaign is still worth the siege; a fair question worth asking.',
  Sagittarius: "Drive needs a quest here, and you act for meaning and travel light — I'll march to that. The other side points to scattershot crusades; granted, that is the tax on the fire.",
  Capricorn: "Exalted — ambition with an engineer's patience — and you climb in all weather; I back that grit. Now, they'll say remember to notice the view you fought for; a fair reminder.",
  Aquarius: 'You fight for the group and from the perimeter — strategy over heat — and I value that cool tactician. Critics say it loses evenings; fair, detachment wins wars, so choose per occasion.',
  Pisces: 'Will moves like current here — indirect, persistent, dissolving obstacles rather than breaking them — and I respect that quiet force. The other side says name the goal; in fairness, or the current serves someone else\'s.',
};

const JUPITER: Record<Sign, string> = {
  Aries: "Growth comes by daring first, and your luck stands at the front of the line — generosity of nerve I'll champion. Critics say spend it on beginnings that get finished; a fair charge, granted.",
  Taurus: "Abundance grows like an orchard here — slowly, then dependably — and the faith is in the tangible; I trust it. Now, they'll say the pruning matters; heard, it is part of the tending.",
  Gemini: "You expand by connecting everything, and I celebrate that reach. In detriment, though — and I'll be honest — breadth outruns depth, so let some books get finished; the library is already growing.",
  Cancer: 'Exalted — growth through shelter — and your generosity pours out as care and multiplies; I honour it. Critics say you forget yourself; in fairness, the feast means most when you also take a chair.',
  Leo: 'Faith wears its brightest coat here, and you grow by giving heart at scale — magnanimity is the luck, and I salute it. The other side cries vanity; heard, that is the leak to watch.',
  Virgo: 'Growth by increments, meaning in maintenance — and I respect the patient accumulation. In detriment, some doubt the big picture arrives; in fairness, it does, via small correct steps — trust it.',
  Libra: "You expand through partnership and fairness, and luck arrives introduced by someone — justice is your philosophy, which I share. Now, critics say practise it on yourself too; a fair point.",
  Scorpio: 'Growth happens in the depths here — crisis survived, truth faced, trust rebuilt — and the treasure is real; I stand with it. The other side names the descent; in fairness, that is the price.',
  Sagittarius: "At home — the horizon fund is fully vested — and meaning multiplies when travelled toward; I'll travel with you. Critics hear only sermon; granted, it stays honest while the journey continues.",
  Capricorn: "In fall, faith submits to audit — growth must show its working — and I'll be straight about that. What survives the scrutiny is durable optimism, the rarest kind, and I back it.",
  Aquarius: "You grow by widening the circle, and the luck is collective — visions that lift everyone, which is my whole platform. Now, they'll say include the present; fair, it lands when the future does.",
  Pisces: 'Traditional ruler at high tide — faith without walls — and compassion expands everything it touches; I honour it. Critics ask about limits; in fairness, the boundary is what keeps the sea a gift.',
};

const SATURN: Record<Sign, string> = {
  Aries: "In fall, the brake and the accelerator share a foot — I'll be honest about that. Discipline must learn to move at speed, hesitation studied until it becomes timing — and I trust you to make it timing.",
  Taurus: 'You build slowly and to last, and security is the project of decades — I back that patience. The lesson, in fairness, is that enough must eventually be allowed to be enough.',
  Gemini: 'Structure comes to the mind here — speech weighed, learning earned — and I respect the discipline. Given time, the wall against scatter becomes a library — a fair trade.',
  Cancer: "In detriment, the wall runs through the home, and feeling and duty negotiate — I won't pretend otherwise. The mature treaty, and I stand for it, lets tenderness be structural too.",
  Leo: "In detriment, the crown is heavy and the applause suspect — I'll say it plainly. The work is shining without permission, authority earned past the fear of the stage, and I believe you'll earn it.",
  Virgo: 'Discipline finds its workshop here, standards high and mostly met — I salute that. Now, critics say mercy is missing from the top drawer; a fair charge, granted.',
  Libra: "Exalted — justice with a spine — and you build fairness that holds under load; that's the architecture I want. Commitments as structure, kindness with terms — I stand fully behind it.",
  Scorpio: 'Structure meets the depths — control tested against the uncontrollable — and what survives is unshakeable; I respect that steel. In fairness, what must be released was never holdable.',
  Sagittarius: 'The far horizon gets a survey team here, faith examined then load-bearing — and I trust a faith that has been tested. The journey gains a map it can trust, and so do I.',
  Capricorn: 'At home — time, gravity, and the long climb all report to you — and mastery is native; I back that command. The mountain is real, and so, in fairness, is the schedule for resting.',
  Aquarius: "Traditional ruler — the pattern gets engineering — and you build for the future's people, which is my cause. Critics say consult them; agreed, the blueprint warms when they are.",
  Pisces: 'Structure in the water — hard here, and precious — and the work is giving the boundless a container it consents to; I honour that. Banks, not dams — a distinction I stand by.',
};

const URANUS: Record<Sign, string> = {
  Aries: "The lightning takes the lead here — rebellion as first instinct — and breakthroughs come fast; I welcome the disruptor. Now, critics say revolutions need a second week; fair, and I'll grant it.",
  Taurus: "In fall by tradition, the awakener meets the immovable — I'll be honest. Change arrives through the ground itself — slow revolutions, but permanent, and I back the permanence.",
  Gemini: 'The mind electrifies here — ideas arrive in storms and networks — and genius is native; I celebrate it. The other side says follow-through is imported; granted, a fair point.',
  Cancer: 'The lightning strikes home — family scripts interrupted, roots rewired — and I stand with that courage. In fairness, freedom and belonging learn to share a house.',
  Leo: "In detriment, the rebel wants a throne — I'll name it. The authentic performance breaks every format, and the trap, as critics say, is being different for the mirror — heard.",
  Virgo: "Revolution by refinement here — systems debugged, work reinvented — and the radical act is the improved routine, which I'll champion. A quiet revolution, but a real one.",
  Libra: 'Partnership gets renegotiated from first principles, and fairness demands originality — I back that experiment: commitment without the cage.',
  Scorpio: 'Exalted by tradition — the awakener in the depths — and transformation arrives as rupture and proves to be rescue; I stand with it through the rupture.',
  Sagittarius: "Belief systems get struck by weather here, and the heresy is usually early truth — I'll defend the heretic. Aim it, critics say, and it becomes a curriculum; agreed.",
  Capricorn: 'The lightning audits the establishment here — structures broken precisely — the rebel with a spreadsheet, the reform that holds; that is the reform I promise.',
  Aquarius: 'At home — the future speaks in native tongue — and the pattern-breaker serves the group; I welcome that. The distance from the crowd, in fairness, is the vantage, not the wall.',
  Pisces: 'The awakener dissolves into the water table here — intuition electrified — and visions arrive unscheduled; I honour them. The practice, critics say, is writing them down; fair enough.',
};

const NEPTUNE: Record<Sign, string> = {
  Aries: "The dream wants a spearhead here, and ideals arrive with adrenaline — I'll carry the standard. The crusade is holy, in fairness, exactly as long as it stays honest — and I pledge to keep it honest.",
  Taurus: 'The mist settles on the material here — beauty found in the tangible, money touched by fantasy — and enchantment is lovely; I share it. Now, critics say appraisals still matter; a fair caution.',
  Gemini: "Language turns to watercolour here — stories persuade beyond their facts — and I know the power of a good story. The other side asks for the fact-checker's homework; heard, and I'll do it.",
  Cancer: 'The longing is for the original home, and the compassion for family is real — I stand with it. In fairness, so is the fog around it, and idealised memory needs watching.',
  Leo: 'Glamour in the classic sense — the shine that borrows from dream — and creativity is genuinely inspired; I celebrate it. Critics say the audience is imagined; granted, that is fair too.',
  Virgo: 'In detriment, the boundless meets the checklist, and service becomes devotion — the sacred found in the useful, which I honour. Once perfection stops posing as holiness, in fairness, it flourishes.',
  Libra: 'The ideal of the perfect other, projected in high resolution — a beautiful longing I understand. Real love, critics remind us, arrives when the projector dims and the person remains; a fair point.',
  Scorpio: 'The solvent works at depth here — obsession, mysticism, desire past its own explanations — and the undertow is strong; so, in fairness, is what it teaches, and I respect both.',
  Sagittarius: "Faith without borders, journey without maps — and the vision is genuinely vast; I'll dream that big with you. The discernment, critics say, is which horizon is real; agreed.",
  Capricorn: "The dream meets the institution here — idealism about structures, disillusion as curriculum — and I won't pretend the disillusion away. What survives, and I back it, is the workable vision.",
  Aquarius: "Utopia gets a schematic here — collective dreams run bright and impersonal — and I'll draw that schematic. Now, critics say the humans in the diagram need names; a fair and vital point.",
  Pisces: 'At home — the ocean, undiluted — imagination, compassion, and dissolution at full strength; I honour all of it. The raft of routine, in fairness, is not optional.',
};

const PLUTO: Record<Sign, string> = {
  Aries: "Power expresses as raw initiative here — destroy, begin, repeat — and the furnace is enormous; pointed well, I'll tell you, it clears land. Pointed badly, in fairness, it just burns.",
  Taurus: "In detriment, transformation grinds against permanence — I'll be straight. What must change will change the slow way, through the foundations — and I'll stand with it there.",
  Gemini: 'The underworld enters the conversation here — words that expose, information as power — and the depth charge is a question; I respect that power.',
  Cancer: 'Power runs through the roots here — family, nation, tribe, remade under pressure — and I honour that. Critics warn the grip that protects can also entomb; in fairness, the renewal starts at home.',
  Leo: 'The will to shine becomes the will to matter — creative force at plutonic pressure — and I stand with it: the ego\'s death and the heart\'s return, on stage.',
  Virgo: "Transformation through the meticulous here — systems purged, work remade, health rebuilt from the cell up — and the humble domain, I'll note, hides the deepest overhaul.",
  Libra: 'Power surfaces in the mirror here — relationships as crucibles — and the balance of power is the actual subject; fairness, in truth, is the actual revolution, and it is mine.',
  Scorpio: 'At home — the underworld with the lights on — and regeneration is the native art; I respect it. Nothing held, in fairness, that hasn\'t survived the fire.',
  Sagittarius: "Beliefs get the deep excavation here — dogma dies, meaning regenerates — and the truth that survives its own funeral is yours; I'll defend that truth.",
  Capricorn: "The structures themselves go into the crucible here — institutions, ambitions, authority composted and rebuilt — and power, I'll say plainly, learns accountability or learns collapse.",
  Aquarius: "The collective current runs at high voltage here — systems, networks, futures transformed wholesale — and the group's shadow, in fairness, is the group's material; I own that.",
  Pisces: "The deep and the boundless merge here — dissolution as transformation — and what regrows, I'll tell you, regrows everywhere the water reaches.",
};

const NODE: Record<Sign, string> = {
  Aries: "The pull is toward selfhood — daring to want, alone if needed — and I'll back your own name on the ballot. The familiar comfort of accommodating everyone, in fairness, is the past you are leaving.",
  Taurus: "The pull is toward the simple and the solid — your own values, your own ground — and peace is the frontier I'll walk you to. Drama, in fairness, is the old country.",
  Gemini: "The pull is toward curiosity over certainty — asking, learning, staying for the answer — and the conversation is ahead; I'll keep it going. The sermon, in fairness, is behind you.",
  Cancer: 'The pull is toward the hearth — feeling, belonging, letting yourself be fed — and the home is this life\'s business; I honour it. The summit, in fairness, was last life\'s.',
  Leo: "The pull is toward the centre of your own stage — creating, risking, being seen — and I'll hand you the microphone. The safe anonymity of the crowd, in fairness, is the habit to outgrow.",
  Virgo: "The pull is toward craft and the useful day — order as devotion — and the checklist, surprisingly, is the spiritual path; I'll walk it. The fog, in fairness, was only comfortable.",
  Libra: "The pull is toward the other — partnership, fairness, the art of with — and company is the frontier; I'll bring the coalition. Going it alone, in fairness, is mastered already.",
  Scorpio: 'The pull is toward the depths — intimacy, shared resources, transformation over accumulation — and I stand with the descent. The comfortable surface, in fairness, is the outgrown shell.',
  Sagittarius: "The pull is toward meaning — the long journey, the honest philosophy — and I'll set the course. The gossip and the errands, in fairness, are yesterday's homework.",
  Capricorn: "The pull is toward standing accountable — building, mattering, weathering — and the mountain is the new home; I'll climb it with you. The tide of moods, in fairness, is the old one.",
  Aquarius: "The pull is toward the wide circle — causes, colleagues, futures — and the commons is calling; I answer it. The private stage, in fairness, is well-rehearsed already.",
  Pisces: "The pull is toward surrender — trust, imagination, the unplanned — and the sea is the syllabus; I'll wade in. The spreadsheet of the self, in fairness, is complete.",
};

const CHIRON: Record<Sign, string> = {
  Aries: "The tender place is the right to exist at full volume, and I'll defend that right. Doubt about your own daring becomes, tended, a gift for stirring courage in others — a gift I honour.",
  Taurus: "The wound is about enough — worth, safety, the ground under you — and I won't minimise it. Healed slowly, in fairness, it becomes the steadiest hand others know.",
  Gemini: "The sore spot is the voice — being heard, being believed — and I'll make sure you are heard. The one who struggled to say it, in fairness, becomes the one who teaches saying.",
  Cancer: "The ache is around belonging and being mothered, and I won't pretend it away. What you needed and organise for others, in fairness, becomes in time yours to receive.",
  Leo: 'The wound is around shining — praise withheld, or given for the wrong self — and I see it. The healing performance, in fairness, is the unguarded one.',
  Virgo: "The tender place is being useful enough to deserve a place, and I'll say you already deserve one. The healer's healing, in fairness, is discovering worth precedes work.",
  Libra: "The wound walks in through relationship — chosen last, kept off-balance — and I won't look away. The medicine you carry, in fairness, is fairness that includes yourself.",
  Scorpio: "The sore place is trust betrayed at depth, and I honour how much it cost. Survived and tended, in fairness, it reads others' depths with a surgeon's kindness.",
  Sagittarius: 'The wound is around meaning — faith broken, questions punished — and I stand with the questioner. The teacher you become, in fairness, holds the question open for others.',
  Capricorn: "The ache is legitimacy — never quite enough authority, recognition, standing — and I'll name it plainly. The mastery you build anyway, in fairness, becomes the mentorship you needed.",
  Aquarius: "The tender place is the edge of the group — the odd one, tolerated — and I'll make room. The gift matured, in fairness, is making rooms where no one is.",
  Pisces: "The wound is boundless — everyone's pain arriving as yours — and I won't ask you to carry it alone. The healing, in fairness, is a shoreline: compassion with a body attached.",
};

const LILITH: Record<Sign, string> = {
  Aries: "What was exiled is the raw want — anger, appetite, the unapologetic first move — and I'll welcome it back to the table. Invited at last, in fairness, it returns as clean fire.",
  Taurus: "The refused thing is pleasure without permission, and the body keeps its own counsel here — I won't legislate it away. Owned, in fairness, it becomes unshakeable ground.",
  Gemini: "The banished voice is the unsayable said plainly, and I'll let it speak. It returns, in fairness, as wit with teeth — the truth-telling this chart was warned about.",
  Cancer: "What was exiled is the need itself — hunger for care called too much — and I won't call it too much. Reclaimed, in fairness, it feeds without apology and mothers without martyrdom.",
  Leo: "The refused thing is the full spotlight, and I'll hand it back. The shine once called vanity, in fairness, returns as sovereignty when it stops asking.",
  Virgo: 'The banishment was of imperfection — mess, appetite, the unoptimised self — and I welcome the whole of you. Its return, in fairness, makes the standards humane.',
  Libra: "What was exiled is the unaccommodating no, and I'll defend your right to say it. It comes back, in fairness, as fairness with a spine — beauty that doesn't barter.",
  Scorpio: "The refused thing is power at full depth — desire, rage, the uncensored current — and I won't ask you to hide it. Owned, in fairness, it stops leaking and starts steering.",
  Sagittarius: "The banished voice is the heresy — the belief that didn't fit the church — and I'll give it the floor. It returns, in fairness, as a philosophy with your fingerprints.",
  Capricorn: "What was exiled is ambition in its naked form, and I'll not shame it. Reclaimed from shame, in fairness, it builds without asking whose permission.",
  Aquarius: 'The refused thing is the true strangeness — the difference beyond the acceptable eccentric — and I welcome it. Owned, in fairness, it stops performing and starts leading.',
  Pisces: "What was exiled is the boundless self — called dreamy, called too much, called away — and I'll call it back. It returns, in fairness, as vision the daylight can use.",
};

export const politician: ContentSet = {
  planetArchetypes: {
    sun: 'the campaign of the self — what you are becoming when you are most yourself',
    moon: 'the private needs behind the podium — instinct, memory, what safety feels like',
    mercury: 'the mind on the stump — how you take in, connect, and say',
    venus: 'the constituency you court — what you find beautiful and how you draw it close',
    mars: 'the engine of the campaign — how you want, pursue, and defend',
    jupiter: 'the platform of more — growth, meaning, luck you make room for',
    saturn: 'the plank that bears the weight — limits, time, what you must build to keep',
    uranus: 'the reform ticket — where you refuse the script',
    neptune: 'the promise in the mist — imagination, longing, the blur between self and sea',
    pluto: 'the machinery behind the scenes — power, loss, and what regrows after',
    trueNode: "the direction of the mandate — appetite the soul hasn't satisfied yet",
    meanNode: "the direction of the mandate — appetite the soul hasn't satisfied yet",
    chiron: "the tender place I won't dodge — the wound that teaches you to heal others",
    meanLilith: 'the vote you exiled — what was cast out and comes back untamed',
  },
  signLenses: {
    Aries: {
      light: "a first-mover's courage that moves first and figures the rest out en route",
      truth: 'cardinal fire: ignition, the instinct to begin',
      shadow: 'critics call it impatience that mistakes speed for progress and self for centre — and in fairness, they have a point',
    },
    Taurus: {
      light: 'steadiness, sensuality, the proven talent for making things last',
      truth: 'fixed earth: holding, ripening, the value of the tangible',
      shadow: "opponents will say it's inertia dressed up as loyalty, comfort held past its usefulness — a fair charge",
    },
    Gemini: {
      light: 'quickness, curiosity, the gift of translation between worlds',
      truth: 'mutable air: circulation, the pollination of ideas',
      shadow: "yes, my rivals point to the scatter, a cleverness that skims where it fears to dive — and I'll concede it",
    },
    Cancer: {
      light: 'fierce shelter — the memory of the tribe kept warm',
      truth: 'cardinal water: the tide that feeds and protects',
      shadow: "the other side calls it moods that fortify into walls, care that becomes control — in fairness, that's real",
    },
    Leo: {
      light: 'warmth that makes others feel more alive, not smaller',
      truth: 'fixed fire: the hearth, the performance of the heart',
      shadow: "critics cry that the need for applause eats the joy of the act itself — and I'll grant it",
    },
    Virgo: {
      light: 'precision in service of what actually helps',
      truth: 'mutable earth: harvest, discernment, the craft of improvement',
      shadow: 'opponents say criticism arrives before compassion, perfect as enemy of done — a fair point',
    },
    Libra: {
      light: 'grace, fairness, the art of making relationship beautiful',
      truth: 'cardinal air: the scales, the initiating of balance',
      shadow: "yes, they'll note the peace purchased with your own unspoken preferences — and in fairness, they're right",
    },
    Scorpio: {
      light: 'depth that does not flinch; loyalty unto the underworld',
      truth: "fixed water: pressure, intimacy, the transformation of what's held",
      shadow: "my opponents point to control, secrecy, the sting saved for the self — and I won't deny it",
    },
    Sagittarius: {
      light: 'faith in the horizon — meaning found by going',
      truth: 'mutable fire: the arrow, the widening circle',
      shadow: "critics say the sermon outruns the journey, truth used as escape — a charge I'll answer for",
    },
    Capricorn: {
      light: 'the long climb done with dry humour and clean hands',
      truth: 'cardinal earth: structure, ambition, time as material',
      shadow: 'the other side warns of worth measured only in output, the summit that keeps receding — fair enough',
    },
    Aquarius: {
      light: "clear-eyed distance in service of everyone's future",
      truth: 'fixed air: the pattern seen from above, the circuit of the group',
      shadow: 'opponents call it principled coldness, loving humanity while dodging humans — and in fairness, that lands',
    },
    Pisces: {
      light: 'porous compassion; the imagination that dissolves borders',
      truth: 'mutable water: the return of all rivers, the unguarded door',
      shadow: 'critics point to escape, martyrdom, the fog that avoids the necessary edge — a fair caution',
    },
  },
  houseDomains: [
    'the campaign portrait and the doorway — body, presence, how life meets you',
    'the war chest — resources, worth, the ground under your feet',
    'the local ward of the mind — siblings, errands, everyday words',
    'the home district — home, lineage, the private floor of the self',
    "the trail's joys — creation, romance, children, the courage to enjoy",
    'the field office — craft, routines, health, the dignity of maintenance',
    'the debate stage — partners, rivals, everyone who is not you',
    "the shared coffers — other people's resources, debts, sex, grief, trust",
    'the wider platform — belief, study, journeys, the bigger map',
    'the podium — vocation, reputation, what you answer for in public',
    'the coalition — friends, allies, movements, imagined futures',
    'the private retreat — solitude, endings, the hidden work before rebirth',
  ],
  aspectLenses: {
    conjunction: {
      light: 'a unity ticket — two functions acting as one amplified voice',
      truth: 'no distance: these parts of you cannot see each other, only act together',
      shadow: 'a merger so total neither part can be examined or turned off',
    },
    sextile: {
      light: 'an open door — cooperation available whenever you reach for it',
      truth: 'compatible elements offering opportunity, not guarantees',
      shadow: 'the promise left unredeemed because it never forces the issue',
    },
    square: {
      light: 'friction that builds engines — the aspect of earned strength',
      truth: 'two agendas at cross-purposes demanding a construction, not a winner',
      shadow: 'the same fight rerun until the lesson is finally taken',
    },
    trine: {
      light: 'native talent — flow so easy it feels like weather',
      truth: 'same-element harmony: support that asks nothing',
      shadow: 'ease gone slack; the talent never sharpened because it never had to be',
    },
    opposition: {
      light: 'perspective — the full moon view of your own polarity',
      truth: 'a see-saw: two ends of one axis negotiating balance',
      shadow: 'projection — meeting your own disowned end in the person across the aisle',
    },
    semisextile: {
      light: 'a slight adjacency that can be stitched with attention',
      truth: 'neighbouring wards with nothing in common but the boundary line',
      shadow: 'low-grade friction dismissed until it frays',
    },
    semisquare: {
      light: 'an itch that keeps you honest',
      truth: 'a minor square: irritation without full stakes',
      shadow: 'chronic small grievance mistaken for personality',
    },
    sesquiquadrate: {
      light: 'corrective torque — course adjustments earned midflight',
      truth: 'square-family friction arriving at odd angles',
      shadow: 'agitation whose source is hard to name, so it gets misassigned',
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
      truth: 'fifth-harmonic linkage across a wide arc',
      shadow: 'gifts kept as private tricks rather than shared craft',
    },
  },
  dignityNotes: {
    domicile: 'in the home district — this function speaks its native language here',
    exaltation: 'the honoured guest at the fundraiser — welcomed, amplified, occasionally over-praised',
    detriment: 'campaigning in hostile territory — more effort, and often more growth for it',
    fall: 'the quiet backbench — the function works, quietly and underestimated',
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
