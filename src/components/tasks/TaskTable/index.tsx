import React from 'react';

import { columns } from './columns';

import Table from 'components/Table';
import { ReleaseEvent } from 'types';

interface Props {
  data: ReleaseEvent[];
  loading: boolean;
  emptyContent?: JSX.Element;
}

const TaskTable = ({ data, loading, emptyContent }: Props) => {
  return <Table data={data} columns={columns} loading={loading} emptyContent={emptyContent} />;
};

export default TaskTable;
