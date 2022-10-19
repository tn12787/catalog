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
  Text,
  Divider,
} from '@chakra-ui/react';
import React from 'react';
import { BiPlus } from 'react-icons/bi';
import { Track } from '@prisma/client';

import TrackList from './TrackList';

import { ClientRelease } from 'types/common';
import Card from 'components/Card';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import useAppColors from 'hooks/useAppColors';
import MultiSelect from 'components/forms/MultiSelect';
import {
  MultiSelectListItemProps,
  SelectedItemListProps,
} from 'components/forms/MultiSelect/types';

interface Props {
  releaseData: ClientRelease;
}

const TracksCard = ({ releaseData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bgSecondary, bodySub } = useAppColors();

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
        <ModalContent p={3} bg={bgSecondary}>
          <ModalHeader>Add a track</ModalHeader>
          <ModalBody>
            <Stack spacing={5}>
              <MultiSelect
                searchPlaceholder="Search for an existing track..."
                value={[]}
                allItems={[]}
                getItem={(item: Track) => item}
                renderListItem={(item: MultiSelectListItemProps<Track>) => (
                  <Text>{item.value}</Text>
                )}
                renderSelectedItems={function (props: SelectedItemListProps<any>): JSX.Element {
                  return <p>throw new Error('Function not implemented.');</p>;
                }}
                onChange={(e) => console.log(e.target.value)}
              ></MultiSelect>
              <Text alignSelf={'center'} fontSize="sm" color={bodySub}>
                OR
              </Text>
              <Heading size="sm">Create a new track</Heading>
              <Button alignSelf={'flex-end'} colorScheme={'purple'} leftIcon={<BiPlus></BiPlus>}>
                Add track
              </Button>
            </Stack>
          </ModalBody>
          <ModalCloseButton></ModalCloseButton>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default TracksCard;
