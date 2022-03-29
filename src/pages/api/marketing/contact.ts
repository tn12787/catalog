import { Body, createHandler, Post, ValidationPipe } from '@storyofams/next-api-decorators';

import { addMailingListEntry, sendDynamicEmail } from 'backend/apiUtils/email';
import { ContactUsDto } from 'backend/models/marketing/contactUs';

const contactFormTemplateId = 'd-e890a91f10f24afaa697644d54afd4b0';

class ContactUsHandler {
  @Post()
  async contactUs(@Body(ValidationPipe) body: ContactUsDto) {
    await addMailingListEntry(body); // add the user to the mailing list anyway
    await sendDynamicEmail<ContactUsDto>({
      to: ['tom@catalogapp.io', 'seb@catalogapp.io'],
      dynamicTemplateData: body,
      templateId: contactFormTemplateId,
    });
  }
}

export default createHandler(ContactUsHandler);
