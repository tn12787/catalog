import { useToast, useDisclosure } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { cloneDeep } from 'lodash';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

import ReleaseEventDrawer from '../ReleaseEventDrawer';

import { ReleaseEvent } from 'types/common';
import { updateEventInCalendar } from 'queries/events';
import UndoToast from 'components/Calendar/UndoToast';
import Calendar from 'components/Calendar';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';

interface Props {
  events: ReleaseEvent[];
  loading?: boolean;
}

const ReleaseCalendar = ({ events, loading }: Props) => {
  const queryClient = useQueryClient();
  const { currentTeam, teams } = useExtendedSession();
  const router = useRouter();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [selectedEvent, setSelectedEvent] = React.useState<ReleaseEvent>();

  useEffect(() => {
    if (router.query?.event) {
      setSelectedEvent(events.find((event) => event.data.id === router.query.event));
      onOpen();
    } else {
      onClose();
    }
  }, [onOpen, onClose, events, router.query]);

  const { mutateAsync: updateReleaseEvent } = useMutation(updateEventInCalendar, {
    onMutate: async ({ event, targetDate }) => {
      // await queryClient.cancelQueries(['releaseEvents', currentTeam]);
      const events = queryClient.getQueryData(['releaseEvents', currentTeam]);

      const data = cloneDeep(events) as ReleaseEvent[];
      data?.forEach((item) => {
        if (item.data.id === event.data.id) {
          item.date = targetDate;
        }
      });

      queryClient.setQueryData(['releaseEvents', currentTeam], data);

      return { events };
    },

    onError: (_, __, context: any) => {
      queryClient.setQueryData(['releaseEvents', currentTeam], context?.events);
    },

    onSettled: () => {
      queryClient.invalidateQueries(['releaseEvents', currentTeam]);
    },
  });

  const canEditReleases = hasRequiredPermissions(['UPDATE_RELEASES'], teams?.[currentTeam]);

  const toast = useToast();

  const onUndo = async (event: ReleaseEvent) => {
    await updateReleaseEvent({
      event,
      targetDate: event.date,
    });
  };

  const canDropEvent = (item: ReleaseEvent, targetDate: Date) => {
    switch (item.type) {
      case 'release':
        return dayjs(targetDate).isAfter(dayjs());
      default:
        return dayjs(targetDate).isBefore(dayjs(item.release.targetDate));
    }
  };

  const onItemDropped = async (item: ReleaseEvent, targetDate: Date) => {
    const backupItem = cloneDeep(item);
    if (format(new Date(item.date), 'yyyy-MM-dd') === format(targetDate, 'yyyy-MM-dd')) {
      return;
    }
    try {
      await updateReleaseEvent({
        event: item,
        targetDate: dayjs.utc(targetDate).toISOString(),
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
      console.log(e);
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
  };

  const onModalClose = () => {
    setSelectedEvent(undefined);
    const { event: _, ...rest } = router.query;

    router.push({ pathname: '/planner', query: { ...rest } }, undefined, {
      shallow: true,
    });
  };

  return (
    <>
      <ReleaseEventDrawer event={selectedEvent} isOpen={isOpen} onClose={onModalClose} />
      <Calendar
        events={events}
        loading={loading}
        isDragDisabled={!canEditReleases}
        onEventClicked={onCalendarEventClicked}
        onEventDropped={onItemDropped}
        canDropEvent={canDropEvent}
      />
    </>
  );
};

export default ReleaseCalendar;
