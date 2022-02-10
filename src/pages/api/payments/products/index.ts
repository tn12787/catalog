import { createHandler, Get } from '@storyofams/next-api-decorators';

import { stripe } from 'backend/apiUtils/stripe/server';

class ProductHandler {
  @Get()
  async products() {
    const prices = await stripe.prices.list();
    return prices;
  }
}

export default createHandler(ProductHandler);
