import React, { useMemo } from 'react';

import { columns } from './columns';

import Table from 'components/data/Table';
import { ContactLabelWithContacts } from 'types/common';

interface Props {
  data: ContactLabelWithContacts[];
  page?: number;
  totalPages?: number;
  loading: boolean;
  emptyContent?: JSX.Element;
}

const ContactLabelTable = ({ data, loading, emptyContent }: Props) => {
  const memoizedData = useMemo(() => data, [data]);

  return (
    <Table data={memoizedData} columns={columns} loading={loading} emptyContent={emptyContent} />
  );
};

export default React.memo(ContactLabelTable);
