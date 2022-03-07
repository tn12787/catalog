import { User } from '@prisma/client';

export const testUser = (extraFields: Partial<User>): User => {
  return {
    id: 'test-artist-id',
    name: 'Test Artist',
    email: 'test@example.com',
    emailVerified: true,
    image: null,
    segment: null,
    ...extraFields,
  };
};
