export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface SortByOptions<T> {
  key: keyof T;
  order: SortOrder;
}
