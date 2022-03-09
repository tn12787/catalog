import React, { useMemo, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  Stack,
  HStack,
  Text,
  Select,
} from '@chakra-ui/react';
import { BiChevronRight, BiSearch } from 'react-icons/bi';
import NextLink from 'next/link';
import { isEqual } from 'lodash';

import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import ArtistList from 'components/artists/ArtistList';
import useAppColors from 'hooks/useAppColors';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import PageHead from 'components/pageItems/PageHead';
import useArtists from 'hooks/data/artists/useArtists';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import { SortOrder } from 'queries/types';
import { ArtistResponse } from 'types/common';
import { SortBySelectOption } from 'types/forms';
import useDebounce from 'hooks/useDebounce';

const sortOptions: SortBySelectOption<ArtistResponse>[] = [
  {
    label: 'Name (asc)',
    value: {
      key: 'name',
      order: SortOrder.ASC,
    },
  },
  {
    label: 'Name (desc)',
    value: {
      key: 'name',
      order: SortOrder.DESC,
    },
  },
  {
    label: 'Number of releases (asc)',
    value: {
      key: 'releases',
      order: SortOrder.ASC,
    },
  },
  {
    label: 'Number of releases (desc)',
    value: {
      key: 'releases',
      order: SortOrder.DESC,
    },
  },
];

const ArtistsPage = () => {
  const { bgPrimary, bgSecondary, primary } = useAppColors();
  const { currentWorkspace, workspaceMemberships } = useExtendedSession();
  const { workspace, isLoading: isWorkspaceLoading } = useCurrentWorkspace();
  const [sortByValue, setSortBy] = useState<SortBySelectOption<ArtistResponse>>(sortOptions[0]);
  const [search, setSearch] = React.useState('');

  const debouncedSearch = useDebounce(search, 150);

  const queryArgs = useMemo(
    () => ({
      search: debouncedSearch,
      sorting: {
        key: sortByValue.value.key,
        order: sortByValue.value.order,
      },
      workspace: currentWorkspace ?? '',
    }),
    [currentWorkspace, debouncedSearch, sortByValue]
  );

  const { data: artists, isLoading } = useArtists(queryArgs);

  const canCreateArtists = hasRequiredPermissions(
    ['CREATE_ARTISTS'],
    workspaceMemberships?.[currentWorkspace]
  );

  const shouldHideControls = artists?.length === 0;

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title="Artists" />
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Breadcrumb fontSize="sm" separator={<BiChevronRight color="gray.500" />}>
          <BreadcrumbItem>
            <Skeleton isLoaded={!isWorkspaceLoading}>
              <NextLink passHref href={`/overview`}>
                <BreadcrumbLink>{workspace?.name ?? 'loading'}</BreadcrumbLink>
              </NextLink>
            </Skeleton>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <NextLink passHref href={'/artists'}>
              <BreadcrumbLink fontWeight="bold">Artists</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Stack direction="row" align="center" justify="space-between">
          <Heading size="2xl" fontWeight="black" alignSelf="flex-start">
            Artists
          </Heading>
          {canCreateArtists && (
            <NextLink passHref href={'/artists/new'}>
              <Button colorScheme="purple" as={'a'}>
                Add Artist
              </Button>
            </NextLink>
          )}
        </Stack>

        {!shouldHideControls && (
          <Stack direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
            <Skeleton isLoaded={!isLoading}>
              <InputGroup borderRadius="md" maxW={{ base: '100%', md: '400px' }} bg={bgSecondary}>
                <Input
                  focusBorderColor={primary}
                  placeholder="Filter artists..."
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
                  value={JSON.stringify(sortByValue)}
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

        <Stack>
          <ArtistList artists={artists} search={''} loading={isLoading} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = getServerSideSessionOrRedirect;

ArtistsPage.getLayout = () => DashboardLayout;

export default ArtistsPage;
