import { Pipe, PipeTransform } from '@angular/core';
import { SortingField, SortingOrder } from 'src/app/youtube/services/sort-service';
import { VideoItem } from '../models/search/search-item.model';

@Pipe({
  name: 'sort',
})
export class SortingPipe implements PipeTransform {
  private cachedResults = new Map<string, VideoItem[]>();

  transform(value: VideoItem[], currentField: SortingField, currentOrder: SortingOrder): VideoItem[] {
    const cacheKey = this.generateCacheKey(value, currentField, currentOrder);
    if (this.cachedResults.has(cacheKey)) {
      return this.cachedResults.get(cacheKey) as VideoItem[];
    }
    const sortedArray = this.sort([...value], currentField, currentOrder);
    if (!this.cachedResults.has(cacheKey)) {
      this.cachedResults.set(cacheKey, sortedArray);
    }
    return sortedArray;
  }

  generateCacheKey(value: VideoItem[], currentField: SortingField, currentOrder: SortingOrder): string {
    return JSON.stringify({ value, currentField, currentOrder });
  }

  private sort(value: VideoItem[], currentField: SortingField, currentOrder: SortingOrder): VideoItem[] {
    return value.slice().sort((a, b) => {
      const firstValue = this.getSortingValue(a, currentField);
      const secondValue = this.getSortingValue(b, currentField);
      return currentOrder === 'asc' ? firstValue - secondValue : secondValue - firstValue;
    });
  }

  private getSortingValue(item: VideoItem, currentField: SortingField): number {
    if (currentField === 'date') {
      return item.snippet?.publishedAt ? new Date(item.snippet.publishedAt).getTime() : 0;
    }
    return item.statistics && item.statistics.viewCount ? Number(item.statistics.viewCount) : 0;
  }
  
  
}
