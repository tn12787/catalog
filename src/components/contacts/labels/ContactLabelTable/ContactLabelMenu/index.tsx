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

import ContactLabelModal from '../../ContactLabelModal';

import useExtendedSession from 'hooks/useExtendedSession';
import useAppColors from 'hooks/useAppColors';
import { ContactWithLabels } from 'types/common';
import { hasRequiredPermissions } from 'utils/auth';
import Dialog from 'components/Dialog';
import useContactLabelMutations from 'hooks/data/contacts/labels/useContactLabelMutations';

type Props = CellProps<ContactWithLabels>;

const ContactLabelMenu = ({ value }: Props) => {
  const { teams, currentTeam } = useExtendedSession();

  const canEdit = [
    hasRequiredPermissions(['UPDATE_CONTACTS'], teams?.[currentTeam]),
    teams?.[currentTeam].id !== value.id,
  ].every(Boolean);

  const { primary } = useAppColors();
  const cancelRef = useRef(null);
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const {
    deleteSingleContactLabel: { mutateAsync, isLoading },
  } = useContactLabelMutations();

  const onDelete = async () => {
    try {
      await mutateAsync({ teamId: currentTeam, id: value.id, name: value.name });
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
            Delete label
          </MenuItem>
        </MenuList>
      </Menu>
      <Dialog
        onConfirm={onDelete}
        leastDestructiveRef={cancelRef}
        loading={isLoading}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        title={`Remove label?`}
        message="Are you sure? It'll be removed from all contacts."
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
      <ContactLabelModal label={value} isOpen={isEditOpen} onClose={onEditClose} />
    </Flex>
  ) : (
    <></>
  );
};

export default ContactLabelMenu;
