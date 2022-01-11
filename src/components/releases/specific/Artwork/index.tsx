import { Text, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { ReleaseTaskType, User } from '@prisma/client';
import { TaskStatus } from '@prisma/client';

import { SummaryField } from '../Summary';
import EditArtworkForm from '../../forms/EditArtworkForm';
import ReleaseTaskCard from '../ReleaseTaskCard';

import { EnrichedRelease, EnrichedReleaseTask, EventType } from 'types';
import ReleaseTaskBadge from 'components/ReleaseTaskBadge';
import AssigneeBadgeList from 'components/AssigneeBadge/AssigneeBadgeList';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface Props {
  releaseData: EnrichedRelease;
}

const buildFields = (artworkTask: EnrichedReleaseTask | undefined): SummaryField[] => {
  const isComplete = artworkTask?.status === TaskStatus.COMPLETE;
  return [
    {
      name: 'Assignees',
      content: <AssigneeBadgeList assignees={artworkTask?.assignees as User[]} />,
    },
    {
      name: 'Status',
      content: <ReleaseTaskBadge status={artworkTask?.status as TaskStatus} />,
    },
    artworkTask?.dueDate && {
      name: `${isComplete ? 'Original ' : ''}Due Date`,
      content: <Text fontSize="sm">{dayjs.utc(artworkTask?.dueDate).format('LL')}</Text>,
    },
  ].filter(Boolean) as SummaryField[];
};

const Artwork = ({ releaseData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const artworkTask = releaseData.tasks.find((item) => item.type === ReleaseTaskType.ARTWORK);
  return (
    <>
      <ReleaseTaskCard
        heading={'🎨 Artwork '}
        onEditClick={onOpen}
        fields={buildFields(artworkTask)}
        taskType={EventType.ARTWORK}
        data={artworkTask}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <EditArtworkForm releaseData={releaseData} onSubmitSuccess={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Artwork;
