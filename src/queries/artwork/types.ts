import { Artwork } from 'types';

export interface ArtworkVars extends Pick<Artwork, 'dueDate' | 'status' | 'notes' | 'url'> {
  artworkData?: File | File[];
  releaseId: string;
  assignees: string[];
}
