import { Artist } from '@prisma/client';

import { EnrichedRelease } from 'types';

export type ArtistWithReleases = Artist & { releases: EnrichedRelease[] };
