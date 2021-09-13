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

import useAppColors from 'hooks/useAppColors';

interface Props<T extends object> {
  columns: Column<T>[];
  data: Array<T>;
}

const Table = <T extends object>({ columns, data }: Props<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const { bgPrimary, border } = useAppColors();

  return (
    <Box borderRadius="lg" borderColor={border} borderWidth="1px">
      <ChakraTable
        variant="simple"
        borderRadius="lg"
        overflow="hidden"
        fontSize="sm"
        {...getTableProps()}
      >
        <Thead bg={bgPrimary}>
          {headerGroups.map((headerGroup, i) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={i.toString()}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  // isNumeric={column.isNumeric}
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
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index.toString()}>
                {row.cells.map((cell, index) => (
                  <Td
                    {...cell.getCellProps()}
                    key={index.toString()}
                    // isNumeric={cell.column.isNumeric}
                  >
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </ChakraTable>
    </Box>
  );
};

export default Table;
