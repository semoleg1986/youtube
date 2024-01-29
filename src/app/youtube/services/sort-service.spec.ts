

import { SortService, SortingOrder } from "./sort-service";

describe('SortService', () => {
  let sortService: SortService;

  beforeEach(() => {
    sortService = new SortService();
  });

  it('should create SortService', () => {
    expect(sortService).toBeTruthy();
  });

  it('should update sort by date', () => {
    const mockEvent: Partial<Event> = {
      preventDefault: jest.fn(),
    };

    sortService.updateSortByDate(mockEvent as Event);

    expect(sortService.currentField).toBe('date');
    expect(sortService.currentOrder).toBe('desc');
  });

  it('should update sort by views', () => {
    const mockEvent: Partial<Event> = {
      preventDefault: jest.fn(),
    };

    sortService.updateSortByViews(mockEvent as Event);

    expect(sortService.currentField).toBe('views');
    expect(sortService.currentOrder).toBe('desc');
  });

  it('should get current sort order', () => {
    const currentOrder: SortingOrder = sortService.getCurrentSortOrder();

    expect(currentOrder).toBe('asc');

  });
});
