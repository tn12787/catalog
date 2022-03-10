import { Skeleton, Tbody, Td, Tr } from '@chakra-ui/react';
import React from 'react';
import { TableInstance } from 'react-table';

type Props<T extends object> = Pick<
  TableInstance<T>,
  'getTableBodyProps' | 'page' | 'prepareRow'
> & {
  loading?: boolean;
};

const TableBody = <T extends object>({
  page,
  getTableBodyProps,
  loading,
  prepareRow,
}: Props<T>) => {
  return (
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
                <Skeleton isLoaded={!loading}> {cell.render('Cell')}</Skeleton>
              </Td>
            ))}
          </Tr>
        );
      })}
    </Tbody>
  );
};

export default TableBody;
