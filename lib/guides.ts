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
  },
  {
    slug:"how-to-download-and-play-roblox-games",
    title:"How to Download and Play Roblox Games on Any Device",
    description:"Roblox games have no separate download. Learn how to install the free Roblox app on phone, tablet, PC, Mac or console, sign in and open any Roblox game safely.",
    summary:"Individual Roblox games are not downloaded one by one. You install the free Roblox app once, sign in, and then every Roblox experience opens inside it.",
    publishedAt:"2026-11-09",
    updatedAt:"2026-11-09",
    sections:[
      {
        heading:"Why there is no separate download for each Roblox game",
        paragraphs:[
          "Every Roblox game, such as a driving roleplay or an obby, is an experience that runs inside the Roblox platform. Searching for a download of one specific game usually leads to unofficial files, which are unnecessary and can be unsafe.",
          "The safe way to play any Roblox game is to install the official Roblox app once. After that, you can open any experience from the official Roblox website, the app itself or a game's official play link."
        ]
      },
      {
        heading:"Install Roblox on your device",
        paragraphs:[
          "Roblox is free to install. Use the official store for your device so you always get the genuine app and automatic updates."
        ],
        bullets:[
          "Android phones and tablets: install Roblox from the Google Play Store.",
          "iPhone and iPad: install Roblox from the Apple App Store.",
          "Windows PC or Mac: open the official Roblox website, choose a game and press Play. The site prompts you to install the Roblox app if it is not already installed.",
          "Consoles: Roblox is available from the official store on supported Xbox and PlayStation consoles.",
          "Chromebooks: on models that support Android apps, install Roblox from the Google Play Store."
        ]
      },
      {
        heading:"Sign in and open a game",
        paragraphs:[
          "Create a free Roblox account or sign in with your existing one. Then search for the game by name inside the app, or use the official play link shown on a MADGAMES.FUN Roblox game page. The link opens the game's official Roblox page, where the Play button launches it in the app.",
          "Popular games can have similar-looking copies. Before playing, check that the creator name and visit count match the game you were looking for."
        ]
      },
      {
        heading:"Stay safe while playing",
        paragraphs:[
          "Only enter your Roblox password on the official Roblox app or website. No real game, code or giveaway needs your password, and sites that promise free Robux in exchange for logging in are scams.",
          "Parents can use Roblox's built-in parental controls and account settings to manage chat, spending and content options for younger players."
        ]
      }
    ],
    faqs:[
      {question:"Can I download a single Roblox game?",answer:"No. Roblox games run inside the Roblox app. Install the free Roblox app once and you can open any Roblox game from it."},
      {question:"Is Roblox free to download?",answer:"Yes. The Roblox app is free on supported phones, tablets, computers and consoles. Some games offer optional in-game purchases."},
      {question:"Can I play Roblox games without installing anything?",answer:"Roblox games are designed to run in the Roblox app, so on most devices you need to install it first. Browser games on MADGAMES.FUN are different and run directly in your browser."}
    ],
    relatedCategories:[
      {name:"Adventure",slug:"adventure"},
      {name:"Multiplayer",slug:"multiplayer"},
      {name:"Racing",slug:"racing"},
      {name:"Casual",slug:"casual"}
    ]
  },
  {
    slug:"how-to-find-and-redeem-roblox-game-codes",
    title:"How to Find and Redeem Roblox Game Codes",
    description:"Learn where Roblox game creators post codes, how to redeem them inside a game, how they differ from Roblox promo codes and gift cards, and how to avoid code scams.",
    summary:"Most Roblox game codes are posted by each game's creator and redeemed inside that game. Roblox promo codes and gift cards are different and are redeemed on Roblox's official website.",
    publishedAt:"2026-11-09",
    updatedAt:"2026-11-09",
    sections:[
      {
        heading:"Game codes and Roblox codes are not the same thing",
        paragraphs:[
          "Game codes are created by the developer of a specific Roblox game. They give rewards that only work in that game, such as in-game currency, boosts or items, and are usually limited in time.",
          "Roblox gift cards and Roblox promo codes come from Roblox itself. They are redeemed on the official Roblox website, not inside an individual game, and are never shared through unofficial generator tools."
        ]
      },
      {
        heading:"Where to find codes for a Roblox game",
        paragraphs:[
          "Creators decide whether a game has codes at all, so many games have none. When codes exist, they are usually announced in places controlled by the creator."
        ],
        bullets:[
          "The game's description on its official Roblox page.",
          "The creator's Roblox group page and its announcements.",
          "The game's official social channels or community server, if the description links to them.",
          "Update notes or messages shown inside the game itself."
        ]
      },
      {
        heading:"How to redeem a code inside a game",
        paragraphs:[
          "Open the game in Roblox and look for a button labelled Codes, Redeem or a similar icon, often in the shop, settings or side menu. Type the code exactly as it was posted, because many games treat upper and lower case letters differently, then confirm.",
          "If a code does not work, it may have expired, been typed incorrectly or require a certain level. Check the creator's latest announcement for current codes."
        ]
      },
      {
        heading:"How to spot a code scam",
        paragraphs:[
          "Real codes never ask for your Roblox password, a download or a survey. Be careful with sites or videos that promise free Robux, unlimited codes or code generators, because these are common scams designed to steal accounts."
        ]
      }
    ],
    faqs:[
      {question:"Does every Roblox game have codes?",answer:"No. Codes are optional and up to each game's creator, so many games never release any."},
      {question:"Why is my Roblox game code not working?",answer:"The code may have expired, been typed with the wrong capital letters, or need a certain level. Check the creator's latest announcement for codes that are still active."},
      {question:"Where do I redeem a Roblox gift card?",answer:"Gift cards are redeemed on the official Roblox website's redeem page while signed in to your account, not inside a game."}
    ],
    relatedCategories:[
      {name:"Adventure",slug:"adventure"},
      {name:"Action",slug:"action"},
      {name:"Multiplayer",slug:"multiplayer"},
      {name:"Arcade",slug:"arcade"}
    ]
  },
  {
    slug:"how-to-find-good-roblox-games",
    title:"How to Find Good Roblox Games Worth Playing",
    description:"A practical guide to finding active, well-made Roblox games using player counts, visits, update dates, creators and play style, plus how to avoid copies.",
    summary:"Good Roblox games usually combine steady player activity, recent updates and a clear play style. Comparing a few simple signals helps you skip copies and inactive games.",
    publishedAt:"2026-11-09",
    updatedAt:"2026-11-09",
    sections:[
      {
        heading:"Start with the play style you want",
        paragraphs:[
          "Roblox covers almost every genre: obbies, roleplay, racing, tycoons, simulators, horror and more. Decide what kind of session you want first, then browse that genre instead of scrolling the whole platform.",
          "The Roblox collections on MADGAMES.FUN group games by play style, so you can compare several active games of one type side by side."
        ]
      },
      {
        heading:"Check activity and visits",
        paragraphs:[
          "Current players show whether people are playing right now, while total visits show how popular a game has been over time. A game with steady activity is more likely to have full servers and an active community.",
          "A sudden spike can come from a short trend, so compare activity on a few different days if you want something that lasts."
        ]
      },
      {
        heading:"Look at updates and the creator",
        paragraphs:[
          "A recent update date suggests the creator is still fixing bugs and adding content. The creator name also matters: popular games often have copies, so check that the creator matches the game you heard about."
        ]
      },
      {
        heading:"Use game pages before you launch",
        paragraphs:[
          "Each Roblox game page on MADGAMES.FUN shows the creator, live players, visits, favorites and update date, along with similar games. Use these details to choose quickly, then open the official Roblox play link."
        ]
      }
    ],
    faqs:[
      {question:"How can I tell if a Roblox game is a copy?",answer:"Compare the creator name, visit count and favorites with the game you were looking for. Copies usually have far fewer visits and a different creator."},
      {question:"What makes a Roblox game worth playing?",answer:"Steady player activity, recent updates and a play style you enjoy are the most useful signs."},
      {question:"Where can I compare Roblox games?",answer:"Use the Roblox section on MADGAMES.FUN to browse collections and open game pages with live activity and the official play link."}
    ],
    relatedCategories:[
      {name:"Adventure",slug:"adventure"},
      {name:"Multiplayer",slug:"multiplayer"},
      {name:"Action",slug:"action"},
      {name:"Racing",slug:"racing"}
    ]
  }
];


export function getGuide(slug:string){return guides.find(g=>g.slug===slug)}

export function getGuidesForCategory(slug:string,limit=2){
  return guides.filter(g=>g.relatedCategories.some(category=>category.slug===slug)).slice(0,limit);
}
