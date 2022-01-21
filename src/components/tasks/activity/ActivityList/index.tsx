import { Stack } from '@chakra-ui/react';
import React from 'react';

import ActivityListItem from '../ActivityListItem';

import { ReleaseTaskEventWithUser } from 'types/common';

interface Props {
  events: ReleaseTaskEventWithUser[];
  loading?: boolean;
}

const ActivityList = ({ events }: Props) => {
  return (
    <Stack spacing={8}>
      {events.map((event) => (
        <ActivityListItem event={event} allEvents={events} key={event.id} />
      ))}
    </Stack>
  );
};

export default ActivityList;
