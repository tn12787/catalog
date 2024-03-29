import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalBody,
  ModalHeader,
  Stack,
  HStack,
  Badge,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { BiPlus } from 'react-icons/bi';

import TrackList from './TrackList';

import { ClientRelease } from 'types/common';
import Card from 'components/Card';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import useAppColors from 'hooks/useAppColors';
import CreateEditTrackForm from 'components/tracks/forms/TrackForm';

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
      <Stack spacing={4}>
        <Flex align="center" justify="space-between" direction={['column', 'column', 'row']}>
          <Stack
            w="100%"
            align="center"
            justify={{ base: 'center', md: 'space-between' }}
            direction={{ base: 'column', md: 'row' }}
          >
            <HStack>
              <Heading fontWeight="semibold" fontSize="2xl">
                Tracks
              </Heading>
              <Badge colorScheme={'blue'} variant="subtle" size="xs">
                New
              </Badge>
            </HStack>
            {canUpdateRelease && (
              <Button
                size="sm"
                alignSelf={'center'}
                variant="outline"
                onClick={onOpen}
                leftIcon={<BiPlus />}
              >
                Add a track
              </Button>
            )}
          </Stack>
        </Flex>
        <Text fontSize="sm">{"Add the tracks that'll appear on your release."}</Text>
      </Stack>
      <TrackList releaseData={releaseData}></TrackList>

      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent p={3} bg={bgSecondary}>
          <ModalHeader>Add a track</ModalHeader>
          <ModalBody>
            <CreateEditTrackForm releaseData={releaseData} onSubmitSuccess={onClose} />
          </ModalBody>
          <ModalCloseButton></ModalCloseButton>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default TracksCard;
