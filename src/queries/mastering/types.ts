import { Mastering } from 'types';

export interface MasteringVars extends Pick<Mastering, 'dueDate' | 'status' | 'notes' | 'url'> {
  MasteringData?: File | File[];
  releaseId: string;
  assignees: string[];
}
