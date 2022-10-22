import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { Track } from '@prisma/client';

import TrackItem from './TrackItem';
import TrackSelectedItems from './TrackSelectedItems';

import { MultiSelectListItemProps } from 'components/forms/MultiSelect/types';
import MultiSelect from 'components/forms/MultiSelect';
import useWorkspaceTracks from 'hooks/data/tracks/useWorkspaceTracks';
import { TrackResponse } from 'types/common';

interface Props extends Pick<ControllerRenderProps, 'onChange'> {
  value: TrackResponse[];
  borderless?: boolean;
}

const ExistingTrackSelect: React.FC<Props> = React.forwardRef<HTMLSelectElement, Props>(
  ({ value, borderless, onChange }: Props, ref) => {
    const { data: allTracks, isLoading } = useWorkspaceTracks({});

    return (
      <MultiSelect
        ref={ref}
        isLoading={isLoading}
        value={value}
        onChange={onChange}
        borderless={borderless}
        itemToString={(item: Track) => item?.name || ''}
        renderSelectedItems={TrackSelectedItems}
        renderListItem={(props: MultiSelectListItemProps<TrackResponse>) => (
          <TrackItem {...props} />
        )}
        searchPlaceholder="Search for a track..."
        allItems={allTracks?.results ?? []}
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
