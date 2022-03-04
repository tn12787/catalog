import { artistHandlers } from './artists';
import { authHandlers } from './auth';

export const handlers = [...artistHandlers, ...authHandlers];
