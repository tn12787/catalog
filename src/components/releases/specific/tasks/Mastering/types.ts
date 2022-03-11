import { WorkspaceMember } from '@prisma/client';

import { MasteringVars } from 'queries/mastering/types';

export interface EditMasteringFormData extends Omit<MasteringVars, 'assignees'> {
  assignees: WorkspaceMember[];
}
