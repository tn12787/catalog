import React from 'react';

import { columns } from './columns';

import Table from 'components/data/Table';
import { ReleaseEvent } from 'types/common';

interface Props {
  data: ReleaseEvent[];
  loading: boolean;
  emptyContent?: JSX.Element;
}

const TaskTable = ({ data, loading, emptyContent }: Props) => {
  return <Table data={data} columns={columns} loading={loading} emptyContent={emptyContent} />;
};

export default TaskTable;
