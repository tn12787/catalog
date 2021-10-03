import { Text, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { User } from '@prisma/client';

import { SummaryField } from '../Summary';
import ReleaseTaskCard from '../ReleaseTaskCard';

import { EnrichedRelease, EventType } from 'types';
import { TaskStatus } from '.prisma/client';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import ReleaseTaskBadge from 'components/ReleaseTaskBadge';
import AssigneeBadgeList from 'components/AssigneeBadge/AssigneeBadgeList';
import EditMasteringForm from 'components/releases/forms/EditMasteringForm';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface Props {
  releaseData: EnrichedRelease;
}

const buildFields = (releaseData: EnrichedRelease): SummaryField[] => {
  const isComplete = releaseData.Mastering?.status === TaskStatus.COMPLETE;
  return [
    {
      name: 'Assignees',
      content: <AssigneeBadgeList assignees={releaseData?.Mastering?.assignees as User[]} />,
    },
    {
      name: 'Status',
      content: <ReleaseTaskBadge status={releaseData.Mastering?.status as TaskStatus} />,
    },
    releaseData.Mastering?.dueDate && {
      name: `${isComplete ? 'Original ' : ''}Due Date`,
      content: <Text fontSize="sm">{dayjs.utc(releaseData.Mastering?.dueDate).format('LL')}</Text>,
    },
  ].filter(Boolean) as SummaryField[];
};

const Mastering = ({ releaseData }: Props) => {
  const router = useRouter();

  const editUrl = `${router.query.id}/Mastering/edit`;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { currentTeam, teams } = useExtendedSession();
  const canUpdateRelease = hasRequiredPermissions(['UPDATE_RELEASES'], teams?.[currentTeam]);

  return (
    <>
      <ReleaseTaskCard
        heading={'🎚️ Mastering '}
        onEditClick={onOpen}
        fields={buildFields(releaseData)}
        taskType={EventType.MASTERING}
        data={releaseData.mastering}
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
