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
import { TeamMemberWithUserAndRoles } from 'types/common';
import { hasRequiredPermissions } from 'utils/auth';
import Dialog from 'components/Dialog';
import { deleteTeamMember } from 'queries/teams';

type Props = CellProps<TeamMemberWithUserAndRoles>;

const TeamMemberMenu = ({ value }: Props) => {
  const { teams, currentTeam } = useExtendedSession();
  const canEdit = hasRequiredPermissions(['UPDATE_TEAM'], teams?.[currentTeam]);
  const { primary } = useAppColors();
  const cancelRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const toast = useToast();

  const onDeleteConfirm = () => {
    onOpen();
  };

  const { mutateAsync: removeTeamMember, isLoading } = useMutation(deleteTeamMember, {
    onSuccess: () => {
      queryClient.invalidateQueries(['team', currentTeam]);
    },
  });

  const onDelete = async () => {
    try {
      await removeTeamMember({ teamId: currentTeam, teamMemberId: value.id });
      toast({
        status: 'success',
        title: 'Team member removed',
      });
      onClose();
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
          <MenuItem color="red" onClick={onDeleteConfirm}>
            Remove from team
          </MenuItem>
        </MenuList>
      </Menu>
      <Dialog
        onConfirm={onDelete}
        leastDestructiveRef={cancelRef}
        loading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        title={`Remove ${value.user.name} from team?`}
        message="Don't worry, you can always invite them back later."
        buttons={
          <ButtonGroup size={'sm'}>
            <Button colorScheme="red" isLoading={isLoading} ml={3} onClick={onDelete}>
              Remove
            </Button>
            <Button ref={cancelRef} onClick={onClose}>
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

export default TeamMemberMenu;
