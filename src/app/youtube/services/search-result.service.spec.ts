
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SearchResultService } from './search-result.service';
import { API_URL } from '../../config/types';
import { SearchResponse, VideoResponse } from '../models/search/search-response.model';
import { SearchItem, VideoItem } from '../models/search/search-item.model';

describe('SearchResultService', () => {
  let service: SearchResultService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchResultService],
    });
    service = TestBed.inject(SearchResultService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('should retrieve video items IDs', () => {
    const mockItems: SearchItem[] = [
      { id: { videoId: 'videoId1' }, snippet: {} } as SearchItem,
      { id: { videoId: 'videoId2' }, snippet: {} } as SearchItem,
    ];

    const videoIds = service.getVideoIds(mockItems);
    expect(videoIds).toEqual('videoId1,videoId2');
  });

  it('should fetch search results', () => {
    const mockQuery = 'test';
    const mockSearchResponse: SearchResponse = {
        kind: 'youtube#searchListResponse',
        etag: 'some_etag_value',
        pageInfo: {
          totalResults: 1,
          resultsPerPage: 10,
        },
        items: [{ id: { videoId: 'videoId1' }, snippet: {} } as SearchItem],
      };

    service.searchVideos(mockQuery).subscribe((response) => {
      expect(response).toEqual(mockSearchResponse.items);
    });

    const searchRequest = httpMock.expectOne(`${API_URL}/search?type=video&part=snippet&maxResults=30&q=${mockQuery}`);
    expect(searchRequest.request.method).toBe('GET');
    searchRequest.flush(mockSearchResponse);
  });

  it('should fetch video items', () => {
    const mockVideoIds = 'videoId1,videoId2';
    const mockVideoResponse: VideoResponse = {
        kind: 'youtube#videoListResponse',
        etag: 'some_etag_value',
        pageInfo: {
          totalResults: 2, // Assuming two video results in the response
          resultsPerPage: 10,
        },
        items: [
          { id: 'videoId1', snippet: {}, statistics: {} } as VideoItem,
        ],
      };

    service.getVideoItems(mockVideoIds).subscribe((response) => {
      expect(response).toEqual(mockVideoResponse.items);
    });

    const videoRequest = httpMock.expectOne(`${API_URL}/videos?part=snippet,statistics&id=${mockVideoIds}`);
    expect(videoRequest.request.method).toBe('GET');
    videoRequest.flush(mockVideoResponse);
  });
  it('should fetch video details by ID', () => {
    const mockVideoId = 'videoId1';
    const mockVideoDetailsResponse: VideoResponse = {
        kind: 'youtube#videoListResponse',
        etag: 'some_etag_value',
        pageInfo: {
          totalResults: 1, // Assuming a single video result in the response
          resultsPerPage: 1,
        },
        items: [
          { id: 'videoId1', snippet: {}, statistics: {} } as VideoItem,
        ],
      };

    service.getVideoDetailsById(mockVideoId).subscribe((response) => {
      expect(response).toEqual(mockVideoDetailsResponse);
    });

    const videoDetailsRequest = httpMock.expectOne(`${API_URL}/videos?part=snippet,statistics&id=${mockVideoId}`);
    expect(videoDetailsRequest.request.method).toBe('GET');
    videoDetailsRequest.flush(mockVideoDetailsResponse);
  });

});
