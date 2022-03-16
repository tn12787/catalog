import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

import { TaskResponse } from 'types/common';
import { createTask, deleteTask, updateTask } from 'queries/tasks';
import useExtendedSession from 'hooks/useExtendedSession';

type UseTaskMutationArgs = Partial<Pick<TaskResponse, 'id' | 'releaseId'>>;

const useTaskMutations = ({ id, releaseId }: UseTaskMutationArgs) => {
  const { currentWorkspace } = useExtendedSession();
  const queryClient = useQueryClient();

  const toast = useToast();

  const onSuccess = useCallback(
    (message) => {
      toast({
        status: 'success',
        title: message,
      });
      queryClient.invalidateQueries(['tasks', currentWorkspace, id]);
      queryClient.invalidateQueries(['taskActivity', currentWorkspace, id]);
      queryClient.invalidateQueries(['releases', currentWorkspace, releaseId]);
      queryClient.invalidateQueries(['releaseEvents', currentWorkspace]);
      queryClient.invalidateQueries(['releaseEvents', releaseId]);
    },
    [currentWorkspace, queryClient, toast, releaseId, id]
  );

  const onError = useCallback(
    (message) => {
      toast({
        title: 'Oh no',
        description: message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
    [toast]
  );

  const createMutation = useMutation(createTask, {
    onSuccess: onSuccess.bind(null, 'Task created'),
    onError: onError.bind(null, "Couldn't create that task"),
  });

  const updateMutation = useMutation(updateTask, {
    onSuccess: onSuccess.bind(null, 'Task updated'),
    onError: onError.bind(null, "Couldn't update that task"),
  });

  const deleteMutation = useMutation(deleteTask, {
    onSuccess: onSuccess.bind(null, 'Task deleted'),
    onError: onError.bind(null, "Couldn't delete that task"),
  });

  return {
    createSingleTask: createMutation,
    updateSingleTask: updateMutation,
    deleteSingleTask: deleteMutation,
  };
};

export default useTaskMutations;
