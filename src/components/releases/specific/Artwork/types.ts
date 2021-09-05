import { ArtworkVars } from 'queries/artwork/types';

export interface EditArtworkFormData extends Omit<ArtworkVars, 'dueDate'> {
  dueDate: Date;
}
