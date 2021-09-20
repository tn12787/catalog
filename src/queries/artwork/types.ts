import { Distribution, Artwork } from 'types';

export interface ArtworkVars
  extends Pick<
    Artwork,
    'dueDate' | 'status' | 'notes' | 'completedOn' | 'url'
  > {
  artworkData?: File | File[];
  releaseId: string;
}
