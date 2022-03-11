import { WorkspaceMember } from '@prisma/client';

import { MusicVideoVars } from 'queries/musicVideo/types';

export interface EditMusicVideoFormData extends Omit<MusicVideoVars, 'assignees'> {
  assignees: WorkspaceMember[];
}
