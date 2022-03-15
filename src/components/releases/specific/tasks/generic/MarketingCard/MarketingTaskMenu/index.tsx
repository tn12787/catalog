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

import MarketingModal from '../MarketingModal';

import useExtendedSession from 'hooks/useExtendedSession';
import useAppColors from 'hooks/useAppColors';
import { ClientRelease, TaskResponse } from 'types/common';
import { hasRequiredPermissions } from 'utils/auth';
import Dialog from 'components/Dialog';
import useTaskMutations from 'hooks/data/tasks/useTaskMutations';

type Props = CellProps<TaskResponse>;

const MarketingTaskMenu = ({ value }: Props) => {
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
    deleteSingleTask: { mutateAsync, isLoading },
  } = useTaskMutations(value?.releaseId);

  const onDelete = async () => {
    try {
      await mutateAsync({ id: value.id });
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
            Delete task
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
        message="This action can't be undone."
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
      <MarketingModal
        release={value.release as ClientRelease}
        task={value}
        isOpen={isEditOpen}
        onClose={onEditClose}
      />
    </Flex>
  ) : (
    <></>
  );
};

export default MarketingTaskMenu;
