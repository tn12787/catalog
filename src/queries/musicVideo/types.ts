import { MusicVideo } from 'types';

export interface MusicVideoVars extends Pick<MusicVideo, 'dueDate' | 'status' | 'notes' | 'url'> {
  releaseId: string;
  assignees: string[];
}

export type CreateMusicVideoVars = MusicVideoVars;
export type UpdateMusicVideoVars = Partial<MusicVideoVars>;
