import type {Game} from './types';

function gameTimestamp(game:Game){
  for(const value of [game.publishedAt,game.updatedAt,game.createdAt]){
    if(!value)continue;
    const time=new Date(value).getTime();
    if(!Number.isNaN(time))return time;
  }
  return 0;
}

export function sortNewest(games:Game[]){
  return [...games].sort((a,b)=>gameTimestamp(b)-gameTimestamp(a));
}

export function sortHot(games:Game[]){
  return [...games].sort((a,b)=>{
    const trend=Number(Boolean(b.trending))-Number(Boolean(a.trending));
    if(trend)return trend;
    const featured=Number(Boolean(b.featured))-Number(Boolean(a.featured));
    if(featured)return featured;
    return gameTimestamp(b)-gameTimestamp(a);
  });
}
