import { Tag } from '@chakra-ui/react';
import React from 'react';

import { ClientRelease } from 'types/common';
import {
  clientMarketingPrepTasks,
  clientReleasePrepTasks,
  hasAllRequiredTasks,
} from 'utils/releases';
import { isTaskComplete, isTaskOverdue } from 'utils/tasks';

interface Props {
  releaseData: ClientRelease;
}

const releaseToBadge = (releaseData: ClientRelease) => {
  if (!hasAllRequiredTasks(releaseData)) {
    return { label: 'Prep Info Missing', color: 'gray' };
  }

  const prepTasks = clientReleasePrepTasks(releaseData);

  if (prepTasks.some(isTaskOverdue)) {
    return { label: 'Tasks Overdue', color: 'red' };
  }

  if (!prepTasks.every(isTaskComplete)) {
    return { label: 'Prep In Progress', color: 'yellow' };
  }

  const marketingTasks = clientMarketingPrepTasks(releaseData);

  if (marketingTasks.length && !marketingTasks.every(isTaskComplete)) {
    return { label: 'Marketing In Progress', color: 'yellow' };
  }

  if (new Date(releaseData.targetDate).getTime() < Date.now()) {
    return { label: 'Released', color: 'green' };
  }

  return { label: 'Ready to go', color: 'green' };
};

const ReleaseStatusBadge = ({ releaseData }: Props) => {
  const { label, color } = releaseToBadge(releaseData);
  return (
    <Tag size="sm" noOfLines={1} borderRadius={30} flexGrow={0} variant="solid" colorScheme={color}>
      {label}
    </Tag>
  );
};

export default ReleaseStatusBadge;
