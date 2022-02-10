import {
  Text,
  Stack,
  Heading,
  Button,
  Input,
  InputGroup,
  Icon,
  InputRightElement,
  HStack,
  Select,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { isEqual } from 'lodash';
import { useQuery } from 'react-query';
import { BiSearch } from 'react-icons/bi';
import { Artist } from '@prisma/client';

import ReleaseCard from 'components/releases/ReleaseCard';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { ClientRelease, ReleaseType } from 'types/common';
import { fetchReleases } from 'queries/releases';
import useDebounce from 'hooks/useDebounce';
import ReleaseList from 'components/releases/ReleaseList';
import { SortByOptions, SortOrder } from 'queries/types';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import useAppColors from 'hooks/useAppColors';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import PageHead from 'components/PageHead';
import usePagination from 'hooks/usePagination';
import PaginationControl from 'components/PaginationControl';

interface SortBySelectOption<T> {
  label: string;
  value: SortByOptions<T>;
}

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

const Releases = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortBySelectOption<ClientRelease>>(sortOptions[0]);

  const { currentTeam, teams } = useExtendedSession();

  const { bgPrimary, primary, bgSecondary } = useAppColors();

  const debouncedSearch = useDebounce(search, 150);

  const { pageSize, currentPage, setCurrentPage, setPageSize } = usePagination();

  const queryArgs = {
    search: debouncedSearch,
    sorting: {
      key: sortBy.value.key,
      order: sortBy.value.order,
    },
    team: currentTeam ?? '',
    pageSize,
    page: currentPage,
  };

  const { data: response, isLoading } = useQuery(
    ['releases', queryArgs],
    () => fetchReleases(queryArgs),
    { enabled: !!currentTeam }
  );

  const canCreateRelease = hasRequiredPermissions(['CREATE_RELEASES'], teams?.[currentTeam]);

  const shouldHideControls = (response?.results?.length === 0 && !debouncedSearch) || isLoading;

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title="All Releases" />
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'stretch', md: 'center' }}
          justify="space-between"
        >
          <Heading
            py={4}
            color={primary}
            as="h1"
            size="2xl"
            fontWeight="black"
            alignSelf="flex-start"
          >
            All Releases
          </Heading>
          {canCreateRelease && !shouldHideControls && (
            <Button href={'/releases/new'} colorScheme="purple" as={'a'}>
              Create New Release
            </Button>
          )}
        </Stack>
        {!shouldHideControls && (
          <Stack direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
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
            <HStack>
              <Text whiteSpace="nowrap" fontSize="sm" fontWeight="bold">
                Sort by:
              </Text>
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
            </HStack>
          </Stack>
        )}
        {isLoading ? (
          <ReleaseCard
            releaseData={{
              id: 'release_loading',
              artist: { name: 'me', id: 'loading' } as Artist,
              targetDate: new Date().toISOString(),
              name: 'Loading',
              type: ReleaseType.ALBUM,
              artistId: 'blank_id',
              teamId: 'loading',
              createdAt: new Date(),
              updatedAt: new Date(),
            }}
            loading
          />
        ) : (
          <ReleaseList releases={response?.results} search={debouncedSearch} />
        )}
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

Releases.getLayout = () => DashboardLayout;

export default Releases;
