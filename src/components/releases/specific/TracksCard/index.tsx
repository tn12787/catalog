import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Text,
  ModalBody,
  ModalHeader,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { BiPlus } from 'react-icons/bi';

import TrackList from './TrackList';

import { ClientRelease } from 'types/common';
import Card from 'components/Card';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import useAppColors from 'hooks/useAppColors';

interface Props {
  releaseData: ClientRelease;
}

const TracksCard = ({ releaseData }: Props) => {
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
            Tracks
          </Heading>
        </Flex>
      </Flex>
      <TrackList tracks={releaseData.tracks}></TrackList>
      {canUpdateRelease && (
        <Button
          alignSelf={'center'}
          variant="solid"
          colorScheme={'purple'}
          onClick={onOpen}
          leftIcon={<BiPlus />}
        >
          Add a track
        </Button>
      )}
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent bg={bgSecondary}>
          <ModalHeader>Add a track</ModalHeader>
          <ModalBody>
            <Stack>
              <SearchBa>
                <p>
                  <Text>boio</Text>
                </p>
              </SearchBa>
            </Stack>
          </ModalBody>
          <ModalCloseButton></ModalCloseButton>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default TracksCard;
