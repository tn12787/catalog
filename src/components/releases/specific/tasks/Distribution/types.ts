import { WorkspaceMember } from '@prisma/client';

import { DistributionVars } from 'queries/distribution/types';

export interface EditDistributionFormData extends Omit<DistributionVars, 'assignees'> {
  assignees: WorkspaceMember[];
}
