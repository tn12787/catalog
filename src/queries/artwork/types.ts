import { ClientArtwork } from 'types/common';

export interface ArtworkVars extends Pick<ClientArtwork, 'status' | 'notes' | 'url'> {
  artworkData?: File | File[];
  releaseId: string;
  assignees: string[];
  dueDate: string | Date;
}

export type CreateArtworkVars = ArtworkVars;

export type UpdateArtworkVars = Partial<ArtworkVars>;
