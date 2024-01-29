import { SearchItem, VideoItem } from './search-item.model';

export interface SearchResponse {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: SearchItem[];
}

export interface VideoResponse extends Omit<SearchResponse, 'items'> {
  items: VideoItem[];
}
