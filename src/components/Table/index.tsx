import { Text, Box } from '@chakra-ui/react';
import {
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Table as ChakraTable,
} from '@chakra-ui/table';
import React from 'react';
import { Column, useSortBy, useTable, useFlexLayout } from 'react-table';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';

interface Props<T extends object> {
  columns: Column<T>[];
  data: Array<T>;
  emptyContent?: JSX.Element;
  loading?: boolean;
}

const Table = <T extends object>({
  columns,
  data,
  loading,
  emptyContent = <></>,
}: Props<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const hasData = rows?.length || loading;

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
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index.toString()}>
                  {row.cells.map((cell, index) => (
                    <Td {...cell.getCellProps()} key={index.toString()}>
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
