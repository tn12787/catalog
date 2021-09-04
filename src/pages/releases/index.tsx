import {
  Text,
  Stack,
  Heading,
  Button,
  Flex,
  Input,
  Skeleton,
  InputGroup,
  Icon,
  InputRightElement,
  HStack,
  Select,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { isEqual } from 'lodash';

import ReleaseCard from 'components/releases/ReleaseCard';

import DashboardLayout from 'components/layouts/DashboardLayout';
import { EnrichedRelease, ReleaseType } from 'types';
import { useQuery } from 'react-query';
import { fetchReleases } from 'queries/releases';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { BiSearch } from 'react-icons/bi';
import useDebounce from 'hooks/useDebounce';
import ReleaseList from 'components/ReleaseList';
import { SortByOptions, SortOrder } from 'queries/types';

interface SortBySelectOption<T> {
  label: string;
  value: SortByOptions<T>;
}

const sortOptions: SortBySelectOption<EnrichedRelease>[] = [
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
  const [sortBy, setSortBy] = useState<SortBySelectOption<EnrichedRelease>>(
    sortOptions[0]
  );
  const debouncedSearch = useDebounce(search, 300);
  const { data: response, isLoading } = useQuery(
    ['releases', debouncedSearch, sortBy],
    () => fetchReleases(debouncedSearch, sortBy.value)
  );

  return (
    <Stack
      flex={1}
      bg="#eee"
      align="center"
      py={6}
      direction="column"
      width="100%"
    >
      <Stack spacing={4} width="90%" maxW="900px">
        <Flex align="center" justify="space-between">
          <Heading py={4} color="green.400" alignSelf="flex-start">
            All Releases
          </Heading>
          <Button href={'/releases/new'} as={'a'}>
            Create New Release
          </Button>
        </Flex>
        <HStack justifyContent="space-between">
          <Skeleton isLoaded={!isLoading || !!search}>
            <InputGroup maxW="400px">
              <Input
                bg="smoke"
                placeholder="Search releases..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <InputRightElement>
                <Icon color="mist" as={BiSearch} />
              </InputRightElement>
            </InputGroup>
          </Skeleton>
          <Skeleton isLoaded={!isLoading || !!search}>
            <HStack>
              <Text
                whiteSpace="nowrap"
                fontSize="sm"
                fontWeight="bold"
                color="mist"
              >
                Sort by:
              </Text>
              <Select
                bg="white"
                value={JSON.stringify(sortBy)}
                onChange={(e) => {
                  const valueAsObj = JSON.parse(e.target.value);
                  const item = sortOptions.find((item) =>
                    isEqual(item, valueAsObj)
                  );

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
          </Skeleton>
        </HStack>
        {isLoading ? (
          <ReleaseCard
            releaseData={{
              id: 'release_loading',
              artist: { name: 'me', id: 'loading' },
              targetDate: new Date().toISOString(),
              name: 'Loading',
              type: ReleaseType.ALBUM,
            }}
            loading
          />
        ) : (
          <ReleaseList releases={response?.data} search={debouncedSearch} />
        )}
      </Stack>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

Releases.getLayout = () => DashboardLayout;

export default Releases;
