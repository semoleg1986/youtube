import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { VideoItem } from '../../models/search/search-item.model';
import { Store, select } from '@ngrx/store';

import { deleteCard } from '../../../redux/actions/card.action';
import { PageStateService } from '../../services/page-state.service';
import { selectCurrentPage } from '../../../redux/selectors/common.selectors';
import { State } from '../../../redux/reducers';
import { AddToFavorites, RemoveFromFavorites } from '../../../redux/actions/youtube.action';


@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  @Input() videoItem!: VideoItem;

  currentPage: number = 0;

  constructor(
    private pageService: PageStateService,
    private router: Router,
    private store$: Store<State>,
    ) {
      this.store$.pipe(select(selectCurrentPage)).subscribe((pageService) => {
        this.currentPage = pageService;
      });
    }

  detailPageById(videoId: string) {
    this.pageService.setCurrentPage(this.currentPage);
    this.router.navigate(['youtube', videoId]);
  }
  deleteCards(videoId: string) {
    this.store$.dispatch(new deleteCard({videoId}))
  }
  addToFavorites(videoId: string) {
    this.store$.dispatch(new AddToFavorites({videoId}));
  }
  removeFromFavorites(videoId: string) {
    this.store$.dispatch(new RemoveFromFavorites({videoId}));
  }
  toggleFavorites(item: VideoItem): void {
    const videoId = item.id;
    if (!item.favorite) {
        this.addToFavorites(videoId)
    } else {
        this.removeFromFavorites(videoId)
    }
}
}
