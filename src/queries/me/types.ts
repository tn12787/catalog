import { User } from '@prisma/client';

export type UpdateUserVars = Pick<User, 'id'> & Partial<Pick<User, 'name' | 'segment'>>;
