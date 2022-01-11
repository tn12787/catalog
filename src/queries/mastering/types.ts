import { ClientMastering } from 'types';

export interface MasteringVars extends Pick<ClientMastering, 'status' | 'notes' | 'url'> {
  releaseId: string;
  assignees: string[];
  dueDate: string | Date;
}

export type CreateMasteringVars = MasteringVars;

export type UpdateMasteringVars = Partial<MasteringVars>;
