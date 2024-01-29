export enum PaginationActionTypes {
    SetCurrentPage = '[Pagination] Set Current Page',
    SetPageSize = '[Pagination] Set Page Size',
  }
  
  export class SetCurrentPage {
    readonly type = PaginationActionTypes.SetCurrentPage;
    constructor(public currentPage: number) {}
  }
  
  export class SetPageSize {
    readonly type = PaginationActionTypes.SetPageSize;
    constructor(public pageSize: number) {}
  }
  