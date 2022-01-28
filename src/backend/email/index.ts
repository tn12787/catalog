import sendgrid from '@sendgrid/mail';

import { EmailData } from './types';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendDynamicEmail = async <T>({
  to,
  templateId,
  dynamicTemplateData: dynamic_template_data,
}: EmailData<T>) => {
  try {
    await sendgrid.send({
      from: 'Launchday <info@tpjnorton.com>',
      to,
      templateId,
      dynamicTemplateData: dynamic_template_data,
    });
  } catch (error) {
    console.log(error);
  }
};
