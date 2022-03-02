import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { CellProps } from 'react-table';
import { useMutation, useQueryClient } from 'react-query';

import useExtendedSession from 'hooks/useExtendedSession';
import useAppColors from 'hooks/useAppColors';
import { WorkspaceMemberWithUserAndRoles } from 'types/common';
import { hasRequiredPermissions } from 'utils/auth';
import Dialog from 'components/Dialog';
import { deleteWorkspaceMember } from 'queries/workspaces';
import ManageUserForm from 'components/workspaces/forms/ManageUserForm';

type Props = CellProps<WorkspaceMemberWithUserAndRoles>;

const WorkspaceMemberMenu = ({ value }: Props) => {
  const { workspaceMemberships, currentWorkspace } = useExtendedSession();

  const canEdit = [
    hasRequiredPermissions(['UPDATE_TEAM'], workspaceMemberships?.[currentWorkspace]),
    workspaceMemberships?.[currentWorkspace].id !== value.id,
  ].every(Boolean);

  const { primary } = useAppColors();
  const cancelRef = useRef(null);
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutateAsync: removeWorkspaceMember, isLoading } = useMutation(deleteWorkspaceMember, {
    onSuccess: () => {
      queryClient.invalidateQueries(['workspace', currentWorkspace]);
    },
  });

  const onDelete = async () => {
    try {
      await removeWorkspaceMember({ workspaceId: currentWorkspace, workspaceMemberId: value.id });
      toast({
        status: 'success',
        title: 'Workspace member removed',
      });
      onDeleteClose();
    } catch (error: any) {
      toast({
        status: 'error',
        title: 'Oh no...',
        description: error.toString(),
      });
    }
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
          <MenuItem onClick={onEditOpen}>Manage roles</MenuItem>
          <MenuItem color="red.500" onClick={onDeleteOpen}>
            Remove from workspace
          </MenuItem>
        </MenuList>
      </Menu>
      <Dialog
        onConfirm={onDelete}
        leastDestructiveRef={cancelRef}
        loading={isLoading}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        title={`Remove ${value.user.name} from workspace?`}
        message="Don't worry, you can always invite them back later."
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
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay></ModalOverlay>
        <ModalHeader>
          <Heading>Invite user</Heading>
        </ModalHeader>
        <ModalContent>
          <ManageUserForm workspaceMember={value} onSubmitSuccess={() => onEditClose()} />
        </ModalContent>
      </Modal>
    </Flex>
  ) : (
    <></>
  );
};

export default WorkspaceMemberMenu;
