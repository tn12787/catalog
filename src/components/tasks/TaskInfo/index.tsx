import { Heading, Skeleton } from '@chakra-ui/react';
import { ReleaseTaskType, TaskStatus } from '@prisma/client';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import Card from 'components/Card';
import StatusField from 'components/forms/QuickForm/StatusField';
import { ContactWithLabels, EnrichedReleaseTask, WorkspaceMemberWithUser } from 'types/common';
import { updateTask } from 'queries/tasks';
import AssigneesField from 'components/forms/QuickForm/AssigneesField';
import { UpdateTaskVars } from 'queries/tasks/types';
import DueDateField from 'components/forms/QuickForm/DueDateField';
import UrlField from 'components/forms/QuickForm/UrlField';
import ImageField from 'components/forms/QuickForm/ImageField';
import DistributorField from 'components/forms/QuickForm/DistributorField';
import ContactsField from 'components/forms/QuickForm/ContactsField';

type Props = { loading?: boolean; task: EnrichedReleaseTask | undefined };

const TaskInfo = ({ loading, task }: Props) => {
  const queryClient = useQueryClient();
  const { mutateAsync: submitUpdate } = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', task?.id]);
      queryClient.invalidateQueries(['taskActivity', task?.id]);
    },
  });

  const onSubmit = async (data: UpdateTaskVars) => {
    try {
      await submitUpdate({
        id: task?.id,
        ...data,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card maxW={{ base: '100%', md: '300px' }} w="100%">
      <Heading size="md">Task info</Heading>
      {task?.type === ReleaseTaskType.MASTERING && (
        <Skeleton isLoaded={!loading}>
          <UrlField url={task?.masteringData?.url ?? ''} onChange={(url) => onSubmit({ url })} />
        </Skeleton>
      )}
      {task?.type === ReleaseTaskType.MUSIC_VIDEO && (
        <Skeleton isLoaded={!loading}>
          <UrlField url={task?.musicVideoData?.url ?? ''} onChange={(url) => onSubmit({ url })} />
        </Skeleton>
      )}
      {task?.type === ReleaseTaskType.ARTWORK && (
        <Skeleton isLoaded={!loading}>
          <ImageField url={task?.artworkData?.url ?? ''} onChange={(url) => onSubmit({ url })} />
        </Skeleton>
      )}
      {task?.type === ReleaseTaskType.DISTRIBUTION && (
        <Skeleton isLoaded={!loading}>
          <DistributorField
            distributor={task?.distributionData?.distributorId ?? ''}
            onChange={(distributor) => onSubmit({ distributor })}
          />
        </Skeleton>
      )}
      <Skeleton isLoaded={!loading}>
        <StatusField
          status={task?.status as TaskStatus}
          onChange={(status) => onSubmit({ status })}
        />
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <AssigneesField
          assignees={task?.assignees as WorkspaceMemberWithUser[]}
          onChange={(assignees) => onSubmit({ assignees })}
        />
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <ContactsField
          contacts={task?.contacts as ContactWithLabels[]}
          onChange={(contacts) => onSubmit({ contacts })}
        />
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <DueDateField
          date={new Date(task?.dueDate ?? Date.now())}
          onChange={(dueDate) => onSubmit({ dueDate: dueDate as Date })}
        />
      </Skeleton>
    </Card>
  );
};

export default TaskInfo;
