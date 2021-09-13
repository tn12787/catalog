import { useColorModeValue, Text } from '@chakra-ui/react';
import {
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Table as ChakraTable,
} from '@chakra-ui/table';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import React from 'react';
import { Column, useSortBy, useTable } from 'react-table';

interface Props<T extends { id: string }> {
  columns: Array<Column<T>>;
  data: Array<T>;
}

const Table = <T extends { id: string }>({ columns, data }: Props<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <ChakraTable my="8" borderWidth="1px" fontSize="sm" {...getTableProps()}>
      <Thead bg={useColorModeValue('gray.50', 'gray.800')}>
        {headerGroups.map((headerGroup, i) => (
          <Tr {...headerGroup.getHeaderGroupProps()} key={i.toString()}>
            {headerGroup.headers.map((column, index) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
                key={index.toString()}
              >
                {column.render('Header')}
                <Text pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
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
                  isNumeric={cell.column.isNumeric}
                >
                  {cell.render('Cell')}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </ChakraTable>
  );
};

export default Table;
