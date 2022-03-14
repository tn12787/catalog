import {
  Skeleton,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { BiCalendar } from 'react-icons/bi';
import { FiChevronDown } from 'react-icons/fi';

import { TaskResponse } from 'types/common';
import { buildPlannerLink } from 'utils/planner';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import useTaskMutations from 'hooks/data/tasks/useTaskMutations';

type Props = { task: TaskResponse; isLoading?: boolean };

const SingleTaskMenu = ({ task, isLoading }: Props) => {
  const router = useRouter();
  const { currentWorkspace, workspaceMemberships } = useExtendedSession();
  const canDeleteTasks = hasRequiredPermissions(
    ['UPDATE_RELEASES'],
    workspaceMemberships?.[currentWorkspace]
  );
  const { deleteSingleTask } = useTaskMutations();

  const deleteTask = async () => {
    await deleteSingleTask.mutateAsync({ id: task.id });
    router.push(`/releases/${task.release.id}`);
  };

  return (
    <Skeleton isLoaded={!isLoading}>
      <Menu size="sm">
        <MenuButton
          as={Button}
          variant="outline"
          colorScheme="purple"
          rightIcon={<FiChevronDown />}
          size="sm"
        >
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem
            icon={<BiCalendar />}
            onClick={() =>
              router.push(
                buildPlannerLink(task.id, new Date(task.dueDate)),
                buildPlannerLink(task.id, new Date(task.dueDate)),
                { shallow: true }
              )
            }
          >
            View in planner
          </MenuItem>
          <MenuDivider />
          {canDeleteTasks && (
            <MenuItem color="red" onClick={deleteTask}>
              Delete
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </Skeleton>
  );
};

export default SingleTaskMenu;
