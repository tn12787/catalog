import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

import useExtendedSession from 'hooks/useExtendedSession';
import { createSingleArtist, updateSingleArtist } from 'queries/artists';

const useArtistMutations = () => {
  const { currentWorkspace } = useExtendedSession();
  const queryClient = useQueryClient();

  const toast = useToast();

  const onSuccess = useCallback(
    (message) => {
      toast({
        status: 'success',
        title: message,
      });
      queryClient.invalidateQueries(['artists', currentWorkspace]);
    },
    [queryClient, currentWorkspace, toast]
  );

  const onError = useCallback(
    (message, detail) => {
      toast({
        title: message,
        description: detail,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
    [toast]
  );

  const createMutation = useMutation(createSingleArtist, {
    onSuccess: onSuccess.bind(null, 'Artist created successfully!'),
    onError: onError.bind(null, "Couldn't create artist", 'Please try again later.'),
  });

  const updateMutation = useMutation(updateSingleArtist, {
    onSuccess: onSuccess.bind(null, 'Changes saved'),
    onError: onError.bind(null, 'Something went wrong', 'Please try again later.'),
  });

  return {
    createSingleArtist: createMutation,
    updateSingleArtist: updateMutation,
  };
};

export default useArtistMutations;
