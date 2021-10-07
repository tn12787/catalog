import { Mastering } from 'types';

export interface MasteringVars extends Pick<Mastering, 'dueDate' | 'status' | 'notes' | 'url'> {
  releaseId: string;
  assignees: string[];
}

export type CreateMasteringVars = MasteringVars;

export type UpdateMasteringVars = Partial<MasteringVars>;
