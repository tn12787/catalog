import { Body, createHandler, Post, ValidationPipe } from 'next-api-decorators';

import { addMailingListEntry } from 'backend/apiUtils/email';
import { CreateMailingListEntryDto } from 'backend/models/marketing/mailingList';

class MailingListHandler {
  @Post()
  async addMailingListEntry(@Body(ValidationPipe) body: CreateMailingListEntryDto) {
    return await addMailingListEntry(body);
  }
}

export default createHandler(MailingListHandler);
