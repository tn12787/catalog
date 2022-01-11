import { ClientDistribution } from 'types';

export interface DistributionVars extends Pick<ClientDistribution, 'status' | 'notes'> {
  releaseId: string;
  distributor: string;
  assignees: string[];
  dueDate: string | Date;
}

export type CreateDistributionVars = DistributionVars;

export type UpdateDistributionVars = Partial<DistributionVars>;
