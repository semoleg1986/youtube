import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchResultService } from '../../services/search-result.service';
import { VideoItem } from '../../models/search/search-item.model';
import { Store, select } from '@ngrx/store';
import { selectCombinedDataById } from 'src/app/redux/selectors/common.selectors';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  private subscription: Subscription | undefined;

  id = '';

  videoItem: VideoItem | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<VideoItem>,
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
  
      this.store$.pipe(select(selectCombinedDataById(this.id))).subscribe((video) => {
        this.videoItem = video;
      });
      if (!this.videoItem) {
        this.router.navigate(['not-found']); 
      }
    });
  }
  
}
