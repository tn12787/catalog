import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

import useExtendedSession from 'hooks/useExtendedSession';
import { updateSingleWorkspace } from 'queries/workspaces';

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
      queryClient.invalidateQueries(['contacts', currentWorkspace]);
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

  return {
    updateSingleWorkspace: updateMutation,
  };
};

export default useWorkspaceMutations;
