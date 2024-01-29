import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddToFavorites, RemoveFromFavorites } from '../../../redux/actions/youtube.action';
import { State } from '../../../redux/reducers';
import { VideoItem } from '../../../youtube/models/search/search-item.model';

@Component({
  selector: 'app-favs-item',
  templateUrl: './favs-item.component.html',
  styleUrls: ['./favs-item.component.scss']
})
export class FavsItemComponent {
  @Input() videoItem!: VideoItem;

  constructor(
    private router: Router,
    private store$: Store<State>,
    ) {}
  detailPageById(videoId: string) {
    this.router.navigate(['youtube', videoId]);
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
