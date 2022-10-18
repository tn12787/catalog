import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

import { TaskResponse } from 'types/common';
import { postNewComment, updateComment, deleteComment } from 'queries/tasks';
import useExtendedSession from 'hooks/useExtendedSession';

type UseTaskMutationArgs = Partial<Pick<TaskResponse, 'id'>>;

const useCommentMutations = ({ id }: UseTaskMutationArgs) => {
  const { currentWorkspace } = useExtendedSession();
  const queryClient = useQueryClient();

  const toast = useToast();

  const onSuccessHigher = useCallback(
    (message?: string) => () => {
      message &&
        toast({
          status: 'success',
          title: message,
        });
      queryClient.invalidateQueries(['tasks', currentWorkspace, id]);
      queryClient.invalidateQueries(['taskActivity', currentWorkspace, id]);
    },
    [currentWorkspace, queryClient, toast, id]
  );

  const onError = useCallback(
    (message: string) => {
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

  const createMutation = useMutation(postNewComment, {
    onSuccess: onSuccessHigher(),
    onError: onError.bind(null, "Couldn't post your comment."),
  });

  const updateMutation = useMutation(updateComment, {
    onSuccess: onSuccessHigher('Comment updated'),
    onError: onError.bind(null, "Couldn't update that comment"),
  });

  const deleteMutation = useMutation(deleteComment, {
    onSuccess: onSuccessHigher('Comment deleted'),
    onError: onError.bind(null, "Couldn't delete that comment"),
  });

  return {
    postSingleComment: createMutation,
    updateSingleComment: updateMutation,
    deleteSingleComment: deleteMutation,
  };
};

export default useCommentMutations;
