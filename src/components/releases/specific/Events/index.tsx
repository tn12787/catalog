import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';

import { EventList } from './EventList';
import { EventListItem } from './EventListItem';

import Card from 'components/Card';
import { ClientRelease } from 'types/common';
import { fetchSpecificReleaseEvents } from 'queries/events';
import { testReleaseEvent } from '__mocks__/data/releases/events';

interface Props {
  releaseData: ClientRelease;
}

const Events = ({ releaseData }: Props) => {
  const { data, isLoading } = useQuery(['releaseEvents', releaseData.id], () =>
    fetchSpecificReleaseEvents(releaseData.id)
  );

  return (
    <Card>
      <Flex direction="column">
        <Heading fontWeight="semibold" fontSize="2xl">
          📅 Timeline
        </Heading>
      </Flex>
      <Flex
        direction={['column', 'column', 'row']}
        pt={4}
        width={'90%'}
        justify="space-between"
        alignItems={['center', 'center', 'stretch']}
      >
        <EventList spacing="8">
          {isLoading ? (
            <EventListItem event={testReleaseEvent({})} isLoading></EventListItem>
          ) : (
            data?.map((event, i) => <EventListItem event={event} key={i.toString()} />)
          )}
        </EventList>
      </Flex>
    </Card>
  );
};

export default Events;
