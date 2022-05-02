import sendgrid from '@sendgrid/mail';
import client from '@sendgrid/client';

import { CreateMailingListEntryDto } from '../../models/marketing/mailingList';

import { EmailData } from './types';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);
client.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendDynamicEmail = async <T>({
  to,
  templateId,
  dynamicTemplateData,
}: EmailData<T>) => {
  try {
    await sendgrid.send({
      from: 'Tom at Catalog <tom@catalogapp.io>',
      to,
      templateId,
      dynamicTemplateData,
      replyToList: [
        { name: 'Tom Norton', email: 'tom@catalogapp.io' },
        { name: 'Seb Carroll', email: 'seb@catalogapp.io' },
      ],
    });
  } catch (error) {
    console.error(error);
  }
};

export const addMailingListEntry = async ({
  firstName,
  lastName,
  email,
}: CreateMailingListEntryDto) => {
  try {
    return await client.request({
      method: 'PUT',
      url: '/v3/marketing/contacts',
      body: {
        contacts: [
          {
            first_name: firstName,
            last_name: lastName,
            email,
          },
        ],
      },
    });
  } catch (error: any) {
    console.error(error);
  }
};
