import type {Guide} from './guides';

// Hand-curated guides that recommend specific games from the MADGAMES.FUN catalog.
// Each pick links to its game page; notes describe what the game actually asks of the player.
export const curatedGuides:Guide[]=[
  {
    slug:'best-puzzle-games-to-play-online',
    title:'Best Free Puzzle Games on MADGAMES.FUN, Sorted by Puzzle Type',
    description:'A hand-picked list of the best free puzzle games on MADGAMES.FUN, grouped by type: mahjong and solitaire, block puzzles, sorting games and physics or drawing puzzles.',
    summary:'Our puzzle catalog is large, so we grouped the strongest picks by the kind of thinking they ask for: tile matching, block placement, sorting, or drawing a solution.',
    publishedAt:'2026-11-22',
    updatedAt:'2026-11-22',
    sections:[
      {
        heading:'Pick a puzzle by the kind of thinking you enjoy',
        paragraphs:[
          '"Puzzle" covers very different games. Some ask you to scan a board and spot pairs, some reward planning several moves ahead, and some give you a pen and let you invent your own answer. If you start with the type you already like, you are far more likely to find a game you keep coming back to.',
          'All of the games below run in the browser and are marked as playable on both mobile and desktop.'
        ]
      },
      {
        heading:'Mahjong and solitaire: calm, classic and one move at a time',
        paragraphs:[
          'Tile and card games are the best choice when you want to slow down. The rules are old and well known, there is rarely a timer, and the challenge comes from choosing the right order of moves.'
        ],
        picks:[
          {slug:'mahjong-bird-tiles',title:'Mahjong Bird Tiles',note:'Classic mahjong solitaire with a bird theme. A tile is only free when nothing covers it and one side is open, so the order in which you remove pairs decides whether you finish the board.'},
          {slug:'tile-stack-mahjong',title:'Tile Stack: Mahjong',note:'A twist on tile matching: you place tiles into columns to build matching groups, so space management matters as much as spotting pairs.'},
          {slug:'sands-of-anubis',title:'Sands of Anubis',note:'An Egyptian-themed triple-match game. Tiles go into a small tray and clear in sets of three, so filling the tray with odd tiles is the main danger.'},
          {slug:'solitaire-treasures',title:'Solitaire Treasures',note:'Draw-one Klondike where every deal can be won, with collectible decks and backgrounds between games. A good pick if you want solitaire without unwinnable hands.'}
        ]
      },
      {
        heading:'Block puzzles: quick rounds that punish careless placement',
        paragraphs:[
          'Block puzzles look simple, but every piece you place changes what fits next. The habit that helps most is keeping one large open area on the board for awkward pieces instead of filling gaps as soon as you see them.'
        ],
        picks:[
          {slug:'block-crush',title:'Block Crush',note:'An 8x8 board where pieces cannot be rotated. Clearing several lines at once gives combo points.'},
          {slug:'sugar-drop',title:'Sugar Drop',note:'Candy-themed block puzzle with a "Sugar Rush" combo for multi-line clears.'},
          {slug:'tentrix-block',title:'TenTrix Block',note:'No time limit, so it suits players who like to think about every placement.'},
          {slug:'drop-and-amp-amp-merge-2048',title:'Drop & Merge 2048',note:'2048 meets falling blocks: drop numbered cubes into five lanes and set up chain merges.'}
        ]
      },
      {
        heading:'Sorting puzzles: tidy, satisfying and good for short breaks',
        paragraphs:[
          'Sorting games give you one clear goal, such as one colour per tube. The trick in almost all of them is keeping an empty container free for as long as possible, because it is your only way to untangle a bad stack.'
        ],
        picks:[
          {slug:'jungle-tube-sort',title:'Jungle Tube Sort',note:'Pour coloured liquids until each tube holds one colour. Hundreds of levels from easy to tricky.'},
          {slug:'candy-sort',title:'Candy Sort',note:'Tube sorting with candies and a timer, with fewer spare tubes in later levels.'},
          {slug:'car-sort',title:'Car Sort',note:'Open garages and send cars to the matching colour. Road space is limited, so the order you open garages in matters.'},
          {slug:'trio-twist-puzzle',title:'Trio Twist Puzzle',note:'Group balls, donuts and cubes into matching trios in a limited number of slots.'}
        ]
      },
      {
        heading:'Drawing and physics puzzles: there is more than one right answer',
        paragraphs:[
          'These games hand you a line or a shape and let physics do the rest. They reward experimenting: if a solution fails, look at where it broke rather than redrawing the same idea.'
        ],
        picks:[
          {slug:'draw-and-save-the-stickman',title:'Draw And Save The Stickman',note:'Draw barriers to protect the stickman from rocks, spikes and enemies. Your drawing is affected by physics, so it has to be solid.'},
          {slug:'inkway',title:'Inkway',note:'Draw a road for a car to follow to the finish. Smooth lines matter because the car follows exactly what you draw.'},
          {slug:'bump-the-balls',title:'Bump the Balls',note:'Draw a single line so that two balls roll together under gravity.'},
          {slug:'grazing-giraffe',title:'Grazing Giraffe',note:'A sliding puzzle where the giraffe keeps moving until it hits something, so you plan routes rather than single steps.'}
        ]
      }
    ],
    faqs:[
      {question:'Which puzzle game is best for a relaxing session?',answer:'Mahjong Bird Tiles and Solitaire Treasures have no rush and let you think about each move.'},
      {question:'Which puzzle games have a timer?',answer:'Candy Sort adds a timer to tube sorting. Most block and mahjong games on this list let you play at your own pace.'},
      {question:'Do these puzzle games work on phones?',answer:'Yes, every game in this guide is marked as supporting both mobile and desktop browsers.'}
    ],
    relatedCategories:[{name:'Puzzle',slug:'puzzle'},{name:'Casual',slug:'casual'},{name:'Arcade',slug:'arcade'}]
  },
  {
    slug:'best-driving-and-parking-games',
    title:'Best Driving, Parking and Truck Games to Play in Your Browser',
    description:'Our picks of the best free driving games on MADGAMES.FUN: precision parking, off-road trucks, city driving jobs, stunt tracks and endless traffic racers.',
    summary:'Driving games split into very different styles. This guide sorts our racing catalog into parking, off-road hauling, city jobs, stunts and endless racers, with the best pick in each.',
    publishedAt:'2026-11-22',
    updatedAt:'2026-11-22',
    sections:[
      {
        heading:'Speed is not the only kind of driving game',
        paragraphs:[
          'Some driving games reward going as fast as possible. Others reward the opposite: slow throttle, careful braking and exact positioning. Knowing which kind you want saves a lot of restarts.',
          'A general tip for every simulator below: brake earlier than feels natural. Heavy vehicles such as tankers, buses and loaded trucks take much longer to stop, and most failed missions come from arriving at a corner too fast.'
        ]
      },
      {
        heading:'Precision parking',
        paragraphs:['Parking games are short, calm and surprisingly tense in the last metre. Use reverse freely and line the vehicle up before you enter the bay, not inside it.'],
        picks:[
          {slug:'city-bus-parking',title:'City Bus Parking',note:'Long buses on city roads, mountain routes and bridges. The hardest part is swinging the rear of a long vehicle into a tight space.'},
          {slug:'ultimate-car-parking-sim',title:'Ultimate Car Parking Sim',note:'Sports and luxury cars, tight spots and busier areas in later levels.'},
          {slug:'advance-car-game-parking',title:'Advance Car Game Parking',note:'Parking on icy, slippery roads, which makes gentle steering essential.'},
          {slug:'police-car-parking-2026',title:'Police Car Parking 2026',note:'A police cruiser in narrow alleys and car parks, with tighter spots each level.'}
        ]
      },
      {
        heading:'Off-road and heavy hauling',
        paragraphs:['These games are about getting cargo to the end in one piece. Climb slopes with steady throttle instead of flooring it, and slow down before bumps, not on them.'],
        picks:[
          {slug:'junkyard-builder-3d',title:'Junkyard Builder 3D',note:'Build an off-road truck from scrap and upgrade engine, wheels, suspension and turbo across 10 worlds. The best pick if you like steady progression.'},
          {slug:'cargo-truck-game',title:'Cargo Truck Game',note:'A coal-loaded dump truck on hilly terrain where spilling the load is the main risk.'},
          {slug:'us-army-truck-driving',title:'US Army Truck Driving',note:'Military cargo over highways, mountains and mud.'},
          {slug:'oil-tanker-simulator',title:'Oil Tanker Simulator',note:'A loaded fuel tanker that is slow to stop and hard to turn.'}
        ]
      },
      {
        heading:'City driving jobs',
        paragraphs:['Job simulators give every drive a purpose: pick someone up, follow the route, drop them off. They suit players who like a routine more than a race.'],
        picks:[
          {slug:'tuk-tuk-auto-rikshaw',title:'Tuk Tuk Auto Rikshaw',note:'Drive an auto rickshaw through busy streets picking up passengers. Small and quick, but traffic keeps you alert.'},
          {slug:'limo-city-taxi-driver',title:'Limo City Taxi Driver',note:'A stretch limousine used as a taxi, which means taking every corner wide.'},
          {slug:'bus-driving-master-3d',title:'Bus Driving Master 3D',note:'Passenger routes over highways, streets and bridges, where smooth stops matter.'},
          {slug:'car-driving-school-game',title:'Car Driving School Game',note:'Driving lessons that reward obeying signals and following routes.'}
        ]
      },
      {
        heading:'Stunts and endless racers',
        paragraphs:['When you just want speed, these are the quickest to start. In stunt games, ease off before landing; in endless racers, look further ahead than the car directly in front of you.'],
        picks:[
          {slug:'car-stunt-master-game',title:'Car Stunt Master Game',note:'Ramps, loops and narrow paths high in the sky.'},
          {slug:'horizon-highway-driving',title:'Horizon Highway Driving',note:'Endless highway with a day and night cycle. Close passes build a combo that fuels your boost.'},
          {slug:'drive-and-dodge-car-racing-3d',title:'Drive and Dodge: Car Racing 3D',note:'The car accelerates by itself; you steer onto +5 time panels and away from -5 panels.'},
          {slug:'dirt-bike-trail-rider',title:'Dirt Bike Trail Rider',note:'Physics-based bike riding where balance on landing matters as much as speed.'}
        ]
      }
    ],
    faqs:[
      {question:'What is the most relaxing driving game here?',answer:'City Car Driving Game lets you drive around an open city at your own pace, and the parking games have no traffic pressure.'},
      {question:'Which driving game has the most upgrades?',answer:'Junkyard Builder 3D, where you upgrade engine, wheels, suspension and turbo between runs.'},
      {question:'Why do I keep failing truck missions?',answer:'Usually speed into corners or onto bumps. Brake earlier and use steady throttle on slopes.'}
    ],
    relatedCategories:[{name:'Racing',slug:'racing'},{name:'Adventure',slug:'adventure'},{name:'Arcade',slug:'arcade'}]
  },
  {
    slug:'indian-themed-browser-games',
    title:'Desi Browser Games: Rasgullas, Tuk Tuks and Other Indian-Themed Games',
    description:'Free browser games with an Indian theme on MADGAMES.FUN, from catching rasgullas and matching laddoos to driving an auto rickshaw.',
    summary:'A short list of games in our catalog with an Indian setting or theme: sweets, street food, auto rickshaws and a desi-style rescue story.',
    publishedAt:'2026-11-22',
    updatedAt:'2026-11-22',
    sections:[
      {
        heading:'Why this list exists',
        paragraphs:[
          'Most browser games use generic settings. A handful in our catalog use themes Indian players will recognise straight away, from jalebis and vadas to the auto rickshaw. They are all quick to start and run in a mobile browser, which makes them easy to share with friends and family.'
        ]
      },
      {
        heading:'Sweets and snacks',
        paragraphs:['Three games here are built around Indian food. Two of them are reflex games that test how fast you can react, and one is a match-3 puzzle.'],
        picks:[
          {slug:'rasgullas',title:'Rasgullas',note:'Rasgullas and jalebis fall from above, and you swap two bowls so each sweet lands in the bowl holding the same sweet. Simple at first, frantic later.'},
          {slug:'indian-delights-match-3',title:'Indian Delights Match 3',note:'A match-3 with laddoos, barfis and jalebis across more than 30 levels, with power-ups for tricky boards.'},
          {slug:'the-greedy-crow',title:'The Greedy Crow',note:'An endless flyer about a hungry crow collecting vadas while avoiding obstacles.'}
        ]
      },
      {
        heading:'On the road',
        paragraphs:['If you have ever wondered how hard it is to weave an auto through traffic, this is the low-risk way to find out.'],
        picks:[
          {slug:'tuk-tuk-auto-rikshaw',title:'Tuk Tuk Auto Rikshaw',note:'Pick up passengers and drop them off safely through busy streets. Each ride is a short mission.'},
          {slug:'wedding-rush-race',title:'Wedding Rush Race',note:'A light, wedding-themed race to the finish line. Some sections need quick reactions and others reward picking the best path.'}
        ]
      },
      {
        heading:'A desi-style adventure',
        paragraphs:['For something longer than a quick reflex game, this puzzle platformer has a full story.'],
        picks:[
          {slug:'level-once-again',title:'Level Once Again',note:'Guide Veer through 100 trapped rooms across four worlds to rescue Tara from the villain Kaal, with seven bosses on the way. Familiar-looking rooms often hide a new trick.'}
        ]
      }
    ],
    faqs:[
      {question:'Which of these is quickest to play?',answer:'Rasgullas and The Greedy Crow, both of which start instantly and use one simple control.'},
      {question:'Is there a longer game with a story?',answer:'Level Once Again has 100 rooms, four worlds and seven bosses.'},
      {question:'Do these games work on mobile?',answer:'Yes, all of them are marked as supporting mobile browsers.'}
    ],
    relatedCategories:[{name:'Casual',slug:'casual'},{name:'Puzzle',slug:'puzzle'},{name:'Racing',slug:'racing'}]
  },
  {
    slug:'best-browser-games-for-kids',
    title:'Gentle Browser Games for Young Kids: Colouring, Matching and Easy Platformers',
    description:'Calm, simple browser games on MADGAMES.FUN that suit young children: colouring books, picture puzzles, memory matching and easy platformers, with no timers in most.',
    summary:'Games picked for young players: no violence, simple rules, and in most cases no timer or score pressure. Parents can use the notes to choose by age and patience.',
    publishedAt:'2026-11-22',
    updatedAt:'2026-11-22',
    sections:[
      {
        heading:'What we looked for',
        paragraphs:[
          'For this list we picked games with simple controls, friendly visuals and, wherever possible, no timer. Young children often get frustrated by a countdown more than by the puzzle itself, so the calmest games are listed first.',
          'Browser games on MADGAMES.FUN come from third-party developers and may show ads inside the game, so we recommend an adult starts the game and stays nearby for younger children.'
        ]
      },
      {
        heading:'Colouring and creative play (no timer, no score)',
        paragraphs:[],
        picks:[
          {slug:'wolfoo-birthday-pixel-art',title:'Wolfoo Birthday Pixel Art',note:'Colour by number: every square shows a number that matches a colour. Good for learning numbers and colours together.'},
          {slug:'tiger-coloring-book',title:'Tiger Coloring Book',note:'Colour tiger pictures with realistic stripes or any colours you like, at your own pace.'},
          {slug:'fall-boys-coloring-book',title:'Fall Boys Coloring Book',note:'Colour round, bean-shaped characters and obstacle-course scenes.'},
          {slug:'physics-sandbox',title:'Physics Sandbox',note:'Pour sand, water and lava and watch them interact. No goal at all, just experimenting.'}
        ]
      },
      {
        heading:'Picture puzzles and matching',
        paragraphs:['These build observation and memory. Most let you choose a difficulty, so you can start small.'],
        picks:[
          {slug:'wolfoo-tangram',title:'Wolfoo Tangram',note:'Rebuild 30 pictures from 4 to 30 pieces, with zoom and three free hints a day.'},
          {slug:'animal-pair-card-match',title:'Animal Pair Card Match',note:'Match pairs of cute animal cards. Gentle visuals and simple rules.'},
          {slug:'ninja-gorilla-jigsaw-puzzle',title:'Ninja Gorilla Jigsaw Puzzle',note:'Classic jigsaw with a choice of piece counts.'},
          {slug:'tidy-up-the-dollhouse',title:'Tidy Up the Dollhouse',note:'Put toys back in place and clean eight messy rooms. Satisfying rather than difficult.'}
        ]
      },
      {
        heading:'Easy movement games',
        paragraphs:['When children want something a little more active, these have forgiving rules and cheerful themes.'],
        picks:[
          {slug:'whirly',title:'Whirly',note:'Spin a windmill so falling sacks land on the matching colour. This version is made easier for kids.'},
          {slug:'panda-adventure-2026',title:'Panda Adventure 2026',note:'A friendly platformer with coins and mystery blocks.'},
          {slug:'balloons-pop',title:'Balloons Pop',note:'Tap balloons before they float away. Bright and simple.'},
          {slug:'wolfoo-maze-adventure',title:'Wolfoo Maze Adventure',note:'Colourful mazes with coins and stars. Has a gentle timer.'}
        ]
      }
    ],
    faqs:[
      {question:'Which games have no timer?',answer:'The colouring games, Physics Sandbox and Tidy Up the Dollhouse have no timer or score pressure.'},
      {question:'Do these games have ads?',answer:'Games are provided by third-party developers and some may show ads inside the game, so an adult should start the game for young children.'},
      {question:'Which game helps with numbers?',answer:'Wolfoo Birthday Pixel Art uses colour by number, and Wolfoo 2048 is a friendly number-merging game for slightly older kids.'}
    ],
    relatedCategories:[{name:'Casual',slug:'casual'},{name:'Puzzle',slug:'puzzle'},{name:'Girls',slug:'girls'}]
  },
  {
    slug:'best-sports-games-online',
    title:'Best Free Sports Games Online: Football, Pool, Darts, Basketball and More',
    description:'Our picks of the best free sports games on MADGAMES.FUN, from 9 ball pool and darts to one-finger basketball, tabletop soccer and arcade boxing.',
    summary:'The sports games in our catalog range from realistic pool physics to silly arcade football. Here are the best ones for each sport and what makes each worth playing.',
    publishedAt:'2026-11-22',
    updatedAt:'2026-11-22',
    sections:[
      {
        heading:'Realistic or arcade?',
        paragraphs:[
          'Browser sports games rarely try to be full simulations. The good ones pick one part of a sport, such as aiming, timing or power, and make that part feel right. The notes below say which skill each game is really testing.'
        ]
      },
      {
        heading:'Cue and target sports',
        paragraphs:['Precision games where one good shot matters more than speed.'],
        picks:[
          {slug:'9-ball-pool-3d',title:'9 Ball Pool 3D',note:'3D pool with table physics, a three-round championship and a timed mode. Remember: hit the lowest-numbered ball first; pocketing the 9 legally wins the rack.'},
          {slug:'dart-duell-timing-champion',title:'Dart Duell: Timing Champion',note:'Darts with X01 rules: reach exactly zero before your opponent. Play the computer or a friend.'},
          {slug:'pro-golfer-game',title:'Pro Golfer Game',note:'Golf where wind, slopes and obstacles affect every shot.'}
        ]
      },
      {
        heading:'Football',
        paragraphs:['Football is the most common sport in our catalog, and these are the most distinct takes on it.'],
        picks:[
          {slug:'goalshot',title:'GoalShot',note:'A football puzzle: curve the ball around walls and through portals, touching a star before the goal. Every level is hand-made.'},
          {slug:'toy-soccer-cup',title:'Toy Soccer Cup',note:'Flick little toy players to pass and shoot. Aim and power both matter.'},
          {slug:'football-pinball',title:'Football Pinball',note:'Pinball flippers guard your goal while you bounce the ball up the table to score.'},
          {slug:'rocketcar-cup',title:'Rocketcar Cup',note:'2D soccer with rocket cars that boost, jump and flip. Best with a friend.'},
          {slug:'fiva-26-soccer',title:'Fiva 26: Soccer',note:'Pick a country and play short arcade matches with simple sprint, pass and shoot controls.'}
        ]
      },
      {
        heading:'Basketball, volleyball and boxing',
        paragraphs:[],
        picks:[
          {slug:'aimball',title:'AIMBALL',note:'One-finger basketball: swipe length sets power, swipe angle sets aim. 60 seconds per round, more points for longer shots.'},
          {slug:'funny-volleyball',title:'Funny Volleyball',note:'Light arcade volleyball against the computer with unlockable characters and balls.'},
          {slug:'mini-boxing-final-round',title:'Mini Boxing Final Round',note:'Six opponents to the championship using jabs, straights and a super uppercut. Blocking and timing beat button mashing.'}
        ]
      }
    ],
    faqs:[
      {question:'Which sports game can two people play?',answer:'Rocketcar Cup and Dart Duell both support playing with a friend.'},
      {question:'Which is best on a phone?',answer:'AIMBALL is designed around a single swipe, which works well on touch screens.'},
      {question:'Is there a sports puzzle game?',answer:'GoalShot turns each shot into a small puzzle, and Football Legends Sliding Puzzle is a picture sliding puzzle.'}
    ],
    relatedCategories:[{name:'Sports',slug:'sports'},{name:'Arcade',slug:'arcade'},{name:'Casual',slug:'casual'}]
  },
  {
    slug:'brain-training-math-and-memory-games',
    title:'Brain Training Games: Math, Memory and Reaction Games for Quick Practice',
    description:'Free browser games on MADGAMES.FUN that exercise maths, memory and reaction speed, including prime-number and square-number games, crossmath and memory card games.',
    summary:'A short list for students, parents and anyone who wants a game that also exercises the brain: number games, memory matching and colour-reaction challenges.',
    publishedAt:'2026-11-22',
    updatedAt:'2026-11-22',
    sections:[
      {
        heading:'Learning that feels like a game',
        paragraphs:[
          'A few games in our catalog are built around real maths ideas. They work best as short daily practice: five minutes is enough to notice improvement, and the games give instant feedback when you get something wrong.'
        ]
      },
      {
        heading:'Maths games',
        paragraphs:[],
        picks:[
          {slug:'primes',title:'Primes',note:'Numbered balls fall and you catch each one in the "prime" or "not prime" bowl. Excellent practice for recognising primes quickly.'},
          {slug:'math-squares',title:'Math Squares',note:'Match each number with its square. Bigger squares are broken into easier multiplications, so it teaches as well as tests.'},
          {slug:'crossmath-challenge',title:'Crossmath Challenge',note:'A crossword made of equations: every tile must work across and down. Great for mental arithmetic.'},
          {slug:'wolfoo-2048',title:'Wolfoo 2048',note:'A friendly drop-and-merge number game that builds a feel for doubling.'}
        ]
      },
      {
        heading:'Memory games',
        paragraphs:['Memory card games get harder as the number of cards grows. Try saying the card out loud as you flip it; it really helps.'],
        picks:[
          {slug:'pyropairs',title:'PyroPairs',note:'Memory matching with several difficulty levels and more cards as you progress.'},
          {slug:'playpair',title:'PlayPair',note:'Sports-item memory cards with a time limit.'},
          {slug:'pixel-car-memory-quest',title:'Pixel Car Memory Quest',note:'Retro pixel-art cars with more cards each level.'},
          {slug:'crypta',title:'Crypta',note:'Clear the board in as few flips as possible.'}
        ]
      },
      {
        heading:'Reaction and focus games',
        paragraphs:['These are tiny games where one mistake ends the run, which makes them a good test of focus.'],
        picks:[
          {slug:'shadeo',title:'Shadeo',note:'Click the box that matches the background colour before time runs out. More boxes appear each round.'},
          {slug:'spinhue',title:'SpinHue',note:'Rotate a four-colour circle so each falling sack lands on its colour.'},
          {slug:'reflex-pong',title:'REFLEX PONG',note:'Control two paddles at once for a two-minute survival round.'}
        ]
      }
    ],
    faqs:[
      {question:'Which game is best for practising times tables?',answer:'Math Squares, which pairs numbers with their squares and breaks bigger ones into simpler multiplications.'},
      {question:'Are these suitable for school-age children?',answer:'Yes. Primes, Math Squares and Crossmath Challenge are built around real maths skills.'},
      {question:'How long should a practice session be?',answer:'Short and regular works best: a few minutes a day is more useful than one long session.'}
    ],
    relatedCategories:[{name:'Puzzle',slug:'puzzle'},{name:'Casual',slug:'casual'},{name:'Arcade',slug:'arcade'}]
  },
  {
    slug:'tower-defense-and-strategy-games',
    title:'Tower Defense and Strategy Games You Can Play in a Browser',
    description:'The best free tower defense and strategy games on MADGAMES.FUN, from classic tower placement to stick-figure armies, merge defense and base building.',
    summary:'If you like planning more than reflexes, these are the strategy games in our catalog worth your time, with a tip for each on what decides who wins.',
    publishedAt:'2026-11-22',
    updatedAt:'2026-11-22',
    sections:[
      {
        heading:'The one rule that helps in every defense game',
        paragraphs:[
          'Most tower defense losses come from spreading upgrades too thin. It is usually better to fully upgrade a few well-placed defences near the path than to build many weak ones. Save your strongest spell or hero for the waves that bring bosses.'
        ]
      },
      {
        heading:'Classic tower defense',
        paragraphs:[],
        picks:[
          {slug:'royal-defense',title:'Royal Defense',note:'Archer, mage, artillery and barracks towers along a road, plus heroes and spells. The most traditional pick on this list.'},
          {slug:'magic-monster',title:'Magic Monster',note:'Defend a tower with spells and upgrade skills between waves, with bosses at the end of each stage.'},
          {slug:'evolution-era',title:'Evolution Era',note:'Tower defense across the ages: evolve from primitive units to stronger eras as you upgrade.'}
        ]
      },
      {
        heading:'Merge and army builders',
        paragraphs:['Here the strategy is in what you combine and when.'],
        picks:[
          {slug:'heroes-beware',title:'HEROES BEWARE',note:'You are the villain: merge identical monsters on a rune grid to hold the road against knights, archers and mages.'},
          {slug:'stickboy-war',title:'Stickboy War',note:'Mine gold, hire miners, shield bearers and archers, and break enemy gates. Balance economy against army.'},
          {slug:'paper-stick-figures',title:'Paper Stick Figures',note:'A notebook-drawn battle where you decide which units to deploy and when.'}
        ]
      },
      {
        heading:'Base building and survival',
        paragraphs:[],
        picks:[
          {slug:'my-army-base',title:'My Army Base',note:'Train soldiers, expand your base and conquer territory step by step.'},
          {slug:'border-clash',title:'Border Clash',note:'Place units to stop enemy forces crossing your border.'},
          {slug:'ashen-watch',title:'Ashen Watch',note:'Guard Princess Elira in the last keep against eight enemy types and bosses, upgrading between waves.'}
        ]
      }
    ],
    faqs:[
      {question:'Which strategy game is best for beginners?',answer:'Royal Defense, because it uses the classic tower defense format with clear tower roles.'},
      {question:'Is there a strategy game where you play the bad guys?',answer:'HEROES BEWARE puts you on the villain side, defending against heroes.'},
      {question:'Do these games save progress?',answer:'That depends on each developer. Some save in your browser, so use the same browser and device to continue.'}
    ],
    relatedCategories:[{name:'Arcade',slug:'arcade'},{name:'Casual',slug:'casual'},{name:'Adventure',slug:'adventure'}]
  }
];
