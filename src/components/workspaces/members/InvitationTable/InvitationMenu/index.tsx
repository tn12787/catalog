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
import { rescindInvitation } from 'queries/invitations';

type Props = CellProps<WorkspaceMemberWithUserAndRoles>;

const InvitationMenu = ({ value }: Props) => {
  const { workspaces: teams, currentWorkspace: currentTeam } = useExtendedSession();

  const canEdit = [
    hasRequiredPermissions(['UPDATE_TEAM'], teams?.[currentTeam]),
    teams?.[currentTeam].id !== value.id,
  ].every(Boolean);

  const { primary } = useAppColors();
  const cancelRef = useRef(null);
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutateAsync: removeInivte, isLoading } = useMutation(rescindInvitation, {
    onSuccess: () => {
      queryClient.invalidateQueries(['workspace', currentTeam]);
    },
  });

  const onDelete = async () => {
    try {
      await removeInivte(value.id);
      toast({
        status: 'success',
        title: 'Invitation rescinded',
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
          <MenuItem color="red.500" onClick={onDeleteOpen}>
            Rescind invitation
          </MenuItem>
        </MenuList>
      </Menu>
      <Dialog
        onConfirm={onDelete}
        leastDestructiveRef={cancelRef}
        loading={isLoading}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        title={`Rescind invitation to ${value.email} ?`}
        message="Don't worry, you can always invite them again later."
        buttons={
          <ButtonGroup size={'sm'}>
            <Button colorScheme="red" isLoading={isLoading} ml={3} onClick={onDelete}>
              Rescind invitatation
            </Button>
            <Button ref={cancelRef} onClick={onDeleteClose}>
              Cancel
            </Button>
          </ButtonGroup>
        }
      />
    </Flex>
  ) : (
    <></>
  );
};

export default InvitationMenu;
