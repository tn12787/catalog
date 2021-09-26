import { useState } from 'react';

interface usePaginationFields {
  currentPage: number;
  offset: number;
  pageSize: number;
}

interface InitialState {
  pageSize?: number;
  currentPage?: number;
}

interface usePaginationOptions {
  total?: number;
  initialState?: InitialState;
}

const usePagination = (options?: usePaginationOptions) => {
  const [currentPage, setCurrentPage] = useState(
    options?.initialState?.currentPage || 1
  );
  const [pageSize, setPageSize] = useState(
    options?.initialState?.pageSize || 10
  );

  const offset = (currentPage - 1) * pageSize;

  return {
    offset,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  };
};

export default usePagination;
