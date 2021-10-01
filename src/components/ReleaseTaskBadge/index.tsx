import { Badge } from '@chakra-ui/react';
import { TaskStatus } from '@prisma/client';
import React from 'react';

interface Props {
  status: TaskStatus;
}

const deriveBadgeColor = (status?: TaskStatus) => {
  switch (status) {
    case TaskStatus.OUTSTANDING:
      return 'red';
    case TaskStatus.IN_PROGRESS:
      return 'orange';
    case TaskStatus.COMPLETE:
      return 'green';
    default:
      return 'gray';
  }
};

const deriveBadgeText = (status?: TaskStatus) => {
  switch (status) {
    case TaskStatus.OUTSTANDING:
      return 'Oustanding';
    case TaskStatus.IN_PROGRESS:
      return 'In progress';
    case TaskStatus.COMPLETE:
      return 'Complete';
    default:
      return 'gray';
  }
};

const ReleaseTaskBadge = ({ status }: Props) => {
  return (
    <Badge colorScheme={deriveBadgeColor(status)}>
      {deriveBadgeText(status)}
    </Badge>
  );
};

export default ReleaseTaskBadge;
