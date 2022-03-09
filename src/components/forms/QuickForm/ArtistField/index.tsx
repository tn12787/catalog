import React from 'react';
import { Box } from '@chakra-ui/react';

import QuickFormField from '../QuickFormField';

import ArtistSelect from './ArtistSelect';

import useArtists from 'hooks/data/artists/useArtists';

type Props = {
  artist: string;
  isDisabled?: boolean;
  onChange: (value: string) => void | Promise<void>;
};

const ArtistField = ({ isDisabled, artist, onChange }: Props) => {
  const { data: artists } = useArtists({});

  const dataToRender = artists?.find((item) => item.id === artist);

  return (
    <QuickFormField
      isDisabled={isDisabled}
      fieldName="artist"
      value={artist}
      renderValue={({}) => <Box>{dataToRender?.name}</Box>}
      onSubmit={onChange}
      renderEditing={ArtistSelect}
    />
  );
};

export default ArtistField;
