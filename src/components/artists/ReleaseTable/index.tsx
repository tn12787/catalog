import React, { useMemo } from 'react';

import { teamMembersColumns } from './columns';
import { ArtistWithReleases } from './types';

import Table from 'components/Table';
import { EnrichedRelease } from 'types';

interface Props {
  releases: EnrichedRelease[];
}

const ReleaseTable = ({ releases }: Props) => {
  return <Table data={releases} columns={teamMembersColumns} />;
};

export default React.memo(ReleaseTable);
