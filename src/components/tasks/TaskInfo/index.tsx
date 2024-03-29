import { Alert, AlertIcon, Heading, Skeleton, Stack } from '@chakra-ui/react';
import { ReleaseTask, ReleaseTaskType, TaskStatus } from '@prisma/client';
import React from 'react';
import { pick } from 'lodash';
import { pickBy } from 'lodash';

import Card from 'components/Card';
import StatusField from 'components/forms/QuickForm/StatusField';
import { ContactWithLabels, EnrichedReleaseTask, WorkspaceMemberWithUser } from 'types/common';
import AssigneesField from 'components/forms/QuickForm/AssigneesField';
import { UpdateTaskVars } from 'queries/tasks/types';
import DueDateField from 'components/forms/QuickForm/DueDateField';
import UrlField from 'components/forms/QuickForm/UrlField';
import ImageField from 'components/forms/QuickForm/ImageField';
import DistributorField from 'components/forms/QuickForm/DistributorField';
import ContactsField from 'components/forms/QuickForm/ContactsField';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import useTaskMutations from 'hooks/data/tasks/useTaskMutations';
import { midday } from 'utils/dates';
import { isTaskOverdue } from 'utils/tasks';

type Props = { loading?: boolean; task: EnrichedReleaseTask | undefined };

const TaskInfo = ({ loading, task }: Props) => {
  const { updateSingleTask } = useTaskMutations(pick(task, 'id', 'releaseId'));

  const onSubmit = async (data: UpdateTaskVars) => {
    const args = pickBy(
      {
        id: task?.id,
        ...data,
        dueDate: data.dueDate ? midday(data.dueDate) : undefined,
      },
      Boolean
    );
    try {
      await updateSingleTask.mutateAsync(args);
    } catch (e) {
      console.error(e);
    }
  };

  const { currentWorkspace, workspaceMemberships } = useExtendedSession();

  const canEdit = hasRequiredPermissions(
    ['UPDATE_RELEASES'],
    workspaceMemberships?.[currentWorkspace]
  );

  const isOverdue = isTaskOverdue(task as ReleaseTask);

  return (
    <Card maxW={{ base: '100%', md: '300px' }} w="100%">
      <Stack>
        <Heading size="md">Task info</Heading>
        {isOverdue && (
          <Alert fontSize="sm" py={1} borderRadius={'md'} status="error">
            <AlertIcon></AlertIcon>This task is overdue.
          </Alert>
        )}
      </Stack>
      {task?.type === ReleaseTaskType.MASTERING && (
        <Skeleton isLoaded={!loading}>
          <UrlField
            isDisabled={!canEdit}
            url={task?.masteringData?.url ?? ''}
            onChange={(url) => onSubmit({ url })}
          />
        </Skeleton>
      )}
      {task?.type === ReleaseTaskType.ARTWORK && (
        <Skeleton isLoaded={!loading}>
          <ImageField
            isDisabled={!canEdit}
            url={task?.artworkData?.url ?? ''}
            onChange={(url) => onSubmit({ url })}
          />
        </Skeleton>
      )}
      {task?.type === ReleaseTaskType.DISTRIBUTION && (
        <Skeleton isLoaded={!loading}>
          <DistributorField
            isDisabled={!canEdit}
            distributor={task?.distributionData?.distributorId ?? ''}
            onChange={(distributor) => onSubmit({ distributor })}
          />
        </Skeleton>
      )}
      <Skeleton isLoaded={!loading}>
        <StatusField
          isDisabled={!canEdit}
          status={task?.status as TaskStatus}
          onChange={(status) => onSubmit({ status })}
        />
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <AssigneesField
          isDisabled={!canEdit}
          assignees={task?.assignees as WorkspaceMemberWithUser[]}
          onChange={(assignees) => onSubmit({ assignees })}
        />
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <ContactsField
          isDisabled={!canEdit}
          contacts={task?.contacts as ContactWithLabels[]}
          onChange={(contacts) => onSubmit({ contacts })}
        />
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <DueDateField
          isDisabled={!canEdit}
          date={new Date(task?.dueDate ?? Date.now())}
          onChange={(dueDate) => onSubmit({ dueDate: dueDate as Date })}
        />
      </Skeleton>
    </Card>
  );
};

export default TaskInfo;
