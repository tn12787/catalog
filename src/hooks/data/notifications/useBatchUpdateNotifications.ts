import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

import { batchUpdateNotifications } from 'queries/notifications';
import useExtendedSession from 'hooks/useExtendedSession';

type UseReadNotificationsOptions = {
  ids: string[];
  read: boolean;
};

const useBatchUpdateNotifications = ({ ids, read }: UseReadNotificationsOptions) => {
  const { currentWorkspace } = useExtendedSession();
  const queryClient = useQueryClient();

  const toast = useToast();

  const { mutateAsync, isLoading } = useMutation(batchUpdateNotifications, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications', currentWorkspace]);
      toast({
        title: 'Notifications updated',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Oh no',
        description: "Couldn't mark notification as read",
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const batchUpdate = useCallback(() => {
    mutateAsync({ ids, read });
  }, [ids, mutateAsync, read]);

  return {
    batchUpdate,
    isLoading,
  };
};

export default useBatchUpdateNotifications;
