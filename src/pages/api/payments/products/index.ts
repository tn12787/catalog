import { createHandler, Get } from '@storyofams/next-api-decorators';

import { getProductsIsomorphic } from 'backend/isomorphic/payments/products';

class ProductHandler {
  @Get()
  async products() {
    return getProductsIsomorphic();
  }
}

export default createHandler(ProductHandler);
