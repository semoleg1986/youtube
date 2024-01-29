import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,


  MetaReducer
} from '@ngrx/store';
import { cardsNode, cardsReducer } from './card/card.reducer';

import { VideoItem } from 'src/app/youtube/models/search/search-item.model';
import { youtubeNode, youtubeReducer, YoutubeState } from './youtube/youtube.reducer';
import { paginationReducer, PaginationState } from './pagination/pagination.reduce';

export interface State {
  pagination: PaginationState;
  [cardsNode]: VideoItem[];
  [youtubeNode]: YoutubeState;
}

export const reducers: ActionReducerMap<State> = {
  pagination: paginationReducer,
  [cardsNode]: cardsReducer as ActionReducer<VideoItem[]>,
  [youtubeNode]: youtubeReducer as ActionReducer<YoutubeState>,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
