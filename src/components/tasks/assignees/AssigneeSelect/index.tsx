import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { User } from '@prisma/client';

import AssigneeItem from './AssigneeItem';
import AssigneeSelectedItems from './AssigneeSelectedItems';

import { TeamMemberWithUserAndRoles } from 'types/common';
import useCurrentTeam from 'hooks/data/team/useCurrentTeam';
import MultiSelect from 'components/forms/MultiSelect';
import { MultiSelectListItemProps } from 'components/forms/MultiSelect/types';

interface Props extends Pick<ControllerRenderProps, 'onChange'> {
  value: TeamMemberWithUserAndRoles[];
  borderless?: boolean;
}

const AssigneeSelect: React.FC<Props> = React.forwardRef(
  ({ value, borderless = false, onChange }: Props) => {
    const { team: teamData, isLoading } = useCurrentTeam();

    const allTeamMembers = teamData?.members || [];

    return (
      <MultiSelect
        isLoading={isLoading}
        value={value}
        onChange={onChange}
        borderless={borderless}
        itemToString={(item) => item?.user?.name || ''}
        renderSelectedItems={AssigneeSelectedItems}
        renderListItem={(props: MultiSelectListItemProps<User>) => <AssigneeItem {...props} />}
        allItems={allTeamMembers}
        filterFn={(item: TeamMemberWithUserAndRoles, search: string) =>
          item.user.name?.toLowerCase().includes(search.toLowerCase()) ?? false
        }
        getItem={(item: TeamMemberWithUserAndRoles) => item.user}
      />
    );
  }
);

AssigneeSelect.displayName = 'AssigneeSelect';

export default AssigneeSelect;
