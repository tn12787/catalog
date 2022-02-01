import { Text, Box } from '@chakra-ui/react';
import { Thead, Tr, Th, Tbody, Td, Table as ChakraTable } from '@chakra-ui/table';
import React, { useEffect, useMemo } from 'react';
import {
  Cell,
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

import IndeterminateCheckbox from './IndeterminateCheckbox';

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
  onSelectedRowsChange,
}: Props<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { selectedRowIds },
  } = useTable(
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
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),

            Cell: ({ row }: Cell<T>) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
            width: 7,
          },
          ...columns,
        ]);
    }
  );

  const selectedRowsMemod = useMemo(() => selectedRowIds, [selectedRowIds]);

  // Keep parent/store state in sync with local state
  // No need to update on mount since we are passing initial state
  useMountedLayoutEffect(() => {
    console.log(selectedRowsMemod);
    onSelectedRowsChange?.(selectedRowsMemod);
  }, [selectedRowsMemod, onSelectedRowsChange]);

  const hasData = page?.length || loading;

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
        {hasData && (
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr
                  _last={{ borderBottom: 'none' }}
                  borderBottomWidth={'1px'}
                  {...row.getRowProps()}
                  key={index.toString()}
                >
                  {row.cells.map((cell, index) => (
                    <Td
                      borderBottom="none"
                      display="flex"
                      alignItems={'center'}
                      py={2}
                      px={2}
                      {...(cell.column?.extraProps ?? {})}
                      {...cell.getCellProps()}
                      key={index.toString()}
                    >
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        )}
      </ChakraTable>
      {!hasData && emptyContent}
    </Box>
  );
};

export default Table;
