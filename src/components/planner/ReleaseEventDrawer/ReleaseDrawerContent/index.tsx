import {
  Divider,
  Skeleton,
  Stack,
  useToast,
  Text,
  HStack,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { Release, ReleaseType } from '@prisma/client';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import NextLink from 'next/link';

import { ClientRelease, ReleaseEvent } from 'types/common';
import useExtendedSession from 'hooks/useExtendedSession';
import DueDateField from 'components/forms/QuickForm/DueDateField';
import { updateBasicReleaseInfo } from 'queries/releases';
import { SingleReleaseVars } from 'queries/releases/types';
import ReleaseTypeField from 'components/forms/QuickForm/ReleaseTypeField';
import ArtistField from 'components/forms/QuickForm/ArtistField';
import { taskHeadingByType } from 'utils/tasks';
import TaskStatusBadge from 'components/tasks/TaskStatusBadge';
import useAppColors from 'hooks/useAppColors';
import { hasRequiredPermissions } from 'utils/auth';

type Props = {
  event: ReleaseEvent & { release: Release };
  loading?: boolean;
};

type RollbackContext = {
  previousRelease: ClientRelease;
  newRelease: ClientRelease;
};

const ReleaseDrawerContent = ({ event, loading }: Props) => {
  const release = event?.release;
  const queryClient = useQueryClient();
  const { currentWorkspace, workspaceMemberships } = useExtendedSession();

  const toast = useToast();
  const { border } = useAppColors();

  const { mutateAsync: submitUpdate } = useMutation(updateBasicReleaseInfo, {
    onMutate: async (
      data: Pick<SingleReleaseVars, 'id'> & Partial<Omit<SingleReleaseVars, 'id'>>
    ): Promise<RollbackContext> => {
      await queryClient.cancelQueries(['releases', release?.id]);

      const previousRelease = queryClient.getQueryData([
        'releases',
        currentWorkspace,
        release?.id,
      ]) as ClientRelease;

      const newRelease = { ...previousRelease, ...data } as ClientRelease;
      queryClient.setQueryData(['releases', currentWorkspace, release?.id], newRelease);

      // Return a context with the previous and new todo
      return { previousRelease, newRelease };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      const { previousRelease } = context as RollbackContext;
      queryClient.setQueryData(['releases', currentWorkspace, release?.id], previousRelease);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['releases', currentWorkspace, release?.id]);
      queryClient.invalidateQueries(['releaseEvents', currentWorkspace]);
    },
  });

  const onSubmit = async (data: Partial<SingleReleaseVars>) => {
    try {
      await submitUpdate({
        id: release.id,
        ...data,
      });
    } catch (e) {
      console.error(e);
      toast({
        status: 'error',
        title: 'Oh no...',
        description: (e as Error).toString(),
      });
    }
  };

  const canEdit = hasRequiredPermissions(
    ['UPDATE_RELEASES'],
    workspaceMemberships?.[currentWorkspace]
  );

  return (
    <Stack w="100%" spacing={5}>
      <Skeleton isLoaded={!loading}>
        <DueDateField
          isDisabled={!canEdit}
          fieldName="Release Date"
          date={event.release.targetDate as Date}
          onChange={(dueDate) => onSubmit({ targetDate: dueDate as Date })}
        />
      </Skeleton>
      <Divider />
      <Skeleton isLoaded={!loading}>
        <ArtistField
          isDisabled={!canEdit}
          artist={release.artistId}
          onChange={(artist) => onSubmit({ artist: artist })}
        />
      </Skeleton>
      <Divider />
      <Skeleton isLoaded={!loading}>
        <ReleaseTypeField
          isDisabled={!canEdit}
          releaseType={release.type as ReleaseType}
          onChange={(type) => onSubmit({ type: type as ReleaseType })}
        />
      </Skeleton>
      {release.tasks.length > 0 && (
        <Stack spacing={5}>
          <Divider />
          <Text fontWeight={'bold'}>Tasks</Text>
          {release.tasks.map((item) => (
            <LinkBox
              p={2}
              py={3}
              rounded={'xl'}
              borderColor={border}
              borderWidth="1px"
              as={Stack}
              key={item.id}
            >
              <NextLink href={`/tasks/${item.id}`} passHref>
                <LinkOverlay>
                  <HStack justifyContent={'space-between'}>
                    <Text>{taskHeadingByType(item.name, item.type)}</Text>
                    <TaskStatusBadge status={item.status} />
                  </HStack>
                </LinkOverlay>
              </NextLink>
            </LinkBox>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default ReleaseDrawerContent;
