import { Column } from 'react-table';

import MarketingTaskMenu from './MarketingTaskMenu';

import { TaskResponse } from 'types/common';
import { columns } from 'components/tasks/TaskTable/columns';

export const marketingColumns = (): Column<TaskResponse>[] =>
  [
    ...columns(false),
    {
      Header: '',
      accessor: (d: TaskResponse) => d,
      Cell: MarketingTaskMenu,
      id: 'actions',
      width: 0.1,
      extraProps: {
        justifyContent: 'flex-end',
      },
    },
  ].filter(Boolean) as Column<TaskResponse>[];
