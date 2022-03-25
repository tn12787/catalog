import { createHandler, Get } from '@storyofams/next-api-decorators';

import { stripe } from 'backend/apiUtils/stripe/server';
import { getProductsIsomorphic } from 'backend/isomorphic/payments/products';

class ProductHandler {
  @Get()
  async products() {
    return getProductsIsomorphic();
  }
}

export default createHandler(ProductHandler);
