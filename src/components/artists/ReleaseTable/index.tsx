import React from 'react';

import { releaseColumns } from './columns';

import Table from 'components/data/Table';
import { ClientRelease } from 'types/common';

interface Props {
  releases: ClientRelease[];
}

const ReleaseTable = ({ releases }: Props) => {
  return <Table data={releases} columns={releaseColumns} />;
};

export default React.memo(ReleaseTable);
