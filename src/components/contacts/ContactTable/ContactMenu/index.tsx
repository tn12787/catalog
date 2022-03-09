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
import { CellProps } from 'react-table';

import useExtendedSession from 'hooks/useExtendedSession';
import useAppColors from 'hooks/useAppColors';
import { ContactWithLabels } from 'types/common';
import { hasRequiredPermissions } from 'utils/auth';
import Dialog from 'components/Dialog';
import useContactMutations from 'hooks/data/contacts/useContactMutations';
import ContactModal from 'components/contacts/ContactModal';

type Props = CellProps<ContactWithLabels>;

const ContactMenu = ({ value }: Props) => {
  const { workspaceMemberships, currentWorkspace } = useExtendedSession();

  const canEdit = [
    hasRequiredPermissions(['UPDATE_CONTACTS'], workspaceMemberships?.[currentWorkspace]),
    workspaceMemberships?.[currentWorkspace]?.id !== value.id,
  ].every(Boolean);

  const { primary } = useAppColors();
  const cancelRef = useRef(null);
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const {
    deleteSingleContact: { mutateAsync, isLoading },
  } = useContactMutations();

  const onDelete = async () => {
    try {
      await mutateAsync({ workspaceId: currentWorkspace, id: value.id });
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
          <MenuItem color="red.500" onClick={onDeleteOpen}>
            Delete contact
          </MenuItem>
        </MenuList>
      </Menu>
      <Dialog
        onConfirm={onDelete}
        leastDestructiveRef={cancelRef}
        loading={isLoading}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        title={`Remove ${value.name}?`}
        message="Don't worry, you can always add them back later, though their association with any tasks won't be preserved."
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
      <ContactModal contact={value} isOpen={isEditOpen} onClose={onEditClose} />
    </Flex>
  ) : (
    <></>
  );
};

export default ContactMenu;
