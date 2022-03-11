import { ClientDistribution } from 'types/common';

export interface DistributionVars
  extends Pick<ClientDistribution, 'status' | 'notes' | 'dueDate' | 'releaseId'> {
  distributor: string;
  assignees: string[]; // both of these need to be strings to send to API
}

export type CreateDistributionVars = DistributionVars;

export type UpdateDistributionVars = Omit<Partial<DistributionVars>, 'releaseId'> & {
  taskId: string;
};
