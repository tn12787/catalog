import React from 'react';
import { Notification } from '@prisma/client';

import { columns } from './columns';

import Table from 'components/Table';

interface Props {
  data: Notification[];
  page?: number;
  totalPages?: number;
  loading: boolean;
  emptyContent?: JSX.Element;
}

const NotificationTable = ({ data, loading, page, totalPages, emptyContent }: Props) => {
  return (
    <Table
      data={data}
      currentPage={page}
      totalPages={totalPages}
      columns={columns}
      loading={loading}
      emptyContent={emptyContent}
    />
  );
};

export default NotificationTable;
