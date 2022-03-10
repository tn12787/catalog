import { User } from '@prisma/client';

import { ArtworkVars } from 'queries/artwork/types';

export interface EditArtworkFormData extends Omit<ArtworkVars, 'dueDate' | 'assignees'> {
  dueDate: Date | string;
  assignees: User[];
}
