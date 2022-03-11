import { ClientMusicVideo } from 'types/common';

export interface MusicVideoVars
  extends Pick<ClientMusicVideo, 'status' | 'notes' | 'url' | 'dueDate' | 'releaseId'> {
  assignees: string[]; // needs to be a string to send to API
}

export type CreateMusicVideoVars = MusicVideoVars;
export type UpdateMusicVideoVars = Omit<Partial<MusicVideoVars>, 'releaseId'> & {
  taskId: string;
};
