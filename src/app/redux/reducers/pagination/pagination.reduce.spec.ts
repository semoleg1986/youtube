import { paginationReducer } from "./pagination.reduce";
import { PaginationActionTypes } from '../../actions/pagination.action';

describe('Pagination Reducer', () => {
  const initialState = {
    currentPage: 1,
    pageSize: 20,
  };

  it('should return the initial state', () => {
    expect(paginationReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SetCurrentPage action', () => {
    const currentPage = 3;
    const action = { type: PaginationActionTypes.SetCurrentPage, currentPage };
    const expectedState = { ...initialState, currentPage };

    expect(paginationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SetPageSize action', () => {
    const pageSize = 10;
    const action = { type: PaginationActionTypes.SetPageSize, pageSize };
    const expectedState = { ...initialState, pageSize };

    expect(paginationReducer(initialState, action)).toEqual(expectedState);
  });
});
