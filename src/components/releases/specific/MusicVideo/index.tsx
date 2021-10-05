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

import EditMusicVideoForm from 'components/releases/forms/EditMusicVideoForm';
import { EnrichedRelease, EventType } from 'types';
import { TaskStatus } from '.prisma/client';
import useExtendedSession from 'hooks/useExtendedSession';
import ReleaseTaskBadge from 'components/ReleaseTaskBadge';
import AssigneeBadgeList from 'components/AssigneeBadge/AssigneeBadgeList';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface Props {
  releaseData: EnrichedRelease;
}

const buildFields = (releaseData: EnrichedRelease): SummaryField[] => {
  const isComplete = releaseData.musicVideo?.status === TaskStatus.COMPLETE;
  return [
    {
      name: 'Assignees',
      content: <AssigneeBadgeList assignees={releaseData?.musicVideo?.assignees as User[]} />,
    },
    {
      name: 'Status',
      content: <ReleaseTaskBadge status={releaseData.musicVideo?.status as TaskStatus} />,
    },
    releaseData.musicVideo?.dueDate && {
      name: `${isComplete ? 'Original ' : ''}Due Date`,
      content: <Text fontSize="sm">{dayjs.utc(releaseData.musicVideo?.dueDate).format('LL')}</Text>,
    },
  ].filter(Boolean) as SummaryField[];
};

const MusicVideo = ({ releaseData }: Props) => {
  const router = useRouter();

  const editUrl = `${router.query.id}/MusicVideo/edit`;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { currentTeam, teams } = useExtendedSession();

  return (
    <>
      <ReleaseTaskCard
        heading={'🎥 Music Video '}
        onEditClick={onOpen}
        fields={buildFields(releaseData)}
        taskType={EventType.MUSIC_VIDEO}
        data={releaseData.musicVideo}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <EditMusicVideoForm releaseData={releaseData} onSubmitSuccess={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default MusicVideo;
