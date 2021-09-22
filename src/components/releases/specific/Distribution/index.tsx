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

import { TaskStatus } from '.prisma/client';
import { EnrichedRelease } from 'types';
import Card from 'components/Card';
import NewReleaseForm from 'components/releases/forms/NewReleaseForm';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';

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
    <Card flex={1}>
      <Flex
        direction={['column', 'column', 'row']}
        align="center"
        justify="space-between"
        flexWrap="wrap"
      >
        <Flex align="center" direction={{ base: 'column', md: 'row' }}>
          <Heading whiteSpace="nowrap" fontWeight="semibold" fontSize="2xl">
            💿 Distribution
          </Heading>
          <Badge colorScheme="purple" mt={[1, 1, 0]} ml={[0, 0, 3]}>
            {releaseData.distribution?.status}
          </Badge>
        </Flex>
        {releaseData.distribution && canUpdateRelease && (
          <Button
            mt={[2, 2, 0]}
            flexGrow={0}
            height="auto"
            py={1}
            px={12}
            onClick={onOpen}
            colorScheme="purple"
            variant="outline"
          >
            Edit
          </Button>
        )}
      </Flex>
      {releaseData.distribution ? (
        <Flex py={4} direction={['column', 'column', 'row']}>
          <Stack
            width={['auto', 'auto', '50%']}
            pb={2}
            justify="space-between"
            direction="column"
          >
            {buildFields(releaseData).map(({ name, content, hidden }) => {
              return hidden ? null : (
                <Flex
                  mb={[3, 3, 0]}
                  width="100%"
                  align={['center', 'center', 'flex-start']}
                  direction={['row', 'row', 'column']}
                  justify={['space-between']}
                >
                  <Text fontSize="md" fontWeight="bold">
                    {name}
                  </Text>
                  {content}
                </Flex>
              );
            })}
          </Stack>
          <Stack width={['auto', 'auto', '50%']}>
            {releaseData.distribution?.notes ? (
              <Stack>
                <Text fontSize="md" fontWeight="bold">
                  Notes
                </Text>
                <Text whiteSpace="pre-wrap">
                  {releaseData.distribution?.notes}
                </Text>
              </Stack>
            ) : null}
          </Stack>
        </Flex>
      ) : (
        <Flex py={4} align="center" direction="column" justify="space-between">
          <Text mb={3}>This release has no distribution info yet.</Text>
          {canUpdateRelease && (
            <Button flexGrow={0} onClick={onOpen} colorScheme="purple">
              Add now
            </Button>
          )}
        </Flex>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <EditDistributionForm
            releaseData={releaseData}
            onSubmitSuccess={onClose}
          />
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default Distribution;
