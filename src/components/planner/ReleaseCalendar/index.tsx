import { useToast, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { cloneDeep } from 'lodash';
import { isAfter, isBefore, isSameDay, startOfDay, startOfToday } from 'date-fns';
import { useRouter } from 'next/router';

import ReleaseEventDrawer from '../ReleaseEventDrawer';

import { ReleaseEvent } from 'types/common';
import { updateEventInCalendar } from 'queries/events';
import UndoToast from 'components/planner/Calendar/UndoToast';
import Calendar from 'components/planner/Calendar';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import Dialog from 'components/Dialog';

interface Props {
  events: ReleaseEvent[];
  loading?: boolean;
}

const ReleaseCalendar = ({ events, loading }: Props) => {
  const queryClient = useQueryClient();
  const { currentWorkspace, workspaceMemberships } = useExtendedSession();
  const router = useRouter();

  const { isOpen: isEventOpen, onClose: onEventClose, onOpen: onEventOpen } = useDisclosure();
  const {
    isOpen: isNotFoundOpen,
    onClose: onNotFoundClose,
    onOpen: onNotFoundOpen,
  } = useDisclosure();

  const [selectedEvent, setSelectedEvent] = React.useState<ReleaseEvent>();

  useEffect(() => {
    if (router.query?.event && events?.length) {
      const event = events.find((event) => event.data.id === router.query.event);
      if (event) {
        setSelectedEvent(event);
        onEventOpen();
      } else {
        onEventClose();
        onNotFoundOpen();
      }
    } else {
      onEventClose();
    }
  }, [onEventOpen, onNotFoundOpen, onEventClose, events, router.query]);

  const { mutateAsync: updateReleaseEvent } = useMutation(updateEventInCalendar, {
    onMutate: async ({ event, targetDate }) => {
      // await queryClient.cancelQueries(['releaseEvents', currentWorkspace]);
      const events = queryClient.getQueryData(['releaseEvents', currentWorkspace]);

      const data = cloneDeep(events) as ReleaseEvent[];
      data?.forEach((item) => {
        if (item.data.id === event.data.id) {
          item.date = targetDate;
        }
      });

      queryClient.setQueryData(['releaseEvents', currentWorkspace], data);

      return { events };
    },

    onError: (_, __, context: any) => {
      queryClient.setQueryData(['releaseEvents', currentWorkspace], context?.events);
    },

    onSettled: () => {
      queryClient.invalidateQueries(['releaseEvents', currentWorkspace]);
    },
  });

  const canEditReleases = hasRequiredPermissions(
    ['UPDATE_RELEASES'],
    workspaceMemberships?.[currentWorkspace]
  );
  const toast = useToast();
  const dialogRef = useRef(null);

  const onUndo = async (event: ReleaseEvent) => {
    await updateReleaseEvent({
      event,
      targetDate: event.date,
    });
  };

  const canDropEvent = (item: ReleaseEvent, targetDate: Date) => {
    switch (item.type) {
      case 'release':
        return isAfter(startOfDay(new Date(targetDate)), startOfToday());
      default:
        return isBefore(
          startOfDay(new Date(targetDate)),
          startOfDay(new Date(item.release.targetDate))
        );
    }
  };

  const onItemDropped = async (item: ReleaseEvent, targetDate: Date) => {
    if (isSameDay(new Date(item.date), targetDate)) {
      return;
    }

    const backupItem = cloneDeep(item);
    try {
      await updateReleaseEvent({
        event: item,
        targetDate: new Date(targetDate).toISOString(),
      });
      toast.closeAll();
      toast({
        status: 'success',
        title: 'Event updated',
        duration: 4000,
        // eslint-disable-next-line react/display-name
        render: ({ onClose }) => <UndoToast onClose={onClose} onUndo={() => onUndo(backupItem)} />,
      });
    } catch (e: any) {
      console.error(e);
      toast({
        status: 'error',
        title: 'Oh no...',
        description: e.toString(),
      });
    }
  };

  const onCalendarEventClicked = (event: ReleaseEvent) => {
    router.push(
      { pathname: '/planner', query: { ...router.query, event: event.data.id } },
      undefined,
      {
        shallow: true,
      }
    );

    setSelectedEvent(undefined);
  };

  const onModalClose = () => {
    const { event: _, ...query } = router.query;

    router.push({ pathname: '/planner', query: { ...query } }, undefined, {
      shallow: true,
    });
  };

  return (
    <>
      <ReleaseEventDrawer event={selectedEvent} isOpen={isEventOpen} onClose={onModalClose} />
      <Calendar
        events={events}
        loading={loading}
        isDragDisabled={!canEditReleases}
        onEventClicked={onCalendarEventClicked}
        onEventDropped={onItemDropped}
        canDropEvent={canDropEvent}
      />
      <Dialog
        isOpen={isNotFoundOpen}
        onClose={onNotFoundClose}
        onConfirm={onNotFoundClose}
        title="Oh no..."
        message="The requested event was not found."
        leastDestructiveRef={dialogRef}
      />
    </>
  );
};

export default ReleaseCalendar;
