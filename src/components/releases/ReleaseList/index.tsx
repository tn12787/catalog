import { Stack, Text, Icon } from '@chakra-ui/react';
import React from 'react';
import { BiSearch } from 'react-icons/bi';

import NoReleasesYet from './NoReleasesYet';

import ReleaseCard from 'components/releases/ReleaseCard';
import { ClientRelease } from 'types/common';

interface Props {
  search: string;
  releases: ClientRelease[] | undefined;
  EmptyComponent?: React.FC;
}

const ReleaseList = ({ search, releases, EmptyComponent = NoReleasesYet }: Props) => {
  if (!releases || releases?.length === 0) {
    return search ? (
      <Stack spacing={5} py={'40px'} align="center">
        <Icon as={BiSearch} fontSize="7xl" />
        <Text fontSize="sm">No items match your search. Try entering another query.</Text>
      </Stack>
    ) : (
      <EmptyComponent></EmptyComponent>
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
