import React from 'react';

import { teamMembersColumns } from './columns';

import Table from 'components/Table';
import { ClientRelease } from 'types';

interface Props {
  releases: EnrichedRelease[];
}

const ReleaseTable = ({ releases }: Props) => {
  return <Table data={releases} columns={teamMembersColumns} />;
};

export default React.memo(ReleaseTable);
