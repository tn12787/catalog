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

import { EnrichedRelease } from 'types';
import Card from 'components/Card';
import { TaskStatus } from '.prisma/client';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import AssigneeBadge from 'components/AssigneeBadge';

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
    <Card flex={1} alignItems={['center', 'center', 'stretch']}>
      <Flex
        align="center"
        justify="space-between"
        direction={['column', 'column', 'row']}
      >
        <Flex align="center" direction={['column', 'column', 'row']}>
          <Heading fontSize="2xl" fontWeight="bold">
            🎨 Artwork
          </Heading>
          {releaseData?.artwork && (
            <Badge colorScheme="purple" mt={[1, 1, 0]} ml={[0, 0, 3]}>
              {releaseData?.artwork.status}
            </Badge>
          )}
        </Flex>
        {releaseData.artwork && canUpdateRelease && (
          <Button
            flexGrow={0}
            size="sm"
            onClick={onOpen}
            colorScheme="purple"
            variant="outline"
          >
            Edit
          </Button>
        )}
      </Flex>
      {releaseData.artwork ? (
        <Flex
          direction={['column', 'column', 'row']}
          py={4}
          width={'100%'}
          justify="space-between"
          alignItems={['center', 'center', 'stretch']}
        >
          <Stack width={'100%'}>
            {buildFields(releaseData).map(({ name, content, hidden }) => {
              return hidden ? null : (
                <Stack
                  align={['center', 'center', 'flex-start']}
                  direction={['row']}
                  justify={['space-between']}
                >
                  <Text fontSize="md" fontWeight="bold">
                    {name}
                  </Text>
                  {content}
                </Stack>
              );
            })}
            <Stack>
              {releaseData.artwork?.notes ? (
                <Stack>
                  <Text fontSize="md" fontWeight="bold">
                    Notes
                  </Text>
                  <Text whiteSpace="pre-wrap">
                    {releaseData.artwork?.notes}
                  </Text>
                </Stack>
              ) : null}
            </Stack>
          </Stack>
        </Flex>
      ) : (
        <Flex py={4} align="center" direction="column" justify="space-between">
          <Text mb={3}>This release has no artwork info yet.</Text>
          {canUpdateRelease && (
            <Button flexGrow={0} colorScheme="purple" onClick={onOpen}>
              Add now
            </Button>
          )}
        </Flex>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <EditArtworkForm
            releaseData={releaseData}
            onSubmitSuccess={onClose}
          />
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default Artwork;
