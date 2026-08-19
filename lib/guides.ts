export type GuideSection={
  heading:string;
  paragraphs:string[];
  bullets?:string[];
};

export type Guide={
  slug:string;
  title:string;
  description:string;
  summary:string;
  publishedAt:string;
  updatedAt:string;
  sections:GuideSection[];
  faqs:Array<{question:string;answer:string}>;
  relatedCategories:Array<{name:string;slug:string}>;
};

export const guides:Guide[]=[
  {
    slug:'how-to-choose-a-browser-game',
    title:'How to Choose a Browser Game for Your Play Style',
    description:'Learn how to choose a free browser game by session length, controls, device support and gameplay style, then discover a suitable category on MADGAMES.FUN.',
    summary:'A practical way to choose a browser game is to start with the kind of session you want, then narrow by controls, device support and gameplay style.',
    publishedAt:'2026-08-19',
    updatedAt:'2026-08-19',
    sections:[
      {
        heading:'Start with the kind of session you want',
        paragraphs:[
          'If you only have a few minutes, games with simple goals and quick restarts are usually easier to enter. Casual and arcade-style games often fit that pattern, while adventure or strategy-heavy board games may suit players who want a longer session.',
          'There is no single best category for everyone. The useful question is whether you want fast reactions, planning, exploration, competition or a relaxed score-chasing loop.'
        ]
      },
      {
        heading:'Match the game to your preferred controls',
        paragraphs:[
          'Desktop players may prefer keyboard, mouse or combined controls, while mobile players generally benefit from games designed around touch input. A game page should be checked before playing because controls vary between publishers and individual titles.',
          'When a game lists instructions or controls on MADGAMES.FUN, use those details to decide whether the control style matches your device and the type of challenge you want.'
        ]
      },
      {
        heading:'Use categories as a discovery shortcut',
        paragraphs:[
          'Action games usually emphasize reaction and movement, puzzle games emphasize logic and patterns, racing games focus on steering and timing, sports games simplify familiar sports into browser-friendly challenges, and 2 Player games are useful when two people want to share a session.',
          'Category pages are a starting point rather than a guarantee that every game plays the same way. Open the individual game page for the most specific description and device-support information.'
        ]
      },
      {
        heading:'Check device support before you start',
        paragraphs:[
          'MADGAMES.FUN game pages can show whether a title is marked for mobile, desktop or both. Third-party game availability can still depend on the provider, browser and regional or technical conditions.',
          'If a game does not fit your device, return to the category page or Search and choose another title rather than assuming every browser game supports every screen.'
        ]
      }
    ],
    faqs:[
      {question:'What is the easiest way to choose a browser game?',answer:'Choose the type of session you want first, then check the category, controls and mobile or desktop support shown on the individual game page.'},
      {question:'Which game category is best for short sessions?',answer:'Casual and arcade games often use quick rounds, but short-session titles can exist in many categories. Check the game description for the actual format.'},
      {question:'Should I choose games differently on mobile?',answer:'Yes. Prioritize titles marked for mobile support and check whether the control style is suitable for touch input.'}
    ],
    relatedCategories:[
      {name:'Action',slug:'action'},
      {name:'Puzzle',slug:'puzzle'},
      {name:'Racing',slug:'racing'},
      {name:'Casual',slug:'casual'}
    ]
  },
  {
    slug:'play-browser-games-on-mobile',
    title:'How to Play Browser Games on Mobile More Smoothly',
    description:'Use device-support details, touch-friendly controls and simple browser checks to choose mobile browser games that are more likely to work well on your phone.',
    summary:'Mobile browser gaming works best when the selected title supports mobile devices and its controls are designed for a smaller touch screen.',
    publishedAt:'2026-08-19',
    updatedAt:'2026-08-19',
    sections:[
      {
        heading:'Choose a title marked for mobile support',
        paragraphs:[
          'The most important first check is whether the game is marked as mobile-supported. A responsive website cannot make a desktop-only third-party game become touch compatible.',
          'On MADGAMES.FUN, individual game pages are the right place to confirm the mobile and desktop support fields before starting.'
        ]
      },
      {
        heading:'Prefer controls that fit a touch screen',
        paragraphs:[
          'Games built around taps, swipes or a small number of on-screen actions are generally easier to use on phones than titles that expect many keyboard keys. The exact controls still depend on the game provider.',
          'If a game feels difficult to control on a phone, that may be a control-layout issue rather than a problem with the whole category.'
        ]
      },
      {
        heading:'Keep the browser environment simple',
        paragraphs:[
          'Close unnecessary heavy tabs when a game is struggling, keep the browser current, and allow the page enough time to load its third-party game frame. Performance can vary by device, browser and network.',
          'If a title repeatedly fails, use another game from the same category or report the problem so the listing can be reviewed.'
        ]
      },
      {
        heading:'Use category and related-game links to recover quickly',
        paragraphs:[
          'A mobile session should not end because one title is unsuitable. Category pages and related-game sections make it easier to switch to another supported title without starting discovery from scratch.'
        ]
      }
    ],
    faqs:[
      {question:'Can every browser game run on a phone?',answer:'No. Mobile support depends on the individual game and provider, so check the Mobile support field on the game page.'},
      {question:'Why do some browser games have awkward mobile controls?',answer:'Some games were designed around keyboard or mouse input and may not offer an equally comfortable touch-control layout.'},
      {question:'Do I need to install an app to play on MADGAMES.FUN?',answer:'Normal gameplay is intended to run in the browser when the selected game supports your device; a separate game app is not normally required.'}
    ],
    relatedCategories:[
      {name:'Casual',slug:'casual'},
      {name:'Puzzle',slug:'puzzle'},
      {name:'Arcade',slug:'arcade'},
      {name:'Sports',slug:'sports'}
    ]
  },
  {
    slug:'free-online-games-without-downloads',
    title:'How Free Online Games Work Without Downloads',
    description:'Understand how browser games can run without a separate game installation, what third-party providers do, and what to check before starting a game online.',
    summary:'Browser games can run directly inside a web page, so normal play may not require a separate game installation when the title and device are compatible.',
    publishedAt:'2026-08-19',
    updatedAt:'2026-08-19',
    sections:[
      {
        heading:'The game runs through the browser',
        paragraphs:[
          'A browser game is delivered through web technology rather than requiring the player to install a separate game application for normal play. The exact technology can vary between titles and providers.',
          'MADGAMES.FUN acts as a discovery and launch layer for supported browser games. A game may be embedded from a distribution partner or added when there is permission to publish it.'
        ]
      },
      {
        heading:'The provider still matters',
        paragraphs:[
          'Third-party providers can control game availability, loading behavior, in-game options and technical requirements. That means two games on the same website can behave differently even when both are browser-based.',
          'Game names, artwork and brands remain the property of their respective owners, and provider-specific terms can apply.'
        ]
      },
      {
        heading:'No download does not mean zero loading',
        paragraphs:[
          'The browser still needs to load the game assets needed for the session. Larger or more complex games may take longer than simple games, especially on slower networks or older devices.',
          'Choosing a compatible game and keeping the browser environment reasonably light can help reduce unnecessary friction.'
        ]
      },
      {
        heading:'Use game pages to check what you are opening',
        paragraphs:[
          'Before starting, review the game description, category, provider, controls when available and device-support fields. Those details help you understand the title before launching the embedded game.'
        ]
      }
    ],
    faqs:[
      {question:'What does no-download browser gaming mean?',answer:'It means normal play runs through the web browser instead of requiring a separate game application to be installed first.'},
      {question:'Can a browser game still take time to load?',answer:'Yes. The browser still needs to load game assets, and loading time can vary with the title, provider, network and device.'},
      {question:'Does MADGAMES.FUN own every game it lists?',answer:'No. Games may come from distribution partners or permitted direct listings, and each game or brand remains the property of its respective owner.'}
    ],
    relatedCategories:[
      {name:'Arcade',slug:'arcade'},
      {name:'Action',slug:'action'},
      {name:'Adventure',slug:'adventure'},
      {name:'Puzzle',slug:'puzzle'}
    ]
  },
  {
    slug:'two-player-browser-games-guide',
    title:'A Simple Guide to 2 Player Browser Games',
    description:'Learn how 2 Player browser games can work on one device, what control setups to expect and how to choose a quick local game for two people.',
    summary:'2 Player browser games are useful when two people want an immediate shared session, often on the same device and without setting up a full online multiplayer match.',
    publishedAt:'2026-08-19',
    updatedAt:'2026-08-19',
    sections:[
      {
        heading:'Same-device play is the main convenience',
        paragraphs:[
          'Many 2 Player games are designed so two people can share one keyboard or screen. Others may use alternating turns or a shared objective instead of simultaneous controls.',
          'The exact setup depends on the title, so check the game instructions and controls when they are available.'
        ]
      },
      {
        heading:'Choose between competition and cooperation',
        paragraphs:[
          'Some games are direct head-to-head challenges, while others let two players cooperate or take turns. Decide whether you want a winner-and-loser format or a shared task before picking the title.'
        ]
      },
      {
        heading:'Screen size and controls matter',
        paragraphs:[
          'A shared keyboard is usually easier on desktop, while same-screen touch controls may be more comfortable on a larger mobile device or tablet. Device support should be checked on the individual game page.',
          'If the controls feel crowded, switching to a desktop-supported 2 Player title can be more practical than forcing the same game onto a small screen.'
        ]
      },
      {
        heading:'Use related games when you want another round',
        paragraphs:[
          'After finishing one title, related-game links and the 2 Player category help you continue the session without repeating the whole discovery process.'
        ]
      }
    ],
    faqs:[
      {question:'Do 2 Player browser games need two computers?',answer:'Not always. Many are designed for two people to share one keyboard or screen, although the setup varies by title.'},
      {question:'Are 2 Player games the same as online multiplayer games?',answer:'No. 2 Player games can be local or shared-device experiences, while online multiplayer games may connect players over the internet.'},
      {question:'Can two people play on one phone?',answer:'Some titles may support shared touch controls, but a larger screen can be more comfortable. Check the individual game page for mobile support.'}
    ],
    relatedCategories:[
      {name:'2 Player',slug:'2-player'},
      {name:'Multiplayer',slug:'multiplayer'},
      {name:'Sports',slug:'sports'},
      {name:'Board',slug:'board'}
    ]
  },
  {
    slug:'action-puzzle-racing-which-game-category',
    title:'Action vs Puzzle vs Racing: Which Game Fits You?',
    description:'Compare action, puzzle and racing browser games by pace, skill type and session style so you can choose a category that matches how you want to play.',
    summary:'Action, puzzle and racing games create very different sessions: action emphasizes reaction, puzzle emphasizes decisions, and racing emphasizes control, timing and repeat improvement.',
    publishedAt:'2026-08-19',
    updatedAt:'2026-08-19',
    sections:[
      {
        heading:'Choose Action for fast reactions',
        paragraphs:[
          'Action games usually ask you to move, dodge, aim, jump or react quickly. They are a good starting point when you want immediate feedback and do not mind repeating a challenge to improve your timing.'
        ]
      },
      {
        heading:'Choose Puzzle for slower decisions',
        paragraphs:[
          'Puzzle games usually focus on logic, matching, patterns, planning or spatial reasoning. They suit players who prefer thinking through a problem rather than relying mainly on fast reflexes.'
        ]
      },
      {
        heading:'Choose Racing for control and repeat improvement',
        paragraphs:[
          'Racing games revolve around steering, speed, drifting, parking or route timing. They often reward repeated attempts as you learn a track, improve a line or reduce mistakes.'
        ]
      },
      {
        heading:'Try more than one category',
        paragraphs:[
          'Your preferred category can change with the amount of time and attention you have. A player who enjoys racing during a longer session may still prefer a quick puzzle or casual title during a short break.',
          'Use category pages as discovery hubs and individual game pages for the specific controls, device support and gameplay description.'
        ]
      }
    ],
    faqs:[
      {question:'Which category is best if I like fast gameplay?',answer:'Action and many racing games generally emphasize quicker reactions, while the exact pace still depends on the individual title.'},
      {question:'Which category is better for planning?',answer:'Puzzle games usually focus more directly on logic, patterns and decision making, while board games can also be a strong planning-focused option.'},
      {question:'Can I switch categories without creating an account?',answer:'Yes. MADGAMES.FUN does not require an account for normal catalog browsing, so you can move between categories and game pages freely.'}
    ],
    relatedCategories:[
      {name:'Action',slug:'action'},
      {name:'Puzzle',slug:'puzzle'},
      {name:'Racing',slug:'racing'},
      {name:'Board',slug:'board'}
    ]
  }
];

export function getGuide(slug:string){return guides.find(g=>g.slug===slug)}

export function getGuidesForCategory(slug:string,limit=2){
  return guides.filter(g=>g.relatedCategories.some(category=>category.slug===slug)).slice(0,limit);
}
