import { Action } from "@ngrx/store";
import { VideoItem } from "src/app/youtube/models/search/search-item.model";

export enum YoutubeActionTypes {
    GET_YOUTUBE = '[Youtube] Get videos',
    GET_YOUTUBE_SUCCESS = '[Youtube] Get videos success',
    GET_YOUTUBE_FAILURE = '[Youtube] Get videos failure',
    CLEAR_YOUTUBE = '[Youtube] Clear videos',
    CLEAR_YOUTUBE_SUCCESS = '[Youtube] Clear videos success',
    ADD_TO_FAVORITES = '[Youtube] Add to Favorites',
    REMOVE_FROM_FAVORITES = '[Youtube] Remove from Favorites',
}

export class getYoutube implements Action {
    readonly type = YoutubeActionTypes.GET_YOUTUBE;
}
export class getYoutubeSuccess implements Action {
    readonly type = YoutubeActionTypes.GET_YOUTUBE_SUCCESS;
    constructor(public payload: { youtube: VideoItem[] }) {}
}
export class getYoutubeFailure implements Action {
    readonly type = YoutubeActionTypes.GET_YOUTUBE_FAILURE;
    constructor(public payload: { error: Error }) {}
}
export class clearYoutube implements Action {
    readonly type = YoutubeActionTypes.CLEAR_YOUTUBE;
}

export class clearYoutubeSuccess implements Action {
  readonly type = YoutubeActionTypes.CLEAR_YOUTUBE_SUCCESS;
}

export class AddToFavorites implements Action {
    readonly type = YoutubeActionTypes.ADD_TO_FAVORITES;
    constructor(public payload: { videoId: string }) {}
}
  
export class RemoveFromFavorites implements Action {
    readonly type = YoutubeActionTypes.REMOVE_FROM_FAVORITES;
    constructor(public payload: { videoId: string }) {}
}


export type YoutubeAction = getYoutube | getYoutubeSuccess | getYoutubeFailure | clearYoutube | clearYoutubeSuccess | AddToFavorites | RemoveFromFavorites;