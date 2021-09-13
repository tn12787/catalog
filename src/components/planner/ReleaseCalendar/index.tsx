import { useToast, useDisclosure } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { cloneDeep } from 'lodash';

import ReleaseEventDrawer from '../ReleaseEventDrawer';

import { ReleaseEvent } from 'types';
import { updateEventInCalendar } from 'queries/events';
import UndoToast from 'components/Calendar/UndoToast';
import Calendar from 'components/Calendar';

interface Props {
  events: ReleaseEvent[];
  loading?: boolean;
}

const ReleaseCalendar = ({ events, loading }: Props) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateReleaseEvent } = useMutation(
    updateEventInCalendar,
    {
      onMutate: async ({ event, targetDate }) => {
        await queryClient.cancelQueries('releaseEvents');
        const events = queryClient.getQueryData('releaseEvents');

        const data = cloneDeep(events) as ReleaseEvent[];
        data?.forEach((item) => {
          if (item.data.id === event.data.id) {
            item.date = targetDate;
          }
        });

        await queryClient.setQueryData('releaseEvents', data);

        return { events };
      },

      onError: (err, newTodo, context: any) => {
        queryClient.setQueryData('releaseEvents', context?.events);
      },

      onSettled: (_, __, ___, context: any) => {
        queryClient.invalidateQueries(['releaseEvents']);
      },
    }
  );

  const toast = useToast();

  const onUndo = async (event: ReleaseEvent) => {
    await updateReleaseEvent({
      event,
      targetDate: event.date,
    });
  };

  const canDropEvent = (item: ReleaseEvent, targetDate: Date) => {
    const eventDate = new Date(item.date);
    return dayjs(eventDate).isBefore(dayjs(targetDate));
  };

  const onItemDropped = async (item: ReleaseEvent, targetDate: Date) => {
    const backupItem = cloneDeep(item);
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
        render: ({ onClose }) => (
          <UndoToast onClose={onClose} onUndo={() => onUndo(backupItem)} />
        ),
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

  const { isOpen, onClose, onOpen } = useDisclosure();

  const onCalendarEventClicked = (event: ReleaseEvent) => {
    onOpen();
  };

  return (
    <>
      <ReleaseEventDrawer isOpen={isOpen} onClose={onClose} />
      <Calendar
        events={events}
        loading={loading}
        onEventClicked={onCalendarEventClicked}
        onEventDropped={onItemDropped}
        canDropEvent={canDropEvent}
      />
    </>
  );
};

export default ReleaseCalendar;
