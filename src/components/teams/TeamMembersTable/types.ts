import { TeamMember, Role, User } from '@prisma/client';

export type TeamMemberWithUser = TeamMember & { user: User; roles: Role[] };
