import { createHandler, Get } from '@storyofams/next-api-decorators';

import { stripe } from 'backend/apiUtils/stripe/server';

class ProductHandler {
  @Get()
  async products() {
    const prices = await stripe.prices.list({ active: true, expand: ['data.tiers'] });
    const products = await stripe.products.list({ active: true });

    return products.data.map((product) => ({
      ...product,
      prices: {
        monthly: prices.data.find(
          (price) => price.product === product.id && price.recurring?.interval === 'month'
        ),
        yearly: prices.data.find(
          (price) => price.product === product.id && price.recurring?.interval === 'year'
        ),
      },
    }));
  }
}

export default createHandler(ProductHandler);
