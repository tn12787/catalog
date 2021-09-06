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
    offset: number;
  };
  sorting?: SortByOptions<T>;
}
