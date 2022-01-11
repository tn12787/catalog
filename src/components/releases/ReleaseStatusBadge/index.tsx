import { Tag } from '@chakra-ui/react';
import React from 'react';

import { ClientRelease } from 'types';

interface Props {
  releaseData: ClientRelease;
}

const ReleaseStatusBadge = ({ releaseData }: Props) => {
  const deriveProps = (releaseData: EnrichedRelease) => {
    if (!['artist', 'distribution'].every((item) => releaseData[item])) {
      return { label: 'Incomplete', color: 'yellow' };
    } else if (new Date(releaseData.targetDate).getTime() < Date.now()) {
      return { label: 'Available', color: 'green' };
    }
    return { label: 'Ready', color: 'purple' };
  };

  const { label, color } = deriveProps(releaseData);
  return (
    <Tag size="sm" borderRadius={30} flexGrow={0} variant="solid" colorScheme={color}>
      {label}
    </Tag>
  );
};

export default ReleaseStatusBadge;
