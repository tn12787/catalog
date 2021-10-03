import { User } from '.prisma/client';
import { MasteringVars } from 'queries/mastering/types';

export interface EditMasteringFormData extends Omit<MasteringVars, 'dueDate' | 'assignees'> {
  dueDate: Date | string;
  assignees: User[];
}
