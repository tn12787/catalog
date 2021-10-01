import { Distribution } from 'types';

export interface DistributionVars extends Pick<Distribution, 'dueDate' | 'status' | 'notes'> {
  releaseId: string;
  distributor: string;
  assignees: string[];
}
