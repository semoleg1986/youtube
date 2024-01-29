import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { SearchResultService } from 'src/app/youtube/services/search-result.service';
import { YoutubeActionTypes, clearYoutubeSuccess, getYoutubeFailure, getYoutubeSuccess } from '../actions/youtube.action';

@Injectable()
export class YoutubeEffects {

  constructor(
    private actions$: Actions,
    private youtubeService: SearchResultService,
  ) {}

  getYoutube$ = createEffect(() =>
    this.actions$.pipe(
      ofType(YoutubeActionTypes.GET_YOUTUBE),
      mergeMap(() =>
        this.youtubeService.getSearchResults().pipe(
          map(youtube => new getYoutubeSuccess({ youtube })),
          catchError(error => of(new getYoutubeFailure({ error })))
        )
      )
    )
  );
  clearYoutube$ = createEffect(() =>
  this.actions$.pipe(
    ofType(YoutubeActionTypes.CLEAR_YOUTUBE),
    map(() => new clearYoutubeSuccess())
  )
);

}
