import { createFeatureSelector, createSelector } from "@ngrx/store";

import { VideoItem } from "youtube/src/app/youtube/models/search/search-item.model";

import { youtubeNode } from "../reducers/youtube/youtube.reducer";

export const selectYoutubeFeature = createFeatureSelector<VideoItem[]>(youtubeNode);

export const selectYoutube = createSelector(
    selectYoutubeFeature,
    (state: VideoItem[]) => state
);
export const selectYoutubeCurrent = createSelector(
    selectYoutubeFeature,
    (state: VideoItem[]) => state
);