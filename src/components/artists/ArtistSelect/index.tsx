import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { Contact } from '@prisma/client';

import ArtistItem from './ArtistItem';
import ArtistSelectedItems from './ArtistSelectedItems';

import { ArtistResponse } from 'types/common';
import MultiSelect from 'components/forms/MultiSelect';
import { MultiSelectListItemProps } from 'components/forms/MultiSelect/types';
import useArtists from 'hooks/data/artists/useArtists';

interface Props extends Pick<ControllerRenderProps, 'onChange'> {
  value: ArtistResponse[];
  borderless?: boolean;
}

const ArtistSelect: React.FC<Props> = React.forwardRef<HTMLSelectElement, Props>(
  ({ value, borderless = false, onChange }: Props, ref) => {
    const { data: artists, isLoading } = useArtists({ pagination: { page: 1, pageSize: 1000 } });

    const allArtists = artists || [];

    return (
      <MultiSelect
        ref={ref}
        isLoading={isLoading}
        value={value}
        onChange={onChange}
        borderless={borderless}
        itemToString={(item: ArtistResponse | null) => item?.name || ''}
        renderSelectedItems={ArtistSelectedItems}
        renderListItem={(props: MultiSelectListItemProps<Contact>) => <ArtistItem {...props} />}
        allItems={allArtists}
        filterFn={(item: ArtistResponse, search: string) =>
          item.name?.toLowerCase().includes(search.toLowerCase()) ?? false
        }
        getItem={(item: ArtistResponse) => item}
      />
    );
  }
);

ArtistSelect.displayName = 'ArtistSelect';

export default ArtistSelect;
