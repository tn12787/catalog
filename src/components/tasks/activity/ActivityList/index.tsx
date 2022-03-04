import { HStack, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react';
import React from 'react';

import ActivityListItem from '../ActivityListItem';

import { ReleaseTaskEventWithUser } from 'types/common';

interface Props {
  events: ReleaseTaskEventWithUser[];
  loading?: boolean;
}

const ActivityList = ({ events, loading }: Props) => {
  return (
    <Stack spacing={8}>
      {loading ? (
        <>
          <HStack>
            <SkeletonCircle></SkeletonCircle>
            <Skeleton isLoaded={!loading}>adgdgadgadgd</Skeleton>
          </HStack>
          <HStack>
            <SkeletonCircle></SkeletonCircle>
            <Skeleton isLoaded={!loading}>adhahadhahdahdadhadhadh</Skeleton>
          </HStack>
        </>
      ) : (
        events.map((event) => <ActivityListItem event={event} allEvents={events} key={event.id} />)
      )}
    </Stack>
  );
};

export default ActivityList;
