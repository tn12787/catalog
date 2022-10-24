import React from 'react';
import { Wrap } from '@chakra-ui/react';

import ArtistBadge from '../ArtistBadge';

import { SelectedItemListProps } from 'components/forms/MultiSelect/types';
import { ArtistResponse } from 'types/common';

const ArtistSelectedItems = ({ items, onChange }: SelectedItemListProps<ArtistResponse>) => {
  return (
    <Wrap>
      {items?.length
        ? items?.map((artist) => {
            return (
              <ArtistBadge
                onRemoveClick={(removedUser) => {
                  onChange(items?.filter((item) => item?.id !== removedUser.id));
                }}
                editable
                key={artist.id}
                artist={artist}
              />
            );
          })
        : null}
    </Wrap>
  );
};

export default ArtistSelectedItems;
