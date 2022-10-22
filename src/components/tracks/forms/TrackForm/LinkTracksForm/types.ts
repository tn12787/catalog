import { Track } from '@prisma/client';

export type LinkTracksFormData = {
  ids: Track['id'][];
};
