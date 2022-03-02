import axios from 'axios';

type CreatePortalLinkVars = {
  workspaceId: string;
};

type CreateCheckoutVars = CreatePortalLinkVars & {
  priceId: string;
  quantity: number;
};

export const createCheckout = async (vars: CreateCheckoutVars) => {
  return await axios.post<{ sessionId: string }>(`/api/payments/checkout`, vars);
};

export const createPortalLink = async (vars: CreatePortalLinkVars) => {
  return await axios.post<{ url: string }>(`/api/payments/portal`, vars);
};
