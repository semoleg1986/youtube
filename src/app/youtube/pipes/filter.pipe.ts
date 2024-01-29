import { Pipe, PipeTransform } from '@angular/core';
import { VideoItem } from '../models/search/search-item.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: VideoItem[], searchText?: string): VideoItem[] {
    if (searchText) {
      return this.filter(items, searchText);
    }
    return items;
  }

  private filter = (items: VideoItem[], searchText: string) => {
    const searchLower = searchText.toLowerCase();
    const filteredItems: VideoItem[] = [];

    for (const item of items) {
      if (item.snippet.title.toLowerCase().includes(searchLower)) {
        filteredItems.push(item);
      }
    }

    return filteredItems;
  };
}
