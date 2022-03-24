import { UserResponse } from 'types/common';

export const testUser = (extraFields: Partial<UserResponse>): UserResponse => {
  return {
    id: 'test-user-id',
    name: 'Test Users',
    email: 'test@example.com',
    emailVerified: new Date(),
    image: null,
    segment: null,
    workspaces: [],
    emailPreferences: {
      id: 'boi',
      userId: 'test-used-id',
      reminders: true,
    },
    ...extraFields,
  };
};
