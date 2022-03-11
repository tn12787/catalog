import { ClientMastering } from 'types/common';

export interface MasteringVars
  extends Pick<ClientMastering, 'status' | 'notes' | 'url' | 'dueDate' | 'releaseId'> {
  assignees: string[];
}

export type CreateMasteringVars = MasteringVars;

export type UpdateMasteringVars = Omit<Partial<MasteringVars>, 'releaseId'> & {
  taskId: string;
};
