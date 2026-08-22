export type RobloxSearchGame = {
  universeId: string;
  rootPlaceId: string;
  name: string;
  playerCount: number;
  totalUpVotes: number;
  totalDownVotes: number;
  thumbnailUrl: string | null;
  robloxUrl: string;
};

export type RobloxGameDetail = {
  universeId: string;
  rootPlaceId: string;
  name: string;
  description: string;
  creatorName: string;
  creatorId: string | null;
  creatorType: string | null;
  playing: number;
  visits: number;
  favoritedCount: number;
  maxPlayers: number;
  genre: string;
  created: string | null;
  updated: string | null;
  thumbnailUrl: string | null;
  robloxUrl: string;
};

export type RobloxSeoCollection = {
  slug: string;
  query: string;
  title: string;
  description: string;
};

const collectionSeeds: Array<[string,string,string]> = [
  ['popular','Popular','Discover popular Roblox experiences with active player communities.'],
  ['obby','Obby','Find Roblox obstacle courses, towers, parkour challenges and escape obbies.'],
  ['tycoon','Tycoon','Browse Roblox tycoon experiences focused on building, upgrading and earning.'],
  ['simulator','Simulator','Explore Roblox simulator games across pets, training, collecting and progression.'],
  ['anime','Anime','Find Roblox experiences inspired by anime-style combat, worlds and progression.'],
  ['horror','Horror','Browse scary Roblox horror experiences, survival games and suspense adventures.'],
  ['roleplay','Roleplay','Discover Roblox roleplay experiences, cities, homes, schools and social worlds.'],
  ['racing','Racing','Find Roblox racing experiences with cars, bikes, tracks and speed challenges.'],
  ['battlegrounds','Battlegrounds','Browse Roblox battleground experiences built around competitive combat.'],
  ['fighting','Fighting','Find Roblox fighting games with melee combat, abilities and PvP action.'],
  ['shooter','Shooter','Discover Roblox shooter experiences and fast competitive action games.'],
  ['survival','Survival','Browse Roblox survival experiences with hazards, enemies and exploration.'],
  ['adventure','Adventure','Find Roblox adventure experiences with quests, worlds and exploration.'],
  ['puzzle','Puzzle','Discover Roblox puzzle experiences, logic challenges and escape rooms.'],
  ['parkour','Parkour','Find Roblox parkour courses, movement challenges and skill-based obstacle games.'],
  ['tower','Tower','Browse Roblox tower challenges, climbing games and vertical obbies.'],
  ['escape','Escape','Find Roblox escape games, prison breaks, rooms and obstacle adventures.'],
  ['scary','Scary','Discover scary Roblox games and suspense experiences for horror fans.'],
  ['zombie','Zombie','Browse Roblox zombie games with survival, combat and wave-based action.'],
  ['military','Military','Find Roblox military experiences, tactical games and army roleplay.'],
  ['car','Car','Browse Roblox car games, driving worlds, dealerships and vehicle experiences.'],
  ['driving','Driving','Find Roblox driving games with open roads, vehicles, racing and simulation.'],
  ['football','Football','Discover Roblox football experiences and competitive sports games.'],
  ['basketball','Basketball','Browse Roblox basketball games, courts and multiplayer sports experiences.'],
  ['soccer','Soccer','Find Roblox soccer experiences, teams and competitive matches.'],
  ['fashion','Fashion','Discover Roblox fashion games, dress-up experiences and runway competitions.'],
  ['avatar','Avatar','Find Roblox avatar games, outfit experiences and character customization worlds.'],
  ['pets','Pets','Browse Roblox pet games, collecting experiences and animal adventures.'],
  ['dragon','Dragon','Find Roblox dragon games with fantasy worlds, creatures and adventures.'],
  ['ninja','Ninja','Discover Roblox ninja games with combat, training and progression.'],
  ['superhero','Superhero','Browse Roblox superhero experiences with powers, combat and city adventures.'],
  ['one-piece','One Piece','Find Roblox experiences inspired by pirate anime adventures and abilities.'],
  ['naruto','Naruto','Discover Roblox ninja-anime experiences with combat and progression.'],
  ['demon-slayer','Demon Slayer','Browse Roblox demon-hunting anime experiences and combat games.'],
  ['clicker','Clicker','Find Roblox clicker games with upgrades, rebirths and progression loops.'],
  ['idle','Idle','Browse Roblox idle and incremental experiences with passive progression.'],
  ['restaurant','Restaurant','Discover Roblox restaurant games, cooking experiences and management tycoons.'],
  ['city','City','Find Roblox city experiences with driving, jobs, homes and roleplay.'],
  ['school','School','Browse Roblox school games, roleplay worlds and escape adventures.'],
  ['prison','Prison','Find Roblox prison games, escape challenges and cops-versus-criminals experiences.'],
  ['mansion','Mansion','Discover Roblox mansion experiences, luxury homes, roleplay and horror games.'],
  ['island','Island','Browse Roblox island adventures, survival worlds and exploration games.'],
  ['mining','Mining','Find Roblox mining games with resources, upgrades and exploration.'],
  ['fishing','Fishing','Discover Roblox fishing games, collecting experiences and relaxing simulators.'],
  ['farming','Farming','Browse Roblox farming experiences with crops, animals and progression.'],
  ['train','Train','Find Roblox train games, railway simulators and transport experiences.'],
  ['plane','Plane','Discover Roblox airplane games, flight simulators and aviation experiences.'],
  ['boat','Boat','Browse Roblox boat games, sailing experiences and ocean adventures.'],
  ['multiplayer','Multiplayer','Find Roblox multiplayer experiences to play with friends and other players.'],
  ['two-player','2 Player','Discover Roblox two-player and co-op experiences made for playing together.'],
  ['co-op','Co-op','Browse Roblox co-op experiences built around teamwork and shared challenges.'],
  ['speed','Speed','Find Roblox speed games, races, movement challenges and fast progression.'],
  ['monster','Monster','Discover Roblox monster games, creature survival and horror experiences.'],
  ['building','Building','Browse Roblox building games, creative sandboxes and construction experiences.'],
  ['war','War','Find Roblox war games, large battles and competitive military experiences.'],
  ['strategy','Strategy','Discover Roblox strategy experiences with planning, defense and progression.'],
  ['tower-defense','Tower Defense','Browse Roblox tower defense games with units, waves and strategy.'],
  ['detective','Detective','Find Roblox mystery and detective experiences with clues and investigation.'],
  ['mystery','Mystery','Discover Roblox mystery games, suspense adventures and social deduction.'],
  ['party','Party','Browse Roblox party games, minigames and social multiplayer experiences.']
];

export const robloxSeoCollections: RobloxSeoCollection[] = collectionSeeds.map(([slug,title,description]) => ({slug,query:title,title:`Best ${title} Roblox Games`,description}));

export function robloxSlug(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80) || 'roblox-game';
}

export function robloxGamePath(game: Pick<RobloxSearchGame,'universeId'|'name'>) {
  return `/roblox/game/${encodeURIComponent(game.universeId)}/${robloxSlug(game.name)}`;
}

function numberValue(value: unknown) {
  const n=Number(value||0);
  return Number.isFinite(n)?n:0;
}

async function fetchThumbnails(universeIds: string[]): Promise<Map<string,string>> {
  const result=new Map<string,string>();
  if(!universeIds.length)return result;
  const url=new URL('https://thumbnails.roblox.com/v1/games/icons');
  url.searchParams.set('universeIds',universeIds.slice(0,100).join(','));
  url.searchParams.set('returnPolicy','PlaceHolder');
  url.searchParams.set('size','512x512');
  url.searchParams.set('format','Png');
  url.searchParams.set('isCircular','false');
  try{
    const response=await fetch(url,{headers:{Accept:'application/json'},next:{revalidate:21600}});
    if(!response.ok)return result;
    const body=await response.json();
    for(const item of Array.isArray(body?.data)?body.data:[]){
      if(item?.targetId&&item?.imageUrl)result.set(String(item.targetId),String(item.imageUrl));
    }
  }catch{}
  return result;
}

async function rawSearch(query: string, pageToken?: string | null) {
  const url=new URL('https://apis.roblox.com/search-api/omni-search');
  url.searchParams.set('searchQuery',query.trim().slice(0,80)||'Popular');
  url.searchParams.set('sessionId','madgames-seo-directory');
  url.searchParams.set('pageType','all');
  if(pageToken)url.searchParams.set('pageToken',pageToken);
  const response=await fetch(url,{headers:{Accept:'application/json'},next:{revalidate:21600}});
  if(!response.ok)throw new Error(`Roblox search returned ${response.status}`);
  return response.json();
}

export async function fetchRobloxIndex(query: string): Promise<Array<{universeId:string;rootPlaceId:string;name:string}>> {
  try{
    const data=await rawSearch(query);
    const groups=Array.isArray(data?.searchResults)?data.searchResults:[];
    const seen=new Set<string>();
    const games:any[]=groups.flatMap((group:any)=>Array.isArray(group?.contents)?group.contents:[]);
    return games.filter(game=>game?.universeId&&game?.rootPlaceId&&game?.name).filter(game=>{
      const id=String(game.universeId);
      if(seen.has(id))return false;
      seen.add(id);return true;
    }).slice(0,40).map(game=>({universeId:String(game.universeId),rootPlaceId:String(game.rootPlaceId),name:String(game.name)}));
  }catch{return[];}
}

export async function fetchRobloxSearch(query: string): Promise<RobloxSearchGame[]> {
  try{
    const data=await rawSearch(query);
    const groups=Array.isArray(data?.searchResults)?data.searchResults:[];
    const seen=new Set<string>();
    const raw:any[]=groups.flatMap((group:any)=>Array.isArray(group?.contents)?group.contents:[]);
    const games=raw.filter(game=>game?.universeId&&game?.rootPlaceId&&game?.name).filter(game=>{
      const id=String(game.universeId);
      if(seen.has(id))return false;
      seen.add(id);return true;
    }).slice(0,40);
    const thumbs=await fetchThumbnails(games.map(game=>String(game.universeId)));
    return games.map(game=>({
      universeId:String(game.universeId),
      rootPlaceId:String(game.rootPlaceId),
      name:String(game.name),
      playerCount:numberValue(game.playerCount),
      totalUpVotes:numberValue(game.totalUpVotes),
      totalDownVotes:numberValue(game.totalDownVotes),
      thumbnailUrl:thumbs.get(String(game.universeId))||null,
      robloxUrl:`https://www.roblox.com/games/${game.rootPlaceId}`
    }));
  }catch{return[];}
}

export async function fetchRobloxGame(universeId: string): Promise<RobloxGameDetail|null> {
  if(!/^\d{1,20}$/.test(universeId))return null;
  try{
    const url=new URL('https://games.roblox.com/v1/games');
    url.searchParams.set('universeIds',universeId);
    const response=await fetch(url,{headers:{Accept:'application/json'},next:{revalidate:21600}});
    if(!response.ok)return null;
    const body=await response.json();
    const game=Array.isArray(body?.data)?body.data[0]:null;
    if(!game?.id||!game?.rootPlaceId||!game?.name)return null;
    const thumbs=await fetchThumbnails([String(game.id)]);
    return {
      universeId:String(game.id),
      rootPlaceId:String(game.rootPlaceId),
      name:String(game.name),
      description:String(game.description||''),
      creatorName:String(game.creator?.name||'Roblox creator'),
      creatorId:game.creator?.id?String(game.creator.id):null,
      creatorType:game.creator?.type?String(game.creator.type):null,
      playing:numberValue(game.playing),
      visits:numberValue(game.visits),
      favoritedCount:numberValue(game.favoritedCount),
      maxPlayers:numberValue(game.maxPlayers),
      genre:String(game.genre||'All'),
      created:game.created?String(game.created):null,
      updated:game.updated?String(game.updated):null,
      thumbnailUrl:thumbs.get(String(game.id))||null,
      robloxUrl:`https://www.roblox.com/games/${game.rootPlaceId}`
    };
  }catch{return null;}
}

export function getRobloxCollection(slug: string) {
  return robloxSeoCollections.find(item=>item.slug===slug);
}
