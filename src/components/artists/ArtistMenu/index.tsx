import {
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

import ArtistModal from '../ArtistModal';

import useExtendedSession from 'hooks/useExtendedSession';
import useAppColors from 'hooks/useAppColors';
import { ArtistResponse } from 'types/common';
import { hasRequiredPermissions } from 'utils/auth';
import Dialog from 'components/Dialog';
import useContactLabelMutations from 'hooks/data/contacts/labels/useContactLabelMutations';

type Props = { artist: ArtistResponse };

const ArtistMenu = ({ artist }: Props) => {
  const { workspaceMemberships, currentWorkspace } = useExtendedSession();

  const canEdit = [
    hasRequiredPermissions(['UPDATE_ARTISTS'], workspaceMemberships?.[currentWorkspace]),
  ].every(Boolean);

  const canDelete = hasRequiredPermissions(
    ['DELETE_ARTISTS'],
    workspaceMemberships?.[currentWorkspace]
  );

  const { primary } = useAppColors();
  const cancelRef = useRef(null);
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const {
    deleteSingleContactLabel: { mutateAsync, isLoading },
  } = useContactLabelMutations();

  const onDelete = async () => {
    try {
      await mutateAsync({ workspaceId: currentWorkspace, id: artist.id, name: artist.name });
      onDeleteClose();
    } catch (error: any) {}
  };

  return canEdit ? (
    <Flex justifyContent={'flex-end'}>
      <Menu size="sm">
        <MenuButton
          justifySelf={'flex-end'}
          size="sm"
          as={IconButton}
          variant="unstyled"
          p={0}
          height="auto"
          _hover={{
            color: primary,
          }}
          icon={<BiDotsHorizontalRounded fontSize={'24px'} />}
        ></MenuButton>
        <MenuList>
          <MenuItem onClick={onEditOpen}>Edit info</MenuItem>
          {canDelete && (
            <MenuItem color="red.500" onClick={onDeleteOpen}>
              Delete artist
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      <Dialog
        onConfirm={onDelete}
        leastDestructiveRef={cancelRef}
        loading={isLoading}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        title={`Delete artist?`}
        message="Are you sure? This action cannot be undone. It will remove all releases associated to this artist."
        buttons={
          <ButtonGroup size={'sm'}>
            <Button colorScheme="red" isLoading={isLoading} ml={3} onClick={onDelete}>
              Remove
            </Button>
            <Button ref={cancelRef} onClick={onDeleteClose}>
              Cancel
            </Button>
          </ButtonGroup>
        }
      />
      <ArtistModal artist={artist} isOpen={isEditOpen} onClose={onEditClose} />
    </Flex>
  ) : (
    <></>
  );
};

export default ArtistMenu;
