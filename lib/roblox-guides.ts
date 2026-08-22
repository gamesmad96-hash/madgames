export type RobloxTrafficGuide = {
  slug: string;
  title: string;
  description: string;
  query: string;
  intent: string;
  criteria: string[];
  relatedCollections: string[];
};

export const robloxTrafficGuides: RobloxTrafficGuide[] = [
  {
    slug:'best-roblox-games-2026',
    title:'Best Roblox Games in 2026',
    description:'Discover active Roblox experiences worth exploring in 2026, with live player activity and direct links to detailed game pages.',
    query:'Popular',
    intent:'a broad mix of active Roblox experiences across several play styles',
    criteria:['Look for sustained player activity rather than a one-day spike.','Mix competitive, social, progression and casual experiences so there is more than one play style.','Open the individual game page to compare creator, visits and current activity before launching Roblox.'],
    relatedCollections:['popular','adventure','multiplayer','simulator']
  },
  {
    slug:'roblox-games-to-play-with-friends',
    title:'Best Roblox Games to Play With Friends',
    description:'Find Roblox games for friend groups, shared challenges and multiplayer sessions, with live discovery results that refresh over time.',
    query:'Multiplayer',
    intent:'multiplayer Roblox experiences that are easier to enjoy with friends or a group',
    criteria:['Prefer experiences where friends can join the same activity instead of playing separately.','Choose a play style that matches the group: co-op, party, roleplay, combat or progression.','For mixed-skill groups, start with games that are easy to understand before moving into competitive modes.'],
    relatedCollections:['multiplayer','co-op','party','roleplay']
  },
  {
    slug:'best-two-player-roblox-games',
    title:'Best 2 Player Roblox Games',
    description:'Browse Roblox games for two players, including co-op challenges, teamwork experiences and competitive duo-friendly games.',
    query:'2 Player',
    intent:'Roblox experiences that fit a two-player or duo session',
    criteria:['Look for mechanics that give both players something meaningful to do.','Teamwork obbies and puzzle experiences are useful when you want direct cooperation.','Competitive duos work better when both players want short repeatable rounds.'],
    relatedCollections:['two-player','co-op','obby','puzzle']
  },
  {
    slug:'best-roblox-horror-games',
    title:'Best Roblox Horror Games',
    description:'Browse active Roblox horror games, suspense experiences and survival scares with live player counts and detailed game pages.',
    query:'Horror',
    intent:'Roblox horror experiences focused on tension, survival, exploration or escape',
    criteria:['Decide whether you want jump scares, survival pressure, puzzles or story-driven horror.','Check current activity when multiplayer matters because quiet servers can change the experience.','Use the game description and creator details to understand the theme before launching.'],
    relatedCollections:['horror','scary','survival','escape']
  },
  {
    slug:'best-roblox-obby-games',
    title:'Best Roblox Obby Games',
    description:'Find Roblox obby games, obstacle courses, tower challenges and parkour experiences with live discovery results.',
    query:'Obby',
    intent:'Roblox obstacle courses and movement challenges for players who enjoy skill-based progression',
    criteria:['Choose difficulty based on whether you want a relaxed course or repeated precision attempts.','Tower and parkour variants usually reward movement skill more than simple checkpoint obbies.','For friends, look for teamwork or two-player mechanics instead of purely solo stages.'],
    relatedCollections:['obby','parkour','tower','escape']
  },
  {
    slug:'best-roblox-anime-games',
    title:'Best Roblox Anime Games',
    description:'Explore Roblox anime games featuring combat, progression, abilities and anime-inspired worlds, refreshed from live Roblox discovery data.',
    query:'Anime',
    intent:'anime-inspired Roblox experiences with fighting, collecting, progression or adventure systems',
    criteria:['Pick between arena combat, open-world progression, collection systems and tower-defense style play.','Check whether the experience is active enough for the multiplayer mode you want.','Avoid choosing only by a familiar anime theme; progression loop and combat style matter more for long sessions.'],
    relatedCollections:['anime','fighting','one-piece','naruto']
  },
  {
    slug:'best-roblox-tycoon-games',
    title:'Best Roblox Tycoon Games',
    description:'Browse Roblox tycoon games about building, upgrading, earning and expanding businesses or bases.',
    query:'Tycoon',
    intent:'Roblox tycoon experiences centered on building, upgrades and long-term progression',
    criteria:['Look for meaningful upgrades instead of a purely automatic cash loop.','Theme matters: restaurants, businesses, military bases and creative tycoons can feel very different.','For longer sessions, favor games where progression unlocks new systems rather than only bigger numbers.'],
    relatedCollections:['tycoon','building','restaurant','idle']
  },
  {
    slug:'best-roblox-simulator-games',
    title:'Best Roblox Simulator Games',
    description:'Discover Roblox simulator games across training, collecting, pets, jobs and progression-heavy experiences.',
    query:'Simulator',
    intent:'Roblox simulator experiences built around repeatable progression and upgrades',
    criteria:['Choose a progression loop you actually enjoy repeating: training, collecting, driving, jobs or pets.','Check whether upgrades introduce new areas or mechanics rather than only increasing stats.','If playing casually, favor simulators with short sessions and clear next goals.'],
    relatedCollections:['simulator','pets','clicker','idle']
  },
  {
    slug:'best-roblox-roleplay-games',
    title:'Best Roblox Roleplay Games',
    description:'Find Roblox roleplay games with cities, homes, schools, jobs and social worlds for open-ended play.',
    query:'Roleplay',
    intent:'social Roblox worlds designed around characters, homes, jobs and open-ended roleplay',
    criteria:['Choose a setting that fits the session: city, school, family, fantasy or job roleplay.','A good roleplay world should provide places and tools that help players create their own activities.','If joining with friends, decide on a shared scenario first so the session starts quickly.'],
    relatedCollections:['roleplay','city','school','mansion']
  },
  {
    slug:'best-roblox-racing-games',
    title:'Best Roblox Racing Games',
    description:'Browse Roblox racing games with cars, tracks, speed challenges and competitive driving experiences.',
    query:'Racing',
    intent:'Roblox racing experiences focused on speed, tracks, vehicles and competition',
    criteria:['Pick arcade racing for quick fun or driving simulation when vehicle handling matters more.','Check whether progression unlocks vehicles, tracks or tuning options you care about.','For multiplayer races, current player activity can matter more than the size of the vehicle list.'],
    relatedCollections:['racing','car','driving','speed']
  },
  {
    slug:'best-roblox-fighting-games',
    title:'Best Roblox Fighting Games',
    description:'Explore Roblox fighting games with melee combat, abilities, battlegrounds and competitive PvP action.',
    query:'Fighting',
    intent:'Roblox combat experiences where timing, abilities and player-versus-player fights are central',
    criteria:['Choose arena combat for fast rounds or progression fighters for longer-term unlocks.','Check whether abilities are readable enough for new players before joining highly competitive servers.','For friend groups, private practice or lower-pressure modes can be better before ranked-style play.'],
    relatedCollections:['fighting','battlegrounds','anime','superhero']
  },
  {
    slug:'best-roblox-shooter-games',
    title:'Best Roblox Shooter Games',
    description:'Find Roblox shooter games, FPS experiences and tactical combat games with active player communities.',
    query:'Shooter',
    intent:'Roblox shooting experiences ranging from arcade FPS action to tactical team combat',
    criteria:['Decide whether you prefer fast respawns, tactical rounds or larger battlefield modes.','Player activity is especially useful for shooters because matchmaking quality depends on populated servers.','Try games with clear weapon feedback and readable maps before committing to a long progression grind.'],
    relatedCollections:['shooter','military','war','battlegrounds']
  },
  {
    slug:'best-roblox-survival-games',
    title:'Best Roblox Survival Games',
    description:'Browse Roblox survival games with hazards, monsters, resource management and exploration challenges.',
    query:'Survival',
    intent:'Roblox survival experiences where staying alive, adapting and exploring drive the session',
    criteria:['Choose between round-based survival and persistent worlds depending on how much time you have.','Co-op survival is stronger when players can share resources or roles instead of simply standing together.','Check the game description for the main threat: monsters, disasters, environment or other players.'],
    relatedCollections:['survival','zombie','monster','island']
  },
  {
    slug:'best-roblox-puzzle-games',
    title:'Best Roblox Puzzle Games',
    description:'Discover Roblox puzzle games, logic challenges, escape rooms and teamwork puzzles.',
    query:'Puzzle',
    intent:'Roblox experiences built around logic, clues, escape challenges and problem solving',
    criteria:['Pick solo logic games for a focused challenge or teamwork puzzles for a social session.','Escape-room style games work best when clues are readable and progression feels fair.','If playing with friends, avoid solving everything alone; divide clues and communicate discoveries.'],
    relatedCollections:['puzzle','escape','detective','mystery']
  },
  {
    slug:'best-roblox-tower-defense-games',
    title:'Best Roblox Tower Defense Games',
    description:'Browse Roblox tower defense games featuring units, waves, upgrades and strategy-focused progression.',
    query:'Tower Defense',
    intent:'Roblox strategy experiences based on defending lanes or objectives against waves',
    criteria:['Look for unit variety that creates more than one viable strategy.','Progression should unlock tactical options, not only stronger versions of the same unit.','Co-op tower defense works best when players can coordinate roles, lanes or upgrade priorities.'],
    relatedCollections:['tower-defense','strategy','anime','co-op']
  },
  {
    slug:'best-roblox-car-games',
    title:'Best Roblox Car Games',
    description:'Find Roblox car games with open-world driving, racing, dealerships, customization and vehicle progression.',
    query:'Car',
    intent:'Roblox vehicle experiences centered on cars, driving, collecting or customization',
    criteria:['Choose open-world driving when exploration matters, or racing when competition is the main goal.','Customization and vehicle variety are most useful when they change how you play, not just appearance.','Check whether the experience emphasizes realistic handling or easy arcade controls.'],
    relatedCollections:['car','driving','racing','city']
  },
  {
    slug:'best-roblox-adventure-games',
    title:'Best Roblox Adventure Games',
    description:'Explore Roblox adventure games with quests, exploration, worlds, progression and story-driven activities.',
    query:'Adventure',
    intent:'Roblox adventure experiences built around exploration, quests and discovering new areas',
    criteria:['Look for clear goals if you want structured progression, or open worlds if exploration is the priority.','A strong adventure game gives new locations or mechanics a reason to exist beyond visual variety.','For groups, check whether quests and progress can be shared without splitting the party.'],
    relatedCollections:['adventure','island','dragon','ninja']
  },
  {
    slug:'best-roblox-building-games',
    title:'Best Roblox Building Games',
    description:'Browse Roblox building games, creative sandboxes and construction experiences for players who like making things.',
    query:'Building',
    intent:'Roblox creative experiences focused on construction, design and sandbox building',
    criteria:['Choose freeform sandboxes for creativity or progression builders when you prefer goals and unlocks.','Good building tools should be understandable without fighting the interface.','Multiplayer building is more fun when permissions and shared spaces make collaboration easy.'],
    relatedCollections:['building','tycoon','city','multiplayer']
  },
  {
    slug:'best-roblox-games-for-beginners',
    title:'Best Roblox Games for Beginners',
    description:'Find approachable Roblox games for new players, with simple ways to compare active experiences before choosing what to try.',
    query:'Popular',
    intent:'approachable Roblox experiences that can help a new player sample different game styles',
    criteria:['Start with a clear objective and controls you can understand within the first few minutes.','Try one social, one obstacle, one progression and one action experience to learn what style you enjoy.','Do not worry about mastering every system immediately; pick games where the first session is enjoyable without a large grind.'],
    relatedCollections:['popular','obby','roleplay','simulator']
  },
  {
    slug:'best-roblox-multiplayer-games',
    title:'Best Roblox Multiplayer Games',
    description:'Discover active Roblox multiplayer games across co-op, party, social and competitive experiences.',
    query:'Multiplayer',
    intent:'Roblox experiences designed around playing with other people',
    criteria:['Match the game to your group size and whether you want cooperation or competition.','Current player activity helps when an experience depends on full teams or busy servers.','For repeat sessions, favor games with enough mode or progression variety to keep a group engaged.'],
    relatedCollections:['multiplayer','party','co-op','battlegrounds']
  }
];

export function getRobloxTrafficGuide(slug:string){
  return robloxTrafficGuides.find(guide=>guide.slug===slug);
}
