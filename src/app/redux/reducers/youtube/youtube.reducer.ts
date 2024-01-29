import { Action } from "@ngrx/store";
import { VideoItem } from "src/app/youtube/models/search/search-item.model";
import { AddToFavorites, RemoveFromFavorites, YoutubeAction, YoutubeActionTypes, getYoutubeSuccess } from "../../actions/youtube.action";

export const youtubeNode = 'youtube';

export interface YoutubeState {
  videos: VideoItem[];
  favorites: string[];
  favs: VideoItem[];
}

export const initialYoutubeState: YoutubeState = {
  videos: [],
  favorites: [],
  favs: [],
};

export function youtubeReducer(state = initialYoutubeState, action: YoutubeAction): YoutubeState {
  switch(action.type) {
    case YoutubeActionTypes.GET_YOUTUBE:
         return state;

    case YoutubeActionTypes.GET_YOUTUBE_SUCCESS: {
        const successAction = action as getYoutubeSuccess;
        const videos = successAction.payload.youtube;
        
        const uniqueVideos = videos.filter(newVideo => !state.videos.some(existingVideo => existingVideo.id === newVideo.id));
        
        const updatedVideos = uniqueVideos.map(newVideo => {
            const isFavorite = state.favorites.includes(newVideo.id);
            return {
            ...newVideo,
            favorite: isFavorite
            };
        });
        
        return {
            ...state,
            videos: [...state.videos, ...updatedVideos],
        };
    }
          

    case YoutubeActionTypes.CLEAR_YOUTUBE:
        return {
            ...state,
            videos: [],
        };
    case YoutubeActionTypes.ADD_TO_FAVORITES: {
        const addToFavoritesAction = action as AddToFavorites;
        const videoIdToAdd = addToFavoritesAction.payload.videoId;
        if (state.favorites.includes(videoIdToAdd)) {
          return state;
        }
        const videoToAdd = state.videos.find(video => video.id === videoIdToAdd) as VideoItem;
        const newFavs = [
          ...state.favs,
          {
            ...videoToAdd,
            favorite: true,
          },
        ];
        return {
            ...state,
            favorites: [...state.favorites, videoIdToAdd],
            favs: newFavs,
            videos: state.videos.map(video =>
                video.id === videoIdToAdd ? { ...video, favorite: true } : video
            ),
        };
      }
      
    case YoutubeActionTypes.REMOVE_FROM_FAVORITES: {
        const removeFromFavoritesAction = action as RemoveFromFavorites;
        const videoIdToRemove = removeFromFavoritesAction.payload.videoId;
        return {
            ...state,
            favorites: state.favorites.filter(videoId => videoId !== videoIdToRemove),
            favs: state.favs.filter(video => video.id !== videoIdToRemove),
            videos: state.videos.map(video =>
              video.id === videoIdToRemove ? { ...video, favorite: false } : video
            ),
        };
    }
    default:
         return state;
  }
}
