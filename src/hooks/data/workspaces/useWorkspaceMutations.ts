import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { signOut } from 'next-auth/react';

import useExtendedSession from 'hooks/useExtendedSession';
import { deleteSingleWorkspace, updateSingleWorkspace } from 'queries/workspaces';

const useWorkspaceMutations = () => {
  const { currentWorkspace } = useExtendedSession();
  const queryClient = useQueryClient();

  const toast = useToast();

  const onSuccess = useCallback(
    (message) => {
      toast({
        status: 'success',
        title: message,
      });
      queryClient.invalidateQueries(['workspace', currentWorkspace]);
    },
    [queryClient, currentWorkspace, toast]
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

  const updateMutation = useMutation(updateSingleWorkspace, {
    onSuccess: onSuccess.bind(null, 'Changes saved'),
    onError: onError.bind(null, "Couldn't update your workspace."),
  });

  const deleteMutation = useMutation(deleteSingleWorkspace, {
    onSuccess: () => {
      onSuccess('Workspace deleted.');
      signOut();
    },
    onError: onError.bind(null, "Couldn't delete your workspace."),
  });

  return {
    updateSingleWorkspace: updateMutation,
    deleteWorkspace: deleteMutation,
  };
};

export default useWorkspaceMutations;
