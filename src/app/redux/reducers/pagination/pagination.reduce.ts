import { PaginationActionTypes } from '../../actions/pagination.action';

export interface PaginationState {
  currentPage: number;
  pageSize: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  pageSize: 20,
};

export function paginationReducer(state = initialState, action: any): PaginationState {
  switch (action.type) {
    case PaginationActionTypes.SetCurrentPage:
      return { ...state, currentPage: action.currentPage };
    case PaginationActionTypes.SetPageSize:
      return { ...state, pageSize: action.pageSize };
    default:
      return state;
  }
}
