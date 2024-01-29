import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { SortService } from '../../../youtube/services/sort-service';
import { FilterService } from '../../../youtube/services/filter.service';
import { VideoItem } from '../../models/search/search-item.model';
import { Store, select } from '@ngrx/store';
import { State } from '../../../redux/reducers';
import { selectCombinedDataLength, selectPagedData } from '../../../redux/selectors/common.selectors';
import { SetCurrentPage, SetPageSize } from '../../../redux/actions/pagination.action';

import { PageStateService } from '../../services/page-state.service';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  subscription$!: Subscription;
  filteredVideoList: VideoItem[] = [];
  currentPage: number = 1;
  pageSize: number = 20;
  lengthArray: number = 0;
  totalPages: number = 0;

  constructor(
    private pageSevice: PageStateService,
    private store$: Store<State>,
    public sortService: SortService,
    public filterService: FilterService,
  ) {}

  ngOnInit() {
    this.currentPage = this.pageSevice.getCurrentPage();
    this.store$.pipe(select(selectCombinedDataLength)).subscribe((length) => {
      this.lengthArray = length;
    });
    this.subscription$ = this.store$
    .pipe(
      select(selectPagedData)
      )
    .subscribe((pagedData) => {
      this.filteredVideoList = pagedData;
      this.calculateTotalPages(this.lengthArray)
    });
  }
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.store$.dispatch(new SetCurrentPage(this.currentPage));
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.store$.dispatch(new SetPageSize(this.pageSize));
  }

  calculateTotalPages(lenghtItems:number) {
    this.totalPages = Math.ceil(lenghtItems / this.pageSize);
  }

  trackByTag = (_index: number, item: VideoItem) => item.id;

  ngOnDestroy() {
    if (this.subscription$ && !this.subscription$.closed) {
      this.subscription$.unsubscribe();
    }
  }
}
