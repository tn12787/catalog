import { createParamDecorator } from '@storyofams/next-api-decorators';

export const PathParam = createParamDecorator<string | undefined>(
  (req, key) => req.query[key] as string | undefined
);
