import { Artist } from '@prisma/client';

export type FormArtist = Omit<Artist, 'createdAt' | 'updatedAt'>;
