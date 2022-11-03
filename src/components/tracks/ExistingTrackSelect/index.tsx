import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { Track } from '@prisma/client';
import { Text } from '@chakra-ui/layout';

import TrackItem from './TrackItem';
import TrackSelectedItems from './TrackSelectedItems';

import { MultiSelectListItemProps } from 'components/forms/MultiSelect/types';
import MultiSelect from 'components/forms/MultiSelect';
import useWorkspaceTracks from 'hooks/data/tracks/useWorkspaceTracks';
import { TrackResponse } from 'types/common';
import useAppColors from 'hooks/useAppColors';

interface Props extends Pick<ControllerRenderProps, 'onChange'> {
  value: TrackResponse[];
  borderless?: boolean;
  existingTracks: Track[];
}

const ExistingTrackSelect: React.FC<Props> = React.forwardRef<HTMLSelectElement, Props>(
  ({ value, borderless, onChange, existingTracks }: Props, ref) => {
    const { data: allTracks, isLoading } = useWorkspaceTracks({});
    const { bodySub } = useAppColors();

    const availableTracks =
      allTracks?.results?.filter((t) => !existingTracks.find((et) => et.id === t.id)) ?? [];

    return (
      <MultiSelect
        ref={ref}
        isLoading={isLoading}
        value={value}
        onChange={onChange}
        borderless={borderless}
        emptyContent={
          <Text color={bodySub} fontSize="sm">
            No tracks matched your search, or there are no more tracks in your workspace to add.
          </Text>
        }
        itemToString={(item: Track) => item?.name || ''}
        renderSelectedItems={TrackSelectedItems}
        renderListItem={(props: MultiSelectListItemProps<TrackResponse>) => (
          <TrackItem {...props} />
        )}
        searchPlaceholder="Search for a track..."
        allItems={availableTracks}
        filterFn={(item: Track, search: string) =>
          item.name?.toLowerCase().includes(search.toLowerCase()) ?? false
        }
        getItem={(item: Track) => item}
      />
    );
  }
);

ExistingTrackSelect.displayName = 'RoleSelect';

export default ExistingTrackSelect;
