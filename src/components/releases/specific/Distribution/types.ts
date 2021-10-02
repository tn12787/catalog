import { User } from '.prisma/client';
import { DistributionVars } from 'queries/distribution/types';

export interface EditDistributionFormData extends Omit<DistributionVars, 'dueDate' | 'assignees'> {
  dueDate: Date | string;
  assignees: User[];
}
