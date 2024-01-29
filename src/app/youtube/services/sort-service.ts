import { Injectable } from '@angular/core';
import { SORTORDER, SORTVALUE } from '../../config/types';

export type SortingField = SORTVALUE;
export type SortingOrder = SORTORDER;

@Injectable({
  providedIn: 'root',
})
export class SortService {
  currentField: SortingField = '';

  currentOrder: SortingOrder = 'asc';

  updateSortByDate(event: Event) {
    event.preventDefault();
    this.currentField = 'date';
    this.currentOrder = this.currentOrder === 'asc' ? 'desc' : 'asc';
  }

  updateSortByViews(event: Event) {
    event.preventDefault();
    this.currentField = 'views';
    this.currentOrder = this.currentOrder === 'asc' ? 'desc' : 'asc';
  }

  getCurrentSortOrder(): SortingOrder {
    return this.currentOrder;
  }
}
