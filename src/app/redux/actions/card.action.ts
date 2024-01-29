import { Action } from '@ngrx/store';
import { VideoItem } from 'src/app/youtube/models/search/search-item.model';

export enum AdminActionTypes {
    CREATE_CARD = '[Admin] Add Card',
    DELETE_CARD = '[Admin] Delete Card',
  }

export class addCard implements Action {
    readonly type = AdminActionTypes.CREATE_CARD;
    constructor(public payload: { card: VideoItem }) {}
}

export class deleteCard implements Action {
    readonly type = AdminActionTypes.DELETE_CARD;
    constructor(public payload: { videoId: string }) {}
}

export type CardAction = addCard | deleteCard;