import { WorkspaceMember } from '@prisma/client';

import { ArtworkVars } from 'queries/artwork/types';

export interface EditArtworkFormData extends Omit<ArtworkVars, 'assignees'> {
  assignees: WorkspaceMember[];
}
