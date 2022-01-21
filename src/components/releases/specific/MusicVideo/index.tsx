import { Text, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { TaskStatus } from '@prisma/client';

import { SummaryField } from '../Summary';
import ReleaseTaskCard from '../ReleaseTaskCard';

import EditMusicVideoForm from 'components/releases/forms/EditMusicVideoForm';
import { ClientRelease, EventType, TeamMemberWithUser } from 'types/common';
import TaskStatusBadge from 'components/tasks/TaskStatusBadge';
import AssigneeBadgeList from 'components/tasks/assignees/AssigneeBadge/AssigneeBadgeList';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface Props {
  releaseData: ClientRelease;
}

const buildFields = (musicVideoInfo: ClientRelease['musicVideo'] | undefined): SummaryField[] => {
  const isComplete = musicVideoInfo?.status === TaskStatus.COMPLETE;
  return [
    {
      name: 'Assignees',
      content: <AssigneeBadgeList assignees={musicVideoInfo?.assignees as TeamMemberWithUser[]} />,
    },
    {
      name: 'Status',
      content: <TaskStatusBadge status={musicVideoInfo?.status as TaskStatus} />,
    },
    musicVideoInfo?.dueDate && {
      name: `${isComplete ? 'Original ' : ''}Due Date`,
      content: <Text fontSize="sm">{dayjs.utc(musicVideoInfo.dueDate).format('LL')}</Text>,
    },
  ].filter(Boolean) as SummaryField[];
};

const MusicVideo = ({ releaseData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const musicVideoInfo = releaseData.musicVideo;
  return (
    <>
      <ReleaseTaskCard
        heading={'🎥 Music Video '}
        onEditClick={onOpen}
        fields={buildFields(musicVideoInfo)}
        taskType={EventType.MUSIC_VIDEO}
        data={musicVideoInfo}
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
