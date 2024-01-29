import { youtubeReducer } from './youtube.reducer';
import {
  AddToFavorites,
  RemoveFromFavorites,
  YoutubeActionTypes,
  getYoutubeSuccess,
} from '../../actions/youtube.action';
import { initialYoutubeState, YoutubeState } from './youtube.reducer';
import { VideoItem } from 'src/app/youtube/models/search/search-item.model';

describe('Youtube Reducer', () => {
  let initialState: YoutubeState;

  beforeEach(() => {
    initialState = {
      videos: [],
      favorites: [],
      favs: [],
    };
  });

  it('should return the initial state', () => {
    const action = {} as any;
    const state = youtubeReducer(undefined, action);
    expect(state).toEqual(initialState);
  });


  it('should handle ADD_TO_FAVORITES action', () => {
    const existingVideo: VideoItem = {
      id: 'UCDVYQ4Zhbm3S2dlz7P1GBDg',
      snippet: {
        publishedAt: '2023-11-30', 
        title: 'Example Title', 
        description: 'Example Description', 
        thumbnails: {
            default: {
              url: 'example-url', 
              width: 120,
              height: 90
            },
            medium: {
              url: 'example-url', 
              width: 320,
              height: 180 
            },
            high: {
              url: 'example-url', 
              width: 480, 
              height: 360
            },
            standard: {
              url: 'example-url', 
              width: 640,
              height: 480 
            },
            maxres: {
              url: 'example-url', 
              width: 1280, 
              height: 720 
            }
          }, 
        tags: [] 
      },

    };

    const action = new AddToFavorites({ videoId: existingVideo.id });
    const state = youtubeReducer(
      { ...initialState, videos: [existingVideo] },
      action
    );

    expect(state.favorites).toEqual([existingVideo.id]);
    expect(state.favs).toEqual([{ ...existingVideo, favorite: true }]);
    expect(state.videos[0].favorite).toBe(true);
  });

  it('should handle REMOVE_FROM_FAVORITES action', () => {
    const existingVideo: VideoItem = {
      id: 'UCDVYQ4Zhbm3S2dlz7P1GBDg',
      favorite: true,
      snippet: {
        publishedAt: '2023-11-30', 
        title: 'Example Title', 
        description: 'Example Description', 
        thumbnails: {
            default: {
              url: 'example-url', 
              width: 120,
              height: 90
            },
            medium: {
              url: 'example-url', 
              width: 320,
              height: 180 
            },
            high: {
              url: 'example-url', 
              width: 480, 
              height: 360
            },
            standard: {
              url: 'example-url', 
              width: 640,
              height: 480 
            },
            maxres: {
              url: 'example-url', 
              width: 1280, 
              height: 720 
            }
          }, 
        tags: [] 
      },
    };

    const action = new RemoveFromFavorites({ videoId: existingVideo.id });
    const state = youtubeReducer(
      { ...initialState, videos: [existingVideo], favorites: [existingVideo.id] },
      action
    );

    expect(state.favorites).toEqual([]);
    expect(state.favs).toEqual([]);
    expect(state.videos[0].favorite).toBe(false);
  });
});
