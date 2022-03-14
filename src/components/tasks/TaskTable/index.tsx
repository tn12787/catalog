import React from 'react';

import { columns } from './columns';

import Table from 'components/data/Table';
import { EnrichedReleaseTask } from 'types/common';

interface Props {
  data: EnrichedReleaseTask[];
  loading: boolean;
  emptyContent?: JSX.Element;
}

const TaskTable = ({ data, loading, emptyContent }: Props) => {
  return <Table data={data} columns={columns} loading={loading} emptyContent={emptyContent} />;
};

export default TaskTable;
