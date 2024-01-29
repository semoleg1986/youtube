import { SortingPipe } from './sort.pipe';

import { SortingField, SortingOrder } from 'src/app/youtube/services/sort-service';
import { VideoItem } from '../models/search/search-item.model';

describe('SortingPipe', () => {
  let pipe: SortingPipe;
  const videoItems: VideoItem[] = [
    {
      id: 'video1',
      snippet: {
        title: 'Sample Title 1',
        description: 'Description 1',
        publishedAt: '2023-11-30',
        tags: [],
        thumbnails: {
            default: {
              url: 'example-url', 
              width: 120,
              height: 90
            },
            medium: {
              url: 'example-url', 
              width: 320,
              height: 180 
            },
            high: {
              url: 'example-url', 
              width: 480, 
              height: 360
            },
            standard: {
              url: 'example-url', 
              width: 640,
              height: 480 
            },
            maxres: {
              url: 'example-url', 
              width: 1280, 
              height: 720 
            }
          }, 
      },
      statistics: {
        viewCount: '100',
        likeCount: '100',
        dislikeCount: '100',
        commentCount: '100',
        favoriteCount: '100'
      },
    },
    {
      id: 'video2',
      snippet: {
        title: 'Sample Title 1',
        description: 'Description 1',
        publishedAt: '2023-11-30',
        tags: [],
        thumbnails: {
            default: {
              url: 'example-url', 
              width: 120,
              height: 90
            },
            medium: {
              url: 'example-url', 
              width: 320,
              height: 180 
            },
            high: {
              url: 'example-url', 
              width: 480, 
              height: 360
            },
            standard: {
              url: 'example-url', 
              width: 640,
              height: 480 
            },
            maxres: {
              url: 'example-url', 
              width: 1280, 
              height: 720 
            }
          }, 
      },
      statistics: {
        viewCount: '100',
        likeCount: '100',
        dislikeCount: '100',
        commentCount: '100',
        favoriteCount: '100'
      },
    },
  ];

  beforeEach(() => {
    pipe = new SortingPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort videos by date in ascending order', () => {
    const currentField: SortingField = 'date';
    const currentOrder: SortingOrder = 'asc';
    const sortedList = pipe.transform(videoItems, currentField, currentOrder);

    expect(sortedList[0].id).toEqual('video1');
    expect(sortedList[1].id).toEqual('video2');
  });

  it('should return the original list if no sorting field is provided', () => {
    const currentField: SortingField = '';
    const currentOrder: SortingOrder = 'asc';
    const unsortedList = pipe.transform(videoItems, currentField, currentOrder);

    expect(unsortedList).toEqual(videoItems);
  });

});
