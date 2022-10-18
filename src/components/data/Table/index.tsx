import { Text, Box, Stack, Skeleton } from '@chakra-ui/react';
import { Thead, Tbody, Tr, Th, Table as ChakraTable, Td } from '@chakra-ui/table';
import React, { useMemo } from 'react';
import {
  Column,
  IdType,
  useFlexLayout,
  useMountedLayoutEffect,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { isEqual } from 'lodash';

import IndeterminateCheckbox from './IndeterminateCheckbox';
import TableBody from './TableBody';

interface Props<T extends object> {
  columns: Column<T>[];
  data: Array<T>;
  emptyContent?: JSX.Element;
  loading?: boolean;
  currentPage?: number;
  totalPages?: number;
  selectedRows?: Record<IdType<T>, boolean>;
  onSelectedRowsChange?: (selectedRows: Record<IdType<T>, boolean>) => void;
}

const Table = <T extends object>({
  columns,
  data,
  loading,
  currentPage = 1,
  totalPages = 1,
  emptyContent = <></>,
  selectedRows = {} as Record<IdType<T>, boolean>,
  onSelectedRowsChange,
}: Props<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { selectedRowIds },
  } = useTable<T>(
    {
      columns,
      data,
      useControlledState: (state) =>
        useMemo(
          () => ({
            ...state,
            pageIndex: currentPage,
          }),
          [state]
        ),
      initialState: { pageIndex: currentPage },
      manualPagination: true,
      pageCount: totalPages,
    },
    useFlexLayout,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      onSelectedRowsChange &&
        hooks.visibleColumns.push((columns) => [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),

            Cell: ({ row }: any) => (
              <Stack justifyContent="center">
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </Stack>
            ),
            width: 20,
            flexGrow: 0,
          },
          ...columns,
        ]);
    }
  );

  // Keep parent/store state in sync with local state
  // No need to update on mount since we are passing initial state
  useMountedLayoutEffect(() => {
    if (!isEqual(selectedRows, selectedRowIds)) onSelectedRowsChange?.(selectedRowIds);
  }, [selectedRows, selectedRowIds, onSelectedRowsChange]);

  const renderTableContent = () => {
    if (loading) {
      return (
        <Tbody>
          <Tr>
            <Td>
              <Skeleton>loading</Skeleton>
            </Td>
          </Tr>
        </Tbody>
      );
    }

    if (page?.length)
      return (
        <TableBody
          getTableBodyProps={getTableBodyProps}
          page={page}
          prepareRow={prepareRow}
        ></TableBody>
      );

    return emptyContent;
  };

  return (
    <Box overflowX="auto" borderWidth={'1px'} borderRadius={'md'}>
      <ChakraTable
        variant="simple"
        borderRadius="lg"
        overflow="hidden"
        fontSize="sm"
        {...getTableProps()}
      >
        <Thead>
          {headerGroups.map((headerGroup, i) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={i.toString()}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  py={2}
                  px={2}
                  alignItems={'center'}
                  display="flex"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  {...column.extraProps}
                  key={index.toString()}
                >
                  {column.render('Header')}
                  <Text display="inline-block" pl="1">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <BiUpArrow aria-label="sorted descending" />
                      ) : (
                        <BiDownArrow aria-label="sorted ascending" />
                      )
                    ) : null}
                  </Text>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        {renderTableContent()}
      </ChakraTable>
    </Box>
  );
};

export default Table;
