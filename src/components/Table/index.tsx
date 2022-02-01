import { Text, Box } from '@chakra-ui/react';
import { Thead, Tr, Th, Tbody, Td, Table as ChakraTable } from '@chakra-ui/table';
import React, { useMemo } from 'react';
import { Column, useFlexLayout, usePagination, useSortBy, useTable } from 'react-table';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';

interface Props<T extends object> {
  columns: Column<T>[];
  data: Array<T>;
  emptyContent?: JSX.Element;
  loading?: boolean;
  currentPage?: number;
  totalPages?: number;
}

const Table = <T extends object>({
  columns,
  data,
  loading,
  currentPage = 1,
  totalPages = 1,
  emptyContent = <></>,
}: Props<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } = useTable(
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
      initialState: { pageIndex: currentPage }, // Pass our hoisted table state
      manualPagination: true,
      pageCount: totalPages,
    },
    useFlexLayout,
    useSortBy,
    usePagination
  );

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
                  {...column.getHeaderProps(column.getSortByToggleProps())}
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
