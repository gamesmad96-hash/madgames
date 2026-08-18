export type GameStatus = 'draft' | 'pending' | 'published' | 'disabled';

export type Game = {
  id: string;
  provider: string;
  providerGameId?: string | null;
  title: string;
  slug: string;
  description: string;
  seoDescription?: string | null;
  instructions?: string | null;
  controls?: string | null;
  embedUrl?: string | null;
  thumbnailUrl?: string | null;
  screenshots?: string[];
  category: string;
  categories?: string[];
  tags?: string[];
  mobileSupported?: boolean;
  desktopSupported?: boolean;
  width?: number | null;
  height?: number | null;
  orientation?: string | null;
  language?: string | null;
  status: GameStatus;
  featured?: boolean;
  trending?: boolean;
  badge?: string | null;
  emoji?: string;
  gradient?: string;
  publishedAt?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
};

export type Category = {
  id?: string;
  name: string;
  slug: string;
  description?: string | null;
  seoTitle?: string | null;
  enabled?: boolean;
  sortOrder?: number;
};
