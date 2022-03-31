import {
  Text,
  Stack,
  Button,
  Input,
  InputGroup,
  Icon,
  InputRightElement,
  HStack,
  Select,
  Skeleton,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { isEqual } from 'lodash';
import { BiSearch } from 'react-icons/bi';
import Link from 'next/link';

import DashboardLayout from 'components/layouts/DashboardLayout';
import { ClientRelease } from 'types/common';
import useDebounce from 'hooks/useDebounce';
import ReleaseList from 'components/releases/ReleaseList';
import { SortOrder } from 'queries/types';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import useAppColors from 'hooks/useAppColors';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import PageHead from 'components/pageItems/PageHead';
import usePagination from 'hooks/usePagination';
import PaginationControl from 'components/PaginationControl';
import { SortBySelectOption } from 'types/forms';
import useReleases from 'hooks/data/releases/useReleases';
import PageTitle from 'components/pageItems/PageTitle';

const sortOptions: SortBySelectOption<ClientRelease>[] = [
  {
    label: 'Release Date (asc)',
    value: {
      key: 'targetDate',
      order: SortOrder.ASC,
    },
  },
  {
    label: 'Release Date (desc)',
    value: {
      key: 'targetDate',
      order: SortOrder.DESC,
    },
  },
  {
    label: 'Name (A-Z)',
    value: {
      key: 'name',
      order: SortOrder.ASC,
    },
  },
  {
    label: 'Name (Z-A)',
    value: {
      key: 'name',
      order: SortOrder.DESC,
    },
  },
];

const ReleasesPage = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortBySelectOption<ClientRelease>>(sortOptions[0]);

  const { currentWorkspace, workspaceMemberships } = useExtendedSession();

  const { bgPrimary, primary, bgSecondary } = useAppColors();

  const debouncedSearch = useDebounce(search, 150);

  const { pageSize, currentPage, setCurrentPage, setPageSize } = usePagination();

  const queryArgs = {
    search: debouncedSearch,
    sorting: {
      key: sortBy.value.key,
      order: sortBy.value.order,
    },
    workspace: currentWorkspace ?? '',
    pageSize,
    page: currentPage,
  };

  const { data: response, isLoading } = useReleases(queryArgs, { keepPreviousData: true });

  const canCreateRelease = hasRequiredPermissions(
    ['CREATE_RELEASES'],
    workspaceMemberships?.[currentWorkspace]
  );

  const shouldHideControls = response?.results?.length === 0 && !debouncedSearch;

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title="All Releases" />
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'stretch', md: 'center' }}
          justify="space-between"
        >
          <PageTitle>All Releases</PageTitle>
          {canCreateRelease && !shouldHideControls && (
            <Link passHref href={'/releases/new'}>
              <Button colorScheme="purple" as={'a'}>
                Create New Release
              </Button>
            </Link>
          )}
        </Stack>
        {!shouldHideControls && (
          <Stack direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
            <Skeleton isLoaded={!isLoading}>
              <InputGroup borderRadius="md" maxW={{ base: '100%', md: '400px' }} bg={bgSecondary}>
                <Input
                  focusBorderColor={primary}
                  placeholder="Search releases..."
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <InputRightElement>
                  <Icon as={BiSearch} />
                </InputRightElement>
              </InputGroup>
            </Skeleton>
            <HStack>
              <Skeleton isLoaded={!isLoading}>
                <Text whiteSpace="nowrap" fontSize="sm" fontWeight="bold">
                  Sort by:
                </Text>
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <Select
                  bg={bgSecondary}
                  value={JSON.stringify(sortBy)}
                  onChange={(e) => {
                    const valueAsObj = JSON.parse(e.target.value);
                    const item = sortOptions.find((item) => isEqual(item, valueAsObj));

                    setSortBy(item ?? sortOptions[0]);
                  }}
                >
                  {sortOptions.map((item) => (
                    <option key={item.label} value={JSON.stringify(item)}>
                      {item.label}
                    </option>
                  ))}
                </Select>
              </Skeleton>
            </HStack>
          </Stack>
        )}

        <ReleaseList isLoading={isLoading} releases={response?.results} search={debouncedSearch} />

        {!shouldHideControls && (
          <PaginationControl
            loading={isLoading}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            totalItems={response?.total ?? 0}
          />
        )}
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = getServerSideSessionOrRedirect;

ReleasesPage.getLayout = () => DashboardLayout;

export default ReleasesPage;
