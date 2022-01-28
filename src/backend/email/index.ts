import sendgrid from '@sendgrid/mail';

import { EmailData } from './types';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendDynamicEmail = async <T>({
  to,
  templateId,
  dynamicTemplateData,
}: EmailData<T>) => {
  try {
    await sendgrid.send({
      from: 'Launchday <info@tpjnorton.com>',
      to,
      templateId,
      dynamicTemplateData,
    });
  } catch (error) {
    console.log(error);
  }
};
