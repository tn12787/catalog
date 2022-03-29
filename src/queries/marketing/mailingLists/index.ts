import axios from 'axios';

import { MailingListData } from 'types/marketing/pricing';

export const addUserToMailingList = async (data: MailingListData) => {
  return await axios.post(`/api/marketing/mailing_list`, data);
};
