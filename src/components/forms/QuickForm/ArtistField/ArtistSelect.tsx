import { Select, Stack, Text } from '@chakra-ui/react';
import React from 'react';

import useArtists from 'hooks/data/artists/useArtists';

type Props = {
  value: string;
  onChange: (value: string) => void | Promise<void>;
};

const ArtistSelect = ({ value, onChange }: Props) => {
  const { data: artists } = useArtists();

  return (
    <Stack p={2} alignItems={'flex-start'} minW="250px" w="100%">
      <Text fontSize="sm" fontWeight={'semibold'}>
        Select an artist
      </Text>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        {artists?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select>
    </Stack>
  );
};

export default ArtistSelect;
