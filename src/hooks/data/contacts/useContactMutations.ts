import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

import { createContact, deleteContact, updateContact } from 'queries/contacts';
import useExtendedSession from 'hooks/useExtendedSession';

const useContactMutations = () => {
  const { currentTeam } = useExtendedSession();
  const queryClient = useQueryClient();

  const toast = useToast();

  const onSuccess = useCallback(
    (message) => {
      toast({
        status: 'success',
        title: message,
      });
      queryClient.invalidateQueries(['contacts', currentTeam]);
    },
    [queryClient, currentTeam, toast]
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

  const createMutation = useMutation(createContact, {
    onSuccess: onSuccess.bind(null, 'Contact created'),
    onError: onError.bind(null, "Couldn't create that contact"),
  });

  const updateMutation = useMutation(updateContact, {
    onSuccess: onSuccess.bind(null, 'Contact updated'),
    onError: onError.bind(null, "Couldn't update that contact"),
  });

  const deleteMutation = useMutation(deleteContact, {
    onSuccess: onSuccess.bind(null, 'Contact removed'),
    onError: onError.bind(null, "Couldn't delete that contact"),
  });

  return {
    createSingleContact: createMutation,
    updateSingleContact: updateMutation,
    deleteSingleContact: deleteMutation,
  };
};

export default useContactMutations;
