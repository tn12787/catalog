import React from 'react';
import { Stack, Text } from '@chakra-ui/react';

import QuickFormField from '../QuickFormField';

import AssigneeBadgeList from 'components/tasks/assignees/AssigneeBadge/AssigneeBadgeList';
import { WorkspaceMemberWithUser } from 'types/common';
import AssigneeSelect from 'components/tasks/assignees/AssigneeSelect';

type Props = {
  assignees: WorkspaceMemberWithUser[];
  isDisabled?: boolean;
  onChange: (value: string[]) => void | Promise<void>;
};

const AssigneesField = ({ isDisabled, assignees, onChange }: Props) => {
  const mapAssignees = (assignees: WorkspaceMemberWithUser[]) =>
    assignees.map((assignee) => assignee.id);

  return (
    <QuickFormField
      isDisabled={isDisabled}
      fieldName="assignees"
      value={assignees}
      renderValue={({ value }) => <AssigneeBadgeList assignees={value} />}
      onSubmit={onChange}
      renderEditing={({ value, onChange }) => (
        <Stack p={2}>
          <Text fontSize={'sm'} fontWeight={'semibold'}>
            Edit assignees
          </Text>
          <AssigneeSelect
            value={value}
            onChange={(assignees) => onChange(mapAssignees(assignees))}
          />
        </Stack>
      )}
    />
  );
};

export default AssigneesField;
