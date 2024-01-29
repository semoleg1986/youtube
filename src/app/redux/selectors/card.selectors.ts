import { createFeatureSelector, createSelector } from "@ngrx/store";
import { cardsNode } from "../reducers/card/card.reducer";
import { AdminFormData } from "src/app/youtube/models/admin.model";
import { VideoItem } from "src/app/youtube/models/search/search-item.model";

export const selectCardsFeature = createFeatureSelector<VideoItem[]>(cardsNode);

export const selectCards = createSelector(
  selectCardsFeature,
  (state: VideoItem[]) => state
);
