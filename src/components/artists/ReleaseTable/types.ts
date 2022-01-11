import { Artist } from '@prisma/client';

import { ClientRelease } from 'types';

export type ArtistWithReleases = Artist & { releases: EnrichedRelease[] };
