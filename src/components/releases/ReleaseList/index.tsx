import { Stack, Text, Icon } from '@chakra-ui/react';
import React from 'react';
import { BiSearch } from 'react-icons/bi';

import ReleaseCard from 'components/releases/ReleaseCard';
import { EnrichedRelease } from 'types';

interface Props {
  search: string;
  releases: EnrichedRelease[] | undefined;
}

const ReleaseList = ({ search, releases }: Props) => {
  if (!releases || releases?.length === 0) {
    return search ? (
      <Stack spacing={5} py={'40px'} align="center">
        <Icon as={BiSearch} fontSize="7xl" />
        <Text fontSize="sm">
          No items match your search. Try entering another query.
        </Text>
      </Stack>
    ) : (
      <Stack>
        <Text>No items found.</Text>
      </Stack>
    );
  }

  return (
    <Stack>
      {releases.map((datum, index) => {
        return <ReleaseCard key={index.toString()} releaseData={datum} />;
      })}
    </Stack>
  );
};

export default React.memo<Props>(ReleaseList);
