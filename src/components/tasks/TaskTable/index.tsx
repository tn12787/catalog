import React, { useMemo } from 'react';
import { Column } from 'react-table';

import { columns } from './columns';

import Table from 'components/data/Table';
import { TaskResponse } from 'types/common';

interface Props {
  data: TaskResponse[];
  loading: boolean;
  emptyContent?: JSX.Element;
  columns?: Column<TaskResponse>[];
  includeReleaseColumn?: boolean;
}

const TaskTable = ({
  data,
  columns: passedColumns,
  loading,
  includeReleaseColumn = true,
  emptyContent,
}: Props) => {
  const memoColumns = useMemo(() => {
    return passedColumns ? passedColumns : columns(includeReleaseColumn);
  }, [includeReleaseColumn, passedColumns]);

  return <Table data={data} columns={memoColumns} loading={loading} emptyContent={emptyContent} />;
};

export default TaskTable;
