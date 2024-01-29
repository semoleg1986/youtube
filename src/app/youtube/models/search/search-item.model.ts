export interface SearchItem {
  kind?: string;
  etag?: string;
  id: VideoId;
  snippet: Snippet;
  statistics?: Statistics;
}

export interface VideoItem extends Omit<SearchItem, 'id'> {
  id: string;
  custom?: boolean;
  favorite?: boolean;
}

export interface VideoId {
  kind: string;
  videoId: string;
}

export type Snippet = {
  publishedAt: string;
  channelId?: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle?: string;
  tags: string[];
  categoryId?: string;
  liveBroadcastContent?: string;
  defaultLanguage?: string;
  localized?: {
    title: string;
    description: string;
  };
  defaultAudioLanguage?: string;
};

export type Statistics = {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
};

export type Thumbnails = {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard: Thumbnail;
  maxres: Thumbnail;
};

export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};
