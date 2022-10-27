import { Stack, Text, Icon } from '@chakra-ui/react';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { Artist, ReleaseType } from '@prisma/client';

import NoReleasesYet from './NoReleasesYet';

import ReleaseCard from 'components/releases/ReleaseCard';
import { ClientRelease } from 'types/common';
import useAppColors from 'hooks/useAppColors';

interface Props {
  search: string;
  isLoading?: boolean;
  releases: ClientRelease[] | undefined;
  EmptyComponent?: React.FC;
}

const ReleaseList = ({ isLoading, search, releases, EmptyComponent = NoReleasesYet }: Props) => {
  const { bodySub } = useAppColors();

  if (isLoading) {
    return (
      <ReleaseCard
        releaseData={{
          id: 'release_loading',
          artist: { name: 'me', id: 'loading' } as Artist,
          targetDate: new Date().toISOString(),
          name: 'Loading',
          type: ReleaseType.Album,
          artistId: 'blank_id',
          workspaceId: 'loading',
          generic: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          tracks: [],
        }}
        loading
      />
    );
  }

  if (!releases || releases?.length === 0) {
    return search ? (
      <Stack color={bodySub} spacing={5} py={'40px'} align="center">
        <Icon as={BiSearch} fontSize="7xl" />
        <Text fontSize="sm">No items match your search. Try entering another query.</Text>
      </Stack>
    ) : (
      <EmptyComponent />
    );
  }

  return (
    <Stack spacing={4}>
      {releases.map((datum, index) => {
        return <ReleaseCard key={index.toString()} releaseData={datum} />;
      })}
    </Stack>
  );
};

export default React.memo<Props>(ReleaseList);
