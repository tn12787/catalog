import { ClientArtwork } from 'types/common';

export interface ArtworkVars
  extends Pick<ClientArtwork, 'status' | 'notes' | 'url' | 'dueDate' | 'releaseId'> {
  artworkData?: File | File[];
  assignees: string[]; // needs to be a string to send to API
}

export type CreateArtworkVars = ArtworkVars;

export type UpdateArtworkVars = Omit<Partial<ArtworkVars>, 'releaseId'> & { taskId: string };
