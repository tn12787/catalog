import axios from 'axios';

type CreateCheckoutVars = {
  priceId: string;
  teamId: string;
  quantity: number;
};

export const createCheckout = async (vars: CreateCheckoutVars) => {
  return await axios.post<{ sessionId: string }>(`/api/payments/checkout`, vars);
};
