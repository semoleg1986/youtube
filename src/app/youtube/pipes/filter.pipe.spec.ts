import { FilterPipe } from './filter.pipe';

import { VideoItem } from '../models/search/search-item.model';

describe('FilterPipe', () => {
  let pipe: FilterPipe;
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
    },
    {
      id: 'video2',
      snippet: {
        title: 'Another Title',
        description: 'Description 2',
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
    },
  ];

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return original list if searchText is empty', () => {
    const searchText = '';
    const filteredList = pipe.transform(videoItems, searchText);
    expect(filteredList).toEqual(videoItems);
  });

  it('should filter the list based on searchText', () => {
    const searchText = 'Sample';
    const expectedFilteredList = [
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
      },
    ];

    const filteredList = pipe.transform(videoItems, searchText);
    expect(filteredList).toEqual(expectedFilteredList);
  });

  it('should return an empty array if no matching item found', () => {
    const searchText = 'Non-existing';
    const filteredList = pipe.transform(videoItems, searchText);
    expect(filteredList).toEqual([]);
  });

});
