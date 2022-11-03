import {
  Button,
  Flex,
  Heading,
  Link,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { format } from 'date-fns';
import { BiPencil } from 'react-icons/bi';

import NewReleaseForm from '../forms/NewReleaseForm';

import { ClientRelease } from 'types/common';
import ReleaseStatusBadge from 'components/releases/ReleaseStatusBadge';
import Card from 'components/Card';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import useAppColors from 'hooks/useAppColors';

interface Props {
  releaseData: ClientRelease;
}

export interface SummaryField {
  name: string;
  content: JSX.Element;
  hidden?: boolean;
}

const fields = (releaseData: ClientRelease): SummaryField[] => [
  {
    name: 'Primary Artist',
    content: (
      <NextLink href={`/artists/${releaseData.artist.id}`} passHref>
        <Link>{releaseData.artist.name}</Link>
      </NextLink>
    ),
  },
  { name: 'Status', content: <ReleaseStatusBadge releaseData={releaseData} /> },
  { name: 'Release Type', content: <Text>{releaseData.type}</Text> },
  {
    name: 'Release Date',
    content: <Text fontSize="sm">{format(new Date(releaseData.targetDate), 'PPP')}</Text>,
  },
];

const Summary = ({ releaseData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bgSecondary } = useAppColors();

  const { currentWorkspace, workspaceMemberships } = useExtendedSession();
  const canUpdateRelease = hasRequiredPermissions(
    ['UPDATE_RELEASES'],
    workspaceMemberships?.[currentWorkspace]
  );

  return (
    <Card alignItems={['center', 'center', 'stretch']}>
      <Flex align="center" justify="space-between" direction={['column', 'column', 'row']}>
        <Flex align="center" direction={['column', 'column', 'row']}>
          <Heading fontWeight="semibold" fontSize="2xl">
            Summary
          </Heading>
        </Flex>

        {canUpdateRelease && (
          <Button size="sm" leftIcon={<BiPencil />} variant="outline" onClick={onOpen}>
            Edit
          </Button>
        )}
      </Flex>
      <Flex
        direction={['column', 'column', 'row']}
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
              <Text fontSize="sm" fontWeight="semibold">
                {field.name}
              </Text>
              {field.content}
            </Flex>
          );
        })}
      </Flex>
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent bg={bgSecondary}>
          <ModalCloseButton></ModalCloseButton>
          <NewReleaseForm existingRelease={releaseData} onSubmitSuccess={onClose} />
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default Summary;
