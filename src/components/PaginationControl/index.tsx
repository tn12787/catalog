import { Button, IconButton } from '@chakra-ui/button';
import { Flex, HStack, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { Skeleton } from '@chakra-ui/skeleton';
import React from 'react';
import { BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';

import useAppColors from 'hooks/useAppColors';

interface Props {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  loading?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const PaginationControl = ({
  currentPage,
  totalItems,
  pageSize,
  loading,
  onPageChange,
  onPageSizeChange,
}: Props) => {
  const { bgSecondary } = useAppColors();
  const numberOfPages = Math.ceil(totalItems / pageSize);

  const buttonsToRender = [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ].filter((page) => page >= 1 && page <= numberOfPages);

  return (
    <HStack justifyContent="space-between">
      <Skeleton isLoaded={!loading}>
        <HStack>
          <IconButton
            size="sm"
            aria-label="first page"
            isDisabled={currentPage === 1}
            onClick={() => onPageChange(1)}
            icon={<BiChevronsLeft />}
          ></IconButton>
          {/* <IconButton
            size="sm"
            aria-label="first page"
            isDisabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            icon={<BiChevronLeft />}
          ></IconButton> */}
          {buttonsToRender.map((item) => (
            <Button
              size="sm"
              key={item.toString()}
              onClick={() => onPageChange(item)}
              colorScheme={item === currentPage ? 'purple' : 'gray'}
            >
              {item}
            </Button>
          ))}
          {/* <IconButton
            size="sm"
            aria-label="first page"
            isDisabled={currentPage === numberOfPages}
            onClick={() => onPageChange(currentPage - 1)}
            icon={<BiChevronRight />}
          ></IconButton> */}

          <IconButton
            size="sm"
            aria-label="last page"
            isDisabled={currentPage === 1}
            onClick={() => onPageChange(numberOfPages)}
            icon={<BiChevronsRight />}
          ></IconButton>
        </HStack>
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <HStack>
          <Text fontSize="sm">Show</Text>
          <Select
            bg={bgSecondary}
            size="sm"
            rounded="md"
            onChange={(e) => onPageSizeChange(Number(e.currentTarget.value))}
            value={pageSize}
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </Select>
        </HStack>
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <Flex>
          <Text fontSize="sm">
            Showing {(currentPage - 1) * pageSize + 1} -{' '}
            {Math.min(totalItems, currentPage * pageSize)} of {totalItems} items
          </Text>
        </Flex>
      </Skeleton>
    </HStack>
  );
};

export default PaginationControl;
