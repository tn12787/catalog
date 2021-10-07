import { Distribution } from 'types';

export interface DistributionVars extends Pick<Distribution, 'dueDate' | 'status' | 'notes'> {
  releaseId: string;
  distributor: string;
  assignees: string[];
}

export type CreateDistributionVars = DistributionVars;

export type UpdateDistributionVars = Partial<DistributionVars>;
