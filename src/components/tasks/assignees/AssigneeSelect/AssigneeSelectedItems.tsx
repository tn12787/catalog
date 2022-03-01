import React from 'react';
import { Wrap } from '@chakra-ui/react';

import AssigneeBadge from '../AssigneeBadge';

import { SelectedItemListProps } from 'components/forms/MultiSelect/types';
import { TeamMemberWithUserAndRoles } from 'types/common';

const AssigneeSelectedItems = ({
  items,
  onChange,
}: SelectedItemListProps<TeamMemberWithUserAndRoles>) => {
  return (
    <Wrap>
      {items?.length
        ? items?.map((assignee) => {
            return (
              <AssigneeBadge
                onRemoveClick={(removedUser) => {
                  onChange(items?.filter((item) => item?.id !== removedUser.id));
                }}
                editable
                key={assignee.id}
                teamMember={assignee}
              />
            );
          })
        : null}
    </Wrap>
  );
};

export default AssigneeSelectedItems;
