import {
  Button,
  Flex,
  Heading,
  Text,
  Spinner,
  Badge,
  Stack,
  Link,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Wrap,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import NextLink from 'next/link';

import { SummaryField } from '../Summary';
import EditDistributionForm from '../../forms/EditDistributionForm';
import EditArtworkForm from '../../forms/EditArtworkForm';
import ReleaseTaskCard from '../ReleaseTaskCard';

import { EnrichedRelease, EventType } from 'types';
import Card from 'components/Card';
import { TaskStatus } from '.prisma/client';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import AssigneeBadge from 'components/AssigneeBadge';
import ReleaseTaskBadge from 'components/ReleaseTaskBadge';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface Props {
  releaseData: EnrichedRelease;
}

const buildFields = (releaseData: EnrichedRelease): SummaryField[] => {
  const isComplete = releaseData.artwork?.status === TaskStatus.COMPLETE;
  return [
    {
      name: 'Assignees',
      content: (
        <Wrap justify="flex-end">
          {releaseData.artwork?.assignees?.length ? (
            releaseData.artwork?.assignees?.map((assignee) => (
              <AssigneeBadge key={assignee.id} user={assignee} />
            ))
          ) : (
            <Text fontSize="sm">No assignees</Text>
          )}
        </Wrap>
      ),
    },
    {
      name: 'Status',
      content: (
        <ReleaseTaskBadge status={releaseData.artwork?.status as TaskStatus} />
      ),
    },
    releaseData.artwork?.dueDate && {
      name: `${isComplete ? 'Original ' : ''}Due Date`,
      content: (
        <Text fontSize="sm">
          {dayjs.utc(releaseData.artwork?.dueDate).format('LL')}
        </Text>
      ),
    },
    {
      name: 'Completed On',
      content: (
        <Text fontSize="sm">
          {dayjs.utc(releaseData.artwork?.completedOn).format('LL')}
        </Text>
      ),
      hidden: !isComplete,
    },
  ].filter(Boolean) as SummaryField[];
};

const Artwork = ({ releaseData }: Props) => {
  const router = useRouter();

  const editUrl = `${router.query.id}/artwork/edit`;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { currentTeam, teams } = useExtendedSession();
  const canUpdateRelease = hasRequiredPermissions(
    ['UPDATE_RELEASES'],
    teams?.[currentTeam]
  );

  return (
    <>
      <ReleaseTaskCard
        heading={'🎨 Artwork '}
        onEditClick={onOpen}
        fields={buildFields(releaseData)}
        taskType={EventType.ARTWORK}
        data={releaseData.artwork}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <EditArtworkForm
            releaseData={releaseData}
            onSubmitSuccess={onClose}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Artwork;
