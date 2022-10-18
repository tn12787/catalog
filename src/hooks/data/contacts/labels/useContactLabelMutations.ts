import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

import { createContactLabel, deleteContactLabel, updateContactLabel } from 'queries/contactLabels';
import useExtendedSession from 'hooks/useExtendedSession';

const useContactLabelMutations = () => {
  const { currentWorkspace } = useExtendedSession();
  const queryClient = useQueryClient();

  const toast = useToast();

  const onSuccess = useCallback(
    (message: string) => {
      toast({
        status: 'success',
        title: message,
      });
      queryClient.invalidateQueries(['contactLabels', currentWorkspace]);
    },
    [queryClient, currentWorkspace, toast]
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

  const createMutation = useMutation(createContactLabel, {
    onSuccess: onSuccess.bind(null, 'Contact label created'),
    onError: onError.bind(null, "Couldn't create that contact"),
  });

  const updateMutation = useMutation(updateContactLabel, {
    onSuccess: onSuccess.bind(null, 'Contact label updated'),
    onError: onError.bind(null, "Couldn't update that contact"),
  });

  const deleteMutation = useMutation(deleteContactLabel, {
    onSuccess: onSuccess.bind(null, 'Contact label removed'),
    onError: onError.bind(null, "Couldn't delete that contact label"),
  });

  return {
    createSingleContactLabel: createMutation,
    updateSingleContactLabel: updateMutation,
    deleteSingleContactLabel: deleteMutation,
  };
};

export default useContactLabelMutations;
