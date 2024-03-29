import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

import { clearAllNotifications, markAllAsRead } from 'queries/notifications';
import useExtendedSession from 'hooks/useExtendedSession';

const useUpdateAllNotifications = () => {
  const { currentWorkspace, workspaceMemberships } = useExtendedSession();
  const queryClient = useQueryClient();

  const toast = useToast();

  const handlers = {
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
        duration: 9000,
        isClosable: true,
      });
    },
  };

  const { mutateAsync: readAll, isLoading: isReadAllLoading } = useMutation(
    markAllAsRead,
    handlers
  );
  const { mutateAsync: clearAll, isLoading: isClearAllLoading } = useMutation(
    clearAllNotifications,
    handlers
  );

  const updateAll = useCallback(
    async (action: 'read' | 'delete') => {
      if (!workspaceMemberships?.[currentWorkspace]?.id) {
        return;
      }

      const mutate = action === 'read' ? readAll : clearAll;

      return mutate(workspaceMemberships?.[currentWorkspace]?.id);
    },
    [workspaceMemberships, currentWorkspace, readAll, clearAll]
  );

  return {
    updateAll,
    isLoading: isReadAllLoading || isClearAllLoading,
  };
};

export default useUpdateAllNotifications;
