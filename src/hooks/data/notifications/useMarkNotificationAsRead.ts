import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

import { UpdateNotificationVars } from 'queries/notifications/types';
import { updateNotification } from 'queries/notifications';
import useExtendedSession from 'hooks/useExtendedSession';

const useMarkNotificationAsRead = () => {
  const { currentTeam } = useExtendedSession();
  const queryClient = useQueryClient();

  const toast = useToast();

  const { mutateAsync, isLoading } = useMutation(updateNotification, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications', currentTeam]);
    },
    onError: () => {
      toast({
        title: 'Oh no',
        description: "Couldn't mark notification as read",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const markAsRead = useCallback(
    async (data: UpdateNotificationVars) => {
      return mutateAsync(data);
    },
    [mutateAsync]
  );

  return {
    markAsRead,
    isLoading,
  };
};

export default useMarkNotificationAsRead;
