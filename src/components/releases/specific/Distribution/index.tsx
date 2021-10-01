import {
  Badge,
  Button,
  Flex,
  Heading,
  Link,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  Wrap,
} from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { SummaryField } from '../Summary';
import EditDistributionForm from '../../forms/EditDistributionForm';
import ReleaseTaskCard from '../ReleaseTaskCard';

import { TaskStatus } from '.prisma/client';
import { EnrichedRelease, EventType } from 'types';
import Card from 'components/Card';
import NewReleaseForm from 'components/releases/forms/NewReleaseForm';
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
  const isComplete = releaseData.distribution?.status === TaskStatus.COMPLETE;
  return [
    {
      name: 'Assignees',
      content: (
        <Wrap>
          {releaseData.distribution?.assignees?.length ? (
            releaseData.distribution?.assignees?.map((assignee) => (
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
        <ReleaseTaskBadge
          status={releaseData.distribution?.status as TaskStatus}
        />
      ),
    },
    {
      name: 'Distributor',
      content: (
        <Text fontSize="sm">{releaseData.distribution?.distributor?.name}</Text>
      ),
    },
    {
      name: `${isComplete ? 'Original ' : ''}Due Date`,
      content: (
        <Text fontSize="sm">
          {dayjs.utc(releaseData.distribution?.dueDate).format('LL')}
        </Text>
      ),
    },
    {
      name: 'Completed On',
      content: (
        <Text fontSize="sm">
          {dayjs.utc(releaseData.distribution?.completedOn).format('LL')}
        </Text>
      ),
      hidden: !isComplete,
    },
  ];
};

const Distribution = ({ releaseData }: Props) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { currentTeam, teams } = useExtendedSession();
  const canUpdateRelease = hasRequiredPermissions(
    ['UPDATE_RELEASES'],
    teams?.[currentTeam]
  );

  return (
    <>
      <ReleaseTaskCard
        heading={'💿 Distribution'}
        onEditClick={onOpen}
        fields={buildFields(releaseData)}
        taskType={EventType.DISTRIBUTION}
        data={releaseData.distribution}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <EditDistributionForm
            releaseData={releaseData}
            onSubmitSuccess={onClose}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Distribution;
