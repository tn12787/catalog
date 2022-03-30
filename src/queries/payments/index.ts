import axios from 'axios';

import { ProductResponse } from 'types/billing';

type CreatePortalLinkVars = {
  workspaceId: string;
};

export type CreateCheckoutVars = CreatePortalLinkVars & {
  priceId: string;
  quantity: number;
  redirectPath: string | undefined;
};

export const createCheckout = async (vars: CreateCheckoutVars) => {
  return await axios.post<{ sessionId: string }>(`/api/payments/checkout`, vars);
};

export const createPortalLink = async (vars: CreatePortalLinkVars) => {
  return await axios.post<{ url: string }>(`/api/payments/portal`, vars);
};

export const fetchProducts = async () => {
  const { data: response } = await axios.get<ProductResponse[]>(`/api/payments/products`);
  return response;
};
