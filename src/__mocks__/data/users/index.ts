import { User } from '@prisma/client';

export const testUser = (extraFields: Partial<User>): User => {
  return {
    id: 'test-user-id',
    name: 'Test Users',
    email: 'test@example.com',
    emailVerified: new Date(),
    image: null,
    segment: null,
    ...extraFields,
  };
};
