import { createParamDecorator } from '@storyofams/next-api-decorators';

export const PathParam = (key: string) =>
  createParamDecorator((req) => req.query[key])();
