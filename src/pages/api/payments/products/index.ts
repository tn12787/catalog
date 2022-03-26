import { createHandler, Get, UseMiddleware } from '@storyofams/next-api-decorators';

import { PrivateApiLimiter } from 'backend/apiUtils/ratelimiting';
import { getProductsIsomorphic } from 'backend/isomorphic/payments/products';

@UseMiddleware(PrivateApiLimiter(100))
class ProductHandler {
  @Get()
  async products() {
    return getProductsIsomorphic();
  }
}

export default createHandler(ProductHandler);
