import { Distribution } from 'types';

export interface DistributionVars
  extends Pick<
    Distribution,
    'dueDate' | 'id' | 'status' | 'notes' | 'distributor'
  > {}

export interface CreateDistributionVars extends Omit<DistributionVars, 'id'> {
  releaseId: string;
}
