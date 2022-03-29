import axios from 'axios';

import { ContactUsData } from 'types/marketing/pricing';

export const sendContactForm = async (data: ContactUsData) => {
  return await axios.post(`/api/marketing/contact`, data);
};
