import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { cloneDeep } from 'lodash';

import useExtendedSession from 'hooks/useExtendedSession';
import {
  createReleaseTrack,
  copyTracksToRelease,
  changeReleaseTrackOrder,
  editSingleTrack,
  deleteSingleTrack,
} from 'queries/tracks';
import { CreateSingleTrackVars } from 'queries/tracks/types';
import { ClientRelease } from 'types/common';
import { computeNewTrackOrdering } from 'utils/tracks';

type UseTrackMutationArgs = Pick<CreateSingleTrackVars, 'releaseId'>;

const useTrackMutations = ({ releaseId }: UseTrackMutationArgs) => {
  const { currentWorkspace } = useExtendedSession();
  const queryClient = useQueryClient();

  const activeQueryKey = ['releases', currentWorkspace, releaseId];

  const toast = useToast();

  const onSuccess = useCallback(
    (message: string) => {
      toast({
        status: 'success',
        title: message,
        duration: 3000,
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
    onSuccess: onSuccess.bind(null, 'Track created'),
    onError: onError.bind(null, "Couldn't create that track"),
  });

  const updateMutation = useMutation(editSingleTrack, {
    onSuccess: onSuccess.bind(null, 'Track updated'),
    onError: onError.bind(null, "Couldn't create that track"),
  });

  const linkMutation = useMutation(copyTracksToRelease, {
    onSuccess: onSuccess.bind(null, 'Tracks linked to release'),
    onError: onError.bind(null, "Couldn't link those tracks"),
  });

  const deleteMutation = useMutation(deleteSingleTrack, {
    onSuccess: onSuccess.bind(null, 'Track deleted'),
    onError: onError.bind(null, "Couldn't delete that track."),
  });

  const updateOrderMutation = useMutation(changeReleaseTrackOrder, {
    onMutate: ({ id, newIndex }) => {
      const release = queryClient.getQueryData(activeQueryKey) as ClientRelease;

      const newTracks = computeNewTrackOrdering(cloneDeep(release.tracks), id, newIndex);

      queryClient.setQueryData(activeQueryKey, { ...release, tracks: newTracks });

      return { oldRelease: release };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(activeQueryKey, context?.oldRelease);
      onError("Couldn't update that track's order");
    },
  });

  return {
    createSingleTrack: createMutation,
    copyTracksToRelease: linkMutation,
    updateTrackOrder: updateOrderMutation,
    updateSingleTrack: updateMutation,
    deleteSingleTrack: deleteMutation,
  };
};

export default useTrackMutations;
