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

const usePagination = ({ total, initialState }: usePaginationOptions) => {
  const [currentPage, setCurrentPage] = useState(
    initialState?.currentPage || 1
  );
  const [pageSize, setPageSize] = useState(initialState?.pageSize || 10);

  const offset = (currentPage - 1) * pageSize;

  return {
    offset,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    total,
  };
};

export default usePagination;
