import { cardsReducer } from './card.reducer';
import { addCard, deleteCard } from '../../actions/card.action';
import { VideoItem } from 'src/app/youtube/models/search/search-item.model';

describe('Cards Reducer', () => {
  const initialState: VideoItem[] = [];

  it('should return the initial state', () => {
    const action = {} as any;
    const state = cardsReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle CREATE_CARD action', () => {
    const newCard: VideoItem = {
        id: '1',
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
    const createAction = new addCard({ card: newCard });
    const state = cardsReducer(initialState, createAction);
    expect(state).toEqual([...initialState, newCard]);
  });

  it('should handle DELETE_CARD action', () => {
    const existingCard: VideoItem = {
        id: '1',
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
    const action = new addCard({ card: existingCard });
    const intermediateState = cardsReducer(initialState, action);

    const deleteAction = new deleteCard({ videoId: existingCard.id });
    const finalState = cardsReducer(intermediateState, deleteAction);

    expect(finalState).toEqual(initialState);
  });

  it('should handle unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' } as any;
    const state = cardsReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
