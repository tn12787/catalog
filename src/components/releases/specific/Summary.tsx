import {
  Button,
  Flex,
  Heading,
  Link,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import React from 'react';

import NewReleaseForm from '../forms/NewReleaseForm';

import { EnrichedRelease } from 'types';
import ReleaseStatusBadge from 'components/releases/ReleaseStatusBadge';
import Card from 'components/Card';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface Props {
  releaseData: EnrichedRelease;
}

export interface SummaryField {
  name: string;
  content: JSX.Element;
  hidden?: boolean;
}

const fields = (releaseData: EnrichedRelease): SummaryField[] => [
  {
    name: 'Artist',
    content: (
      <NextLink href={`/artists/${releaseData.artist.id}`} passHref>
        <Link>{releaseData.artist.name}</Link>
      </NextLink>
    ),
  },
  { name: 'Status', content: <ReleaseStatusBadge releaseData={releaseData} /> },
  { name: 'Release Type', content: <Text>{releaseData.type}</Text> },
  {
    name: 'Target Date',
    content: (
      <Text fontSize="sm">
        {dayjs.utc(releaseData.targetDate).format('LL')}
      </Text>
    ),
  },
];

const Summary = ({ releaseData }: Props) => {
  const router = useRouter();
  const editUrl = `${router.query.id}/summary/edit`;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { currentTeam, teams } = useExtendedSession();
  const canUpdateRelease = hasRequiredPermissions(
    ['UPDATE_RELEASES'],
    teams?.[currentTeam]
  );

  return (
    <Card alignItems={['center', 'center', 'stretch']}>
      <Flex
        align="center"
        justify="space-between"
        direction={['column', 'column', 'row']}
      >
        <Flex align="center" direction={['column', 'column', 'row']}>
          <Heading fontWeight="semibold" fontSize="2xl">
            Summary
          </Heading>
        </Flex>

        {canUpdateRelease && (
          <Button size="sm" colorScheme="purple" variant="outline" onClick={onOpen}>
            Edit
          </Button>
        )}
      </Flex>
      <Flex
        direction={['column', 'column', 'row']}
        py={4}
        width={'90%'}
        justify="space-between"
        alignItems={['center', 'center', 'stretch']}
      >
        {fields(releaseData).map((field) => {
          return (
            <Flex
              mb={[3, 3, 0]}
              width="100%"
              align={['center', 'center', 'flex-start']}
              direction={['row', 'row', 'column']}
              justify={['space-between']}
              key={field.name}
            >
              <Text fontSize="md" fontWeight="bold">
                {field.name}
              </Text>
              {field.content}
            </Flex>
          );
        })}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <NewReleaseForm
            existingRelease={releaseData}
            onSubmitSuccess={onClose}
          />
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default Summary;
