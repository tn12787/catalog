import React from 'react';
import { Text, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { TaskStatus, User } from '@prisma/client';

import { SummaryField } from '../Summary';
import ReleaseTaskCard from '../ReleaseTaskCard';

import { ClientRelease, EventType } from 'types';
import ReleaseTaskBadge from 'components/ReleaseTaskBadge';
import AssigneeBadgeList from 'components/AssigneeBadge/AssigneeBadgeList';
import EditMasteringForm from 'components/releases/forms/EditMasteringForm';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface Props {
  releaseData: ClientRelease;
}

const buildFields = (masteringInfo: ClientRelease['mastering'] | undefined): SummaryField[] => {
  const isComplete = masteringInfo?.status === TaskStatus.COMPLETE;
  return [
    {
      name: 'Assignees',
      content: <AssigneeBadgeList assignees={masteringInfo?.assignees as User[]} />,
    },
    {
      name: 'Status',
      content: <ReleaseTaskBadge status={masteringInfo?.status as TaskStatus} />,
    },
    masteringInfo?.dueDate && {
      name: `${isComplete ? 'Original ' : ''}Due Date`,
      content: <Text fontSize="sm">{dayjs.utc(masteringInfo.dueDate).format('LL')}</Text>,
    },
  ].filter(Boolean) as SummaryField[];
};

const Mastering = ({ releaseData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const masteringInfo = releaseData.mastering;
  return (
    <>
      <ReleaseTaskCard
        heading={'🎚️ Mastering '}
        onEditClick={onOpen}
        fields={buildFields(masteringInfo)}
        taskType={EventType.MASTERING}
        data={masteringInfo}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <EditMasteringForm releaseData={releaseData} onSubmitSuccess={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Mastering;
