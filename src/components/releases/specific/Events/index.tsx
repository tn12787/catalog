import { Flex, Heading, Icon } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { AiOutlineCoffee, AiOutlineSketch, AiOutlineWoman } from 'react-icons/ai';

import { EventList } from './EventList';
import { EventListItem } from './EventListItem';
import { Placeholder } from './Placeholder';

import Card from 'components/Card';
import { EnrichedRelease } from 'types';
import { fetchSpecificReleaseEvents } from 'queries/events';

interface Props {
  releaseData: EnrichedRelease;
}

const Events = ({ releaseData }: Props) => {
  const { data, isLoading, error } = useQuery(['releaseEvents', releaseData.id], () =>
    fetchSpecificReleaseEvents(releaseData.id)
  );

  return (
    <Card>
      <Flex direction="column">
        <Heading fontWeight="semibold" fontSize="2xl">
          📅 Events
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
          {data?.map((event, i) => (
            <EventListItem event={event} key={i.toString()} />
          ))}
        </EventList>
      </Flex>
    </Card>
  );
};

export default Events;
