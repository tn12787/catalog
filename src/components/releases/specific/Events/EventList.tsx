import { Stack, StackProps } from '@chakra-ui/react';
import * as React from 'react';

import { EventListItemProps } from './EventListItem';

export const EventList = (props: StackProps) => {
  const { children, ...stackProps } = props;
  const items = React.useMemo(
    () =>
      React.Children.toArray(children)
        .filter<React.ReactElement<EventListItemProps>>(React.isValidElement)
        .map((item, index, array) =>
          index + 1 === array.length ? React.cloneElement(item, { isLastItem: true }) : item
        ),
    [children]
  );
  return (
    <Stack as="ul" {...stackProps}>
      {items}
    </Stack>
  );
};
