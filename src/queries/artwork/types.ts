import { ClientArtwork } from 'types';

export interface ArtworkVars extends Pick<ClientArtwork, 'status' | 'notes' | 'url'> {
  artworkData?: File | File[];
  releaseId: string;
  assignees: string[];
  dueDate: string | Date;
}

export type CreateArtworkVars = ArtworkVars;

export type UpdateArtworkVars = Partial<ArtworkVars>;
