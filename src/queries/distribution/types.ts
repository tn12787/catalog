import { Distribution } from 'types';

export interface DistributionVars
  extends Pick<Distribution, 'dueDate' | 'status' | 'notes' | 'completedOn'> {
  releaseId: string;
  distributor: string;
  assignees: string[];
}
