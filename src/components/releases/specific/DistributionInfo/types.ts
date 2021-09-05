import { DistributionVars } from 'queries/distribution/types';

export interface EditDistributionFormData
  extends Omit<DistributionVars, 'dueDate'> {
  dueDate: Date;
}
