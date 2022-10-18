import { BadRequestException, createParamDecorator } from 'next-api-decorators';

export const PathParam = (key: string) => createParamDecorator((req) => req.query[key])();

export const RequiredQuery = (key: string) =>
  createParamDecorator((req) => {
    if (!req.query[key]) {
      throw new BadRequestException(`Missing required query param: ${key}`);
    }

    return req.query[key];
  })();
