import React from 'react';
import { Wrap, Text } from '@chakra-ui/react';

import { SelectedItemListProps } from 'components/forms/MultiSelect/types';
import { TrackResponse } from 'types/common';

const TrackSelectedItems = ({ items }: SelectedItemListProps<TrackResponse>) => {
  return (
    <Wrap>
      {items?.length
        ? items?.map((label) => {
            return <Text key={label.id}>{label.name}</Text>;
          })
        : null}
    </Wrap>
  );
};

export default TrackSelectedItems;
