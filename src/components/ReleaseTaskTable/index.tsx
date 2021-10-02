import React from 'react';

import { columns } from './columns';

import Table from 'components/Table';
import { ReleaseEvent } from 'types';

interface Props {
  data: ReleaseEvent[];
  loading: boolean;
  emptyContent?: JSX.Element;
}

const ReleaseTaskTable = ({ data, loading, emptyContent }: Props) => {
  return <Table data={data} columns={columns} emptyContent={emptyContent} />;
};

export default ReleaseTaskTable;
