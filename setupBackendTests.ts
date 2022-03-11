import { PrismaClient } from '@prisma/client';
import { addDays } from 'date-fns';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import 'whatwg-fetch';
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

import { ExtendedSession } from './src/types/common';
import prisma from './src/backend/prisma/client';

jest.mock('./src/backend/prisma/client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

const mockSession: ExtendedSession = {
  user: { email: 'test-user@example.com', name: 'Test User', image: null },
  token: {
    email: 'test-user@example.com',
    name: 'Test User',
    picture: null,
    workspaceMemberships: [],
    sub: 'test-user-id',
  },
  expires: addDays(new Date(), 1).toISOString(),
};

jest.mock('next-auth/react', () => ({
  ...(jest.requireActual('next-auth/react') as object),
  getSession: jest.fn(async () => mockSession),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
