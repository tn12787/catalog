import { Text } from '@chakra-ui/layout';
import { format } from 'date-fns';
import { Column } from 'react-table';
import React from 'react';
import { Notification } from '@prisma/client';

import UnreadDot from '../UnreadDot';

import useAppColors from 'hooks/useAppColors';

export const HasRead = ({ value }: { value: boolean }) => {
  return <UnreadDot read={value} />;
};

const NotificationDate = ({ value }: { value: Notification }) => {
  const { bodySub } = useAppColors();
  return (
    <Text fontSize="xs" color={bodySub}>
      {format(new Date(value.createdAt), 'PPP')}
    </Text>
  );
};

export const columns: Column<Notification>[] = [
  {
    id: 'read',
    accessor: (d) => d.read,
    Cell: HasRead,
    width: 8,
    extraProps: {
      justifyContent: 'center',
    },
  },
  {
    id: 'name',
    accessor: (d) => d.type,
  },
  {
    id: 'date',
    accessor: (d) => d,
    Cell: NotificationDate,
    extraProps: {
      justifyContent: 'flex-end',
    },
  },
];
