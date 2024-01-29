import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from 'src/app/redux/reducers'; 
import { VideoItem } from 'src/app/youtube/models/search/search-item.model';
import { cardsNode } from '../reducers/card/card.reducer';
import { youtubeNode } from '../reducers/youtube/youtube.reducer';

const selectCardsState = createFeatureSelector<VideoItem[]>(cardsNode);
const selectYoutubeState = createFeatureSelector<{ videos: VideoItem[] }>(youtubeNode);
const selectFavsState = createFeatureSelector<{ favs: VideoItem[] }>(youtubeNode);
const selectFavoriteState = createFeatureSelector<{ favorites: VideoItem[]}>(youtubeNode);
const selectPagination = (state: State) => state.pagination;

export const selectCards = createSelector(
    selectCardsState,
    (state: VideoItem[]) => state
);

export const selectYoutube = createSelector(
    selectYoutubeState,
    (state) => state.videos
);

export const selectFavs = createSelector(
    selectFavsState,
    (state) => state.favs
);

export const selectCombinedData = createSelector(
    selectCards,
    selectYoutube,
    (cardsData, youtubeData) => {
        return [...cardsData, ...youtubeData];
    }
);
export const selectPageSize = createSelector(
    selectPagination,
    (pagination) => pagination.pageSize
  );
  
export const selectCurrentPage = createSelector(
    selectPagination,
    (pagination) => pagination.currentPage
  );
  
export const selectPagedData = createSelector(
    selectCombinedData,
    selectPageSize,
    selectCurrentPage,
    (combinedData, pageSize, currentPage) => {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return combinedData.slice(startIndex, endIndex);
    }
  );

export const selectCombinedDataById = (id: string) => createSelector(
    selectCombinedData,
    (combinedData) => combinedData.find((item) => item.id === id)
  );
  
export const selectCombinedDataLength = createSelector(
  selectCombinedData,
  (combinedData) => combinedData.length
);