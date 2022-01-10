import { User } from '@prisma/client';

export type UpdateUserVars = Pick<User, 'id' | 'name'>;
