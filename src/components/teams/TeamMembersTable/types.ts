import { TeamUser, Role, User } from '@prisma/client';

export type TeamUserWithUser = TeamUser & { user: User; roles: Role[] };
