import { Stack } from '@chakra-ui/react';
import React from 'react';

import ActivityListItem from '../ActivityListItem';

import { ReleaseTaskEventWithUser } from 'types';

interface Props {
  events: ReleaseTaskEventWithUser[];
  loading?: boolean;
}

const ActivityList = ({ events }: Props) => {
  return (
    <Stack>
      {events.map((event) => (
        <ActivityListItem event={event} key={event.id} />
      ))}
    </Stack>
  );
};

export default ActivityList;
