import sendgrid from '@sendgrid/mail';

import { EmailData } from './types';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendDynamicEmail = async <T>({ to, dynamic_template_data }: EmailData<T>) => {
  try {
    await sendgrid.send({
      to: to,
      from: 'info@tpjnorton.com',
      templateId: `d-324235f107c041f58e03d8fd8a66e104`,
      dynamicTemplateData: dynamic_template_data,
    });
  } catch (error) {
    console.log(error);
  }
};
