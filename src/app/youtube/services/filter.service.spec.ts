import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [FilterService]
    });

    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should set and get filterValue', () => {
    const testFilterValue = 'testFilter';
    service.filterValue = testFilterValue;

    expect(service.filterValue).toEqual(testFilterValue);
  });

});
