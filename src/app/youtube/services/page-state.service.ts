import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageStateService {
  currentPage: number = 1;

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  getCurrentPage() {
    return this.currentPage;
  }
}
