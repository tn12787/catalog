import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { User } from '@prisma/client';

import AssigneeItem from './AssigneeItem';
import AssigneeSelectedItems from './AssigneeSelectedItems';

import { WorkspaceMemberWithUserAndRoles } from 'types/common';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import MultiSelect from 'components/forms/MultiSelect';
import { MultiSelectListItemProps } from 'components/forms/MultiSelect/types';

interface Props extends Pick<ControllerRenderProps, 'onChange'> {
  value: WorkspaceMemberWithUserAndRoles[];
  borderless?: boolean;
}

const AssigneeSelect: React.FC<Props> = React.forwardRef(
  ({ value, borderless = false, onChange }: Props) => {
    const { workspace: workspaceData, isLoading } = useCurrentWorkspace();

    const allWorkspaceMembers = workspaceData?.members || [];

    return (
      <MultiSelect
        isLoading={isLoading}
        value={value}
        onChange={onChange}
        borderless={borderless}
        itemToString={(item) => item?.user?.name || ''}
        renderSelectedItems={AssigneeSelectedItems}
        renderListItem={(props: MultiSelectListItemProps<User>) => <AssigneeItem {...props} />}
        allItems={allWorkspaceMembers}
        filterFn={(item: WorkspaceMemberWithUserAndRoles, search: string) =>
          item.user.name?.toLowerCase().includes(search.toLowerCase()) ?? false
        }
        getItem={(item: WorkspaceMemberWithUserAndRoles) => item.user}
      />
    );
  }
);

AssigneeSelect.displayName = 'AssigneeSelect';

export default AssigneeSelect;
