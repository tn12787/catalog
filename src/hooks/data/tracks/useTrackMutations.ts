import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

import useExtendedSession from 'hooks/useExtendedSession';
import { createReleaseTrack, copyTracksToRelease, changeReleaseTrackOrder } from 'queries/tracks';
import { CreateSingleTrackVars } from 'queries/tracks/types';

type UseTrackMutationArgs = Pick<CreateSingleTrackVars, 'releaseId'>;

const useTrackMutations = ({ releaseId }: UseTrackMutationArgs) => {
  const { currentWorkspace } = useExtendedSession();
  const queryClient = useQueryClient();

  const toast = useToast();

  const onSuccess = useCallback(
    (message: string) => {
      toast({
        status: 'success',
        title: message,
      });

      queryClient.invalidateQueries(['releases', currentWorkspace, releaseId]);
    },
    [currentWorkspace, queryClient, toast, releaseId]
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

  const createMutation = useMutation(createReleaseTrack, {
    onSuccess: onSuccess.bind(null, 'Task created'),
    onError: onError.bind(null, "Couldn't create that task"),
  });

  const linkMutation = useMutation(copyTracksToRelease, {
    onSuccess: onSuccess.bind(null, 'Tracks linked to release'),
    onError: onError.bind(null, "Couldn't link those tracks"),
  });

  const updateOrderMutation = useMutation(changeReleaseTrackOrder, {
    onSuccess: onSuccess.bind(null, 'Track order updated'),
    onError: onError.bind(null, "Couldn't update track order. Please try again later"),
  });

  return {
    createSingleTrack: createMutation,
    copyTracksToRelease: linkMutation,
    updateTrackOrder: updateOrderMutation,
  };
};

export default useTrackMutations;
