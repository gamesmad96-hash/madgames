export type CategorySeoCopy={
  intro:string;
  choose:string;
  playStyle:string;
  faqs:Array<{question:string;answer:string}>;
};

const copy:Record<string,CategorySeoCopy>={
  action:{
    intro:'Action games focus on quick reactions, movement, timing and short bursts of challenge. On MADGAMES.FUN you can compare browser-based action titles, open a game page for controls and device support, and move between related games without installing a separate game app for normal play.',
    choose:'Choose an action game by the pace you want. Fast arena and shooting-style games suit quick sessions, while platform and combat games usually reward timing, movement and repeated attempts.',
    playStyle:'Action games are a good fit when you want immediate gameplay, simple goals and fast feedback from each run.',
    faqs:[
      {question:'What are action games?',answer:'Action games are built around active controls such as moving, dodging, aiming, jumping or fighting, with success usually depending on timing and reaction speed.'},
      {question:'Can I play action games in a browser?',answer:'Yes. MADGAMES.FUN lists browser-based action games; device support depends on the individual title and is shown on its game page.'},
      {question:'Do action games on MADGAMES.FUN require a download?',answer:'Normal play is designed to run in the browser when the selected game supports your device, so a separate game installation is not normally required.'}
    ]
  },
  adventure:{
    intro:'Adventure games are built around exploration, movement, objectives and progression through different situations. MADGAMES.FUN groups browser adventure titles so you can compare them, check controls and device support, and continue to related games from the same category.',
    choose:'Pick an adventure game based on the type of journey you want: obstacle courses for quick runs, exploration games for discovery, or mission-based titles when you want a clearer sequence of goals.',
    playStyle:'Adventure games work well for players who prefer exploration and progression over score-only play.',
    faqs:[
      {question:'What makes a game an adventure game?',answer:'Adventure games usually combine exploration, objectives and progression, often asking the player to move through environments, avoid hazards or complete a sequence of tasks.'},
      {question:'Are browser adventure games suitable for short sessions?',answer:'Many are. The catalog includes both quick-run and longer objective-based formats, so the best choice depends on the individual game.'},
      {question:'Can adventure games work on mobile?',answer:'Some do. Check the Mobile and Desktop support details on each game page before playing.'}
    ]
  },
  casual:{
    intro:'Casual games are designed for easy entry, clear goals and short play sessions. This category helps you find browser games that are simple to start, whether you want a quick timing challenge, a light matching game or a one-touch arcade-style session.',
    choose:'Choose a casual game by how much attention you want to give it. One-touch and score-chasing games are useful for quick breaks, while management or matching games can offer longer repeat sessions.',
    playStyle:'Casual games are useful when you want straightforward rules and minimal setup.',
    faqs:[
      {question:'What are casual games?',answer:'Casual games generally use simple rules, short learning curves and quick sessions, making them easy to start without a long tutorial.'},
      {question:'Are casual games free to play on MADGAMES.FUN?',answer:'MADGAMES.FUN focuses on free browser play. Individual third-party games may have their own in-game options or provider terms.'},
      {question:'Do casual games need powerful hardware?',answer:'Requirements vary, but many browser casual games are designed to run on common desktop or mobile devices.'}
    ]
  },
  racing:{
    intro:'Racing games center on speed, steering, drifting, timing and reaching the finish or best score. MADGAMES.FUN collects browser racing titles ranging from stunt and parking challenges to arcade-style road games.',
    choose:'Pick a racing game by the skill you want to practice: drifting for corner control, parking for precision, stunt driving for balance, or arcade racing for faster point-to-point play.',
    playStyle:'Racing games suit players who enjoy repeat attempts, improving lines and chasing faster or cleaner runs.',
    faqs:[
      {question:'What types of racing games are available?',answer:'Browser racing games can include circuit racing, drifting, stunt driving, parking challenges and traffic-based arcade games.'},
      {question:'Can I play racing games with a keyboard?',answer:'Many desktop racing games support keyboard controls, but the exact controls are listed on each game page when available.'},
      {question:'Are racing games available on mobile?',answer:'Some racing titles support touch devices. Check the device-support details on the individual game page.'}
    ]
  },
  puzzle:{
    intro:'Puzzle games focus on patterns, logic, matching, planning and problem solving. This category brings together browser puzzles that can be played in short sessions or repeated as difficulty increases.',
    choose:'Choose a puzzle game by the type of thinking you enjoy: matching for quick pattern recognition, logic puzzles for step-by-step reasoning, or merge and tile games for planning ahead.',
    playStyle:'Puzzle games are a strong choice when you want slower, decision-focused gameplay instead of reaction-heavy action.',
    faqs:[
      {question:'What are puzzle games?',answer:'Puzzle games ask you to solve a problem using logic, pattern recognition, matching, planning or spatial reasoning.'},
      {question:'Can puzzle games be played without a download?',answer:'The browser games listed on MADGAMES.FUN are intended for direct web play when supported by the selected game and device.'},
      {question:'Are puzzle games good for short sessions?',answer:'Yes. Many puzzle formats use rounds or levels that can be completed in a few minutes, while others support longer progression.'}
    ]
  },
  sports:{
    intro:'Sports games turn familiar activities such as football, basketball and cricket into quick browser challenges. They may focus on timing, aiming, scoring or simplified matches rather than full simulations.',
    choose:'Choose a sports game by whether you want a quick skill challenge or a match-style experience. Shot and timing games are easy to start, while team-style games usually involve more movement and positioning.',
    playStyle:'Sports games work well for quick competitive sessions and repeated attempts to improve a score or result.',
    faqs:[
      {question:'Which sports can I play in browser games?',answer:'The catalog can include football, basketball, cricket and other sports-inspired games as titles are added or updated.'},
      {question:'Are sports games full simulations?',answer:'Not always. Many browser sports games simplify the sport into short timing, aiming or arcade challenges.'},
      {question:'Can sports games work on phones?',answer:'Some do. Device support depends on the individual title and is shown on its game page.'}
    ]
  },
  arcade:{
    intro:'Arcade games emphasize immediate controls, short rounds, score chasing and repeat play. They are designed to get you into the main challenge quickly rather than requiring a long setup.',
    choose:'Pick an arcade game by the loop you enjoy most: survive longer, collect more, clear stages faster or beat a previous high score.',
    playStyle:'Arcade games are ideal for short sessions where the goal is easy to understand and improvement comes from repeated runs.',
    faqs:[
      {question:'What is an arcade game?',answer:'An arcade game usually has simple controls, a clear objective and repeatable rounds focused on score, survival, speed or stage completion.'},
      {question:'Are arcade games quick to start?',answer:'Usually. Their core design is typically centered on getting into gameplay quickly with minimal setup.'},
      {question:'Can arcade games be played in a browser?',answer:'Yes. MADGAMES.FUN lists browser-based arcade titles and shows device compatibility on individual game pages.'}
    ]
  },
  board:{
    intro:'Board games bring turn-based planning, familiar rules and strategic choices into the browser. Depending on the title, play may focus on classic board mechanics, quick strategy rounds or simplified digital variants.',
    choose:'Choose a board game based on how much planning you want. Fast variants are useful for short sessions, while strategy-heavy games reward thinking several moves ahead.',
    playStyle:'Board games suit players who prefer deliberate decisions over fast reflexes.',
    faqs:[
      {question:'What are browser board games?',answer:'Browser board games are digital games based on board-style rules, turns or strategic placement that run directly in a web browser.'},
      {question:'Do board games require fast reactions?',answer:'Usually less than action games. Many board games focus more on planning, positioning and decision making.'},
      {question:'Can I play board games on mobile?',answer:'Some titles support mobile browsers. Check the game page for device-support information.'}
    ]
  },
  girls:{
    intro:'This category groups styling, makeover, design and other light browser games that are commonly published under the Girls category by game distributors. The individual game page gives the clearest description of what each title actually involves.',
    choose:'Choose a title by its activity rather than the category label: styling and makeover games focus on visual choices, while hotel, cooking or design games may include light management or progression.',
    playStyle:'These games often emphasize creativity, customization and relaxed play instead of fast competition.',
    faqs:[
      {question:'What kinds of games are in the Girls category?',answer:'The category can include styling, makeover, cooking, design, hotel and other casual titles, depending on how publishers classify each game.'},
      {question:'Can anyone play games in this category?',answer:'Yes. Category names describe how games are grouped in the catalog; any player can open and play a supported title.'},
      {question:'Do these games run in a browser?',answer:'MADGAMES.FUN focuses on browser play, with device support shown on each individual game page.'}
    ]
  },
  multiplayer:{
    intro:'Multiplayer games are built around playing with or against other players, or around multiplayer-style competition. Availability can depend on the game provider, active servers and the specific title.',
    choose:'Choose a multiplayer game by how you want to compete: quick arena rounds for fast sessions, team formats for coordination, or score-based games when you want a lighter competitive loop.',
    playStyle:'Multiplayer games fit players who want competition, shared sessions or changing opponents instead of purely solo progression.',
    faqs:[
      {question:'Do all multiplayer games connect to live players?',answer:'Not necessarily. Some titles are true online multiplayer games, while others use multiplayer-style formats. The individual game description and provider determine the actual mode.'},
      {question:'Do multiplayer games need an account?',answer:'Requirements vary by game provider. MADGAMES.FUN itself does not require an account for normal browsing of the catalog.'},
      {question:'Why might a multiplayer game be unavailable?',answer:'A third-party multiplayer game can depend on provider servers, regional availability, maintenance or device compatibility.'}
    ]
  },
  shooting:{
    intro:'Shooting games focus on aiming, timing, targets and combat-style challenges. Browser shooting titles may range from simple target stages to faster action formats, with controls varying between desktop and touch devices.',
    choose:'Choose a shooting game based on pace and control style. Target-based stages reward accuracy, while faster action games may require movement and repeated aiming under pressure.',
    playStyle:'Shooting games are best for players who enjoy accuracy, reaction timing and score improvement.',
    faqs:[
      {question:'What are browser shooting games?',answer:'Browser shooting games are web-playable titles built around aiming at targets or opponents using mouse, keyboard or touch controls depending on the game.'},
      {question:'Do shooting games work on mobile?',answer:'Some do, but control quality varies by title. Check the Mobile support field on the game page.'},
      {question:'Do I need to install shooting games from MADGAMES.FUN?',answer:'Normal gameplay is intended to run in the browser when the selected title supports your device.'}
    ]
  },
  '2-player':{
    intro:'2 Player games are designed for two people to share a match or challenge, often on the same device. These games are useful when you want local competition without setting up a longer multiplayer session.',
    choose:'Choose a 2 Player game by whether you want direct competition, alternating turns or a shared challenge. Same-screen games are especially convenient for quick local play.',
    playStyle:'2 Player games work best when two people want an immediate head-to-head or cooperative session.',
    faqs:[
      {question:'What is a 2 Player game?',answer:'A 2 Player game is designed for two people to take part in the same game, either together, against each other or by taking turns.'},
      {question:'Do 2 Player games require two devices?',answer:'Not always. Many browser 2 Player games are designed for two people to share one keyboard or screen, but the exact setup depends on the title.'},
      {question:'Can 2 Player games run on mobile?',answer:'Some can, although shared-screen controls may work better on larger devices. Check the individual game page for support details.'}
    ]
  }
};

export function getCategorySeoCopy(slug:string,name:string):CategorySeoCopy{
  const lower=name.toLowerCase();
  return copy[slug]||{
    intro:`Browse free ${lower} games on MADGAMES.FUN, compare titles, check gameplay details and open supported games directly in your browser.`,
    choose:`Choose a ${lower} game by reading its description, checking device support and opening related titles from the same category.`,
    playStyle:`This category is updated as suitable ${lower} games are added, changed or removed from the catalog.`,
    faqs:[
      {question:`What are ${lower} games?`,answer:`${name} games are titles grouped in the ${name} category by their gameplay style or publisher classification.`},
      {question:`Can I play ${lower} games in a browser?`,answer:`MADGAMES.FUN focuses on browser-based play. Support depends on the individual game and device.`},
      {question:`How do I choose a ${lower} game?`,answer:'Open a game page to compare its description, controls, provider and mobile or desktop support before playing.'}
    ]
  };
}
