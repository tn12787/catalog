import { Tag } from '@chakra-ui/react';
import React from 'react';
import { Release } from 'types';

interface Props {
  releaseData: Release;
}

const ReleaseStatusBadge = ({ releaseData }: Props) => {
  const deriveProps = (releaseData: Release) => {
    if (!['artist', 'distribution'].every((item) => releaseData[item])) {
      return { label: 'Incomplete', color: 'yellow' };
    } else if (new Date(releaseData.targetDate).valueOf() < Date.now()) {
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
