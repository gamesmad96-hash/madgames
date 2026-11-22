import type { Game } from './types';

const CANONICAL_CATEGORIES = [
  'Action', 'Adventure', 'Arcade', 'Board', 'Casual', 'Girls', 'Multiplayer',
  'Puzzle', 'Racing', 'Shooting', 'Sports', '2 Player'
] as const;

type CanonicalCategory = typeof CANONICAL_CATEGORIES[number];

// Hand-checked fixes for games whose provider category does not match the gameplay.
const CATEGORY_OVERRIDES: Record<string, CanonicalCategory> = {
  'head-punch-game': 'Action',
  'monster-chef': 'Casual',
  'pastry-evolution-game': 'Casual',
  'stickman-restaurant-rush-game': 'Casual',
  'fall-boys-coloring-book': 'Casual',
  'tiger-coloring-book': 'Casual',
  'pixel-car-memory-quest': 'Puzzle',
  'car-parking-game-parking-jam': 'Puzzle',
  'wolfoo-maze-adventure': 'Puzzle',
  'money-rush-game': 'Arcade',
  'oil-tanker-simulator': 'Racing',
  '3d-police-car-parking': 'Racing',
  'us-army-truck-driving': 'Racing',
  'police-car-chace': 'Racing',
  'offroad-mud-truck': 'Racing',
  'police-bus-driving': 'Racing',
  'offroad-jeep-simulation': 'Racing',
  'tuk-tuk-auto-rikshaw': 'Racing',
  'mud-truck-driving': 'Racing',
  'ramp-car-game': 'Racing',
  'offroad-truck-driving-game': 'Racing',
  'police-transport-game': 'Racing',
  'taxi-parking-driving': 'Racing',
  'oil-tanker-game': 'Racing'
};

const categoryAliases: Record<string, CanonicalCategory> = {
  action: 'Action', adventure: 'Adventure', arcade: 'Arcade', board: 'Board', casual: 'Casual',
  girls: 'Girls', girl: 'Girls', multiplayer: 'Multiplayer', puzzle: 'Puzzle', racing: 'Racing',
  race: 'Racing', shooting: 'Shooting', shooter: 'Shooting', sports: 'Sports', sport: 'Sports',
  '2 player': '2 Player', '2-player': '2 Player', 'two player': '2 Player', 'two-player': '2 Player'
};

const categoryKeywords: Array<[CanonicalCategory, string[]]> = [
  ['2 Player', ['2 player', 'two player', '2-player', 'two-player', 'versus']],
  ['Racing', ['racing', 'race', 'racer', 'car ', 'cars ', 'drift', 'driving', 'driver', 'bike', 'moto', 'motorcycle', 'parking', 'truck']],
  ['Sports', ['football', 'soccer', 'basketball', 'cricket', 'tennis', 'golf', 'baseball', 'hockey', 'penalty', 'sports', 'boxing']],
  ['Shooting', ['shooting', 'shooter', 'sniper', ' gun', 'guns', 'fps', 'weapon', 'archery']],
  ['Puzzle', ['puzzle', 'brain', 'match 3', 'match-3', 'merge', 'mahjong', 'sudoku', 'jigsaw', 'word game', 'quiz', 'tiles']],
  ['Board', ['chess', 'checkers', 'ludo', 'board game', 'backgammon', 'solitaire']],
  ['Multiplayer', ['multiplayer', 'battle royale', '.io ', ' io game', 'online arena']],
  ['Girls', ['makeover', 'make up', 'makeup', 'dress up', 'dress-up', 'fashion', 'princess', 'salon']],
  ['Adventure', ['adventure', 'quest', 'platformer', 'runner', 'running', 'escape', 'island', 'explore']],
  ['Action', ['action', 'battle', 'combat', 'fight', 'fighter', 'ninja', 'zombie', 'survival', 'warrior']],
  ['Arcade', ['arcade', 'retro', 'endless', 'high score']]
];

function cleanText(value: unknown): string {
  return String(value ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function titleFromSlug(slug: string): string {
  return cleanText(slug)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
}

function cleanTitle(title: unknown, slug: string): string {
  const value = cleanText(title);
  if (value && !/^imported game\s+\d+$/i.test(value)) return value.slice(0, 90);
  return titleFromSlug(slug).slice(0, 90) || 'Browser Game';
}

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function canonicalCategory(raw: unknown): CanonicalCategory | null {
  const parts = cleanText(raw).toLowerCase().split(/[|,;/]+/).map(v => v.trim()).filter(Boolean);
  for (const part of parts) {
    if (categoryAliases[part]) return categoryAliases[part];
  }
  return null;
}

export function inferGameCategory(title: string, description = '', rawCategory = ''): CanonicalCategory {
  const existing = canonicalCategory(rawCategory);
  if (existing) return existing;

  const haystack = ` ${cleanText(title)} ${cleanText(description)} ${cleanText(rawCategory)} `.toLowerCase();
  for (const [category, keywords] of categoryKeywords) {
    if (keywords.some(keyword => haystack.includes(keyword))) return category;
  }
  return 'Casual';
}

function ensureSentence(value: string): string {
  const text = value.trim().replace(/[.!?]+$/g, '');
  return text ? `${text}.` : '';
}

function trimAtWord(value: string, max: number): string {
  if (value.length <= max) return value;
  const cut = value.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > max * 0.65 ? lastSpace : cut.length).trim()}…`;
}

// Strip site boilerplate that older imports or templates appended to a game's own text.
const BOILERPLATE = [
  /\s*Play [^.]{1,90} instantly in your browser on MADGAMES\.FUN\.?$/i,
  /\s*[^.]{1,90} is available to play free online on desktop and supported mobile devices\.?$/i,
  /\s*Jump into [^.]{1,90} online with quick browser play and no download required\.?$/i,
  /\s*Start [^.]{1,90} free on MADGAMES\.FUN whenever you want a quick [^.]{1,40} game\.?$/i,
  /\s*Enjoy [^.]{1,90} as a free [^.]{1,40} browser game on MADGAMES\.FUN\.?$/i,
  /\s*Launch [^.]{1,90} online and get straight into this [^.]{1,40} game from your browser\.?$/i
];

function stripBoilerplate(text: string): string {
  let out = text;
  for (const re of BOILERPLATE) out = out.replace(re, '');
  return out.trim();
}

function buildDescription(title: string, category: string, original: string): string {
  const source = stripBoilerplate(cleanText(original));
  // The game's own description is shown as written; no template sentences are added.
  if (source.length >= 55) return ensureSentence(source);
  return source
    ? `${ensureSentence(source)} It is a ${category.toLowerCase()} game that runs in your web browser.`
    : `${title} is a ${category.toLowerCase()} game that runs in your web browser.`;
}

// Meta description built from the game's own text (first sentences up to ~158 chars), not a shared template.
function buildSeoDescription(title: string, description: string): string {
  const sentences = description.match(/[^.!?]+[.!?]+/g) || [description];
  let out = '';
  for (const sentence of sentences) {
    const next = `${out} ${sentence.trim()}`.trim();
    if (next.length > 158) break;
    out = next;
  }
  return out.length >= 70 ? out : trimAtWord(description || title, 158);
}

// A custom SEO description (written by hand, not an auto-generated template) is kept as-is.
function customSeoDescription(value: unknown): string | null {
  const text = cleanText(value);
  if (text.length < 70 || /MADGAMES\.FUN/i.test(text)) return null;
  return trimAtWord(text, 160);
}

function safeThumbnail(value: unknown): string | null {
  const url = cleanText(value).replaceAll('"', '');
  if (!url) return null;
  if (url.startsWith('/')) return url;
  if (url.startsWith('//')) return `https:${url}`;
  if (/^https?:\/\//i.test(url)) return url;
  return null;
}

function fallbackThumbnail(slug: string, title: string, category: string): string {
  return `/api/thumbnail/${encodeURIComponent(slug)}?title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}`;
}

function uniqueStrings(values: Array<string | null | undefined>): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const value of values) {
    const clean = cleanText(value);
    if (!clean) continue;
    const key = clean.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(clean);
  }
  return out;
}

export function enrichGameForSeo(game: Game): Game {
  const slug = cleanText(game.slug) || `game-${hash(`${game.provider}-${game.providerGameId || game.id}`)}`;
  const title = cleanTitle(game.title, slug);
  const override = CATEGORY_OVERRIDES[slug];
  const category = override || inferGameCategory(title, game.description || '', game.category || game.categories?.[0] || '');
  const description = buildDescription(title, category, game.description || '');
  const thumbnailUrl = safeThumbnail(game.thumbnailUrl) || fallbackThumbnail(slug, title, category);
  const categories = override ? [override] : uniqueStrings([category, ...(game.categories || [])]).filter(v => Boolean(canonicalCategory(v)));
  const tags = uniqueStrings([...(game.tags || []), category.toLowerCase(), 'browser-game', 'free-online-game']);

  return {
    ...game,
    title,
    slug,
    category,
    categories: categories.length ? categories : [category],
    description,
    seoDescription: customSeoDescription(game.seoDescription) || buildSeoDescription(title, description),
    thumbnailUrl,
    tags
  };
}
