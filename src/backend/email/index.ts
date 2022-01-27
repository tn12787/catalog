import sendgrid from '@sendgrid/mail';

import { EmailData } from './types';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendDynamicEmail = async <T>({ to, dynamic_template_data }: EmailData<T>) => {
  try {
    await sendgrid.send({
      to: to,
      from: 'info@tpjnorton.com',
      templateId: `d-a9ea4ba83f8b4761abda9ce9be228121`,
      dynamicTemplateData: dynamic_template_data,
    });
  } catch (error) {
    console.log(error);
  }
};
