import { stripe } from 'backend/apiUtils/stripe/server';
import { ProductResponse, ProductName } from 'types/billing';

export const getProductsIsomorphic = async (): Promise<ProductResponse[]> => {
  const prices = await stripe.prices.list({ active: true, expand: ['data.tiers'] });
  const products = await stripe.products.list({ active: true });

  return products.data.map((product) => ({
    ...product,
    name: product.name as ProductName,
    prices: {
      monthly: prices.data.find(
        (price) => price.product === product.id && price.recurring?.interval === 'month'
      ),
      yearly: prices.data.find(
        (price) => price.product === product.id && price.recurring?.interval === 'year'
      ),
    },
  }));
};
