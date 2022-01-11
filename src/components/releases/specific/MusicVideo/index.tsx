import { Text, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { ReleaseTaskType, User } from '@prisma/client';
import { TaskStatus } from '@prisma/client';

import { SummaryField } from '../Summary';
import ReleaseTaskCard from '../ReleaseTaskCard';

import EditMusicVideoForm from 'components/releases/forms/EditMusicVideoForm';
import { EnrichedRelease, EnrichedReleaseTask, EventType } from 'types';
import ReleaseTaskBadge from 'components/ReleaseTaskBadge';
import AssigneeBadgeList from 'components/AssigneeBadge/AssigneeBadgeList';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface Props {
  releaseData: EnrichedRelease;
}

const buildFields = (musicVideoInfo: EnrichedReleaseTask | undefined): SummaryField[] => {
  const isComplete = musicVideoInfo?.status === TaskStatus.COMPLETE;
  return [
    {
      name: 'Assignees',
      content: <AssigneeBadgeList assignees={musicVideoInfo?.assignees as User[]} />,
    },
    {
      name: 'Status',
      content: <ReleaseTaskBadge status={musicVideoInfo?.status as TaskStatus} />,
    },
    musicVideoInfo?.dueDate && {
      name: `${isComplete ? 'Original ' : ''}Due Date`,
      content: <Text fontSize="sm">{dayjs.utc(musicVideoInfo.dueDate).format('LL')}</Text>,
    },
  ].filter(Boolean) as SummaryField[];
};

const MusicVideo = ({ releaseData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const musicVideoInfo = releaseData.tasks.find(
    (item) => item.type === ReleaseTaskType.MUSIC_VIDEO
  );
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
