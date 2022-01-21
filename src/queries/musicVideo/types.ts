import { ClientMusicVideo } from 'types/common';

export interface MusicVideoVars extends Pick<ClientMusicVideo, 'status' | 'notes' | 'url'> {
  releaseId: string;
  assignees: string[];
  dueDate: string | Date;
}

export type CreateMusicVideoVars = MusicVideoVars;
export type UpdateMusicVideoVars = Partial<MusicVideoVars>;
