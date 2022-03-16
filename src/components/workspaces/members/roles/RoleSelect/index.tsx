import React, { Ref } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Role } from '@prisma/client';

import RoleItem from './RoleItem';
import RoleSelectedItems from './RoleSelectedItems';

import { fetchRoles } from 'queries/roles';
import { MultiSelectListItemProps } from 'components/forms/MultiSelect/types';
import MultiSelect from 'components/forms/MultiSelect';

interface Props extends Pick<ControllerRenderProps, 'onChange'> {
  value: Role[];
  borderless?: boolean;
}

const RoleSelect: React.FC<Props> = React.forwardRef<HTMLSelectElement, Props>(
  ({ value, borderless, onChange }: Props, ref) => {
    const { data: allRoles, isLoading } = useQuery(['roles'], fetchRoles);

    return (
      <MultiSelect
        ref={ref}
        isLoading={isLoading}
        value={value}
        onChange={onChange}
        borderless={borderless}
        itemToString={(item: Role) => item?.name || ''}
        renderSelectedItems={RoleSelectedItems}
        renderListItem={(props: MultiSelectListItemProps<Role>) => <RoleItem {...props} />}
        allItems={allRoles ?? []}
        filterFn={(item: Role, search: string) =>
          item.name?.toLowerCase().includes(search.toLowerCase()) ?? false
        }
        getItem={(item: Role) => item}
      />
    );
  }
);

RoleSelect.displayName = 'RoleSelect';

export default RoleSelect;
