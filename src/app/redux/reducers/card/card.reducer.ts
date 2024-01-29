import { AdminActionTypes, CardAction } from "../../actions/card.action";
import { VideoItem } from "src/app/youtube/models/search/search-item.model";

export const cardsNode = 'cards'

export const initialCardsState: VideoItem[] = [];

export function cardsReducer(state = initialCardsState, action: CardAction): VideoItem[] {
    switch(action.type) {
        case AdminActionTypes.CREATE_CARD:
            return [...state, action.payload.card];
        case AdminActionTypes.DELETE_CARD:
            return state.filter(item => item.id !== action.payload.videoId); 
        default:
          return state;
    }
}