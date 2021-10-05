import { User } from '.prisma/client';
import { MusicVideoVars } from 'queries/musicVideo/types';

export interface EditMusicVideoFormData extends Omit<MusicVideoVars, 'dueDate' | 'assignees'> {
  dueDate: Date | string;
  assignees: User[];
}
