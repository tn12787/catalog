import React from 'react';
import { Badge, Stack, Text } from '@chakra-ui/react';

import QuickFormField from '../QuickFormField';

import AssigneeBadgeList from 'components/tasks/assignees/AssigneeBadge/AssigneeBadgeList';
import { WorkspaceMemberWithUser } from 'types/common';
import AssigneeSelect from 'components/tasks/assignees/AssigneeSelect';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import { priceData } from 'components/marketing/pricing/PricingTable/productData';
import { hasPaidPlan } from 'utils/billing';

type Props = {
  assignees: WorkspaceMemberWithUser[];
  isDisabled?: boolean;
  onChange: (value: string[]) => void | Promise<void>;
};

const AssigneesField = ({ isDisabled, assignees, onChange }: Props) => {
  const mapAssignees = (assignees: WorkspaceMemberWithUser[]) =>
    assignees.map((assignee) => assignee.id);
  const { workspace } = useCurrentWorkspace();

  const hasProFeature = hasPaidPlan(workspace, 'Label Plan');
  const pricesColor = priceData([]).label.colorScheme;

  return (
    <QuickFormField
      isDisabled={isDisabled || !hasProFeature}
      fieldName="assignees"
      value={assignees}
      labelRightContent={
        hasProFeature ? null : (
          <Badge variant="outline" size="xs" rounded="full" px={2} colorScheme={pricesColor}>
            Label Plan
          </Badge>
        )
      }
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
