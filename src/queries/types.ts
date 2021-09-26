export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface SortByOptions<T> {
  key: keyof T;
  order: SortOrder;
}

export interface FilterOptions<T> {
  team: string;
  search?: string;
  pagination?: {
    pageSize: number;
    offset: number;
  };
  sorting?: SortByOptions<T>;
}

export interface PaginatedQueryResult<T> {
  total: number;
  results: T[];
}
