import { Stack, Heading, Button, Text } from '@chakra-ui/react';
import { Track } from '@prisma/client';
import React from 'react';
import { BiPlus } from 'react-icons/bi';

import MultiSelect from 'components/forms/MultiSelect';
import {
  MultiSelectListItemProps,
  SelectedItemListProps,
} from 'components/forms/MultiSelect/types';
import { ClientRelease } from 'types/common';
import useAppColors from 'hooks/useAppColors';

type Props = {
  releaseData: ClientRelease;
};

const TrackForm = ({ releaseData }: Props) => {
  const { bodySub } = useAppColors();
  return (
    <Stack spacing={5}>
      <MultiSelect
        searchPlaceholder="Search for an existing track..."
        isDisabled={releaseData.tracks?.length === 0}
        value={[]}
        allItems={[]}
        getItem={(item: Track) => item}
        renderListItem={(item: MultiSelectListItemProps<Track>) => <Text>{item.value}</Text>}
        renderSelectedItems={function (props: SelectedItemListProps<any>): JSX.Element {
          return <p>throw new Error('Function not implemented.');</p>;
        }}
        onChange={(e) => console.log(e.target.value)}
      ></MultiSelect>
      <Text alignSelf={'center'} fontSize="sm" color={bodySub}>
        OR
      </Text>
      <Heading size="sm">Create a new track</Heading>
      <Button alignSelf={'flex-end'} colorScheme={'purple'} leftIcon={<BiPlus></BiPlus>}>
        Add track
      </Button>
    </Stack>
  );
};

export default TrackForm;
