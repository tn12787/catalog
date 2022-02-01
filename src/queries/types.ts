export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface SortByOptions<T> {
  key: keyof T;
  order: SortOrder;
}

export interface FilterOptions<T> {
  search?: string;
  pagination?: {
    pageSize: number;
    page: number;
  };
  sorting?: SortByOptions<T>;
  dates?: {
    before?: Date;
    after?: Date;
  };
}

export interface PaginatedQueryResult<T> {
  total: number;
  results: T[];
}
