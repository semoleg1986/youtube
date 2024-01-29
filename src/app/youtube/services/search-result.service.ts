import { Injectable } from '@angular/core';
import {
  BehaviorSubject, map, mergeMap, Observable, switchMap, tap,
} from 'rxjs';

import { API_URL } from '../../config/types';

import { HttpClient } from '@angular/common/http';
import { SearchItem, VideoItem } from '../models/search/search-item.model';
import { SearchResponse, VideoResponse } from '../models/search/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class SearchResultService {
  public searchQuery = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
  }

  getSearchResults(): Observable<VideoItem[]> {
    return this.searchQuery.pipe(
      mergeMap((value) => this.searchVideos(value)),
      map((items) => this.getVideoIds(items)),
      switchMap((id) => this.getVideoItems(id)),
    );
  }

  searchVideos(query: string): Observable<SearchItem[]> {
    return this.http
      .get<SearchResponse>(`${API_URL}/search?type=video&part=snippet&maxResults=30&q=${query}`)
      .pipe(map((response) => response.items));
  }

  getVideoIds(items: SearchItem[]): string {
    return items.map((item) => item.id.videoId).join(',');
  }

  getVideoItems(id: string): Observable<VideoItem[]> {
    return this.http.get<VideoResponse>(`${API_URL}/videos?part=snippet,statistics&id=${id}`)
      .pipe(map((video) => video.items));
  }

  getVideoDetailsById(id: string): Observable<VideoResponse> {
    return this.http.get<VideoResponse>(`${API_URL}/videos?part=snippet,statistics&id=${id}`);
  }
}
