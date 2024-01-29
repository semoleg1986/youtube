import { Component } from '@angular/core';

import { FilterService } from '../../../youtube/services/filter.service';
import { SortService } from '../../../youtube/services/sort-service';


@Component({
  selector: 'app-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrls: ['./filter-block.component.scss'],
})
export class FilterBlockComponent {
  constructor(
    public sortService: SortService,
    public filterService: FilterService,
  ) {}

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      console.log('Enter key was pressed');
    }
  }
}
