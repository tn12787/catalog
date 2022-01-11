import { Modal, ModalContent, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { TaskStatus, User } from '@prisma/client';

import { SummaryField } from '../Summary';
import EditDistributionForm from '../../forms/EditDistributionForm';
import ReleaseTaskCard from '../ReleaseTaskCard';

import { ClientRelease, EventType } from 'types';
import ReleaseTaskBadge from 'components/ReleaseTaskBadge';
import AssigneeBadgeList from 'components/AssigneeBadge/AssigneeBadgeList';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface Props {
  releaseData: ClientRelease;
}

const buildFields = (
  distributionTask: ClientRelease['distribution'] | undefined
): SummaryField[] => {
  const isComplete = distributionTask?.status === TaskStatus.COMPLETE;
  return [
    {
      name: 'Assignees',
      content: <AssigneeBadgeList assignees={distributionTask?.assignees as User[]} />,
    },
    {
      name: 'Status',
      content: <ReleaseTaskBadge status={distributionTask?.status as TaskStatus} />,
    },
    {
      name: 'Distributor',
      content: <Text fontSize="sm">{distributionTask?.distributor?.name}</Text>,
    },
    {
      name: `${isComplete ? 'Original ' : ''}Due Date`,
      content: <Text fontSize="sm">{dayjs.utc(distributionTask?.dueDate).format('LL')}</Text>,
    },
  ];
};

const Distribution = ({ releaseData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const distributionTask = releaseData.distribution;

  return (
    <>
      <ReleaseTaskCard
        heading={'💿 Distribution'}
        onEditClick={onOpen}
        fields={buildFields(distributionTask)}
        taskType={EventType.DISTRIBUTION}
        data={distributionTask}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <EditDistributionForm releaseData={releaseData} onSubmitSuccess={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Distribution;
