import React, { useMemo } from 'react';
import { IdType } from 'react-table';

import { columns } from './columns';

import Table from 'components/Table';
import { ContactWithLabels } from 'types/common';

interface Props {
  data: ContactWithLabels[];
  selectedRows?: Record<IdType<ContactWithLabels>, boolean>;
  onSelectedRowsChange?: (rows: Record<IdType<ContactWithLabels>, boolean>) => void;
  page?: number;
  totalPages?: number;
  loading: boolean;
  emptyContent?: JSX.Element;
}

const ContactTable = ({
  data,
  selectedRows,
  onSelectedRowsChange,
  loading,
  page,
  totalPages,
  emptyContent,
}: Props) => {
  const memoizedData = useMemo(() => data, [data]);

  return (
    <Table
      data={memoizedData}
      currentPage={page}
      totalPages={totalPages}
      columns={columns}
      loading={loading}
      selectedRows={selectedRows}
      onSelectedRowsChange={onSelectedRowsChange}
      emptyContent={emptyContent}
    />
  );
};

export default React.memo(ContactTable);
